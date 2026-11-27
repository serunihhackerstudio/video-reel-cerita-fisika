import json,re,sys
head=open('.head.html',encoding='utf-8').read()
head=head.replace('Kenapa nuklir bisa menghasilkan listrik?','Bisakah lubang cacing dipakai untuk kembali ke masa lalu?').replace('family=Overpass:wght@600;800;900&family=Overpass+Mono:wght@500;700','family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700')
head=head.replace("--fj:'Overpass',sans-serif;--fm:'Overpass Mono',monospace","--fj:'Space Grotesk',sans-serif;--fm:'JetBrains Mono',monospace").replace("font:900 64px/1 var(--fj)","font:700 64px/1 var(--fj)").replace("font:900 76px/1 var(--fj)","font:700 76px/1 var(--fj)")
css="#seri{position:absolute;left:70px;top:88px;z-index:12;display:flex;align-items:center;gap:14px;opacity:0;font:700 29px/1 var(--fm);letter-spacing:.06em;color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.8);padding:8px 24px 8px 12px;border-radius:44px;background:rgba(24,10,44,.5);border:2px solid rgba(243,185,255,.6)}\n"
head=head.replace('</style>',css+'</style>',1)
svg='<div id="seri"><svg viewBox="0 0 64 64" width="56" height="56"><defs><radialGradient id="brs" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".55" stop-color="#c9993a"/><stop offset="1" stop-color="#7a5418"/></radialGradient></defs><rect x="28" y="1" width="8" height="9" rx="2" fill="url(#brs)"/><circle cx="32" cy="36" r="26" fill="url(#brs)"/><circle cx="32" cy="36" r="20" fill="#f6efd8"/><g class="wh"><rect x="31" y="22" width="2.4" height="14" rx="1" fill="#2a1c10"/></g><g class="wm"><rect x="31.2" y="27" width="1.8" height="9" rx="1" fill="#2a1c10"/></g><circle cx="32" cy="36" r="2" fill="#7a5418"/></svg><span>PERJALANAN WAKTU · EP 6</span></div>'
head=head.replace('<div id="jejak"></div>','<div id="jejak"></div>\n'+svg)
a=open('.bh_a.js',encoding='utf-8').read()
a=re.sub(r"const PAL=\{.*?\};","const PAL={langit:['#10132e','#0a0c20','#04050f'],aks:'#d93cf5',tb:'#f3b9ff',ta:'#fcdfff'};",a,count=1)
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b=open('.bh_b.js',encoding='utf-8').read()
for x,y in [("'rgba(255,170,100,.9)'","'rgba(246,170,255,.9)'"),("'rgba(255,90,30,.3)'","'rgba(217,60,245,.3)'"),("'rgba(255,90,30,0)'","'rgba(217,60,245,0)'")]:
    assert x in b,x
    b=b.replace(x,y)
c=open('.bh_c.js',encoding='utf-8').read();d=open('.wh_d.js',encoding='utf-8').read()
tts=json.load(open(sys.argv[1] if len(sys.argv)>1 else '.tts_wh.json',encoding='utf-8'));assert len(tts)==7
d=d.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('lubangwaktu/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+c+d);print('ok')
