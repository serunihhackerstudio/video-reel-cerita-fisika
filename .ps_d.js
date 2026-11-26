
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
/* tonggak */
const TC0=3.0,TE0=tw(1,'cerdik')+.2,TE1=TE0+1.3;
const TS0=tw(1,'disebarkan')+.05,TS1=CE[1]+.1;
const TR0=tw(2,'memutar')-.4,TR1=CE[2]+.3;
const TN0=CS[3]+.6,TN1=CS[3]+7.2,TJ=tw(3,'jam')-.1,TQ0=tw(5,'pertanyaannya')-.3;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
function kfAt(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};}
const ROOMV=V(-.8,3.0,-1.8),ENVV=V(EX-.05,3.35,EZ_),TOPV=V(14,112,-1);
const KF1=[[0,V(0,5,0),74],[3.0,V(0,5,0),66],[7.4,ROOMV,27],[CS[1]-.2,ROOMV,26.5]];
const KF4=[[TR1+.6,V(1,3.8,-2.6),25],[tw(3,'jam')-.4,V(1,3.8,-2.6),25],[tw(3,'jam')+.8,V(-5.0,5.0,-4.0),15],[tw(3,'lilin')-.3,V(-5.0,5.0,-4.0),15],[tw(3,'lilin')+.7,V(1.2,4.0,-2.2),13],[tw(3,'pintu')-.4,V(1.2,4.0,-2.2),13],[tw(3,'pintu')+.8,V(5.0,3.6,-4.6),13],[CE[3]+.2,V(5.0,3.6,-4.6),13],
 [CS[4]+.9,V(-3.4,3.4,-2.2),20],[tw(4,'kursi')+.5,V(-1.8,3.2,-2.0),22],[CE[4]+.4,V(-2.4,3.3,-2.0),22],[tw(5,'percobaan')+.6,V(-2.4,3.3,-2.0),22],[tw(5,'perjalanan')+.8,V(0,5.5,-1),42],[tw(5,'ilmiah'),V(0,6.5,-1),44],[CE[5]+.3,V(0,7.5,-1),48],
 [CS[6]+.3,V(0,14,-2),58],[CE[6]-.8,V(1,22,-3),74],[DURASI,V(1,22,-3),76]];
