import os, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W, H = 1080, 1350
B = 'C:/Windows/Fonts/ariblk.ttf'; BD = 'C:/Windows/Fonts/arialbd.ttf'; M = 'C:/Windows/Fonts/consolab.ttf'
f = lambda p, s: ImageFont.truetype(p, s)
D = {
 'nuklir': {'acc': (18,242,198), 'fg': (4,30,26), 'tag': 'ENERGI \u00b7 NUKLIR', 'judul': 'Kenapa nuklir bisa jadi listrik?', 'hash': '#nuklir #PLTN #energi #listrik #sains #edukasi #ToufaniRA',
  'poin': [('Fisi: atom uranium dibelah', 'Neutron menumbuk inti uranium, intinya terbelah dan melepas panas yang sangat besar.'),
           ('Air bertekanan memanas', 'Panas dari reaksi memanaskan air bertekanan di bejana reaktor.'),
           ('Generator uap', 'Air panas memanaskan air kedua di generator uap sampai menjadi uap.'),
           ('Turbin dan generator', 'Uap memutar turbin, turbin memutar generator, listrik tercipta lalu dialirkan lewat tiang transmisi.'),
           ('Didinginkan, dipakai lagi', 'Uap didinginkan di menara pendingin, lalu airnya dipakai kembali.')]},
 'bom-atom': {'acc': (255,90,31), 'fg': (255,255,255), 'tag': 'FISIKA \u00b7 ENERGI ATOM', 'judul': 'Kenapa bom atom sedahsyat itu?', 'hash': '#bomatom #fisi #nuklir #emc2 #fisika #sains #edukasi #ToufaniRA',
  'poin': [('Kimia vs inti', 'Dinamit hanya menata ulang ikatan antar atom. Bom atom mengubah inti atomnya sendiri.'),
           ('Fisi uranium', 'Satu neutron membelah inti uranium tertentu, melepas panas dan 2\u20133 neutron baru.'),
           ('Reaksi berantai', 'Neutron baru membelah inti lain, lalu berlipat ganda dalam sekejap: 1 \u2192 3 \u2192 9 \u2192 27.'),
           ('Massa jadi energi', 'Sebagian kecil massa inti berubah jadi energi: E = mc\u00b2. Karena c\u00b2 sangat besar, massa sedikit pun jadi energi luar biasa.'),
           ('Beda dengan PLTN', 'Energi terlepas dalam waktu sangat singkat, sedangkan PLTN dikendalikan pelan-pelan.')]},
 'entanglement': {'acc': (122,92,255), 'fg': (255,255,255), 'tag': 'FISIKA KUANTUM', 'judul': 'Apa itu entanglement kuantum?', 'hash': '#entanglement #fisikakuantum #nobelfisika #fisika #sains #edukasi #ToufaniRA',
  'poin': [('Berpasangan', 'Dua partikel dibuat berpasangan sehingga keadaan keduanya tidak bisa dijelaskan sendiri-sendiri.'),
           ('Foton kembar', 'Kristal khusus membelah satu foton jadi sepasang foton terjerat, lalu dikirim berjauhan.'),
           ('Acak, tapi berkorelasi', 'Sebelum diukur hasilnya belum tertentu. Saat satu diukur, hasil pasangannya selalu cocok.'),
           ('Uji Bell', 'Bukan seperti sepasang sarung tangan yang sudah ditentukan dari awal. Korelasinya lebih kuat dari penjelasan biasa.'),
           ('Bukan pesan kilat', 'Tidak bisa dipakai mengirim pesan lebih cepat dari cahaya. Eksperimennya meraih Nobel Fisika 2022.')]},
 'blackhole': {'acc': (255,106,31), 'fg': (255,255,255), 'tag': 'ASTRONOMI \u00b7 RELATIVITAS', 'judul': 'Masuk black hole, apa yang terjadi?', 'hash': '#blackhole #lubangcacing #relativitas #astronomi #sains #edukasi #ToufaniRA',
  'poin': [('Horizon peristiwa', 'Batas black hole: setelah itu, cahaya pun tidak bisa keluar.'),
           ('Dilihat dari luar', 'Astronaut yang jatuh tampak makin melambat dan memerah, seolah membeku di tepi horizon.'),
           ('Bagi astronaut', 'Ia tidak merasakannya. Waktu berjalan normal saat melintasi horizon.'),
           ('Spaghettifikasi', 'Di black hole bintang, selisih tarikan kaki\u2013kepala sangat besar. Di supermasif, tarikan dekat horizon jauh lebih lemah.'),
           ('Singularitas & lubang cacing', 'Semua lintasan mengarah ke singularitas. Lubang cacing masih hipotesis, belum pernah teramati.')]},
 'mariana': {'acc': (25,227,255), 'fg': (4,28,40), 'tag': 'SAMUDRA \u00b7 LAUT DALAM', 'judul': 'Menyelam ke Palung Mariana', 'hash': '#palungmariana #challengerdeep #lautdalam #sains #edukasi #ToufaniRA',
  'poin': [('10,9 km ke dasar', 'Challenger Deep: tekanan di dasarnya lebih dari 1.000 kali tekanan di permukaan.'),
           ('Gelap dan dingin', 'Di bawah \u00b11.000 m gelap total, suhu hanya beberapa derajat di atas nol.'),
           ('Batas penyelam', 'Penyelam biasa hanya aman sampai puluhan meter: gas tertekan dan gas napas mulai berbahaya.'),
           ('Rongga udara', 'Air sulit dimampatkan, tapi rongga berisi udara tidak. Tanpa pelindung tak ada manusia bertahan.'),
           ('Kapsul dan kehidupan', 'Trieste 1960, Cameron 2012, Vescovo 2019. Dan di sana tetap ada kehidupan.')]},
 'matahari': {'acc': (255,198,26), 'fg': (50,36,0), 'tag': 'ASTRONOMI · SKENARIO', 'judul': 'Apa yang terjadi kalau matahari tiba-tiba menghilang?', 'hash': '#matahari #gravitasi #orbit #astronomi #sains #edukasi #explainer #3D #ToufaniRA',
  'poin': [('Cahaya butuh ±8 menit', 'Cahaya matahari butuh sekitar 8 menit untuk sampai ke Bumi, jadi langit masih terang selama itu.'),
           ('Gravitasi sama lambatnya', 'Perubahan gravitasi juga merambat secepat cahaya, jadi Bumi tetap mengorbit selama sekitar 8 menit.'),
           ('Lepas orbit', 'Setelah itu langit gelap dan Bumi melaju lurus, menyinggung garis orbit lamanya, tidak lagi mengitari apa pun.'),
           ('Laut membeku', 'Tanpa sinar matahari fotosintesis berhenti, suhu turun drastis dalam beberapa minggu, dan permukaan laut mulai membeku.'),
           ('Panas dari dalam Bumi', 'Panas dari dalam Bumi menjaga air di bawah es tetap cair lebih lama; kehidupan di sekitar ventilasi dasar laut bisa bertahan lebih lama.')]},
 'laut': {'acc': (255,212,0), 'fg': (50,40,0), 'tag': 'SAINS · LAUT', 'judul': 'Apa yang terjadi kalau laut tidak asin lagi?', 'hash': '#laut #garam #oseanografi #sains #edukasi #explainer #3D #ToufaniRA',
  'poin': [('Daya apung berkurang', 'Air tawar sedikit kurang rapat daripada air laut, jadi kapal dan perenang duduk lebih dalam di air.'),
           ('Arus laut dalam berubah', 'Arus global digerakkan oleh perbedaan suhu dan kadar garam. Tanpa garam, polanya berubah drastis dan iklim ikut terdampak.'),
           ('Laut lebih mudah membeku', 'Air tawar membeku di 0°C, air laut di sekitar minus 2°C. Di daerah dingin, laut jadi lebih mudah tertutup es.'),
           ('Kehidupan laut terganggu', 'Ikan, karang, dan plankton menyesuaikan garam di tubuhnya dengan air laut. Di air tawar banyak yang tak bertahan, dan rantai makanan terganggu.'),
           ('Pesisir dan manusia', 'Bakau, burung laut, dan penyu ikut terdampak. Hasil tangkapan menurun, pola hujan dan panen berubah, dan komunitas pesisir kehilangan nafkah.')]},
 'blackhole2': {'acc': (255,106,31), 'fg': (255,255,255), 'tag': 'ASTRONOMI · PART 2', 'judul': 'Bisakah kita keluar lewat lubang cacing?', 'hash': '#lubangcacing #blackhole #relativitas #fisika #sains #edukasi #ToufaniRA',
  'poin': [('Solusi relativitas umum', 'Lubang cacing muncul sebagai solusi persamaan relativitas umum: terowongan teoretis yang menghubungkan dua titik ruang-waktu.'),
           ('Kisi dilipat jadi dua sisi', 'Bayangkan kisi ruang-waktu berbentuk corong dilipat seperti kertas, sehingga ujung corong kedua muncul di seberang.'),
           ('Butuh materi eksotis', 'Agar tetap terbuka, terowongan butuh materi eksotis berenergi negatif. Materi ini belum pernah ditemukan.'),
           ('Terowongan bisa menutup', 'Tanpa materi eksotis, terowongan diperkirakan menutup sebelum ada yang sempat lewat.'),
           ('Jalan buntu vs jembatan', 'Black hole jalan buntu menuju singularitas; lubang cacing, jika ada, jembatan ke tempat lain. Keduanya masih teori.')]},
 'pelari': {'acc': (46,155,255), 'fg': (255,255,255), 'tag': 'FISIKA · RELATIVITAS', 'judul': 'Pria berlari mendekati kecepatan cahaya', 'hash': '#relativitas #kecepatancahaya #fisika #einstein #lhc #sains #edukasi #ToufaniRA',
  'poin': [('7× keliling Bumi per detik', 'Cahaya ±300.000 km/detik, keliling Bumi ±40.000 km. Di 99% kecepatan cahaya, pria itu mengitari Bumi ±7 kali tiap detik.'),
           ('Energi tak terhingga', 'Makin cepat makin besar energinya. Mencapai kecepatan cahaya butuh energi tak terhingga untuk benda bermassa, jadi hanya bisa mendekati.'),
           ('Udara jadi plasma', 'Molekul udara menumbuknya dengan energi sangat besar, dan udara di depannya berubah jadi plasma panas yang meledak.'),
           ('Relativitas khusus', 'Bagi sang pelari, waktu melambat (dilatasi waktu) dan jalan di depannya memendek (kontraksi panjang).'),
           ('Ledakan energi', 'Bagi orang di sekitarnya, tubuhnya jadi ledakan energi dalam sekejap. Tidak ada manusia yang bisa melakukannya di Bumi.')]},
 'emas': {'acc': (247,193,61), 'fg': (50,34,0), 'tag': 'SAINS · ASTRONOMI', 'judul': 'Dari mana asal emas di Bumi?', 'hash': '#emas #bintangneutron #astronomi #asalusul #sains #edukasi #explainer #3D #ToufaniRA',
  'poin': [('Batuan berurat emas', 'Emas di cincinmu berasal dari batuan berurat emas, tetapi atom-atomnya jauh lebih tua daripada Bumi itu sendiri.'),
           ('Inti atom emas', 'Setiap atom emas punya 79 proton dan 118 neutron di dalam intinya.'),
           ('Hujan neutron', 'Bintang biasa hanya membuat unsur sampai sekitar besi. Unsur berat terbentuk saat inti dihujani neutron dengan sangat cepat sampai membesar menjadi emas dan platina.'),
           ('Tabrakan bintang neutron', 'Salah satu sumber utama yang sudah teramati adalah tabrakan dua bintang neutron, terdeteksi pada tahun 2017.'),
           ('Dibawa hujan asteroid', 'Awan emas bercampur ke awan gas pembentuk tata surya. Sebagian besar emas Bumi tenggelam ke inti, dan emas yang kita tambang diduga dibawa hujan asteroid.')]},
}
def wrap(d, text, font, maxw):
    out, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) <= maxw: cur = t
        else: out.append(cur); cur = w
    if cur: out.append(cur)
    return out
