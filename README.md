# Story Draft

Kumpulan **draft story mentah** untuk prompt generate video AI (target: **MiniMax H3**).
Cerita dulu — prompt video belakangan.

Web: **https://paimonchan.github.io/story-draft/**

Repo ini jalur **cerita & storyboard**. Batasnya jelas: yang dijaga di sini cerita dan
storyboard-nya bisa dibaca model. Adaptasi jadi prompt video (format prompt, tag referensi,
penempatan dialog & ambience) bukan urusan repo ini — dikerjakan di lane prompt oleh agent yang
menyesuaikan. Kalau ceritanya sudah dipecah jadi script per-part, masuk ke
**[prompt-script](https://paimonchan.github.io/prompt-script/)**.

## Dokumen konteks (baca sebelum menulis)

| Dokumen | Isi |
|---|---|
| [`docs/01-konteks-sirin-kanglim.md`](docs/01-konteks-sirin-kanglim.md) | kanon seri: identitas Sirin & Kanglim (blok siap tempel), staging, mesin komedi, aset, lane rujukan |
| [`docs/02-aturan-produksi-h3.md`](docs/02-aturan-produksi-h3.md) | batasan H3 yang mengikat bentuk storyboard: pipeline OBVPM extend, aturan kamera terukur, 7 kelas anti-cut, audio, checklist storyboard |
| [`docs/03-rujukan-riset.md`](docs/03-rujukan-riset.md) | dari mana aturan itu datang, sinyal komunitas, dan yang belum diteliti |
| [`docs/04-teknik-sinematik.md`](docs/04-teknik-sinematik.md) | teknik sinematik (kamera, cahaya, look) + palet yang aman buat H3, tabel "tetangga yang ketukar" untuk audit storyboard |

## Nambah draft

Cara cepat:

```bash
python3 tools/new_story.py "Lampu Terakhir di Pasar Loak" \
  --genre thriller --characters "Nara,Pak Sukron" \
  --setting "Pasar loak Bandung, malam setelah hujan" \
  --logline "Nara kembali ke pasar loak tempat ayahnya hilang." \
  --tags "urban,malam,hujan" --duration 45
```

Atau manual: bikin `stories/<slug>/story.md` (copy `templates/story-template.md`)
plus `notes.md` opsional di folder yang sama. Lalu:

```bash
python3 tools/build_index.py     # tulis index.json + data/*.json
python3 tools/build_index.py --check   # exit 1 kalau ada masalah skema
python3 -m unittest discover -s tests -p "test_*.py"
```

Push ke `main` → GitHub Actions regenerate + deploy Pages otomatis.

**Aturan tampil di web (penting):** setiap `.md` di folder draft harus punya jalan tampil di
halaman — `story.md` → tab **Cerita**, `notes.md` → tab **Catatan**, `storyboard.md` → tab
**Storyboard**. File lain (nama bebas) **tidak akan muncul di web**; `build_index.py` cuma
memberi peringatan. Jadi kalau menambah jenis file baru, **tambahkan dulu render/tab-nya di
`assets/app.js`** — jangan cuma taruh file lalu kasih link ke GitHub, karena web ini adalah
permukaan baca utama repo ini.

`--check` (dipakai CI) gagal hanya untuk masalah yang bikin web rusak: frontmatter nggak
kebaca, `title` kosong, `status` di luar daftar, slug duplikat. Draft yang belum diisi
cuma jadi peringatan — CI tetap jalan, jadi nggak nyangkut gara-gara draft setengah jadi.

## Struktur

```
story-draft/
├── stories/<slug>/story.md   ← cerita mentah (frontmatter + prosa)
├── stories/<slug>/notes.md   ← ide prompt, ref visual, peta shot
├── templates/story-template.md
├── tools/build_index.py      ← stories/**/story.md → index.json + data/
├── tools/new_story.py        ← scaffold folder draft baru
├── assets/                   ← web (zero-build: HTML/CSS/JS vanilla)
├── index.json                ← generated, jangan diedit manual
└── data/<slug>.json          ← generated (isi cerita + notes)
```

## Frontmatter

```yaml
---
title: "Judul Cerita"
status: draft          # draft | developing | final | adapted | parked
date: 2026-11-01
genre: thriller        # bebas: action, horor, drama, ...
lang: id
logline: "Satu kalimat: siapa, mau apa, apa yang menghalangi."
characters: [Nara, Pak Sukron]   # tiap nama harus punya identitas visual yang konsisten
setting: "Pasar loak Bandung, malam setelah hujan"
target: "MiniMax H3"
format: "9:16"
duration: 45           # target durasi klip (detik), opsional
beats:                 # opsional, default = jumlah heading
tags: [urban, malam, hujan]
---
```

Aturan penting:

- **Kutip nilai yang mengandung `:`** (`title`, `logline`, `setting`) — YAML 1.1 bakal
  error dan `build_index.py` mati untuk seluruh repo, bukan cuma entry itu.
- Body = prosa apa adanya. Pecah scene/bab pakai heading `##` — satu scene kira-kira
  nanti jadi satu shot, jadi panjangnya sekalian dibikin masuk akal untuk 3–15 detik.
- Dialog ditulis di barisnya sendiri, diawali em dash (`— Kalimat.`) atau tanda kutip.
  Di storyboard, tandai kapan mulutnya bergerak (buka/tutup, durasi) dan siapa yang bicara.
- `index.json` dan `data/*.json` **generated** — jangan diedit tangan.

## Yang dihitung otomatis

`build_index.py` ngitung statistik prosa (kata, paragraf, kalimat, baris dialog,
estimasi baca), daftar scene dari heading + jumlah kata per scene, kemunculan tiap
karakter, dan 9 pemeriksaan kelengkapan/kesiapan draft:

| Check | Patokan |
|---|---|
| logline | terisi |
| characters | minimal 1 |
| setting | terisi |
| genre | terisi |
| tags | minimal 1 |
| scenes | ≥ 2 heading |
| sentence | kalimat terpanjang ≤ 45 kata |
| dialogue | ≥ 1 baris dialog |
| visual | ≥ 30% kalimat mengandung isyarat visual (cahaya, gerak, warna, shot) |

Semua ini heuristik teks — bukan penilaian mutu cerita. Gunanya buat lihat mana draft
yang metadatanya lengkap dan strukturnya sudah siap dipetakan jadi shot.

## Web

Zero-build (HTML/CSS/JS vanilla, tanpa npm). Baca `index.json`, lalu `data/<slug>.json`
saat draft dibuka. Tata letaknya "Script Desk": **papan** berisi baris draft berzona
(lagi digarap / mateng / parked) + meter kesiapan, dan **desk** satu halaman scroll dengan
rail segmen, storyboard collapsible per segmen (bisa di-deep-link), catatan, dan panel
**Kesiapan draft**. Ada pencarian, filter status/genre/tag, tombol density, dan tema terang/gelap.

Yang dijaga panel Kesiapan draft: cerita & storyboard bisa dibaca model. Adaptasi jadi prompt
video bukan bagian dari web ini.
