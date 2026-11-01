# Storyboard — Operasi Piknik Sempurna (8 segmen × ~5 dtk)

Storyboard produksi, ditulis ke grammar encoder **Qwen3-VL-32B layer 50** (lihat `docs/02`,
`docs/04`). Versi prosa ada di `story.md`; ini versi yang dipakai buat nulis blok prompt.

| Field | Nilai |
|---|---|
| Versi | **v2** — 2026-11-01 (changelog di bawah) |
| Format | 9:16 vertikal · 24 fps · total ~40 dtk (8 × 5 dtk) |
| Safe area | 9:16: ±5% teratas & terbawah kepotong di feed → kepala, tongkat, dan tangan jangan masuk zona itu |
| Lokasi | **satu taman, satu bangku, satu siang** — tidak ada perpindahan sepanjang 40 dtk |
| Audio | non-verbal, NO-BGM di dalam klip; ambience bed konstan (peta audio di bawah) |

## Cara baca

- **Urutan field tiap segmen selalu sama:** Fungsi/Prioritas/Status → Framing & kamera →
  Sumbu & arah → Cahaya → Aset → sub-beat A/B/C → Audio → **Anchor buka (4+1)** → Anchor tutup.
  Urutan tetap ini yang bikin dua segmen bisa dibandingkan tanpa mikir.
- **Framing resmi lane:** `medium close-up` (chest-up), kamera ~1–1.5 m, **eye-level**, sedikit di
  sisi muka Sirin. Satu framing per segmen, ladder maks 1 level.
- **Sumbu (180°):** garis antara Sirin (**kiri**) dan Kanglim (**kanan**) tidak pernah dilewati —
  kamera selalu di sisi muka Sirin, jadi kiri tetap kiri dan kanan tetap kanan di kedelapan segmen.
  Sirin tidak pernah pindah sisi; Kanglim tidak pernah muncul di kiri Sirin.
- **Cahaya satu kondisi:** siang hangat + matahari menembus dedaunan, berlaku untuk seluruh 40 dtk.
  Yang berubah antar segmen cuma **gerak patch**-nya, bukan kondisi cahayanya.
- **Sub-beat** ditulis urut dengan timing relatif (`as / while / immediately after`) — **angka ms
  dan frame tidak dipakai di deskripsi**; kolom waktu di sini cuma buat perencanaan.
- **Kiri/kanan = dari sudut kamera**, selalu disebut eksplisit.
- **Micro-motion anti-freeze** (boleh dipakai bebas): `her slow breathing`, `her blinks`,
  `the sway of her hair and ahoge`, `the small movements of her hands`,
  `the soft light moving slowly across her face`.
- **Terlarang di deskripsi:** `zoom`, `cut to`, `meanwhile`, `we see`, `flicker`, `flash`, kata
  shot-type untuk gerak kontinu, angka ms/frame, negasi menumpuk.
- **Aturan mikro-ekspresi:** satu perubahan fisik kecil per beat — bukan tur ekspresi. Kelopak
  Sirin default **half-lidded**; makin sedikit gerak, makin kuat deadpan-nya.
- **Anchor 4+1** = lima elemen yang harus sama dengan frame terakhir segmen sebelumnya:
  (a) posisi karakter, (b) apa di tangan / di sekeliling, (c) arah gerak elemen bergerak,
  (d) posisi + tinggi kamera, (e) apa yang **benar-benar terlihat** dari posisi kamera itu.

## Peta cepat

