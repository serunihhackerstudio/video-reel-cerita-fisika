
const EZ_E=E;const E_in=k=>EZ_E.in(k),E_out=k=>EZ_E.out(k),E_io=k=>EZ_E.io(k);
/* ---------- WAKTU (dari suara) ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CD=TTS.map(o=>o.dur),CE=CS.map((s,i)=>s+CD[i]);
const DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const TC0=3.0;
/* bingkai bidang potong */
const mFr=new THREE.MeshBasicMaterial({color:C('#e458ff'),transparent:true,opacity:0,toneMapped:false,depthTest:false,depthWrite:false});
const mkFrame=(w,hh)=>{const g=new THREE.Group(),t=.2;[[w,t,0,-hh/2],[w,t,0,hh/2],[t,hh,-w/2,0],[t,hh,w/2,0]].forEach(([a,b,x,y])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a,b,t),mFr);m.position.set(x,y,0);m.renderOrder=40;g.add(m);});g.visible=false;SD.add(g);return g;};
const FRZ=mkFrame(46,13),FRX=mkFrame(46,13);FRX.rotation.y=Math.PI/2;
/* ---------- KAMERA ---------- */
const halus=k=>k*k*k*(k*(k*6-15)+10);
function kfAt(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const A=K[i],B=K[i+1],e=halus(clamp((t-A[0])/(B[0]-A[0])));return{tg:A[1].clone().lerp(B[1],e),h:Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e))};}
const KF=[[0,V(0,4,0),66],[TC0+.2,V(0,4,0),58],[7.2,V(.6,3.6,-.4),21],[CE[0],V(.6,3.6,-.4),21],
 [CS[1]+.4,V(-1.8,8.5,-2),32],[CE[1],V(-1.8,8.5,-2),32],
 [CS[2]+.4,V(.4,13.5,-2.5),40],[CE[2],V(.4,13.5,-2.5),40],
 [CS[3]+.4,V(-.8,19.5,-3.2),48],[CE[3],V(-.8,19.5,-3.2),48],
 [CS[4]+.4,V(.4,26,-4),58],[CE[4],V(.4,26,-4),58],
 [CS[5]+.4,V(0,31,-5),74],[CE[5],V(0,31,-5),74],
 [CS[6]+.4,V(.5,12,-1),40],[tw(6,'lalu',1)+.6,V(.8,4.4,.6),13],[DURASI,V(1.3,3.9,1.2),7]];
