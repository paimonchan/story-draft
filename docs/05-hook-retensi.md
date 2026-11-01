# 05 · Hook & retensi short-form

Draft di repo ini diposting ke feed vertikal (TikTok / Reels / Shorts), jadi **2 detik pertama bukan
bagian cerita, tapi bagian distribusi.** Aturan di bawah dipakai untuk semua draft.

Angka di dokumen ini **benchmark industri** (laporan tool/agensi, bukan riset peer-review dan bukan
hasil uji kami sendiri) · daftar sumber di paling bawah. Pakai sebagai arah, jangan sebagai kebenaran
mutlak.

## Kenapa 2–3 detik pertama menentukan

- **~40% penonton swipe dalam 3 detik pertama.** Kurva retensi rata-rata yang dilaporkan:
  100% (0 dtk) → 82% (1 dtk) → 71% (2 dtk) → 60% (3 dtk) → 54% (5 dtk) → 48% (10 dtk) → 41% (30 dtk).
- **71% penonton TikTok memutuskan lanjut atau scroll di 3 detik pertama.**
- Hook kuat menahan **80–90%** penonton sampai detik ke-3; ambang "lolos" sekitar **65–70%**.
- Setelah lolos hook, retensi tetap turun: ~70% (3 dtk) → ~60% (15 dtk) → ~50% (30 dtk). Jadi
  **durasi tetap berpengaruh**: video <15 dtk selesai ~92%, 16–30 dtk ~84%, 31–60 dtk ~68%.
- **>60% tayangan mobile tanpa suara** → hook visual + caption harus jalan tanpa audio.

## Aturan yang dipakai di storyboard

1. **Hook di 0–2,2 dtk.** Muka karakter utama sudah ada di frame sejak frame pertama. Tidak ada
   establishing shot kosong, tidak ada "orang berjalan masuk lalu mulai bicara".
2. **Hook itu dua lapis:** satu **klaim/aksi verbal** yang bikin penonton bertanya, dan satu
   **muka/gerak visual** yang lucu tanpa perlu penjelasan.
3. **Klaim di hook harus dibantah visualnya dalam ≤2 detik** setelahnya (kontradiksi cepat =
   penonton percaya akan ada lelucon lagi).
4. **Open loop dijawab berantai**, bukan ditahan sampai akhir.
5. **Tidak ada celah >5 dtk tanpa lelucon visual.** Zona paling berbahaya: **3–8 dtk**.
6. **Running gag minimal 3 kemunculan** (setup → eskalasi → callback di button).
7. **Button = callback**, bukan lelucon baru.
8. **Punchline utama ≤60% durasi.** Kalau lewat, tulis **opsi potong eksplisit** di storyboard
   (segmen mana yang dibuang, payoff jadi di detik berapa).
9. **Frame terakhir = frame pertama** supaya loop mulus.
10. **Teks di dalam frame dilarang** (aturan seri, lihat `docs/02`) → caption hook dikerjakan di
    **post-produksi**: tulis 2–3 opsi di storyboard, muncul dari frame pertama, 4–7 kata, kontras
    tinggi, di dalam safe area.
11. **Cek format sebelum render:** feed vertikal native = **9:16**. Lane 16:9 akan letterbox
    (bar hitam) atau dipotong di beberapa permukaan. Kalau target utamanya feed vertikal, tulis
    `format: 9:16` di frontmatter dan pastikan world plate-nya 9:16 juga.
12. **Lane satu-take tidak bisa "cut tiap 3–5 dtk"** (aturan anti-cut di `docs/02`). Penggantinya:
    **rintangan/lelucon baru tiap ≤5 dtk**, dengan running gag sebagai pengikat antar segmen.

## Checklist sebelum render (tiap draft)

- [ ] 0–2,2 dtk: ada klaim/aksi verbal + muka visual; premisnya kebaca tanpa penjelasan
- [ ] bantahan visual pertama ≤4 dtk
- [ ] tidak ada celah >5 dtk tanpa lelucon visual
- [ ] running gag muncul ≥3× (setup → eskalasi → callback)
- [ ] punchline utama ≤60% durasi, atau opsi potong tertulis
- [ ] frame terakhir = frame pertama
- [ ] 2–3 opsi caption post-produksi tertulis di storyboard
- [ ] format cocok dengan platform target (9:16 untuk feed vertikal)

## Sumber (benchmark industri)

| Sumber | Dipakai untuk |
|---|---|
| ClipSpeed AI, "AI Hook Detection: How AI Finds the Perfect 3-Second Opener" (2026) | kurva drop-off per detik (100/82/71/60/54/48/41%), 40% swipe di 3 dtk |
| Animoto (mengutip Asia Research) & StoryTweak (2026) | 71% penonton memutuskan di 3 dtk; 60% vs 85% retensi 3 dtk ≈ 2,8× views |
| Percee Digital (data internal Meta + benchmark Socialinsider 2024) | funnel 3/10/30 dtk; completion per durasi (92% <15 dtk, 84% 16–30 dtk, 68% 31–60 dtk) |
| HighStyle AI (2026) | >60% viewing mobile tanpa suara; standar caption on-screen |
| rgba.ai (2026) | "3-Second Triad": curiosity, self-relevance, promise |
