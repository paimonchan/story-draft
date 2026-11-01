# Storyboard · Bekal Buat Sirin (8 segmen × ~5 dtk)

Storyboard produksi, ditulis ke grammar encoder **Qwen3-VL-32B layer 50** (lihat `docs/02`,
`docs/04`). Versi prosa ada di `story.md`; ini versi yang dipakai buat nulis blok prompt.

| Field | Nilai |
|---|---|
| Versi | **v8**: 2026-11-01 (changelog di bawah) |
| Format | **16:9 horizontal** · 24 fps · total ~40 dtk (8 × 5 dtk) |
| Safe area | 16:9: ±5% di **tiap tepi** (kiri/kanan/atas/bawah) → kepala, tangan, dan kotak bekal jangan masuk zona itu |
| Lokasi | **satu taman, satu bangku, satu siang**: tidak ada perpindahan sepanjang 40 dtk |
| Audio | ambience bed konstan + SFX aksi (peta audio di bawah); BGM di-mix di luar klip |
| Suara | **Kanglim bicara** (12 baris, di dalam klip) · **Sirin tidak pernah bicara**, hanya vokal ekspresif (7 kali, SFX) |

## Cara baca

- **Urutan field tiap segmen selalu sama:** Fungsi/Prioritas/Status → Framing & kamera →
  Sumbu & arah → Cahaya → Aset → **Dialog & vokal** → sub-beat A/B/C → Audio →
  **Anchor buka (4+1)** → Anchor tutup.
  Urutan tetap ini yang bikin dua segmen bisa dibandingkan tanpa mikir.
- **Framing resmi lane:** `medium close-up` (chest-up), kamera ~1–1.5 m, **eye-level**, sedikit di
  sisi muka Sirin. Satu framing per segmen, ladder maks 1 level.
- **Sumbu (180°):** garis antara Sirin (**kiri**) dan Kanglim (**kanan**) tidak pernah dilewati,
  kamera selalu di sisi muka Sirin, jadi kiri tetap kiri dan kanan tetap kanan di kedelapan segmen.
  Sirin tidak pernah pindah sisi; Kanglim tidak pernah muncul di kiri Sirin.
- **Cahaya satu kondisi:** siang hangat + matahari menembus dedaunan, berlaku untuk seluruh 40 dtk.
  Yang berubah antar segmen cuma **gerak patch**-nya, bukan kondisi cahayanya.
- **Sub-beat** ditulis urut dengan timing relatif (`as / while / immediately after`), **angka ms
  dan frame tidak dipakai di deskripsi**; kolom waktu di sini cuma buat perencanaan.
- **Dialog = baris Kanglim**, ditulis sebagai kalimat berkutip di `story.md`; di sini yang dicatat
  cuma **kapan mulutnya bergerak** (jendela buka/tutup) dan beat fisik yang menempel padanya.
- **Sirin tidak pernah bicara.** Suaranya (desahan, gumam, dengkur, *nng*) dicatat sebagai vokal
  ekspresif: SFX + mikro-ekspresi, **bukan** baris dialog. Mulutnya tidak pernah membentuk kata,
  jadi tidak ada risiko lip-sync di sisi Sirin.
- **Jendela mulut Kanglim = panjang kalimatnya pada tempo wajar (2.5–4 kata/detik)**, dan
  selalu menempel pada beat fisik (menegakkan badan, menoleh, mengulurkan tangan). Kalau kalimatnya
  tidak muat di dalam segmen, **potong kalimatnya**, jangan panjangkan jendelanya.
- **Kiri/kanan = dari sudut kamera**, selalu disebut eksplisit.
- **Micro-motion anti-freeze** (boleh dipakai bebas): `her slow breathing`, `her blinks`,
  `the sway of her hair and ahoge`, `the small movements of her hands`,
  `the soft light moving slowly across her face`.
- **Terlarang di deskripsi:** `zoom`, `cut to`, `meanwhile`, `we see`, `flicker`, `flash`, kata
  shot-type untuk gerak kontinu, angka ms/frame, negasi menumpuk.
- **Aturan mikro-ekspresi:** satu perubahan fisik kecil per beat, bukan tur ekspresi. Kelopak
  Sirin default **half-lidded**; makin sedikit gerak, makin kuat deadpan-nya.
- **Anchor 4+1** = lima elemen yang harus sama dengan frame terakhir segmen sebelumnya:
  (a) posisi karakter, (b) apa di tangan / di sekeliling, (c) arah gerak elemen bergerak,
  (d) posisi + tinggi kamera, (e) apa yang **benar-benar terlihat** dari posisi kamera itu.

## Peta cepat

