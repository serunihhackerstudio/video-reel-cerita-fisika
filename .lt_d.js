
/* ---------- KAMERA (ortografik, ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,200);cam.lookAt(_v);}
const KD_KUNCI=[[0,[6,-1,0],112],[3.6,[4,-1,0],88],[6.0,[2,-2,0],68],[9.4,[2,-2,0],62],[66.6,[2,-2,0],70],[74.6,[3,-2,0],100]];
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));tg[0]+=nz(t*.35,1)*.05;pasangKamera(KD,tg,h,h*W/H);}
/* kamera dua panel (target & lebar sama, dunia A di kiri, dunia B di kanan) */
const PK=[[9.4,[-2,-2],30],[10.2,[-3,-1.4],22],[16.9,[-3,-1.4],22],[18,[-7,-5],34],[25.4,[-7,-5],34],[26.4,[-16,-1.5],22],[34.2,[-16,-1.5],22],[35.2,[-5,-5.5],28],[47.8,[-5,-5.5],28],[48.8,[21,.5],22],[54.7,[21,.5],22],[55.8,[17,-1.5],34],[66,[17,-1.5],34]];
const PAN={L:{x:24,y:330,w:510,h:820,cx:0,cam:new THREE.OrthographicCamera(-1,1,1,-1,-400,400)},R:{x:546,y:330,w:510,h:820,cx:200,cam:new THREE.OrthographicCamera(-1,1,1,-1,-400,400)}};
function kameraPanel(t){const tt=Math.min(t,66),[A,B,e]=cariKunci(PK,tt),tg=[lerp(A[1][0],B[1][0],e),lerp(A[1][1],B[1][1],e)],lb=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));
  Object.values(PAN).forEach(P=>pasangKamera(P.cam,[tg[0]+P.cx,tg[1],0],lb*P.h/P.w,lb));}
