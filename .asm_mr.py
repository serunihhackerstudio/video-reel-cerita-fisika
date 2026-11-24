import json,re
head=open('.head.html',encoding='utf-8').read().replace('Kenapa nuklir bisa menghasilkan listrik?','Apa yang terjadi kalau manusia menyelam ke Palung Mariana?')
a=open('.mr_a.js',encoding='utf-8').read()
tools=open('.bom_tools.js',encoding='utf-8').read();tools='\n'.join(l for l in tools.split('\n') if not l.startswith('const POT='));tools=re.sub(r'\bPOT\b','PLN',tools)
s=open('.script.js',encoding='utf-8').read();tex=s[s.index('/* ---------- TEKSTUR (canvas)'):s.index('/* ---------- RENDERER')]
b,c,d,e=[open(f'.mr_{x}.js',encoding='utf-8').read() for x in 'bcde']
tts=json.load(open('mariana/.tts_mar.json',encoding='utf-8'));assert len(tts)==7
e=e.replace('__TTS__',json.dumps(tts,ensure_ascii=False))
open('mariana/scene.html','w',encoding='utf-8').write(head+a+tools+tex+b+c+d+e);print('ok')
