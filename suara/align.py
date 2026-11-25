"""Perata waktu kata untuk suara dari voice.ratware.id (tanpa timestamp kata). Gratis, hanya ffmpeg + stdlib.
Pakai: python suara/align.py <proyek> teks.json [berkas1.wav berkas2.wav ...]
 - teks.json = ["kalimat klip 1", ...]; WAV default = <proyek>/assets/audio/vo-NN.wav
 - Hasil: <proyek>/../.tts.json (format sama dengan tts_edge.py: [{"teks","kata":[[kata,mulai,selesai],...]}]) + <proyek>/assets/audio/vo-NN.mp3
 - Metode: silencedetect memotong audio jadi segmen bicara; teks dipecah per tanda baca jadi frasa; frasa dipetakan ke segmen
   menurut proporsi huruf kumulatif; dalam segmen tiap kata mendapat waktu sebanding panjang hurufnya."""
import json, os, re, subprocess, sys
FF = os.environ.get('FFMPEG', 'ffmpeg'); FP = os.environ.get('FFPROBE', 'ffprobe')
def dur(p):
    return float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]).decode().strip())
def segmen(p, noise='-34dB', d=0.16):
    total = dur(p)
    r = subprocess.run([FF, '-hide_banner', '-i', p, '-af', f'silencedetect=n={noise}:d={d}', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r)]
    sil = []
    for i, s in enumerate(st):
        e = en[i] if i < len(en) else total
        sil.append((max(0, s), e))
    seg, cur = [], 0.0
    for s, e in sil:
        if s - cur > 0.05: seg.append((cur, s))
        cur = e
    if total - cur > 0.05: seg.append((cur, total))
    return seg or [(0, total)], total
def frasa(teks):
    return [f for f in re.split(r'(?<=[.,;:?!…])\s+', teks.strip()) if f]
def bobot(w):
    return max(1, len(re.sub(r'[^A-Za-z0-9]', '', w))) + .6
def sejajar(teks, p):
    seg, total = segmen(p)
    # buang keheningan awal/akhir: segmen pertama mulai dari awalnya
    fr = frasa(teks); fw = [sum(bobot(w) for w in f.split()) for f in fr]; W = sum(fw)
    sd = [e - s for s, e in seg]; SD = sum(sd)
    # petakan frasa ke segmen menurut proporsi kumulatif
    asign = [[] for _ in seg]; cum = 0
    for f, w in zip(fr, fw):
        mid = (cum + w / 2) / W * SD; acc = 0
        for i, d in enumerate(sd):
            if mid <= acc + d or i == len(sd) - 1: asign[i].append(f); break
            acc += d
        cum += w
    kata = []
    for (s, e), fs in zip(seg, asign):
        ws = [w for f in fs for w in f.split()]
        if not ws: continue
        bw = [bobot(w) for w in ws]; B = sum(bw); t = s
        for w, b in zip(ws, bw):
            d = (e - s) * b / B; kata.append([re.sub(r'[.,;:?!…]+$', '', w), round(t, 3), round(t + d * .92, 3)]); t += d
    return kata, total
if __name__ == '__main__':
    proyek = sys.argv[1]; T = json.load(open(sys.argv[2], encoding='utf-8')); files = sys.argv[3:]
    ad = proyek + '/assets/audio'; out = []
    for i, t in enumerate(T, 1):
        w = files[i - 1] if i - 1 < len(files) else f'{ad}/vo-{i:02d}.wav'
        k, total = sejajar(t, w)
        subprocess.run([FF, '-y', '-v', 'error', '-i', w, '-codec:a', 'libmp3lame', '-q:a', '3', f'{ad}/vo-{i:02d}.mp3'], check=True)
        # kata terakhir selesai = akhir ucapan; sisakan sedikit ekor
        out.append({'teks': t, 'kata': k})
    json.dump(out, open(proyek + '/../.tts.json', 'w'), ensure_ascii=False)
    st = .3
    for i, o in enumerate(out, 1):
        print(i, len(o['teks'].split()), len(o['kata']), 'mulai', round(st, 2), 'selesai', round(st + o['kata'][-1][2], 2)); st += o['kata'][-1][2] + .4
