
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const V=V3;
const TCUTR=CS[1]+.5,TL0=tw(1,'sembilan')+.2,TQ=tw(1,'berbalik')-.1,TL1=tw(2,'mendarat')+.2,TH0=tw(2,'mendarat')-.5;
const SPL0=CE[2]-.3,SPL1=CE[3]+.4,TB0=CS[5]-.1,TB1=CS[6]-.1;
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
function kfAt(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};}
const WIDE=V(8,62,-26);
const KFA=[[0,V(4,2,2),66],[3.0,V(4,2,2),60],[6.6,V(-1,5.2,3.6),27],[CE[0]+.2,V(-1,5.2,3.6),27],
 [CS[1]+1.5,V(0,9.5,0),21],[TL0-.2,V(0,9.5,0),21],[TL0+1.8,WIDE,190],[tw(2,'tapi')-1.2,WIDE,190],
 [tw(2,'tapi')+.7,V(13,2.8,-6),20],[CE[2]+.2,V(13,2.8,-6),20],
 [CS[3]+.5,V(-2.2,5.0,5.6),15],[CE[3]+.2,V(-2.2,5.0,5.6),15],
 [CS[4]+.6,WIDE,190],[CE[4]+.3,WIDE,190],
 [CS[5]-.05,WIDE,190],
 [CS[6]-.1,V(0,9,9),29],[DURASI,V(0,8.8,9),22]];