function keLayar(p,pn){const P=pn?PAN[pn]:null;_v.set(p[0]+(P?P.cx:0),p[1],p[2]).project(P?P.cam:KD);return P?[P.x+(_v.x+1)/2*P.w,P.y+(1-_v.y)/2*P.h]:[(_v.x+1)/2*W,(1-_v.y)/2*H];}
/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':'')+(o.sm?' sm':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p,L.pn);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const P=L.pn?PAN[L.pn]:null,ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0,b0=P?P.x+12:AMAN.kiri-10,b1=P?P.x+P.w-12:AMAN.kanan;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,b0,b1-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,P?420:300,(P?P.y+P.h-16:1330)-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
// ---- layar penuh (belum dibagi)
tanda({t:'Laut raksasa',s:'irisan dari permukaan sampai dasar',p:[-6,0,12],o:[110,-200],a:1.0,b:3.9,am:1,big:1});
tanda({t:'Es kutub',s:'di satu sisi',p:[-22,.9,8],o:[-40,-190],a:2.0,b:4.3});
tanda({t:'Kampung nelayan',s:'di tepi pantai',p:[30,3.8,4],o:[-110,-200],a:2.7,b:4.4});
tanda({t:'Lapisan air',s:'tebalnya kelihatan di irisan',p:[-12,-3,0],o:[120,-170],a:6.3,b:8.7,am:1});
tanda({t:'Dasar laut',s:'pasir dan karang',p:[-14,-10.3,0],o:[110,150],a:6.9,b:9.0});
tanda({t:'Tanah pantai',s:'tempat bakau tumbuh',p:[28,-6,0],o:[-130,160],a:7.4,b:9.3});
tanda({t:'Arus laut dalam',s:'bergerak lambat keliling dunia',p:[-9,-9,-.3],o:[100,190],a:8.2,b:9.6,am:1});
// ---- panel kiri (laut asin) dan kanan (laut tawar)
tanda({t:'Garis air normal',s:'laut asin',p:[3.4,0,-4.2],o:[110,-150],a:12.2,b:17,sm:1,pn:'L'});
tanda({t:'Apung berkurang',s:'kapal duduk lebih dalam',p:[-3,-1.2,-6],o:[-80,200],a:12.3,b:14.5,sm:1,am:1,pn:'R'});
tanda({t:'Garis air naik',s:'tapi tidak tenggelam',p:[3.4,0,-4.2],o:[110,-150],a:14.6,b:17,sm:1,am:1,pn:'R'});
tanda({t:'Arus laut dalam',s:'utuh dan terhubung',p:[-9,-9,-.3],o:[90,-200],a:17.4,b:21.6,sm:1,am:1,pn:'L'});
tanda({t:'Suhu + kadar garam',s:'penggerak arus',p:[4,-8.4,-.3],o:[-100,-200],a:19.3,b:21.6,sm:1,pn:'L'});
tanda({t:'Arus melemah',s:'pola berubah drastis',p:[-9,-9,-.3],o:[90,-200],a:22.4,b:25.4,sm:1,am:1,pn:'R'});
tanda({t:'Terputus',s:'iklim ikut terdampak',p:[-3,-8.9,-.3],o:[-60,230],a:23.3,b:25.5,sm:1,am:1,big:1,pn:'R'});
tanda({t:'Membeku di 0°C',s:'air tawar',p:[-18,1,0],o:[110,-180],a:26.0,b:28.3,sm:1,pn:'R'});
tanda({t:'Membeku di −2°C',s:'air laut',p:[-18,1,0],o:[110,-180],a:28.5,b:31.3,sm:1,pn:'L'});
tanda({t:'Es lebih luas',s:'laut cepat tertutup',p:[-10,1,0],o:[100,-200],a:32.4,b:34.6,sm:1,am:1,pn:'R'});
tanda({t:'Ikan',s:'',p:[-5,-5,-5],o:[100,-170],a:35.2,b:36.6,sm:1,pn:'L'});
tanda({t:'Karang',s:'',p:[-10,-10,-5],o:[-80,-200],a:36.2,b:37.5,sm:1,pn:'L'});
tanda({t:'Plankton',s:'dasar rantai makanan',p:[-8,-2,-5],o:[100,-160],a:37.3,b:40.0,sm:1,am:1,pn:'L'});
tanda({t:'Memudar',s:'tak tahan air tawar',p:[-5,-6,-5],o:[90,-200],a:41.8,b:45.0,sm:1,am:1,pn:'R'});
tanda({t:'Rantai terputus',s:'di tengah',p:[8,-6.4,-.3],o:[-70,230],a:45.6,b:48.0,sm:1,am:1,big:1,pn:'R'});
tanda({t:'Penyu',s:'',p:[11,-4.5,-5.5],o:[-70,-190],a:50.1,b:52.4,sm:1,pn:'L'});
tanda({t:'Bakau hidup',s:'',p:[21,3.5,-5],o:[-80,-180],a:48.4,b:50.0,sm:1,pn:'L'});
tanda({t:'Bakau menguning',s:'dan melayu',p:[21,3.2,-5],o:[-80,-180],a:50.6,b:52.6,sm:1,am:1,pn:'R'});
tanda({t:'Burung menjauh',s:'',p:[18,8,-5],o:[110,-120],a:48.8,b:50.4,sm:1,pn:'R'});
tanda({t:'Perahu kosong',s:'tanpa tangkapan',p:[12.5,1.3,-3.5],o:[-30,230],a:52.7,b:54.8,sm:1,am:1,pn:'R'});
tanda({t:'Tangkapan turun',s:'pangan laut menyusut',p:[12.5,1.3,-3.5],o:[-60,230],a:56.3,b:60.0,sm:1,am:1,pn:'R'});
tanda({t:'Tangkapan melimpah',s:'laut asin',p:[12.5,1.3,-3.5],o:[-60,230],a:56.3,b:60.0,sm:1,pn:'L'});
tanda({t:'Pola hujan & panen',s:'ikut berubah',p:[26,3,3],o:[-100,-220],a:60.4,b:63.4,sm:1,am:1,pn:'R'});
tanda({t:'Nafkah hilang',s:'komunitas nelayan',p:[30,5,-5],o:[-90,-190],a:63.6,b:66,sm:1,am:1,pn:'R'});
// ---- penutup, layar penuh dunia A
tanda({t:'Garam',s:'bukan sekadar rasa',p:[-10,0,12],o:[110,-200],a:66.5,b:69.0,am:1,big:1});
tanda({t:'Arus',s:'dikendalikan garam dan suhu',p:[-9,-9,-.3],o:[100,190],a:69.3,b:73.8,am:1});
tanda({t:'Iklim',s:'dan es kutub',p:[-22,1,0],o:[-40,-200],a:70.0,b:73.8});
tanda({t:'Kehidupan',s:'plankton sampai manusia',p:[-4,-5,-5],o:[100,-190],a:70.9,b:74.4,am:1,big:1});
/* ---------- panel split: bingkai, judul ---------- */
const bgP={};['L','R'].forEach(k=>{const P=PAN[k];const b=mk('div','',$('#langit'));Object.assign(b.style,{position:'absolute',left:P.x+'px',top:P.y+'px',width:P.w+'px',height:P.h+'px',borderRadius:'30px',background:'radial-gradient(ellipse at 50% 40%,#2a6683,#0b2236)',opacity:0});
  const f=mk('div','',$('#stage'));Object.assign(f.style,{position:'absolute',left:P.x+'px',top:P.y+'px',width:P.w+'px',height:P.h+'px',borderRadius:'30px',boxSizing:'border-box',border:'5px solid rgba(255,255,255,.95)',boxShadow:'0 0 40px rgba(255,212,0,.3),0 10px 34px rgba(0,0,0,.5)',zIndex:11,opacity:0,pointerEvents:'none'});
  const h=mk('div','',$('#stage'),k==='L'?'LAUT ASIN':'LAUT TAWAR');Object.assign(h.style,{position:'absolute',left:(P.x+90)+'px',top:(P.y+18)+'px',width:(P.w-180)+'px',textAlign:'center',zIndex:12,opacity:0,font:'700 38px/1 var(--fj)',color:k==='L'?'#fff':'#3a2f00',background:k==='L'?'rgba(10,30,45,.75)':PAL.aks,padding:'10px 0',borderRadius:'14px'});
  bgP[k]={b,f,h};});
