# 02 — Aturan produksi H3 (yang mengikat bentuk cerita)

Semua angka di sini **terukur dari lane yang sudah jalan**, bukan teori. Sumber: `docs/16`
(playbook Qwen3-VL + anti-cut) dan `iteration_log` lane `cha_sirin_daily_01..04`,
`cha_sirin_mirror_01`, `cha_sirin_cookie_01`, `abel_lantern_01`, `abel_sneeze_01`.

Kenapa aturan produksi masuk dokumen cerita: **batasan model menentukan bentuk ceritanya.**
Satu take kontinu = satu lokasi; non-verbal = komedi lewat gestur; maks 1 gerak kamera kecil
per segmen = beat cerita harus sederhana dan bisa dibaca dalam ~5 detik.

## Format prompt

| Mode | Input | Format |
|---|---|---|
| T2VA | teks | BASE (3 field) |
| I2VA / FL2VA / L2VA | 1–2 gambar | BASE + kalimat alignment |
| Ref2VA | sampai 9 gambar, 3 video, 3 audio | REF2VA 6 section (urutan ketat) |

REF2VA: `subject_definitions` → `summary` → `retention_analysis` → `detailed_description` →
`overall_soundscape` → `non_diegetic_music`.

- Tag `<Picture N>` / `<Subject N>` = urutan **koneksi** di workflow, bukan nama file.
- `summary` dibuka tag tugas: `[reference generation]`, `[video motion transfer]`, dst.
- `retention_analysis`: satu klausa per hal yang direferensikan + marker `fully_preserved` /
  `fully_copy` / `fully_generated` / `not carried over`, masing-masing menyebut `<Picture N>`-nya.
- Ref image biasanya berlatar studio netral → scene nyata harus dideklarasikan `fully_generated`,
  kalau tidak latar abu-abu itu bocor ke video.
- `overall_soundscape` = ambience & suara fisik SAJA. Dialog di `detailed_description` sebagai
  `<d>[Bahasa] teks</d>`, speaker ID `(S1)/(S2)` stabil. `non_diegetic_music` = instrumentasi,
  tempo, dinamika — bukan kata suasana.

## Pipeline seri ini: OBVPM extend

Klip panjang disusun dari segmen ~5 detik yang disambung, bukan satu render panjang.

1. Segmen sebelumnya sudah `+ add to timeline`.
2. Hover tepi kanan klip → pill → menu seam → **`+ extend new`** (bar "next run" harus terbaca
   `extends <clip>`).
3. `duration_seconds` node Timeline ≈ 5.
4. **Ctrl+A di kotak prompt → paste blok segmen berikutnya utuh** (jangan parse manual).
5. Run → cek verdict: `seamless` → add; `soft bump` → boleh add; `hard cut` → Run ulang
   (seed increment otomatis).
6. Ulangi. **Ctrl+S** setelah menyusun timeline.

**Wajib lewat pin/mctx, bukan prompt saja** (pelajaran `cha_sirin_daily_02`): kalau tidak di-pin,
klip baru jadi *root take* — `parent_id`/`relation` kosong, `overlap_frames 0` — dan H3 membangun
ulang staging dari teks (muncul establishing shot + dia masuk lagi dari pintu). Prompt anchor cuma
hint; kontinuitas frame-exact datang dari pin Timeline.

**Semua blok segmen pakai `subject_definitions` / `retention_analysis` / soundscape yang SAMA** —
hanya `summary` + `detailed_description` yang beda per segmen.

## Kamera (terukur dengan phase-correlation per frame)

| Versi | cam_px (kecepatan) | cam_sd (goyang) | Hasil |
|---|---|---|---|
| baseline daily_03 | 0.04–0.33 | 0.20–0.73 | halus |
| + `looking gently up/down` | 2.95 | **9.09** | patah parah |
| kamera dikunci total | **0.02** | 0.15 | beku |
| steady eye-level | 1.04–1.33 | 1.49–1.81 | diterima |

Aturan:

- **Satu level (steady eye-level)**, tidak mengikuti badan naik/turun. `looking gently up/down`
  = pemicu cam_sd tinggi.
- Jangan kunci kamera total → subjek ikut beku.
- Target: cam_px 0.1–0.4, cam_sd ≤ 0.8.
- **Maks 1 gerak kecil per segmen** (drift/arc beberapa langkah), dan kamera **mengikuti** karakter.
- **Jangan pakai kosakata shot-type untuk gerak kontinu**: `zoom`, `cut to`, `close-up shot`.
  Kata "zoom" di prompt = shot baru (terbukti: cut keras wide → close-up di 5.2s). Tulis gerak
  fisik + objek yang keluar frame + jarak antaranya.
- Gerak besar (`top-down`, `overhead`, `bird's-eye`, tarikan jauh dalam satu take) → model
  **memotong**. Kalau butuh memperlihatkan banyak hal, suruh hal itu **masuk ke frame yang sama**.

## Anti-cut: 7 kelas kegagalan yang sudah pernah kejadian

1. **Gerak kamera besar** → model cut. Maks 1 gerak kecil/segmen.
2. **View/subject switch** — `the camera holds: below…`, `we see…`, `meanwhile`, `cut to`,
   `the wide last shot` = shot kedua. Satu framing per segmen.
3. **State mismatch di anchor** — anchor `The clip opens exactly where the last one ended` wajib
   menyebut **4+1 elemen** yang sama persis dengan frame terakhir: (a) posisi karakter,
   (b) apa di tangan / di sekitar, (c) arah gerak elemen bergerak (angin, musuh, air),
   (d) posisi + tinggi kamera, (e) apa yang **benar-benar terlihat** dari posisi kamera itu.
   Kalau objek mustahil terlihat dari situ, model pasti cut.
