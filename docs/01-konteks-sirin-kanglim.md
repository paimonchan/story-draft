# 01 — Konteks seri: Cha Sirin (smol) & Kanglim

Ringkasan kanon yang dipakai untuk semua draft story di seri ini. Sumber: lane produksi di
`eikei-plan` (private) — dokumen ini cuma teknik & identitas, bukan state produksi.

## Premis seri

Komedi **deadpan non-verbal**, anime cel-shaded, satu lokasi per klip, satu take kontinu.
MC: **Cha Sirin** — karakter *smol*, malas, muka bodoh/dopey, tapi imut. Supporting:
**Kanglim** — chibi, ambisius, selalu gagal.

**Mesin komedi (kanonik):**

- **Kanglim** = usaha maksimal, hasil nol (dan sering merusak hasilnya sendiri).
- **Sirin** = usaha nol, hasil maksimal (satu gerakan malas menyelesaikan masalah).
- Tidak ada juri/hakim cerita — pembalikan terjadi karena Kanglim menyadari hasilnya kalah.
- Struktur: eskalasi → anticlimax → **button** (Kanglim mengklaim "itu rencanaku dari awal").
- Muka Sirin yang datar adalah punchline-nya, bukan aksi Kanglim.

## Identitas kanonik (blok siap tempel, jangan ditulis ulang)

**Cha Sirin** — `<Subject 1>`:

> a soft round-cute anime girl with big clear teal eyes that sit half-lidded and drowsy, two
> round pink 2D blush circles floating on her cheeks, and very long pastel-pink hair with a
> springy ahoge. She wears an oversized black zip hoodie much too big for her (pale grey inner
> hood, white shirt collar and a small dark necktie peeking out), a short dark pleated skirt,
> long cream slouch socks bunched at her ankles and chunky black shoes. She is soft, sleepy,
> endlessly low on energy, and her deadpan face does the comedy.

**Kanglim** — `<Subject 2>`:

> a small chibi schoolboy with messy dark navy hair, sharp blue eyes and a smug, self-important
> little face. He wears a beige cardigan over a navy sweater vest, a white shirt with a navy
> necktie, navy trousers, black shoes, and a cream backpack on his back. A short wooden stick
> hangs at his hip on a small strap — that stick is his whole personality, and it always returns
> to his hip after he uses it.

Ciri yang **wajib** muncul di setiap render Sirin (kalau salah satu hilang, identitasnya luntur):
bulatan pink 2D di pipi · mata teal half-lidded drowsy · rambut pastel pink panjang + ahoge ·
hoodie hitam zip kebesaran + dasi kecil · rok plisket + slouch socks krem + sepatu chunky.

## Staging

- **Two-shot rule:** Sirin di **KIRI** frame, Kanglim di **KANAN**, kepala Kanglim selalu lebih
  rendah (chibi). Sirin tidak pernah pindah sisi.
- Muka Sirin = subjek di **setiap** segmen, termasuk saat aksi milik Kanglim — aksi itu harus
  terjadi di frame yang sama, bukan segmen terpisah.
- Maksimal **2 karakter**. Kalau muncul sosok ketiga di latar = gagal.
- Tidak ada teks/logo/angka terbaca di frame (kotak, label, poster semua polos).

## Aset

| Aset | Peran | Catatan |
|---|---|---|
| Charsheet Cha Sirin (smol) | `<Picture 1>` | potret netral, satu geometri kamera dengan take |
| Charsheet Kanglim | `<Picture 2>` | idem |
| World plate taman + bangku taman | `<Picture 3>` | sudah ada dari lane taman sebelumnya — taman kosong, 9:16, eye-level |
| Prop merpati (2–3 burung) | prop | opsional; burung = prop hidup, bukan karakter ketiga |

Aturan ref: **semua ref wajib satu geometri kamera dengan take** — ref dengan sudut berlawanan
(mis. look "from behind" di lane face-first) bikin H3 gonta-ganti view dan terasa cut. Kalau butuh
variasi angle, jangan taruh sebagai ref — biarkan prompt yang menuntun. Ref pose (mis. "tidur di
bangku") sebaiknya **tidak** dipakai: pose digenerate H3 dari prompt, ref pose mengunci gerakan.

## Lane yang sudah jadi (rujukan gaya, bukan untuk ditiru mentah)

| Lane | Lokasi | Pelajaran utama |
|---|---|---|
| `cha_sirin_kanglim_01` | kelas kosong, papan tulis | sumber blok identitas dua karakter + two-shot rule |
| `cha_sirin_pigeon_01` | taman, POV single-take | sumber world plate taman; ref pose dicabut |
| `cha_sirin_daily_01..04` | rumah | aturan kamera terukur, anchor state, face-side guard |

Draft story yang lahir dari konteks ini: `stories/sirin-taman-piknik/` (taman, 8 segmen,
non-verbal, Kanglim supporting).

## Cara mengambil konteks terbaru dari lane (private)

```bash
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/plan.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/prompts/<lane>/iteration_log.md --jq .content | base64 -d
gh api repos/paimonchan/eikei-plan/contents/custom/scripts/<lane>_content.py --jq .content | base64 -d
```

Jangan mengira-ngira state lane dari repo publik — yang publik cuma mirror prompt yang sudah selesai.
