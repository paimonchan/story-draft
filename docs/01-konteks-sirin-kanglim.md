# 01 · Konteks seri: Cha Sirin (smol) & Kanglim

Ringkasan kanon yang dipakai untuk semua draft story di seri ini. Sumber: lane produksi di
`eikei-plan` (private), dokumen ini cuma teknik & identitas, bukan state produksi.

## Premis seri

Komedi **deadpan**, anime cel-shaded, satu lokasi per klip, satu take kontinu. **Suara:** Kanglim
bicara; Sirin tidak pernah bicara.
MC: **Cha Sirin**: karakter *smol*, malas, muka bodoh/dopey, tapi imut. Supporting:
**Kanglim**: chibi, kalem, selalu gagal.

**Mesin komedi (kanonik):**

- **Kanglim** = usaha maksimal, hasil nol (dan sering merusak hasilnya sendiri). Usahanya
  dikerjakan **dengan tenang**, bukan dengan heboh: dia tidak mengeluh, tidak membual, tidak panik.
- **Sirin** = usaha nol, hasil maksimal (satu gerakan malas menyelesaikan masalah).
- Tidak ada juri/hakim cerita, pembalikan terjadi karena Kanglim menyadari hasilnya kalah.
- Struktur: eskalasi → anticlimax → **button** (Kanglim tidak protes dan tidak mengklaim apa
  pun; dia cuma melanjutkan. Punchline-nya tetap muka datar Sirin).
- Muka Sirin yang datar adalah punchline-nya, bukan aksi Kanglim.

## Suara & dialog (kanon)