| Seg | Fungsi | Framing | Kamera (teknik → gerak fisik) | Prioritas | Risiko | Dialog | Beat inti |
|---|---|---|---|---|---|---|---|
| S1 | orient | MCU | static locked-off | harus | rendah | K 1 · S 1 | cold open: uap + Kanglim masuk |
| S2 | escalate | MCU | static, drift mikro | penting | sedang | K 2 · S 1 | tikar menutup kepala Kanglim |
| S3 | escalate | MCU | push in sangat pelan | harus | sedang | K 1 · S 1 | bekal ditaruh di perut Sirin, dia tidur |
| S4 | escalate | medium | static | opsional | sedang | K 2 · S 1 | serbet terbang, daun di hidung |
| S5 | escalate | MCU | static | penting | tinggi | K 2 · S 1 | semut, Kanglim berdiri satu kaki |
| S6 | **reveal / payoff** | MCU → lebih dekat | push in + slow-motion accent | **harus** | **tinggi** | K 0 · S 1 | lengan hoodie jadi tutup |
| S7 | react (anticlimax) | MCU | static locked-off (frame benar-benar diam) | penting | sedang | K 2 · S 0 | cardigan menutupi mata Kanglim |
| S8 | resolve / button | two-shot | arc pelan | **harus** | tinggi | K 2 · S 1 | merpati di telapak tangan, suapan terakhir |

**Konsekuensi frame horizontal:** ruang kiri-kanan lebih lega, jadi tikar, kotak bekal, dan serbet
bisa masuk frame yang sama dengan muka Sirin tanpa pindah framing · dua-shot Sirin (kiri) dan
Kanglim (kanan) tidak berdesakan · **world plate wajib 16:9** (plate `cha_sirin_pigeon_world_01.png`
masih 9:16, jadi perlu plate 16:9 baru atau crop yang geometrinya sama dengan take).

**Rantai eskalasi (yang bikin 8 segmen ini bukan 8 lelucon terpisah):** tikar → bekal → serbet →
semut → lengan hoodie → cardigan → merpati. Tiap segmen menambah satu rintangan baru untuk Kanglim,
sementara usaha Sirin tetap nol. Uji "satu job per shot": S2–S5 semuanya `escalate` **tapi** masing-masing
rintangannya beda; kalau dua segmen menambah rintangan yang sama, salah satunya harus dilebur.

---

## S1 · Bangku, siang hangat (0.0–5.0)

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

**Dialog & vokal:** Kanglim (sub-beat C, 3.6–4.6): "Aku bawa bekal." Mulut terbuka sedikit,
**tanpa gerak lebar**, menutup pelan; dagu tidak naik. Sirin: satu desahan panjang lewat **hidung**
saat menoleh, mulut tetap kecil terbuka (tidak membentuk kata).

- **A (0–1.5), scene state.** Taman kota siang; matahari menembus daun; patch daun bergerak pelan
  di rumput dan di lengan hoodie-nya. Sirin setengah duduk miring, hoodie hitam kebesaran menumpuk
  di pangkuan. Kelopak setengah tertutup, mulut kecil terbuka, dua bulatan pink di pipi. Napas
  pelan, ahoge bergoyang.
- **B (1.5–3.0).** Sirin menguap panjang: rahang turun, kelopak makin sempit, ahoge melengkung
  turun lalu naik lagi, bahu naik sedikit. Selesai, mulut kembali kecil terbuka.
- **C (3.0–5.0).** Kanglim masuk dari jalan setapak di kanan dengan langkah pelan, berhenti di kanan
  bawah frame, lalu **berdiri diam di samping bangku** tanpa suara. **Reaksi Sirin:**
  kepala menoleh ~10° ke kanan ke arahnya, kelopak turun-naik satu kali, lalu berhenti menoleh.

**Audio:** angin di dedaunan, burung jauh, langkah kecil di jalan batu, gemerisik kain.
Pizzicato ringan masuk di uap kedua.

**Anchor buka (4+1):** (a) Sirin **kiri**, duduk miring di bangku, **sendiri**: kanan frame masih
kosong (jalan setapak + rumput); (b) hoodie menumpuk di pangkuan, kotak bekal belum ada, tikar masih
di ransel (di luar frame); (c) patch cahaya bergerak pelan, ahoge bergoyang,
napas pelan; (d) kamera MCU eye-level ~1–1.5 m di sisi muka Sirin, **diam**; (e) yang terlihat dari
situ: bangku kayu, rumput, kolam jauh di belakang, Kanglim belum masuk.

**Anchor tutup:** Sirin kepala sedikit ke kanan, kelopak half-lidded, Kanglim berdiri santai di
samping bangku, tikar masih di ransel.

---

## S2 · Bentang tikar (5.0–10.0)

