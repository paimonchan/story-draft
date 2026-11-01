/* Story Draft — logika katalog draft story.
   Sumber data tunggal: index.json (+ data/<slug>.json per draft, dimuat saat dibuka). */
'use strict';

const app = document.getElementById('app');
const qInput = document.getElementById('q');
const DATA = new Map();
let INDEX = null;
let FILTER = '';
let F_STATUS = '';
let F_GENRE = '';
let F_TAG = '';

/* ---------------------------------- util --------------------------------- */

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const fmt = (n) => (n ?? 0).toLocaleString('id-ID');
const initials = (name) =>
  String(name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('');

function copy(text, btn) {
  const done = () => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = 'Tersalin ✓';
    btn.classList.add('primary');
    setTimeout(() => {
      btn.textContent = old;
      btn.classList.remove('primary');
    }, 1400);
  };
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (_) {}
    ta.remove();
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(fallback);
  else fallback();
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ------------------------------- markdown -------------------------------- */

let HCOUNT = 0;

function md(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n');
  const out = [];
  let inCode = false;
  let list = null;
  let table = null;

  const inline = (t) =>
    esc(t)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  const flushList = () => { if (list) { out.push(`<${list.t}>${list.items.join('')}</${list.t}>`); list = null; } };
  const flushTable = () => {
    if (!table) return;
    const head = table.rows.shift() || [];
    out.push(
      '<table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
      table.rows.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
      '</tbody></table>'
    );
    table = null;
  };

  const splitRow = (l) => l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (/^```/.test(line)) {
      flushList(); flushTable();
      out.push(inCode ? '</code></pre>' : '<pre><code>');
      inCode = !inCode;
      continue;
    }
    if (inCode) { out.push(esc(raw) + '\n'); continue; }

    if (/^\|.*\|$/.test(line)) {
      if (/^[\s:|-]+$/.test(line)) continue;
      flushList();
      if (!table) table = { rows: [] };
      table.rows.push(splitRow(line));
      continue;
    }
    flushTable();

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushList();
      HCOUNT += 1;
      const lvl = h[1].length;
      out.push(`<h${lvl} id="h${HCOUNT}" class="scene-anchor">${inline(h[2])}</h${lvl}>`);
      continue;
    }

    const bq = line.match(/^>\s?(.*)$/);
    if (bq) { flushList(); out.push(`<blockquote>${inline(bq[1])}</blockquote>`); continue; }

    if (/^\s*(?:---+|\*\*\*+|___+)\s*$/.test(line)) { flushList(); out.push('<hr>'); continue; }

    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      const type = ul ? 'ul' : 'ol';
      if (!list || list.t !== type) { flushList(); list = { t: type, items: [] }; }
      list.items.push(`<li>${inline((ul || ol)[1])}</li>`);
      continue;
    }

    if (!line.trim()) { flushList(); continue; }

    flushList();
    // baris dialog (diawali em dash) dibiarkan sebagai paragraf bergaya kutipan
    if (/^\s*[—–]\s/.test(line)) out.push(`<p class="dialogue">${inline(line.trim())}</p>`);
    else out.push(`<p>${inline(line)}</p>`);
  }
  flushList(); flushTable();
  if (inCode) out.push('</code></pre>');
  return out.join('\n');
}

/* --------------------------------- router -------------------------------- */

const parseHash = () => {
  const h = location.hash.replace(/^#\/?/, '');
  if (!h || h === '/') return { view: 'home' };
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 's' && parts.length >= 2) {
    const rest = parts.slice(1);
    let tab = 'cerita';
    // slug boleh nested (a/b); segmen terakhir dianggap tab hanya kalau namanya tab yang dikenal
    if (rest.length > 1 && TABS.some(([id]) => id === rest[rest.length - 1])) tab = rest.pop();
    return { view: 'detail', slug: rest.join('/'), tab };
  }
  return { view: 'home' };
};

const entryBySlug = (slug) => (INDEX?.entries || []).find((e) => e.slug === slug);

async function loadData(slug) {
  if (DATA.has(slug)) return DATA.get(slug);
  const meta = entryBySlug(slug);
  if (!meta) return null;
  const res = await fetch(meta.data, { cache: 'no-cache' });
  if (!res.ok) throw new Error('gagal memuat ' + meta.data);
  const d = await res.json();
  DATA.set(slug, d);
  return d;
}

/* ------------------------------- overview -------------------------------- */

function matches(e) {
  if (F_STATUS && e.status !== F_STATUS) return false;
  if (F_GENRE && e.genre !== F_GENRE) return false;
  if (F_TAG && !(e.tags || []).includes(F_TAG)) return false;
  if (!FILTER) return true;
  const q = FILTER.toLowerCase();
  const hay = [
    e.title, e.slug, e.logline, e.setting, e.genre,
    (e.tags || []).join(' '), (e.characters || []).join(' '), (e.toc || []).map((t) => t.text).join(' '),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

const meterClass = (r, t) => (r / t >= 0.75 ? '' : r / t >= 0.5 ? 'mid' : 'low');

function renderHome() {
  const entries = INDEX.entries.filter(matches);
  const totals = {
    drafts: INDEX.count,
    words: INDEX.words,
    chars: INDEX.characters.length,
    scenes: INDEX.entries.reduce((a, e) => a + (e.toc || []).length, 0),
  };

  const statuses = Object.entries(INDEX.statuses || {}).filter(([, n]) => n > 0);
  const fbtn = (kind, val, label, active) =>
    `<button class="fbtn" type="button" data-f="${kind}" data-v="${esc(val)}" aria-pressed="${active}">${esc(label)}</button>`;

  const filterBar = `
  <div class="card filters">
    <div class="fgroup">
      <span class="flabel">status</span>
      ${fbtn('status', '', 'semua', !F_STATUS)}
      ${statuses.map(([s, n]) => fbtn('status', s, `${s} ${n}`, F_STATUS === s)).join('')}
    </div>
    ${INDEX.genres.length ? `<div class="sep"></div><div class="fgroup"><span class="flabel">genre</span>
      ${fbtn('genre', '', 'semua', !F_GENRE)}
      ${INDEX.genres.map((g) => fbtn('genre', g, g, F_GENRE === g)).join('')}</div>` : ''}
    ${INDEX.tags.length ? `<div class="sep"></div><div class="fgroup"><span class="flabel">tag</span>
      ${fbtn('tag', '', 'semua', !F_TAG)}
      ${INDEX.tags.slice(0, 14).map((t) => fbtn('tag', t, t, F_TAG === t)).join('')}</div>` : ''}
  </div>`;

  const cards = entries
    .map((e) => {
      const r = e.ready ?? 0;
      const t = e.ready_total || 9;
      const cast = (e.characters || []).slice(0, 4);
      return `
      <a class="card scard" href="#/s/${e.slug}">
        <div class="top">
          <span class="pill ${esc(e.status)}"><i class="dot"></i>${esc(e.status)}</span>
          ${e.genre ? `<span class="pill">${esc(e.genre)}</span>` : ''}
          ${e.format ? `<span class="pill">${esc(e.format)}</span>` : ''}
          <div class="spacer"></div>
          <span class="muted mono" style="font-size:11.5px">${esc(e.date || '')}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        ${e.logline ? `<p class="logline">${esc(e.logline)}</p>` : `<p class="logline muted">logline belum diisi</p>`}
        ${cast.length ? `<div class="cast">${cast
          .map((c) => `<span class="who"><span class="av">${esc(initials(c))}</span>${esc(c)}</span>`)
          .join('')}${(e.characters || []).length > 4 ? `<span class="who">+${e.characters.length - 4}</span>` : ''}</div>` : ''}
        <div class="sub">
          <span>${fmt(e.words)} kata</span>
          <span>${(e.toc || []).length} scene</span>
          <span>${e.dialogue} dialog</span>
          <span>${e.read_min} mnt baca</span>
        </div>
        <div class="foot">
          <div class="meter">
            <span class="num">siap ${r}/${t}</span>
            <span class="track"><i class="${meterClass(r, t)}" style="width:${Math.round((r / t) * 100)}%"></i></span>
          </div>
          <div class="spacer"></div>
          <span class="muted mono" style="font-size:11.5px">${esc(e.target || '')}</span>
        </div>
      </a>`;
    })
    .join('');

  const emptyState = `
  <div class="card empty">
    <p><b>Belum ada draft yang cocok.</b></p>
    <p class="mono" style="font-size:12.5px">stories/&lt;slug&gt;/story.md + notes.md</p>
    <p>Bikin folder baru di <code>stories/</code>, copy <code>templates/story-template.md</code>,
       isi frontmatter, lalu <code>python3 tools/build_index.py</code>.</p>
  </div>`;

  app.innerHTML = `
    <div class="hero">
      <div>
        <h1>Draft story untuk prompt video AI</h1>
        <p>Cerita dulu, prompt belakangan. Tulis ceritanya mentah di sini — pecah per scene pakai
           heading <code class="mono">##</code> — lalu panel <b>Siap → prompt</b> nunjukin bagian mana
           yang masih kurang sebelum diubah jadi prompt MiniMax H3.</p>
      </div>
      <div class="stats">
        <div class="stat"><b>${totals.drafts}</b><span>draft</span></div>
        <div class="stat"><b>${fmt(totals.words)}</b><span>kata</span></div>
        <div class="stat"><b>${totals.scenes}</b><span>scene</span></div>
        <div class="stat"><b>${totals.chars}</b><span>karakter</span></div>
      </div>
    </div>
    ${filterBar}
    ${entries.length ? `<div class="grid">${cards}</div>` : emptyState}`;

  app.querySelectorAll('.fbtn').forEach((b) =>
    b.addEventListener('click', () => {
      const kind = b.dataset.f;
      const val = b.dataset.v;
      if (kind === 'status') F_STATUS = val;
      if (kind === 'genre') F_GENRE = val;
      if (kind === 'tag') F_TAG = val;
      renderHome();
    })
  );
}

/* -------------------------------- detail --------------------------------- */

const TABS = [
  ['cerita', 'Cerita'],
  ['notes', 'Catatan'],
  ['ready', 'Siap → prompt'],
];

function tabCerita(d, e) {
  HCOUNT = 0;
  const toc = (e.toc || []).length
    ? `<aside class="toc">
         <h4>Scene</h4>
         ${e.toc.map((t) => `<a href="#" data-jump="${esc(t.id)}" class="l${t.level}">${esc(t.text)}<span class="w">${t.words}w</span></a>`).join('')}
       </aside>`
    : `<aside class="toc"><h4>Scene</h4><p class="muted" style="font-size:12.5px">Belum ada heading. Pecah cerita pakai <code class="mono">##</code> biar kebaca per scene.</p></aside>`;

  return `
  <div class="panel">
    <div class="raw-tools">
      <button class="btn primary" data-copy="story" type="button">Salin cerita (${fmt(e.chars)} char)</button>
      <button class="btn" data-dl="story" type="button">Unduh .md</button>
      <button class="btn" data-tab-btn="raw" type="button">Lihat mentah</button>
      <span class="muted mono" style="font-size:12px">${e.words} kata · ${e.paragraphs} paragraf · ${e.sentences} kalimat</span>
    </div>
    <div class="reader">
      ${toc}
      <article class="prose" id="prose">${md(d.content)}</article>
    </div>
    <div id="rawwrap" hidden style="margin-top:16px">
      <pre class="raw">${esc(d.content)}</pre>
    </div>
  </div>`;
}

function tabNotes(d) {
  if (!d.notes?.trim())
    return `<div class="panel"><div class="muted">Belum ada <code class="mono">notes.md</code> di folder draft ini.
      Di situ tempat naruh ide prompt, referensi visual, deskripsi karakter tetap, dan peta shot.</div></div>`;
  return `<div class="panel"><div class="notes">${md(d.notes)}</div></div>`;
}

function tabReady(d, e) {
  const base = INDEX.baseline || {};
  const rows = (e.checks || [])
    .map(
      (c) => `
    <div class="ready-row ${c.ok ? 'ok' : 'warn'}">
      <div class="mark">${c.ok ? '✓' : '!'}</div>
      <div class="lbl">${esc(c.label)}<small>${esc(c.note || '')}</small></div>
      <div class="val">${esc(String(c.value))}</div>
    </div>`
    )
    .join('');

  const cast = Object.entries(e.mentions || {});
  const sceneRows = (e.toc || [])
    .map(
      (t, i) => `<div class="ready-row"><div class="mark mono">${i + 1}</div>
        <div class="lbl">${esc(t.text)}<small>kira-kira jadi 1 shot — pecah lagi kalau &gt; 15 detik</small></div>
        <div class="val">${t.words}w</div></div>`
    )
    .join('');

  return `
  <div class="panel">
    <div class="panel-sub">Heuristik teks, bukan penilaian mutu cerita. Tujuannya: kelihatan mana draft
      yang metadatanya sudah lengkap dan strukturnya sudah siap dipetakan jadi prompt video.</div>
    <div class="statline">
      <div>kata <b>${fmt(e.words)}</b> <span class="muted">/ rata-rata ${fmt(base.words ?? 0)}</span></div>
      <div>paragraf <b>${e.paragraphs}</b></div>
      <div>kalimat <b>${e.sentences}</b> <span class="muted">(rata-rata ${e.avg_sentence} kata)</span></div>
      <div>terpanjang <b>${e.longest_sentence}</b> kata <span class="muted">/ rata-rata ${base.longest_sentence ?? '—'}</span></div>
      <div>dialog <b>${e.dialogue}</b> baris <span class="muted">/ rata-rata ${base.dialogue ?? '—'}</span></div>
      <div>scene <b>${(e.toc || []).length}</b> <span class="muted">/ rata-rata ${base.scenes ?? '—'}</span></div>
      <div>isyarat visual <b>${e.visual_pct}%</b> <span class="muted">/ rata-rata ${base.visual_pct ?? '—'}%</span></div>
      <div>estimasi baca <b>${e.read_min} mnt</b></div>
    </div>
    <div class="ready-grid">${rows}</div>

    ${cast.length ? `<div class="section-block"><h3>Karakter &amp; kemunculan</h3>
      <div class="statline">${cast
        .map(([name, n]) => `<div>${esc(name)} <b>${n}×</b> <span class="muted">di prosa</span></div>`)
        .join('')}</div>
      <div class="muted" style="font-size:12.5px">Nama yang nggak pernah muncul (0×) biasanya nggak kepakai —
        hapus dari <code class="mono">characters</code> atau tulis adegannya.</div></div>` : ''}

    ${sceneRows ? `<div class="section-block"><h3>Scene → shot</h3><div class="ready-grid">${sceneRows}</div></div>` : ''}

    <div class="section-block">
      <h3>Langkah jadi prompt H3</h3>
      <div class="notes">
        <ol>
          <li>Ambil satu scene, jadikan satu klip 3–15 detik (mode <code>Ref2VA</code> kalau pakai gambar referensi, <code>T2VA</code> kalau teks saja).</li>
          <li>Tiap nama di <code>characters</code> jadi blok <code>&lt;Subject N&gt;</code>; tiap gambar referensi jadi <code>&lt;Picture N&gt;</code>.</li>
          <li>Dialog di sini pindah ke timeline prompt sebagai <code>&lt;d&gt;[Bahasa] teks&lt;/d&gt;</code> — bukan ke <code>overall_soundscape</code>.</li>
          <li>Kalau cerita ini jadi rangkaian berurutan, script per-part-nya masuk repo
              <a href="https://paimonchan.github.io/prompt-script/" target="_blank" rel="noopener">Prompt Script</a>.</li>
        </ol>
        <p class="muted" style="font-size:12.5px;margin:12px 0 0">
          Sebelum menulis prompt: <a href="https://github.com/paimonchan/story-draft/blob/main/docs/02-aturan-produksi-h3.md" target="_blank" rel="noopener">docs/02 — aturan produksi H3</a>
          (kamera terukur, 7 kelas anti-cut, kontinuitas) ·
          <a href="https://github.com/paimonchan/story-draft/blob/main/docs/01-konteks-sirin-kanglim.md" target="_blank" rel="noopener">docs/01 — konteks seri</a>.
        </p>
      </div>
    </div>
  </div>`;
}

async function renderDetail(slug, tab) {
  const e = entryBySlug(slug);
  if (!e) { app.innerHTML = `<div class="card empty">Draft <code>${esc(slug)}</code> nggak ada di index.</div>`; return; }

  app.innerHTML = `<div class="loading">Memuat draft ${esc(e.title)}…</div>`;
  let d;
  try { d = await loadData(slug); } catch (err) {
    app.innerHTML = `<div class="card empty">Gagal memuat data: ${esc(err.message)}</div>`;
    return;
  }
  if (parseHash().slug !== slug) return;

  const list = INDEX.entries;
  const i = list.findIndex((x) => x.slug === slug);
  const prev = i > 0 ? list[i - 1] : null;
  const next = i >= 0 && i < list.length - 1 ? list[i + 1] : null;

  const chips = [
    ['status', e.status],
    ['genre', e.genre],
    ['bahasa', e.lang],
    ['setting', e.setting],
    ['target', e.target],
    ['format', e.format],
    ['durasi', e.duration ? e.duration + 's' : ''],
    ['beat', e.beats],
    ['kata', fmt(e.words)],
    ['scene', (e.toc || []).length],
    ['dialog', e.dialogue],
    ['diperbarui', e.date],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '');

  const tabs = TABS.map(([id, label]) => {
    const n = id === 'cerita' ? (e.toc || []).length : id === 'ready' ? `${e.ready ?? 0}/${e.ready_total || 9}` : 0;
    return `<button type="button" data-tab="${id}" aria-selected="${tab === id}">${label}${n ? `<span class="count">${n}</span>` : ''}</button>`;
  }).join('');

  let body = '';
  if (tab === 'notes') body = tabNotes(d, e);
  else if (tab === 'ready') body = tabReady(d, e);
  else body = tabCerita(d, e);

  app.innerHTML = `
    <div class="crumbs">
      <a href="#/">← Semua draft</a><span>/</span><span>${esc(e.genre || 'tanpa genre')}</span>
      <span>/</span><span>${esc(e.slug)}</span>
    </div>

    <header class="card detail-head">
      <div class="top">
        <span class="pill ${esc(e.status)}"><i class="dot"></i>${esc(e.status)}</span>
        ${(e.tags || []).slice(0, 8).map((t) => `<span class="pill">${esc(t)}</span>`).join('')}
        <div class="spacer"></div>
        <span class="muted mono" style="font-size:11.5px">${esc(e.date || '')}</span>
      </div>
      <h1>${esc(e.title)}</h1>
      ${e.logline ? `<p class="logline">${esc(e.logline)}</p>` : ''}
      <div class="chips">
        ${chips.map(([k, v]) => `<span class="chip"><b>${esc(k)}</b> <code>${esc(String(v))}</code></span>`).join('')}
      </div>
      <div class="actions">
        ${prev ? `<a class="btn" href="#/s/${prev.slug}">← ${esc(prev.title.slice(0, 28))}</a>` : ''}
        ${next ? `<a class="btn" href="#/s/${next.slug}">${esc(next.title.slice(0, 28))} →</a>` : ''}
        <div class="spacer"></div>
        <a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/${esc(e.path)}" target="_blank" rel="noopener">Lihat di GitHub</a>
        <a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/stories/${esc(e.slug)}/notes.md" target="_blank" rel="noopener">notes.md</a>
        ${e.has_storyboard ? `<a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/stories/${esc(e.slug)}/storyboard.md" target="_blank" rel="noopener">storyboard.md</a>` : ''}
      </div>
    </header>

    <nav class="tabs" role="tablist">${tabs}</nav>
    <section class="card" id="tabbody">${body}</section>`;

  app.querySelectorAll('.tabs button').forEach((b) =>
    b.addEventListener('click', () => { location.hash = `#/s/${slug}/${b.dataset.tab}`; })
  );
  app.querySelectorAll('[data-copy="story"]').forEach((b) => b.addEventListener('click', () => copy(d.content, b)));
  app.querySelectorAll('[data-dl="story"]').forEach((b) =>
    b.addEventListener('click', () => download(e.slug.replace('/', '--') + '.md', d.content))
  );
  app.querySelectorAll('[data-tab-btn="raw"]').forEach((b) =>
    b.addEventListener('click', () => {
      const w = document.getElementById('rawwrap');
      w.hidden = !w.hidden;
      b.textContent = w.hidden ? 'Lihat mentah' : 'Sembunyikan mentah';
    })
  );
  app.querySelectorAll('.toc a[data-jump]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const el = document.getElementById(a.dataset.jump);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
  updateFooter(e);
}

/* --------------------------------- shell --------------------------------- */

function updateFooter(e) {
  document.getElementById('foot-left').textContent = e
    ? `${e.title} — ${e.words} kata · ${(e.toc || []).length} scene`
    : 'Story Draft — draft story untuk prompt video AI';
  document.getElementById('brand-sub').textContent = e ? e.title : 'draft story → prompt video AI';
  document.getElementById('foot-right').textContent = INDEX
    ? `index ${INDEX.generated} · ${INDEX.count} draft · ${fmt(INDEX.words)} kata`
    : '';
}

function route() {
  const r = parseHash();
  if (r.view === 'detail') renderDetail(r.slug, r.tab);
  else renderHome();
  updateFooter(r.view === 'detail' ? entryBySlug(r.slug) : null);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/* --------------------------------- events -------------------------------- */

qInput.addEventListener('input', () => {
  FILTER = qInput.value.trim();
  if (parseHash().view !== 'home') location.hash = '#/';
  else renderHome();
});

function toggleTheme() {
  const cur = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = cur;
  try { localStorage.setItem('sd-theme', cur); } catch (_) {}
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', cur === 'light' ? '#f5f7f9' : '#0a0c0f');
}

document.getElementById('theme').addEventListener('click', toggleTheme);

document.addEventListener('keydown', (ev) => {
  const typing = /^(input|textarea)$/i.test(ev.target.tagName);
  if (ev.key === '/' && !typing) { ev.preventDefault(); qInput.focus(); qInput.select(); return; }
  if (ev.key === 'Escape') { if (typing) { qInput.value = ''; FILTER = ''; qInput.blur(); renderHome(); } return; }
  if ((ev.key === 't' || ev.key === 'T') && !typing) { toggleTheme(); return; }
  if (typing) return;

  const r = parseHash();
  if (r.view !== 'detail') return;
  const i = INDEX.entries.findIndex((x) => x.slug === r.slug);
  if (ev.key === 'ArrowRight' && i < INDEX.entries.length - 1) location.hash = `#/s/${INDEX.entries[i + 1].slug}`;
  if (ev.key === 'ArrowLeft' && i > 0) location.hash = `#/s/${INDEX.entries[i - 1].slug}`;
});

window.addEventListener('hashchange', route);

/* --------------------------------- init ---------------------------------- */

try {
  const saved = localStorage.getItem('sd-theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch (_) {}

fetch('index.json', { cache: 'no-cache' })
  .then((r) => { if (!r.ok) throw new Error('index.json ' + r.status); return r.json(); })
  .then((idx) => {
    INDEX = idx;
    document.getElementById('foot-right').textContent = `index ${idx.generated} · ${idx.count} draft · ${fmt(idx.words)} kata`;
    route();
  })
  .catch((err) => {
    app.innerHTML = `<div class="card empty">Gagal memuat index.json — ${esc(err.message)}</div>`;
  });
