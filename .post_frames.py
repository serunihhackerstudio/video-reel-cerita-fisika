import os, subprocess, shutil, sys, tempfile
MF = 'C:/Users/ROG/.claude/skills/motion-format/scripts/mf.py'
FFB = 'C:/Users/ROG/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.1-full_build/bin'
env = dict(os.environ); env['PATH'] = env['PATH'] + os.pathsep + FFB
T = {
 'nuklir': [8.4, 13.0, 21.0, 28.5, 33.0, 40.0],
 'bom-atom': [5.5, 9.8, 15.5, 24.8, 33.5, 41.5],
 'entanglement': [5.2, 9.5, 17.4, 26.5, 35.6, 49.5],
 'blackhole': [1.5, 9.4, 17.6, 31.5, 41.5, 48.6],
 'mariana': [5.6, 9.4, 19.5, 31.0, 41.0, 49.0],
 'pelari': [14.8, 21.0, 31.5, 38.5, 46.5, 52.5, 30.5],
 'matahari': [14.0, 22.0, 30.0, 38.0, 46.0, 52.5, 40.5],
 'laut': [14.5, 23.5, 32.5, 43.5, 53.5, 71.0, 7.6],
 'blackhole2': [7.0, 14.5, 22.5, 28.5, 38.5, 52.0, 18.0],
 'gravitasi': [4.2, 11.6, 17.4, 22.0, 36.0, 49.8, 2.0],
 'kembar': [5.0, 9.6, 12.0, 20.0, 24.6, 46.4, 2.2],
 'stasiun': [6.4, 13.0, 21.2, 31.0, 46.4, 56.0, 3.6],
 'bintang': [7.2, 17.8, 26.8, 39.8, 47.0, 56.6, 2.2],
 'pesta': [9.2, 13.2, 20.4, 32.6, 38.6, 53.2, 1.2],
 'emas': [13.0, 16.1, 20.3, 34.0, 50.3, 37.2, 3.4],
 'mimpi': [6.5, 15.5, 31.0, 43.0, 60.0, 50.0, 7.8],
 'lubangwaktu': [9.0, 19.5, 28.5, 37.0, 49.5, 31.5, 2.6],
}
os.makedirs('post', exist_ok=True)
port = 9600
SEL = sys.argv[1:] or list(T)
for name, ts in T.items():
    if name not in SEL: continue
    port += 1
    tmp = os.path.join(tempfile.gettempdir(), 'pf-' + name)
    shutil.rmtree(tmp, ignore_errors=True)
    subprocess.run([sys.executable, MF, 'baru', tmp, '--dasar', 'isometrik-dibongkar', '--rasio', '9:16'], check=True, stdout=subprocess.DEVNULL, env=env)
    s = open(f'{name}/scene.html', encoding='utf-8').read()
    s = s.replace('<!--@BODY-->', '<style>#mfSub,.lt,.dot,#garis,#jejak,#tanda,#rpm,#seri{display:none!important}</style><!--@BODY-->', 1)
    open(os.path.join(tmp, 'scene.html'), 'w', encoding='utf-8').write(s)
    shutil.copytree(f'{name}/assets', os.path.join(tmp, 'assets'), dirs_exist_ok=True)
    e2 = dict(env); e2['MF_PORT'] = str(port)
    for attempt in range(3):
        r = subprocess.run([sys.executable, MF, 'potret', tmp, '--t', ','.join(str(x) for x in ts)], env=e2, capture_output=True, text=True)
        if os.path.exists(os.path.join(tmp, '.potret', '%02d.jpg' % (len(ts) - 1))): break
    os.makedirs(f'post/{name}', exist_ok=True)
    for i in range(len(ts)):
        shutil.copy(os.path.join(tmp, '.potret', f'{i:02d}.jpg'), f'post/{name}/f{i}.jpg')
    print(name, 'ok')