**Fungsi:** escalate (rintangan 1: tikar) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up` yang sama, static; drift mikro ≤ satu langkah.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim turun ke **bawah** (tangannya sendiri), Sirin tetap
menoleh ke kanan tapi pandangan kosong. Tikar mengembang ke **atas** lalu jatuh menutupi kepala
Kanglim; tepinya menggantung di sisi pipinya.

**Cahaya:** sama dengan S1, patch bergerak pelan; saat tikar mengembang, sisi dalam kain menangkap
cahaya sedikit lebih terang (tidak mengubah kondisi).

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · tikar (polos, dari deskripsi).

**Dialog & vokal:** Kanglim (sub-beat A, 5.5–6.8): "Kamu diem aja ya." Mulut bergerak pelan
dan rata, menutup sebelum tikar terbalik. Kanglim (sub-beat C, 8.4–9.4, suara tertahan di
balik kain): "...nanti kebuka sendiri." **Mulut tidak terlihat** (tertutup tikar) · yang bergerak
hanya kain di area mulut, tipis. Sirin: satu *hmm* pendek, mulut tidak berubah bentuk.

- **A.** Kanglim mencabut tikar dari ransel dan membentangkannya pelan: satu sisi dulu, lalu sisi
  yang lain; tikar mengembang di udara, tepinya naik.
- **B.** Tikar turun dan **menutupi kepalanya sendiri**; tepi tikar menggantung di sisi pipinya.
  Kontak: kain jatuh, ujungnya masih bergerak sedikit setelah berhenti. Dia berdiri diam, tangan
  turun perlahan ke samping, dan **tidak melepas tikar itu**.
- **C.** **Reaksi Sirin:** satu kedipan lambat, kelopak turun lalu naik; ekspresi tidak berubah,
  bahu tidak bergerak. Hanya napas, ahoge, dan patch cahaya yang bergerak di hoodie-nya.

**Audio:** kain tikar dibentangkan, angin, kepak kecil; pizzicato berhenti tepat saat tikar
mendarat di kepala.

**Anchor buka (4+1):** (a) Sirin **kiri** duduk, kepala sedikit ke kanan; Kanglim **kanan** berdiri;
(b) tikar masih di ransel, kotak bekal belum keluar;
(c) patch cahaya bergerak pelan, ahoge bergoyang, napas Sirin; (d) kamera MCU eye-level sama, **diam**;
(e) yang terlihat dari situ: dua karakter dalam frame, bangku, rumput, tikar belum terlihat.

**Anchor tutup:** tikar menutupi kepala Kanglim, tangannya di samping badan, Sirin persis
seperti akhir S1 (posisi, kelopak, napas).

---

## S3 · Bekal (10.0–15.0)

**Fungsi:** escalate (rintangan 2: bekal) · **Prioritas:** harus · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up`; **push in sangat pelan** ke muka Sirin (dolly fisik,
lensa tetap). Objek keluar frame bertahap: rumput di bawah keluar dulu, lalu kolam di belakang.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri** (kotak → Sirin). Eyeline Sirin setelah
melorot: **ke atas** (langit, di luar frame). Kotak bergerak dari kanan-bawah ke kiri-tengah
(perut Sirin) lalu **turun-naik** mengikuti napas.

**Cahaya:** sama; karena kamera mendekat, patch cahaya di hoodie jadi lebih terbaca, biarkan
bergerak pelan, jangan tambah sumber cahaya baru.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal (polos).

**Dialog & vokal:** Kanglim (sub-beat A, 10.8–11.8): "Ini buat kamu." Mulut membuka
sekali, pelan, menutup saat kotak sudah di perut Sirin. Dia **tidak bicara lagi** di segmen ini;
sub-beat B cuma napas dan pandangan. Sirin: satu *hmmm* yang tidak selesai saat mengangguk, mulut
kecil terbuka tanpa gerak bicara.

- **A.** Kanglim mengangkat kotak bekal dengan dua tangan di kanan bawah frame, lalu
  meletakkannya di perut Sirin. Kontak: kotak menyentuh hoodie, kain tertekan, kotak naik-turun
  mengikuti napas.
- **B.** Kanglim melangkah mundur setengah langkah dan berdiri diam, kepala sedikit miring,
  memperhatikan kotak itu naik-turun mengikuti napas Sirin.
- **C.** Sirin mengangguk, sangat pelan, **kelopak sudah menutup sebelum anggukan selesai**. Kepala
  melorot ke sandaran bangku, wajah mendongak ke langit, mulut kecil terbuka lagi, kotak di perut.

**Audio:** kotak diletakkan, kain tersentuh, langkah kecil pelan, napas panjang saat dia melorot.

**Anchor buka (4+1):** (a) Sirin **kiri** duduk (kepala sedikit ke kanan), Kanglim **kanan** berdiri;
(b) tikar menutupi kepala Kanglim, tangan di samping badan, kotak bekal
masih di ransel; (c) tepi tikar masih bergerak sedikit (settling), patch cahaya bergerak pelan;
(d) kamera MCU eye-level, **diam** (push in belum mulai); (e) yang terlihat dari situ: tikar di
kepala Kanglim dari sisi pipi, Sirin utuh dalam frame.

**Anchor tutup:** Sirin telentang di bangku dengan kotak di perut, Kanglim berdiri diam di kanan,
tikar masih di kepala Kanglim.

---

## S4 · Susun makan siang (15.0–20.0)

**Fungsi:** escalate (rintangan 3: angin) · **Prioritas:** **opsional** · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** melebar satu level ke `medium` (aman di ladder), static.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri-bawah** (mengejar serbet). Sirin eyeline
kosong ke atas (daun mendarat di hidung tanpa reaksi). Serbet bergerak **dari kanan ke kiri**
menyeberang frame; daun jatuh **dari atas** ke hidung Sirin.

