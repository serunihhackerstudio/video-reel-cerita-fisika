
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const V=V3;
const TCUT=tw(0,'sebenarnya')-.4,TB1=CS[1]-.1,TA3=tw(2,'jam')-.25,TB2=CS[5]-.1,TA7=CS[6]-.1;
const integ=(f,a,b,n=90)=>{let s=0,h=(b-a)/n;for(let i=0;i<n;i++)s+=f(a+(i+.5)*h)*h;return s;};
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
function kfAt(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};}
const BG=(x,y,z)=>V(BASE.x+x*SB,BASE.y+y*SB,BASE.z+z*SB);
const KFA=[[0,V(2,2,4),140],[CS[0]+3.2,V(2,2,4),128],[CE[0]+.2,V(2,14,-2),84],[TA3,V(7,24,-3),72],[CS[3]+.5,V(7,24,-3),70],[CS[3]+1.4,V(13.2,3.2,-2),15],[CE[3]+.2,V(13.2,3.2,-2),15],[CS[4]+1.0,V(0,-8,0),110],[CE[4]+.4,V(0,-8,0),110],[TA7,V(-4,10,8),32],[DURASI,V(-4,9.8,8),26]];
const KFB1=[[TB1,BG(0,-2,0),74],[TA3,BG(0,-3,0),68]];
const KFB2=[[TB2,BG(0,-3,0),62],[tw(5,'orang')-.4,BG(0,-3,0),62],[CE[5]+.2,BG(0,-4,0),50]];
let CAMH=26,CUR_T=0;
function camAt(t,ph){const K=ph===1?KFB1:ph===2?KFB2:KFA,{tg,h}=kfAt(K,ph?t:Math.min(t,DURASI));CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(260,3*h));}
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
const wp=g=>()=>{const w=new THREE.Vector3();g.getWorldPosition(w);return[w.x,w.y,w.z];};
const FALLP=(t)=>{const r=fallR(t),a=.2;return[BASE.x+SB*r*Math.cos(a),BASE.y+SB*(YF(r)+1.5),BASE.z+SB*r*Math.sin(a)];};
const fallR=t=>{const s=seg(t,tw(5,'orang')-.3,CE[5]+.2);return 4.25+19.75*Math.exp(-3.4*s);};
/* K1 */
tanda({t:'Gedung pencakar langit',s:'di tengah kota',p:[0,46,0],o:[110,-200],a:.6,b:tw(0,'kepalamu')-.3});
tanda({t:'Jam di puncak',s:'dekat kepala',p:[6.15,42.5,-3],o:[110,-190],a:tw(0,'kepalamu')-.2,b:tw(0,'kakimu')-.4,am:1});
tanda({t:'Jam di lantai dasar',s:'dekat kaki',p:[6.15,3.2,-3],o:[110,-190],a:tw(0,'kakimu')-.3,b:tw(0,'kenapa')-.2,am:1});
tanda({t:'Gedung dan tanah diiris',s:'sampai lapisan dalam Bumi',p:[0,-12,0],o:[110,200],a:tw(0,'kenapa')-.1,b:CE[0]+.6,am:1,big:1});
/* K2 (dunia B) */
tanda({t:'Ruang-waktu',s:'lembaran kisi yang melengkung',p:BG(13,YF(13),3).toArray(),o:[110,-200],a:tw(1,'relativitas')-.2,b:tw(1,'gravitasi')-.1,am:1});
tanda({t:'Bumi',s:'massa besar melengkungkan kisi',p:BG(0,YF(.15)+9,0).toArray(),o:[-110,-200],a:tw(1,'gravitasi')-.1,b:tw(1,'tapi')-.1});
tanda({t:'Melengkungkan waktu juga',s:'bukan hanya ruang',p:BG(7,YF(7),-1).toArray(),o:[-110,200],a:tw(1,'melengkungkan')-.2,b:CE[1]+.4,am:1,big:1});
/* K3 */
tanda({t:'Jam di tepi corong',s:'gravitasi lemah, detak normal',p:()=>wp(FCK[0].w.g)(),o:[110,-190],a:tw(2,'makin')-.1,b:tw(2,'lambat')-.2});
tanda({t:'Jam di dasar corong',s:'gravitasi kuat, paling lambat',p:()=>wp(FCK[3].w.g)(),o:[-110,-200],a:tw(2,'lambat')-.15,b:TA3-.05,am:1,big:1});
tanda({t:'Jam lantai dasar',s:'berdetak lebih lambat',p:[6.15,3.2,-3],o:[110,-190],a:tw(2,'lantai')-.1,b:tw(2,'daripada')-.1,am:1,big:1});
tanda({t:'Jam puncak',s:'berdetak lebih cepat',p:[6.15,42.5,-3],o:[110,-200],a:tw(2,'puncaknya')-.4,b:CE[2]+.6,am:1});
/* K4 */
tanda({t:'Dua jam atom',s:'beda tinggi sedikit',p:[10.9,3.6,-2],o:[-110,-190],a:tw(3,'jam')-.1,b:tw(3,'bahkan')-.1,am:1});
tanda({t:'±30 cm',s:'beda ketinggian',p:[12.4,1.9,-.5],o:[110,-190],a:tw(3,'bahkan')-.1,b:CE[3]+.5,am:1,big:1});
/* K5 */
tanda({t:'Lapisan Bumi',s:'aspal, tanah, batuan, mantel, inti',p:[17,-14,0],o:[-110,-200],a:tw(4,'ilmuwan')-.1,b:tw(4,'tempat')-.2});
tanda({t:'Tarikan gravitasi',s:'menuju pusat Bumi',p:[7.5,-10,2],o:[-110,200],a:tw(4,'tempat')-.1,b:tw(4,'lebih')-.2,am:1,big:1});
tanda({t:'Inti Bumi',s:'umur ±27,5 tahun',p:[0,-41,2],o:[110,-200],a:tw(4,'lebih')-.1,b:CE[4]+.5,am:1,big:1});
tanda({t:'Permukaan',s:'umur 30 tahun',p:[9,1.5,2],o:[-110,-190],a:tw(4,'dibanding')-.2,b:CE[4]+.5});
/* K6 (dunia B) */
tanda({t:'Black hole',s:'ruang-waktu melengkung ekstrem',p:BG(0,YF(.15)+2.2,0).toArray(),o:[110,-200],a:tw(5,'black')-.1,b:tw(5,'seperti')-.1,am:1,big:1});
tanda({t:'Orang yang jatuh',s:'mendekati horizon peristiwa',p:FALLP,o:[110,-200],a:tw(5,'orang')-.2,b:tw(5,'tampak')-.1,am:1});
tanda({t:'Tampak membeku',s:'bagi pengamat di luar',p:FALLP,o:[-110,200],a:tw(5,'tampak')-.1,b:tw(5,'pengamat')-.1,am:1,big:1});
tanda({t:'Pengamat di luar',s:'jamnya berdetak normal',p:()=>wp(OBSC.g)(),o:[-110,-200],a:tw(5,'pengamat')-.1,b:CE[5]+.5});
/* K7 */
tanda({t:'Efek ini bekerja',s:'termasuk di saku kamu',p:[-8,10,10],o:[110,-210],a:tw(6,'saku')-.5,b:DURASI,am:1,big:1});
const JEJAK=[[0,'KOTA › <b>GEDUNG & JAM</b>'],[CS[1],'<b>RELATIVITAS UMUM</b> › KISI'],[CS[2],'<b>GRAVITASI</b> KUAT › WAKTU LAMBAT'],[CS[3],'<b>JAM ATOM</b> › 30 CM'],[CS[4],'IRISAN BUMI › <b>INTI</b>'],[CS[5],'<b>BLACK HOLE</b> › HORIZON'],[CS[6],'<b>DI SAKU KAMU</b>']];
/* ---------- SFX ---------- */
const SKR=[[.4,'hum',.2],[TCUT,'whoosh',.3],[TB1,'zap',.28],[tw(1,'melengkungkan'),'zing',.26],[TA3,'zap',.28],[tw(3,'jam'),'zing',.24],[CS[4]+.2,'whoosh',.28],[tw(4,'lebih'),'zing',.26],[TB2,'zap',.28],[tw(5,'tampak'),'zing',.26],[TA7,'zap',.26]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['Kalau','kepalamu','lebih','tua','kakimu','begitu?','relativitas','umum','Einstein','gravitasi','melengkungkan','ruang','waktu','waktu.','kuat','lambat','berjalan.','puncaknya.','atom','selisihnya','kecil,','sentimeter.','inti','Bumi','muda','tahun','permukaannya.','black','hole','ekstrem.','horizon','peristiwa','membeku','saku','sekarang.','lantai','dasar']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    const ph=(t>=TB1&&t<TA3)?1:(t>=TB2&&t<TA7)?2:0;WA.visible=ph===0;WB.visible=ph!==0;
    const tgt=ph?BASE:V(0,-4,0);SUNL.target.position.copy(tgt);SUNL.color.copy(C('#fff4e4'));SUNL.intensity=2.7;SUNL.position.set(tgt.x+.5*100,tgt.y+.7*100,tgt.z+.55*100);SUNL.shadow.bias=-.001;SUNL.shadow.normalBias=.08;
    const SC=ph?34:70;Object.assign(SUNL.shadow.camera,{left:-SC,right:SC,top:SC,bottom:-SC,far:260});SUNL.shadow.camera.updateProjectionMatrix();
    HEM.color.copy(C('#9db4ff'));HEM.groundColor.copy(C('#3a3a30'));HEM.intensity=.55;ROOML.intensity=0;ROOML2.intensity=0;STARS.material.opacity=ph?.9:.6;
    PR.constant=t<TCUT-.05?400:lerp(26,.2,E_io(seg(t,TCUT,TCUT+2.6)));
    /* semua jam menghadap kamera */
    const face=w=>w.g.quaternion.setFromUnitVectors(V(0,1,0),ARAH);[FALL,OBSC,ATA,ATB,CSF,CCR,WATK,...FCK.map(f=>f.w)].forEach(face);
    /* jam dinding gedung */
    const ang=(rate)=>-1.3*t*rate;CLO.h1.rotation.y=ang(.72);CLO.h2.rotation.y=ang(.72)/12;CHI.h1.rotation.y=ang(1);CHI.h2.rotation.y=ang(1)/12;
    ATA.h1.rotation.y=ang(1);ATA.h2.rotation.y=ang(1)/12;ATB.h1.rotation.y=ang(1);ATB.h2.rotation.y=ang(1)/12;
    /* strip gravitasi */
    const kG=Math.max(sstep(TA3,TA3+.8,t)*(1-sstep(CS[3]-.2,CS[3]+.3,t)),sstep(CS[4]-.1,CS[4]+.6,t)*(1-sstep(CE[4]+.1,CE[4]+.7,t)))*(ph?0:1);
    GST.forEach((g,i)=>{g.t.atur(0,1,t*2.6,.75*kG,.25);g.hd.material.opacity=.9*kG;g.hd.visible=kG>.02;});
    const kR=sstep(tw(3,'bahkan')-.2,tw(3,'bahkan')+.4,t)*(1-sstep(CE[3]+.2,CE[3]+.8,t));RULER.atur(0,1,t*1.5,.95*kR,.5);
    /* K5: jam permukaan dan inti */
    const k5=sstep(CS[4]-.1,CS[4]+.6,t)*(1-sstep(CE[4]+.1,CE[4]+.7,t));CSF.g.visible=CCR.g.visible=k5>.01;CSF.g.scale.setScalar(3*k5+.001);CCR.g.scale.setScalar(3.2*k5+.001);
    CSF.h1.rotation.y=ang(1);CSF.h2.rotation.y=ang(1)/12;CCR.h1.rotation.y=ang(.8);CCR.h2.rotation.y=ang(.8)/12;
    spr(coreGl,[0,-41,2],12*k5+.01,.8*k5);spr(surfGl,[9,1.5,2],7*k5+.01,.5*k5);spr(cenGl,[0,-44,0],10*k5+.01,.6*k5);
    /* K7: jam saku besar + ponsel */
    const k7=sstep(TA7,TA7+.8,t)*(ph?0:1);WATK.g.visible=k7>.01;WATK.g.scale.setScalar(7*k7+.001);WATK.h1.rotation.y=ang(.9);WATK.h2.rotation.y=ang(.9)/12;
    PHONE.visible=k7>.01;PHONE.scale.setScalar(k7+.001);PHONE.quaternion.setFromUnitVectors(V(0,0,1),ARAH);
    {const x=PHL.x,w=PHL.w,h=PHL.h;x.fillStyle='#07060f';x.fillRect(0,0,w,h);x.fillStyle='#f6e8ff';x.font="bold 92px 'JetBrains Mono',monospace";x.textAlign='center';x.textBaseline='middle';const mm=Math.floor(t/60),ss=Math.floor(t%60);x.fillText('12:'+String(mm).padStart(2,'0'),w/2,h*.34);x.font="bold 48px 'JetBrains Mono',monospace";x.fillStyle='#e48bff';x.fillText(String(ss).padStart(2,'0')+' dtk',w/2,h*.5);x.font="bold 24px 'JetBrains Mono',monospace";x.fillStyle='#ffffff';x.fillText('ikut melambat',w/2,h*.72);x.fillText('sangat tipis',w/2,h*.78);PHL.t.needsUpdate=true;}
    /* dunia B */
    const bb=ph===1,b2=ph===2;BALL.visible=bb;BHOLE.visible=b2;BHOLE.rotation.y=t*.4;
    const kc=sstep(tw(2,'makin')-.1,tw(2,'makin')+.6,t)*(bb?1:0);FCK.forEach((f,i)=>{f.w.g.visible=kc>.01;f.w.g.scale.setScalar(3.6*kc+.001);const rate=[1,.8,.55,.25][i];f.w.h1.rotation.y=ang(rate);f.w.h2.rotation.y=ang(rate)/12;});
    const kf=sstep(tw(5,'orang')-.8,tw(5,'orang')-.2,t)*(b2?1:0),r=fallR(t);FALL.g.visible=OBSC.g.visible=(b2&&kf>.01);FALL.g.scale.setScalar(4.4*kf+.001);OBSC.g.scale.setScalar(4.4*kf+.001);
    FALL.g.position.set(r*Math.cos(.2),YF(r)+1.5,r*Math.sin(.2));const fr=integ(tt=>(fallR(tt)-4)/20,0,t);FALL.h1.rotation.y=-1.3*fr;FALL.h2.rotation.y=-1.3*fr/12;OBSC.h1.rotation.y=ang(1);OBSC.h2.rotation.y=ang(1)/12;
    spr(fallGl,[BASE.x+SB*FALL.g.position.x,BASE.y+SB*FALL.g.position.y,BASE.z+SB*FALL.g.position.z],4,b2?.85*Math.sqrt(Math.max(0,(r-4)/20))*kf:0);
    /* kamera, render */
    camAt(t,ph);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([x,y])=>{if(t>=x)j=y;});$('#jejak').innerHTML=j;
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
    const bump=c=>Math.exp(-Math.pow((t-c)/.14,2));$('#kilat').style.opacity=Math.max(bump(TB1),bump(TA3),bump(TB2),bump(TA7));
  }};
