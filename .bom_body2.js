
/* ---------- TEKSTUR (canvas) ---------- */
function teksturK(w,h,lukis,ul){const c=kanvas(w,h),x=c.getContext('2d');lukis(x,w,h,rng(w*7+h));const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;
  t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;if(ul)t.repeat.set(...ul);return t;}
function bintik(x,w,h,n,warna,a,b,r,y0=0,hh=h){for(let i=0;i<n;i++){x.fillStyle=warna[(r()*warna.length)|0];const s=a+r()*(b-a);x.fillRect(r()*w,y0+r()*hh,s,s*(.6+r()*.8));}}
const salin=(t,a,b)=>{const c=t.clone();c.needsUpdate=true;c.repeat.set(a,b);return c;};
const tBeton=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#a9a69f';x.fillRect(0,0,w,h);bintik(x,w,h,2400,['#9a978f','#b8b5ad','#8c8982','#c4c1b9'],1,3,r);x.fillStyle='rgba(40,38,32,.2)';x.fillRect(0,0,w,2);x.fillRect(0,0,2,h);},[2,2]);
const tUbin=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#c9c6bb';x.fillRect(0,0,w,h);x.fillStyle='#b4b1a6';x.fillRect(0,0,64,64);x.fillRect(64,64,64,64);bintik(x,w,h,900,['#bdbab0','#d3d0c5'],1,2,r);
  x.fillStyle='rgba(40,38,32,.28)';x.fillRect(0,0,w,2);x.fillRect(0,0,2,h);x.fillRect(0,64,w,1);x.fillRect(64,0,1,h);},[9,9]);
const tDinding=teksturK(128,256,(x,w,h,r)=>{x.fillStyle='#d8d4c6';x.fillRect(0,0,w,h);bintik(x,w,h,700,['#cfcbbd','#e1ddd0'],1,3,r);x.fillStyle='#8f9b94';x.fillRect(0,h*.72,w,h*.28);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(0,h*.72,w,3);});
const tSikat=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#c3c8cb';x.fillRect(0,0,w,h);for(let i=0;i<240;i++){{const v=r()<.5?255:70;x.fillStyle='rgba('+v+','+v+','+v+','+(.04+r()*.12)+')';}x.fillRect(r()*20,r()*h,w,1+(r()<.2?1:0));}},[2,2]);
const tSikatG=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#7d868d';x.fillRect(0,0,w,h);for(let i=0;i<240;i++){{const v=r()<.5?255:30;x.fillStyle='rgba('+v+','+v+','+v+','+(.04+r()*.12)+')';}x.fillRect(r()*20,r()*h,w,1);}},[2,2]);
const tLogam=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6c7277';x.fillRect(0,0,w,h);bintik(x,w,h,3000,['#5d6368','#7c8287','#51575c','#8a9095'],1,4,r);for(let i=0;i<160;i++){x.fillStyle='rgba(255,255,255,'+(r()*.12)+')';x.fillRect(r()*w,r()*h,6+r()*30,1);}},[2,2]);
const tDinamit=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#6a2f23';x.fillRect(0,0,w,h);bintik(x,w,h,500,['#5c281e','#78362a'],1,3,r);x.fillStyle='#e9dcc0';x.fillRect(0,44,w,38);x.fillStyle='#3a2a20';x.fillRect(0,50,w,3);x.fillRect(0,74,w,3);
  x.fillStyle='rgba(0,0,0,.35)';for(let i=0;i<6;i++)x.fillRect(12+i*18,58,10,10);});