**Cahaya:** sama; angin naik → patch bergerak sedikit lebih cepat (satu-satunya perubahan, kondisi
tetap).

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · tikar (di lantai) · serbet + sandwich

**Dialog & vokal:** Kanglim (sub-beat A, 15.6–16.9): "Yang ini belum pas." Mulut bergerak
pendek, datar, sinkron dengan jari yang mengukur. Kanglim (sub-beat B, 17.4–18.1): "Sebentar."
Satu kata, mulut membuka sekali, **tanpa nada panik**. Sirin: dengkur kecil lewat hidung, mulut
**tertutup**.

- **A.** Kanglim menyusun sandwich, gelas, serbet di tikar (kanan bawah frame). Tangannya pelan dan
  teliti; sandwich digeser dua kali; dia memeriksanya dari dua sudut.
- **B.** Angin naik: serbet lepas satu per satu dan terbang rendah **dari kanan ke kiri** menyeberang
  frame di atas rumput. Kanglim berdiri, melangkah **satu kali** ke arah serbet, lalu berhenti dan
  berdiri diam. Dia tidak mengejar.
- **C.** Satu helai daun jatuh dan mendarat di hidung Sirin. Hidung tidak bergerak, kelopak tidak
  berubah, mulut tetap kecil terbuka. Hanya napas.

**Audio:** kain, angin naik, kepakan serbet, langkah kecil pelan; pizzicato naik tempo **sementara
Kanglim tidak** (itu leluconnya).

**Anchor buka (4+1):** (a) Sirin **kiri** telentang di bangku (kepala di sandaran), Kanglim **kanan**
berdiri lalu turun jongkok; (b) kotak bekal di perut Sirin, tikar
masih di kepala Kanglim; (c) patch cahaya bergerak pelan, napas Sirin mengangkat kotak pelan;
(d) kamera melebar satu level ke `medium`, eye-level, **diam**; (e) yang terlihat dari situ: bangku
penuh, Sirin telentang, Kanglim dengan tikar di kepala, rumput di bawah.

**Anchor tutup:** serbet masih melayang jauh di kiri belakang, Kanglim jongkok di kanan,
daun di hidung Sirin, kotak masih di perutnya.

---

## S5 · Semut (20.0–25.0)

**Fungsi:** escalate (rintangan 4: semut) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** **tinggi**

**Framing & kamera:** `medium close-up`, static, kamera tetap di sisi muka Sirin.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **bawah** (kaki sendiri) lalu ke **kiri-bawah**
(garis tanah). Sirin eyeline kosong, satu kedipan lambat. Garis semut mengalir **dari kiri bawah
naik** ke tepi bangku lalu ke **kanan** menuju kotak di perut Sirin; Kanglim tetap di kanan.

**Cahaya:** sama; patch bergerak lebih cepat mengikuti angin, kondisi tidak berubah.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·

**Dialog & vokal:** Kanglim (sub-beat A, 20.8–21.8): "Lewat sini aja." Mulut membuka pelan
saat dia menggaris tanah, seperti bicara ke semut yang memang bisa diajak ngomong. Kanglim (sub-beat
C, 23.6–24.3): "Bukan aku." Dua kata, datar, mulut membuka sekali. Sirin: satu *nng* pendek
di tengah tidur, mulut tertutup, napas tetap rata.

- **A.** Garis semut hitam muncul dari celah rumput di kiri bawah dan mengalir naik ke tepi bangku,
  lurus menuju kotak di perut Sirin.
- **B.** Kanglim berdiri pelan dan **menggaris tanah dengan ujung jari telunjuknya** di depan garis
  semut (kontak: jari membelah tanah, garis tipis). Semut menembus celah lain, naik ke sepatunya,
  lalu ke celananya. Dia berhenti menggaris, **mengangkat satu kaki pelan**, dan berdiri dengan satu
  kaki di tengah rumput; muka chibi-nya tetap datar.
- **C.** Sirin tidak berubah: napas rata, satu kedipan sangat lambat di tengah kekacauan.

**Audio:** gemerisik kecil, jari menggaris tanah, langkah kecil pelan; pizzicato naik tempo
**sementara Kanglim tidak**, lalu berhenti.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang di bangku, Kanglim **kanan** jongkok;
(b) kotak bekal di perut Sirin, daun masih di hidungnya, serbet masih melayang jauh di kiri belakang
(sebagian keluar frame); (c) angin mulai turun, patch cahaya bergerak,
napas Sirin rata; (d) kamera MCU eye-level di sisi muka Sirin, **diam**; (e) yang terlihat dari situ:
bangku, Sirin telentang, Kanglim jongkok di kanan bawah, semut belum muncul.

**Anchor tutup:** semut di celana Kanglim, garis tanah di depan semut, Kanglim berdiri satu kaki,
kotak di perut Sirin belum tersentuh.

---

## S6 · Satu gerakan malas (25.0–30.0) · puncak

