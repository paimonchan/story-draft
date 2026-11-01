# 02 · Batasan H3 yang mengikat bentuk storyboard

Semua angka di sini **terukur dari lane yang sudah jalan**, bukan teori. Sumber: `docs/16`
(playbook Qwen3-VL + anti-cut) dan `iteration_log` lane `cha_sirin_daily_01..04`,
`cha_sirin_mirror_01`, `cha_sirin_cookie_01`, `abel_lantern_01`, `abel_sneeze_01`.

Kenapa aturan produksi masuk dokumen cerita: **batasan model menentukan bentuk ceritanya.**
Satu take kontinu = satu lokasi; komedi lewat gestur; maks 1 gerak kamera kecil
per segmen = beat cerita harus sederhana dan bisa dibaca dalam ~5 detik.

## Batas dokumen ini

Yang diurus di sini: **batasan model yang mengubah bentuk cerita & storyboard**: supaya
storyboard-nya bisa dibaca model dan tidak meminta hal yang mustahil.

Yang **tidak** diurus di sini: cara menyusun prompt video (format prompt, tag referensi,
penempatan dialog & ambience, urutan section). Itu kerjaan lane prompt di `eikei-plan`,
dikerjakan agent yang menyesuaikan sendiri. Repo ini berhenti di storyboard yang terbaca.

## Bentuk klip: OBVPM extend

Klip panjang disusun dari segmen ~5 detik yang disambung, bukan satu render panjang.

Konsekuensinya untuk storyboard: **satu segmen = satu take kontinu ~5 detik**, beat cerita harus
selesai di jendela itu, dan state akhir tiap segmen harus dinyatakan supaya segmen berikutnya bisa
nyambung (lihat checklist di bawah).

Cara teknis menyambung klipnya (extend, pin timeline, urutan blok prompt) dikerjakan di lane
produksi: bukan di dokumen cerita ini.

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
  Kata "zoom" = shot baru (terbukti: cut keras wide → close-up di 5.2s). Tulis gerak kamera sebagai
  gerakan fisik + objek yang keluar frame + jarak antaranya.
- Gerak besar (`top-down`, `overhead`, `bird's-eye`, tarikan jauh dalam satu take) → model
  **memotong**. Kalau butuh memperlihatkan banyak hal, suruh hal itu **masuk ke frame yang sama**.

## Anti-cut: 7 kelas kegagalan yang sudah pernah kejadian

1. **Gerak kamera besar** → model cut. Maks 1 gerak kecil/segmen.
2. **View/subject switch**: `the camera holds: below…`, `we see…`, `meanwhile`, `cut to`,
   `the wide last shot` = shot kedua. Satu framing per segmen.
3. **State mismatch di anchor**: anchor `The clip opens exactly where the last one ended` wajib
   menyebut **4+1 elemen** yang sama persis dengan frame terakhir: (a) posisi karakter,
   (b) apa di tangan / di sekitar, (c) arah gerak elemen bergerak (angin, musuh, air),
   (d) posisi + tinggi kamera, (e) apa yang **benar-benar terlihat** dari posisi kamera itu.
   Kalau objek mustahil terlihat dari situ, model pasti cut.
4. **Lompatan skala framing**: buka extreme close-up lalu minta lokasi penuh dalam take yang sama
   = cut. **Framing ladder**: pelebaran maks **1 level per segmen**
   (extreme CU → CU → close medium → medium → medium-wide → wide).
5. **Blok warisan era framing lama**: sisa frasa lama (`tight`, `on her face`, `close`) masih
   ada di blok CINEMA padahal framing lane sudah digeser → lompat di TENGAH klip (t ≈ 40–45%).
   Sisir SEMUA frasa, bukan cuma `summary`. Guard positif yang dipakai:
   *"The very first frame of the clip is already in the same framing the previous beat ended
   with: the same distance, the same angle, the same shot."*
6. **State akhir tidak dinyatakan** → kontinuitas antar-segmen putus.
   Tutup tiap segmen: *"The clip ends on this exact state and holds it for a beat"*.
7. **Beat telat 1 segmen**: blok extend langsung menyuruh aksi baru tanpa menjembatani state
   akhir. Fix: anchor state pembuka + aksi pertama eksplisit.

Tambahan penting:

- **Kontak ≠ cut.** Kalau aksi "tidak kena", biasanya storyboard tidak menyebut titik kontak + reaksi.
  Tulis: `her foot lands square on the nearest blob … it bursts into a puff at her foot`.