let CAMH=26,CUR_T=0;
function camAt(t){const{tg,h}=kfAt(KF,t);CAMH=h;pasangKamera(KD,{x:tg.x,y:tg.y,z:tg.z},h,h*W/H,Math.max(170,3*h));}
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
/* jadwal strip */
const SDUR=[.8,.9,1.6,2.4,3.2,4.0],SST=[tw(0,'tiga')-.2,CS[1]+.5,CS[2]+.5,CS[3]+.5,CS[4]+.5,CS[5]+.5],SPD=[1.4,.9,.6,.45,.35,.28];
const su=(i,t)=>t<SST[i]?0:E_io(seg(t,SST[i],SST[i]+SDUR[i]));
const spos=(i,u)=>{const p=SG[i].pos(u);return[p.x,p.y,p.z];};
const smid=i=>()=>spos(i,.5);
const starCh=t=>E_io(seg(t,tw(3,'berubah')-.4,tw(3,'berubah')+1.4));
const pktPos=(i)=>()=>spos(i,(CUR_T*SPD[i]+i*.31)%1);
/* K1 */
tanda({t:'Pengamat',s:'berbaring menatap langit malam',p:[0,GY+1.2,-1.6],o:[110,-190],a:.7,b:2.6});
tanda({t:'Bukit',s:'irisan: rumput, tanah, batuan',p:[3,.9,3.2],o:[-110,200],a:TC0+1.6,b:TC0+4.4,am:1});
tanda({t:'Cahaya',s:'±300.000 km per detik',p:smid(0),o:[110,-190],a:tw(0,'tiga')-.1,b:tw(0,'tapi')+.5,am:1,big:1});
tanda({t:'Butuh waktu',s:'untuk sampai ke mata kita',p:[0,GY+1.1,-1.55],o:[-110,-200],a:tw(0,'butuh')-.1,b:CE[0]+.5,am:1});
/* K2 */
tanda({t:'Bulan',s:'lapisan jarak pertama',p:LAYP[0].toArray(),o:[110,-180],a:tw(1,'bulan')-.1,b:tw(1,'jadi')+.2});
tanda({t:'1 detik',s:'waktu tempuh cahaya Bulan',p:smid(1),o:[-110,190],a:tw(1,'satu')-.1,b:CE[1]+.5,am:1,big:1});
/* K3 */
tanda({t:'Matahari',s:'lapisan kedua',p:LAYP[1].toArray(),o:[-110,-180],a:tw(2,'matahari')-.1,b:tw(2,'matahari',1)-.2});
tanda({t:'8 menit',s:'waktu tempuh cahaya matahari',p:smid(2),o:[110,190],a:tw(2,'delapan')-.1,b:CE[2]+.5,am:1,big:1});
/* K4 */
tanda({t:'Bintang terdekat',s:'±4 tahun cahaya',p:LAYP[2].toArray(),o:[110,-190],a:tw(3,'bintang')-.1,b:tw(3,'cahayanya')-.2});
tanda({t:'4 tahun',s:'cahayanya berangkat sekitar itu',p:smid(3),o:[-110,200],a:tw(3,'cahayanya')-.1,b:tw(3,'bintangnya')-.1,am:1,big:1});
tanda({t:'Bintang sekarang',s:'bisa saja sudah berubah',p:LAYP[2].toArray(),o:[110,-200],a:tw(3,'bintangnya')-.1,b:CE[3]+.6,am:1,big:1});
tanda({t:'Cahaya lama',s:'gambaran yang baru tiba',p:pktPos(3),o:[-110,190],a:tw(3,'berubah')-.1,b:CE[3]+.6,am:1});
/* K5 */
tanda({t:'Andromeda',s:'galaksi tetangga',p:LAYP[3].toArray(),o:[-110,-190],a:tw(4,'galaksi')-.1,b:tw(4,'cahayanya')-.2});
tanda({t:'2,5 juta tahun',s:'sebelum manusia modern ada',p:smid(4),o:[110,190],a:tw(4,'cahayanya')-.1,b:CE[4]+.5,am:1,big:1});
/* K6 */
tanda({t:'Teleskop raksasa',s:'menangkap cahaya paling jauh',p:()=>spos(5,.5),o:[110,-190],a:tw(5,'teleskop')-.1,b:tw(5,'hampir')+.1,am:1});
tanda({t:'13 miliar tahun',s:'hampir sejak awal alam semesta',p:smid(5),o:[-110,200],a:tw(5,'tiga')-.1,b:tw(5,'makin')+.2,am:1,big:1});
tanda({t:'Makin jauh',s:'makin jauh ke masa lalu',p:LAYP[4].toArray(),o:[110,-190],a:tw(5,'makin')-.1,b:CE[5]+.6});
/* K7 */
tanda({t:'Masa lalu',s:'ternyata bisa dilihat',p:[0,GY+1.1,-1.55],o:[110,-190],a:tw(6,'melihat')-.1,b:tw(6,'lalu',1)-.1,am:1});
tanda({t:'Masa depan?',s:'bagaimana cara pergi ke sana',p:()=>[1.2,GY+2.2,1.7],o:[-110,-210],a:tw(6,'bagaimana')-.1,b:DURASI,am:1,big:1});
const JEJAK=[[0,'BUKIT › <b>PENGAMAT MALAM</b>'],[CS[1],'LAPISAN <b>BULAN</b>'],[CS[2],'LAPISAN <b>MATAHARI</b>'],[CS[3],'LAPISAN <b>BINTANG</b>'],[CS[4],'LAPISAN <b>GALAKSI TETANGGA</b>'],[CS[5],'LAPISAN <b>GALAKSI JAUH</b>'],[CS[6],'<b>MASA LALU</b> › MASA DEPAN?']];
/* ---------- SFX ---------- */
const SKR=[[.4,'hum',.2],[TC0+.1,'whoosh',.3],[TC0+1.3,'whoosh',.25],[SST[0],'zap',.26],[CS[1]+.2,'zing',.24],[CS[2]+.2,'zing',.24],[CS[3]+.2,'zing',.24],[tw(3,'berubah'),'zap',.28],[CS[4]+.2,'zing',.24],[CS[5]+.2,'whoosh',.28],[CS[6]+.3,'hum',.22],[tw(6,'bagaimana'),'zing',.26]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['Cahaya','cahaya','Bulan','detik','matahari','Matahari','delapan','menit','empat','tahun','berubah,','Andromeda','juta','miliar','Teleskop','raksasa','lalu','lalu.','depan?','semesta.','jauh','bintang','Bintang','Bintangnya','mata','kita','waktu','masa','lihat','melihat','Melihat']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){CUR_T=t;
    /* cahaya malam (tetap, tanpa kedip) */
    SUNL.color.copy(C('#a9bcff'));SUNL.intensity=2.1;SUNL.position.set(-.4*90,.85*90+3,.7*90);SUNL.target.position.set(0,3,0);HEM.color.copy(C('#7a7aff'));HEM.groundColor.copy(C('#18281c'));HEM.intensity=.62;ROOML.intensity=0;ROOML2.intensity=0;STARS.material.opacity=.95;
    /* bidang potong bukit */
    PZ.constant=t<TC0-.05?40:lerp(40,3.2,E_io(seg(t,TC0,TC0+2.4)));PX.constant=t<TC0+.9?40:lerp(40,4.6,E_io(seg(t,TC0+1.0,TC0+3.4)));
    const fz=sstep(TC0-.2,TC0+.2,t)*(1-sstep(TC0+2.4,TC0+3.2,t)),fx=sstep(TC0+.9,TC0+1.3,t)*(1-sstep(TC0+3.4,TC0+4.2,t));
    mFr.opacity=Math.max(fz,fx)*.95;FRZ.visible=fz>.01;FRZ.position.set(0,-2,PZ.constant+.15);FRX.visible=fx>.01;FRX.position.set(PX.constant+.15,-2,0);
    /* lapisan langit & benda */
    const lv=i=>sstep(CS[i]-.1,CS[i]+.9,t),objs=[moonM,sunM,starM,andM,galM];
    LAY.forEach((L,i)=>{const k=lv(i+1);L.g.visible=k>.01;L.fill.material.opacity=.11*k;L.rm.opacity=(.7+.3*(1-sstep(CS[i+1]+.3,CS[i+1]+1.4,t)))*k;L.g.position.y=L.y-(1-E_out(k))*4;});
    objs.forEach((o,i)=>{const k=lv(i+1);o.visible=k>.01;o.position.y=LAYP[i].y-(1-E_out(k))*4;if(o.material.opacity!==undefined&&o.material.transparent)o.material.opacity=k;});
    moonM.scale.setScalar(.2+.8*lv(1));sunM.scale.setScalar(.2+.8*lv(2));
    const ch=starCh(t);starM.material.color.copy(C('#fff4d6')).lerp(C('#ff3b24'),ch);const sh=sstep(CE[3]+.4,CE[3]+1.4,t);starM.scale.setScalar((.2+.8*lv(3))*(1+1.5*ch+.08*ch*Math.sin(t*4))*(1-.6*sh));
    moonM.rotation.y=t*.05;sunM.rotation.y=t*.03;andM.rotation.z=.5+t*.02;
    spr(glMoon,[LAYP[0].x,LAYP[0].y,LAYP[0].z],6,.35*lv(1));spr(glSun,[LAYP[1].x,LAYP[1].y,LAYP[1].z],15,.8*lv(2));spr(glStar,[LAYP[2].x,LAYP[2].y,LAYP[2].z],(7+6*ch)*(1-.5*sh),(.7-.2*ch)*lv(3)*(1-.5*sh));spr(glGal,[LAYP[4].x,LAYP[4].y,LAYP[4].z],8,.5*lv(5));
    /* strip cahaya */
    SG.forEach((S,i)=>{const u=su(i,t),nxt=i<5?(i===0?CS[1]:CS[i+1]):1e9,dim=i===0?(t<CS[1]-.3?1:0):1-.65*sstep(nxt-.2,nxt+.6,t),k7=sstep(CS[6]+.2,CS[6]+1.2,t),op=dim*(1-.85*k7);
      S.atur(0,u,t*SPD[i]*S.L*.35,u>.01?op:0);const pk=PKT[i],pu=(t*SPD[i]+i*.31)%1;if(u>.99&&op>.1){const p=spos(i,pu);spr(pk,p,i===3?1.9:1.2,.95*op);}else spr(pk,[0,0,0],1,0);});
    /* teleskop raksasa di jalur galaksi jauh */
    const mk5=sstep(tw(5,'teleskop')-.2,tw(5,'teleskop')+.6,t)*(1-sstep(CS[6]-.2,CS[6]+.5,t)),mp=SG[5].pos(.5);MIR.visible=mk5>.01;MIR.position.copy(mp);MIR.lookAt(mp.x+ARAH.x,mp.y+ARAH.y,mp.z+ARAH.z);MIR.scale.setScalar((.2+.8*mk5)*1.7);
    /* motif jam saku, '?' */
    const tb=tw(6,'bagaimana')-.2,dt=Math.max(0,t-tb);pwH.rotation.y=-(t*.3+6.283*.9*dt*dt);pwH2.rotation.y=pwH.rotation.y/12;
    const tq=sstep(tw(6,'bagaimana')-.1,tw(6,'bagaimana')+.8,t);spr(TANYA,[1.3,GY+3.1+.15*Math.sin(t*2),1.9],3.4,tq*.95);
    camAt(t);RD.clear();RD.render(SS,KS);RD.clearDepth();RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([a,x])=>{if(t>=a)j=x;});$('#jejak').innerHTML=j;
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
  }};
