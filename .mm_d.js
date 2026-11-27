
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const V=V3;
const TB1=CS[1]-.1,T2=tw(1,'gelembung')-.35,T3=CS[2]-.1,TA5=CS[4]-.1;
const TH0=tw(4,'rem')-.9,TH1=TH0+2.0,TG=tw(4,'sangat')-.5,TF=tw(4,'menyusun')-.5;
const TS0=tw(5,'versi')-.3,TS1=TS0+2.4,TFR=tw(5,'mirip')-.5,TCD=tw(5,'kenal')-.5;
const TL7=CS[6]-.2,TAV=tw(6,'sedang')-.35,TREC=tw(6,'dalam')-.3,TE0=tw(6,'tanda')-.15,TL8=CE[6]+.15,T8=CS[7]-.1;
const ES=[[TE0,-1],[TE0+.55,1],[TE0+1.1,-1],[TE0+1.65,1],[TE0+2.2,0]];
const halus=k=>k*k*k*(k*(k*6-15)+10);
function eyeSig(t){let i=-1;while(i+1<ES.length&&t>=ES[i+1][0])i++;if(i<0)return 0;const pv=i?ES[i-1][1]:0;return lerp(pv,ES[i][1],halus(clamp((t-ES[i][0])/.22)));}
/* ---------- KAMERA ---------- */
const BG=(x,y,z)=>V(BASE.x+x,BASE.y+y,BASE.z+z);
const G1=BG(...PG(-1,0,2).toArray()),G2=BG(...PG(0,0,3).toArray()),G3=BG(...PG(0,0,0).toArray());
const KFA=[[0,V(0,6,-4),125],[CS[0]+4.5,V(0,8,-4),100],[CE[0]+.1,V(0,9,-4.5),62],[TA5,V(0,8.5,-5),62],[TH0-1.2,V(0,5.2,-6.6),12],[TS0-.3,V(0,6,-6.6),14],[TS0+1.8,V(0,9.8,-6.6),27],[CE[5]+.2,V(0,9.8,-6.6),27],[TL7+.6,V(2.2,9,-5.4),35],[CE[6]+.3,V(2.2,9,-5.4),35],[T8+1.2,V(0,10,-5),52],[DURASI,V(0,10,-5),50]];
const KFB=[[TB1,G1,44],[T2-.7,G1,38],[T2,G2,50],[T3-.7,G2,46],[T3,G3,44],[TA5,G3,42]];
let CAMH=26,CUR_T=0;
function camAt(t,ph){const K=ph?KFB:KFA,A=K,{tg,h}=(function(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};})(K,t);CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(260,3*h));}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
const wv=v=>()=>{const w=v.clone?v.clone():v();return[w.x,w.y,w.z];};
const HEADP=[0,4.4,-6.7],BCP=BPOS[1].toArray();
const cardW=i=>()=>{const w=BC.G.localToWorld(V(...CARDS[i].p));return[w.x,w.y,w.z];};
const avW=()=>{const w=BC.G.localToWorld(V(0,.35,0));return[w.x,w.y,w.z];};
/* K1 kamar + gelembung */
tanda({t:'Kamar kecil',s:'tengah malam',p:[2,2.6,3.4],o:[110,-190],a:1.0,b:tw(0,'seseorang')-.4});
tanda({t:'Orang biasa',s:'berpiyama, sedang tidur',p:HEADP,o:[110,-210],a:tw(0,'seseorang')-.2,b:tw(0,'semesta')-.3,am:1});
tanda({t:'Versi lain kamar',s:'kota, laut, gurun',p:BCP,o:[110,-300],a:tw(0,'semesta')-.1,b:tw(0,'apakah')-.2,am:1,big:1});
tanda({t:'Apakah sains',s:'mengizinkannya?',p:BCP,o:[110,-300],a:tw(0,'apakah')-.1,b:CE[0]+.4,am:1,big:1});
/* K2 pohon & gelembung */
tanda({t:'Garis waktu',s:'satu kenyataan',p:PW(-10,0,.4),o:[110,-210],a:TB1+.5,b:tw(1,'cabang')-.2});
tanda({t:'Cabang-cabang',s:'tafsiran banyak dunia',p:PW(-4.5,-6.5,.4),o:[-110,-230],a:tw(1,'cabang')-.2,b:T2-.2,am:1,big:1});
tanda({t:'Hipotesis',s:'belum terbukti',p:PW(7.5,-8,1.4),o:[110,-200],a:tw(1,'banyak')-.1,b:T2-.1,am:1});
tanda({t:'Gelembung semesta',s:'di ruang yang mengembang',p:PW(0,0,6),o:[110,-230],a:T2+.5,b:tw(1,'jangkauan')-.2,am:1,big:1});
tanda({t:'Hipotesis',s:'di luar jangkauan kita',p:PW(9,6,5),o:[-110,-200],a:tw(1,'jangkauan')-.2,b:T3-.1,am:1});
/* K3 K4 lembaran */
tanda({t:'Lembaran semesta',s:'sejajar, satu per lembar',p:PW(7,3,0),o:[-110,-210],a:T3+.2,b:tw(2,'hipotesis')-.2});
tanda({t:'Hipotesis',s:'bukan fakta',p:PW(6,0,9.8),o:[-110,-210],a:tw(2,'hipotesis')-.15,b:tw(2,'bukti')-.3,am:1,big:1});
tanda({t:'Belum ada bukti',s:'dari pengamatan',p:PW(-6,-2,9.8),o:[110,-210],a:tw(2,'bukti')-.35,b:CE[2]+.4,am:1,big:1});
tanda({t:'Dinding tembus pandang',s:'tapi tak bisa dilewati',p:()=>PW(0,0,2.2),o:[110,-230],a:tw(3,'berhubungan')-.5,b:tw(3,'terpisah')-.25,am:1});
tanda({t:'Tak bisa dikunjungi',s:'cabang yang sudah terpisah',p:()=>PW(0,0,-2.2),o:[-110,230],a:tw(3,'terpisah')-.2,b:CE[3]+.4,am:1,big:1});
/* K5 otak */
tanda({t:'Tidur REM',s:'mimpi paling jelas',p:HEADP,o:[-110,-200],a:tw(4,'rem')-.1,b:tw(4,'sangat')-.1,am:1,big:1});
tanda({t:'Otak sangat aktif',s:'bagian-bagian menyala',p:()=>REGW[1].toArray(),o:[110,-190],a:tw(4,'sangat')-.05,b:tw(4,'menyusun')-.1});
tanda({t:'Sinyal listrik',s:'menyusun ulang ingatan',p:()=>FLO[0].pos(.22).toArray(),o:[110,200],a:tw(4,'menyusun')-.1,b:tw(4,'potongan')-.2,am:1,big:1});
tanda({t:'Hipokampus',s:'ingatan',p:()=>REGW[1].toArray(),o:[110,-200],a:tw(4,'potongan')-.1,b:tw(4,'emosi')-.15,am:1});
tanda({t:'Amigdala',s:'emosi',p:()=>REGW[2].toArray(),o:[110,200],a:tw(4,'emosi')-.1,b:tw(4,'pengalaman')-.15,am:1});
tanda({t:'Korteks visual',s:'gambar mimpi',p:()=>REGW[0].toArray(),o:[-110,-200],a:tw(4,'pengalaman')-.1,b:CE[4]+.4,am:1});
/* K6 gelembung diiris */
tanda({t:'Gelembung mimpi',s:'terasa seperti versi lain',p:BCP,o:[110,-310],a:tw(5,'dunia')-.1,b:tw(5,'mirip')-.4,am:1,big:1});
tanda({t:'Diiris terbuka',s:'isinya serpihan',p:()=>BC.G.localToWorld(V(0,0,0)).toArray(),o:[110,-200],a:tw(5,'mirip')-.3,b:tw(5,'kenal')-.3,am:1});
tanda({t:'Potongan ingatan',s:'rumah, tempat, orang',p:cardW(0),o:[110,200],a:tw(5,'kenal')-.2,b:tw(5,'bahannya')-.25,am:1,big:1});
tanda({t:'Bahan dari otakmu',s:'bukan dari semesta lain',p:HEADP,o:[-110,-220],a:tw(5,'bahannya')-.15,b:CE[5]+.4,am:1,big:1});
/* K7 mimpi sadar */
tanda({t:'Mimpi sadar',s:'tahu sedang bermimpi',p:BCP,o:[110,-340],a:CS[6]+.4,b:tw(6,'sedang')-.1,am:1,big:1});
tanda({t:'Pemimpi di dalam mimpi',s:'matanya terbuka',p:avW,o:[110,-190],a:tw(6,'sedang')-.1,b:tw(6,'tanda')-.2,am:1});
tanda({t:'Mata kiri-kanan',s:'kode untuk peneliti',p:()=>ELW.toArray(),o:[-110,-210],a:TE0-.1,b:CE[6]+.4,am:1,big:1});
tanda({t:'Alat perekam',s:'mencatat gerakan mata',p:[6.1,3.4,-3.6],o:[110,-200],a:tw(6,'peneliti',1)-.5,b:CE[6]+.4,am:1});
/* K8 penutup */
tanda({t:'Fiksi',s:'dreamwalking antar semesta',p:BCP,o:[110,-310],a:tw(7,'fiksi')-.4,b:tw(7,'malam')-.25,am:1,big:1});
tanda({t:'Sains',s:'otak membangun semesta kecil',p:HEADP,o:[-110,-210],a:tw(7,'malam')-.2,b:tw(7,'menurutmu')-.2,am:1,big:1});
tanda({t:'Versi dirimu',s:'yang mana kamu temui?',p:BCP,o:[110,-340],a:tw(7,'menurutmu')-.1,b:DURASI,am:1,big:1});
const JEJAK=[[0,'FIKSI › <b>DREAMWALKING</b>'],[CS[1],'<b>TEORI FISIKA</b> › SEMESTA LAIN'],[CS[2],'<b>HIPOTESIS</b> › BELUM ADA BUKTI'],[CS[3],'<b>HIPOTESIS</b> › TAK BISA DIKUNJUNGI'],[CS[4],'<b>SAINS</b> › TIDUR REM'],[CS[5],'<b>SAINS</b> › DUNIA MIMPI'],[CS[6],'<b>SAINS</b> › MIMPI SADAR'],[CS[7],'FIKSI <b>vs</b> SAINS']];
/* ---------- SFX ---------- */
const SKR=[[.4,'hum',.2],[TB1,'zap',.28],[T2,'zing',.24],[T3,'zap',.26],[tw(3,'berhubungan'),'zing',.24],[TA5,'whoosh',.3],[TH0,'whoosh',.3],[TG,'zing',.26],[TF,'hum',.22],[TS0,'whoosh',.3],[TAV,'zap',.26],[TE0,'tik',.3],[TL8,'zing',.22],[tw(7,'menurutmu'),'zing',.22]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"800 66px 'Archivo'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['Doctor','Strange','Multiverse','mimpi.','mimpi','sains','semesta','Semesta','hipotesis.','bukti','cabang-cabang','gelembung-gelembung','terpisah','dikunjungi.','REM,','otak','sangat','aktif','ingatan,','versi','mirip','berubah.','sadar','sadar.','gerakan','mata','fiksi.','dreamwalking','malam,','semesta','menurutmu,','temui?','berhubungan.','banyak','dunia,']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    const inB=t>=TB1&&t<TA5;WA.visible=!inB;WB.visible=inB;
    const tgt=inB?BASE:V(0,4,-5);SUNL.target.position.copy(tgt);SUNL.color.copy(C('#a9c2ff'));SUNL.intensity=inB?2.2:2.3;SUNL.position.set(tgt.x+.5*100,tgt.y+.7*100,tgt.z+.55*100);SUNL.shadow.bias=-.001;SUNL.shadow.normalBias=.08;
    Object.assign(SUNL.shadow.camera,{left:-30,right:30,top:30,bottom:-30,far:260});SUNL.shadow.camera.updateProjectionMatrix();
    HEM.color.copy(C('#8aa0f0'));HEM.groundColor.copy(C('#3a2e58'));HEM.intensity=.6;ROOML.intensity=0;ROOML2.intensity=0;STARS.material.opacity=inB?.9:.75;
    LAMPL.intensity=inB?0:1.6;
    /* bidang potong */
    PH.constant=t<TH0?400:t<TH1?lerp(2.2,0,E_io(seg(t,TH0,TH1))):t<TL8?0:t<TL8+.9?lerp(0,2.4,E_io(seg(t,TL8,TL8+.9))):400;
    PB.constant=t<TS0?400:t<TS1?lerp(4.6,0,E_io(seg(t,TS0,TS1))):t<TL7?0:t<TL7+.9?lerp(0,4.8,E_io(seg(t,TL7,TL7+.9))):400;
    capB.visible=PB.constant<4.55;BC.rim.visible=PB.constant>=400;
    /* gelembung A */
    BB.forEach((b,i)=>{b.G.position.copy(BPOS[i]);b.G.position.y+=Math.sin(t*.9+i*2)*.22;});
    const ks=1+.42*sstep(TAV-.5,TAV+.8,t)*(1-sstep(T8-.2,T8+.8,t));BC.G.scale.setScalar(ks);
    const kF=sstep(TFR,TFR+2.2,t)*(1-sstep(TL7,TL7+1,t));
    BC.mi.P.forEach(p=>{p.o.position.copy(p.p).addScaledVector(p.d,kF);p.o.rotation.set(p.r.x+p.d.z*.04*kF,p.r.y+p.d.x*.05*kF,p.r.z);});
    BC.mi.g.visible=!(t>=TAV-.2&&t<T8);
    CARDS.forEach((c,i)=>{const op=sstep(TCD+i*.08,TCD+i*.08+.6,t)*(1-sstep(TAV-.3,TAV+.2,t));c.m.visible=op>.01;c.m.material.opacity=op;c.m.position.set(c.p[0],c.p[1]+Math.sin(t*1.1+i)*.12,c.p[2]);c.m.quaternion.setFromUnitVectors(V(0,0,1),ARAH);c.m.scale.setScalar(.7+.3*op);});
    BB.forEach((b,i)=>{const w=b.mi.wp,k=popS((t-(tw(7,'menurutmu')+i*.3))/.5);w.visible=k>.01;w.scale.setScalar(3.3*popS((t-(tw(7,'menurutmu')+i*.3))/.5)+.001);});
    /* tokoh mimpi */
    const kav=popS((t-TAV)/.6)*(1-sstep(T8-.2,T8+.5,t));AV.visible=kav>.01;AV.scale.setScalar(kav*1.0+.001);const es=eyeSig(t);AVE.forEach(p=>{p.position.x=es*.06;});
    /* perekam & elektrode */
    const kr=popS((t-TREC)/.6)*(1-sstep(TL8+1,TL8+2,t));REC.visible=kr>.01;REC.scale.setScalar(kr+.001);
    if(REC.visible){const x=REC_L.x,w=REC_L.w,h=REC_L.h;x.fillStyle='#07140f';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,230,170,.18)';x.lineWidth=2;for(let i=1;i<8;i++){x.beginPath();x.moveTo(i*w/8,0);x.lineTo(i*w/8,h);x.stroke();}for(let j=1;j<4;j++){x.beginPath();x.moveTo(0,j*h/4);x.lineTo(w,j*h/4);x.stroke();}
      x.strokeStyle='#2ffcb8';x.lineWidth=5;x.lineJoin='round';x.beginPath();for(let px=0;px<=w;px+=4){const tt=t-(1-px/w)*4.5,y=h*.56-eyeSig(tt)*h*.26;px?x.lineTo(px,y):x.moveTo(px,y);}x.stroke();
      x.fillStyle='#8dffd8';x.font="bold 34px 'IBM Plex Mono',monospace";x.textAlign='left';x.textBaseline='top';x.fillText('GERAK MATA · REM',18,12);REC_L.t.needsUpdate=true;}
    const ke=sstep(TE0-.3,TE0+.6,t)*(1-sstep(TL8+.4,TL8+1.2,t));SELE.atur(0,sstep(TE0-.3,TE0+.8,t),t*2.2,.95*ke*(.45+.55*Math.abs(es)),.5);
    spr(elDot,ELW.toArray(),1.3,ke*(.3+.7*Math.abs(es)));
    LID.forEach((l,i)=>{l.position.x=(i?1:-1)*.55+es*.1;});
    /* otak */
    const gl=sstep(TG,TG+.7,t)*(1-sstep(TL8,TL8+.9,t));
    REG.forEach((r,i)=>{const g=.12+gl*(.75+.25*Math.sin(t*5+i*1.7));r.cm.color.copy(C('#0e6b55')).lerp(C('#2dffc0'),Math.min(1,g));r.m.emissiveIntensity=.3+1.3*g;});
    GLR.forEach((s,i)=>spr(s,REGW[i].toArray(),1.9,inB?0:.65*gl));
    const kfl=(sstep(TF-.1,TF+.4,t)*(1-sstep(TL7,TL7+.7,t)))+sstep(tw(7,'otak')-.2,tw(7,'otak')+.5,t)*.9;
    FLO.forEach((f,i)=>f.atur(0,sstep(TF+i*.2,TF+2.4+i*.2,t)*(t<TL7?1:1),t*2.4+i*.5,(inB?0:.9*Math.min(1,kfl))*(i?.7:1),.7));
    spr(MOON,[3.3,5.9,-10.4],7,inB?0:.9);
    /* dunia B */
    const b1=inB&&t<T2+.35,b2=inB&&t>=T2-.1&&t<T3+.35,b3=inB&&t>=T3-.1;B1.visible=b1;B2.visible=b2;B3.visible=b3;
    {const s=popS((t-TB1)/.6)*(1-sstep(T2-.1,T2+.3,t));B1.scale.setScalar(s+.001);const tc=tw(1,'cabang');const gL=[sstep(TB1+.3,TB1+4.2,t),sstep(tc-.4,tc+1.0,t),sstep(tc+.8,tc+2.2,t)],vis=1-sstep(T2-.15,T2+.2,t);
     TRB.forEach(r=>r.t.atur(0,b1?gL[r.l]:0,t*2,.92*vis,.5));
     TIPS.forEach((p,i)=>{const k=popS((t-(tc+2.0+i*.1))/.5);p.c.scale.setScalar(k+.001);p.k.scale.setScalar(k+.001);});}
    {const s=popS((t-T2)/.6)*(1-sstep(T3-.1,T3+.3,t));B2.scale.setScalar(s+.001);const Ex=.85+.55*seg(t,T2,T3);SLAB.scale.set(Ex,1,Ex);BUBS.forEach((b,i)=>{const k=popS((t-(T2+.4+i*.24))/.5);b.m.position.copy(b.p0).multiplyScalar(Ex);b.k.position.copy(b.m.position);b.rm.position.copy(b.m.position);b.m.scale.setScalar(k+.001);b.k.scale.setScalar(k+.001);b.rm.scale.setScalar(k+.001);});}
    {B3.scale.setScalar(popS((t-T3)/.6)+.001);const TP0=tw(3,'berhubungan')-.25,TP1=tw(3,'dikunjungi')-.6;let y=null,hit=0;
     if(t>=TP0&&t<TP0+1.7){const u=(t-TP0)/1.7,tri=1-Math.abs(2*u-1);y=.6+3.3*(1-Math.pow(1-tri,2));hit=Math.exp(-Math.pow((u-.5)/.09,2));}
     else if(t>=TP1&&t<TP1+1.7){const u=(t-TP1)/1.7,tri=1-Math.abs(2*u-1);y=-.6-3.3*(1-Math.pow(1-tri,2));hit=Math.exp(-Math.pow((u-.5)/.09,2));}
     PROBE.visible=b3&&y!==null;if(y!==null){PROBE.position.copy(PG(0,0,y));const w=PROBE.position.clone().add(BASE);spr(prGl,w.toArray(),3.4,.95);spr(hitGl,[w.x,w.y+(y>0?.35:-.35),w.z],5.5*hit+.01,.95*hit);}else{spr(prGl,[0,0,0],1,0);spr(hitGl,[0,0,0],1,0);}}
    {const k=popS((t-(tw(2,'bukti')-.1))/.5)*(b3&&t<CE[3]?1:0);spr(TANYA,[BASE.x+PG(6,-2,6).x,BASE.y+PG(6,-2,6).y,BASE.z+PG(6,-2,6).z],7*k,.95*k);
     const k8=popS((t-tw(7,'versi'))/.6)*(inB?0:1);if(k8>.01)spr(TANYA,[0,BY+BR+2.6,-6.7],7*k8,.95*k8);}
    /* kamera, render */
    camAt(t,inB?1:0);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([x,y])=>{if(t>=x)j=y;});$('#jejak').innerHTML=j;
    const bump=c=>Math.exp(-Math.pow((t-c)/.14,2));$('#kilat').style.opacity=Math.max(bump(TB1),bump(T3),bump(TA5),.6*bump(T2));
  }};
