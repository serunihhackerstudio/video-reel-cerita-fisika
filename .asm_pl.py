import json,re
head=open('.head.html',encoding='utf-8').read().replace('Kenapa nuklir bisa menghasilkan listrik?','Apa yang terjadi kalau pria berlari mendekati kecepatan cahaya?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Sora:wght@600;800&family=JetBrains+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Sora',sans-serif;--fm:'JetBrains Mono',monospace").replace("font:900 64px/1 var(--fj)","font:800 64px/1 var(--fj)").replace("font:900 76px/1 var(--fj)","font:800 76px/1 var(--fj)")
a=open('.pl_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b,c,d,e=[open(f'.pl_{x}.js',encoding='utf-8').read() for x in 'bcde']
tts=json.load(open('pelari/.tts_pel.json',encoding='utf-8'));assert len(tts)==8
e=e.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('pelari/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+c+d+e);print('ok')