**Fungsi:** **reveal / payoff** (pembalikan) · **Prioritas:** **harus** · **Status:** belum diuji · **Risiko:** **tinggi**

**Framing & kamera:** `medium close-up` yang mendekat pelan sampai muka dan lengan mengisi frame;
**slow-motion accent** di gerakan kain.

**Sumbu & arah:** sumbu tetap, kamera tetap di sisi muka Sirin walau mendekat. Eyeline Kanglim ke
**kiri** (lengan Sirin); Sirin **mata tetap tertutup**: tidak ada eyeline, itu intinya. Lengan
bergerak **dari kanan-tengah ke kiri-bawah** menutup kotak; semut **berbalik** lalu mengalir pergi
ke **kiri bawah**.

**Cahaya:** satu-satunya segmen yang menambah elemen cahaya: **berkas cahaya** menembus dedaunan
dengan **debu menggantung** di dalamnya (slow-motion). Kondisi dasar tidak berubah.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·

**Dialog & vokal:** Kanglim: **tanpa kata** di seluruh segmen. Mulut terbuka di sub-beat C dan
**tetap terbuka** (beku), tidak ada suara yang keluar. Sirin: satu tarikan napas panjang, *haaah*,
di akhir segmen; mulut tidak membentuk kata.

- **A.** Tanpa membuka mata, Sirin memutar lengan kanannya sedikit, pergelangan dulu, lalu lengan.
  Lengan hoodie yang kebesaran terlipat turun.
- **B.** Ujung lengan jatuh dan menutupi kotak bekal seperti tutup. Kain bergerak sedikit setelah
  berhenti; debu menggantung di berkas cahaya. (slow-motion: fabric delayed, particles hanging,
  gravity continuous)
- **C.** Semut berhenti di tepi kain, berbalik, dan mengalir pergi dalam satu garis. Sirin menarik
  napas, kelopak tetap setengah tertutup, ahoge naik pelan.

**Audio:** kain jatuh (bukan logam), gemerisik; **musik berhenti total** saat kain menutup.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang (mata tertutup, kelopak setengah), Kanglim
**kanan** membeku berdiri; (b) kotak bekal di perut Sirin **belum** tertutup, daun masih di hidungnya,
garis tanah di depan semut; (c) semut masih bergerak naik di celana
Kanglim, patch cahaya bergerak; (d) kamera MCU eye-level di sisi muka Sirin, mulai **mendekat pelan**
(push in); (e) yang terlihat dari situ: muka Sirin + perut + kotak, Kanglim sebagian di kanan.

**Anchor tutup:** lengan Sirin di atas kotak, semut pergi ke kiri bawah, Kanglim membeku di kanan
dengan mulut terbuka.

---

## S7 · Kanglim mencoba meniru (30.0–35.0)

**Fungsi:** react (anticlimax) · **Prioritas:** penting · **Status:** belum diuji · **Risiko:** sedang

**Framing & kamera:** `medium close-up`, **static locked-off**: frame benar-benar diam, yang
bergerak hanya napas Sirin dan kain.

**Sumbu & arah:** sumbu tetap. Eyeline Kanglim ke **kiri** (lengan Sirin) lama, lalu ke **bawah**
(cardigan sendiri). Sirin tidak melihat, tidak ada eyeline ke Kanglim. Cardigan terbang **dari
kanan ke kiri** arah kolam, lalu kembali **dari kiri ke atas** dan jatuh ke kepala Kanglim di kanan.

**Cahaya:** sama; saat cardigan melintas ke arah kolam, kain itu menangkap cahaya lebih terang
(bidang terbuka), kondisi tetap.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · kotak makan Kanglim ·

**Dialog & vokal:** Kanglim (sub-beat A, 30.6–31.3): "Gimana caranya..." Dua kata, pelan,
hampir bergumam, mulut nyaris tidak terbuka. Kanglim (sub-beat B, 33.0–33.7): "Oh, iya."
**Mulut tertutup kain** · hanya kain yang bergerak tipis di area mulut. Sirin: **tanpa suara sama
sekali** (hening).

- **A.** Kanglim menatap lengan itu lama, masih dengan satu kaki terangkat. Lalu dia menurunkan
  kakinya, melepas cardigan-nya, melipatnya dua kali dengan hati-hati, dan meletakkannya di atas
  kotak makannya sendiri. Kontak: cardigan menutupi kotak.
- **B.** Angin mengangkat cardigan itu tinggi, membawanya menyeberang frame ke arah kolam, lalu
  menjatuhkannya **ke kepala Kanglim**; dia membeku dengan cardigan menutupi matanya.
- **C.** Sirin tidak melihat. Kelopak tidak berubah, tidak ada reaksi, beat kosong yang jadi
  punchline.

