/* Story Draft, Script Desk.
   Sumber data tunggal: index.json (+ data/<slug>.json per draft, dimuat saat dibuka).
   Detail = satu halaman scroll (tanpa tab): rail segmen + bagian yang di-anchor. */
'use strict';

const app = document.getElementById('app');
const qInput = document.getElementById('q');
const progEl = document.getElementById('prog');
const DATA = new Map();
let INDEX = null;
let FILTER = '';
let F_STATUS = '';
let F_GENRE = '';
let F_TAG = '';
let SPY = null;

const SECTIONS = [
  ['cerita', 'Cerita'],
  ['storyboard', 'Storyboard'],
  ['notes', 'Catatan'],
  ['ready', 'Kesiapan draft'],
];

/* ---------------------------------- util --------------------------------- */

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const fmt = (n) => (n ?? 0).toLocaleString('id-ID');
const meterClass = (r, t) => (r / t >= 0.75 ? '' : r / t >= 0.5 ? 'mid' : 'low');

function copy(text, btn) {
  const done = () => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = 'Tersalin ✓';
    btn.classList.add('primary');
    setTimeout(() => { btn.textContent = old; btn.classList.remove('primary'); }, 1400);
  };
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (_) {}
    ta.remove();
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(fallback);
  else fallback();
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ------------------------------- markdown -------------------------------- */

let HCOUNT = 0;

function md(src, opts = {}) {
  const lines = String(src || '').replace(/\r/g, '').split('\n');
  const out = [];
  let inCode = false, list = null, table = null;
  const anchorHeadings = opts.anchors !== false;

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
      const lvl = h[1].length;
      if (anchorHeadings) {
        HCOUNT += 1;
        out.push(`<h${lvl} id="h${HCOUNT}" class="scene-anchor">${inline(h[2])}</h${lvl}>`);
      } else out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
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
    if (/^\s*[\u2014\u2013]\s/.test(line) || /^\s*["\u201c][^"\u201d]*["\u201d]\s*$/.test(line)) out.push(`<p class="dialogue">${inline(line.trim())}</p>`);
    else out.push(`<p>${inline(line)}</p>`);
  }
  flushList(); flushTable();
  if (inCode) out.push('</code></pre>');
  return out.join('\n');
}

/* ------------------------------ storyboard ------------------------------- */

/** Pecah storyboard.md jadi blok per `## `; blok yang judulnya "S<n>" dianggap segmen. */
function parseStoryboard(text) {
  const blocks = [];
  const intro = [];
  let cur = null;
  for (const line of String(text || '').replace(/\r/g, '').split('\n')) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { cur = { title: h[1].trim(), body: [] }; blocks.push(cur); continue; }
    if (cur) cur.body.push(line);
    else intro.push(line);
  }
  const segs = [];
  const extra = [];
  for (const b of blocks) {
    const m = b.title.match(/^S(\d+)\b\s*(.*)$/);
    const body = b.body.join('\n').trim();
    if (m) {
      const rest = m[2].replace(/^[\u2014\u2013\u00b7-]\s*/, '');
      const win = (rest.match(/\(\s*([\d.]+\s*[\u2014\u2013-]\s*[\d.]+)\s*\)/) || [, ''])[1];
      const framing = (body.match(/^\s*-?\s*\*\*Framing & kamera:\*\*\s*(.+)$/m) || [, ''])[1];
      const hint = framing.replace(/[`*]/g, '').replace(/\s+/g, ' ').slice(0, 96);
      const meta = body.match(
        /\*\*Fungsi:\*\*\s*([^·\n]+?)·\s*\*\*Prioritas:\*\*\s*([^·\n]+?)·\s*\*\*Status:\*\*\s*([^·\n]+?)·\s*\*\*Risiko:\*\*\s*([^\n·]+)/m
      );
      const [, fungsi, prioritas, status, risiko] = meta || [];
      const clean = (s) => (s || '').replace(/[`*]/g, '').trim().toLowerCase();
      segs.push({
        id: 's' + m[1],
        n: Number(m[1]),
        title: rest.replace(/\s*\([^)]*\)\s*$/, '').trim() || ('Segmen ' + m[1]),
        window: win,
        hint,
        fungsi: clean(fungsi),
        prioritas: clean(prioritas),
        status: clean(status),
        risiko: clean(risiko),
        body,
      });
    } else if (body) {
      extra.push({ id: 'x' + (extra.length + 1), title: b.title, body });
    }
  }
  return { intro: intro.join('\n').trim(), segs, extra };
}

const segLabel = (w) => {
  if (!w) return '';
  const parts = w.split(/[–-]/).map((s) => s.trim());
  if (parts.length !== 2) return w;
  const s = (v) => v.replace(/^0+(?=\d)/, '');
  return `${s(parts[0])}–${s(parts[1])}`;
};