const KFB=[[TB0,V(BASE.x,BASE.y+30,BASE.z),88],[tw(5,'tapi'),V(BASE.x,BASE.y+30,BASE.z),88],[CE[5]+.3,V(BASE.x,BASE.y+26,BASE.z),80]];
let CAMH=26,CUR_T=0;
function camAt(t,phase){const{tg,h}=phase?kfAt(KFB,t):kfAt(KFA,Math.min(t,DURASI));CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(260,3*h));}
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
const oS=(u)=>{const p=OUT.pos(u);return[p.x,p.y,p.z];},rS=(u)=>{const p=RET.pos(u);return[p.x,p.y,p.z];};
const uOut=t=>t<TL0?0:t>TQ?1:E_io(seg(t,TL0,TQ)),uRet=t=>t<TQ?0:t>TL1?1:E_io(seg(t,TQ,TL1));
const headPos=t=>t<TQ?oS(uOut(t)):rS(uRet(t));
const BP=(x,y,z)=>[BASE.x+x,BASE.y+y,BASE.z+z];
/* K1 */
tanda({t:'Dua saudara kembar',s:'satu astronaut, satu berpakaian biasa',p:[-2.2,5.2,5.6],o:[110,-200],a:tw(0,'dua')-.1,b:tw(0,'satu')-.1,am:1,big:1});
tanda({t:'Kembar astronaut',s:'akan pergi ke luar angkasa',p:[-3.6,4.9,5.6],o:[-110,-200],a:tw(0,'pergi')-.3,b:tw(0,'sementara')-.1,am:1});
tanda({t:'Roket',s:'menunggu di landasan',p:[0,15,0],o:[110,-190],a:tw(0,'luar')-.2,b:tw(0,'sementara')-.1});
tanda({t:'Kembar di Bumi',s:'tetap tinggal di rumah',p:[-.8,4.9,5.6],o:[110,-210],a:tw(0,'tetap')-.2,b:CE[0]+.6,am:1});
/* K2 */
tanda({t:'Kabin roket',s:'diiris, astronaut terlihat',p:[0,10,0],o:[110,-190],a:CS[1]+1.9,b:tw(1,'sembilan')-.1,am:1});
tanda({t:'99% kecepatan cahaya',s:'lintasan roket menjauh',p:()=>oS(.55),o:[-110,-200],a:tw(1,'sembilan')-.1,b:tw(1,'lalu')+.1,am:1,big:1});
tanda({t:'Berbalik',s:'titik terjauh perjalanan',p:[18,132,-62],o:[-110,200],a:tw(1,'berbalik')-.1,b:tw(1,'pulang')+.5,am:1});
tanda({t:'Pulang',s:'kembali ke landasan',p:()=>rS(.5),o:[110,-190],a:tw(1,'pulang')-.1,b:CE[1]+1.0});
/* K3 */
tanda({t:'10 tahun',s:'waktu yang dirasakan astronaut',p:()=>rS(.3),o:[-110,-200],a:tw(2,'sepuluh')-.2,b:tw(2,'tapi')-.1,am:1,big:1});
tanda({t:'Rumah diiris',s:'kembar di Bumi menjalani hari',p:[13,3.4,-6],o:[110,-200],a:tw(2,'mendarat')+.5,b:tw(2,'tujuh')-.3});
tanda({t:'70 tahun',s:'sudah berlalu di Bumi',p:[14.4,3.4,-9.5],o:[-110,-200],a:tw(2,'tujuh')-.3,b:CE[2]-.35,am:1,big:1});
/* K4 */
tanda({t:'Paruh baya',s:'astronaut baru berusia 35',p:[-3.6,4.9,5.6],o:[-110,-200],a:tw(3,'paruh')-.1,b:tw(3,'sementara')-.1,am:1});
tanda({t:'Sangat tua',s:'kembarnya sudah sekitar 95',p:[-.8,4.9,5.6],o:[110,-210],a:tw(3,'sangat')-.2,b:CE[3]+.6,am:1,big:1});
/* K5 */
tanda({t:'Bumi yang bergerak?',s:'dari sudut pandang roket',p:[0,2,3],o:[110,-190],a:tw(4,'sudut')-.1,b:tw(4,'jawabannya')-.3});
tanda({t:'Mempercepat',s:'hanya astronaut yang mengalami',p:[0,17,0],o:[110,-190],a:tw(4,'mempercepat')-.1,b:tw(4,'berbalik')-.15,am:1});
tanda({t:'Berbalik',s:'perubahan arah',p:[18,132,-62],o:[-110,190],a:tw(4,'berbalik')-.1,b:tw(4,'melambat')-.15,am:1});
tanda({t:'Melambat',s:'saat mendarat',p:[.5,17,-.5],o:[110,-190],a:tw(4,'melambat')-.1,b:tw(4,'jadi')+.1,am:1});
tanda({t:'Tidak setara',s:'dua perjalanan yang berbeda',p:WIDE.toArray(),o:[-110,-210],a:tw(4,'jadi')-.1,b:CE[4]+.6,am:1,big:1});
/* K6 */
tanda({t:'Muon',s:'partikel kecil dari atmosfer',p:BP(6,58,3),o:[110,-190],a:tw(5,'partikel')-.1,b:tw(5,'seharusnya')-.2,am:1,big:1});
tanda({t:'Tanpa perlambatan waktu',s:'meluruh di tengah jalan',p:BP(-6,30,3),o:[-110,-190],a:tw(5,'meluruh')-.2,b:tw(5,'tapi')-.1});
tanda({t:'Waktunya melambat',s:'karena melaju sangat cepat',p:BP(6,40,3),o:[110,-190],a:tw(5,'waktunya')-.2,b:tw(5,'banyak')-.1,am:1});
tanda({t:'Banyak yang sampai',s:'ke permukaan tanah',p:BP(6,8,3),o:[110,-200],a:tw(5,'banyak')-.1,b:CE[5]+.6,am:1,big:1});
/* K7 */
tanda({t:'Bukan cuma kecepatan',s:'masih ada faktor lain',p:[0,10,9],o:[-110,-210],a:tw(6,'bukan')-.1,b:DURASI,am:1,big:1});
const JEJAK=[[0,'LANDASAN › <b>DUA KEMBAR</b>'],[CS[1],'ROKET › <b>99% KECEPATAN CAHAYA</b>'],[CS[2],'<b>10</b> TAHUN › <b>70</b> TAHUN'],[CS[3],'DUA KALENDER › <b>USIA BERBEDA</b>'],[CS[4],'<b>PARADOKS</b> KEMBAR'],[CS[5],'BUKTI ALAM › <b>MUON</b>'],[CS[6],'<b>PERJALANAN WAKTU</b> › EP 5?']];
/* ---------- SFX ---------- */
const SKR=[[.4,'hum',.2],[TCUTR,'whoosh',.3],[TL0,'whoosh',.3],[TQ,'zap',.28],[TH0,'whoosh',.28],[SPL0,'zing',.26],[tw(4,'mempercepat'),'zap',.26],[TB0,'zap',.28],[tw(5,'tapi'),'zing',.26],[CS[6]+.3,'hum',.22]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
/* ---------- wajah kembar (DOM canvas) ---------- */
const hx=h=>new THREE.Color(h),mixC=(a,b,k)=>'#'+hx(a).lerp(hx(b),k).getHexString();
function drawFace(cv,age,shirt){const x=cv.getContext('2d'),w=cv.width;x.clearRect(0,0,w,w);const k=clamp((age-30)/60),hair=mixC('#5a3a24','#f2f2f2',clamp((age-32)/48));
  x.fillStyle=shirt;x.beginPath();x.ellipse(w/2,w+10,w*.46,w*.3,0,0,7);x.fill();
  x.fillStyle='#e3b48c';x.beginPath();x.arc(w/2,w*.5,w*.28,0,7);x.fill();
  x.fillStyle=hair;x.beginPath();x.arc(w/2,w*.43,w*.31,Math.PI*1.04,Math.PI*1.96);x.quadraticCurveTo(w*.74,w*.34,w*.7,w*.42);x.quadraticCurveTo(w*.5,w*.3,w*.3,w*.42);x.closePath();x.fill();
  x.fillStyle='#2a1c24';[[.42],[.58]].forEach(([a])=>{x.beginPath();x.arc(w*a,w*.52,w*.018,0,7);x.fill();});
  x.strokeStyle=hair;x.lineWidth=3+k*4;[[.36,.46],[.55,.46]].forEach(([a,b])=>{x.beginPath();x.moveTo(w*a,w*b);x.lineTo(w*(a+.09),w*(b-.01));x.stroke();});
  x.strokeStyle='#8a4a3a';x.lineWidth=3.5;x.beginPath();x.arc(w/2,w*.56,w*.09,.15*Math.PI,.85*Math.PI);x.stroke();
  x.strokeStyle='rgba(120,70,50,'+(.55*k)+')';x.lineWidth=2;for(let i=0;i<3;i++){x.beginPath();x.moveTo(w*.38,w*(.4+i*.02));x.lineTo(w*.62,w*(.4+i*.02));x.stroke();}
  [[.34],[.66]].forEach(([a])=>{for(let i=0;i<2;i++){x.beginPath();x.moveTo(w*a,w*(.52+i*.03));x.lineTo(w*(a+(a<.5?-.04:.04)),w*(.5+i*.04));x.stroke();}});
  if(age>70){x.strokeStyle='#5a4a60';x.lineWidth=3;[[.42],[.58]].forEach(([a])=>{x.beginPath();x.arc(w*a,w*.52,w*.05,0,7);x.stroke();});x.beginPath();x.moveTo(w*.47,w*.52);x.lineTo(w*.53,w*.52);x.stroke();}}
const pad=(n,l)=>String(n).padStart(l,'0');
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['kembar','Bayangkan','astronaut','roket','cahaya','cahaya,','berbalik','pulang','sepuluh','tahun','tujuh','mendarat','paruh','baya','tua','tua.','paradoks','paradoks?','Bumi-lah','bergerak','mempercepat','melambat','setara','setara.','muon','meluruh','atmosfer','sampai','sampai.','waktunya','kecepatan','memperlambat','waktu.','Ternyata,','angkasa','Bumi']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    const phase=(t>=TB0&&t<TB1)?1:0;WA.visible=!phase;WB.visible=!!phase;
    /* cahaya siang (tetap) */
    const tgt=phase?BASE:V(0,2,0);SUNL.target.position.copy(tgt);SUNL.color.copy(C('#fff4e4'));SUNL.intensity=2.6;SUNL.position.set(tgt.x+.5*90,tgt.y+.7*90,tgt.z+.55*90);SUNL.shadow.bias=-.001;SUNL.shadow.normalBias=.06;
    Object.assign(SUNL.shadow.camera,{left:-34,right:34,top:34,bottom:-34});SUNL.shadow.camera.updateProjectionMatrix();
    HEM.color.copy(C('#9db4ff'));HEM.groundColor.copy(C('#3a3a30'));HEM.intensity=.55;ROOML.intensity=0;ROOML2.intensity=0;STARS.material.opacity=.9;
    /* bidang potong */
    PR.constant=t<TCUTR-.05?400:lerp(5.5,.2,E_io(seg(t,TCUTR,TCUTR+1.4)));
    PHY.constant=t<TH0-.05?400:lerp(12,4.9,E_io(seg(t,TH0,TH0+1.6)));PHZ.constant=t<TH0+.5?400:lerp(0,-3.0,E_io(seg(t,TH0+.6,TH0+2.2)));PHX.constant=t<TH0+1.0?400:lerp(22,15,E_io(seg(t,TH0+1.0,TH0+2.6)));
    /* orang & usia */
    const pT=t<CS[1]+.1?1:t<CS[3]-.3?1-E_io(seg(t,CS[1]+.1,CS[1]+.7)):E_io(seg(t,CS[3]-.3,CS[3]+.2));
    T1.g.visible=T2.g.visible=W1.g.visible=W2.g.visible=pT>.01;T1.g.scale.setScalar(Math.max(.001,pT));T2.g.scale.setScalar(Math.max(.001,pT));W1.g.scale.setScalar(Math.max(.001,.55*pT));W2.g.scale.setScalar(Math.max(.001,.55*pT));
    const inRk=E_io(seg(t,CS[1]+.5,CS[1]+1.0))*(1-E_io(seg(t,TL1,TL1+.4)));ASEAT.g.visible=inRk>.01;ASEAT.g.scale.setScalar(Math.max(.001,.82*inRk));
    const age2=t<tw(2,'berlalu')-.6?25:25+70*E_io(seg(t,tw(2,'berlalu')-.6,tw(2,'tahun',1)+.2)),hairG=mixC('#5a3a24','#f2f2f2',clamp((age2-32)/48)),padOld=t>=CS[3]-.3;
    HTWIN.hairM.color.copy(C(hairG));HTWIN.g.visible=(t>=CS[1]+.6&&t<CS[3]-.3);HTWIN.g.scale.setScalar(.7*E_io(seg(t,CS[1]+.6,CS[1]+1.1))+.001);
    HTWIN.torso.rotation.z=(age2>70?.12:0);HTWIN.g.position.y=.4+.03*Math.sin(t*1.2);HTWIN.armR.rotation.x=-1.1+.15*Math.sin(t*1.6);HTWIN.armL.rotation.x=-1.0+.15*Math.cos(t*1.6);
    const caneHouse=HTWIN.g.visible&&age2>60;CANE.visible=padOld&&pT>.01||caneHouse;if(padOld){CANE.position.set(-.08,1.65,5.9);CANE.rotation.set(0,0,-.05);}else{CANE.position.set(13.4,1.5,-5.7);CANE.rotation.set(0,0,0);}
    T2.hairM.color.copy(C(padOld?'#f2f2f2':'#5a3a24'));T1.hairM.color.copy(C(padOld?'#7a6252':'#5a3a24'));T2.torso.rotation.z=padOld?.1:0;
    T1.g.position.y=.5+.02*Math.sin(t*1.4);T2.g.position.y=.5+.02*Math.sin(t*1.3+1);
    /* kalender roket & rumah */
    const pr=E_io(seg(t,TL0,TL1)),yR=2050+10*pr,pH=E_io(seg(t,tw(2,'berlalu')-.6,tw(2,'tahun',1)+.2)),yH=2050+70*pH;
    drawCal(CALR,'DI ROKET',Math.floor(yR),'kalender kabin');drawCal(CALH,'DI BUMI',Math.floor(yH),'kalender dinding');
    /* strip lintasan & kepala */
    const uo=uOut(t),ur=uRet(t),fadeAll=(t<TB0?1:0);
    OUT.atur(0,uo,t*18*.1,t<TL0?0:.9*fadeAll,.08);RET.atur(0,ur,t*22*.1,t<TQ?0:.85*fadeAll,.08);
    const hp=headPos(t),moving=t>=TL0&&t<=TL1;spr(HEADS,hp,moving&&!phase?10:.01,moving&&!phase?.9:0);
    const evs=[TL0,TQ,TL1];RINGE.forEach((r,i)=>{const k=Math.exp(-Math.pow((t-evs[i])/.55,2));r.material.opacity=.85*k*(t<TB0?1:0);r.visible=k>.02;r.scale.setScalar(1+.8*(1-k));});
    const k5=sstep(tw(4,'mempercepat')-.1,tw(4,'mempercepat')+.5,t)*(1-sstep(CE[4]+.2,CE[4]+.8,t));[tw(4,'mempercepat'),tw(4,'berbalik'),tw(4,'melambat')].forEach((te,i)=>{const kk=Math.exp(-Math.pow((t-te-.2)/.7,2));RINGE[i].material.opacity=Math.max(RINGE[i].material.opacity,.9*kk*(t<TB0?1:0));RINGE[i].visible=RINGE[i].material.opacity>.02;});
    /* jam saku besar + '?' (K7) */
    const k7=sstep(CS[6]-.1,CS[6]+.8,t)*(phase?0:1);WATK.g.visible=k7>.01;WATK.g.scale.setScalar(6*k7+.001);WATK.g.quaternion.setFromUnitVectors(V(0,1,0),ARAH);
    const wang=-1.2*(t-.85*integ(tt=>E_io(seg(tt,tw(6,'kecepatan'),DURASI-.4)),t));WATK.h1.rotation.y=wang;WATK.h2.rotation.y=wang/12;
    spr(TANYA,[7,16,6],6.5+.3*Math.sin(t*3),sstep(tw(6,'memperlambat')-.2,tw(6,'memperlambat')+.6,t)*(phase?0:.95));
    W1.h1.rotation.y=-t*1.2;W1.h2.rotation.y=-t*.1;W2.h1.rotation.y=-t*1.2;W2.h2.rotation.y=-t*.1;
    /* dunia B: partikel muon */
    for(let L=0;L<2;L++)for(let i=0;i<NM;i++){const idx=(L*NM+i)*3,u=(t*.28+i/NM)%1,y=62*(1-u),x=(L?6:-6)+Math.sin(i*12.9+L)*2.6,z=Math.sin(i*7.1)*1.8,b=L?1-.12*u:Math.exp(-u*6);muPos[idx]=x;muPos[idx+1]=y+.3;muPos[idx+2]=z;const c=L?[1,.7,1]:[.85,.9,1];muCol[idx]=c[0]*b;muCol[idx+1]=c[1]*b;muCol[idx+2]=c[2]*b;}
    muG.attributes.position.needsUpdate=true;muG.attributes.color.needsUpdate=true;
    let hit=0;for(let i=0;i<NM;i++){const u=(t*.28+i/NM)%1;hit+=Math.exp(-Math.pow((u-.99)/.03,2));}spr(hitG,[BASE.x+6,BASE.y+.6,BASE.z],8+4*hit,phase?Math.min(.9,.25+.5*hit):0);
    /* kamera, render */
    camAt(t,phase);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([x,y])=>{if(t>=x)j=y;});$('#jejak').innerHTML=j;
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
    const bump=c=>Math.exp(-Math.pow((t-c)/.14,2));$('#kilat').style.opacity=Math.max(bump(TB0),bump(TB1));
    /* overlay: dua kalender + wajah */
    const sp=sstep(SPL0,SPL0+.5,t)*(1-sstep(SPL1-.4,SPL1,t)),pS=E_io(seg(t,SPL0+.5,CE[3]-.3)),yA=2050+10*pS,yB=2050+70*pS,ageA=25+10*pS,ageB=25+70*pS;
    $('#split').style.opacity=sp;$('#yA').textContent=Math.floor(yA);$('#yB').textContent=Math.floor(yB);
    const fl=f=>Math.abs(Math.cos(Math.PI*Math.min(1,(f%1)*6)));$('#yA').style.transform='scaleY('+(.15+.85*fl(yA))+')';$('#yB').style.transform='scaleY('+(.15+.85*fl(yB))+')';
    drawFace($('#fA'),ageA,'#c9ccd8');drawFace($('#fB'),ageB,'#4d6fa8');
    $('#ageA').textContent=Math.round(ageA)+' tahun';$('#ageB').textContent=Math.round(ageB)+' tahun';
    $('#dim').style.opacity=.62*sp;
  }};
function integ(f,t,n=100){let a=0,h=t/n;for(let i=0;i<n;i++)a+=f((i+.5)*h)*h;return a;}
