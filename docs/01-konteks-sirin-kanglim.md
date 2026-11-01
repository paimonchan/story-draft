# 01 · Konteks seri: Cha Sirin (smol) & Kanglim

Ringkasan kanon yang dipakai untuk semua draft story di seri ini. Sumber: lane produksi di
`eikei-plan` (private), dokumen ini cuma teknik & identitas, bukan state produksi.

## Premis seri

Komedi **deadpan**, anime cel-shaded, satu lokasi per klip, satu take kontinu. **Suara:** Kanglim
bicara; Sirin tidak pernah bicara.
MC: **Cha Sirin**: karakter *smol*, malas, muka bodoh/dopey, tapi imut. Supporting:
**Kanglim**: chibi, ambisius, selalu gagal.

**Mesin komedi (kanonik):**

- **Kanglim** = usaha maksimal, hasil nol (dan sering merusak hasilnya sendiri).
- **Sirin** = usaha nol, hasil maksimal (satu gerakan malas menyelesaikan masalah).
- Tidak ada juri/hakim cerita, pembalikan terjadi karena Kanglim menyadari hasilnya kalah.
- Struktur: eskalasi → anticlimax → **button** (Kanglim mengklaim "itu rencanaku dari awal").
- Muka Sirin yang datar adalah punchline-nya, bukan aksi Kanglim.

## Suara & dialog (kanon)

- **Kanglim bicara.** Register-nya: **anak kecil yang sok bisa mengurus semuanya**, bukan komandan
  atau narator. Kalimatnya pendek dan santai (`kan`, `aja`, `nih`, `kok`, `ya`), dan tiap kali
  gagal dia membela diri dengan santai ("sengaja kok"), bukan mengumumkan sesuatu. Hindari kalimat
  bergaya pengumuman/briefing ("operasi dimulai", "strategi dua lapis", "ini standar") · itu
  terbaca kaku dan bikin penonton kesal. Barisnya ditulis di `story.md` sebagai kalimat berkutip di
  baris sendiri.
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

> a small chibi schoolboy with messy dark navy hair, sharp blue eyes and a smug, self-important
> little face. He wears a beige cardigan over a navy sweater vest, a white shirt with a navy
> necktie, navy trousers, black shoes, and a cream backpack on his back. A short wooden stick
> hangs at his hip on a small strap, that stick is his whole personality, and it always returns
> to his hip after he uses it.

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
| Charsheet Kanglim | potret netral | idem |
| World plate taman + bangku taman | taman kosong, 9:16, eye-level | sudah ada dari lane taman sebelumnya |
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

Draft story yang lahir dari konteks ini: `stories/sirin-taman-piknik/` (taman, 8 segmen; Kanglim
bicara 13 baris, Sirin hanya bersuara 7 kali).

## Cara mengambil konteks terbaru dari lane (private)

```bash
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/plan.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/iteration_log.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/scripts/<lane>_content.py --jq .content | base64 -d
```

Jangan mengira-ngira state lane dari repo publik, yang publik cuma mirror prompt yang sudah selesai.