/* --------------------------------- router -------------------------------- */

const parseHash = () => {
  const h = location.hash.replace(/^#\/?/, '');
  if (!h || h === '/') return { view: 'home' };
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 's' && parts.length >= 2) {
    const rest = parts.slice(1);
    let seg = null;
    if (rest.length > 1 && /^s\d+$/i.test(rest[rest.length - 1])) seg = rest.pop().toLowerCase();
    let section = 'cerita';
    if (rest.length > 1 && SECTIONS.some(([id]) => id === rest[rest.length - 1])) section = rest.pop();
    return { view: 'desk', slug: rest.join('/'), section, seg };
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

/* --------------------------------- board --------------------------------- */

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

const ZONES = [
  ['Lagi digarap', ['draft', 'developing'], true],
  ['Mateng', ['final', 'adapted'], false],
  ['Parked', ['parked'], false],
];

/* ---- identitas visual draft: poster CSS-only, deterministik dari slug ---- */
const PALETTES = [
  { a: '#e0a33e', b: '#3a2a12' }, // amber (aksen keluarga)
  { a: '#4fb3a5', b: '#123430' }, // teal
  { a: '#8b7bd8', b: '#251f42' }, // violet
  { a: '#e0705f', b: '#3d1a15' }, // coral
  { a: '#5b9bd5', b: '#152c42' }, // biru
  { a: '#8fbf4f', b: '#233418' }, // hijau
  { a: '#d76fa8', b: '#3c1529' }, // pink
  { a: '#c9a227', b: '#3a2f0e' }, // emas
];
const PATTERNS = ['stripes', 'dots', 'grid', 'rays', 'chevron', 'waves'];

function hash32(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function posterFor(e, h = 76) {
  const k = hash32(String(e.slug || e.title || 'x'));
  const pal = PALETTES[k % PALETTES.length];
  const pat = PATTERNS[(k >>> 3) % PATTERNS.length];
  const [w0, h0] = String(e.format || '16:9').split(':').map(Number);
  const ratio = w0 && h0 ? w0 / h0 : 16 / 9;
  const mono = String(e.title || '?').trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join('').toUpperCase();
  return { pal, pat, width: Math.max(38, Math.round(h * ratio)), mono, fmt: e.format || '' };
}

function posterHTML(e, h = 76, extra = '') {
  const p = posterFor(e, h);
  return `<div class="poster ${extra} p-${p.pat}" style="width:${p.width}px;height:${h}px;--pa:${p.pal.a};--pb:${p.pal.b}" aria-hidden="true"><span class="mono">${esc(p.mono)}</span><i class="fmt">${esc(p.fmt)}</i></div>`;
}

function rowHTML(e) {
  const r = e.ready ?? 0;
  const t = e.ready_total || 9;
  const missing = (e.checks || []).filter((c) => !c.ok).map((c) => c.label.toLowerCase());
  const hl = (v) => {
    const s = esc(v);
    if (!FILTER) return s;
    const q = FILTER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try { return s.replace(new RegExp('(' + q + ')', 'gi'), '<mark>$1</mark>'); } catch (_) { return s; }
  };
  return `
  <a class="row ${e.has_storyboard ? 'hot' : ''}" href="#/s/${e.slug}">
    ${posterHTML(e, 76)}
    <div class="t">
      <h3>${hl(e.title)}${e.has_storyboard ? '<span class="tag">storyboard</span>' : ''}</h3>
      ${e.logline ? `<p class="logline">${hl(e.logline)}</p>` : '<p class="logline muted">logline belum diisi</p>'}
      <div class="sub">
        <span>${esc(e.genre || 'tanpa genre')}</span>
        ${e.format ? `<span>${esc(e.format)}</span>` : ''}
        <span>${fmt(e.words)} kata</span>
        <span>${(e.toc || []).length} scene</span>
        <span>${e.non_verbal ? 'non-verbal' : e.dialogue + ' dialog'}</span>
        ${missing.length ? `<span class="miss">kurang: ${esc(missing.slice(0, 3).join(', '))}${missing.length > 3 ? ` +${missing.length - 3}` : ''}</span>` : ''}
      </div>
    </div>
    <div class="mid">
      <div class="meter">
        <span class="num">siap ${r}/${t}</span>
        <span class="track"><i class="${meterClass(r, t)}" style="width:${Math.round((r / t) * 100)}%"></i></span>
      </div>
      <div class="sub"><span>${esc(e.date || '')}</span></div>
    </div>
    <div class="right">
      <span class="pill ${esc(e.status)}"><i class="dot"></i>${esc(e.status)}</span>
      <span class="arrow">→</span>
    </div>
  </a>`;
}

function renderHome() {
  const entries = INDEX.entries.filter(matches);
  const totals = {
    drafts: INDEX.count,
    words: INDEX.words,
    scenes: INDEX.entries.reduce((a, e) => a + (e.toc || []).length, 0),
    chars: INDEX.characters.length,
  };

  const statuses = Object.entries(INDEX.statuses || {}).filter(([, n]) => n > 0);
  const fbtn = (kind, val, label, active) =>
    `<button class="fbtn" type="button" data-f="${kind}" data-v="${esc(val)}" aria-pressed="${active}">${esc(label)}</button>`;
  const tags = INDEX.tags.slice(0, 8);
  const moreTags = INDEX.tags.length - tags.length;

  const zones = ZONES.map(([label, statuses, hot]) => {
    const list = entries.filter((e) => statuses.includes(e.status));
    if (!list.length) return '';
    return `
    <section class="zone card">
      <div class="zone-head" style="padding:12px 14px 10px;margin:0;border-bottom:1px solid var(--line)">
        <h2>${esc(label)}</h2><span class="count">${list.length}</span>
      </div>
      ${list.map(rowHTML).join('')}
    </section>`;
  }).join('');

  const density = document.documentElement.dataset.density === 'compact';

  app.innerHTML = `
    <div class="board-head">
      <div>
        <h1>Papan produksi draft story</h1>
        <p>Cerita dulu, prompt belakangan. Baris = draft; meter <b>siap</b> = kelengkapan metadata &
           struktur cerita/storyboard. Klik baris untuk buka desk-nya.</p>
      </div>
      <div class="stats">
        <div class="stat"><b>${totals.drafts}</b><span>draft</span></div>
        <div class="stat"><b>${fmt(totals.words)}</b><span>kata</span></div>
        <div class="stat"><b>${totals.scenes}</b><span>scene</span></div>
        <div class="stat"><b>${totals.chars}</b><span>karakter</span></div>
      </div>
    </div>

    <div class="card toolbar">
      <span class="flabel">status</span>
      ${fbtn('status', '', 'semua', !F_STATUS)}
      ${statuses.map(([s, n]) => fbtn('status', s, `${s} ${n}`, F_STATUS === s)).join('')}
      ${INDEX.genres.length ? `<div class="sep"></div><span class="flabel">genre</span>
        ${fbtn('genre', '', 'semua', !F_GENRE)}
        ${INDEX.genres.map((g) => fbtn('genre', g, g, F_GENRE === g)).join('')}` : ''}
      ${INDEX.tags.length ? `<div class="sep"></div><span class="flabel">tag</span>
        ${fbtn('tag', '', 'semua', !F_TAG)}
        ${tags.map((t) => fbtn('tag', t, t, F_TAG === t)).join('')}
        ${moreTags > 0 ? `<span class="muted" style="font-size:11.5px">+${moreTags} tag lain (pakai pencarian)</span>` : ''}` : ''}
      <div class="spacer"></div>
      <button class="fbtn js-density" type="button" aria-pressed="${density}" title="Rapatkan / longgarkan (d)">${density ? '◱ rapat' : '◲ normal'}</button>
    </div>

    ${zones || `<div class="card empty">
      <p><b>Belum ada draft yang cocok.</b></p>
      <p class="mono" style="font-size:12.5px">stories/&lt;slug&gt;/story.md (+ notes.md, storyboard.md)</p>
      <p>Bikin folder baru di <code>stories/</code>, copy <code>templates/story-template.md</code>,
         lalu <code>python3 tools/build_index.py</code>.</p>
    </div>`}`;

  app.querySelectorAll('.fbtn[data-f]').forEach((b) =>
    b.addEventListener('click', () => {
      const kind = b.dataset.f, val = b.dataset.v;
      if (kind === 'status') F_STATUS = val;
      if (kind === 'genre') F_GENRE = val;
      if (kind === 'tag') F_TAG = val;
      renderHome();
    })
  );
  document.querySelectorAll('.js-density').forEach((b) => b.addEventListener('click', toggleDensity));
}

/* ---------------------------------- desk --------------------------------- */

function railHTML(e, sb) {
  const segList = sb.segs.length
    ? sb.segs.map((s) => `<a href="#/s/${e.slug}/storyboard/${s.id}" data-seg="${s.id}">
         <span class="n">${s.n}</span><span>${esc(s.title)}</span>${s.window ? `<span class="w">${esc(segLabel(s.window))}</span>` : ''}
       </a>`).join('')
    : (e.toc || []).map((t, i) => `<a href="#h${i + 1}" data-jump="${t.id}">
         <span class="n">${i + 1}</span><span>${esc(t.text)}</span><span class="w">${t.words}w</span>
       </a>`).join('');

  const meta = [
    ['status', e.status],
    ['genre', e.genre],
    ['format', e.format],
    ['target', e.target],
    ['durasi', e.duration ? e.duration + 's' : ''],
    ['kata', fmt(e.words)],
    ['scene', (e.toc || []).length],
    ['audio', e.non_verbal ? 'non-verbal' : e.dialogue + ' dialog'],
    ['siap', `${e.ready ?? 0}/${e.ready_total || 9}`],
    ['diperbarui', e.date],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '');

  return `
  <aside class="rail">
    <div class="card rail-card">
      <h4>${sb.segs.length ? 'Segmen' : 'Scene'}</h4>
      <nav class="rail-list">${segList || '<span class="muted" style="font-size:12px">belum ada</span>'}</nav>
    </div>
    <div class="card rail-card">
      <h4>Bagian</h4>
      <nav class="rail-list" id="railsect">
        ${SECTIONS.map(([id, label]) => `<a href="#/s/${e.slug}/${id}" data-sect="${id}"><span>${label}</span></a>`).join('')}
      </nav>
    </div>
    ${sb.extra.length ? `<div class="card rail-card">
      <h4>Tabel rujukan</h4>
      <nav class="rail-list" id="railref">
        ${sb.extra.map((x) => `<a href="#${x.id}" data-extra="${x.id}" title="${esc(x.title)}">
          <span>${esc(x.title.length > 30 ? x.title.slice(0, 28) + '…' : x.title)}</span>
        </a>`).join('')}
      </nav>
    </div>` : ''}
    <div class="card rail-card">
      <h4>Meta</h4>
      <div class="rail-meta">
        ${meta.map(([k, v]) => `<div><span class="muted">${esc(k)}</span><b>${esc(String(v))}</b></div>`).join('')}
      </div>
    </div>
  </aside>`;
}

function sectHead(key, title, hint) {
  return `<div class="sect-head"><span class="k">${esc(key)}</span><h2>${esc(title)}</h2>${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;
}

function storyboardSect(e, sb, openSeg) {
  if (!sb.segs.length && !sb.extra.length && !sb.intro)
    return `<section class="card sect" id="sect-storyboard">${sectHead('storyboard', 'Storyboard')}
      <div class="muted">Belum ada <code class="mono">storyboard.md</code> di folder draft ini.
      Isinya: pecahan tiap segmen jadi sub-beat, gerak, ekspresi, kamera fisik, kontak, audio, anchor
      buka/tutup: ditulis ke grammar encoder Qwen3-VL.</div></section>`;

  const seg = sb.segs.map((s) => `
    <details class="seg" id="${s.id}" ${openSeg === s.id ? 'open' : ''}>
      <summary>
        <span class="sn">${s.n}</span>
        <span class="st">
          <b>${esc(s.title)}</b>
          <span class="tags">
            ${s.fungsi ? `<span class="tpill fn">${esc(s.fungsi)}</span>` : ''}
            ${s.prioritas ? `<span class="tpill pr ${esc(s.prioritas)}">${esc(s.prioritas)}</span>` : ''}
            ${s.risiko ? `<span class="tpill rk ${esc(s.risiko)}">risiko ${esc(s.risiko)}</span>` : ''}
            ${s.status ? `<span class="tpill">${esc(s.status)}</span>` : ''}
          </span>
          <small>${esc(s.hint || '')}</small>
        </span>
        <span class="sc">${esc(segLabel(s.window))}</span>
        <span class="chev">▸</span>
      </summary>
      <div class="sbody notes">${md(s.body, { anchors: false })}</div>
    </details>`).join('');

  const extra = sb.extra.map((x) => `
    <details class="seg seg-extra" id="${x.id}">
      <summary>
        <span class="st"><b>${esc(x.title)}</b></span>
        <span class="sc">referensi</span>
        <span class="chev">▸</span>
      </summary>
      <div class="sbody notes">${md(x.body, { anchors: false })}</div>
    </details>`).join('');

  // ringkasan + timeline 40 dtk
  const cnt = (fn) => sb.segs.filter(fn).length;
  const tested = cnt((s) => s.status && !/belum/.test(s.status));
  const secs = (s) => {
    const [a, b] = (s.window || '').split(/[\u2013\u2014-]/).map((v) => parseFloat(v) || 0);
    const d = (isFinite(b) ? b : 0) - a;
    return d > 0 ? d : 5;
  };
  const totalSec = Math.round(sb.segs.reduce((a, s) => a + secs(s), 0));
  const tl = sb.segs.map((s) => `
    <a class="tlseg ${s.prioritas === 'harus' ? 'p-harus' : s.prioritas === 'penting' ? 'p-penting' : 'p-opsional'}${s.risiko === 'tinggi' ? ' r-tinggi' : ''}${s.status && !/belum/.test(s.status) ? ' done' : ''}"
       href="#${s.id}" data-seg="${s.id}" style="flex:${secs(s)} 1 0"
       title="${esc(s.title)}, ${esc(s.fungsi || '')} · ${esc(s.prioritas || '')} · risiko ${esc(s.risiko || '')} · ${esc(s.status || '')}">
      <b>${s.n}</b><span>${esc(segLabel(s.window))}</span>
    </a>`).join('');

  const overview = sb.segs.length ? `
    <div class="sboverview">
      <div class="sbstat">
        <span><b>${sb.segs.length}</b> segmen</span>
        <span><b>${totalSec}</b> dtk</span>
        <span><b>${cnt((s) => s.prioritas === 'harus')}</b> wajib</span>
        <span><b>${cnt((s) => s.risiko === 'tinggi')}</b> risiko tinggi</span>
        <span><b>${tested}/${sb.segs.length}</b> diuji</span>
      </div>
      <div class="tl" aria-label="Timeline 0 sampai ${totalSec} detik">${tl}</div>
      <div class="tl-scale"><span>0 dtk</span><span>${Math.round(totalSec / 2)} dtk</span><span>${totalSec} dtk</span></div>
      <div class="sbfilter" id="sbfilter">
        <span class="flabel">filter</span>
        <button class="fbtn" type="button" data-sbf="all" aria-pressed="true">semua ${sb.segs.length}</button>
        <button class="fbtn" type="button" data-sbf="harus" aria-pressed="false">wajib ${cnt((s) => s.prioritas === 'harus')}</button>
        <button class="fbtn" type="button" data-sbf="tinggi" aria-pressed="false">risiko tinggi ${cnt((s) => s.risiko === 'tinggi')}</button>
        <button class="fbtn" type="button" data-sbf="belum" aria-pressed="false">belum diuji ${sb.segs.length - tested}</button>
        <span class="spacer"></span>
        <span class="muted sbcount" id="sbcount"></span>
      </div>
    </div>` : '';

  return `<section class="card sect" id="sect-storyboard">
    ${sectHead('storyboard', 'Storyboard', `${sb.segs.length} segmen · ${tested}/${sb.segs.length} diuji · ${sb.extra.length} tabel rujukan`)}
    ${overview}
    <div class="raw-tools">
      <button class="btn primary" data-copy="storyboard" type="button">Salin storyboard</button>
      <button class="btn" data-dl="storyboard" type="button">Unduh .md</button>
      <button class="btn" data-openall="1" type="button">Buka semua</button>
      <a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/stories/${esc(e.slug)}/storyboard.md" target="_blank" rel="noopener">GitHub</a>
    </div>
    ${sb.intro ? `<div class="notes" style="margin-bottom:12px">${md(sb.intro, { anchors: false })}</div>` : ''}
    ${seg}
    ${extra}
  </section>`;
}

function readySect(e) {
  const base = INDEX.baseline || {};
  const rows = (e.checks || []).map((c) => `
    <div class="ready-row ${c.ok ? 'ok' : 'warn'}">
      <div class="mark">${c.ok ? '✓' : '!'}</div>
      <div class="lbl">${esc(c.label)}<small>${esc(c.note || '')}</small></div>
      <div class="val">${esc(String(c.value))}</div>
    </div>`).join('');

  const cast = Object.entries(e.mentions || {});
  const sceneRows = (e.toc || []).map((t, i) => `
    <div class="ready-row"><div class="mark mono">${i + 1}</div>
      <div class="lbl">${esc(t.text)}<small>kira-kira jadi satu shot, pecah lagi kalau terlalu panjang</small></div>
      <div class="val">${t.words}w</div></div>`).join('');

  return `<section class="card sect" id="sect-ready">
    ${sectHead('siap', 'Kesiapan draft', `${e.ready ?? 0}/${e.ready_total || 9} terpenuhi`)}
    <div class="statline">
      <div>kata <b>${fmt(e.words)}</b> <span class="muted">/ rata-rata ${fmt(base.words ?? 0)}</span></div>
      <div>paragraf <b>${e.paragraphs}</b></div>
      <div>kalimat <b>${e.sentences}</b> <span class="muted">(rata-rata ${e.avg_sentence} kata)</span></div>
      <div>terpanjang <b>${e.longest_sentence}</b> kata</div>
      <div>isyarat visual <b>${e.visual_pct}%</b></div>
      <div>estimasi baca <b>${e.read_min} mnt</b></div>
    </div>
    <div class="ready-grid">${rows}</div>
    ${cast.length ? `<div class="sect-head" style="margin-top:18px"><h2>Karakter &amp; kemunculan</h2></div>
      <div class="statline">${cast.map(([n, c]) => `<div>${esc(n)} <b>${c}×</b> <span class="muted">di prosa</span></div>`).join('')}</div>` : ''}
    ${sceneRows ? `<div class="sect-head" style="margin-top:18px"><h2>Scene → shot</h2></div><div class="ready-grid">${sceneRows}</div>` : ''}
    <div class="sect-head" style="margin-top:18px"><h2>Batas panel ini</h2></div>
    <div class="notes">
      <p>Yang dijaga di sini cuma <b>cerita &amp; storyboard-nya bisa dibaca model</b>, struktur
      segmen, durasi wajar, aksi yang kelihatan kamera, tidak ada yang bertabrakan.</p>
      <p>Adaptasi ke prompt video (format prompt, tag referensi, penempatan dialog &amp; ambience)
      bukan urusan repo ini, itu dikerjakan di lane prompt oleh agent yang menyesuaikan.</p>
      <p>Batasan H3 yang mengikat bentuk storyboard: <a href="https://github.com/paimonchan/story-draft/blob/main/docs/02-aturan-produksi-h3.md" target="_blank" rel="noopener">docs/02</a> ·
         teknik sinematik: <a href="https://github.com/paimonchan/story-draft/blob/main/docs/04-teknik-sinematik.md" target="_blank" rel="noopener">docs/04</a> ·
         konteks seri: <a href="https://github.com/paimonchan/story-draft/blob/main/docs/01-konteks-sirin-kanglim.md" target="_blank" rel="noopener">docs/01</a>.</p>
    </div>
  </section>`;
}

async function renderDesk(slug, section, seg) {
  const e = entryBySlug(slug);
  if (!e) { app.innerHTML = `<div class="card empty">Draft <code>${esc(slug)}</code> nggak ada di index.</div>`; return; }

  app.innerHTML = `<div class="loading">Memuat draft ${esc(e.title)}…</div>`;
  let d;
  try { d = await loadData(slug); } catch (err) {
    app.innerHTML = `<div class="card empty">Gagal memuat data: ${esc(err.message)}</div>`;
    return;
  }
  if (parseHash().slug !== slug) return;

  const sb = parseStoryboard(d.storyboard);
  HCOUNT = 0;

  const list = INDEX.entries;
  const i = list.findIndex((x) => x.slug === slug);
  const prev = i > 0 ? list[i - 1] : null;
  const next = i >= 0 && i < list.length - 1 ? list[i + 1] : null;

  const chips = [
    ['status', e.status], ['genre', e.genre], ['bahasa', e.lang], ['setting', e.setting],
    ['target', e.target], ['format', e.format], ['durasi', e.duration ? e.duration + 's' : ''],
    ['beat', e.beats], ['kata', fmt(e.words)], ['scene', (e.toc || []).length],
    ['segmen', sb.segs.length || ''],
    ['storyboard', sb.segs.length
      ? `${(d.storyboard.match(/\*\*(v\d+)\*\*/) || [, 'v?'])[1]} · ${sb.segs.filter((s) => s.status && !/belum/.test(s.status)).length}/${sb.segs.length} diuji`
      : ''],
    ['suara', e.non_verbal ? 'non-verbal (tanpa dialog)' : (e.speech || 'berdialog')],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '');

  app.innerHTML = `
    <div class="crumbs">
      <a href="#/">← Papan</a><span>/</span><span>${esc(e.genre || 'tanpa genre')}</span>
      <span>/</span><span>${esc(e.slug)}</span>
    </div>

    <header class="card desk-head">
      <div class="dh-grid">
      ${posterHTML(e, 132, 'poster-lg')}
      <div class="dh-body">
      <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
        <span class="pill ${esc(e.status)}"><i class="dot"></i>${esc(e.status)}</span>
        ${(e.tags || []).slice(0, 8).map((t) => `<span class="pill">${esc(t)}</span>`).join('')}
        <div class="spacer"></div>
        <span class="muted mono" style="font-size:11px">${esc(e.date || '')}</span>
      </div>
      <h1>${esc(e.title)}</h1>
      ${e.logline ? `<p class="logline">${esc(e.logline)}</p>` : ''}
      <div class="chips">${chips.map(([k, v]) => `<span class="chip"><b>${esc(k)}</b> <code>${esc(String(v))}</code></span>`).join('')}</div>
      <div class="actions">
        ${prev ? `<a class="btn" href="#/s/${prev.slug}">← ${esc(prev.title.slice(0, 24))}</a>` : ''}
        ${next ? `<a class="btn" href="#/s/${next.slug}">${esc(next.title.slice(0, 24))} →</a>` : ''}
        <div class="spacer"></div>
        <button class="btn primary" data-copy="story" type="button">Salin cerita</button>
        <button class="btn" data-dl="story" type="button">Unduh .md</button>
        <a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/${esc(e.path)}" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/stories/${esc(e.slug)}/notes.md" target="_blank" rel="noopener">notes.md</a>
        ${e.has_storyboard ? `<a class="btn" href="https://github.com/paimonchan/story-draft/blob/main/stories/${esc(e.slug)}/storyboard.md" target="_blank" rel="noopener">storyboard.md</a>` : ''}
      </div>
      </div>
      </div>
    </header>

    <div class="desk">
      ${railHTML(e, sb)}
      <div id="deskbody">
        <section class="card sect" id="sect-cerita">
          ${sectHead('cerita', 'Cerita', `${fmt(e.chars)} char · ${e.words} kata`)}
          <article class="prose" id="prose">${md(d.content)}</article>
          <details class="seg seg-extra" style="margin-top:14px">
            <summary><span class="st"><b>Lihat mentah (markdown asli)</b></span><span class="sc">raw</span><span class="chev">▸</span></summary>
            <div class="sbody"><pre class="raw">${esc(d.content)}</pre></div>
          </details>
        </section>

        ${storyboardSect(e, sb, seg)}

        <section class="card sect" id="sect-notes">
          ${sectHead('catatan', 'Catatan')}
          ${d.notes?.trim() ? `<div class="notes">${md(d.notes, { anchors: false })}</div>`
            : `<div class="muted">Belum ada <code class="mono">notes.md</code>. Di situ tempat naruh ide prompt, referensi visual, deskripsi karakter tetap, dan peta shot.</div>`}
        </section>

        ${readySect(e)}
      </div>
    </div>`;

  // interaksi
  app.querySelectorAll('[data-copy="story"]').forEach((b) => b.addEventListener('click', () => copy(d.content, b)));
  app.querySelectorAll('[data-dl="story"]').forEach((b) => b.addEventListener('click', () => download(e.slug.replace('/', '--') + '.md', d.content)));
  app.querySelectorAll('[data-copy="storyboard"]').forEach((b) => b.addEventListener('click', () => copy(d.storyboard, b)));
  app.querySelectorAll('[data-dl="storyboard"]').forEach((b) => b.addEventListener('click', () => download(e.slug.replace('/', '--') + '-storyboard.md', d.storyboard)));
  app.querySelectorAll('[data-openall]').forEach((b) =>
    b.addEventListener('click', () => {
      const segs = [...app.querySelectorAll('details.seg')];
      const anyClosed = segs.some((s) => !s.open);
      segs.forEach((s) => { s.open = anyClosed; });
      b.textContent = anyClosed ? 'Tutup semua' : 'Buka semua';
    })
  );
  app.querySelectorAll('.rail-list a[data-seg]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const el = document.getElementById(a.dataset.seg);
      if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    })
  );
  app.querySelectorAll('.rail-list a[data-sect]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      document.getElementById('sect-' + a.dataset.sect)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
  app.querySelectorAll('.rail-list a[data-jump]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      document.getElementById(a.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
  app.querySelectorAll('[data-extra]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const el = document.getElementById(a.dataset.extra);
      if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    })
  );
  app.querySelectorAll('.tl a[data-seg]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const el = document.getElementById(a.dataset.seg);
      if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    })
  );
  const sbf = document.getElementById('sbfilter');
  if (sbf) {
    sbf.querySelectorAll('[data-sbf]').forEach((b) =>
      b.addEventListener('click', () => {
        sbf.querySelectorAll('[data-sbf]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const mode = b.dataset.sbf;
        let shown = 0;
        app.querySelectorAll('details.seg[id^="s"]').forEach((d) => {
          const s = sb.segs.find((x) => x.id === d.id);
          if (!s) return;
          const ok =
            mode === 'all' ||
            (mode === 'harus' && s.prioritas === 'harus') ||
            (mode === 'tinggi' && s.risiko === 'tinggi') ||
            (mode === 'belum' && /belum/.test(s.status || ''));
          d.style.display = ok ? '' : 'none';
          if (ok) shown += 1;
        });
        const c = document.getElementById('sbcount');
        if (c) c.textContent = mode === 'all' ? '' : `${shown} dari ${sb.segs.length} segmen ditampilkan`;
      })
    );
  }

  // deep-link: buka segmen yang diminta, atau lompat ke bagian
  if (seg) {
    const el = document.getElementById(seg);
    if (el) { el.open = true; requestAnimationFrame(() => el.scrollIntoView({ block: 'start' })); }
  } else if (section && section !== 'cerita') {
    requestAnimationFrame(() => document.getElementById('sect-' + section)?.scrollIntoView({ block: 'start' }));
  }

  setupSpy();
  updateFooter(e);
}

/* ------------------------------- scroll spy ------------------------------ */

function setupSpy() {
  SPY?.disconnect();
  const links = [...document.querySelectorAll('#railsect a[data-sect]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map(links.map((a) => [a.dataset.sect, a]));
  SPY = new IntersectionObserver(
    (rows) => {
      const vis = rows.filter((r) => r.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!vis) return;
      links.forEach((a) => a.classList.remove('active'));
      map.get(vis.target.id.replace('sect-', ''))?.classList.add('active');
    },
    { rootMargin: '-70px 0px -70% 0px', threshold: 0 }
  );
  document.querySelectorAll('section.sect').forEach((s) => SPY.observe(s));
}

function onScroll() {
  if (!progEl) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progEl.style.width = h > 0 ? Math.min(100, (window.scrollY / h) * 100) + '%' : '0';
}

/* --------------------------------- shell --------------------------------- */

function updateFooter(e) {
  document.getElementById('foot-left').textContent = e
    ? `${e.title}, ${e.words} kata · ${(e.toc || []).length} scene`
    : 'Story Draft, draft story untuk prompt video AI';
  document.getElementById('brand-sub').textContent = e ? e.title : 'draft story → prompt video AI';
  document.getElementById('foot-right').textContent = INDEX
    ? `index ${INDEX.generated} · ${INDEX.count} draft · ${fmt(INDEX.words)} kata`
    : '';
}

function route() {
  const r = parseHash();
  if (r.view === 'desk') renderDesk(r.slug, r.section, r.seg);
  else { SPY?.disconnect(); renderHome(); }
  updateFooter(r.view === 'desk' ? entryBySlug(r.slug) : null);
  window.scrollTo({ top: 0, behavior: 'auto' });
  onScroll();
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

function toggleDensity() {
  const cur = document.documentElement.dataset.density === 'compact' ? 'normal' : 'compact';
  document.documentElement.dataset.density = cur;
  try { localStorage.setItem('sd-density', cur); } catch (_) {}
  document.querySelectorAll('.js-density').forEach((b) => {
    b.setAttribute('aria-pressed', String(cur === 'compact'));
    b.textContent = cur === 'compact' ? '◱ rapat' : '◲ normal';
  });
}

document.getElementById('theme').addEventListener('click', toggleTheme);
document.getElementById('density-btn')?.addEventListener('click', toggleDensity);

document.addEventListener('keydown', (ev) => {
  const typing = /^(input|textarea)$/i.test(ev.target.tagName);
  if (ev.key === '/' && !typing) { ev.preventDefault(); qInput.focus(); qInput.select(); return; }
  if (ev.key === 'Escape') { if (typing) { qInput.value = ''; FILTER = ''; qInput.blur(); renderHome(); } return; }
  if ((ev.key === 't' || ev.key === 'T') && !typing) { toggleTheme(); return; }
  if ((ev.key === 'd' || ev.key === 'D') && !typing) { toggleDensity(); return; }
  if (typing) return;

  const r = parseHash();
  if (r.view !== 'desk') return;
  const i = INDEX.entries.findIndex((x) => x.slug === r.slug);
  if (ev.key === 'ArrowRight' && i < INDEX.entries.length - 1) location.hash = `#/s/${INDEX.entries[i + 1].slug}`;
  if (ev.key === 'ArrowLeft' && i > 0) location.hash = `#/s/${INDEX.entries[i - 1].slug}`;
});

window.addEventListener('hashchange', route);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

/* --------------------------------- init ---------------------------------- */

try {
  const t = localStorage.getItem('sd-theme');
  if (t) document.documentElement.dataset.theme = t;
  const dn = localStorage.getItem('sd-density');
  if (dn) document.documentElement.dataset.density = dn;
} catch (_) {}

fetch('index.json', { cache: 'no-cache' })
  .then((r) => { if (!r.ok) throw new Error('index.json ' + r.status); return r.json(); })
  .then((idx) => {
    INDEX = idx;
    document.getElementById('foot-right').textContent = `index ${idx.generated} · ${idx.count} draft · ${fmt(idx.words)} kata`;
    route();
  })
  .catch((err) => {
    app.innerHTML = `<div class="card empty">Gagal memuat index.json, ${esc(err.message)}</div>`;
  });