**Audio:** kain, angin, lalu **hening** setelah cardigan mendarat. Tanpa musik.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang dengan lengan masih di atas kotak, Kanglim
**kanan** membeku dengan mulut terbuka dan satu kaki terangkat; (b) kotak bekal tertutup lengan, daun masih di
hidung Sirin, tikar di lantai; (c) sisa gerak kain lengan sudah
berhenti, semut sudah keluar frame kiri bawah, patch cahaya bergerak pelan; (d) kamera MCU
eye-level, **static locked-off** (frame benar-benar diam); (e) yang terlihat dari situ: lengan Sirin
di atas kotak, Kanglim di kanan dengan tikar di bawahnya.

**Anchor tutup:** cardigan di kepala Kanglim, tikar di lantai dengan kotak makannya, lengan Sirin
masih di atas kotak bekal.

---

## S8 · Button (35.0–40.0)

**Fungsi:** resolve / button (+ loop) · **Prioritas:** **harus** · **Status:** belum diuji · **Risiko:** tinggi

**Framing & kamera:** **arc pelan** kembali ke `two-shot`, radius konstan, kamera selalu
menghadap Sirin, jarak tidak berubah.

**Sumbu & arah:** sumbu tetap; arc tidak melewati garis Sirin–Kanglim. Eyeline Kanglim pertama ke
**kanan** (Sirin) lalu **satu kali** ke **kamera** dengan muka datar, lalu ke **kiri-bawah**
(sandwich). Eyeline Sirin: **bawah** ke sandwich.
Merpati turun **dari atas** ke sandaran di atas bahu Sirin (kiri), lalu naik ke telapak **tangan
kiri** Sirin; sandwich masuk dari **kanan** ke mulut Sirin.

**Cahaya:** kembali ke kondisi cahaya pembuka S1 (siang hangat, patch pelan), **wajib identik**
supaya loop-nya mulus. Merpati menambah bayangan kecil di bahu Sirin.

**Aset:** world plate · charsheet Sirin · charsheet Kanglim · kotak bekal · daun di hidung ·

**Dialog & vokal:** Kanglim (sub-beat B, 37.0–38.0): "Kamu tenang ya." Dua kata pelan, mulut
membuka sedikit, muka datar; **tidak menoleh ke kamera saat bicara**. Kanglim (sub-beat C, 38.4–39.4):
"Nih, habisin ya." Mulut menutup saat sandwich diturunkan ke mulut Sirin. Sirin: satu *mmm* pelan
setelah menggigit, mulut tertutup, tanpa kata.

- **A.** Kanglim menurunkan kakinya, melihat Sirin sebentar, lalu menoleh ke kamera **satu kali**
  dengan muka datar. Dia duduk di tikar di kanan bawah frame, tanpa mengangkat apa pun.
- **B.** Seekor merpati gemuk mendarat di sandaran bangku di atas bahu Sirin. Kontak: cakar
  mencengkeram kayu, bulu bergetar. Tanpa membuka mata, Sirin mengangkat tangan kirinya dengan
  malas; merpati naik ke telapak tangannya dan duduk.
- **C.** Kanglim menurunkan sandwichnya ke mulut Sirin. Sirin menggigit kecil, rahang bergerak
  pelan: kelopak tetap setengah tertutup. **Frame terakhir = komposisi S1** (bangku, cahaya hangat,
  muka dopey) → loop.

**Audio:** kepakan sayap, langkah kecil, kunyahan pelan; pizzicato masuk kembali pelan.

**Anchor buka (4+1):** (a) Sirin **kiri** telentang (lengan masih di atas kotak), Kanglim **kanan**
berdiri dengan cardigan di kepala; (b) cardigan menutupi mata Kanglim,
tikar + kotak makan di lantai kanan, daun masih di hidung Sirin; (c) patch cahaya bergerak pelan,
napas Sirin; (d) kamera mulai **arc pelan** dari MCU ke two-shot (radius konstan, menghadap Sirin);
(e) yang terlihat dari situ: Sirin utuh, Kanglim di kanan dengan cardigan di kepala, tikar di bawah.

**Anchor tutup:** identik dengan anchor buka S1 (posisi, framing, cahaya), loop-able.

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
| S1 | siang hangat, matahari menembus dedaunan | patch pelan di rumput + lengan hoodie | - |
| S2 | sama | patch pelan; sisi dalam tikar menangkap cahaya | - |
| S3 | sama | patch di hoodie lebih terbaca (kamera mendekat) | - |
| S4 | sama | patch bergerak lebih cepat (angin naik) | - |
| S5 | sama | patch lebih cepat lagi | - |
| S6 | sama | patch + kain slow-motion | **berkas cahaya + debu menggantung** |
| S7 | sama | patch pelan; cardigan melintas menangkap cahaya | - |
| S8 | **wajib identik S1** | patch pelan | bayangan kecil merpati di bahu Sirin |

Aturan: kondisi dasar tidak boleh berubah di kedelapan segmen. S6 satu-satunya yang menambah elemen;
S8 wajib kembali ke kondisi pembuka supaya loop-nya nyambung.

## Peta dialog & vokal (Kanglim bicara, Sirin bersuara)

