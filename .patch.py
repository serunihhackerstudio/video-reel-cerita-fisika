import json,re
p='.script.js'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert old in s, old[:60]
    s=s.replace(old,new,cnt)
def rep_line(prefix,new):
    global s
    L=s.split('\n');n=0
    for i,l in enumerate(L):
        if l.startswith(prefix): L[i]=new;n+=1
    assert n>=1,prefix
    s='\n'.join(L)
rep_line('const WAKTU=',"const WAKTU={potong:[3.6,5.6],kerja:[5.8,6.8],dur:45.6};")
rep_line('const KD_KUNCI=',"const KD_KUNCI=[[0,[9,2,-8],118],[3.4,[8,4,-8],92],[5.6,[0,6.5,-8],58],[8.2,[-6.3,7,-8],40],[11,[-8,6,-8],30],[16.5,[-8,6,-8],28],[18.5,[-7.5,5.8,-8],30],[24,[-6.5,5.5,-8],30],[26,[-5,5,-8],26],[29,[-3,6,-8],30],[30.4,[4,4.5,-8],34],[31.5,[9,4,-8],34],[33,[14,4,-8],34],[35,[18,6,-8],46],[36.8,[20,6,-14],58],[38.3,[26,6,-8],52],[41.5,[26,7,-8],50],[44,[12,6,-8],100],[45.6,[12,6,-8],105]];")
rep("h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));","h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;")
L=s.split('\n');s='\n'.join([l for l in L if not l.startswith('tanda({t:')])
labels="""tanda({t:'Gedung reaktor',s:'tempat atom dibelah',p:[RX,14,ZC],o:[-60,-120],a:.7,b:3.5,am:1});
tanda({t:'Gedung turbin',s:'tempat listrik dibuat',p:[10,9.2,ZC],o:[40,-170],a:1.3,b:3.5});
tanda({t:'Menara pendingin',s:'melepas uap air',p:[TX+4,13,ZC],o:[40,-130],a:1.9,b:3.5});
tanda({t:'Bejana reaktor',s:'baja tebal, penuh air',p:[VX-1.9,5.4,ZC],o:[-50,-200],a:6.2,b:9.8});
tanda({t:'Batang bahan bakar',s:'berisi uranium',p:[VX+.42,3.9,ZC],o:[170,-130],a:9.9,b:17.4,am:1});
tanda({t:'Air bertekanan',s:'dalam bejana reaktor',p:[VX+.6,2.6,ZC],o:[190,160],a:19.0,b:24.4,am:1});
tanda({t:'Bejana reaktor',s:'baja tebal, penuh air',p:[VX-1.9,5.4,ZC],o:[-50,-200],a:19.9,b:22.0});
tanda({t:'Generator uap',s:'air panas ke air kedua',p:[SX+1.2,4.2,ZC],o:[170,-210],a:25.9,b:29.8,am:1});
tanda({t:'Uap',s:'siap memutar turbin',p:[SX,7.6,ZC],o:[170,-90],a:29.0,b:30.7,big:1,am:1});
tanda({t:'Turbin',s:'diputar oleh uap',p:[11.2,5.3,ZC],o:[-40,-220],a:30.5,b:36.0});
tanda({t:'Generator listrik',s:'turbin memutar magnet',p:[16.2,4.9,ZC],o:[60,-190],a:32.0,b:36.0,am:1});
tanda({t:'Tiang transmisi',s:'listrik menuju rumah',p:[22.5,11.4,-16],o:[-70,-150],a:36.2,b:43.8,am:1});
tanda({t:'Menara pendingin',s:'uap jadi air lagi',p:[TX+3,8,ZC],o:[-60,-210],a:38.7,b:43.6,am:1});
tanda({t:'Dipakai lagi',s:'air kembali ke pembangkit',p:[22,1.1,ZC-1.3],o:[-60,170],a:40.2,b:43.6});"""
rep_line('const JEJAK=',labels+"\nconst JEJAK=[[0,'PLTN'],[3.6,'PLTN › <b>DIBELAH</b>'],[5.8,'PLTN › <b>REAKTOR</b>'],[9.6,'REAKTOR › <b>ATOM URANIUM</b>'],[17.8,'REAKTOR › <b>AIR PANAS</b>'],[24.7,'REAKTOR › <b>GENERATOR UAP</b>'],[29.9,'GENERATOR UAP › <b>TURBIN</b>'],[32.8,'TURBIN › <b>LISTRIK</b>'],[37.7,'PLTN › <b>PENDINGIN</b>'],[43.9,'PLTN']];")
rep_line('const ZOOM=',"const ZOOM=null;")
rep("×${Math.round(nilaiTabel(ZOOM,t))}","×${Math.max(1,Math.round(118/(window.HC||118)))}")
d=json.load(open('.tts.json',encoding='utf-8'));st=.3;kata=[]
for o in d:
    toks=o['teks'].split()
    assert len(toks)==len(o['kata']),(toks,o['kata'])
    for tk,(w,a,b) in zip(toks,o['kata']):kata.append([tk,round(st+a,3),round(st+b,3)])
    o['start']=st;st+=o['kata'][-1][2]+.4
