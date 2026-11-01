# 04 · Teknik sinematik (rujukan + pemetaan ke H3)

Ringkasan dari **"Cinematic Techniques: Cinematography, Lighting, and Prompts"**
(<https://melies.co/cinematic-techniques>), 424 teknik dalam 13 kategori, masing-masing berisi:
definisi → fungsi naratif → cara kerja → kapan dipakai → **pembanding/tetangga yang mirip** →
contoh film → `prompt it` → **what usually goes wrong (tetangga yang ketukar)**.

Dokumen ini bukan salinan: isinya yang **relevan buat pipeline kita** + hasil rekonsiliasi dengan
aturan terukur di `docs/02`. Kalau bentrok, **temuan terukur kita yang menang**: dan itu
ditulis eksplisit di tabel di bawah.

## Taksonomi (13 kategori, 424 teknik)

| Kategori | Jml | Contoh isi |
|---|---|---|
| `camera-movement` | 86 | push in, dolly, arc, tracking, static locked-off, crane, orbit, whip pan, zoom |
| `framing` | 25 | extreme close-up → long shot, two-shot, insert, cutaway, **reaction shot**, over-the-shoulder |
| `camera-angles` | 19 | eye-level, high/low, bird's-eye, dutch angle, POV, three-quarter, fourth-wall |
| `lighting` | 41 | three-point, key/fill, backlight, rim, **dappled light**, **golden hour**, hard/soft, window light, practical |
| `composition` | 32 | rule of thirds, symmetry, leading lines, frame-in-frame, **dirty frame**, negative space, headroom |
| `lenses` | 17 | 14/24/35/50/85/135mm, anamorphic |
| `color` | 19 | teal-orange, monochrome, desaturasi, cool-blue, **warm amber**, filmic faded |
| `time-and-motion` | 21 | **slow motion**, speed ramp, freeze frame, step printing, long take, infinite loop |
| `effects` | 57 | lens flare, halation, film grain, bokeh, rack focus, shallow/deep focus |
| `editing` | 23 | match cut, jump cut, dissolve, fade, wipe |
| `atmosphere` | 13 | rain, fog, mist, haze, **dust motes**, steam |
| `genre-looks` | 27 | film noir, **animation**, pixel art, magical realism, video game, arthouse |
| `viral-looks` | 44 | look bergaya sosial (comic, noir, 3D render, dll.) |

**Yang dipelajari (9 halaman inti):** push-in, static locked-off, arc-right, reaction shot,
dappled light, golden hour, animation, slow motion, dirty frame.
Belum diambil: `framing`/`camera-angles`/`composition` sisanya, 32 teknik lighting lain,
`viral-looks` (44). Catatan: Exa kena rate limit 429 waktu ambil halaman `two-shot`.

## Yang dikonfirmasi cocok dengan aturan terukur kita

| Teknik | Aturan di sumber | Aturan kita | Status |
|---|---|---|---|
| Push In | "keep the lens fixed so the push is distance, not zoom"; tetangga yang salah = Slow Zoom In | kata `zoom` = shot baru (terukur: cut keras di 5.2s) | **sepakat** |
| Arc | quarter turn, radius konstan, eyeline terus ke subjek; tetangga salah = dolly straight / 360 orbit | drift/arc kecil 1× per segmen | **sepakat** |
| Dirty frame | "name the matter and which edges… keep a readable hole for the subject" | occlusion boleh, **jangan pernah nutup muka** | **sepakat** + upgrade: sebut sisi & objeknya |
| Animation look | "name the medium (cel/halftone/charcoal), designed light, motion as drawing rather than photography"; jangan default ke bokeh fotoreal | vocab gaya: flat cel shading, two-tone shadow, clean dark linework | **sepakat** + upgrade: sebut medium `cel` + larang bokeh fotoreal |
| Slow motion | 120–240fps feel, **fabric delayed, particles hanging, gravity continuous**; tetangga salah = bullet time / freeze | slow-mo accent ~30% kecepatan <1 dtk | **sepakat** + upgrade frasa |
| Dappled light | butuh matahari keras + penghalang nyata; patch **tidak teratur**; tetangga salah = gobo batang paralel / key bersih | world plate taman: cahaya hangat menembus daun | **sepakat** + lihat peringatan di bawah |
| Golden hour | matahari rendah nyata, warm amber raking, **bayangan panjang**; tetangga salah = LUT oranye di matahari tinggi | plate taman = cahaya sore hangat | **sepakat** + upgrade: nyatakan "sun just above the horizon" + long shadows |
| Static locked-off | "actors and air may move; the camera may not", komedi hidup di sini | kamera dikunci total → subjek beku (cam_px 0.02) | **BENTROK, terselesaikan** ↓ |

### Rekonsiliasi: static vs beku

Sumber bilang static locked-off itu bahasa komedi (penonton tidak bisa diselamatkan pan).
Pengukuran kita bilang kunci total = beku. **Dua-duanya benar** karena yang dikunci beda:

- Yang dikunci: **frame** (tidak ada parallax, tidak ada micro-pan, tidak ada drift).
- Yang tidak dikunci: **subjek**: napas, blink, rambut, kain, cahaya bergerak pelan.

Jadi frasa yang benar bukan *"the camera stays upright in the same spot"* (itu mematikan subjek),
tapi: **"the frame itself never moves, she breathes, she blinks, her hair sways"**.
Ini juga resep 1 (uji identitas) di `docs/02`.

### Peringatan: dappled "crawling" mendekati flicker

Sumber menyarankan angin/air bikin patch bergerak ("crawl"). Aturan kita melarang
`flicker`/`flash` (terukur: strobe, |ΔLum| naik sampai 12.6/frame). Jangan tulis
"patches flicker". Tulis **"the leaf-shaped patches drift slowly across her"**: gerak, bukan
kedip.

## Palet sinematik untuk seri ini (face-first comedy, taman siang)

Satu beat = satu teknik kamera + satu kondisi cahaya + satu look. **Jangan tumpuk.**

| Beat | Teknik | Frasa siap pakai |
|---|---|---|
| Buka lane / uji identitas | framing `medium close-up` + angle `eye-level` + `static locked-off` | `the frame itself never moves, she breathes, she blinks, her hair sways` |
| Kanglim bikin kekacauan | `push in` pelan **atau** `arc` kecil | `very slow push in toward her, the camera closing from medium to medium close-up so gradually it is noticed after the fact` |
| Deadpan Sirin (inti seri) | **`reaction shot`** | `reaction close-up of her receiving it, the face as the cut, eyeline off to the side, one small physical change, a slow blink` |
| Puncak (mis. S6 gerakan malas) | `push in` + `slow motion` accent | `slow-motion feel, her sleeve fabric delayed, dust hanging in the light, gravity continuous, easing back to full speed` |
| Beku / anticlimax (mis. S7) | `static locked-off` + musik berhenti | `the frame holds completely still; only her breathing moves` |
| Button / tutup | `arc` balik ke `two-shot` | `the camera arcs gently back until both of them are in frame again, same distance, same height` |
| Cahaya | `dappled light` + `golden hour` | `sun through the leaves just above the horizon, irregular leaf-shaped patches drifting slowly across her hoodie, long shadows on the grass, warm rim on her pink hair` |
| Look | `animation` (cel) | `cel-shaded 2D animation, graphic volume, designed light, motion as drawing rather than photography, no photoreal bokeh, no lens blur` |
| Warna | `warm amber` + natural grade | hindari `teal-orange`, bukan bahasa gaya seri ini |

**Catatan penting:** kata-kata shot-type (`push in`, `medium close-up`, `arc`) dipakai untuk
**memilih teknik di dokumen ini**, tapi di blok prompt tetap ditulis sebagai **gerak fisik +
objek yang keluar frame + jarak antaranya**: bukan sebagai label. Label = undangan buat model
memotong (lihat `docs/02` §Kamera).

## Tabel "tetangga yang ketukar" → audit prompt

Ini bagian paling berguna dari sumbernya: tiap teknik punya tetangga yang bikin hasilnya salah.
Pakai sebagai checklist audit blok prompt.

| Maksud | Frasa yang bikin model ambil tetangganya | Ganti dengan |
|---|---|---|
| push in | `zoom in` | `very slow push in, fixed lens, medium into medium close-up` |
| static | `camera stays upright in the same spot` | `the frame never moves; she breathes and blinks` |
| arc | `orbit`, `360` | `a quarter turn, constant distance, always facing her` |
| dappled light | `flicker`, `bars`, `blinds` | `irregular leaf-shaped patches drifting slowly` |
| golden hour | `orange grade`, `sunset filter` | `sun just above the horizon, long shadows toward camera` |
| slow motion | `bullet time`, `freeze` | `fabric delayed, particles hanging, gravity continuous` |
| animation look | `photoreal`, `bokeh`, `lens blur` | `cel-shaded, graphic volume, motion as drawing` |
| dirty frame | clutter yang nutup muka | sebut sisi + objeknya, `keep a clear hole for her face` |
| reaction shot | `a tour of expressions` | `one small physical change, a slow blink` |

## Cara pakai dokumen ini

1. Sebelum menulis blok segmen: pilih teknik dari palet di atas (1 kamera + 1 cahaya + 1 look).
2. Setelah menulis: audit pakai tabel tetangga, pastikan frasa salahnya tidak ada.
3. Kalau ada frasa baru yang terbukti work di render, **pindahkan ke `docs/02`** (aturan yang
   mengikat), bukan dibiarkan di sini.
4. Kalau butuh teknik di luar 9 yang sudah dipelajari, ambil halaman detailnya dulu
   (`https://melies.co/cinematic-techniques/<kategori>/<slug>`), jangan menebak isinya.
