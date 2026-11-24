
/* ---------- PANGGUNG INSET 1: penyelam di kedalaman puluhan meter (1 satuan = 10 m) ---------- */
const X1=70,X2=90;
const tProfil=teksturK(256,448,(x,w,h)=>{const sk=h*2/14;x.fillStyle='#e8f3f6';x.fillRect(0,0,w,sk);const g=x.createLinearGradient(0,sk,0,h);g.addColorStop(0,'#8fe3f0');g.addColorStop(.35,'#2f86c4');g.addColorStop(1,'#0e2f66');x.fillStyle=g;x.fillRect(0,sk,w,h-sk);
  for(let k=0;k<=12;k++){const y=sk+k*(h-sk)/12;x.strokeStyle=k%2?'rgba(255,255,255,.22)':'rgba(255,255,255,.7)';x.lineWidth=k%2?2:4;x.beginPath();x.moveTo(0,y);x.lineTo(k%2?30:60,y);x.stroke();if(!(k%2)&&k>0){x.fillStyle='#fff';x.font='700 26px sans-serif';x.fillText(k*10+' m',68,y+9);}}});
const BK1=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.MeshBasicMaterial({map:tProfil,toneMapped:false}));BK1.position.set(X1,-5,-3);SD.add(BK1);
function bikinPenyelam(){const g=new THREE.Group(),M=(h,o)=>new THREE.MeshStandardMaterial(Object.assign({color:C(h),roughness:.6},o)),su=M('#1f3a4a'),ab=M('#2f5a6e');
  const p=(geo,m,pos,rot)=>{const o=new THREE.Mesh(geo,m);o.position.set(...pos);if(rot)o.rotation.set(...rot);g.add(o);return o;};
  p(new THREE.CylinderGeometry(.2,.17,.7,18),su,[0,0,0]);p(new THREE.SphereGeometry(.19,18,14),M('#e8c9a8'),[0,.55,0]);p(new THREE.BoxGeometry(.3,.12,.1),M('#9fe0ff',{metalness:.3,roughness:.1}),[0,.58,.16]);
  p(new THREE.CylinderGeometry(.09,.09,.6,14),M('#9aa3aa',{metalness:.8,roughness:.4}),[0,.05,-.2]);
  [-1,1].forEach(s=>{p(new THREE.CylinderGeometry(.06,.05,.55,10),su,[s*.28,0,.02],[0,0,s*.25]);p(new THREE.CylinderGeometry(.075,.06,.62,10),su,[s*.1,-.62,0]);p(new THREE.BoxGeometry(.16,.04,.38),ab,[s*.1,-1.0,.14]);});
  g.scale.setScalar(1.7);return g;}
