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
| [`blackhole2/`](blackhole2) | Bisakah kita keluar lewat lubang cacing? (Part 2, lanjutan blackhole) | oranye menyala | ±56 dtk |
| [`laut/`](laut) | Apa yang terjadi kalau laut tidak asin lagi? (skenario pengandaian, split screen laut asin vs tawar) | kuning cerah | ±74 dtk |
| [`matahari/`](matahari) | Apa yang terjadi kalau matahari tiba-tiba menghilang? (skenario pengandaian, suara Ratware) | kuning keemasan | ±56 dtk |
| [`emas/`](emas) | Dari mana asal emas di Bumi? (atom, hujan neutron, tabrakan bintang neutron, hujan asteroid; suara edge-tts) | emas | ±57 dtk |
| [`pesta/`](pesta) | Pesta untuk penjelajah waktu yang tidak dihadiri siapa pun (Hawking 2009; atap, dinding depan, dan dinding kanan diiris; suara edge-tts) | ungu-magenta | ±58 dtk |
| [`bintang/`](bintang) | Kenapa melihat bintang berarti melihat masa lalu? (PERJALANAN WAKTU EP 2; bukit diiris, langit jadi lima lapisan jarak; suara edge-tts) | ungu-magenta | ±60 dtk |
| [`stasiun/`](stasiun) | Perjalanan ke masa depan itu nyata, astronot sudah melakukannya (PERJALANAN WAKTU EP 3; stasiun luar angkasa, dua jam split, jam atom 1971; suara edge-tts) | ungu-magenta | ±58 dtk |
| [`kembar/`](kembar) | Paradoks kembar: kenapa kembar astronaut pulang lebih muda? (PERJALANAN WAKTU EP 4; roket dan rumah diiris, dua kalender split, kolom muon; suara edge-tts) | ungu-magenta | ±59 dtk |
| [`gravitasi/`](gravitasi) | Kenapa waktu berjalan lebih lambat di dekat gravitasi kuat? (PERJALANAN WAKTU EP 5; gedung dan kolom Bumi diiris, jam lantai dasar vs puncak, jam atom, corong ruang-waktu black hole; suara edge-tts) | ungu-magenta | ±56,5 dtk |
| [`mimpi/`](mimpi) | Bisakah kita menjelajahi semesta lain lewat mimpi? (dreamwalking; kamar tidur dan gelembung semesta, otak diiris, tiga gambaran multiverse berlabel hipotesis, mimpi sadar + perekam gerak mata; suara edge-tts) | hijau zamrud | ±77 dtk |
| [`lubangwaktu/`](lubangwaktu) | Bisakah lubang cacing dipakai untuk kembali ke masa lalu? (PERJALANAN WAKTU EP 6; kisi corong terlipat diiris, jam besar di tiap mulut, mulut dibawa pesawat, riak energi perlindungan kronologi; suara edge-tts) | ungu-magenta | ±58 dtk |
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
3. **Suara** memakai [edge-tts](https://github.com/rany2/edge-tts) (waktu tiap kata dari WordBoundary). Video matahari sempat memakai Voice Gen by Ratware (waktu kata diperkirakan oleh `suara/align.py`), tetapi hasilnya kurang sesuai sehingga video berikutnya kembali ke edge-tts. Efek suara disintesis lokal dengan Python.
4. **Bangun semua adegan** mengikuti waktu suara, cek potret.
5. **Render** MP4 1080×1920, 30 fps (`mf.py render`, Chrome headless + ffmpeg).
6. **Sampul** bergaya Reels akun (judul, kata kunci di blok aksen, pill fakta, label Toufani RA).
7. **Publikasi**: Facebook Reels, lalu **story** (cuplikan ±14 dtk), lalu **postingan karusel** (7 slide 4:5). Keenam video pertama juga diunggah ke **Instagram Reels** dan **YouTube Shorts**.

Pembuat kode adegan per video disimpan sebagai potongan `.xx_*.js` dan dirakit oleh `.asm_*.py` (mis. `.asm_ent.py`, `.asm_bh.py`, `.asm_mr.py`).

## Skrip pembantu

| Berkas | Fungsi |
|---|---|
| `.tts.py`, `.tts2.py` | suara edge-tts + waktu kata (video lama) |
| `suara/align.py` | (arsip) meratakan waktu kata untuk suara dari Ratware (silencedetect + proporsi huruf) |
| `.sfx.py` | sintesis efek suara (whoosh, tik, zap, hum, zing, hiss) |
| `.asm_*.py` | merakit `scene.html` dari potongan kode |
| `.story.py` | membuat klip story (cuplikan + overlay judul dan ajakan) |
| `.asm_bh2.py` | merakit `blackhole2/scene.html` (lembaran kisi dilipat, terowongan, split screen) dari `.bh_a/b/c.js` + `.bh2_d.js` |
| `.asm_lt.py` | merakit `laut/scene.html` (dua dunia laut asin/tawar, split screen) dari `.lt_a/b/d.js` |
| `.asm_mt.py` | merakit `matahari/scene.html` (orbit, strip cahaya/gravitasi, Bumi diiris) dari `.mt_a/b/d.js` |
| `.asm_em.py` | merakit `emas/scene.html` (zoom skala besar bumi berlubang, atom, bintang neutron, Bumi muda, shader urat emas) dari `.em_a/b/d.js` |
| `.asm_ps.py` | merakit `pesta/scene.html` (gedung kampus tiga bidang potong, ruang pesta, strip tahun) dari `.ps_a/b/d.js` |
| `.asm_bs.py` | merakit `bintang/scene.html` (bukit tiga lapisan, pengamat, lapisan langit, strip cahaya) dari `.bs_head.js`, `.bs_a/b/d.js` |
| `.asm_st.py` | merakit `stasiun/scene.html` (Bumi, stasiun berongga, split dua jam, pesawat 1971) dari `.bs_head.js`, `.st_a/b/d.js` |
| `.asm_tw.py` | merakit `kembar/scene.html` (landasan, roket berongga, rumah, strip lintasan, kolom muon) dari `.bs_head.js`, `.tw_a/b/d.js` |
| `.asm_gr.py` | merakit `gravitasi/scene.html` (gedung berongga + kolom Bumi berlapis, jam atom, corong ruang-waktu) dari `.bs_head.js`, `.tw_a.js`, `.gr_b.js`, `.gr_d.js` |
| `.asm_mm.py` | merakit `mimpi/scene.html` (kamar tidur, kepala berbidang potong, gelembung semesta, pohon/gelembung/lembaran multiverse) dari `.bs_head.js`, `.tw_a.js`, `.mm_b.js`, `.mm_d.js` |
| `.asm_wh.py` | merakit `lubangwaktu/scene.html` (kisi terlipat, terowongan, jam besar, pesawat pembawa mulut, riak energi) dari `.bh_a/b/c.js`, `.bom_tools.js`, `.wh_d.js` |
| `suara/f0.py` | mengukur nada dasar tiap klip suara (cek konsistensi gender/suara) |
| `.post_frames.py`, `.post_slides.py` | frame bersih dan 7 slide karusel per video (argumen: nama video, mis. `python .post_slides.py pelari`) |

## Kebutuhan

- Python 3 dengan `edge-tts` dan `Pillow`
- Google Chrome dan ffmpeg
- Mesin render `mf.py` dari skill *motion-format* (Remotion-style, halaman web yang dirender per frame)

## Catatan

- Konten sains disusun untuk edukasi; tidak ada rancangan perangkat berbahaya.
