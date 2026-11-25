
const EZ=E;const E_in=k=>EZ.in(k),E_out=k=>EZ.out(k),E_io=k=>EZ.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]),T=(i,f)=>CS[i]+f*CD[i];
const DURASI=CE[CE.length-1]+1.2;
const TV=T(0,.34),TARR=CS[3]+1.0,TCUT=T(4,.02),TREP=CS[6]-.2;      // matahari lenyap · strip terakhir sampai · potong Bumi · pemutaran ulang (jangkar)
/* ---------- GERAK BUMI ---------- */
const TH0=-30*DEG,OM=1.4/Ro,VL=1.4;
const ep=(th)=>new THREE.Vector3(Ro*Math.cos(th),0,Ro*Math.sin(th));
function posBumi(t){if(t>=TREP)return ep(TH0-OM*(t-TREP)*.8);if(t<TARR)return ep(TH0-OM*t);const ta=TH0-OM*TARR,a=ep(ta),d=new THREE.Vector3(Math.sin(ta),0,-Math.cos(ta));return a.add(d.multiplyScalar(VL*(t-TARR)));}
/* ---------- KAMERA ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function interp(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const e=halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])));return[K[i],K[i+1],e];}
const HK=[[0,126],[T(0,.9),106],[CS[1],106],[CS[3],110],[CS[4]-.2,124],[CS[4]+1.6,17],[CE[5]+.2,17],[CE[5]+1.8,104],[DURASI,98]];
const FK=[[0,.5],[T(0,.9),.6],[CS[1],.5],[CS[3],.55],[CS[4]-.2,.75],[CS[4]+1.2,1],[CE[5],1],[CE[5]+1.8,.5],[DURASI,.5]];
let EPOS=new THREE.Vector3();
function kameraDunia(t){const[A,B,e]=interp(HK,t),h=Math.exp(lerp(Math.log(A[1]),Math.log(B[1]),e)),[Fa,Fb,fe]=interp(FK,t),f=lerp(Fa[1],Fb[1],fe);
  const tg=new THREE.Vector3(EPOS.x*f,EPOS.y*f,EPOS.z*f);pasangKamera(KD,[tg.x,tg.y,tg.z],h,h*W/H);window.HC=h;}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,400);cam.lookAt(_v);}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':'')+(o.sm?' sm':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
const mid=()=>[EPOS.x*.5,0,EPOS.z*.5],tit=(f)=>{const q=EPOS.clone().multiplyScalar(f);return[q.x,q.y,q.z];};
const lokal=(r,a)=>[EPOS.x+r*Math.cos(a*DEG),EPOS.y+r*Math.sin(a*DEG),EPOS.z];
tanda({t:'Matahari',s:'sumber cahaya dan tarikan',p:[0,SUNR,0],o:[110,-190],a:T(0,.04),b:T(0,.33),am:1,big:1});
tanda({t:'Bumi',s:'mengorbit matahari',p:()=>[EPOS.x,EPOS.y+ER,EPOS.z],o:[-90,-200],a:T(0,.1),b:T(0,.33)});
tanda({t:'Garis orbit',s:'jalur Bumi mengitari matahari',p:()=>{const q=ep(TH0-OM*TV+0.55);return[q.x,q.y,q.z];},o:[-100,170],a:T(0,.4),b:T(0,.78)});
tanda({t:'Cahaya terakhir',s:'masih di perjalanan',p:()=>tit(.45),o:[110,-200],a:T(0,.62),b:T(0,1.0)+.6,am:1});
tanda({t:'±8 menit',s:'waktu cahaya sampai ke Bumi',p:()=>tit(.62),o:[-110,-210],a:CS[1]+.3,b:T(1,.64),am:1,big:1});
tanda({t:'Langit masih terang',s:'belum ada yang berubah',p:()=>[EPOS.x,EPOS.y+ER,EPOS.z],o:[-80,-190],a:T(1,.7),b:CE[1]+.6});
tanda({t:'Tarikan gravitasi',s:'juga merambat secepat cahaya',p:()=>tit(.55),o:[110,170],a:CS[2]+.2,b:CE[2]+.2,am:1});
tanda({t:'Bumi masih mengorbit',s:'selama ±8 menit',p:()=>[EPOS.x,EPOS.y+ER,EPOS.z],o:[-90,-190],a:T(2,.5),b:CE[2]+.7});
tanda({t:'Strip terakhir sampai',s:'tarikan matahari berakhir',p:()=>[EPOS.x,EPOS.y+ER*.5,EPOS.z],o:[-110,-200],a:TARR,b:TARR+2.4,am:1,big:1});
tanda({t:'Lepas orbit',s:'melaju lurus, menyinggung orbit lama',p:()=>[EPOS.x,EPOS.y+ER,EPOS.z],o:[110,-200],a:T(3,.38),b:CE[3]+.4,am:1});
tanda({t:'Garis orbit lama',s:'tidak lagi diikuti',p:()=>{const q=ep(TH0-OM*TARR-.2);return[q.x,q.y,q.z];},o:[110,190],a:T(3,.62),b:CE[3]+.5});
tanda({t:'Lautan',s:'tebalnya kelihatan di irisan',p:()=>lokal(ER-.15,150),o:[-110,-200],a:T(4,.3),b:T(4,.58),am:1});
tanda({t:'Kerak · Mantel · Inti',s:'lapisan Bumi berwarna beda',p:()=>lokal(2.4,-40),o:[110,200],a:T(4,.3),b:T(4,.55)});
tanda({t:'Laut membeku',s:'es menebal dari permukaan',p:()=>lokal(ER+.15,100),o:[110,-200],a:T(4,.6),b:CE[4]+.4,am:1,big:1});
tanda({t:'Air cair di bawah es',s:'masih terjaga panas dalam Bumi',p:()=>lokal(ER-.12,40),o:[110,200],a:T(5,.3),b:T(5,.6),am:1});
tanda({t:'Panas dari dalam Bumi',s:'sisa panas inti masih mengalir',p:()=>lokal(1.2,-30),o:[110,190],a:CS[5]+.1,b:T(5,.32),am:1,big:1});
tanda({t:'Ventilasi dasar laut',s:'kehidupan bertahan lebih lama',p:()=>lokal(ER-.35,112),o:[-110,-200],a:T(5,.58),b:CE[5]+.4,am:1});
tanda({t:'Jangkar',s:'tarikan matahari menahan Bumi di orbit',p:()=>tit(.5),o:[110,-200],a:CS[6]+.3,b:CE[6]+.6,am:1,big:1});
tanda({t:'Matahari',s:'bukan cuma sumber cahaya',p:[0,SUNR,0],o:[100,-190],a:CS[6]+.1,b:CS[6]+3});
const JEJAK=[[0,'RUANG ANGKASA › <b>MATAHARI & BUMI</b>'],[TV,'MATAHARI <b>LENYAP</b> › CAHAYA TERAKHIR'],[CS[2],'<b>GRAVITASI</b> MERAMBAT SECEPAT CAHAYA'],[TARR,'<b>LEPAS ORBIT</b>'],[CS[4],'BUMI <b>DIIRIS</b> › LAUT MEMBEKU'],[CS[5],'<b>PANAS DALAM BUMI</b>'],[TREP,'<b>JANGKAR</b> TATA SURYA']];
/* ---------- SCENE ---------- */
const SKR=[[.4,'hum',.2],[T(0,.04),'tik',.25],[TV,'zap',.3],[T(0,.62),'tik',.22],[CS[1]+.3,'tik',.25],[CS[2]+.2,'zing',.25],[TARR,'whoosh',.3],[T(3,.38),'tik',.22],[CS[4]+.2,'whoosh',.3],[T(4,.3),'tik',.25],[T(4,.6),'hiss',.22],[CS[5]+.1,'tik',.25],[T(5,.58),'zing',.25],[CS[6]+.2,'whoosh',.3],[CS[6]+.3,'tik',.25]];
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"800 66px 'Outfit'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['matahari','lenyap','delapan','menit','cahaya','gravitasi','orbit','orbitnya','gelap','lurus','fotosintesis','membeku','es','panas','jangkar','ventilasi','laut','Bumi']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    const E=posBumi(t);EPOS.copy(E);EG.position.copy(E);bumiMesh.rotation.y=t*.25;esMesh.rotation.y=t*.25;
    const rep=t>=TREP,rt=sstep(TREP-.35,TREP+.3,t);
    // matahari: lenyap pada TV, kembali pada pemutaran ulang
    const sv=(t<TV?1:1-E_in(seg(t,TV,TV+.3)))*(1-0)+(rep?E_out(seg(t,TREP,TREP+.8)):0);const sunVis=t<TV?1:(rep?E_out(seg(t,TREP,TREP+.8)):Math.max(0,1-E_in(seg(t,TV,TV+.3))));
    sunMesh.scale.setScalar(Math.max(.001,sunVis));sunMesh.visible=sunVis>.01;sunMesh.rotation.y=t*.1;
    spr(glowA,[0,0,0],40*sunVis,.85*sunVis);spr(glowB,[0,0,0],70*sunVis,.35*sunVis);
    const fl=Math.exp(-Math.max(0,t-TV)*3.2)*(t>=TV?1:0);spr(flash,[0,0,0],90*fl+10,fl*1.2);
    // cahaya: arah dari matahari ke Bumi; mati saat strip terakhir sampai
    const lit=(t<TARR||rep)?1:1-E_io(seg(t,TARR,TARR+.9));
    SUNL.intensity=3.2*lit;HEM.intensity=.07+.5*lit;
    const dir=E.clone().normalize();SUNL.position.copy(E).sub(dir.clone().multiplyScalar(60));SUNL.target.position.copy(E);SUNL.target.updateMatrixWorld();
    // strip: cahaya & gravitasi dari matahari ke Bumi
    const A=dir.clone().multiplyScalar(SUNR),B=E.clone().sub(dir.clone().multiplyScalar(ER+.3)),off=new THREE.Vector3(0,1.1,0);
    const tail=t<TV?0:clamp((t-TV)/(TARR-TV)),sunOn=(t<TARR&&!rep)?1:0;
    const full=t<TV?clamp(seg(t,T(0,.12),T(0,.3))):1;
    LINK_CAH.atur(A,B,tail*(1-0),Math.min(1,full),t*3,sunOn*Math.min(1,full*1.2));
    LINK_GRAV.atur(A.clone().add(off),B.clone().add(off),tail,Math.min(1,seg(t,T(0,.2),T(0,.36))),t*2.2,(sunOn&&t>=T(0,.2))?.9:0,1.1);
    // pemutaran ulang: tarikan menahan Bumi (jangkar)
    if(rep){const k=rt;LINK_GRAV.atur(A.clone().add(off),B.clone().add(off),0,1,t*2.2,.95*k,1.1);LINK_CAH.atur(A,B,0,1,t*3,.8*k);}
    const kn=t>=TARR&&t<TARR+.9?Math.sin(Math.PI*seg(t,TARR,TARR+.9)):0;spr(flash,[E.x,E.y+1,E.z],40*kn+.01,kn*1.2);
    // bidang potong Bumi, es, panas
    const dcut=lerp(ER+2.2,0,E_io(seg(t,TCUT,TCUT+1.6)))+(ER+2.2)*E_io(seg(t,CE[5]+.5,CE[5]+1.5)),keBumi=(t<TCUT-.1||t>CE[5]+1.6)?0:1;
    POTF.constant=E.z+dcut;
    DISK.forEach(d=>{const r=d.userData.r,rr=d.userData.n==='es'?r+.45*E_io(seg(t,CS[4]+.6,CE[4]+.2))*1:r;const rad=rr>Math.abs(dcut)?Math.sqrt(rr*rr-dcut*dcut):0;d.visible=keBumi&&rad>.02;d.scale.setScalar(Math.max(.001,rad));d.position.z=dcut;if(d.userData.n==='es')d.visible=d.visible&&seg(t,CS[4]+.6,CE[4]+.2)>.01;});
    esMesh.material.opacity=.92*E_io(seg(t,CS[4]+.6,CE[4]))*(1-E_io(seg(t,CE[5]+.5,CE[5]+1.5)));
    const heat=E_io(seg(t,CS[5]-.3,CS[5]+1.3))*(1-E_io(seg(t,CE[5]+1,CE[5]+1.8)));
    HEAT.forEach((h,i)=>{h.visible=heat>.02&&keBumi;h.material.opacity=heat;h.material.map.offset.x=-t*1.6-i*.3;});
    VENT.forEach((v,i)=>{const k=heat;spr(v.userData.gl,[E.x+(ER-.1)*Math.cos(v.userData.a*DEG),E.y+(ER-.1)*Math.sin(v.userData.a*DEG),E.z+.2],1.6*k+.01,.9*k*(.8+.2*Math.sin(t*5+i)));});
    GEL.forEach((g,i)=>{const v=VENT[i%3],ph=(t*.7+i*.37)%1,r=ER-.3+ph*.5,a=v.userData.a*DEG;g.position.set(r*Math.cos(a)+Math.sin(i*3+t)*.05,r*Math.sin(a),.05);g.material.opacity=heat*(1-ph)*.9;g.visible=heat>.02&&keBumi;});
    bumiMesh.visible=!(dcut<=.0&&false);
    orbit.material.opacity=.55*(1-.85*E_io(seg(t,CS[4]-.3,CS[4]+1.2))*(1-E_io(seg(t,CE[5]+.6,CE[5]+1.6))));
    kameraDunia(t);RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j;
    // hitung mundur cahaya terakhir (08:20 -> 00:00)
    const pr=t<TV?0:t>=TARR?1:(t-TV)/(TARR-TV),sec=Math.round(500*(1-pr)),h=$('#rpm');if(h){h.style.opacity=(t>=TV&&t<TARR+.6)?1:0;h.innerHTML=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')+'<small>CAHAYA TERAKHIR TIBA</small>';}
  }};
