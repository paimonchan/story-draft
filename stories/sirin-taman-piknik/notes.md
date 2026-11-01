# Catatan · Bekal Buat Sirin

Lane usulan di eikei-plan: **`cha_sirin_taman_piknik_01`** (seri smol Cha Sirin).
Semua aturan di bawah bukan karangan, diambil dari lane yang sudah jalan
(`cha_sirin_pigeon_01`, `cha_sirin_kanglim_01`, `cha_sirin_daily_01..04`) + `docs/16`.

## Kenapa cerita ini ditulis begini

| Batasan produksi | Konsekuensi di cerita |
|---|---|
| Pipeline **OBVPM extend** = satu take kontinu, satu lokasi, tanpa cut | satu taman, satu bangku, 8 segmen ~5 dtk, tidak ada pindah tempat |
| Kamera face-first: **muka Sirin = subjek** di setiap segmen | aksi Kanglim selalu terjadi **di frame yang sama** dengan muka Sirin; tidak ada segmen "milik Kanglim" |
| **Dialog Kanglim + vokal Sirin** (pola seri: NO-BGM) | komedi dibawa gestur + SFX; Kanglim 12 baris pendek (tempo 2.5–4 kata/detik, total 11.4 dtk), Sirin 0 baris kata, jadi nol risiko lip-sync di sisi Sirin |
| Maks **3–4 aksi** per segmen | tiap scene cuma satu beat + satu reaksi |
| Maks **1 gerak kamera kecil** per segmen | tidak ada zoom/panjau/overhead, lihat §"Kamera" |
| Anti-cut: satu framing per segmen | tidak ada "cut to", "we see", "meanwhile" |
| Tidak ada karakter ketiga | hanya Sirin + Kanglim (+ 1 merpati sebagai prop hidup, bukan karakter) |
| Tidak ada teks terbaca | kotak bekal, tikar, serbet: polos, tanpa label |

**Mesin komedi (kanonik, sama dengan lane kanglim):** Kanglim = usaha maksimal, hasil nol ·
usahanya dikerjakan **dengan tenang** (kalem, tidak membual, tidak panik, lihat `docs/01`).
Sirin = usaha nol, hasil maksimal. Pembalikan di S6, anticlimax di S7, button di S8.
Eskalasi: tikar → bekal → serbet → semut → lengan hoodie → cardigan → merpati.

## Aset / referensi

| # | Aset | Status |
|---|---|---|
| 1 | Charsheet Cha Sirin (smol), `Pastel Pink-Haired Anime Character Sheet.png` | ✅ ada |
| 2 | Charsheet Kanglim, `Chibi Blue-Haired School Character Sheet.png` | ✅ ada |
| 3 | World plate taman + kursi, **`cha_sirin_pigeon_world_01.png`** | ⚠️ ada, tapi **9:16** → perlu plate **16:9** |

World plate lane pigeon sudah persis lokasi cerita ini (bangku kayu, jalan setapak batu,
rerumputan, kolam di kejauhan, taman kosong) · **tapi plate-nya 9:16, sementara lane ini 16:9**, jadi
world plate perlu **dibuat ulang / di-crop ke 16:9** dengan geometri kamera yang sama seperti take.
Aturan §12.5/§13.5: semua ref wajib satu geometri kamera dengan take, tiga ref di atas
aman (sheet = potret netral, world = eye-level sejajar take).

Prop tambahan kalau perlu: `cha_sirin_pigeon_prop_merpati.png` (merpati, sudah ada) untuk S8.
Kotak bekal + tikar + serbet: biarkan digenerate dari deskripsi (prop sederhana, polos).
Look ref tambahan **tidak perlu**: pelajaran lane pigeon: ref "tiduran di kursi" dicabut,
pose tidur cukup dari deskripsi.

## Identitas (blok kanonik · pakai apa adanya, jangan ditulis ulang)

**Cha Sirin** (dari `cha_sirin_kanglim_01` s1):
> a soft round-cute anime girl with big clear teal eyes that sit half-lidded and drowsy, two
> round pink 2D blush circles floating on her cheeks, and very long pastel-pink hair with a
> springy ahoge. She wears an oversized black zip hoodie much too big for her (pale grey inner
> hood, white shirt collar and a small dark necktie peeking out), a short dark pleated skirt,
> long cream slouch socks bunched at her ankles and chunky black shoes. She is soft, sleepy,
> endlessly low on energy, and her deadpan face does the comedy.