function renderPanel(k){const P=PAN[k];sunKe(P.cx);RD.setViewport(P.x,H-P.y-P.h,P.w,P.h);RD.setScissor(P.x,H-P.y-P.h,P.w,P.h);RD.render(SD,P.cam);}
/* ---------- SCENE ---------- */
const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SKR=[[.4,'hum',.2],[1.1,'tik',.25],[4.9,'whoosh',.3],[6.4,'tik',.22],[7.4,'tik',.22],[8.3,'zing',.25],[9.4,'whoosh',.3],[12.3,'tik',.25],[14.6,'tik',.22],[17.4,'zing',.25],[19.4,'tik',.22],[22.4,'hiss',.25],[23.4,'tik',.25],[26.0,'tik',.25],[28.5,'tik',.22],[32.4,'zap',.22],[35.2,'tik',.22],[36.7,'zing',.25],[41.8,'hiss',.25],[45.6,'zap',.25],[48.4,'tik',.22],[50.4,'hiss',.22],[52.0,'tik',.22],[56.3,'tik',.25],[60.4,'tik',.22],[63.6,'zap',.25],[66.4,'whoosh',.3],[66.6,'tik',.25],[70.9,'zing',.25]];
const SCENE={dur:74.8,
  kata:KATA,
  sub:{font:"800 66px 'Archivo'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['garam','tawar','daya','apung','apungnya','arus','iklim','es','membeku','plankton','ikan','karang','bakau','rantai','rantainya','terganggu','tangkapan','pesisir','mata','pencaharian','kehidupan','manusia','terdampak']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    POTF.constant=lerp(16,.001,E.io(seg(t,4.5,6.6)));
    const split=sstep(8.8,9.8,t)*(1-sstep(65.7,66.6,t));
    const R2=(a,b)=>E.io(seg(t,a,b));
    const arusIsi=seg(t,7.0,9.0),arusOp=sstep(6.8,7.4,t),ra=[seg(t,36.2,37.6),seg(t,37.6,39.6)],rOp=sstep(35.2,36.0,t);
    const p={t,kb:R2(11.9,15.0),ku:R2(21.6,24.2),ki:R2(31.2,33.9),kl:R2(41.4,44.5),kr:R2(45.0,47.2),kc:R2(50.0,53.6),arusIsi,arusOp,rantaiIsi:ra,rantaiOp:rOp};
    DA.atur(p);DB.atur(p);
    ['L','R'].forEach(k=>{const b=bgP[k];b.b.style.opacity=split;b.f.style.opacity=split;b.h.style.opacity=split;});
    RD.setScissorTest(false);RD.setViewport(0,0,W,H);
    if(split<.999){sunKe(0);kameraDunia(t);RD.render(SD,KD);}
    if(split>.01){kameraPanel(t);RD.setScissorTest(true);if(split>=.999){RD.setScissorTest(false);RD.clear();RD.setScissorTest(true);}renderPanel('L');renderPanel('R');RD.setScissorTest(false);RD.setViewport(0,0,W,H);}
    gambarTanda(t);
    $('#jejak').innerHTML=(t<9.5?'LAUT › <b>IRISAN</b>':t<66.2?'LAUT ASIN <b>vs</b> LAUT TAWAR':'<b>GARAM</b> › ARUS · IKLIM · KEHIDUPAN');
  }};