| Seg | Fungsi | Framing | Kamera (teknik → gerak fisik) | Prioritas | Risiko | Beat inti |
|---|---|---|---|---|---|---|
| S1 | orient | MCU | static locked-off | harus | rendah | cold open: uap + Kanglim masuk |
| S2 | escalate | MCU | static, drift mikro | penting | sedang | tikar menutup kepala Kanglim |
| S3 | escalate | MCU | push in sangat pelan | harus | sedang | bekal ditaruh di perut Sirin, dia tidur |
| S4 | escalate | medium | static | opsional | sedang | serbet terbang, daun di hidung |
| S5 | escalate | MCU | static | penting | tinggi | semut, Kanglim menari |
| S6 | **reveal / payoff** | MCU → lebih dekat | push in + slow-motion accent | **harus** | **tinggi** | lengan hoodie jadi tutup |
| S7 | react (anticlimax) | MCU | static locked-off (frame benar-benar diam) | penting | sedang | cardigan menutupi mata Kanglim |
| S8 | resolve / button | two-shot | arc pelan | **harus** | tinggi | merpati di telapak tangan, suapan terakhir |

**Rantai eskalasi (yang bikin 8 segmen ini bukan 8 lelucon terpisah):** tikar → bekal → serbet →
semut → lengan hoodie → cardigan → merpati. Tiap segmen menambah satu rintangan baru untuk Kanglim,
sementara usaha Sirin tetap nol. Uji "satu job per shot": S2–S5 semuanya `escalate` **tapi** masing-masing
rintangannya beda; kalau dua segmen menambah rintangan yang sama, salah satunya harus dilebur.

---

## S1 — Bangku, siang hangat (0.0–5.0)

**Fungsi:** orient · **Prioritas:** harus · **Status:** belum diuji · **Risiko:** rendah

**Framing & kamera:** `medium close-up`, eye-level, Sirin di **kiri** frame duduk di bangku,
Kanglim di **kanan** (belum masuk frame di awal). Frame tidak bergerak sama sekali.

**Sumbu & arah:** sumbu tetap, kamera di sisi muka Sirin. Eyeline Sirin: mula-mula kosong
ke depan-bawah (kelopak setengah), lalu menoleh ~10° ke **kanan** ke arah Kanglim. Kanglim masuk
dari jalan setapak di **kanan**, berhenti di kanan-bawah frame, eyeline ke **kiri** (Sirin).
Patch cahaya didorong angin pelan dari **kanan ke kiri** di rumput.

**Cahaya:** siang hangat, matahari menembus dedaunan; patch daun bergerak pelan di rumput dan di
lengan hoodie-nya. *(Ini kondisi dasar untuk seluruh 40 dtk.)*

**Aset:** world plate taman (`cha_sirin_pigeon_world_01.png`) · charsheet Sirin · charsheet Kanglim.

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

**Anchor buka (4+1):** (a) Sirin **kiri**, duduk miring di bangku, **sendiri** — kanan frame masih
kosong (jalan setapak + rumput); (b) hoodie menumpuk di pangkuan, kotak bekal belum ada, tikar masih
di ransel (di luar frame), tongkat belum terlihat; (c) patch cahaya bergerak pelan, ahoge bergoyang,
napas pelan; (d) kamera MCU eye-level ~1–1.5 m di sisi muka Sirin, **diam**; (e) yang terlihat dari
situ: bangku kayu, rumput, kolam jauh di belakang — Kanglim belum masuk.

**Anchor tutup:** Sirin kepala sedikit ke kanan, kelopak half-lidded, Kanglim berdiri dengan
tongkat terangkat, tikar masih di ransel.

---

## S2 — Operasi dimulai (5.0–10.0)

