import json,os
h=open('.nk_head.html',encoding='utf-8').read()
base=open('.nk_base.js',encoding='utf-8').read()
b=open('.nk_b.js',encoding='utf-8').read()
post=open('.warp_post.txt',encoding='utf-8').read()
js=(base+b).replace("','',","',").replace('/*POST*/',post)
tts=json.load(open('.tts_nk.json',encoding='utf-8'))
audio=json.load(open('.nk_audio.json')) if os.path.exists('.nk_audio.json') else {"vo":[],"sfx":[],"music":None}
audio['vo']=[{"src":"assets/audio/vo-%02d.mp3"%(i+1),"at":s,"teks":tts[i]['teks']} for i,s in enumerate([.7,10.5,42.5,70.5,100.5,130.5,160.5])]
js=js.replace('__TTS__',json.dumps(tts,ensure_ascii=False)).replace('__AUDIO__',json.dumps(audio,ensure_ascii=False))
open('bomnuklir/scene.html','w',encoding='utf-8').write(h+js);print('ok')
