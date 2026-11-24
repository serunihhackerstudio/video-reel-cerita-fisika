"""Sampul gaya akun Toufani RA: latar = frame video (tanpa pita gelap), pill kategori, judul 3 baris dengan blok aksen, pill fakta, label akun.
Pakai: python sampul.py frame.jpg keluar.jpg"""
import sys
from PIL import Image, ImageDraw, ImageFont
W, H = 1080, 1920
AKS = (255, 176, 46); GELAP = (27, 19, 5)
bg = Image.open(sys.argv[1]).convert('RGB').resize((W, H))
# bayangan tipis di atas saja agar teks terbaca (bukan pita gelap tebal)
ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d0 = ImageDraw.Draw(ov)
for y in range(0, 900):
    d0.line([(0, y), (W, y)], fill=(8, 10, 14, int(70 * (1 - y / 900))))
bg = Image.alpha_composite(bg.convert('RGBA'), ov).convert('RGB')
d = ImageDraw.Draw(bg)
BLK = 'C:/Windows/Fonts/ariblk.ttf'; MONO = 'C:/Windows/Fonts/consolab.ttf'
def fit(txt, fontpath, maxw, start):
    s = start
    while s > 20:
        f = ImageFont.truetype(fontpath, s)
        if d.textlength(txt, font=f) <= maxw: return f
        s -= 2
    return ImageFont.truetype(fontpath, 20)
def tengah(txt, f, y, fill, stroke=0, sf=(0, 0, 0)):
    w = d.textlength(txt, font=f); d.text(((W - w) / 2, y), txt, font=f, fill=fill, stroke_width=stroke, stroke_fill=sf)
# label akun
fl = ImageFont.truetype(MONO, 40); w = d.textlength('Toufani RA', font=fl)
d.text((W - 70 - w, 56), 'Toufani RA', font=fl, fill='white', stroke_width=3, stroke_fill=(0, 0, 0))
# pill kategori
fc = ImageFont.truetype(MONO, 40); kat = 'FISIKA · CERN & LHC'; w = d.textlength(kat, font=fc)
d.rounded_rectangle([(W - w) / 2 - 36, 130, (W + w) / 2 + 36, 196], radius=33, fill='white'); d.text(((W - w) / 2, 140), kat, font=fc, fill=(14, 16, 20))
# judul
f1 = fit('KENAPA', BLK, 940, 150); f2 = fit('PARTIKEL TUHAN', BLK, 880, 150); f3 = fit('SANGAT PENTING?', BLK, 980, 150)
tengah('KENAPA', f1, 250, 'white', 7)
w2 = d.textlength('PARTIKEL TUHAN', font=f2); y2 = 250 + f1.size + 40
d.rounded_rectangle([(W - w2) / 2 - 44, y2 - 14, (W + w2) / 2 + 44, y2 + f2.size + 30], radius=22, fill=AKS)
d.text(((W - w2) / 2, y2), 'PARTIKEL TUHAN', font=f2, fill=GELAP)
y3 = y2 + f2.size + 70
tengah('SANGAT PENTING?', f3, y3, 'white', 7)
# pill fakta
ff = fit('BOSON HIGGS DITEMUKAN 2012', BLK, 900, 64); fk = 'BOSON HIGGS DITEMUKAN 2012'; w = d.textlength(fk, font=ff); y4 = y3 + f3.size + 70
d.rounded_rectangle([60, y4, W - 60, y4 + ff.size + 46], radius=22, fill=AKS)
d.text(((W - w) / 2, y4 + 16), fk, font=ff, fill=GELAP)
bg.save(sys.argv[2], quality=92)
print('ok', y4 + ff.size + 46)
