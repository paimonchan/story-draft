# 03 · Rujukan riset & yang belum diteliti

Dari mana aturan di `docs/02` datang, dan apa yang masih terbuka. Tulis di sini kalau menemukan
sumber baru, supaya sesi berikutnya tidak mengulang riset yang sama.

## Sumber internal (otoritatif)

| Sumber | Isi | Akses |
|---|---|---|
| `eikei-plan/docs/00-index.md` | peta seluruh dokumentasi + spesifikasi rig | `gh api … /contents/docs/00-index.md --jq .content \| base64 -d` |
| `eikei-plan/docs/12-template-inventory.md` | daftar SEMUA template (swap/motion/POV/MV/music/manhwa) + builder | idem |
| `eikei-plan/docs/14-h3-anime-action-research.md` | riset animasi aksi: key pose per-shot, motion conditioning, adapter animasi | idem |
| `eikei-plan/docs/15-cinematic-battle-research.md` | motion reference, fake one-take, tool | idem |
| `eikei-plan/docs/16-h3-qwen-grammar.md` | **playbook prompt**: grammar Qwen3-VL, anti-cut (7 kelas), kontinuitas extend, resep | idem |
| `eikei-plan/docs/18-h3-ecosystem-census.md` | census ekosistem H3 (HF/GitHub/CivitAI): LoRA, quant, tool per use-case | idem |
| `eikei-plan/custom/GUIDE.md`, `H3_guide_base_en.md`, `H3_guide_ref_en.md` | panduan resmi (mirror) | idem |
| `eikei-plan/custom/prompts/<lane>/` | `plan.md`, `iteration_log.md`, `asset_prompts.md`, `h3_prompt_v*.txt` | idem |
| `eikei-plan/custom/scripts/<lane>_content.py` | blok prompt final + sanity assert | idem |
| Skill `minimax-h3-prompts` | ringkasan + references (`h3-prompt-formats`, `qwen3vl-encoder-grammar`, `short-form-vertical`, `prompt-eiken-h3-repo`) | `skill_view` |

Catatan akses: `eikei-plan` **private**: baca lewat `gh api … --jq .content | base64 -d`. Jangan
menyimpulkan state lane dari repo publik (yang publik cuma mirror prompt yang sudah selesai).

## Sumber eksternal (komunitas) · status

- **HN Algolia** (gratis, tanpa auth) dipakai untuk sinyal adopsi:
  - `H3-metal, Native MiniMax-H3 inference for Apple Silicon`, 440 poin, 98 komentar
  - `MiniMax H3 Day-0 Support in ComfyUI: Open Weights, Native Audio, and 2K`, 334 poin, 94 komentar
  - ada eksperimen **sitkom panjang** dengan H3 + turbo LoRA, dan short film H3 di PC rumah
  - Artinya: use-case komedi/episodik memang sudah dijelajahi komunitas, bukan cuma aksi/cinematic.
- **Sumber sinematik eksternal**: **"Cinematic Techniques: Cinematography, Lighting, and Prompts"**
  (<https://melies.co/cinematic-techniques>): 424 teknik / 13 kategori, tiap teknik ada definisi,
  fungsi naratif, cara kerja, contoh film, prompt siap pakai, dan **"tetangga yang ketukar"**.
  Sudah dipelajari 9 halaman inti + seluruh indeksnya → hasil pemetaannya ke H3 ada di
  `docs/04-teknik-sinematik.md`. Sisa yang belum dibaca: `framing`/`camera-angles`/`composition`
  sisanya, 32 teknik `lighting` lain, dan 44 `viral-looks`.
- **Belum dilakukan** (jujur, ini utang riset): sweep **Reddit** (butuh OAuth app / proxy),
  **CivitAI** (LoRA + workflow per use-case), **DEV.to**, dan forum anime-AI. Backend `web_search`
  (Exa keyless) sempat error dan sempat kena **rate limit 429** saat mengambil halaman teknik,
  `hn.algolia.com/api/v1` jalan sebagai gantinya.
- Yang paling perlu dicari saat sweep itu: resep **konsistensi karakter di klip panjang** dan
  **komedi non-verbal** (timing punchline, hold), dua hal yang paling menentukan seri ini.

## Yang belum diteliti / pertanyaan terbuka

- Framing resmi per lane: apakah seri smol Sirin dipatok satu framing (mis. chest-up) untuk semua
  lane, atau boleh per-lane? (Bukti kuat mengarah ke **satu framing resmi per lane**: pelajaran
  kelas 5 "blok warisan".)
- Berapa lama hold deadpan yang masih terbaca "sengaja" dan bukan "beku", belum ada pengukuran.
- Apakah butuh look-ref baru untuk pose spesifik (tidur di bangku, jongkok) atau cukup prompt.
  Bukti sementara: cukup prompt (ref pose pernah dicabut di lane taman).
- Pengaruh LoRA (turbo / Endministrator) terhadap konsistensi identitas Sirin di klip >40 detik.
- Ambang `cam_sd` untuk adegan dengan angin kuat (daun/serbet bergerak), baseline sekarang dari
  adegan dalam ruangan.

## Cara riset yang terbukti (jangan diulang dari nol)

1. Baca lane yang **paling mirip** dulu (`plan.md` + `iteration_log.md` + `*_content.py`), jawaban
   biasanya sudah ada di sana, termasuk kegagalan yang sudah dibayar mahal.
2. Baru baca `docs/16` untuk aturan umum, dan `docs/12/14/18` untuk inventaris/gaya.
3. Sinyal komunitas (HN/CivitAI/Reddit) dipakai untuk **validitas & traksi**, bukan pengganti
   aturan terukur di repo.
4. Setiap temuan baru → tulis aturan (imperatif + alasan) ke `docs/02`, bukan narasi kejadian.