**Fungsi:** escalate (rintangan 1: tikar) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up` yang sama, static; drift mikro ≤ satu langkah.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim turun ke **bawah** (tangannya sendiri), Sirin tetap
menoleh ke kanan tapi pandangan kosong. Tikar mengembang ke **atas** lalu jatuh menutupi kepala
Kanglim; tepinya menggantung di sisi pipinya.

**Cahaya:** sama dengan S1, patch bergerak pelan; saat tikar mengembang, sisi dalam kain menangkap
cahaya sedikit lebih terang (tidak mengubah kondisi).

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · tikar (polos, dari deskripsi).

- **A.** Kanglim mencabut tikar dari ransel dan membentangkannya dengan dua tangan — lengan
  terentang lebar, tikar mengembang di udara, tepinya naik.
- **B.** Tikar turun dan **menutupi kepalanya sendiri**; tepi tikar menggantung di sisi pipinya.
  Kontak: kain jatuh, ujungnya masih bergerak sedikit setelah berhenti. Dia membeku dengan lengan
  masih terentang; tongkat tetap di pinggangnya.
- **C.** **Reaksi Sirin:** satu kedipan lambat, kelopak turun lalu naik; ekspresi tidak berubah,
  bahu tidak bergerak. Hanya napas, ahoge, dan patch cahaya yang bergerak di hoodie-nya.

**Audio:** kain tikar dibentangkan, angin, kepak kecil; pizzicato berhenti tepat saat tikar
mendarat di kepala.

**Anchor buka (4+1):** (a) Sirin **kiri** duduk, kepala sedikit ke kanan; Kanglim **kanan** berdiri;
(b) tongkat terangkat di tangan kanan Kanglim, tikar masih di ransel, kotak bekal belum keluar;
(c) patch cahaya bergerak pelan, ahoge bergoyang, napas Sirin; (d) kamera MCU eye-level sama, **diam**;
(e) yang terlihat dari situ: dua karakter dalam frame, bangku, rumput — tikar belum terlihat.

**Anchor tutup:** tikar menutupi kepala Kanglim, kedua tangannya masih terentang, Sirin persis
seperti akhir S1 (posisi, kelopak, napas).

---

## S3 — Tugas Sirin (10.0–15.0)

**Fungsi:** escalate (rintangan 2: bekal) · **Prioritas:** harus · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up`; **push in sangat pelan** ke muka Sirin (dolly fisik,
lensa tetap). Objek keluar frame bertahap: rumput di bawah keluar dulu, lalu kolam di belakang.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri** (kotak → Sirin). Eyeline Sirin setelah
melorot: **ke atas** (langit, di luar frame). Kotak bergerak dari kanan-bawah ke kiri-tengah
(perut Sirin) lalu **turun-naik** mengikuti napas.

**Cahaya:** sama; karena kamera mendekat, patch cahaya di hoodie jadi lebih terbaca — biarkan
bergerak pelan, jangan tambah sumber cahaya baru.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal (polos) · tongkat.

- **A.** Kanglim mengangkat kotak bekal dengan dua tangan di kanan bawah frame, lalu
  meletakkannya di perut Sirin. Kontak: kotak menyentuh hoodie, kain tertekan, kotak naik-turun
  mengikuti napas.
- **B.** Kanglim menunjuk kotak itu tiga kali dengan tongkat; tongkat kembali ke pinggang setelah
  tidak dipakai.
- **C.** Sirin mengangguk — sangat pelan, **kelopak sudah menutup sebelum anggukan selesai**. Kepala
  melorot ke sandaran bangku, wajah mendongak ke langit, mulut kecil terbuka lagi, kotak di perut.

**Audio:** kotak diletakkan, tongkat mengetuk udara, langkah kecil, napas panjang saat dia melorot.

**Anchor buka (4+1):** (a) Sirin **kiri** duduk (kepala sedikit ke kanan), Kanglim **kanan** berdiri;
(b) tikar menutupi kepala Kanglim dengan dua tangan masih terentang, tongkat di pinggang, kotak bekal
masih di ransel; (c) tepi tikar masih bergerak sedikit (settling), patch cahaya bergerak pelan;
(d) kamera MCU eye-level, **diam** (push in belum mulai); (e) yang terlihat dari situ: tikar di
kepala Kanglim dari sisi pipi, Sirin utuh dalam frame.

**Anchor tutup:** Sirin telentang di bangku dengan kotak di perut, Kanglim di kanan dengan tongkat
di tangan, tikar masih di kepala Kanglim (belum dibuka).

---

## S4 — Formasi makan siang (15.0–20.0)

