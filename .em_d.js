
const EZ=E;const E_in=k=>EZ.in(k),E_out=k=>EZ.out(k),E_io=k=>EZ.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
/* tonggak waktu */
const TOUT0=.95,TOUT1=3.8,TIN0=4.9,TIN1=CS[1]+.4,TCUT0=CS[1]+1.8,TCUT1=CS[1]+3.4,TZ0=CS[1]+3.9,TZ1=CS[1]+5.4;
const TKIL1=TZ1+.05,TKIL2=CS[3]-.1,TKIL3=CS[6]-.12,TKIL4=CS[7]-.12;
const TA0=TKIL2+.35,TCOL=tw(4,'bertabrakan')-.1,TAST=tw(6,'tambang')-.45;
/* orbit bintang neutron: sudut dan jarak (tabel) */
const ORBN=Math.ceil((TCOL-TA0)*120)+2,ORB_A=new Float32Array(ORBN),ORB_T=new Float32Array(ORBN);
{let th=0;for(let i=0;i<ORBN;i++){const s=clamp(i/120/(TCOL-TA0)),a=lerp(14,2.6,Math.pow(s,1.7)),om=54.8*Math.pow(a,-1.5);ORB_A[i]=a;ORB_T[i]=th;th+=om/120;}}
const orbA=t=>{const x=clamp((t-TA0)*120,0,ORBN-1),i=Math.floor(x),f=x-i,j=Math.min(ORBN-1,i+1);return[lerp(ORB_A[i],ORB_A[j],f),lerp(ORB_T[i],ORB_T[j],f)];};
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
const LNf=Math.log,MINEV=new V3(34,-6,-28),KROCK=new V3(2.6,.9,.45),VP=new V3(2.55,.62,.4);
function camOut(p){return p<.55?RINGP.clone().lerp(MINEV,halus(p/.55)):MINEV.clone().lerp(EC,halus((p-.55)/.45));}
function camAt(t){let tg,h;
  if(t<TOUT0){tg=RINGP.clone();h=lerp(7,6.2,t/TOUT0);}
  else if(t<TOUT1){const p=halus(seg(t,TOUT0,TOUT1));tg=camOut(p);h=Math.exp(lerp(LNf(6.2),LNf(4800),p));}
  else if(t<TIN0){tg=EC.clone();h=lerp(4800,4500,seg(t,TOUT1,TIN0));}
  else if(t<TIN1){const p=1-halus(seg(t,TIN0,TIN1));tg=camOut(p);h=Math.exp(lerp(LNf(5.4),LNf(4500),p));}
  else if(t<TZ0){const k=halus(seg(t,TIN1,TIN1+1.5));tg=RINGP.clone().lerp(KROCK,k);h=lerp(5.4,6.8,k);}
  else if(t<TKIL1){const p=halus(seg(t,TZ0,TZ1));tg=KROCK.clone().lerp(VP,p);h=Math.exp(lerp(LNf(6.8),LNf(1.3),p));}
  else if(t<TKIL2){tg=BASE.clone();h=t<CS[2]+1.4?lerp(11,3.4,halus(seg(t,TKIL1,CS[2]-.3)))*(1)+lerp(0,1.2,halus(seg(t,CS[2]-.3,CS[2]+1.4))):4.6-.5*seg(t,CS[2]+1.4,TKIL2);}
  else if(t<TKIL3){tg=BASE.clone();
    if(t<TCOL)h=lerp(46,34,seg(t,TKIL2,TCOL));else h=Math.exp(lerp(LNf(34),LNf(1150),halus(seg(t,TCOL,CE[5]+.2))));}
  else if(t<TKIL4){tg=BASE.clone();h=lerp(22,16,halus(seg(t,TKIL3,CE[6])));}
  else{tg=RINGP.clone().lerp(KROCK,.5);h=lerp(12,8.4,halus(seg(t,TKIL4,DURASI)));}
  return[tg,h];}
