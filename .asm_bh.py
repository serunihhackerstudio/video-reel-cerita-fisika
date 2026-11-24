import json,re
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Apa yang terjadi kalau manusia memasuki black hole?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Space Grotesk',sans-serif;--fm:'JetBrains Mono',monospace").replace("font:900 64px/1 var(--fj)","font:700 64px/1 var(--fj)").replace("font:900 76px/1 var(--fj)","font:700 76px/1 var(--fj)")
a=open('.bh_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b,c,d,e=[open(f'.bh_{x}.js',encoding='utf-8').read() for x in 'bcde']
tts=json.load(open('blackhole/.tts_bh.json',encoding='utf-8'));assert len(tts)==7
e=e.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('blackhole/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+c+d+e);print('ok')
