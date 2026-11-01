# Storyboard — Operasi Piknik Sempurna (8 segmen × ~5 dtk)

Storyboard produksi, ditulis ke grammar encoder **Qwen3-VL-32B layer 50** (lihat `docs/02`,
`docs/04`). Versi prosa ada di `story.md`; ini versi yang dipakai buat nulis blok prompt.

## Cara baca

- **Framing resmi lane:** `medium close-up` (chest-up), kamera ~1–1.5 m, **eye-level**, sedikit di
  sisi muka Sirin. Satu framing per segmen, ladder maks 1 level.
- **Sub-beat** ditulis urut dengan timing relatif (`as / while / immediately after`) — **angka ms
  dan frame tidak masuk prompt**; kolom waktu di sini cuma buat perencanaan.
- **Kiri/kanan = dari sudut kamera**, selalu disebut eksplisit.
- **Micro-motion anti-freeze** (boleh dipakai bebas): `her slow breathing`, `her blinks`,
  `the sway of her hair and ahoge`, `the small movements of her hands`,
  `the soft light moving slowly across her face`.
- **Terlarang di prompt:** `zoom`, `cut to`, `meanwhile`, `we see`, `flicker`, `flash`, kata
  shot-type untuk gerak kontinu, angka ms/frame, negasi menumpuk.
- **Aturan mikro-ekspresi:** satu perubahan fisik kecil per beat — bukan tur ekspresi. Kelopak
  Sirin default **half-lidded**; makin sedikit gerak, makin kuat deadpan-nya.

## Peta cepat

| Seg | Framing | Kamera (teknik → gerak fisik) | Beat inti |
|---|---|---|---|
| S1 | MCU | static locked-off | cold open: uap + Kanglim masuk |
| S2 | MCU | static, drift mikro | tikar menutup kepala Kanglim |
| S3 | MCU | push in sangat pelan | bekal ditaruh di perut Sirin, dia tidur |
| S4 | medium | static | serbet terbang, daun di hidung |
| S5 | MCU | static | semut, Kanglim menari |
| S6 | MCU → lebih dekat | push in + slow-motion accent | lengan hoodie jadi tutup |
| S7 | MCU | static locked-off (frame benar-benar diam) | cardigan menutupi mata Kanglim |
| S8 | two-shot | arc pelan | merpati di telapak tangan, suapan terakhir |

---

## S1 — Bangku, siang hangat (0.0–5.0)

**Framing & kamera:** `medium close-up`, eye-level, Sirin di **kiri** frame duduk di bangku,
Kanglim di **kanan** (belum masuk frame di awal). Frame tidak bergerak sama sekali.

- **A (0–1.5) — scene state.** Taman kota siang; matahari menembus daun; patch daun bergerak pelan
  di rumput dan di lengan hoodie-nya. Sirin setengah duduk miring, hoodie hitam kebesaran menumpuk
  di pangkuan. Kelopak setengah tertutup, mulut kecil terbuka, dua bulatan pink di pipi. Napas
  pelan, ahoge bergoyang.
- **B (1.5–3.0).** Sirin menguap panjang: rahang turun, kelopak makin sempit, ahoge melengkung
  turun lalu naik lagi, bahu naik sedikit. Selesai — mulut kembali kecil terbuka.
- **C (3.0–5.0).** Kanglim masuk dari jalan setapak di kanan, berhenti di kanan bawah frame, badan
  ditegakkan, tongkat kayu terangkat dari pinggang. **Reaksi Sirin:** kepala menoleh ~10° ke kanan
  ke arahnya, kelopak turun-naik satu kali, lalu berhenti menoleh.

**Audio:** angin di dedaunan, burung jauh, langkah kecil di jalan batu, gemerisik kain.
Pizzicato ringan masuk di uap kedua.

**Anchor buka:** frame pertama sudah two-shot taman — Sirin kiri duduk, Kanglim kanan berdiri,
tongkat di pinggang, tikar belum keluar.
**Anchor tutup:** Sirin kepala sedikit ke kanan, kelopak half-lidded, Kanglim berdiri dengan
tongkat terangkat, tikar masih di ransel.

---

## S2 — Operasi dimulai (5.0–10.0)

**Framing & kamera:** `medium close-up` yang sama, static; drift mikro ≤ satu langkah.

- **A.** Kanglim mencabut tikar dari ransel dan membentangkannya dengan dua tangan — lengan
  terentang lebar, tikar mengembang di udara, tepinya naik.
- **B.** Tikar turun dan **menutupi kepalanya sendiri**; tepi tikar menggantung di sisi pipinya.
  Kontak: kain jatuh, ujungnya masih bergerak sedikit setelah berhenti. Dia membeku dengan lengan
  masih terentang; tongkat tetap di pinggangnya.
