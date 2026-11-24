import json,re
b=open('.bom_body.js',encoding='utf-8').read().replace("const WAKTU={potong:[4.6,6.2],lattice:[6.2,7.0],dur:8.4};","const WAKTU={potong:[3.7,5.5],lattice:[5.5,6.3],dur:48.8};")
t=open('.bom_tools.js',encoding='utf-8').read()
b2=open('.bom_body2.js',encoding='utf-8').read();b2=b2[:b2.index('/* ---------- LABEL')]
b2=re.sub(r"const KD_KUNCI=\[.*?\];","const KD_KUNCI=[[0,[0,3.0,0],44],[2.6,[-.2,3.0,0],22],[4.2,[-.4,3.05,0],9],[6.2,[-.2,2.98,0],5.6],[8,[-.2,2.98,0],5.6]];",b2,count=1,flags=re.S)
atom=open('.bom_atom.js',encoding='utf-8').read();tail=open('.bom_tail.js',encoding='utf-8').read()
tail=tail.replace("JSON.parse('__TTS__')",json.dumps(json.load(open('.tts2.json',encoding='utf-8')),ensure_ascii=False))
open('bom-atom/scene.html','w',encoding='utf-8').write(open('.bom_head.html',encoding='utf-8').read()+b+t+b2+atom+tail)