**Fungsi:** escalate (rintangan 3: angin) · **Prioritas:** **opsional** · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** melebar satu level ke `medium` (aman di ladder), static.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri-bawah** (mengejar serbet). Sirin eyeline
kosong ke atas (daun mendarat di hidung tanpa reaksi). Serbet bergerak **dari kanan ke kiri**
menyeberang frame; daun jatuh **dari atas** ke hidung Sirin.

**Cahaya:** sama; angin naik → patch bergerak sedikit lebih cepat (satu-satunya perubahan, kondisi
tetap).

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · tikar (di lantai) · serbet + sandwich
+ gelas (polos, dari deskripsi) · daun.

- **A.** Kanglim menyusun sandwich, gelas, serbet di tikar (kanan bawah frame). Tangannya cepat;
  sandwich digeser dua kali; dia mengangguk puas.
- **B.** Angin naik: serbet lepas satu per satu dan terbang rendah **dari kanan ke kiri** menyeberang
  frame di atas rumput. Kanglim mengejar, keluar-masuk frame bawah. Tongkat terlepas dari tangannya
  dan kembali ke pinggangnya sendiri — dia tidak sadar.
- **C.** Satu helai daun jatuh dan mendarat di hidung Sirin. Hidung tidak bergerak, kelopak tidak
  berubah, mulut tetap kecil terbuka. Hanya napas.

**Audio:** kain, angin naik, kepakan serbet, langkah kecil cepat; pizzicato naik tempo.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang di bangku (kepala di sandaran), Kanglim **kanan**
berdiri lalu turun jongkok; (b) tongkat di tangan kanan Kanglim, kotak bekal di perut Sirin, tikar
masih di kepala Kanglim; (c) patch cahaya bergerak pelan, napas Sirin mengangkat kotak pelan;
(d) kamera melebar satu level ke `medium`, eye-level, **diam**; (e) yang terlihat dari situ: bangku
penuh, Sirin telentang, Kanglim dengan tikar di kepala, rumput di bawah.

**Anchor tutup:** serbet masih melayang jauh di kiri belakang, Kanglim jongkok di kanan,
daun di hidung Sirin, kotak masih di perutnya.

---

## S5 — Semut (20.0–25.0)

**Fungsi:** escalate (rintangan 4: semut) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** **tinggi**

**Framing & kamera:** `medium close-up`, static, kamera tetap di sisi muka Sirin.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **bawah** (kaki sendiri) lalu ke **kiri-bawah**
(pagar ranting). Sirin eyeline kosong, satu kedipan lambat. Garis semut mengalir **dari kiri bawah
naik** ke tepi bangku lalu ke **kanan** menuju kotak di perut Sirin; Kanglim tetap di kanan.

**Cahaya:** sama; patch bergerak lebih cepat mengikuti angin, kondisi tidak berubah.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·
ranting (polos) · garis semut (elemen kecil, dari deskripsi).

- **A.** Garis semut hitam muncul dari celah rumput di kiri bawah dan mengalir naik ke tepi bangku,
  lurus menuju kotak di perut Sirin.
- **B.** Kanglim melompat berdiri dan menyusun pagar dari ranting (kontak: ranting menancap di
  tanah, dua ranting jatuh). Semut menembus celah, naik ke sepatunya, lalu ke celananya. Dia menari
  kecil di tempat — kaki bergantian, tongkat terangkat tinggi di atas kepala, muka chibi makin
  serius dan makin konyol.
- **C.** Sirin tidak berubah: napas rata, satu kedipan sangat lambat di tengah kekacauan.

**Audio:** gemerisik kecil, ranting patah, langkah kecil cepat, pizzicato naik tempo lalu berhenti.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang di bangku, Kanglim **kanan** jongkok;
(b) kotak bekal di perut Sirin, daun masih di hidungnya, serbet masih melayang jauh di kiri belakang
(sebagian keluar frame), tongkat di pinggang Kanglim; (c) angin mulai turun, patch cahaya bergerak,
napas Sirin rata; (d) kamera MCU eye-level di sisi muka Sirin, **diam**; (e) yang terlihat dari situ:
bangku, Sirin telentang, Kanglim jongkok di kanan bawah — semut belum muncul.

