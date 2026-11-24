import json,re
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Apa itu entanglement kuantum?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Archivo:wght@600;800;900&family=IBM+Plex+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Archivo',sans-serif;--fm:'IBM Plex Mono',monospace")
a=open('.ent_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read()
tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='))
tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read()
tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b=open('.ent_b.js',encoding='utf-8').read();c=open('.ent_c.js',encoding='utf-8').read();d=open('.ent_d.js',encoding='utf-8').read();e=open('.ent_e.js',encoding='utf-8').read()
c=c.replace("F_L=strip(jalur(-1).slice(0,1).concat(jalur(-1)),.08,2.5),F_R=strip(jalur(1).slice(0,1).concat(jalur(1)),.08,2.5)","F_L=strip([[0,2.95,0]].concat(jalur(-1)),.08,2.5),F_R=strip([[0,2.95,0]].concat(jalur(1)),.08,2.5)")
d=d.replace("const[ , ]=[0,0];","")
e=e.replace("700 66px 'Space Grotesk'","800 66px 'Archivo'")
tts=json.load(open('.tts.json',encoding='utf-8'));assert len(tts)==7
e=e.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('entanglement/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+c+d+e)
print('ok')
