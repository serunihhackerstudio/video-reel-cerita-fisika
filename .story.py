import os, subprocess, glob
from PIL import Image, ImageDraw, ImageFont
os.makedirs('story', exist_ok=True)
FF = os.environ.get('FFMPEG', 'ffmpeg')
B = 'C:/Windows/Fonts/ariblk.ttf'; M = 'C:/Windows/Fonts/consolab.ttf'
f = lambda p, s: ImageFont.truetype(p, s)
W, H = 1080, 1920
# (folder, kunci file, mulai, durasi, tag, baris1, kata sorot, baris3, aksen, teks-pada-aksen)
V = [
 ('nuklir', '2026-11-24_kenapa-nuklir-bisa-jadi-listrik.mp4', 8.5, 14.0, 'ENERGI \u00b7 NUKLIR', 'KENAPA', 'NUKLIR BISA', 'JADI LISTRIK?', (18,242,198), (4,30,26)),
 ('bom-atom', '2026-11-24_kenapa-bom-atom-dahsyat.mp4', 14.0, 13.6, 'FISIKA \u00b7 ENERGI ATOM', 'KENAPA', 'BOM ATOM', 'SEDAHSYAT ITU?', (255,90,31), (255,255,255)),
 ('entanglement', '2026-11-24_entanglement-kuantum.mp4', 14.9, 14.0, 'FISIKA KUANTUM', 'APA ITU', 'ENTANGLEMENT', 'KUANTUM?', (122,92,255), (255,255,255)),
 ('blackhole', '2026-11-24_black-hole-dan-lubang-cacing.mp4', 6.8, 14.0, 'ASTRONOMI \u00b7 RELATIVITAS', 'MASUK', 'BLACK HOLE', 'APA YANG TERJADI?', (255,106,31), (255,255,255)),
 ('mariana', '2026-11-24_palung-mariana-menyelam.mp4', 6.3, 14.0, 'SAMUDRA \u00b7 LAUT DALAM', 'MENYELAM KE', 'PALUNG MARIANA', 'APA YANG TERJADI?', (25,227,255), (4,28,40)),
]
for fol, mp4, ss, dur, tag, l1, kunci, l3, acc, fg in V:
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    # gradasi lembut atas & bawah supaya teks terbaca
    for y in range(0, 700):
        a = int(150 * (1 - y / 700)); d.line([(0, y), (W, y)], fill=(0, 0, 0, a))
    for y in range(1450, H):
        a = int(170 * ((y - 1450) / (H - 1450))); d.line([(0, y), (W, y)], fill=(0, 0, 0, a))
    def center(y, s, font, fill, stroke=0):
        w = d.textlength(s, font=font); d.text(((W - w) / 2, y), s, font=font, fill=fill, stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
    fm = f(M, 32); w = d.textlength(tag, font=fm) + 60
    d.rounded_rectangle([(W - w) / 2, 270, (W + w) / 2, 330], radius=30, fill=(255, 255, 255, 235)); center(282, tag, fm, (20, 24, 30, 255))
    f1 = f(B, 78); center(350, l1, f1, (255, 255, 255, 255), 5)
    f2 = f(B, 88); w = d.textlength(kunci, font=f2) + 56
    if w > 1000: f2 = f(B, int(88 * 1000 / w)); w = d.textlength(kunci, font=f2) + 56
    d.rounded_rectangle([(W - w) / 2, 450, (W + w) / 2, 560], radius=14, fill=acc + (255,)); center(464, kunci, f2, fg + (255,))
    f3 = f(B, 66 if len(l3) < 16 else 58); center(580, l3, f3, (255, 255, 255, 255), 5)
    cta = 'TONTON REEL LENGKAPNYA'; fc = f(B, 46); tw = d.textlength(cta, font=fc); w = tw + 126
    d.rounded_rectangle([(W - w) / 2, 1560, (W + w) / 2, 1650], radius=18, fill=acc + (255,)); x0 = (W - w) / 2 + 35; d.polygon([(x0, 1588), (x0, 1622), (x0 + 30, 1605)], fill=fg + (255,)); d.text((x0 + 56, 1574), cta, font=fc, fill=fg + (255,))
    center(1676, 'Toufani RA', f(M, 36), (255, 255, 255, 255), 3)
    png = f'story/overlay_{fol}.png'; im.save(png)
    out = f'story/story_{fol}.mp4'
    cmd = [FF, '-y', '-v', 'error', '-ss', str(ss), '-t', str(dur), '-i', f'{fol}/{mp4}', '-i', png,
           '-filter_complex', '[0:v][1:v]overlay=0:0,fade=t=in:st=0:d=0.3,fade=t=out:st=%.2f:d=0.4[v];[0:a]afade=t=in:st=0:d=0.15,afade=t=out:st=%.2f:d=0.4[a]' % (dur - .4, dur - .4),
           '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-b:v', '2600k', '-maxrate', '3200k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out]
    subprocess.run(cmd, check=True)
    print(out, round(os.path.getsize(out) / 1e6, 2), 'MB')