kl=','.join("['%s',%s,%s]"%(w,a,b) for w,a,b in kata)
rep_line('  kata:[',"  kata:[%s].map(([w,t0,t1])=>({w,t0,t1}))," % kl)
kunci=['nuklir','listrik','bongkar','dalam','uranium','neutron','terbelah','fisi','panas','besar','bertekanan','uap','turbin','generator','tercipta','transmisi','menara','pendingin','dipakai']
rep_line('  sub:{',"  sub:{font:\"900 66px 'Overpass'\",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:%s},"%json.dumps(kunci))
vo=','.join("{src:'assets/audio/vo-%02d.mp3',at:%.2f,teks:%s}"%(i,o['start'],json.dumps(o['teks'],ensure_ascii=False)) for i,o in enumerate(d,1))
sfx="[{src:'assets/audio/sfx-whoosh.wav',at:3.45,vol:.4},{src:'assets/audio/sfx-tik.wav',at:.62,vol:.3},{src:'assets/audio/sfx-tik.wav',at:6.1,vol:.3},{src:'assets/audio/sfx-zap.wav',at:12.0,vol:.45},{src:'assets/audio/sfx-tik.wav',at:25.85,vol:.3},{src:'assets/audio/sfx-hum.wav',at:30.1,vol:.28},{src:'assets/audio/sfx-tik.wav',at:31.95,vol:.3},{src:'assets/audio/sfx-zing.wav',at:33.0,vol:.4},{src:'assets/audio/sfx-hiss.wav',at:38.3,vol:.3},{src:'assets/audio/sfx-tik.wav',at:38.65,vol:.3}]"
rep_line('  audio:{',"  audio:{vo:[%s],sfx:%s,music:null},"%(vo,sfx))
rep_line('    const kj=sstep(',"    const kj=sstep(...WAKTU.kerja,t),den=.65+.35*Math.sin(t*5),fis=sstep(11.4,12.2,t)*(1-sstep(16.5,17.5,t)),spike=t>12.2?Math.exp(-(t-12.2)*2.2):0;")
rep_line('    matBB.emissiveIntensity=',"    matBB.emissiveIntensity=.25+kj*(2.2*den)+fis*1.4+spike*3;PL.intensity=kj*3.2*den+fis*3+spike*6;")
rep_line('    ROTOR.forEach(',"    {let a=0;for(let u=0;u<t;u+=1/30){a+=(1+14*sstep(30.2,31.4,u))/30;}ROTOR.forEach(g=>g.rotation.x=a);}")
rep_line('    A_PANAS.atur(',"    A_PANAS.atur(seg(t,18.4,19.8),t);A_UBEND.atur(seg(t,25.4,26.6),t);A_DINGIN.atur(seg(t,26.5,27.7),t);")
rep_line('    A_UAP.atur(',"    A_UAP.atur(seg(t,29.0,30.2),t);A_TURBIN.atur(seg(t,30.4,31.7),t);A_LISTRIK.atur(seg(t,33.2,35.4),t);A_TOWER.atur(seg(t,38.8,40.2),t);A_BALIK.atur(seg(t,40.4,41.8),t);\n    gambarGelembung(t);gambarInset(t);gambarAngka(t);")
extra=open('.extra.js',encoding='utf-8').read()
rep("/* ---------- SCENE ---------- */",extra+"\n/* ---------- SCENE ---------- */")
open(p,'w',encoding='utf-8').write(s)
print('ok')