let CAMH=4;
function kameraDunia(t){const[tg,h]=camAt(t);CAMH=h;pasangKamera(KD,tg,h,h*W/H,Math.max(150,h*3.6));}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
/* waktu kamera melewati tinggi tertentu (untuk label) */
function tKetinggian(h0,dari,sampai,naik){for(let t=dari;t<sampai;t+=.02){const h=camAt(t)[1];if(naik?h>=h0:h<=h0)return t;}return sampai;}
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
const PITP=[PIT[0],gy(PIT[0],PIT[1])-14,PIT[1]];
const bumiP=()=>{const n=new V3(-1,.55,-.25).normalize().multiplyScalar(RE).add(EC);return[n.x,n.y,n.z];};
const ba=(...v)=>[BASE.x+v[0],BASE.y+v[1],BASE.z+v[2]];
const nsPos=(t,w)=>{const[a,th]=orbA(clamp(t,TA0,TCOL));const s=w?1:-1;return t>=TCOL?[BASE.x,BASE.y,BASE.z]:ba(s*a/2*Math.cos(th),1.6,s*a/2*Math.sin(th));};
const ctz=()=>[ROCKP.x+.3,1.2,POTR.constant];
/* A · pembuka */
const tMine0=tKetinggian(500,TOUT0,TOUT1,true),tMine1=tKetinggian(40,TIN0,TIN1,false);
tanda({t:'Cincin emas',s:'logam yang kita pakai sehari-hari',p:()=>[RINGP.x,RINGP.y+1.15,RINGP.z],o:[110,-210],a:.35,b:TOUT0+.5,am:1,big:1});
tanda({t:'Tambang emas',s:'di perbukitan, bahan baku cincin',p:PITP,o:[-110,-200],a:tMine0-.5,b:tMine0+1.0,am:1});
tanda({t:'Bumi',s:'berumur ±4,5 miliar tahun',p:bumiP,o:[120,-190],a:TOUT1-.3,b:TIN0+1.3,big:1});
tanda({t:'Atom emas',s:'sudah ada sebelum Bumi terbentuk',p:bumiP,o:[120,200],a:TIN0+.5,b:TIN0+2.8,am:1});
/* B · batu, potongan, atom */
tanda({t:'Batuan berurat emas',s:'bongkahan di atas meja',p:()=>[ROCKP.x,1.65,ROCKP.z],o:[110,-210],a:CS[1]+.9,b:TCUT0+.7,am:1,big:1});
tanda({t:'Bidang potong',s:'permukaannya diberi warna beda',p:ctz,o:[-110,-200],a:TCUT0+.3,b:TCUT1+1.2});
tanda({t:'Urat emas',s:'terlihat di dalam batu',p:()=>[VP.x,VP.y,VP.z],o:[110,190],a:TCUT1+.1,b:TZ0+1.3,am:1,big:1});
tanda({t:'Elektron',s:'mengelilingi inti',p:()=>ba(1.7,.6,.3),o:[-100,-190],a:TKIL1+.35,b:CS[2]-.45,sm:1});
tanda({t:'Inti atom',s:'79 proton + 118 neutron',p:()=>ba(0,.72,0),o:[110,-200],a:TKIL1+.9,b:CS[2]-.05,am:1,big:1});
tanda({t:'Proton',s:'bermuatan positif',p:()=>{const q=nuk[NN-6];return ba(q.x,q.y,q.z);},o:[110,200],a:TKIL1+1.5,b:CS[2]-.1,sm:1});
/* C · hujan neutron */
tanda({t:'Neutron',s:'ditembakkan sangat cepat',p:()=>ba(2.2,.9,.4),o:[110,-190],a:tw(2,'neutron')-.1,b:tw(2,'neutron')+2.0,am:1,big:1});
tanda({t:'Inti membesar',s:'menyerap neutron demi neutron',p:()=>ba(0,.8,0),o:[-110,200],a:tw(2,'membesar')-.2,b:tw(2,'membesar')+2.2,am:1});
tanda({t:'Emas · Platina',s:'unsur berat yang baru terbentuk',p:()=>ba(0,.85,0),o:[110,-200],a:tw(2,'platina')-.5,b:CE[2]+.5,am:1,big:1});
/* D, E · bintang neutron */
tanda({t:'Peristiwa ekstrem',s:'suhu dan kerapatan luar biasa',p:()=>ba(0,0,0),o:[110,-200],a:CS[3]+.1,b:tw(3,'dahsyat')+1.2,am:1});
tanda({t:'Bintang neutron',s:'sepadat inti atom',p:()=>nsPos(tw(3,'bintang'),1),o:[110,-200],a:tw(3,'bintang')-.1,b:tw(3,'bintang')+2.4,am:1,big:1});
tanda({t:'Terdeteksi 2017',s:'riak ruang-waktu sampai ke Bumi',p:()=>ba(7,0,-3),o:[-110,190],a:tw(3,'tujuh')-.1,b:CE[3]+.3});
tanda({t:'Orbit makin cepat',s:'saling mendekat dan berputar',p:()=>nsPos(tw(4,'cepat'),0),o:[-110,-200],a:tw(4,'mengorbit'),b:TCOL,am:1});
tanda({t:'Tabrakan',s:'dua bintang neutron menyatu',p:()=>ba(0,0,0),o:[110,-210],a:TCOL+.05,b:TCOL+2.1,am:1,big:1});
tanda({t:'Awan bercahaya',s:'berisi unsur berat',p:()=>ba(10,6,4),o:[-110,200],a:tw(4,'awan')-.1,b:tw(4,'awan')+2.0});
tanda({t:'Partikel emas',s:'terlontar ke segala arah',p:()=>ba(26,10,-6),o:[110,200],a:tw(4,'emas')-.1,b:CE[4]+.35,am:1});
/* F · nebula */
tanda({t:'Awan gas',s:'bahan pembentuk tata surya',p:()=>ba(-220,60,-60),o:[110,-200],a:tw(5,'gas')-.3,b:tw(5,'gas')+1.9,big:1});
tanda({t:'Emas bercampur',s:'butir keemasan di dalam awan',p:()=>ba(110,40,90),o:[-110,200],a:tw(5,'bercampur')-.2,b:tw(5,'surya')-.5,am:1});
tanda({t:'Matahari muda',s:'terbentuk di pusat awan',p:()=>ba(0,10,0),o:[110,200],a:tw(5,'surya')-.5,b:CE[5]+.4,am:1,big:1});
/* G · Bumi muda */
tanda({t:'Bumi muda',s:'masih cair dan sangat panas',p:()=>ba(-2.9,2.8,0),o:[-110,-200],a:TKIL3+.4,b:TKIL3+2.1});
tanda({t:'Inti Bumi',s:'emas ikut tenggelam bersama besi',p:()=>ba(0,.4,POTG.constant),o:[110,-200],a:tw(6,'tenggelam')-.4,b:TAST-.6,am:1,big:1});
tanda({t:'Hujan asteroid',s:'membawa emas ke kerak Bumi',p:()=>ba(2.6,3.2,2.4),o:[-110,-200],a:TAST+.1,b:TAST+3.3,am:1,big:1});
tanda({t:'Kerak Bumi',s:'emas yang kita tambang',p:()=>ba(-2.4,-2.6,2.4),o:[110,200],a:tw(6,'tambang')-.1,b:CE[6]+.3,am:1});
/* H · penutup */
tanda({t:'Setiap gram emas',s:'berasal dari bintang',p:()=>[RINGP.x,RINGP.y+1.2,RINGP.z],o:[110,-210],a:tw(7,'gram')-.15,b:tw(7,'kosmik')+.2,am:1,big:1});
tanda({t:'Sisa peristiwa kosmik',s:'jauh sebelum Bumi lahir',p:()=>[ROCKP.x,1.1,POTR.constant],o:[-110,230],a:tw(7,'kosmik')-.1,b:CE[7]+.6,am:1,big:1});
const JEJAK=[[0,'CINCIN › <b>TAMBANG</b> › <b>BUMI</b>'],[TIN1,'BATUAN <b>BERURAT EMAS</b>'],[TKIL1,'DI DALAM <b>ATOM EMAS</b>'],[CS[2],'<b>HUJAN NEUTRON</b> › INTI MEMBESAR'],[TKIL2,'<b>TABRAKAN</b> BINTANG NEUTRON'],[CS[5],'AWAN GAS › <b>TATA SURYA</b>'],[TKIL3,'BUMI MUDA › <b>HUJAN ASTEROID</b>'],[TKIL4,'<b>SISA</b> PERISTIWA KOSMIK']];
/* kilat transisi */
const KIL=[[TKIL1,1,.5],[CS[2]-.02,.55,.3],[TKIL2,1,.5],[TCOL,.5,.4],[TKIL3,1,.5],[TKIL4,1,.5]];
const kilat=t=>Math.max(...KIL.map(([tk,a,w])=>a*Math.pow(Math.max(0,1-Math.abs(t-tk)/w),1.4)));
/* ---------- SCENE ---------- */
const SKR=[[.4,'hum',.18],[TOUT0,'whoosh',.3],[TIN0,'whoosh',.28],[TCUT0,'whoosh',.3],[TKIL1,'zap',.3],[TKIL2,'zap',.28],[TCOL,'zing',.32],[TKIL3,'zap',.28],[TAST,'hiss',.24],[TKIL4,'whoosh',.28]];
DAFTAR.forEach(L=>{if(L.am)SKR.push([+(L.a+.02).toFixed(2),'tik',.2]);});SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"800 66px 'Archivo'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['emas','Bumi','atom','atom-atomnya','tua','cincinmu','besi','ekstrem','neutron','platina','bintang','tabrakan','bertabrakan','awan','tata','surya','inti','tenggelam','asteroid','sisa','kosmik','gram']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    const fase=(t<TKIL1||t>=TKIL4)?0:t<TKIL2?1:t<TKIL3?2:3;
    GA.visible=fase===0;ATOM.visible=fase===1;NSW.visible=fase===2;YE.visible=fase===3;
    kameraDunia(t);const h=CAMH;
    /* ---- dunia luar ---- */
    if(fase===0){
      ringG.rotation.y=.55+.45*Math.sin(t*.55);const fin=t>=TKIL4?sstep(TKIL4,TKIL4+1,t):0;
      spr(glowRing,[RINGP.x,RINGP.y,RINGP.z+.3],lerp(3.4,5.6,fin),.1+.4*fin*(.8+.2*Math.sin(t*3)));
      const dz=lerp(2.4,-.05,E_io(seg(t,TCUT0,TCUT1)));POTR.constant=t<TCUT0-.05?999:ROCKP.z+dz;
      const bk=sstep(TCUT0-.1,TCUT0+.2,t)*(1-sstep(TCUT1,TCUT1+.7,t));bingkai.visible=bk>.01;bingkai.material.opacity=bk;bingkai.position.z=ROCKP.z+dz+.02;
      tBumi.offset.x=t*.0012;const ua=sstep(300,2200,h);udaraS.visible=ua>.01;udaraS.material.opacity=ua*.9;
      TRUK.forEach((g,i)=>{const r=PITR*(i+1+.35)/6,a=t*(.12-.025*i)*(i%2?-1:1)+i*2.1,x=PIT[0]+r*Math.cos(a),z=PIT[1]+r*Math.sin(a),dir=i%2?-1:1;g.position.set(x,gy(x,z)+.02,z);g.rotation.y=Math.atan2(-Math.cos(a)*dir,-Math.sin(a)*dir);g.scale.setScalar(.9);});
      const sp=t>=TKIL4?sstep(TKIL4+.4,TKIL4+1.6,t):0;sprkP.material.opacity=sp*.9;sprkP.visible=sp>.01;{const P=sprkG.attributes.position;for(let i=0;i<NSPK;i++){const b=sprkB.subarray(i*4,i*4+4),u=((t*.12+b[3])%1);P.setXYZ(i,RINGP.x+b[0]*.6,.3+u*4.5,RINGP.z+b[2]*.5+.4);}P.needsUpdate=true;}
    }
    /* ---- atom emas + hujan neutron ---- */
    if(fase===1){
      const prog=seg(t,CS[2]+.7,CS[2]+5.0),N=t<CS[2]-.02?NN:Math.round(lerp(70,NN,E_io(prog)));NUKL.count=N;
      const oa=1-sstep(CS[2]-.5,CS[2]-.1,t);ORB.forEach((o,i)=>{o.t.material.opacity=.6*oa;o.g.visible=oa>.01;o.els.forEach((e,k)=>{const a=t*(1.5-.25*i)+k*6.283/o.els.length;e.position.set(o.R*Math.cos(a),o.R*Math.sin(a),0);});});
      spr(nukGlow,[0,0,0],3.2+prog*1.6,.5+.2*Math.sin(t*9));spr(awan,[0,0,0],12,.7*oa);
      const act=t>=CS[2]+.4&&t<CS[2]+5.4?sstep(CS[2]+.4,CS[2]+.9,t)*(1-sstep(CS[2]+4.9,CS[2]+5.4,t)):0,rn=.5+.2*prog;
      NSTRIP.forEach((s,i)=>{if(act<.01){s.L.off();return;}const ph=(t*.9+s.ph0)%1,hd=clamp(ph/.6),tl=clamp((ph-.28)/.6);if(ph>.9){s.L.off();return;}
        s.L.atur(s.dir.clone().multiplyScalar(5),s.dir.clone().multiplyScalar(rn),tl,hd,t*3,act,.9);});
      const hu=$('#rpm');if(hu){const on=t>=CS[2]+.3&&t<CS[2]+5.6;hu.style.opacity=on?1:0;hu.innerHTML=N+'<small>PARTIKEL DI DALAM INTI</small>';}
    }else{const hu=$('#rpm');if(hu)hu.style.opacity=0;NSTRIP.forEach(s=>s.L.off());}
    /* ---- bintang neutron, tabrakan, nebula ---- */
    if(fase===2){
      const tau=t-TCOL,pre=t<TCOL,[a,th]=orbA(clamp(t,TA0,TCOL)),mg=pre?1:1-E_in(seg(t,TCOL,TCOL+.16));
      const pa=nsPos(t,1),pb=nsPos(t,0);NSA.position.set(pa[0]-BASE.x,pa[1]-BASE.y,pa[2]-BASE.z);NSB.position.set(pb[0]-BASE.x,pb[1]-BASE.y,pb[2]-BASE.z);
      NSA.visible=NSB.visible=mg>.02;NSA.scale.setScalar(Math.max(.01,mg*(1+.12*Math.sin(t*20))));NSB.scale.setScalar(Math.max(.01,mg));
      spr(haloA,[NSA.position.x,NSA.position.y,NSA.position.z],11*mg,.9*mg);spr(haloB,[NSB.position.x,NSB.position.y,NSB.position.z],11*mg,.9*mg);
      const gw=sstep(TA0,TA0+1.3,t)*(pre?1:1-seg(t,TCOL,TCOL+.4)),u=th/6.283;GWR.forEach((m,i)=>{const tt=((u*.9+i/7)%1+1)%1,R=2.4+tt*60;m.visible=gw>.02;m.scale.setScalar(R);m.position.y=1.6;m.material.opacity=Math.pow(1-tt,1.7)*.5*gw;});
      {const P=trailG.attributes.position,Cc=trailG.attributes.color,vis=pre?1:1-seg(t,TCOL,TCOL+.3);for(let k=0;k<TRN;k++){const ti=Math.max(TA0,Math.min(TCOL,t)-k*.05),[aa,tt]=orbA(ti),f=Math.pow(1-k/TRN,1.6)*.55*vis*sstep(TA0-.2,TA0+.6,t);
        P.setXYZ(2*k,aa/2*Math.cos(tt),1.6,aa/2*Math.sin(tt));P.setXYZ(2*k+1,-aa/2*Math.cos(tt),1.6,-aa/2*Math.sin(tt));Cc.setXYZ(2*k,.5*f,.7*f,1.2*f);Cc.setXYZ(2*k+1,.5*f,.7*f,1.2*f);}P.needsUpdate=true;Cc.needsUpdate=true;}
      /* ejecta */
      const ej=tau>0;ejecta.visible=ej;if(ej){const P=ejG.attributes.position,Rv=34*Math.pow(tau,.78);ejecta.material.size=lerp(17,9,seg(tau,0,6));for(let i=0;i<NE;i++){const d=ejDir.subarray(i*4,i*4+4),r=Rv*d[3];P.setXYZ(i,d[0]*r,d[1]*r+1.6*Math.exp(-tau),d[2]*r);}P.needsUpdate=true;}
      const fl=tau>0?Math.exp(-tau*4):0;spr(kilatNS,[0,1.6,0],70*fl+10,fl*1.1);
      AWAN.forEach((s,i)=>{const o=[[1,.4,0],[-.6,.8,.5],[.3,-.2,-.9],[-.8,.2,-.4],[.2,.9,.7]][i],k=seg(tau,0,5+i*.3),sc=lerp(6,40+i*9,E_out(k)),op=tau>0?.3*(1-sstep(1.2,6+i*.4,tau))*Math.min(1,tau*3):0;spr(s,[o[0]*sc*.3,o[1]*sc*.2+1.6,o[2]*sc*.3],sc,op);});
      /* nebula */
      const vis=sstep(CS[5]-.3,CS[5]+1.3,t),form=E_io(seg(t,CS[5]+.5,CE[5]+.4));
      const fillN=(g,base,n,sc)=>{const P=g.attributes.position;for(let i=0;i<n;i++){const R0=base[i*4],th0=base[i*4+1],ph=base[i*4+2],w=base[i*4+3],R=R0*(1-.5*form*(.6+.4*w))*sc,om=(.15+.9*form)*.6/(R/110+.25),T2=th0+om*t*(.7+.3*w);
        P.setXYZ(i,R*Math.sin(ph)*Math.cos(T2),R*Math.cos(ph)*(1-.9*form),R*Math.sin(ph)*Math.sin(T2));}P.needsUpdate=true;};
      nebDef.forEach((n,k)=>{n.p.material.opacity=.5*vis*(1-.6*form);n.p.material.size=[34,52,76][k]*(1-.45*form);n.p.visible=vis>.01;if(vis>.01)fillN(n.g,n.base,NG,1+k*.03);});
      gdPts.material.opacity=.95*vis;gdPts.visible=vis>.01;if(vis>.01)fillN(gdG,gdBase,NGD,1);
      const sm2=sstep(.15,.9,form);sunMuda.visible=sm2>.02;sunMuda.scale.setScalar(.4+sm2*1.1);sunMuda.position.y=0;spr(sunGlow,[0,0,0],lerp(30,80,sm2),sm2*.8);spr(sunGlow2,[0,0,0],lerp(60,170,sm2),sm2*.4);
    }
    /* ---- Bumi muda: emas tenggelam, hujan asteroid ---- */
    if(fase===3){
      const TC1=TKIL3+.5,TC2=TKIL3+1.8,TCL=TAST-.5,YM=YR+1.2;
      const dcut=Math.min(YM,lerp(YM,0,E_io(seg(t,TC1,TC2)))+YM*E_io(seg(t,TCL,TCL+.8)));POTG.constant=dcut;
      lavaS.rotation.y=kerakS.rotation.y=t*.12;const cool=E_io(seg(t,TCL,TCL+1.1));kerakS.material.opacity=cool;lavaS.material.emissiveIntensity=.95*(1-.88*cool);
      const keC=dcut<YM-.05;DISKY.forEach(d=>{const r=d.userData.r,rad=r>Math.abs(dcut)?Math.sqrt(r*r-dcut*dcut):0;d.visible=keC&&rad>.02;d.scale.setScalar(Math.max(.001,rad));d.position.z=dcut;});
      const dp=drG.attributes.position,tD=TKIL3+1.5;for(let i=0;i<NDR;i++){const q=dropAw[i],p=E_io(seg(t,tD+q.s,tD+q.s+1.8)),r=lerp(q.r0,q.r1,p);dp.setXYZ(i,Math.cos(q.a)*r,Math.sin(q.a)*r,dcut+.05);}dp.needsUpdate=true;
      const dv=keC?sstep(TKIL3+1.2,TKIL3+1.6,t)*(1-sstep(TCL-.2,TCL+.3,t)):0;drPts.material.opacity=dv;drPts.visible=dv>.01;
      const cg=sstep(TKIL3+2.2,TKIL3+4.6,t)*(keC?1:0);spr(inti1,[0,0,dcut+.15],lerp(1.4,4.2,cg),.95*cg*(1-sstep(TCL-.2,TCL+.3,t)));spr(yeGlow,[0,0,0],YR*3.1,.4*(1-.9*cool)+.1);
      const dtI=(CE[6]-.5-TAST-.3)/NAS;let imp=0;
      AST.forEach((a,i)=>{const ti=TAST+.4+i*dtI+a.t*.25,fl=1.05,k=seg(t,ti-fl,ti),post=t-ti;a.m.visible=k>0&&k<1;
        const start=a.n.clone().multiplyScalar(YR+16).add(new V3(-6,5,-2)),end=a.n.clone().multiplyScalar(YR+.05),pos=start.clone().lerp(end,E_in(k));a.m.position.copy(pos);a.m.rotation.set(t*3+i,t*2,0);
        if(k>0&&k<1)a.L.atur(start,pos,.55*E_in(k),1,t*3,.95,.5);else a.L.off();
        const f=post>0&&post<1.6?Math.exp(-post*3.2):0;spr(impS[i],[end.x*1.01,end.y*1.01,end.z*1.01],3.4*f+.01,f*1.1);if(post>0)imp++;});
      spkG.setDrawRange(0,Math.floor(NSP*clamp((t-TAST-.4)/(CE[6]-.4-TAST-.4))));spkPts.material.opacity=sstep(TAST,TAST+.8,t);spkPts.visible=t>TAST;
    }
    SUNL.intensity=2.3;
    const kl=kilat(t),kEl=$('#kilat');if(kEl)kEl.style.opacity=Math.min(1,kl);
    RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j;
  }};
