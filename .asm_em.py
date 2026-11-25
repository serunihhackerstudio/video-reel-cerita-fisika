import json,re,sys
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Dari mana asal emas di Bumi?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Archivo:wght@600;800;900&family=IBM+Plex+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Archivo',sans-serif;--fm:'IBM Plex Mono',monospace")
head=head.replace('</style>','#kilat{position:absolute;inset:0;z-index:11;background:radial-gradient(circle at 50% 50%,#fffbe6,#ffd36b);opacity:0;pointer-events:none}\n</style>',1).replace('<div id="jejak"></div>','<div id="jejak"></div>\n<div id="rpm"></div>\n<div id="kilat"></div>')
a=open('.em_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b=open('.em_b.js',encoding='utf-8').read();d=open('.em_d.js',encoding='utf-8').read()
tts=json.load(open(sys.argv[1] if len(sys.argv)>1 else '.tts_em.json',encoding='utf-8'));assert len(tts)==8
d=d.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('emas/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+d);print('ok')