4. **Lompatan skala framing** — buka extreme close-up lalu minta lokasi penuh dalam take yang sama
   = cut. **Framing ladder**: pelebaran maks **1 level per segmen**
   (extreme CU → CU → close medium → medium → medium-wide → wide).
5. **Blok warisan era framing lama** — sisa frasa lama (`tight`, `on her face`, `close`) masih
   ada di blok CINEMA padahal framing lane sudah digeser → lompat di TENGAH klip (t ≈ 40–45%).
   Sisir SEMUA frasa, bukan cuma `summary`. Guard positif yang dipakai:
   *"The very first frame of the clip is already in the same framing the previous beat ended
   with — the same distance, the same angle, the same shot."*
6. **State akhir tidak dinyatakan** → kontinuitas antar-segmen putus.
   Tutup tiap segmen: *"The clip ends on this exact state and holds it for a beat"*.
7. **Beat telat 1 segmen** — blok extend langsung menyuruh aksi baru tanpa menjembatani state
   akhir. Fix: anchor state pembuka + aksi pertama eksplisit.

Tambahan penting:

- **Kontak ≠ cut.** Kalau aksi "tidak kena", biasanya prompt tidak menyebut titik kontak + reaksi.
  Tulis: `her foot lands square on the nearest blob … it bursts into a puff at her foot`.
- **Face-side guard** (lane face-first): walk tanpa arahan kamera → H3 pilih kamera di BELAKANG
  = muka hilang. Kunci: *"the camera leading her the whole way — drifting backward in front of her
  face"*, dan guard umum *"it always sits on the face side of her"*.
- **Objek di ref bisa terduplikasi**: world ref berisi objek kunci + prompt meng-anchor objek itu →
  H3 mempertahankan objek parkir SAMBIL membuat salinan untuk dipakai. Deklarasikan *"ONE single …"*
  dan jangan anchor objek di `retention_analysis` (anchoring hanya untuk environment).
- **Kontradiksi fisik "apa yang kamera lihat"**: jangan sebut detail yang ada di sisi tak terlihat
  (mis. tombol/isi layar sambil bilang punggungnya menghadap kamera) — model akan memutar objek
  supaya detail itu kelihatan. Selalu nyatakan **apa yang kamera lihat**, dan pindahkan detail sisi
  tersembunyi keluar dari deskripsi visual.
- **Kata terlarang**: `flicker`/`flickering` → strobe (kecerahan berdenyut; |ΔLum| naik dari 0.42
  ke 12.6 per frame). `flash`/`flashes` sekeluarga. Ganti ke cahaya stabil: `its light steady and
  soft on her face`, `the soft light moving slowly across her face`.
- **Micro-motion anti-freeze** harus pakai detail sisi yang terlihat: napas, blink, rambut sway,
  tangan bergeser, cahaya bergerak pelan. Tombol/stick/isi layar TIDAK aman.
- **Relokasi besar harus di-stage** langkah demi langkah (*"pushes herself off the sill and shuffles
  back to the sofa, step by step"*) — satu klausa untuk 5 detik bikin model loncat ke wide shot.

## Audio

- Seri ini **non-verbal, NO-BGM**: ambience + SFX saja; BGM di-mix di luar. Non-verbal = nol
  risiko lip-sync/mouth drift (mode paling aman).
- Kalau ada dialog: `<d>[Japanese] …</d>` + delivery di LUAR tag + speaker ID stabil. Failure mode
  yang diketahui = mouth drift.
- Musik: instrumentasi + tempo + dinamika. Berhenti total di beat deadpan (itu punchline auditif).

## Checklist sebelum kirim prompt

- [ ] satu framing per segmen, framing ladder ≤ 1 level
- [ ] anchor state 4+1 elemen di pembuka tiap segmen, state akhir eksplisit di penutup
- [ ] maks 3–4 aksi per segmen, tiap aksi punya titik kontak + reaksi
- [ ] tidak ada `zoom` / `cut to` / `meanwhile` / `we see` / `flash` / `flicker`
- [ ] tidak ada karakter ketiga, tidak ada teks terbaca
- [ ] semua ref satu geometri kamera dengan take
- [ ] daftar "detail yang kusebut" vs "sisi yang dilihat kamera" — tidak ada yang bertabrakan

## Verifikasi (yang benar-benar membuktikan)

1. `custom/scripts/check_obvpm_prompt_cut.py [pack.md]` — scan per segmen: cut-move, cut-switch,
   anchor hilang, aksi tanpa hasil/kontak, angka frame, backslash, negasi berlebih, lompatan
   framing. Exit 1 kalau ada temuan. (Catatan alat: `framing_marks()` wajib longest-match, kalau
   tidak `medium-wide` terbaca `medium` + `wide` dan menghasilkan lompatan palsu.)
2. `motion_audit.py` (phase correlation antar frame) → cam_px / cam_sd.
3. Verdict seam di Result Preview: `seamless` / `soft bump` / `hard cut`.
4. Deteksi lompatan di tengah klip:
   `ffmpeg -i clip.mp4 -vf "tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -an -f null -`
   Spike ≥ 2.5× rata-rata = kandidat lompatan; konfirmasi dengan ekstrak frame sebelum/sesudah.
5. Uji identitas dulu dengan kamera statis (resep "comes to life": napas, satu blink, rambut sway,
   tilt kepala 2°) — kamera statis mengeluarkan gerak kamera dari analisis kegagalan. Baru tambah
   kamera, aksi, dan suara satu variabel per tes. Catat seed.
