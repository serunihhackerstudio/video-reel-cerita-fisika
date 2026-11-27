import json,os
h=open('.mc_head.html',encoding='utf-8').read()
a=open('.mc_a.js',encoding='utf-8').read()
b=open('.mc_b.js',encoding='utf-8').read()
post=open('.warp_post.txt',encoding='utf-8').read()
w=open('.warp_a.js',encoding='utf-8').read()
earth=w[w.index('const R_B = 100'):w.index('atmos.position.copy(PUSAT_B); S.add(atmos);')+len('atmos.position.copy(PUSAT_B); S.add(atmos);')]
js=(a+b).replace('/*POST*/',post).replace('/*EARTH*/',earth)
tts=json.load(open('.tts_mc.json',encoding='utf-8'))
audio=json.load(open('.mc_audio.json')) if os.path.exists('.mc_audio.json') else {"vo":[],"sfx":[],"music":None}
audio['vo']=[{"src":"assets/audio/vo-%02d.mp3"%(i+1),"at":s,"teks":tts[i]['teks']} for i,s in enumerate([.7,14.5,45.5,73.5,102.5,131.5,160])]
js=js.replace('__TTS__',json.dumps(tts,ensure_ascii=False)).replace('__AUDIO__',json.dumps(audio,ensure_ascii=False))
open('mengecil/scene.html','w',encoding='utf-8').write(h+js);print('ok')