const tBayang=teksturK(256,256,(x,w,h)=>{const g=x.createRadialGradient(128,128,10,128,128,128);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(.6,'rgba(0,0,0,.15)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tKisi=teksturK(512,512,(x,w,h)=>{x.clearRect(0,0,w,h);const n=7;for(let j=0;j<n;j++)for(let i=0;i<n;i++){const px=60+i*(w-120)/(n-1),py=60+j*(h-120)/(n-1);if(Math.hypot(px-256,py-256)>215)continue;
  x.strokeStyle='rgba(255,176,138,.5)';x.lineWidth=3;if(i<n-1){x.beginPath();x.moveTo(px,py);x.lineTo(px+(w-120)/(n-1),py);x.stroke();}if(j<n-1){x.beginPath();x.moveTo(px,py);x.lineTo(px,py+(h-120)/(n-1));x.stroke();}
  const g=x.createRadialGradient(px,py,2,px,py,22);g.addColorStop(0,'#fff');g.addColorStop(.35,'#ffb08a');g.addColorStop(1,'rgba(255,90,31,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,22,0,7);x.fill();}});

/* ---------- RENDERER, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=.95;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-300,300);
SD.add(new THREE.HemisphereLight(C('#e6eef2'),C('#5c5648'),.5));
const matahari=new THREE.DirectionalLight(C('#ffe8c8'),2.8);matahari.castShadow=true;matahari.shadow.mapSize.set(4096,4096);matahari.shadow.bias=-.0003;matahari.shadow.normalBias=.03;SD.add(matahari,matahari.target);
const isiL=new THREE.DirectionalLight(C('#bcd4ff'),.3);isiL.position.set(-20,12,30);SD.add(isiL);
const DM=(h,o)=>bhn(h,Object.assign({roughness:.85,envMapIntensity:.3},o),false);

/* ---------- LABORATORIUM SEDERHANA ---------- */
{const sisi=DM('#ffffff',{map:salin(tBeton,3,1),roughness:1});
 const lantai=new THREE.Mesh(new THREE.BoxGeometry(17,1,17),[sisi,DM('#3a3a38'),DM('#ffffff',{map:tUbin,roughness:.35}),DM('#3a3a38'),sisi,DM('#3a3a38')]);lantai.position.set(0,-.5,0);lantai.receiveShadow=true;SD.add(lantai);}
function dinding(pjg,tinggi,tebal){const g=new THREE.Group();SD.add(g);const pl=DM('#ffffff',{map:salin(tDinding,pjg/6,1),roughness:.9}),atas=DM('#ffffff',{map:salin(tBeton,pjg/4,1)});
  const m=new THREE.Mesh(new THREE.BoxGeometry(pjg,tinggi,tebal),[atas,atas,atas,pl,pl,pl]);m.position.y=tinggi/2;m.castShadow=m.receiveShadow=true;g.add(m);return g;}
const dB=dinding(17,8.6,.7);dB.position.set(0,0,-8.15);
const dK=dinding(17,8.6,.7);dK.position.set(-8.15,0,0);dK.rotation.y=Math.PI/2;
{ // jendela di dinding belakang, rak + botol, jam dinding, tanda peringatan
  const bingkai=DM('#4a5056',{metalness:.5,roughness:.4});kotak(1.2,5.6,3.6,7.2,-7.8,-7.7,bingkai,SD);
  const kc=new THREE.Mesh(new THREE.PlaneGeometry(4.0,3.2),new THREE.MeshBasicMaterial({color:C('#e8f2f4'),toneMapped:false}));kc.position.set(3.4,5.4,-7.78);SD.add(kc);
  kotak(3.35,3.45,3.8,7.0,-7.78,-7.68,bingkai,SD);kotak(1.4,5.4,5.35,5.45,-7.78,-7.68,bingkai,SD);
  kotak(-6.6,-2.2,4.4,4.55,-7.7,-6.9,DM('#6b7076',{metalness:.6,roughness:.4}),SD);
  [[-6.0,'#5aa6c4'],[-5.2,'#d9a24b'],[-4.4,'#7fb58a'],[-3.6,'#c4584a']].forEach(([x,c])=>{const b=pasang(new THREE.CylinderGeometry(.28,.28,.9,20),bhn(c,{transparent:true,opacity:.55,roughness:.08},false),SD,[x,4.55+.45,-7.3]);b.castShadow=true;pasang(new THREE.CylinderGeometry(.14,.14,.2,12),DM('#2b2e31'),SD,[x,4.55+1.0,-7.3]);});
  const jam=pasang(new THREE.CylinderGeometry(.55,.55,.08,32),DM('#f4f1e8',{roughness:.4}),SD,[-5.2,6.7,-7.76]);jam.rotation.x=Math.PI/2;
  kotak(-5.22,-5.18,6.7,7.15,-7.7,-7.66,DM('#222'),SD);kotak(-5.2,-4.88,6.68,6.72,-7.7,-7.66,DM('#222'),SD);
  const k=pasang(new THREE.CylinderGeometry(.5,.5,.06,3),DM('#f2c230',{roughness:.5}),SD,[-1.3,6.2,-7.78]);k.rotation.x=Math.PI/2;k.rotation.z=Math.PI/2*0;}
// lemari kaca di dinding kiri, bangku
{const lm=DM('#8a9096',{metalness:.5,roughness:.45});kotak(-7.8,-6.3,0,5.2,-5.4,-2.2,lm,SD);
  const kc=bhn('#cfe8f0',{transparent:true,opacity:.22,roughness:.05},false);kotak(-6.32,-6.28,.5,4.8,-5.2,-2.4,kc,SD);
  [1.6,2.9,4.1].forEach(y=>kotak(-7.6,-6.4,y,y+.08,-5.3,-2.3,DM('#c4c8cb',{metalness:.5,roughness:.4}),SD));
  const bg=bhn('#9a9fa4',{metalness:.7,roughness:.3},false);for(let i=0;i<3;i++)kotak(-7.4,-6.7,1.7+i*1.2,2.3+i*1.2,-5.0+i*.5,-4.5+i*.5,i==1?DM('#d9a24b'):DM('#5aa6c4',{roughness:.3}),SD);
  const tp=bubut([[0,0],[.7,0],[.7,.18],[.12,.2],[.1,1.8],[.8,1.85],[.8,2.0],[0,2.0]],DM('#3f4448',{roughness:.6}),SD,null,[5.4,0,4.6],40);}
/* ---------- meja uji ---------- */
const baja=DM('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:.9}),bajaG=DM('#ffffff',{map:tSikatG,metalness:.8,roughness:.4});
const MJ=new THREE.Group();SD.add(MJ);
kotak(-3.4,3.4,2.38,2.62,-1.8,1.8,baja,MJ);kotak(-3.45,3.45,2.3,2.4,-1.85,1.85,bajaG,MJ);
[[-3.1,-1.5],[3.1,-1.5],[-3.1,1.5],[3.1,1.5]].forEach(([x,z])=>kotak(x-.12,x+.12,0,2.3,z-.12,z+.12,bajaG,MJ));
kotak(-3.1,3.1,.5,.62,-1.5,1.5,bajaG,MJ);
// monitor kecil, tabung kaca, buku catatan di meja
{kotak(1.9,3.0,2.62,3.7,-1.5,-1.4,DM('#1c2024',{roughness:.4}),MJ);const lay=new THREE.Mesh(new THREE.PlaneGeometry(.95,.85),new THREE.MeshBasicMaterial({map:teksturK(128,128,(x,w,h)=>{x.fillStyle='#0b1a22';x.fillRect(0,0,w,h);x.strokeStyle='#ff9a6a';x.lineWidth=3;x.beginPath();for(let i=0;i<w;i+=4){const v=h*.6-Math.sin(i*.1)*h*.12-(i>70?h*.35*Math.exp(-(i-70)/14):0);i?x.lineTo(i,v):x.moveTo(i,v);}x.stroke();}),toneMapped:false}));lay.position.set(2.45,3.2,-1.38);MJ.add(lay);
  kotak(2.35,2.55,2.62,2.9,-1.45,-1.35,DM('#1c2024'),MJ);
  const tb=pasang(new THREE.CylinderGeometry(.22,.22,.75,20),bhn('#cfe8f0',{transparent:true,opacity:.28,roughness:.05},false),MJ,[-2.6,3.0,-1.1]);
  kotak(-3.0,-2.0,2.62,2.68,.6,1.5,DM('#2d5a72',{roughness:.6}),MJ);kotak(-2.95,-2.05,2.68,2.7,.65,1.45,DM('#efece2'),MJ);}
// bangku
{const dk=pasang(new THREE.CylinderGeometry(.6,.6,.12,24),DM('#3a3f44',{roughness:.6}),SD,[1.5,1.9,3.4]);batang([1.5,0,3.4],[1.5,1.9,3.4],.08,bajaG,SD);}

/* ---------- logam uranium (di atas alas) + dinamit pembanding ---------- */
const POTM=new THREE.Plane(new THREE.Vector3(0,0,-1),99);   // bidang potong hanya untuk bongkahan logam
function bhnK(hex,o={}){return new THREE.MeshStandardMaterial(Object.assign({color:C(hex),roughness:.6,metalness:0,clippingPlanes:[POTM],clipShadows:true},o));}
const CX=-.9,CY=2.62+.14+.34;
{const alas=pasang(new THREE.CylinderGeometry(.55,.62,.14,28),bajaG,SD,[CX,2.62+.07,ZC]);}
const gl=new THREE.IcosahedronGeometry(.34,4);{const p=gl.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),d=1+.16*Math.sin(x*9+1)*Math.sin(y*8+2)+.1*Math.sin(z*11+.5)*Math.sin(x*7);p.setXYZ(i,x*d,y*d*.9,z*d*1.1);}gl.computeVertexNormals();}
const logam=new THREE.Mesh(gl,bhnK('#ffffff',{map:tLogam,metalness:.88,roughness:.38,envMapIntensity:1.1}));logam.position.set(CX,CY,ZC);logam.castShadow=logam.receiveShadow=true;SD.add(logam);
logam.add(new THREE.Mesh(gl,new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTM],toneMapped:false})));
const KISI=new THREE.Mesh(new THREE.PlaneGeometry(.78,.78),new THREE.MeshBasicMaterial({map:tKisi,transparent:true,depthWrite:false,toneMapped:false,opacity:0}));KISI.position.set(CX,CY,ZC+.02);SD.add(KISI);
const GLOW=new THREE.PointLight(C(PAL.aks),0,4,2);GLOW.position.set(CX,CY,ZC+.6);SD.add(GLOW);
{const dm=DM('#ffffff',{map:tDinamit,roughness:.7});const px=1.15,pyb=2.62+.13;
  [[0,-.27],[0,0],[0,.27]].forEach(([_,z],i)=>{});
  const tongkat=(y,z)=>{const g=new THREE.CylinderGeometry(.13,.13,1.15,18);g.rotateZ(Math.PI/2);const o=pasang(g,dm,SD,[px,y,z]);return o;};
  [-.27,0,.27].forEach(z=>tongkat(pyb,z));[-.135,.135].forEach(z=>tongkat(pyb+.235,z));tongkat(pyb+.47,0);
  [-.35,.35].forEach(dx=>{const t=pasang(new THREE.TorusGeometry(.33,.018,8,28),DM('#d6c7a3',{roughness:.9}),SD,[px+dx,pyb+.15,0]);t.rotation.y=Math.PI/2;});
  kotak(px-.75,px+.75,2.62,2.69,-.5,.5,bajaG,SD);}