**Anchor tutup:** semut di celana Kanglim, pagar ranting miring, kotak di perut Sirin belum
tersentuh.

---

## S6 — Satu gerakan malas (25.0–30.0) — puncak

**Fungsi:** **reveal / payoff** (pembalikan) · **Prioritas:** **harus** · **Status:** belum diuji · **Risiko:** **tinggi**

**Framing & kamera:** `medium close-up` yang mendekat pelan sampai muka dan lengan mengisi frame;
**slow-motion accent** di gerakan kain.

**Sumbu & arah:** sumbu tetap, kamera tetap di sisi muka Sirin walau mendekat. Eyeline Kanglim ke
**kiri** (lengan Sirin); Sirin **mata tetap tertutup** — tidak ada eyeline, itu intinya. Lengan
bergerak **dari kanan-tengah ke kiri-bawah** menutup kotak; semut **berbalik** lalu mengalir pergi
ke **kiri bawah**.

**Cahaya:** satu-satunya segmen yang menambah elemen cahaya: **berkas cahaya** menembus dedaunan
dengan **debu menggantung** di dalamnya (slow-motion). Kondisi dasar tidak berubah.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·
semut · lengan hoodie (kain kebesaran — ciri identitas Sirin, jangan berubah bentuk).

- **A.** Tanpa membuka mata, Sirin memutar lengan kanannya sedikit — pergelangan dulu, lalu lengan.
  Lengan hoodie yang kebesaran terlipat turun.
- **B.** Ujung lengan jatuh dan menutupi kotak bekal seperti tutup. Kain bergerak sedikit setelah
  berhenti; debu menggantung di berkas cahaya. (slow-motion: fabric delayed, particles hanging,
  gravity continuous)
- **C.** Semut berhenti di tepi kain, berbalik, dan mengalir pergi dalam satu garis. Sirin menarik
  napas, kelopak tetap setengah tertutup, ahoge naik pelan.

**Audio:** kain jatuh (bukan logam), gemerisik; **musik berhenti total** saat kain menutup.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang (mata tertutup, kelopak setengah), Kanglim
**kanan** membeku berdiri; (b) kotak bekal di perut Sirin **belum** tertutup, daun masih di hidungnya,
tongkat di pinggang Kanglim, pagar ranting miring di tanah; (c) semut masih bergerak naik di celana
Kanglim, patch cahaya bergerak; (d) kamera MCU eye-level di sisi muka Sirin, mulai **mendekat pelan**
(push in); (e) yang terlihat dari situ: muka Sirin + perut + kotak, Kanglim sebagian di kanan.

**Anchor tutup:** lengan Sirin di atas kotak, semut pergi ke kiri bawah, Kanglim membeku di kanan
dengan mulut terbuka.

---

## S7 — Kanglim mencoba meniru (30.0–35.0)

