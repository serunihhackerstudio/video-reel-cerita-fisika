import json,re
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Apa yang terjadi kalau laut tidak asin lagi?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Archivo:wght@600;800&family=IBM+Plex+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Archivo',sans-serif;--fm:'IBM Plex Mono',monospace").replace("font:900 64px/1 var(--fj)","font:800 64px/1 var(--fj)").replace("font:900 76px/1 var(--fj)","font:800 76px/1 var(--fj)")
a=open('.lt_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b=open('.lt_b.js',encoding='utf-8').read();d=open('.lt_d.js',encoding='utf-8').read()
tts=json.load(open('.tts_laut.json',encoding='utf-8'));assert len(tts)==8
d=d.replace('const KATA=[];','const TTS=__TTS__;const KATA=[];',1).replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('laut/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+d);print('ok')