| Seg | Kanglim (baris) | Jendela mulut | Sirin (vokal, bukan kata) | Mulut Sirin |
|---|---|---|---|---|
| S1 | "Aku bawa bekal." | 3.6–4.6 | desahan panjang lewat hidung | tetap kecil terbuka |
| S2 | "Kamu diem aja ya." · "...nanti kebuka sendiri." | 5.5–6.8 · 8.4–9.4 (tertahan kain) | satu *hmm* pendek | tidak berubah |
| S3 | "Ini buat kamu." | 10.8–11.8 | *hmmm* yang tidak selesai | kecil terbuka, tanpa gerak bicara |
| S4 | "Yang ini belum pas." · "Sebentar." | 15.6–16.9 · 17.4–18.1 | dengkur kecil lewat hidung | tertutup |
| S5 | "Lewat sini aja." · "Bukan aku." | 20.8–21.8 · 23.6–24.3 | satu *nng* pendek | tertutup |
| S6 | **tanpa kata** (mulut terbuka, beku) | - | tarikan napas *haaah* | tidak membentuk kata |
| S7 | "Gimana caranya..." · "Oh, iya." | 30.6–31.3 · 33.0–33.7 (tertutup kain) | **tanpa suara** | tidak berubah |
| S8 | "Kamu tenang ya." · "Nih, habisin ya." | 37.0–38.0 · 38.4–39.4 | satu *mmm* pelan | tertutup saat mengunyah |

Total: **13 baris Kanglim**, 52 kata (17.3 dtk bicara dari 40 dtk), **7 vokal Sirin**,
**0 baris kata untuk Sirin**. Semua jendela mulut dihitung pada tempo **2.5–4 kata/detik** dan
muat di dalam segmennya; dua di antaranya **tidak terlihat** (S2 dan S7, mulut tertutup kain)
sehingga tidak ada mulut yang perlu dianimasikan di sana.

## Peta audio (ambience bed + musik)

**Ambience bed (konstan, 0.0–40.0 dtk):** angin di dedaunan + burung jauh + gemerisik rumput tipis.
Bed ini tidak berhenti di segmen mana pun; tiap segmen hanya **menambah** SFX di atasnya.

| Seg | Tambahan SFX | Dialog & vokal | Musik |
|---|---|---|---|
| S1 | langkah kecil di jalan batu, gemerisik kain | Kanglim 1 baris (3.0–4.2) · Sirin: desahan | pizzicato masuk di uap kedua |
| S2 | kain tikar dibentangkan, kepak kecil | Kanglim 2 baris (satu tertahan kain) · Sirin: *hmm* | **berhenti** tepat saat tikar mendarat di kepala |
| S3 | kotak diletakkan, kain tersentuh, napas panjang | Kanglim 2 baris · Sirin: *hmmm* | - (tetap hening) |
| S4 | kain, kepakan serbet, langkah cepat | Kanglim 2 baris (satu di tengah napas cepat) · Sirin: dengkur | pizzicato naik tempo |
| S5 | gemerisik kecil, jari menggaris tanah, langkah pelan | Kanglim 2 baris · Sirin: *nng* | naik tempo lalu berhenti |
| S6 | kain jatuh (bukan logam), gemerisik | tanpa kata · Sirin: *haaah* | **berhenti total** saat kain menutup |
| S7 | kain, angin | Kanglim 2 baris (kedua tertutup kain) · Sirin: hening | **tanpa musik**; hening setelah cardigan mendarat |
| S8 | kepakan sayap, langkah kecil, kunyahan pelan | Kanglim 2 baris · Sirin: *mmm* | pizzicato masuk kembali pelan |

## Urutan uji (yang paling berisiko dulu, bukan urutan cerita)

