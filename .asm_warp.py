import json,re,sys,os
h=open('.warp_head.html',encoding='utf-8').read()
css="""
.ov{position:absolute;z-index:6;opacity:0;visibility:hidden;color:#EEF2FF;isolation:isolate;text-shadow:0 3px 4px rgba(2,3,10,.9),0 0 30px rgba(2,3,10,.8)}
.ov:before{content:'';position:absolute;inset:-70px -110px;z-index:-1;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(2,3,10,.55),rgba(2,3,10,0))}
.ov small{display:block;font:500 28px/1.2 'Onest',sans-serif;letter-spacing:.14em;color:#C7CFEA;text-transform:uppercase}
.ov b{display:block;margin-top:8px;font:400 92px/1.05 'Instrument Serif',serif;letter-spacing:.005em}
.ov b.akh{font-style:italic;font-size:130px;color:#E3DAFF;text-shadow:0 3px 4px rgba(2,3,10,.9),0 0 50px rgba(160,130,255,.55)}
.ov em{display:block;margin-top:22px;font:500 26px 'Onest',sans-serif;letter-spacing:.06em;color:#AEB8E0;font-style:normal}
.ov .row{margin-bottom:34px}.ov .row b{font-size:64px}
.ov .trk{margin-top:12px;height:26px;border-radius:13px;background:rgba(150,165,230,.16);overflow:hidden}
.ov .trk i{display:block;height:100%;width:0;border-radius:13px;background:linear-gradient(90deg,#5d6fc9,#9fb4ff)}
.ov .trk i.vi{background:linear-gradient(90deg,#8f7bff,#e6a0ff);box-shadow:0 0 18px #b08cff}
.ov .trk i.am{background:linear-gradient(90deg,#c86a3a,#ffb070);box-shadow:0 0 18px #ff9a5a}
"""
h=h.replace('</style>',css+'</style>',1)
a=open('.warp_a.js',encoding='utf-8').read()
post=open('.warp_post.txt',encoding='utf-8').read()
i1=a.index('/* ============ [1] PALET'); i9=a.index('/* ============ [9] KAMERA'); iK=a.index('function kamera(t)'); i10=a.index('/* ============ [10] TEKS')
base=a[i1:i9]
base=base.replace('/*POST*/',post)
base=base.replace("window.STARS","STARS")
base=base.replace("const pts=new THREE.Points(g,m); pts.frustumCulled=false; S.add(pts); })();","STARS=new THREE.Points(g,m); STARS.frustumCulled=false; S.add(STARS); })();")
base=base.replace("(function(){ const N=7000","let STARS; (function(){ const N=7000")
base=base.replace("S.add(new THREE.HemisphereLight(0x6d86d6, 0x14182e, .38));","const hemi=new THREE.HemisphereLight(0x6d86d6, 0x14182e, .38); S.add(hemi);")
assert 'let STARS' in base and 'const hemi' in base
cam1=a[i9:i10].replace('function kamera(t)','function kamera1(t)')
cam1=cam1.replace("cam.lookAt(tg2);","cam.near=.1;cam.far=9000;cam.updateProjectionMatrix();cam.lookAt(tg2);",1)
i0=a.index('/* ============ [0]')
head0="""/* ============ [0] NASKAH & WAKTU ============ */
const TTS=__TTS__;
const START=[.7,14.5,43.5,70,91.5,125.5,158.5];
const KATA=[],KS=[];
TTS.forEach((o,k)=>{const tk=o.teks.split(' ');KS[k]=[];o.kata.forEach((q,i)=>{const e={w:tk[i],t0:+(START[k]+q[1]).toFixed(3),t1:+(START[k]+q[2]).toFixed(3)};KATA.push(e);KS[k].push(e);});o.start=START[k];});
const kw=(k,w,n)=>{const m=KS[k].filter(e=>e.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(w));return m[n||0].t0;};
const DUR=180;
const MOMEN={judulMasuk:.5,judulKeluar:4.3,angkaMasuk:kw(0,'tujuh')-.5,angkaKeluar:kw(0,'bagaimana')-.1,mingguMasuk:kw(0,'beberapa')-.1};
"""
c1=open('.warp_c1.js',encoding='utf-8').read()
c2=open('.warp_c2.js',encoding='utf-8').read().replace("','',","',")
c3=open('.warp_c3.js',encoding='utf-8').read()
tts=json.load(open('.tts_warp.json',encoding='utf-8'))
audio=json.load(open('.warp_audio.json',encoding='utf-8')) if os.path.exists('.warp_audio.json') else {"vo":[],"sfx":[],"music":None}
vo=[{"src":"assets/audio/vo-%02d.mp3"%(i+1),"at":s,"teks":tts[i]['teks']} for i,s in enumerate([.7,14.5,43.5,70,91.5,125.5,158.5])]
audio['vo']=vo
js=head0+base+cam1+c1+c2+c3
js=js.replace('__TTS__',json.dumps(tts,ensure_ascii=False)).replace('__AUDIO__',json.dumps(audio,ensure_ascii=False))
open('warp/scene.html','w',encoding='utf-8').write(h+js);print('ok')