**Fungsi:** react (anticlimax) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up`, **static locked-off** — frame benar-benar diam, yang
bergerak hanya napas Sirin dan kain.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri** (lengan Sirin) lama, lalu ke **bawah**
(cardigan sendiri). Sirin tidak melihat — tidak ada eyeline ke Kanglim. Cardigan terbang **dari
kanan ke kiri** arah kolam, lalu kembali **dari kiri ke atas** dan jatuh ke kepala Kanglim di kanan.

**Cahaya:** sama; saat cardigan melintas ke arah kolam, kain itu menangkap cahaya lebih terang
(bidang terbuka) — kondisi tetap.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · kotak makan Kanglim ·
tikar (di lantai) · cardigan (harus identik dengan S1–S3: krem, di badan Kanglim) · daun di hidung.

- **A.** Kanglim menatap lengan itu lama (kepala menoleh ke kiri frame). Lalu dia melepas
  cardigan-nya, melipatnya dua kali dengan hati-hati, dan meletakkannya di atas kotak makannya
  sendiri. Kontak: cardigan menutupi kotak.
- **B.** Angin mengangkat cardigan itu tinggi, membawanya menyeberang frame ke arah kolam, lalu
  menjatuhkannya **ke kepala Kanglim**; dia membeku dengan cardigan menutupi matanya.
- **C.** Sirin tidak melihat. Kelopak tidak berubah, tidak ada reaksi — beat kosong yang jadi
  punchline.

**Audio:** kain, angin, lalu **hening** setelah cardigan mendarat. Tanpa musik.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang dengan lengan masih di atas kotak, Kanglim
**kanan** membeku berdiri dengan mulut terbuka; (b) kotak bekal tertutup lengan, daun masih di
hidung Sirin, tongkat di pinggang Kanglim, tikar di lantai; (c) sisa gerak kain lengan sudah
berhenti, semut sudah keluar frame kiri bawah, patch cahaya bergerak pelan; (d) kamera MCU
eye-level, **static locked-off** (frame benar-benar diam); (e) yang terlihat dari situ: lengan Sirin
di atas kotak, Kanglim di kanan dengan tikar di bawahnya.

**Anchor tutup:** cardigan di kepala Kanglim, tikar di lantai dengan kotak makannya, lengan Sirin
masih di atas kotak bekal.

---

## S8 — Button (35.0–40.0)

**Fungsi:** resolve / button (+ loop) · **Prioritas:** **harus** · **Status:** belum diuji · **Risiko:** tinggi

**Framing & kamera:** **arc pelan** kembali ke `two-shot` — radius konstan, kamera selalu
menghadap Sirin, jarak tidak berubah.

**Sumbu & arah:** sumbu tetap; arc tidak melewati garis Sirin–Kanglim. Eyeline Kanglim pertama ke
**kamera** (mengklaim rencananya), lalu **kiri** ke Sirin. Eyeline Sirin: **bawah** ke sandwich.
Merpati turun **dari atas** ke sandaran di atas bahu Sirin (kiri), lalu naik ke telapak **tangan
kiri** Sirin; sandwich masuk dari **kanan** ke mulut Sirin.

**Cahaya:** kembali ke kondisi cahaya pembuka S1 (siang hangat, patch pelan) — **wajib identik**
supaya loop-nya mulus. Merpati menambah bayangan kecil di bahu Sirin.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·
prop merpati (`cha_sirin_pigeon_prop_merpati.png`) · sandwich.

- **A.** Kanglim mengangkat dagu, menoleh ke arah kamera, dan mengangkat tongkatnya (mengklaim ini
  rencananya sejak awal). Lalu dia duduk di tikar di kanan bawah frame.
- **B.** Seekor merpati gemuk mendarat di sandaran bangku di atas bahu Sirin. Kontak: cakar
  mencengkeram kayu, bulu bergetar. Tanpa membuka mata, Sirin mengangkat tangan kirinya dengan
  malas; merpati naik ke telapak tangannya dan duduk.
- **C.** Kanglim menurunkan sandwichnya ke mulut Sirin. Sirin menggigit kecil — rahang bergerak
  pelan — kelopak tetap setengah tertutup. **Frame terakhir = komposisi S1** (bangku, cahaya hangat,
  muka dopey) → loop.

**Audio:** kepakan sayap, langkah kecil, kunyahan pelan; pizzicato masuk kembali pelan.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang (lengan masih di atas kotak), Kanglim **kanan**
berdiri dengan cardigan di kepala; (b) cardigan menutupi mata Kanglim, tongkat di pinggangnya,
tikar + kotak makan di lantai kanan, daun masih di hidung Sirin; (c) patch cahaya bergerak pelan,
napas Sirin; (d) kamera mulai **arc pelan** dari MCU ke two-shot (radius konstan, menghadap Sirin);
(e) yang terlihat dari situ: Sirin utuh, Kanglim di kanan dengan cardigan di kepala, tikar di bawah.

**Anchor tutup:** identik dengan anchor buka S1 (posisi, framing, cahaya) — loop-able.

---

## Tabel mikro-ekspresi Sirin (dipakai buat audit, bukan buat ditulis semua di tiap segmen)

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

## Peta sumbu & eyeline (audit kontinuitas arah)

| Seg | Sirin (kiri) eyeline | Kanglim (kanan) eyeline | Arah gerak elemen |
|---|---|---|---|
| S1 | kosong → kanan (ke Kanglim) | kiri (ke Sirin) | patch cahaya kanan → kiri |
| S2 | kanan, pandangan kosong | bawah (tangannya) | tikar naik → turun ke kepala Kanglim |
| S3 | atas (langit, di luar frame) | kiri (kotak → Sirin) | kotak kanan-bawah → perut Sirin |
| S4 | kosong ke atas | kiri-bawah (mengejar serbet) | serbet kanan → kiri; daun atas → hidung |
| S5 | kosong, satu kedipan | bawah → kiri-bawah | semut kiri-bawah → naik → kanan (kotak) |
| S6 | **mata tertutup** (tanpa eyeline) | kiri (lengan Sirin) | lengan kanan-tengah → kiri-bawah; semut pergi kiri-bawah |
| S7 | tidak melihat Kanglim | kiri (lengan) → bawah (cardigan) | cardigan kanan → kiri (kolam) → atas → kepala Kanglim |
| S8 | bawah (sandwich) | kamera → kiri (Sirin) | merpati atas → bahu kiri → telapak kiri; sandwich kanan → mulut |

## Color script (cahaya per segmen)

| Seg | Kondisi dasar | Yang bergerak | Elemen cahaya tambahan |
|---|---|---|---|
| S1 | siang hangat, matahari menembus dedaunan | patch pelan di rumput + lengan hoodie | — |
| S2 | sama | patch pelan; sisi dalam tikar menangkap cahaya | — |
| S3 | sama | patch di hoodie lebih terbaca (kamera mendekat) | — |
| S4 | sama | patch bergerak lebih cepat (angin naik) | — |
| S5 | sama | patch lebih cepat lagi | — |
| S6 | sama | patch + kain slow-motion | **berkas cahaya + debu menggantung** |
| S7 | sama | patch pelan; cardigan melintas menangkap cahaya | — |
| S8 | **wajib identik S1** | patch pelan | bayangan kecil merpati di bahu Sirin |

Aturan: kondisi dasar tidak boleh berubah di kedelapan segmen. S6 satu-satunya yang menambah elemen;
S8 wajib kembali ke kondisi pembuka supaya loop-nya nyambung.

## Peta audio (ambience bed + musik)

**Ambience bed (konstan, 0.0–40.0 dtk):** angin di dedaunan + burung jauh + gemerisik rumput tipis.
Bed ini tidak berhenti di segmen mana pun; tiap segmen hanya **menambah** SFX di atasnya.

| Seg | Tambahan SFX | Musik |
|---|---|---|
| S1 | langkah kecil di jalan batu, gemerisik kain | pizzicato masuk di uap kedua |
| S2 | kain tikar dibentangkan, kepak kecil | **berhenti** tepat saat tikar mendarat di kepala |
| S3 | kotak diletakkan, tongkat mengetuk udara, napas panjang | — (tetap hening) |
| S4 | kain, kepakan serbet, langkah cepat | pizzicato naik tempo |
| S5 | gemerisik kecil, ranting patah, langkah cepat | naik tempo lalu berhenti |
| S6 | kain jatuh (bukan logam), gemerisik | **berhenti total** saat kain menutup |
| S7 | kain, angin | **tanpa musik**; hening setelah cardigan mendarat |
| S8 | kepakan sayap, langkah kecil, kunyahan pelan | pizzicato masuk kembali pelan |

## Urutan uji (yang paling berisiko dulu, bukan urutan cerita)

| # | Seg | Kenapa didahulukan |
|---|---|---|
| 1 | S1 | baseline identitas + kamera statis: kalau S1 gagal, tidak ada pembuka dan tidak ada anchor loop |
| 2 | S6 | payoff + slow-motion + fisika kain — risiko tertinggi dan wajib berhasil |
| 3 | S5 | jumlah elemen bergerak paling banyak (garis semut + Kanglim menari + kamera harus diam) |
| 4 | S8 | rantai kontak berurutan (merpati mendarat → naik ke tangan → suapan) + harus balik ke komposisi S1 |
| 5 | S3 | push in + objek diletakkan di tubuh (kontak kain yang ikut napas) |
| 6 | S2 | fisika kain (tikar menutupi kepala sendiri), tanpa gerak kamera |
| 7 | S7 | kain + angin + terbang lintas frame + hening |
| 8 | S4 | objek terbang + daun mendarat presisi di hidung — paling bisa dilepas |

**Kalau ada yang harus dilepas** (prioritas `opsional`): S4 dulu. Cerita masih utuh tanpa S4 karena
S5 menutup rintangan "alam melawan Kanglim" dengan cara yang lebih kuat.

## Status

| Seg | Status | Catatan |
|---|---|---|
| S1–S8 | **belum diuji** | board v2 selesai; belum ada segmen yang dirender |

Status yang dipakai: `belum diuji` → `diuji (seam/aksi)` → `final`. Perbarui kolom ini tiap kali
sebuah segmen lolos uji, dan catat perubahan board di changelog di bawah.

## Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| v1 | 2026-11-01 | Board awal: 8 segmen, sub-beat A/B/C, framing & kamera, audio, anchor tutup, tabel mikro-ekspresi, tabel audit |
| **v2** | 2026-11-01 | Tambah: header format/safe area/versi · **anchor buka 4+1 di SEMUA segmen** (v1 hanya S1) · sumbu & arah + tabel peta eyeline · fungsi shot + rantai eskalasi · prioritas + risiko · color script · peta audio + ambience bed · aset per segmen · urutan uji + rencana pelepasan · status tracker · changelog |

## Audit storyboard sebelum dipakai

| Cek | Patokan | Cara |
|---|---|---|
| Anchor buka | **4+1 elemen, ada di tiap segmen** | hitung blok `Anchor buka` — harus 8 |
| Anchor tutup | state akhir eksplisit di tiap segmen | hitung blok `Anchor tutup` — harus 8 |
| Sumbu | tidak ada segmen yang melewati garis Sirin–Kanglim | baca kolom `Sumbu & arah` tiap segmen |
| Eyeline | tiap segmen menyatakan arah pandang kedua karakter | bandingkan dengan tabel peta eyeline |
| Fungsi shot | tiap segmen punya fungsi (orient/reveal/escalate/react/resolve) | kolom Fungsi terisi semua |
| Prioritas | tiap segmen punya prioritas + alasan kalau opsional | kolom Prioritas terisi semua |
| Cahaya | kondisi dasar sama di 8 segmen; S8 identik S1 | bandingkan dengan color script |
| Ambience | bed konstan, tidak ada segmen yang mematikan bed | bandingkan dengan peta audio |
| Negasi | 1–2 total di deskripsi | hitung `never/no/not/nothing/nobody/neither/without/none` |
| Angka ms/frame | 0 di koreografi | hitung `\d+ ?(ms|frame)` |
| Kata shot-type | 0 (`zoom`, `cut to`, `close-up shot`) | hitung manual |
| Kata strobe | 0 (`flicker`, `flash`) | hitung manual |
| Framing ladder | maks 1 level antar segmen | bandingkan akhir S(n) → awal S(n+1) |
| Anchor isi | 4+1 elemen sama dengan frame terakhir | posisi · apa di tangan/sekeliling · arah gerak (angin/semut) · posisi+tinggi kamera · apa yang terlihat dari situ |
| Karakter ketiga | 0 | — |
| Teks terbaca | 0 | — |
