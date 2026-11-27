import json,re,sys
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Bisakah kita menjelajahi semesta lain lewat mimpi?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Archivo:wght@600;800;900&family=IBM+Plex+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Archivo',sans-serif;--fm:'IBM Plex Mono',monospace")
css='#kilat{position:absolute;inset:0;z-index:11;background:radial-gradient(circle at 50% 50%,#e6fff4,#4ff0b8);opacity:0;pointer-events:none}\n'
head=head.replace('</style>',css+'</style>',1)
head=head.replace('<div id="jejak"></div>','<div id="jejak"></div>\n<div id="kilat"></div>\n')
a=open('.tw_a.js',encoding='utf-8').read()
a=re.sub(r"const PAL=\{.*?\};","const PAL={langit:['#232d6e','#141a4a','#080b26'],aks:'#19e6a1',tb:'#a8ffd9',ta:'#d2ffea'};",a,count=1)
a+="const PH=new THREE.Plane(new THREE.Vector3(-1,0,0),400),PB=new THREE.Plane(new THREE.Vector3(-1,0,0),400);\n"
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('const salin')]
bs=open('.bs_head.js',encoding='utf-8').read()
for x,y in [("'rgba(246,170,255,.9)'","'rgba(150,255,214,.9)'"),("'rgba(217,60,245,.3)'","'rgba(25,230,161,.3)'"),("'rgba(217,60,245,0)'","'rgba(25,230,161,0)'"),("x.shadowColor='#d93cf5'","x.shadowColor='#19e6a1'"),("x.fillStyle='#fcdfff';x.fillText('?'","x.fillStyle='#d2ffea';x.fillText('?'")]:
    assert x in bs,x
    bs=bs.replace(x,y)
_t=open('.tw_b.js',encoding='utf-8').read()
b=bs+_t[:_t.index('/* ================= DUNIA A: LANDASAN')]+open('.mm_b.js',encoding='utf-8').read();d=open('.mm_d.js',encoding='utf-8').read()
tts=json.load(open(sys.argv[1] if len(sys.argv)>1 else '.tts_mm.json',encoding='utf-8'));assert len(tts)==8
d=d.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('mimpi/scene.html','w',encoding='utf-8').write(head+a+tex+b+d);print('ok')