- **Face-side guard** (lane face-first): walk tanpa arahan kamera → H3 pilih kamera di BELAKANG
  = muka hilang. Kunci: *"the camera leading her the whole way, drifting backward in front of her
  face"*, dan guard umum *"it always sits on the face side of her"*.
- **Objek di ref bisa terduplikasi**: world ref berisi objek kunci + prompt meng-anchor objek itu →
  H3 mempertahankan objek parkir SAMBIL membuat salinan untuk dipakai. Deklarasikan *"ONE single …"*
  dan jangan jadikan objek itu patokan tetap di storyboard (patokan tetap hanya untuk environment).
- **Kontradiksi fisik "apa yang kamera lihat"**: jangan sebut detail yang ada di sisi tak terlihat
  (mis. tombol/isi layar sambil bilang punggungnya menghadap kamera), model akan memutar objek
  supaya detail itu kelihatan. Selalu nyatakan **apa yang kamera lihat**, dan pindahkan detail sisi
  tersembunyi keluar dari deskripsi visual.
- **Kata terlarang**: `flicker`/`flickering` → strobe (kecerahan berdenyut; |ΔLum| naik dari 0.42
  ke 12.6 per frame). `flash`/`flashes` sekeluarga. Ganti ke cahaya stabil: `its light steady and
  soft on her face`, `the soft light moving slowly across her face`.
- **Micro-motion anti-freeze** harus pakai detail sisi yang terlihat: napas, blink, rambut sway,
  tangan bergeser, cahaya bergerak pelan. Tombol/stick/isi layar TIDAK aman.
- **Relokasi besar harus di-stage** langkah demi langkah (*"pushes herself off the sill and shuffles
  back to the sofa, step by step"*), satu klausa untuk 5 detik bikin model loncat ke wide shot.

## Audio

- Seri ini **NO-BGM** (musik di-mix di luar klip). Yang masuk klip: ambience + SFX + dialog.
- **Dialog hanya milik karakter yang bicara.** Di seri ini Kanglim bicara; Sirin **tidak pernah
  bicara** dan suaranya (desahan, gumam, dengkur) ditulis sebagai **prosa** di `story.md`, bukan
  baris dialog. Karena mulut Sirin tidak pernah membentuk kata, tidak ada risiko lip-sync di sisinya.
- **Kalau ada dialog:** ucapannya ditulis di `story.md` sebagai baris sendiri di dalam tanda kutip,
  lalu di storyboard dicatat **kapan mulutnya bergerak** (jendela buka/tutup) + beat fisik yang
  menempel padanya. Jendela mulut = panjang kalimatnya pada tempo wajar (**2.5–4 kata/detik**);
  kalau kalimatnya tidak muat di dalam segmen, **potong kalimatnya**, jangan panjangkan jendelanya. Jangan taruh aksi besar di beat yang sama
  dengan dialog panjang (risiko mouth drift).
- **Mulut yang tidak terlihat** (tertutup kain, di balik objek) dicatat eksplisit: di situ tidak ada
  mulut yang perlu dianimasikan, cuma kain yang bergerak tipis.
- Musik: berhenti total di beat deadpan (itu punchline auditif), dicatat di storyboard sebagai
  keadaan audio, bukan sebagai instruksi mixing.

## Checklist storyboard sebelum dinyatakan siap

- [ ] satu framing per segmen, framing ladder ≤ 1 level
- [ ] anchor state 4+1 elemen di pembuka tiap segmen, state akhir eksplisit di penutup
- [ ] maks 3–4 aksi per segmen, tiap aksi punya titik kontak + reaksi
- [ ] tidak ada `zoom` / `cut to` / `meanwhile` / `we see` / `flash` / `flicker`
- [ ] tidak ada karakter ketiga, tidak ada teks terbaca
- [ ] semua ref satu geometri kamera dengan take
- [ ] daftar "detail yang kusebut" vs "sisi yang dilihat kamera", tidak ada yang bertabrakan

## Verifikasi storyboard (bukan verifikasi render)

- Baca satu segmen sebagai caption visual. Kalau ada kalimat yang **menyuruh** ("buat dia…",
  "zoom ke…") atau merujuk hal yang tidak kelihatan kamera, tulis ulang jadi kalimat yang bisa
  dilihat.
- Tabel audit di `storyboard.md` ("detail yang kusebut" vs "sisi yang dilihat kamera") tidak boleh
  punya baris yang bertabrakan.
- Tiap aksi harus punya hasil yang kelihatan: titik kontak + reaksi.
- Kalau satu segmen tidak bisa dibayangkan sebagai satu take kontinu tanpa cut, pecah segmennya,
  jangan tambah gerak kamera.