const DIV=bikinPenyelam();DIV.position.set(X1-1.8,.4,-1.2);SD.add(DIV);
const BAL1=new THREE.Mesh(new THREE.SphereGeometry(.8,28,20),new THREE.MeshStandardMaterial({color:C('#e04a3a'),roughness:.3,metalness:.1,envMapIntensity:1.2}));SD.add(BAL1);
const GH1=new THREE.Mesh(new THREE.SphereGeometry(.8,16,12),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.7,toneMapped:false}));SD.add(GH1);
const TALI1=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1,6),new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false}));SD.add(TALI1);
/* ---------- PANGGUNG INSET 2: balon, kaleng, botol air, kapsul titanium (rak tekanan) ---------- */
const tGelap=teksturK(64,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#1b4c82');g.addColorStop(1,'#050c1c');x.fillStyle=g;x.fillRect(0,0,w,h);});
const BK2=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.MeshBasicMaterial({map:tGelap,toneMapped:false}));BK2.position.set(X2,0,-3);SD.add(BK2);
const mAl=new THREE.MeshStandardMaterial({color:C('#c9ced2'),metalness:.9,roughness:.3,envMapIntensity:1.3}),mTi=new THREE.MeshStandardMaterial({color:C('#aeb4ba'),map:tSikatG,metalness:.9,roughness:.3,envMapIntensity:1.3});
const R2=new THREE.Group();R2.position.set(X2,0,0);SD.add(R2);
const batangR=new THREE.Mesh(new THREE.BoxGeometry(7.4,.12,.3),mAl);batangR.position.y=2.9;R2.add(batangR);
const IT=[-2.4,-.8,.8,2.4];
const BAL2=new THREE.Mesh(new THREE.SphereGeometry(.6,28,20),new THREE.MeshStandardMaterial({color:C('#e04a3a'),roughness:.3,metalness:.1,envMapIntensity:1.2}));BAL2.position.x=IT[0];R2.add(BAL2);
const CAN0=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.85,28),mAl);CAN0.position.x=IT[1];R2.add(CAN0);
const prof=[];for(let i=0;i<=24;i++){const y=lerp(-.42,.42,i/24);prof.push([.3*(.62+.2*Math.sin(i*1.9)+.1*Math.sin(i*5.3)),y]);}
const CAN1=new THREE.Mesh(new THREE.LatheGeometry(prof.map(([r,y])=>new THREE.Vector2(Math.max(.03,r),y)),20),mAl);CAN1.position.x=IT[1];CAN1.visible=false;R2.add(CAN1);
const BOT=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.9,24),new THREE.MeshStandardMaterial({color:C('#bfe6ff'),transparent:true,opacity:.35,roughness:.05}));BOT.position.x=IT[2];R2.add(BOT);
const BOTW=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.78,24),new THREE.MeshStandardMaterial({color:C('#2f86c4'),roughness:.2,emissive:C('#12406e'),emissiveIntensity:.5}));BOTW.position.x=IT[2];R2.add(BOTW);
const KAP2=new THREE.Mesh(new THREE.SphereGeometry(.5,32,22),mTi);KAP2.position.x=IT[3];R2.add(KAP2);const RG2=new THREE.Mesh(new THREE.TorusGeometry(.5,.06,10,40),mTi);RG2.rotation.x=Math.PI/2;RG2.position.x=IT[3];R2.add(RG2);
IT.forEach(x=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,2,6),new THREE.MeshBasicMaterial({color:0xcccccc,toneMapped:false}));t.position.set(x,1.9,0);R2.add(t);});
const PA2=IT.map(()=>[0,1,2,3].map(()=>bikinPanah()));
const d2=t=>10900*Math.pow(clamp((t-27.9)/8),3);
function aturInset2(t){const d=d2(t),f=clamp(Math.log10(1+d)/4.05);
  const s=Math.max(.13,Math.cbrt(1/(1+d/10)));BAL2.scale.setScalar(s);BAL2.position.y=-.1+.6*(1-s)*0;
  const kc=sstep(250,900,d);CAN0.visible=kc<.5;CAN1.visible=kc>=.5;CAN1.scale.set(1-.25*sstep(600,2000,d),1-.18*sstep(600,2000,d),1-.25*sstep(600,2000,d));CAN1.rotation.z=.2*kc;
  IT.forEach((x,i)=>{const c=[X2+x,[-.1,0,0,0][i]+(i==2?0:0),0],th=.02+.12*f*f,R=.95-.25*f,len=.35+.3*f;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy],k)=>{const hh=i==0?BAL2.scale.x*.6:.5;aturPanah(PA2[i][k],[c[0]+dx*(hh+R*.5),c[1]+dy*(hh+R*.5)+0,0],[c[0]+dx*(hh+R*.5-len),c[1]+dy*(hh+R*.5-len),0],th,d>5?1:0);});});}