**Kanglim**:
> a small chibi schoolboy with messy dark navy hair, sharp blue eyes and a calm, unbothered
> little face. He wears a beige cardigan over a navy sweater vest, a white shirt with a navy
> necktie, navy trousers, black shoes, and a cream backpack on his back. A short wooden stick
> hangs at his hip on a small strap, that stick is his whole personality, and it always returns
> to his hip after he uses it.

**Two-shot rule:** Sirin di **KIRI** frame, Kanglim di **KANAN**, kepala Kanglim selalu lebih
rendah (chibi). Sirin tetap di kiri di setiap segmen.

## Kamera (terukur, dari `cha_sirin_daily_04` §12)

- **Steady eye-level**, satu level sepanjang lane. Jangan tulis `looking gently up/down`
  → cam_sd meledak 9.09 (patah parah).
- Jangan kunci kamera total (`stays upright in the same spot`) → cam_px 0.02 = beku.
- Target: **cam_px 0.1–0.4, cam_sd ≤ 0.8**. Frasa yang diterima user: `steady eye-level`.
- Satu gerak kecil per segmen (drift/arc). **Jangan** pakai kosakata shot-type (`zoom`,
  `cut to`, `close-up shot`) untuk gerak kontinu, tulis gerak fisik + objek yang keluar frame.
- Face-side guard: kamera selalu di sisi muka Sirin, termasuk saat ada gerakan.
- Framing ladder: pelebaran maks 1 level per segmen; jangan buka extreme CU lalu minta taman penuh.

## Audio

- Ambience taman siang: angin di daun, burung jauh, dengung kota tipis, gemerisik rumput.
- SFX: kain tikar, angin meniup serbet, kotak bekal diangkat, **langkah kaki kecil banyak
  (semut = tidak terdengar, jadi bunyi dari Kanglim menggaris tanah dan berdiri satu kaki)**, kepakan merpati, kunyahan pelan.
- **Dialog:** Kanglim 12 baris (33 kata, register kalem: pendek, datar, tanpa klaim dan tanpa panik); dua di antaranya
  diucapkan dengan **mulut tertutup kain** (S2 tikar, S7 cardigan) sehingga tidak butuh animasi mulut.
- **Vokal Sirin (bukan kata):** desahan, *hmm*, *hmmm*, dengkur, *nng*, *haaah*, *mmm* (7 kali).
  Semuanya SFX + mikro-ekspresi, tidak pernah jadi baris dialog.
- Musik: pizzicato ringan dan lincah; **berhenti total** di S6 (gerakan malas) dan S7 (beku).
- NO-BGM untuk render (BGM di-mix luar), pola seri.

## Checklist sebelum build

- [ ] tiap segmen dibuka **anchor state** yang menyebut 4+1 elemen frame terakhir: (a) posisi
      Sirin & Kanglim, (b) apa di tangan / di sekitar, (c) arah angin & semut, (d) posisi + tinggi
      kamera, (e) apa yang benar-benar terlihat dari kamera itu
- [ ] penutup tiap segmen menyatakan state akhir eksplisit (`The clip ends on this exact state and holds it`)
- [ ] tidak ada kata `zoom` / `cut to` / `meanwhile` / `we see` / `flash` / `flicker`
- [ ] tidak ada karakter ketiga, tidak ada teks terbaca di frame
- [ ] max 3–4 aksi per segmen, tiap aksi punya titik kontak + reaksi

## Status

- [x] story.md (8 segmen, satu lokasi; Kanglim 12 baris dialog, Sirin 7 vokal ekspresif)
- [x] storyboard.md v7, anchor 4+1 di semua segmen, sumbu/eyeline, color script, prioritas + risiko, urutan uji, status tracker, **lapisan dialog & vokal**
- [ ] perbarui kolom **Status** di `storyboard.md` tiap segmen selesai diuji (`belum diuji` → `diuji` → `final`)
- [ ] serahkan ke lane prompt (`eikei-plan`) untuk plan + pack per segmen, bukan urusan repo ini