let CAMH=26,HEADP=V(0,0,0);
function camAt(t){let tg,h;
  if(t<CS[1]-.2){({tg,h}=kfAt(KF1,t));}
  else if(t<TS0){const k=halus(seg(t,CS[1]-.2,CS[1]+1.0));tg=ROOMV.clone().lerp(ENVV,k);h=Math.exp(lerp(Math.log(26.5),Math.log(6.5),k));}
  else if(t<TR0){const u=t<TS1?E_io(seg(t,TS0,TS1)):1,hd=S1.pos(u),k=halus(seg(t,TS0-.2,TS0+1.0));
    tg=ENVV.clone().lerp(hd,k);const hh=clamp(6.5+hd.y*.55,6.5,72);h=lerp(6.5,hh,k);if(t>=TS1){tg=hd.clone().lerp(TOPV,halus(seg(t,TS1,TS1+.8)));h=72;}}
  else if(t<TR1+.6){const u=E_io(seg(t,TR0,TR1)),hd=S2.pos(u),k=halus(seg(t,TR0-.3,TR0+.6));tg=TOPV.clone().lerp(hd,k);h=Math.exp(lerp(Math.log(72),Math.log(25),halus(u)));
    const k2=halus(seg(t,TR1-.2,TR1+.6)),s4=KF4[0];tg.lerp(s4[1],k2);h=lerp(h,s4[2],k2);}
  else{({tg,h}=kfAt(KF4,t));}
  CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(160,3*h));}
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
const u1f=t=>t<TS0?0:t>TS1?1:E_io(seg(t,TS0,TS1)),u2f=t=>t<TR0?0:t>TR1?1:E_io(seg(t,TR0,TR1));
const hd1=()=>{const p=S1.pos(u1f(CUR_T));return[p.x,p.y,p.z];},hd2=()=>{const p=S2.pos(u2f(CUR_T));return[p.x,p.y,p.z];};let CUR_T=0;
const sWax=t=>1-.78*E_io(seg(t,tw(3,'lilin')-.3,CE[4]-.6));
/* K1 */
tanda({t:'Cambridge',s:'gedung kampus tua, gaya klasik',p:[-5,7.4,7.5],o:[110,-190],a:tw(0,'cambridge')-.1,b:tw(0,'cambridge')+2.4});
tanda({t:'28 Juni 2009',s:'hari pestanya',p:[4.4,5.0,7.3],o:[-110,170],a:tw(0,'dua')-.1,b:TC0+1.1,am:1,big:1});
tanda({t:'Ruang pesta',s:'sudah dihias lengkap',p:[0,3.6,-2.0],o:[110,-200],a:tw(0,'pesta')-.1,b:tw(0,'dengan')+.3,am:1});
tanda({t:'Spanduk',s:'Selamat datang, penjelajah waktu',p:[-1.1,5.7,-5.5],o:[-110,-190],a:tw(0,'tamu')-.2,b:CE[0]+.6,big:1});
/* K2 */
tanda({t:'Undangan',s:'amplop diiris, kertasnya terlihat',p:[EX,EY+.2,EZ_],o:[120,-230],a:tw(1,'undangan')-.1,b:tw(1,'baru')+.2,am:1,big:1});
tanda({t:'Tanggal pesta',s:'28 Juni 2009',p:[EX+.35,EY+.1,EZ_+.1],o:[-120,230],a:TE1-.3,b:tw(1,'setelah')+.2,am:1});
tanda({t:'Dikirim setelah pesta',s:'jalurnya keluar dari ruangan',p:hd1,o:[110,-200],a:tw(1,'setelah')-.1,b:tw(1,'jadi')+.1,am:1,big:1});
tanda({t:'Tanggal sudah lewat',s:'tahun terus bertambah',p:hd1,o:[-110,200],a:tw(1,'tanggal')-.1,b:CE[1]+.5,am:1});
/* K3 */
tanda({t:'Masa depan',s:'tempat undangan bisa terbaca',p:[14,118,-1],o:[110,-210],a:tw(2,'masa')-.15,b:tw(2,'undangan')+.9,am:1,big:1});
tanda({t:'Jalur kembali',s:'andai ada yang bisa',p:hd2,o:[-110,190],a:tw(2,'memutar')-.1,b:tw(2,'ke')+.1,am:1});
tanda({t:'Hari pesta',s:'pintu ruang pesta',p:[5.4,3.4,-5.3],o:[-110,-200],a:tw(2,'hari')-.1,b:CE[2]+.9,am:1,big:1});
/* K4 */
tanda({t:'Minuman dan kue',s:'sudah tersaji',p:[0,4.4,-2.0],o:[110,-200],a:tw(3,'minuman')-.1,b:tw(3,'balon')-.1});
tanda({t:'Balon',s:'menghias sudut ruangan',p:[-7.4,5.6,-4.8],o:[110,-190],a:tw(3,'balon')-.1,b:tw(3,'lalu')+.2});
tanda({t:'Jam berputar',s:'waktu terus berjalan',p:[-7.0,5.2,-5.4],o:[110,-200],a:tw(3,'jam')-.1,b:tw(3,'lilin')-.1,am:1,big:1});
tanda({t:'Lilin memendek',s:'makin lama makin habis',p:t=>[CND[1].x,TY+.04+.58+sWax(CUR_T)+.12,-2.0],o:[110,-210],a:tw(3,'lilin')-.1,b:tw(3,'tapi')+.1,am:1});
tanda({t:'Pintu tertutup',s:'tidak pernah terbuka',p:[5.4,3.4,-5.3],o:[-110,-200],a:tw(3,'pintu')-.1,b:CE[3]+.7,am:1,big:1});
/* K5 */
tanda({t:'Tuan rumah',s:'satu gelas terangkat, menunggu',p:[-5.9,5.2,-2.0],o:[110,-200],a:CS[4]+.2,b:tw(4,'tidak')+.9});
tanda({t:'Kursi kosong',s:'tidak ada satu pun tamu',p:[-.9,3.2,.05],o:[110,-210],a:tw(4,'kursi')-.1,b:CE[4]+.5,am:1,big:1});
/* K6 */
tanda({t:'Bercanda',s:'nada Hawking saat bercerita',p:[-5.9,5.2,-2.0],o:[110,-200],a:tw(5,'bercanda')-.1,b:tw(5,'sebagai')+.1});
tanda({t:'Percobaan',s:'pesta tanpa tamu',p:[0,3.8,-2.0],o:[-110,-200],a:tw(5,'percobaan')-.1,b:tw(5,'perjalanan')+.6,am:1,big:1});
tanda({t:'Bukan bukti ilmiah',s:'hanya satu kali, tanpa kontrol',p:[0,12,0],o:[110,-200],a:tw(5,'ilmiah')-.2,b:tw(5,'tapi')+.1,am:1});
tanda({t:'Pertanyaannya serius',s:'bisakah menengok masa lalu?',p:[0,17.5,0],o:[-110,200],a:tw(5,'pertanyaannya')-.1,b:CE[5]+.5,am:1,big:1});
/* K7 */
tanda({t:'Cahaya bintang',s:'berangkat bertahun-tahun lalu',p:[-4.4,24,-6],o:[110,-200],a:tw(6,'kita')-.2,b:CE[6]+.9,am:1,big:1});
tanda({t:'Masa lalu',s:'yang kita lihat setiap malam',p:[-6,38,-8],o:[-110,200],a:tw(6,'masa')-.1,b:CE[6]+.9,am:1});
const JEJAK=[[0,'CAMBRIDGE › <b>GEDUNG KAMPUS</b>'],[CS[0]+4.5,'CAMBRIDGE › <b>RUANG PESTA</b>'],[CS[1],'<b>UNDANGAN</b> › MASA DEPAN'],[CS[2],'<b>HANYA</b> DARI MASA DEPAN'],[CS[3],'<b>MENUNGGU</b> DI RUANG PESTA'],[CS[4],'<b>HASIL:</b> TIDAK ADA TAMU'],[CS[5],'<b>PERCOBAAN</b> › BERCANDA'],[CS[6],'<b>CAHAYA</b> BINTANG']];
/* ---------- helper warna ---------- */
const hx=h=>new THREE.Color(h),mixC=(a,b,k)=>'#'+hx(a).lerp(hx(b),k).getHexString();
function lighting(t){const n=sstep(TN0,TN1,t),a=n<.5?n/.5:(n-.5)/.5,c0=n<.5?'#fff0cf':'#ff8f4f',c1=n<.5?'#ff8f4f':'#8aa6ff';SUNL.color.copy(C(mixC(c0,c1,a)));
  SUNL.intensity=n<.5?lerp(3.0,2.0,a):lerp(2.0,.55,a);const ey=n<.5?lerp(.85,.32,a):lerp(.32,.9,a),dir=V(-.45,ey,.78).normalize();SUNL.position.copy(SUNL.target.position).addScaledVector(dir,90);
  HEM.color.copy(C(mixC('#b6a8ff',n<.5?'#7f6fd0':'#2a3a8f',n<.5?n*2:1)));HEM.intensity=lerp(.55,.42,n);
  ROOML.intensity=.6+2.2*n;ROOML2.intensity=.4+1.4*n;winMats.forEach(m=>m.emissiveIntensity=1.5*n);
  BULB.forEach(b=>b.material.color.copy(C('#ffd890')).multiplyScalar(.5+.9*n));STARS.material.opacity=.95*sstep(.3,1,n);
  const g=[0,1,2].map(i=>mixC(PAL.langit[i],['#171034','#0c0824','#05030f'][i],n));$('#langit').style.background='linear-gradient(180deg,'+g[0]+' 0%,'+g[1]+' 60%,'+g[2]+' 100%)';return n;}