import sys
SEL=sys.argv[1:]
for name, v in D.items():
    if SEL and name not in SEL: continue
    acc, fg = v['acc'], v['fg']
    out = f'post/{name}'
    # 1. sampul
    th = Image.open(f'{name}/thumbnail.jpg').convert('RGB'); th.crop((0, 40, 1080, 1390)).save(f'{out}/slide_1.jpg', quality=90)
    # 2-6. poin
    for i, (jd, isi) in enumerate(v['poin']):
        fr = Image.open(f'{out}/f{i}.jpg').convert('RGB').crop((0, 520, 1080, 1320)).resize((1080, 800))
        im = Image.new('RGB', (W, H), (10, 14, 26)); im.paste(fr, (0, 0))
        ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
        for y in range(560, 800): od.line([(0, y), (W, y)], fill=(10, 14, 26, int(255 * (y - 560) / 240)))
        im = Image.alpha_composite(im.convert('RGBA'), ov); d = ImageDraw.Draw(im)
        d.rectangle([0, 800, W, H], fill=(10, 14, 26, 255)); d.rectangle([0, 800, W, 808], fill=acc + (255,))
        d.ellipse([60, 842, 150, 932], fill=acc + (255,)); n = str(i + 1); fn = f(B, 58); d.text((105 - d.textlength(n, font=fn) / 2, 858), n, font=fn, fill=fg + (255,))
        fh = f(B, 54); lines = wrap(d, jd, fh, 840)
        d.text((180, 850 if len(lines) == 1 else 835), '\n'.join(lines), font=fh, fill=acc + (255,), spacing=6)
        fb = f(BD, 40); yb = 975
        for ln in wrap(d, isi, fb, 960): d.text((60, yb), ln, font=fb, fill=(255, 255, 255, 255)); yb += 58
        d.text((60, 1296), 'Toufani RA', font=f(M, 30), fill=(255, 255, 255, 200)); t2 = f'{i+1}/5  \u00b7  geser \u2192'; d.text((W - 60 - d.textlength(t2, font=f(M, 30)), 1296), t2, font=f(M, 30), fill=acc + (255,))
        im.convert('RGB').save(f'{out}/slide_{i+2}.jpg', quality=90)
    # 7. ajakan
    bg = Image.open(f'{out}/f5.jpg').convert('RGB').crop((0, 300, 1080, 1650)).resize((1080, 1350)).filter(ImageFilter.GaussianBlur(14))
    im = Image.alpha_composite(bg.convert('RGBA'), Image.new('RGBA', (W, H), (8, 10, 20, 190))); d = ImageDraw.Draw(im)
    def center(y, s, font, fill, stroke=0):
        w = d.textlength(s, font=font); d.text(((W - w) / 2, y), s, font=font, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
    fm = f(M, 32); tw = d.textlength(v['tag'], font=fm) + 60; d.rounded_rectangle([(W - tw) / 2, 200, (W + tw) / 2, 262], radius=31, fill=(255, 255, 255, 235)); center(213, v['tag'], fm, (20, 24, 30, 255))
    fj = f(B, 66)
    for k, ln in enumerate(wrap(d, v['judul'].upper(), fj, 960)): center(310 + k * 84, ln, fj, (255, 255, 255, 255), 4)
    y0 = 310 + len(wrap(d, v['judul'].upper(), fj, 960)) * 84 + 40
    cta = 'TONTON REELNYA!'; fc = f(B, 74); cw = d.textlength(cta, font=fc) + 90; d.rounded_rectangle([(W - cw) / 2, y0, (W + cw) / 2, y0 + 130], radius=22, fill=acc + (255,)); center(y0 + 26, cta, fc, fg + (255,))
    center(y0 + 170, 'Versi lengkap ada di Reels profil', f(BD, 40), (255, 255, 255, 255)); center(y0 + 226, 'Toufani RA', f(B, 56), acc + (255,), 3)
    center(y0 + 330, 'Simpan \u00b7 Bagikan \u00b7 Ikuti untuk sains berikutnya', f(BD, 34), (255, 255, 255, 230))
    for k, ln in enumerate(wrap(d, v['hash'], f(M, 30), 960)): center(1230 + k * 40, ln, f(M, 30), (255, 255, 255, 190))
    im.convert('RGB').save(f'{out}/slide_7.jpg', quality=90)
    print(name, 'slides ok')