- **C.** **Reaksi Sirin:** satu kedipan lambat, kelopak turun lalu naik; ekspresi tidak berubah,
  bahu tidak bergerak. Hanya napas, ahoge, dan patch cahaya yang bergerak di hoodie-nya.

**Audio:** kain tikar dibentangkan, angin, kepak kecil; pizzicato berhenti tepat saat tikar
mendarat di kepala.

**Anchor tutup:** tikar menutupi kepala Kanglim, kedua tangannya masih terentang, Sirin persis
seperti akhir S1 (posisi, kelopak, napas).

---

## S3 — Tugas Sirin (10.0–15.0)

**Framing & kamera:** `medium close-up`; **push in sangat pelan** ke muka Sirin (dolly fisik,
lensa tetap). Objek keluar frame bertahap: rumput di bawah keluar dulu, lalu kolam di belakang.

- **A.** Kanglim mengangkat kotak bekal dengan dua tangan di kanan bawah frame, lalu
  meletakkannya di perut Sirin. Kontak: kotak menyentuh hoodie, kain tertekan, kotak naik-turun
  mengikuti napas.
- **B.** Kanglim menunjuk kotak itu tiga kali dengan tongkat; tongkat kembali ke pinggang setelah
  tidak dipakai.
- **C.** Sirin mengangguk — sangat pelan, **kelopak sudah menutup sebelum anggukan selesai**. Kepala
  melorot ke sandaran bangku, wajah mendongak ke langit, mulut kecil terbuka lagi, kotak di perut.

**Audio:** kotak diletakkan, tongkat mengetuk udara, langkah kecil, napas panjang saat dia melorot.

**Anchor tutup:** Sirin telentang di bangku dengan kotak di perut, Kanglim di kanan dengan tongkat
di tangan, tikar masih di kepala Kanglim (belum dibuka).

---

## S4 — Formasi makan siang (15.0–20.0)

**Framing & kamera:** melebar satu level ke `medium` (aman di ladder), static.

- **A.** Kanglim menyusun sandwich, gelas, serbet di tikar (kanan bawah frame). Tangannya cepat;
  sandwich digeser dua kali; dia mengangguk puas.
- **B.** Angin naik: serbet lepas satu per satu dan terbang rendah **dari kanan ke kiri** menyeberang
  frame di atas rumput. Kanglim mengejar, keluar-masuk frame bawah. Tongkat terlepas dari tangannya
  dan kembali ke pinggangnya sendiri — dia tidak sadar.
- **C.** Satu helai daun jatuh dan mendarat di hidung Sirin. Hidung tidak bergerak, kelopak tidak
  berubah, mulut tetap kecil terbuka. Hanya napas.

**Audio:** kain, angin naik, kepakan serbet, langkah kecil cepat; pizzicato naik tempo.

**Anchor tutup:** serbet masih melayang jauh di kiri belakang, Kanglim jongkok di kanan,
daun di hidung Sirin, kotak masih di perutnya.

---

## S5 — Semut (20.0–25.0)

**Framing & kamera:** `medium close-up`, static, kamera tetap di sisi muka Sirin.

- **A.** Garis semut hitam muncul dari celah rumput di kiri bawah dan mengalir naik ke tepi bangku,
  lurus menuju kotak di perut Sirin.
- **B.** Kanglim melompat berdiri dan menyusun pagar dari ranting (kontak: ranting menancap di
  tanah, dua ranting jatuh). Semut menembus celah, naik ke sepatunya, lalu ke celananya. Dia menari
  kecil di tempat — kaki bergantian, tongkat terangkat tinggi di atas kepala, muka chibi makin
  serius dan makin konyol.
- **C.** Sirin tidak berubah: napas rata, satu kedipan sangat lambat di tengah kekacauan.

**Audio:** gemerisik kecil, ranting patah, langkah kecil cepat, pizzicato naik tempo lalu berhenti.

**Anchor tutup:** semut di celana Kanglim, pagar ranting miring, kotak di perut Sirin belum
tersentuh.

---

## S6 — Satu gerakan malas (25.0–30.0) — puncak

**Framing & kamera:** `medium close-up` yang mendekat pelan sampai muka dan lengan mengisi frame;
**slow-motion accent** di gerakan kain.

- **A.** Tanpa membuka mata, Sirin memutar lengan kanannya sedikit — pergelangan dulu, lalu lengan.
  Lengan hoodie yang kebesaran terlipat turun.
- **B.** Ujung lengan jatuh dan menutupi kotak bekal seperti tutup. Kain bergerak sedikit setelah
  berhenti; debu menggantung di berkas cahaya. (slow-motion: fabric delayed, particles hanging,
  gravity continuous)
- **C.** Semut berhenti di tepi kain, berbalik, dan mengalir pergi dalam satu garis. Sirin menarik
  napas, kelopak tetap setengah tertutup, ahoge naik pelan.