const setCyl=(m,A,B)=>{const d=B.clone().sub(A);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.clone().normalize());m.scale.set(1,d.length(),1);};
/* ---------- SCENE ---------- */
const SKR=[[.4,'hum',.2],[TC0+.1,'whoosh',.3],[TC0+1.3,'whoosh',.25],[TE0,'zing',.26],[TS0,'whoosh',.3],[CS[2]+.2,'zing',.25],[TR0,'whoosh',.28],[TR1,'zap',.26],[CS[3]+5.2,'hum',.2],[CS[4]+.1,'hum',.18],[tw(5,'pertanyaannya')-.2,'zing',.24],[CS[6]+.4,'whoosh',.25],[CS[6]+2.2,'zing',.2]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});
SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['Cambridge,','Hawking','Stephen','pesta','pestanya','penjelajah','waktu','undangan','masa','depan','disebarkan','selesai','lewat','kembali','menunggu','Jam','berputar','lilin','pintu','terbuka','kosong','tamu','datang','bukti','percobaan','bercanda','ilmiah','serius','pertanyaannya','bintang','lalu','malam','kursi','Hasilnya:','Juni','sembilan.']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    const n=lighting(t);
    /* bidang potong */
    PY.constant=t<TC0-.05?60:lerp(30,6.9,E_io(seg(t,TC0,TC0+2.0)));PZ.constant=t<TC0+.9?14:lerp(14,1.6,E_io(seg(t,TC0+1.0,TC0+3.2)));PX.constant=t<TC0+1.7?14:lerp(14,6.4,E_io(seg(t,TC0+1.8,TC0+4.2)));
    const fy=sstep(TC0-.2,TC0+.2,t)*(1-sstep(TC0+2.0,TC0+2.7,t)),fz=sstep(TC0+.9,TC0+1.3,t)*(1-sstep(TC0+3.2,TC0+3.9,t)),fx=sstep(TC0+1.7,TC0+2.1,t)*(1-sstep(TC0+4.2,TC0+4.9,t));
    mFr.opacity=Math.max(fy,fz,fx)*.95;FRY.visible=fy>.01;FRY.position.set(0,PY.constant+.1,0);FRZ.visible=fz>.01;FRZ.position.set(0,7,PZ.constant+.12);FRX.visible=fx>.01;FRX.position.set(PX.constant+.12,7,0);
    /* amplop diiris */
    PE.constant=t<TE0?999:lerp(EX+.9,EX-.62,E_io(seg(t,TE0,TE1)));
    /* animasi ruang */
    BAL.forEach(b=>{const p=V(b.a[0]+(b.b[0]-b.a[0]),b.b[1]+Math.sin(t*1.3+b.ph)*.1,b.b[2]).add(V(Math.sin(t*.9+b.ph)*.1,0,Math.cos(t*.8+b.ph)*.08));b.m.position.copy(p);setCyl(b.st,V(b.a[0],b.a[1],b.a[2]),p.clone().add(V(0,-.6,0)));b.st.scale.x=b.st.scale.z=1;});
    const s=sWax(t);CND.forEach((c,i)=>{c.wax.scale.y=Math.max(.04,s);c.wax.position.y=.58+.5*Math.max(.04,s);spr(c.fl,[c.g.position.x,TY+.04+.58+Math.max(.04,s)+.14,c.g.position.z],.62,.75+.2*Math.sin(t*9+i*2));});
    const rps=t<TJ?0:1.8*(Math.min(t,CE[3])-TJ)+.3*Math.max(0,t-CE[3]),mA=-(t*.05+6.283*rps);WCH[1].rotation.z=mA;WCH[0].rotation.z=mA/12;
    pwHand.rotation.y=-(t*.4+6.283*rps);pwHand2.rotation.y=-(t*.4+6.283*rps)/12;
    GLS.position.y=4.7+.07*Math.sin(t*1.6);GLS.rotation.z=-.2-.35*(t>tw(5,'bercanda')-.2&&t<tw(5,'sebagai')+.6?Math.sin(Math.PI*seg(t,tw(5,'bercanda')-.2,tw(5,'sebagai')+.6)):0);
    spr(glsGlow,[GLS.position.x,GLS.position.y+.9,GLS.position.z],3.0,.28+.12*Math.sin(t*3));
    /* strip, cincin tahun, portal */
    const u1=u1f(t),u2=u2f(t),fade1=(t<TR0?1:.45)*(1-sstep(TR1-.2,TR1+.6,t)),hd=S1.pos(u1);
    S1.atur(0,u1,t*.9,t<TS0?0:fade1);S2.atur(0,u2,t*1.1,(t<TR0?0:1)*(1-sstep(CE[2]+.5,CE[2]+1.7,t))*(t>CE[2]+.5?(.6+.4*Math.sin(t*38)):1));
    RINGS.forEach((r,i)=>{const on=sstep(0,.7,(hd.y-r.y)/6)*(t<TS0?0:1)*(1-sstep(TR1-.4,TR1+.5,t));r.rg.material.opacity=.9*on;r.rg.scale.setScalar(1+.15*Math.sin(t*4+i));r.rg.visible=on>.01;});
    const pOn=sstep(CE[1]-1.2,CE[1]-.2,t)*(1-sstep(TR1,TR1+1.0,t));PORTAL.children.forEach((m,i)=>{m.material.opacity=.9*pOn;m.visible=pOn>.01;m.rotation.z=t*(.5+i*.3);m.scale.setScalar(1+.04*Math.sin(t*3+i));});spr(portGlow,[14,118,-1],20,.5*pOn);
    /* '?' dan berkas bintang */
    const tq=sstep(TQ0,TQ0+.8,t)*(1-sstep(CS[6]+.2,CS[6]+1.0,t));spr(TANYA,[0,17.5+.4*Math.sin(t*2),0],9+.4*Math.sin(t*3),tq*.95);
    const ub=t<CS[6]+.3?0:E_io(seg(t,CS[6]+.3,CE[6]-.5));SB.atur(0,ub,t*1.2,.9);spr(starGlow,[-6,38,-8],t<CS[6]-.3?.01:7+Math.sin(t*5),sstep(CS[6]-.3,CS[6]+.6,t)*.95);
    /* kamera, render */
    camAt(t);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([a,x])=>{if(t>=a)j=x;});$('#jejak').innerHTML=j;
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
    const rp=$('#rpm');if(rp){if(t>=TS0-.1&&t<TR0-.2){rp.style.opacity=sstep(TS0-.1,TS0+.3,t)*(1-sstep(TR0-.6,TR0-.2,t));rp.innerHTML=(2009+Math.floor(91*u1))+'<small>TAHUN TERUS BERTAMBAH</small>';}
      else if(t>=CS[4]+.1&&t<CE[4]+.7){rp.style.opacity=sstep(CS[4]+.1,CS[4]+.5,t)*(1-sstep(CE[4]+.3,CE[4]+.7,t));rp.innerHTML='0<small>TAMU YANG DATANG</small>';}
      else rp.style.opacity=0;}
  }};