- **Kanglim bicara.** Register-nya: **kalem** · tenang, datar, tidak songong dan tidak kekanak-kanakan
  berlebihan. Kalimatnya pendek, pelan, dan sering cuma melaporkan apa yang dia kerjakan ("Aku bawa
  bekal", "Yang ini belum pas", "Bukan aku"). Kalau gagal, dia **tidak protes, tidak membual, tidak
  mengklaim** · dia diam sebentar lalu lanjut. Yang berisik justru dunia di sekitarnya (angin, semut,
  merpati), dan itu sumber leluconnya.
  Hindari: kalimat membual/mengklaim ("aku bilang apa", "gampang", "sengaja kok"), seruan panik
  ("eh! balik sini!"), dan gaya pengumuman/briefing ("operasi dimulai", "strategi dua lapis", "ini
  standar"). Barisnya ditulis di `story.md` sebagai kalimat berkutip di baris sendiri.
- **Kalem bukan berarti tanpa lelucon.** Lelucon verbalnya datang dari **deadpan denial** dan
  kalimat praktis yang absurd: "Masih aman." diucapkan sambil tikar menutupi mukanya atau semut
  naik di celananya, "Lewat sini aja." ke semut, "Ini buat kamu. Jaga ya." ke orang yang tidur.
  Pakai **running gag** (frasa yang sama diulang di titik yang makin buruk, lalu jadi callback di
  button) · itu yang bikin teksnya lucu tanpa dia harus jadi songong atau panik.
- **Sirin tidak pernah bicara.** Dia hanya mengeluarkan suara ekspresif: desahan panjang, *hmm*
  pendek, dengkur, *nng*, *mmm*. Semuanya ditulis sebagai **prosa** (bukan dialog) dan di storyboard
  dicatat sebagai SFX + mikro-ekspresi.
- Konsekuensi teknis: mulut Sirin tidak pernah membentuk kata, jadi **nol risiko lip-sync** di
  sisinya; jendela mulut Kanglim selalu pendek dan menempel pada beat fisik (lihat `docs/02`).

## Identitas kanonik (blok siap tempel, jangan ditulis ulang)

**Cha Sirin**:

> a soft round-cute anime girl with big clear teal eyes that sit half-lidded and drowsy, two
> round pink 2D blush circles floating on her cheeks, and very long pastel-pink hair with a
> springy ahoge. She wears an oversized black zip hoodie much too big for her (pale grey inner
> hood, white shirt collar and a small dark necktie peeking out), a short dark pleated skirt,
> long cream slouch socks bunched at her ankles and chunky black shoes. She is soft, sleepy,
> endlessly low on energy, and her deadpan face does the comedy.

**Kanglim**:

> a small chibi schoolboy with messy dark navy hair, sharp blue eyes and a calm, unbothered little
> face. He wears a beige cardigan over a navy sweater vest, a white shirt with a navy
> necktie, navy trousers, black shoes, and a cream backpack on his back.

Ciri yang **wajib** muncul di setiap render Sirin (kalau salah satu hilang, identitasnya luntur):
bulatan pink 2D di pipi · mata teal half-lidded drowsy · rambut pastel pink panjang + ahoge ·
hoodie hitam zip kebesaran + dasi kecil · rok plisket + slouch socks krem + sepatu chunky.

## Staging

- **Two-shot rule:** Sirin di **KIRI** frame, Kanglim di **KANAN**, kepala Kanglim selalu lebih
  rendah (chibi). Sirin tidak pernah pindah sisi.
- Muka Sirin = subjek di **setiap** segmen, termasuk saat aksi milik Kanglim, aksi itu harus
  terjadi di frame yang sama, bukan segmen terpisah.
- Maksimal **2 karakter**. Kalau muncul sosok ketiga di latar = gagal.
- Tidak ada teks/logo/angka terbaca di frame (kotak, label, poster semua polos).

## Aset

| Aset | Isi | Catatan |
|---|---|---|
| Charsheet Cha Sirin (smol) | potret netral | satu geometri kamera dengan take |
| Charsheet Kanglim | potret netral, **tanpa tongkat** | akan digenerate ulang; tongkat dicabut dari kanon (2026-11-01) |
| World plate taman + bangku taman | taman kosong, **16:9**, eye-level | plate lama (`cha_sirin_pigeon_world_01.png`) masih 9:16 → perlu versi 16:9 |
| Prop merpati (2–3 burung) | prop | opsional; burung = prop hidup, bukan karakter ketiga |

Aturan aset: **semua ref wajib satu geometri kamera dengan take**: ref dengan sudut berlawanan
(mis. look "from behind" di lane face-first) bikin H3 gonta-ganti view dan terasa cut. Kalau butuh
variasi angle, jangan taruh sebagai ref, biarkan adegan yang menuntun. Ref pose (mis. "tidur di
bangku") sebaiknya **tidak** dipakai: pose digenerate dari deskripsi, ref pose mengunci gerakan.

## Lane yang sudah jadi (rujukan gaya, bukan untuk ditiru mentah)

| Lane | Lokasi | Pelajaran utama |
|---|---|---|
| `cha_sirin_kanglim_01` | kelas kosong, papan tulis | sumber blok identitas dua karakter + two-shot rule |
| `cha_sirin_pigeon_01` | taman, POV single-take | sumber world plate taman; ref pose dicabut |
| `cha_sirin_daily_01..04` | rumah | aturan kamera terukur, anchor state, face-side guard |

Draft story yang lahir dari konteks ini: `stories/sirin-taman-piknik/` ("Bekal Buat Sirin", taman,
8 segmen; Kanglim bicara 12 baris, Sirin hanya bersuara 7 kali).

**Catatan deviasi:** blok identitas Kanglim di atas diubah dari charsheet lane `eikei-plan`
("smug, self-important") jadi **calm, unbothered** untuk draft ini. Kalau charsheet barunya dibuat,
wajib satu geometri kamera dengan take.

## Cara mengambil konteks terbaru dari lane (private)

```bash
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/plan.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/iteration_log.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/scripts/<lane>_content.py --jq .content | base64 -d
```

Jangan mengira-ngira state lane dari repo publik, yang publik cuma mirror prompt yang sudah selesai.
