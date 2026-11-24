# Video Reel Cerita Fisika

Sumber video explainer **Shorts/Reels 9:16 (±40–55 detik)** bergaya **3D isometrik semi-realistis "dibongkar"** untuk akun **Toufani RA**. Setiap video menjelaskan satu pertanyaan sains untuk orang awam: benda utuh dipotong bidang lurus, permukaan potongnya berwarna beda, dan aliran energi digambar sebagai strip bercahaya.

> **Video (`.mp4`) tidak disimpan di repo ini** (lihat `.gitignore`). Repo hanya berisi kode adegan, naskah, suara, caption, sampul, dan skrip pembantu.

## Video

| Folder | Pertanyaan | Aksen | Durasi |
|---|---|---|---|
| [`nuklir/`](nuklir) | Kenapa nuklir bisa menghasilkan listrik? | hijau-biru neon | ±45 dtk |
| [`bom-atom/`](bom-atom) | Kenapa bom atom bisa menghasilkan daya ledak yang luar biasa? | oranye-merah | ±49 dtk |
| [`entanglement/`](entanglement) | Apa itu entanglement kuantum? | ungu-biru elektrik | ±54 dtk |
| [`blackhole/`](blackhole) | Apa yang terjadi kalau manusia memasuki black hole, dan bagaimana dengan lubang cacing? | oranye menyala | ±56 dtk |
| [`mariana/`](mariana) | Apa yang terjadi kalau manusia menyelam ke Palung Mariana? | biru bioluminesens | ±53 dtk |
| [`pelari/`](pelari) | Apa yang terjadi kalau seorang pria berlari mendekati kecepatan cahaya di Bumi? | biru listrik | ±57 dtk |
| [`higgs/`](higgs) | Kenapa partikel Tuhan (boson Higgs) sangat penting? | — | — |

Isi tiap folder: `scene.html` (adegan three.js + subtitle + label), `naskah.md` atau `caption.txt`, `assets/audio/` (voiceover dan efek suara), `thumbnail.jpg` (sampul), dan `potret-adegan1/` (3 potret adegan pembuka).

## Gaya visual

- three.js r128, **satu kamera ortografik** dari pojok (azimut 45°, elevasi 30°), tanpa perspektif.
- Bahan bertekstur (logam disikat, beton, kaca, kain, lumpur, batuan) dilukis dengan canvas, bayangan lembut.
- **Bidang potong lurus** (`THREE.Plane` + `clippingPlanes`) dengan permukaan potong berwarna beda.
- Label tipis (titik bercahaya + garis penunjuk), subtitle kata per kata, palet natural + **satu warna aksen** per video.
- Semua gerak dihitung dari waktu `t` (tanpa `Date`, `requestAnimationFrame`, atau `Math.random`), sehingga render MP4 identik dengan pratinjau.

## Alur kerja

1. **Adegan pembuka** → 3 potret dari detik berbeda (`mf.py potret`).
2. **Naskah** per adegan (nada netral, akurat secara sains).
3. **Suara gratis** dengan [edge-tts](https://github.com/rany2/edge-tts) (`id-ID-ArdiNeural`) + waktu tiap kata dari `WordBoundary` untuk subtitle. Efek suara disintesis lokal dengan Python (tanpa layanan berbayar).
4. **Bangun semua adegan** mengikuti waktu suara, cek potret.
5. **Render** MP4 1080×1920, 30 fps (`mf.py render`, Chrome headless + ffmpeg).
6. **Sampul** bergaya Reels akun (judul, kata kunci di blok aksen, pill fakta, label Toufani RA).
7. **Publikasi**: Reels, lalu **story** (cuplikan ±14 dtk), lalu **postingan karusel** (7 slide 4:5).

Pembuat kode adegan per video disimpan sebagai potongan `.xx_*.js` dan dirakit oleh `.asm_*.py` (mis. `.asm_ent.py`, `.asm_bh.py`, `.asm_mr.py`).

## Skrip pembantu

| Berkas | Fungsi |
|---|---|
| `.tts.py`, `.tts2.py` | suara edge-tts + waktu kata (versi umum ada di skill) |
| `.sfx.py` | sintesis efek suara (whoosh, tik, zap, hum, zing, hiss) |
| `.asm_*.py` | merakit `scene.html` dari potongan kode |
| `.story.py` | membuat klip story (cuplikan + overlay judul dan ajakan) |
| `.post_frames.py`, `.post_slides.py` | frame bersih dan 7 slide karusel per video (argumen: nama video, mis. `python .post_slides.py pelari`) |

## Kebutuhan

- Python 3 dengan `edge-tts` dan `Pillow`
- Google Chrome dan ffmpeg
- Mesin render `mf.py` dari skill *motion-format* (Remotion-style, halaman web yang dirender per frame)

## Catatan

- Konten sains disusun untuk edukasi; tidak ada rancangan perangkat berbahaya.
- Satu-satunya nama akun/merek yang dipakai: **Toufani RA**.
