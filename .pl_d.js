
S_B1.m.material.clippingPlanes=[POTL];S_B2.m.material.clippingPlanes=[POTL];
function bingkai(w,h){const g=new THREE.Group();SD.add(g);const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.lineTo(-w/2,-h/2);
  g.add(new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:C(PAL.aks),transparent:true,opacity:.1,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})));
  g.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(s.getPoints().map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:C(PAL.aks),transparent:true,toneMapped:false})));return g;}
const FRE=bingkai(150,46),FRL=bingkai(60,16);FRE.position.set(0,-12,0);FRL.position.set(LX,-1,0);
function aturBingkai(g,z,t0,t1,t,dx=0){const k=Math.sin(Math.PI*clamp(seg(t,t0,t1+.5)));g.position.z=z+.01;g.visible=t>t0&&t<t1+.5;g.children.forEach((c,i)=>c.material.opacity=(i?1:.12)*k);}

/* ---------- KAMERA (ortografik, ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[0,-18,0],130],[3.0,[0,-6,0],60],[5.0,[2,1.2,0],20],[6.0,[2,1.5,0],15],[7.2,[0,-50,0],150],[9.0,[0,-104,0],340],[25.6,[0,-104,0],340],[26.9,[2.5,1.6,0],9],[34.3,[2.5,1.6,0],9],[34.7,[2.5,1.5,0],10],[42.0,[2.5,1.5,0],10],[43.0,[2.5,1.6,0],14],[48.85,[2.5,1.6,0],62],[48.9,[2.5,1.6,0],62],[49.0,[LX,2,0],80],[50.0,[LX,0,0],68],[58.2,[LX,0,0],52]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;window.CTX=tg;tg[0]+=nz(t*.35,1)*h*.001;
  const w=h*W/H;Object.assign(KD,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});KD.updateProjectionMatrix();_v.set(...tg);KD.position.copy(_v).addScaledVector(ARAH,1500);KD.lookAt(_v);}
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
const yP=x=>yS(x,ZR);
tanda({t:'Pelari',s:'berpakaian lari sederhana',p:[0,3.6,ZR],o:[-90,-200],a:1.5,b:4.3,am:1});
tanda({t:'Jalan lurus',s:'panjang di dataran luas',p:[16,yP(16)+.1,ZR],o:[90,170],a:2.3,b:4.3});
tanda({t:'Atmosfer tipis',s:'lapisan udara di atas',p:[-14,yS(-14,0)+7,0],o:[120,150],a:3.6,b:7.6,am:1});
tanda({t:'Kerak Bumi',s:'permukaan potong berwarna',p:[-10,yS(-10,0)-3,0],o:[-100,190],a:4.7,b:7.6});
tanda({t:'Udara',s:'campuran molekul gas',p:[9,yS(9,0)+3.5,0],o:[100,-210],a:5.0,b:7.6,am:1});
tanda({t:'Keliling Bumi',s:'≈ 40.000 km',p:[(R+TA+3)*Math.sin(1.1),CY+(R+TA+3)*Math.cos(1.1),0],o:[-120,-190],a:9.3,b:11.2,am:1});
tanda({t:'Molekul udara',s:'titik-titik kecil di depan pelari',p:[8,yP(8)+2.5,ZR],o:[110,-220],a:29.4,b:31.5,am:1});
tanda({t:'Tumbukan',s:'energi sangat besar',p:[2.0,yP(2)+1.6,ZR],o:[-110,-200],a:30.0,b:32.0});
tanda({t:'Plasma panas',s:'udara memadat dan meledak',p:[3.2,yP(3)+1.8,ZR],o:[120,-230],a:33.0,b:34.4,big:1,am:1});
tanda({t:'Jalan memendek',s:'kontraksi panjang ÷7',p:[22,yP(22)+.2,ZR],o:[-60,170],a:37.6,b:39.6,am:1});
tanda({t:'Pelari memipih',s:'searah geraknya',p:[0,3.4,ZR],o:[-120,-190],a:37.9,b:39.8,am:1});
tanda({t:'Ruang hampa',s:'tanpa udara penghambat',p:[LX-16,0,0],o:[-120,-200],a:52.3,b:55.0});
tanda({t:'Proton di LHC',s:'≈ 99,999999% kecepatan cahaya',p:[LX+16,0,0],o:[-100,-250],a:53.4,b:58.2,am:1});
tanda({t:'LHC',s:'akselerator partikel',p:[LX,.8,-16],o:[110,-230],a:55.9,b:58.2,big:1,am:1});
const JEJAK=[[0,'BUMI › <b>PELARI</b>'],[4.4,'BUMI › <b>DIIRIS</b>'],[6.0,'<b>KELILING BUMI</b> 40.000 km'],[11.4,'PELARI › <b>0,99 c</b>'],[17.0,'<b>ENERGI</b> › MENDEKATI c'],[26.0,'<b>UDARA</b> › PLASMA'],[34.6,'<b>RELATIVITAS</b> KHUSUS'],[42.4,'<b>LEDAKAN</b> ENERGI'],[49.3,'<b>BATAS</b> ALAM SEMESTA']];
