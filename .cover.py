"""Generator sampul Reels gaya Toufani RA. Teks di dalam pill/blok DITENGAHKAN secara visual (tinggi huruf kapital, padding sama di semua sisi).
Pakai: python .cover.py [nama ...]   -> <folder>/thumbnail.jpg"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
B = 'C:/Windows/Fonts/ariblk.ttf'; M = 'C:/Windows/Fonts/consolab.ttf'
f = lambda p, s: ImageFont.truetype(p, s)
W, H = 1080, 1920
# folder: (gambar dasar, tag, baris1, kunci (blok), baris3, pill fakta, aksen, warna teks pada aksen, tag-teks-gelap)
C = {
 'nuklir': ('post/nuklir/f0.jpg', 'ENERGI \u00b7 NUKLIR', 'KENAPA', 'NUKLIR BISA', 'JADI LISTRIK?', 'ATOM DIBELAH \u2192 LISTRIK', (18,242,198), (4,30,26)),
 'bom-atom': ('post/bom-atom/f2.jpg', 'FISIKA \u00b7 ENERGI ATOM', 'KENAPA', 'BOM ATOM', 'SEDAHSYAT ITU?', '1 NEUTRON \u2192 REAKSI BERANTAI', (255,90,31), (255,255,255)),
 'entanglement': ('entanglement/.clean2.jpg', 'FISIKA KUANTUM', 'APA ITU', 'ENTANGLEMENT', 'KUANTUM?', '2 FOTON \u00b7 1 KETERKAITAN', (122,92,255), (255,255,255)),
 'blackhole': ('blackhole/.clean.jpg', 'ASTRONOMI \u00b7 RELATIVITAS', 'MASUK', 'BLACK HOLE', 'APA YANG TERJADI?', '+ LUBANG CACING (HIPOTESIS)', (255,106,31), (255,255,255)),
 'mariana': ('mariana/.clean.jpg', 'SAMUDRA \u00b7 LAUT DALAM', 'MENYELAM KE', 'PALUNG MARIANA', 'APA YANG TERJADI?', '10,9 KM \u00b7 TEKANAN >1.000\u00d7', (25,227,255), (4,28,40)),
 'matahari': ('post/matahari/f6.jpg', 'ASTRONOMI · SKENARIO', 'APA YANG TERJADI', 'MATAHARI MENGHILANG', 'TIBA-TIBA?', 'BUMI MASIH MENGORBIT ±8 MENIT', (255,198,26), (50,36,0)),
 'laut': ('post/laut/f6.jpg', 'SAINS · LAUT', 'APA YANG TERJADI', 'LAUT TIDAK ASIN', 'LAGI?', 'SKENARIO PENGANDAIAN', (255,212,0), (50,40,0)),
 'blackhole2': ('post/blackhole2/f6.jpg', 'ASTRONOMI · PART 2', 'BISAKAH KITA KELUAR', 'LEWAT LUBANG CACING', 'LANJUTAN BLACK HOLE', 'JEMBATAN ATAU JALAN BUNTU?', (255,106,31), (255,255,255)),
 'pelari': ('post/pelari/f6.jpg', 'FISIKA \u00b7 RELATIVITAS', 'PRIA BERLARI', 'MENDEKATI CAHAYA', 'APA YANG TERJADI?', '7\u00d7 KELILING BUMI / DETIK', (46,155,255), (255,255,255)),
 'pesta': ('post/pesta/f6.jpg', 'SAINS · FISIKA', 'PESTA PENJELAJAH', 'WAKTU', 'TANPA TAMU', 'HAWKING · 2009', (217,60,245), (255,255,255)),
 'emas': ('post/emas/f6.jpg', 'SAINS · ASTRONOMI', 'DARI MANA ASAL', 'EMAS', 'DI BUMI?', 'LEBIH TUA DARI BUMI', (247,193,61), (50,34,0)),
}
def pill(d, cx, cy, text, font, bg, fg, radius=None, padx=None, pady=None, stroke=0):
    """Blok berisi teks dengan teks tepat di tengah (kapital: pakai tinggi huruf kapital, bukan tinggi font)."""
    L, T, R, Bt = d.textbbox((0, 0), text, font=font, anchor='ls')      # T negatif = tinggi huruf di atas garis dasar
    cap = -T; tw = R - L
    padx = padx if padx is not None else int(cap * 0.95); pady = pady if pady is not None else int(cap * 0.62)
    w, h = tw + 2 * padx, cap + 2 * pady
    d.rounded_rectangle([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], radius=radius if radius is not None else int(h * .22), fill=bg)
    d.text((cx - tw / 2 - L, cy + cap / 2), text, font=font, fill=fg, anchor='ls', stroke_width=stroke, stroke_fill=(0, 0, 0))
    return w, h
def teks(d, cx, cy, text, font, fill, stroke=0):
    L, T, R, Bt = d.textbbox((0, 0), text, font=font, anchor='ls'); cap = -T
    d.text((cx - (R - L) / 2 - L, cy + cap / 2), text, font=font, fill=fill, anchor='ls', stroke_width=stroke, stroke_fill=(0, 0, 0))
def fit(d, text, size, maxw, path=B):
    fo = f(path, size)
    while d.textlength(text, font=fo) > maxw and size > 20: size -= 2; fo = f(path, size)
    return fo
SEL = sys.argv[1:]
for nama, (dasar, tag, l1, kunci, l3, fakta, acc, fg) in C.items():
    if SEL and nama not in SEL: continue
    im = Image.open(dasar).convert('RGBA')
    if im.size != (W, H): im = im.crop((0, 285, 1080, 1635)).resize((W, H))  # gambar 4:5 -> penuhi 9:16
    d = ImageDraw.Draw(im); cx = W / 2
    pill(d, cx, 162, tag, f(M, 34), (255, 255, 255, 235), (20, 24, 30, 255), radius=34, padx=34, pady=14)
    teks(d, cx, 290, l1, fit(d, l1, 92, 980), (255, 255, 255, 255), 5)
    pill(d, cx, 410, kunci, fit(d, kunci, 92, 900), acc + (255,), fg + (255,))
    teks(d, cx, 530, l3, fit(d, l3, 76, 980), (255, 255, 255, 255), 5)
    pill(d, cx, 648, fakta, fit(d, fakta, 46, 900), acc + (255,), fg + (255,), pady=None)
    d.text((W - 300, 60), 'Toufani RA', font=f(M, 34), fill=(255, 255, 255, 235))
    out = f'{nama}/thumbnail.jpg'; im.convert('RGB').save(out, quality=92); print(out)