/* ---------- KAMERA (ortografik, ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[0,-30,0],98],[3.0,[0,-12,0],62],[5.0,[0,-3,0],28],[6.2,[0,-3,0],20],[7.3,[0,-34,0],72],[8.7,[0,-58,ZR],30],[10.0,[0,-60,ZR],24],[12.8,[0,-60,ZR],22],[13.6,[RX,-2,ZR],26],[16.3,[RX,-8,ZR],26],[20.3,[RX,-26,ZR],36],[20.69,[RX,-3,ZR],22],[27.4,[RX,-3,ZR],22],[28.4,[0,-34,0],80],[35.9,[0,-38,0],80],[36.12,[RX,-62,ZR],14],[37.3,[RX,-64.3,ZR],6.4],[45.8,[RX,-64.3,ZR],6.0],[46.17,[0,-65.3,ZR],9],[52.6,[0,-65.4,ZR],7]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,200);cam.lookAt(_v);}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;window.CTY=tg[1];tg[0]+=nz(t*.35,1)*.03;tg[2]+=nz(t*.3,2)*.03;pasangKamera(KD,tg,h,h*W/H);}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
const KI=new THREE.OrthographicCamera(-1,1,1,-1,-400,400);
/* kedalaman & posisi kapsul */
const yKaps=t=>t<13.6?3.4:t<20.3?lerp(3.0,-24,E.io(seg(t,13.6,20.3))):t<27.9?-24:t<36.0?lerp(-24,-64.6,E.io(seg(t,27.9,36.0))):-64.6;
const dFokus=t=>t<6.38?0:t<13.6?Math.max(0,-window.CTY*165):t<20.69?Math.max(0,-yKaps(t)*165):t<27.9?Math.max(0,-(DIV.position.y)*10):t<36.0?d2(t):10900;

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
tanda({t:'Kapal riset',s:'di permukaan laut lepas',p:[-1.6,2.8,ZR-1.4],o:[-110,-200],a:1.3,b:3.5});
tanda({t:'Dasar palung',s:'jauh di bawah',p:[0,-66,0],o:[120,-240],a:2.1,b:5.6,am:1});
tanda({t:'Irisan lautan',s:'balok air raksasa',p:[7,-4,0],o:[-100,-220],a:3.9,b:6.2,am:1});
tanda({t:'Challenger Deep',s:'titik terdalam',p:[0,-66,0],o:[120,-280],a:7.5,b:10.6,big:1,am:1});
tanda({t:'±10,9 km',s:'dari permukaan laut',p:[3.4,-48,0],o:[110,-200],a:8.8,b:10.7});
tanda({t:'Zona hadal',s:'6.000–10.900 m',p:[6.2,-52,0],o:[-120,-210],a:9.6,b:11.0});
tanda({t:'Tekanan >1.000×',s:'tekanan di permukaan',p:[0,-65.2,ZR],o:[120,-280],a:11.8,b:13.4,big:1,am:1});
tanda({t:'Zona cahaya',s:'0–200 m, masih terang',p:[6.2,-.6,0],o:[-120,-210],a:13.8,b:15.4});
tanda({t:'Zona senja',s:'200–1.000 m, redup',p:[6.2,-3.6,0],o:[-120,-210],a:15.1,b:16.9});
tanda({t:'Gelap total',s:'di bawah ±1.000 m',p:[6.2,-11,0],o:[-120,-220],a:17.4,b:19.0,big:1,am:1});
tanda({t:'Zona tengah malam',s:'1.000–4.000 m',p:[6.2,-18,0],o:[110,-190],a:17.9,b:19.8});
tanda({t:'Suhu 1–4 °C',s:'beberapa derajat di atas nol',p:[6.2,-27,0],o:[-120,-210],a:18.7,b:20.5,am:1});
tanda({t:'Kapsul turun lurus',s:'dari kapal riset',p:t=>[RX,yKaps(t)+.9,ZR],o:[-130,-210],a:28.0,b:31.5,am:1});
tanda({t:'Kapsul titanium',s:'bertekanan, tahan banting',p:[RX,-64.0,ZR],o:[-130,-230],a:36.8,b:38.5,am:1});
tanda({t:'Dinding tebal',s:'titanium, kuat menahan tekanan',p:[RX-.8,-64.6,ZR],o:[-150,-200],a:38.4,b:41.5,am:1});
tanda({t:'Ruang sempit',s:'hanya cukup untuk beberapa orang',p:[RX+.1,-64.8,ZR],o:[150,190],a:39.6,b:42.6});
tanda({t:'Kehidupan di dasar',s:'berpendar lembut',p:[0,-65.4,ZR],o:[-40,-340],a:47.7,b:52.6,big:1,am:1});
tanda({t:'Ikan transparan',s:'tubuh bening',p:t=>[IKAN.position.x,IKAN.position.y,IKAN.position.z],o:[130,-120],a:48.1,b:52.6});
tanda({t:'Teripang',s:'bergerak pelan di lumpur',p:t=>[TERI.position.x,TERI.position.y,TERI.position.z],o:[-130,160],a:48.9,b:52.6});
tanda({t:'Amfipoda',s:'krustasea mungil',p:t=>[AMFI[0].position.x,AMFI[0].position.y,AMFI[0].position.z],o:[140,140],a:49.6,b:52.6});
const JEJAK=[[0,'LAUT LEPAS › <b>PALUNG MARIANA</b>'],[3.6,'BALOK AIR › <b>DIIRIS</b>'],[6.4,'<b>CHALLENGER DEEP</b>'],[13.6,'LAPISAN › <b>CAHAYA & SUHU</b>'],[20.7,'<b>PENYELAM BIASA</b>'],[27.9,'<b>TEKANAN</b> › RONGGA UDARA'],[36.1,'<b>KAPSUL</b> TITANIUM'],[46.2,'DASAR › <b>KEHIDUPAN</b>']];
