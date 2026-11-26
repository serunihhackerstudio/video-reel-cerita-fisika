
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const V=V3;
const TCUT0=tw(2,'stasiun')+.3,TUN0=CS[6]-.3,TB0=CS[5]-.1,TB1=CS[6]-.1,TF0=tw(5,'dibawa')-.2,TF1=tw(5,'pesawat')+.3;
const integ=(f,t,n=140)=>{let s=0,h=t/n;for(let i=0;i<n;i++)s+=f((i+.5)*h)*h;return s;};
/* mulai gerak jam B (K2) */
const WB0=tw(1,'cepat')-.3;
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
function kfAt(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};}
const KFA=[[0,V(4,0,-24),124],[3.4,V(4,0,-24),112],[7.0,V(0,1,-1),27],[CE[0],V(0,1,-1),26],
 [CS[1]+.5,V(-1.5,1.8,3),28],[CE[1]+.3,V(-1.5,1.8,3),28],
 [CS[2]+.5,V(-1.2,.4,0),19],[CE[2],V(-1.2,.4,0),18],
 [CS[3]+.4,V(0,0,-8),46],[CE[3],V(0,0,-8),52],
 [CS[4]+.4,V(-1,.3,0),15],[CE[4]+.3,V(-1,.3,0),14],
 [CS[5]-.1,V(0,0,0),30],
 [CS[6]-.1,V(4,0,-24),112],[tw(6,'mendekati'),V(6,0,-20),120],[DURASI,V(10,0,-16),134]];
