# AGENTS.md · Story Draft

Panduan untuk agent (dan manusia) yang kerja di repo ini. Baca ini dulu sebelum menambah
atau mengubah apa pun.

## Repo ini apa

Lane **draft story mentah** untuk prompt video AI (target **MiniMax H3**). Cerita dulu,
prompt video belakangan. Web: https://paimonchan.github.io/story-draft/, zero-build
(HTML/CSS/JS vanilla, tanpa npm), sumber data tunggal `index.json`.

Hubungan dengan repo lain:

| Repo | Isi | Visibilitas |
|---|---|---|
| `paimonchan/story-draft` (ini) | draft story mentah + dokumen konteks | public |
| `paimonchan/prompt-script` | script per-part siap ditempel ke node H3 (berurutan) | public |
| `paimonchan/prompt-eiken-h3` | katalog prompt yang sudah settle (T2V/FL2V/R2V) | public |
| `paimonchan/eikei-plan` | **state live** produksi: lane, plan, iteration log, builder script, workflow ComfyUI | **private** |

Alur: **story di sini → lane prompt di `eikei-plan` → kalau jadi seri berurutan, script per-part
di `prompt-script` → kalau settle, masuk `prompt-eiken-h3`.**

## Layout

```
stories/<slug>/story.md   ← frontmatter + prosa (heading ## = scene/beat)
stories/<slug>/notes.md   ← potongan deskripsi visual, ref visual, peta shot, keputusan
templates/story-template.md
tools/build_index.py      ← stories/**/story.md → index.json + data/<slug>.json
tools/new_story.py        ← scaffold folder draft baru
assets/                   ← web zero-build
docs/                     ← konteks riset & aturan produksi, BACA SEBELUM MENULIS
index.json, data/*.json   ← GENERATED, jangan diedit tangan
```

## Konvensi wajib

1. **Body = prosa apa adanya.** Pecah scene pakai heading `##` (satu scene ≈ satu shot). Catatan
   produksi jangan ditaruh di `story.md`, taruh di `notes.md`.
2. **Frontmatter**: `title, status, date, genre, lang, logline, characters, setting, target,
   format, duration, beats, tags, non_verbal`.
   - `status` ∈ `draft | developing | final | adapted | parked`
   - **Kutip nilai yang mengandung `:`** (`title`, `logline`, `setting`). Nilai ber-`:` tanpa kutip
     bikin `yaml.safe_load` error → `build_index.py` mati untuk SELURUH repo, bukan cuma entry itu.
   - `non_verbal: true` untuk lane tanpa dialog (pola seri Cha Sirin), mematikan check dialog.
   - `beats` opsional (default = jumlah heading).
3. **Satu draft = satu folder** (`stories/<slug>/`), `notes.md` di-resolve sebagai sibling.
4. **Kalau draft ini lanjutan seri yang sudah ada**, sebut kanonnya di `notes.md` dan pakai blok
   identitas dari `docs/01-konteks-sirin-kanglim.md` apa adanya, jangan tulis ulang dari nol.
5. **`index.json` dan `data/*.json` generated.** Setelah nambah/edit draft:
   ```bash
   python3 tools/build_index.py            # regenerate
   python3 tools/build_index.py --check    # error skema (gagalkan CI) vs peringatan
   python3 -m unittest discover -s tests -p "test_*.py"
   ```
6. Push ke `main` → GitHub Actions regenerate + deploy Pages. Jangan push kalau `--check` atau
   tests merah.
7. **Batas repo ini: cerita + storyboard yang bisa dibaca model.** Adaptasi jadi prompt video
   (format prompt, tag referensi, penempatan dialog & ambience) **bukan** kerjaan repo ini, itu
   dikerjakan di lane prompt oleh agent yang menyesuaikan. Sebelum menulis storyboard, baca
   `docs/02-aturan-produksi-h3.md`. Ringkasnya: satu lane = satu take kontinu satu lokasi, segmen
   ~5 dtk, kamera steady eye-level, satu framing per segmen, maks 1 gerak kamera kecil, non-verbal
   = nol risiko lip-sync, tidak ada karakter ketiga & tidak ada teks terbaca di frame.
8. **Setiap `.md` di folder draft wajib punya jalan tampil di web**: `story.md` (bagian Cerita),
   `notes.md` (bagian Catatan), `storyboard.md` (bagian Storyboard). Kalau menambah jenis file baru,
   tambahkan render-nya di `assets/app.js` **di commit yang sama**. File yang tidak disurface
   tidak akan pernah kelihatan di halaman, dan `build_index.py` hanya memberi peringatan.
   Web adalah permukaan baca utama repo ini, bukan pelengkap.

## Aturan keras

- **Jangan install apa pun tanpa izin** (npm/pip/apt), termasuk tool bantu sementara.
- **Jangan pernah menulis isi/state repo private (`eikei-plan`) ke repo ini.** Yang boleh: teknik,
  aturan, nama karakter, nama aset. Yang tidak: path lokal Windows, status render, isi plan atau
  iteration log.
- Jangan hapus repo. Jangan force-push. Kalau user kerja paralel, `git fetch` + rebase dulu.
- Perubahan besar ke web (`assets/`) → uji di deployment asli, bukan cuma lokal.

## Menulis draft baru

```bash
python3 tools/new_story.py "Judul" --genre komedi --characters "A,B" \
  --setting "..." --logline "..." --tags "x,y" --duration 40
python3 tools/build_index.py
```

Target mutu yang dicek otomatis di panel **Kesiapan draft**: logline, karakter, setting, genre,
tags, ≥2 scene, kalimat ≤45 kata, dialog (atau `non_verbal`), ≥30% kalimat berisyarat visual.
Semua itu heuristik teks, bukan penilaian mutu cerita.

## Verifikasi yang benar-benar membuktikan

- `python3 tools/build_index.py --check` → exit 0
- `python3 -m unittest discover -s tests -p "test_*.py"` → OK
- `gh run watch <id> -R paimonchan/story-draft --exit-status` → build + deploy sukses
- Buka `https://paimonchan.github.io/story-draft/` → baris baru muncul di papan, rail segmen,
  storyboard collapsible & panel Kesiapan draft jalan