**Audio:** kain jatuh (bukan logam), gemerisik; **musik berhenti total** saat kain menutup.

**Anchor tutup:** lengan Sirin di atas kotak, semut pergi ke kiri bawah, Kanglim membeku di kanan
dengan mulut terbuka.

---

## S7 — Kanglim mencoba meniru (30.0–35.0)

**Framing & kamera:** `medium close-up`, **static locked-off** — frame benar-benar diam, yang
bergerak hanya napas Sirin dan kain.

- **A.** Kanglim menatap lengan itu lama (kepala menoleh ke kiri frame). Lalu dia melepas
  cardigan-nya, melipatnya dua kali dengan hati-hati, dan meletakkannya di atas kotak makannya
  sendiri. Kontak: cardigan menutupi kotak.
- **B.** Angin mengangkat cardigan itu tinggi, membawanya menyeberang frame ke arah kolam, lalu
  menjatuhkannya **ke kepala Kanglim**; dia membeku dengan cardigan menutupi matanya.
- **C.** Sirin tidak melihat. Kelopak tidak berubah, tidak ada reaksi — beat kosong yang jadi
  punchline.

**Audio:** kain, angin, lalu **hening** setelah cardigan mendarat. Tanpa musik.

**Anchor tutup:** cardigan di kepala Kanglim, tikar di lantai dengan kotak makannya, lengan Sirin
masih di atas kotak bekal.

---

## S8 — Button (35.0–40.0)

**Framing & kamera:** **arc pelan** kembali ke `two-shot` — radius konstan, kamera selalu
menghadap Sirin, jarak tidak berubah.

- **A.** Kanglim mengangkat dagu, menoleh ke arah kamera, dan mengangkat tongkatnya (mengklaim ini
  rencananya sejak awal). Lalu dia duduk di tikar di kanan bawah frame.
- **B.** Seekor merpati gemuk mendarat di sandaran bangku di atas bahu Sirin. Kontak: cakar
  mencengkeram kayu, bulu bergetar. Tanpa membuka mata, Sirin mengangkat tangan kirinya dengan
  malas; merpati naik ke telapak tangannya dan duduk.
- **C.** Kanglim menurunkan sandwichnya ke mulut Sirin. Sirin menggigit kecil — rahang bergerak
  pelan — kelopak tetap setengah tertutup. **Frame terakhir = komposisi S1** (bangku, cahaya hangat,
  muka dopey) → loop.

**Audio:** kepakan sayap, langkah kecil, kunyahan pelan; pizzicato masuk kembali pelan.

**Anchor tutup:** identik dengan anchor buka S1 (posisi, framing, cahaya) — loop-able.

---

## Tabel mikro-ekspresi Sirin (dipakai buat audit, bukan buat ditulis semua di prompt)

| Seg | Kelopak | Mulut | Pipi / ahoge | Tangan | Napas |
|---|---|---|---|---|---|
| S1 | half-lidded → uap menyempit | kecil terbuka | ahoge melengkung turun saat uap | di pangkuan | pelan, stabil |
| S2 | satu kedipan lambat | kecil terbuka | tidak berubah | diam | stabil |
| S3 | menutup sebelum anggukan selesai | kecil terbuka lagi | ahoge jatuh ke sandaran | jatuh ke samping | panjang saat melorot |
| S4 | tidak berubah | kecil terbuka | daun di hidung, tidak digerakkan | diam | stabil |
| S5 | satu kedipan sangat lambat | kecil terbuka | tidak berubah | diam | rata |
| S6 | tetap half-lidded | kecil terbuka | ahoge naik pelan | lengan berputar → jatuh menutup kotak | tarikan napas di akhir |
| S7 | tidak berubah | kecil terbuka | tidak berubah | tetap di kotak | stabil |
| S8 | tetap half-lidded | menggigit kecil | tidak berubah | tangan kiri terangkat untuk merpati | stabil |

## Audit sebelum jadi prompt

| Cek | Patokan | Cara |
|---|---|---|
| Negasi | 1–2 per prompt total | hitung `never/no/not/nothing/nobody/neither/without/none` |
| Angka ms/frame | 0 di koreografi | hitung `\d+ ?(ms|frame)` |
| Kata shot-type | 0 (`zoom`, `cut to`, `close-up shot`) | hitung manual |
| Kata strobe | 0 (`flicker`, `flash`) | hitung manual |
| Framing ladder | maks 1 level antar segmen | bandingkan akhir S(n) → awal S(n+1) |
| Anchor | 4+1 elemen sama dengan frame terakhir | posisi · apa di tangan/sekeliling · arah gerak (angin/semut) · posisi+tinggi kamera · apa yang terlihat dari situ |
| Karakter ketiga | 0 | — |
| Teks terbaca | 0 | — |