const KFB=[[TB0,V(BASE.x,BASE.y+2.2,BASE.z+16),24],[tw(5,'jam')-.2,V(BASE.x,BASE.y+2.2,BASE.z+16),22],[tw(5,'dibawa'),V(BASE.x,BASE.y,BASE.z+2),62],[tw(5,'pesawat'),V(BASE.x,BASE.y,BASE.z+2),62],[tw(5,'terbukti'),V(BASE.x,BASE.y+2.4,BASE.z+15),26],[TB1,V(BASE.x,BASE.y+2.4,BASE.z+15),22]];
let CAMH=26,CUR_T=0;
function camAt(t,phase){const{tg,h}=phase?kfAt(KFB,t):kfAt(KFA,Math.min(t,DURASI));CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(200,3*h));}
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
const ringAt=a=>[EC.x+46*Math.sin(a),0,EC.z+46*Math.cos(a)];
const watBpos=t=>{const k=E_io(seg(t,WB0,CE[1]));return[lerp(3,17,k),8.2,7];};
const planePos=t=>{const a=E_io(seg(t,TF0,TF1))*Math.PI*2;return[BASE.x+19.5*Math.sin(a),BASE.y+1,BASE.z+19.5*Math.cos(a)];};
/* K1 */
tanda({t:'Satu detik per detik',s:'laju waktu yang kita alami',p:[0,5,0],o:[110,-200],a:tw(0,'satu')-.1,b:tw(0,'tapi')-.1,am:1,big:1});
tanda({t:'Stasiun luar angkasa',s:'mengorbit di atas Bumi',p:[0,5,0],o:[110,-190],a:tw(0,'bergerak')-.3,b:tw(0,'dengan')+.1});
tanda({t:'Garis orbit',s:'lintasan mengitari Bumi',p:ringAt(5.7),o:[110,-190],a:tw(0,'tapi')-.1,b:tw(0,'itu')+.3});
tanda({t:'Bumi',s:'laut dan awan',p:[EC.x,EC.y+ER-4,EC.z+10],o:[-110,200],a:tw(0,'kecepatan')-.1,b:CE[0]+.6,am:1});
/* K2 */
tanda({t:'Relativitas khusus',s:'teori Einstein',p:()=>[-8,7.8,7],o:[110,-190],a:tw(1,'relativitas')-.1,b:tw(1,'makin')+.2,am:1,big:1});
tanda({t:'Jam bergerak',s:'waktunya lebih lambat',p:t=>{const q=watBpos(t);return[q[0],q[1]+.8,q[2]];},o:[-110,-200],a:tw(1,'cepat')-.1,b:tw(1,'dibanding')+.3,am:1});
tanda({t:'Jam diam',s:'waktu berjalan normal',p:[-8,7.8,7],o:[110,-190],a:tw(1,'dibanding')-.1,b:CE[1]+.5});
/* K3 */
tanda({t:'Modul stasiun',s:'diiris, ruang dalamnya terlihat',p:[0,3.4,-1],o:[110,-200],a:CS[2]+1.4,b:tw(2,'dua')+.2});
tanda({t:'28.000 km/jam',s:'laju stasiun mengitari Bumi',p:ringAt(.1),o:[-110,-200],a:tw(2,'dua')-.1,b:tw(2,'jadi')+.1,am:1,big:1});
tanda({t:'Jam digital',s:'di dinding modul',p:[-2.7,1.2,.2],o:[110,-190],a:tw(2,'waktu')-.2,b:tw(2,'astronot')-.1});
tanda({t:'Astronot',s:'melayang di dalam',p:[.4,1.0,1.6],o:[-110,-200],a:tw(2,'astronot')-.1,b:tw(2,'lambat')-.2});
tanda({t:'Lebih lambat',s:'dibanding waktu di Bumi',p:[-2.7,1.6,.2],o:[110,-200],a:tw(2,'lambat')-.1,b:CE[2]+.4,am:1,big:1});
/* K5 */
tanda({t:'Astronot pulang',s:'dari berbulan-bulan di orbit',p:[.3,1.2,1.6],o:[110,-190],a:tw(4,'pulang')-.1,b:tw(4,'melompat')-.1});
tanda({t:'Melompat ke masa depan',s:'sedikit saja, tapi nyata',p:[.3,1.2,1.6],o:[-110,-200],a:tw(4,'melompat')-.1,b:CE[4]+.5,am:1,big:1});
/* K6 */
tanda({t:'Tahun 1971',s:'percobaan jam atom',p:[BASE.x,BASE.y+3.4,BASE.z+GR],o:[110,-200],a:tw(5,'tahun')-.1,b:tw(5,'jam')-.1,am:1,big:1});
tanda({t:'Jam atom di darat',s:'tetap di tempat',p:[BASE.x,BASE.y+3.6,BASE.z+GR],o:[110,-190],a:tw(5,'jam')-.1,b:tw(5,'dibawa')+.2});
tanda({t:'Jam atom di pesawat',s:'dibawa mengelilingi dunia',p:t=>{const q=planePos(t);return[q[0],q[1]+1,q[2]];},o:[-110,-200],a:tw(5,'dibawa')+.2,b:tw(5,'terbukti')-.1,am:1});
tanda({t:'Selisih sesuai prediksi',s:'puluhan hingga ratusan nanodetik',p:[BASE.x,BASE.y+3.6,BASE.z+GR],o:[-110,-210],a:tw(5,'selisih')-.2,b:CE[5]+.5,am:1,big:1});
/* K7 */
tanda({t:'Kecepatan pesawat',s:'cukup mengubah waktu',p:ringAt(.1),o:[110,-200],a:tw(6,'kecepatan')-.1,b:tw(6,'bagaimana')-.1});
tanda({t:'Mendekati cahaya?',s:'berapa besar selisih waktunya',p:ringAt(.4),o:[-110,-210],a:tw(6,'mendekati')-.3,b:DURASI,am:1,big:1});
const JEJAK=[[0,'ORBIT › <b>STASIUN LUAR ANGKASA</b>'],[CS[1],'<b>RELATIVITAS</b> KHUSUS'],[CS[2],'<b>28.000 KM/JAM</b> DI ORBIT'],[CS[3],'DUA JAM › <b>SELISIH KECIL</b>'],[CS[4],'ASTRONOT › <b>MASA DEPAN</b>'],[CS[5],'<b>1971</b> › JAM ATOM PESAWAT'],[CS[6],'BAGAIMANA JIKA <b>MENDEKATI CAHAYA?</b>']];
/* ---------- SFX ---------- */
const SKR=[[.4,'hum',.2],[TCUT0,'whoosh',.3],[WB0,'whoosh',.26],[tw(3,'setelah')-.2,'zing',.24],[tw(4,'melompat'),'zap',.28],[TB0,'zap',.28],[TF0,'whoosh',.3],[tw(5,'selisih'),'zing',.26],[TB1,'zap',.26],[tw(6,'mendekati'),'whoosh',.3]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
/* ---------- DOM bantu ---------- */
const pad=(n,l)=>String(n).padStart(l,'0');
function fmt(ms){const tot=Math.max(0,ms),s=Math.floor(tot/1000),m=Math.floor(tot%1000);return pad(Math.floor(s/3600)%24,2)+':'+pad(Math.floor(s/60)%60,2)+':'+pad(s%60,2)+'.'+pad(m,3);}
const SPL0=tw(3,'selisihnya')-.2,SPL1=CE[3]+.5,TLN0=CS[4]-.1,TLN1=CE[4]+.5,CMP0=tw(5,'selisih')-.2,CMP1=CE[5]+.5;
const dmsf=t=>7*E_io(seg(t,tw(3,'setelah')-.2,CE[3]-.3));
const velf=t=>14+(t>TUN0?106*E_in(seg(t,TUN0,tw(6,'mendekati')+1.2)):0);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['masa','depan','detik','relativitas','cepat','lambat','waktu','Stasiun','stasiun','astronot','kilometer','jam','Selisihnya','kecil','sepersekian','muda','melompat','tahun','atom','selisih','prediksi','cahaya','mendekati','berbeda.','Einstein','teori','pulang','pesawat','Bumi','Bumi.','relativitas.','cahaya?','diam.','depan.']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    const phase=(t>=TB0&&t<TB1)?1:0;WA.visible=!phase;WB.visible=!!phase;
    /* cahaya matahari di ruang angkasa (tetap) */
    const tgt=phase?BASE:V(0,0,0);SUNL.target.position.copy(tgt);SUNL.color.copy(C('#fff4e4'));SUNL.intensity=2.2;SUNL.position.set(tgt.x+.55*90,tgt.y+.55*90,tgt.z+.65*90);SUNL.shadow.bias=-.001;SUNL.shadow.normalBias=.06;
    Object.assign(SUNL.shadow.camera,{left:-30,right:30,top:30,bottom:-30});SUNL.shadow.camera.updateProjectionMatrix();
    HEM.color.copy(C('#8a9bff'));HEM.groundColor.copy(C('#2a2040'));HEM.intensity=.28;ROOML.intensity=0;ROOML2.intensity=0;STARS.material.opacity=.95;
    /* bumi, orbit */
    earthM.rotation.y=t*.02;cloudM.rotation.y=t*.03;cloudB.rotation.y=t*.03;globeM.rotation.y=0;
    spr(atmoS,[EC.x,EC.y,EC.z],75,phase?0:.95);
    const offv=integ(velf,t)*.12;ORB.atur(0,1,offv,phase?0:.8,.12);
    /* bidang potong modul stasiun */
    const cut=t<TCUT0?400:t<TUN0?lerp(400,.4,E_io(seg(t,TCUT0,TCUT0+2.4))):lerp(.4,400,E_io(seg(t,TUN0,TUN0+1.0)));PX.constant=cut;
    /* animasi isi modul */
    ASTRO.position.set(.3+.05*Math.sin(t*.8),-.2+.12*Math.sin(t*1.1),1.6+.05*Math.cos(t*.7));ASTRO.rotation.set(.12*Math.sin(t*.6),.35*Math.sin(t*.4),.1*Math.cos(t*.5));
    drawClock(CLK,fmt((43200+t)*1000).slice(0,8),'WAKTU DI STASIUN');
    /* dua jam pocket watch (K2) */
    const w2=sstep(CS[1]+.3,CS[1]+1.1,t)*(1-sstep(CE[1]+.3,CE[1]+1.0,t)),w7=sstep(CS[6]-.1,CS[6]+.8,t),wb=phase?0:Math.max(w2,w7);
    WAT_A.g.visible=w2>.01&&!phase;WAT_A.g.scale.setScalar(1.9*w2);
    const bpos=t<CS[6]-.2?watBpos(t):[4,8,-18];WAT_B.g.visible=wb>.01;WAT_B.g.position.set(bpos[0],bpos[1],bpos[2]);WAT_B.g.scale.setScalar((t<CS[6]-.2?1.9*w2:14*w7)+.001);
    WAT_A.g.quaternion.setFromUnitVectors(V(0,1,0),ARAH);WAT_B.g.quaternion.setFromUnitVectors(V(0,1,0),ARAH);
    const rA=-t*1.3,rate=tt=>1.3*(1-.6*E_io(seg(tt,tw(1,'cepat'),tw(1,'lambat')+.6))*(1-sstep(CE[1]+.3,CE[1]+1.0,tt)))*(tt>CS[6]-.2?1-.85*E_io(seg(tt,tw(6,'mendekati'),DURASI-.5)):1);
    WAT_A.h1.rotation.y=rA;WAT_A.h2.rotation.y=rA/12;const rB=-integ(rate,t);WAT_B.h1.rotation.y=rB;WAT_B.h2.rotation.y=rB/12;
    const bu=t<WB0?0:clamp((bpos[0]-1)/19),bop=(t<CS[6]-.2?1:0)*w2*.85;WSTRIP.atur(0,bu,t*2.4,t>=WB0?bop:0,.5);
    /* '?' */
    const tq=sstep(tw(6,'mendekati')-.1,tw(6,'mendekati')+.8,t);spr(TANYA,[6,9,2],7.5+.3*Math.sin(t*3),(phase?0:tq)*.95);
    /* dunia B: pesawat, jejak */
    const a=E_io(seg(t,TF0,TF1))*Math.PI*2;PLN.position.set(19.5*Math.sin(a),1+(t>TF1?.25*Math.sin(t*1.5):0),19.5*Math.cos(a));PLN.rotation.y=a;
    PTR.atur(0,t<TF0?0:clamp(a/(Math.PI*2)),t*2.2,phase&&t>=TF0?.85:0,.1);
    spr(PLG,[BASE.x+PLN.position.x,BASE.y+PLN.position.y-.7,BASE.z+PLN.position.z],3.2,phase?.8:0);
    /* kamera, render */
    camAt(t,phase);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([x,y])=>{if(t>=x)j=y;});$('#jejak').innerHTML=j;
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
    /* kilat peralihan */
    const bump=c=>Math.exp(-Math.pow((t-c)/.14,2));const kl=Math.max(bump(TB0),bump(TB1));$('#kilat').style.opacity=kl;
    /* overlay: dua jam (split) */
    const sp=sstep(SPL0,SPL0+.5,t)*(1-sstep(SPL1-.4,SPL1,t)),dm=dmsf(t),base=(43200+t)*1000;
    $('#split').style.opacity=sp;$('#clE').textContent=fmt(base);$('#clS').textContent=fmt(base-dm);$('#dm').textContent=dm.toFixed(3).replace('.',',')+' ms';
    /* overlay: garis waktu astronot */
    const tl=sstep(TLN0,TLN0+.5,t)*(1-sstep(TLN1-.4,TLN1,t)),fe=E_io(seg(t,TLN0+.2,TLN0+2.6)),gp=E_io(seg(t,tw(4,'sudah')-.2,tw(4,'depan')+.4));
    $('#tl').style.opacity=tl;$('#tlE').style.width=(fe*100)+'%';$('#tlA').style.width=(fe*(100-6*gp))+'%';$('#tlG').style.width=(6*gp*fe)+'%';$('#tlG').style.opacity=gp;
    /* redup di balik overlay */
    $('#dim').style.opacity=.62*Math.max(sp,tl);
  }};