pasang(new THREE.PlaneGeometry(10,10),new THREE.MeshBasicMaterial({map:tBayang,transparent:true,depthWrite:false}),SD,[0,.02,0]).rotation.x=-Math.PI/2;
// bingkai bidang potong bercahaya (kecil, hanya di sekitar bongkahan)
const BPOT=new THREE.Group();SD.add(BPOT);
{const s=new THREE.Shape();s.moveTo(-.7,-.7);s.lineTo(.7,-.7);s.lineTo(.7,.7);s.lineTo(-.7,.7);s.lineTo(-.7,-.7);
 BPOT.add(new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:C(PAL.aks),transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})));
 BPOT.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(s.getPoints().map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:C(PAL.aks),transparent:true,toneMapped:false})));
 BPOT.position.set(CX,CY,2);}

/* ---------- KAMERA (satu, ortografik ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[0,3.0,0],44],[3.0,[-.2,3.0,0],22],[5.0,[-.4,3.05,0],9],[8.4,[-.2,2.98,0],5.6]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;
  tg[0]+=nz(t*.35,1)*.02;tg[2]+=nz(t*.3,2)*.02;const w=h*W/H;Object.assign(KD,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});KD.updateProjectionMatrix();
  _v.set(...tg);KD.position.copy(_v).addScaledVector(ARAH,100);KD.lookAt(_v);matahari.position.copy(_v).add(new THREE.Vector3(14,24,12));matahari.target.position.copy(_v);
  const sh=clamp(h*.7,8,24);Object.assign(matahari.shadow.camera,{left:-sh,right:sh,top:sh,bottom:-sh,near:1,far:120});matahari.shadow.camera.updateProjectionMatrix();}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}

/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const[x,y]=keLayar(L.p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
tanda({t:'Logam uranium',s:'sebongkah kecil',p:[CX,CY+.35,ZC],o:[-90,-170],a:1.1,b:4.4,am:1});
tanda({t:'Dinamit',s:'pembanding ledakan kimia',p:[1.15,2.62+.5,0],o:[120,-190],a:1.9,b:4.4});
tanda({t:'Meja uji',s:'di dalam laboratorium',p:[1.9,2.5,1.6],o:[100,140],a:2.6,b:4.4});
tanda({t:'Susunan atom',s:'rapi, berderet seperti kisi',p:[CX+.25,CY+.25,ZC+.02],o:[150,-210],a:6.5,b:8.4,am:1});
const JEJAK=[[0,'LABORATORIUM'],[2.8,'LABORATORIUM › <b>LOGAM URANIUM</b>'],[4.7,'LOGAM URANIUM › <b>DIBELAH</b>'],[6.4,'LOGAM URANIUM › <b>SUSUNAN ATOM</b>']];

/* ---------- SCENE ---------- */
const KT='Kenapa bom atom bisa menghasilkan daya ledak yang luar biasa? Kita bongkar logamnya sampai ke dalam atom.'.split(' ');
const SCENE={dur:WAKTU.dur,
  kata:KT.map((w,i)=>({w,t0:.3+i*.4,t1:.3+i*.4+.36})),
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['bom','atom','ledak','luar','biasa','bongkar','logamnya','atom.']},
  audio:{vo:[],sfx:[],music:null},
  frame(t){
    kameraDunia(t);
    const kp=E.io(seg(t,...WAKTU.potong)),zc=lerp(.9,ZC+.001,kp);POTM.constant=zc;BPOT.position.z=zc+.01;
    BPOT.visible=t>WAKTU.potong[0]-.05&&t<WAKTU.potong[1]+.5;BPOT.children.forEach((c,i)=>c.material.opacity=(i?1:.14)*Math.sin(Math.PI*clamp(seg(t,WAKTU.potong[0]-.05,WAKTU.potong[1]+.5))));
    logam.rotation.y=nz(t*.2,3)*.04;
    const kl=sstep(...WAKTU.lattice,t);KISI.material.opacity=kl*(.8+.2*Math.sin(t*4));KISI.scale.setScalar(.9+.1*kl);GLOW.intensity=kl*.7;
    RD.render(SD,KD);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(44/(window.HC||44)))+'<small>ZOOM</small></span>';
    gambarTanda(t);
  }};
