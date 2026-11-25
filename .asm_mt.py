import json,re,sys
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Apa yang terjadi kalau matahari tiba-tiba menghilang?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Outfit:wght@600;800&family=JetBrains+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Outfit',sans-serif;--fm:'JetBrains Mono',monospace").replace("font:900 64px/1 var(--fj)","font:800 64px/1 var(--fj)").replace("font:900 76px/1 var(--fj)","font:800 76px/1 var(--fj)")
a=open('.mt_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b=open('.mt_b.js',encoding='utf-8').read();d=open('.mt_d.js',encoding='utf-8').read()
tts=json.load(open(sys.argv[1] if len(sys.argv)>1 else '.tts_mt.json',encoding='utf-8'));assert len(tts)==7
d=d.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('matahari/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+d);print('ok')