| # | Seg | Kenapa didahulukan |
|---|---|---|
| 1 | S1 | baseline identitas + kamera statis: kalau S1 gagal, tidak ada pembuka dan tidak ada anchor loop |
| 2 | S6 | payoff + slow-motion + fisika kain, risiko tertinggi dan wajib berhasil |
| 3 | S5 | jumlah elemen bergerak paling banyak (garis semut + Kanglim menggaris tanah dan berdiri satu kaki + kamera harus diam) |
| 4 | S8 | rantai kontak berurutan (merpati mendarat → naik ke tangan → suapan) + harus balik ke komposisi S1 |
| 5 | S3 | push in + objek diletakkan di tubuh (kontak kain yang ikut napas) |
| 6 | S2 | fisika kain (tikar menutupi kepala sendiri), tanpa gerak kamera |
| 7 | S7 | kain + angin + terbang lintas frame + hening |
| 8 | S4 | objek terbang + daun mendarat presisi di hidung, paling bisa dilepas |

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
| **v8** | 2026-11-01 | **Tongkat dicabut dari kanon Kanglim** (charsheet akan digenerate ulang tanpa tongkat): prop tongkat dihapus dari storyboard, story, notes, docs/01 · aksi S5 diganti jadi menggaris tanah dengan ujung jari · pagar ranting ikut hilang |
| v7 | 2026-11-01 | **Format jadi 16:9 horizontal** (sebelumnya 9:16 vertikal): safe area jadi ± 5% tiap tepi, catatan konsekuensi frame horizontal ditambah (tikar/bekal/serbet bisa satu frame, two-shot lebih lega), world plate 9:16 lama ditandai **perlu versi 16:9** |
| v6 | 2026-11-01 | **Karakter Kanglim dirombak jadi kalem**: tidak membual, tidak mengklaim, tidak panik. Gaya gerak diganti (tongkat disandarkan, menggaris tanah untuk semut, berdiri satu kaki, tidak mengejar serbet, tidak menari) · dialog 13 → 12 baris, register datar (33 kata, 11.4 dtk) · judul jadi "Bekal Buat Sirin" · button tanpa klaim (cuma merpati + suapan terakhir) |
| v5 | 2026-11-01 | **Register dialog dirombak**: Kanglim tidak lagi bicara ala komandan operasi (kalimat pengumuman formal: "operasi dimulai", "strategi dua lapis", "ini standar") yang terbaca kaku dan ngeeselin; sekarang register anak kecil · kalimat pendek, santai (`kan`, `aja`, `nih`, `kok`), dan selalu membela diri saat gagal ("sengaja kok"). 13 baris diganti, jendela mulut dihitung ulang (52 kata, 17.3 dtk bicara) |
| v4 | 2026-11-01 | Koreksi tempo dialog: jendela mulut dihitung ulang pada **2.5–4 kata/detik** (v3 memakai 4.6–8.0 kata/detik, mustahil diucapkan) · 2 baris dipendekkan agar muat di segmennya (S7, S8) · aturan jendela mulut diganti dari "maks 1.2 dtk" jadi tempo wajar · baris audit negasi diperjelas (berlaku untuk teks prompt, bukan board) |
| v3 | 2026-11-01 | **Lapisan dialog**: Kanglim bicara (13 baris), Sirin hanya vokal ekspresif (7 kali, bukan kata) · field `Dialog & vokal` di 8 segmen · kolom Dialog di peta cepat · tabel peta dialog & vokal · kolom dialog di peta audio · 4 baris audit baru · ganti tanda pisah panjang dengan koma / titik dua / `·` di seluruh repo |
| v2 | 2026-11-01 | Tambah: header format/safe area/versi · **anchor buka 4+1 di SEMUA segmen** (v1 hanya S1) · sumbu & arah + tabel peta eyeline · fungsi shot + rantai eskalasi · prioritas + risiko · color script · peta audio + ambience bed · aset per segmen · urutan uji + rencana pelepasan · status tracker · changelog |

## Audit storyboard sebelum dipakai

| Cek | Patokan | Cara |
|---|---|---|
| Anchor buka | **4+1 elemen, ada di tiap segmen** | hitung blok `Anchor buka`, harus 8 |
| Anchor tutup | state akhir eksplisit di tiap segmen | hitung blok `Anchor tutup`, harus 8 |
| Sumbu | tidak ada segmen yang melewati garis Sirin–Kanglim | baca kolom `Sumbu & arah` tiap segmen |
| Eyeline | tiap segmen menyatakan arah pandang kedua karakter | bandingkan dengan tabel peta eyeline |
| Fungsi shot | tiap segmen punya fungsi (orient/reveal/escalate/react/resolve) | kolom Fungsi terisi semua |
| Prioritas | tiap segmen punya prioritas + alasan kalau opsional | kolom Prioritas terisi semua |
| Cahaya | kondisi dasar sama di 8 segmen; S8 identik S1 | bandingkan dengan color script |
| Ambience | bed konstan, tidak ada segmen yang mematikan bed | bandingkan dengan peta audio |
| Negasi | di teks yang masuk prompt: 1–2 total | hitung `never/no/not/nothing/nobody/neither/without/none` di blok prompt, bukan di board berbahasa Indonesia ini |
| Angka ms/frame | 0 di koreografi | hitung `\d+ ms` atau `\d+ frame` |
| Kata shot-type | 0 (`zoom`, `cut to`, `close-up shot`) | hitung manual |
| Kata strobe | 0 (`flicker`, `flash`) | hitung manual |
| Framing ladder | maks 1 level antar segmen | bandingkan akhir S(n) → awal S(n+1) |
| Anchor isi | 4+1 elemen sama dengan frame terakhir | posisi · apa di tangan/sekeliling · arah gerak (angin/semut) · posisi+tinggi kamera · apa yang terlihat dari situ |
| Dialog | hanya Kanglim yang punya baris kata | hitung baris berkutip di `story.md` → 13 |
| Vokal Sirin | 0 baris kata; vokal dicatat sebagai SFX | bandingkan dengan peta dialog & vokal → 7 |
| Jendela mulut | tempo 2.5–4 kata/detik dan jendelanya muat di dalam segmen | hitung kata · durasi jendela tiap baris (baris 1–2 kata diucapkan datar, tidak dihitung) |
| Mulut tertutup kain | S2 dan S7 tidak menuntut animasi mulut | cek dua segmen itu: hanya kain yang bergerak |
| Karakter ketiga | 0 | - |
| Teks terbaca | 0 | - |
