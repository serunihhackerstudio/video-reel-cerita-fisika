
/* ---------- LUBANG CACING (hipotesis): dua corong + terowongan melengkung ---------- */
const WH=new THREE.Group();SD.add(WH);WH.scale.setScalar(.001);
[-11,11].forEach(x=>{const c=bikinCorong();c.scale.setScalar(.42);c.position.x=x;WH.add(c);});
{const cu=new THREE.CatmullRomCurve3([[-11,-3.6,0],[-8,-8.0,0],[-4,-11.0,0],[0,-11.7,0],[4,-11.0,0],[8,-8.0,0],[11,-3.6,0]].map(p=>new THREE.Vector3(...p)),false,'catmullrom',.4);
 const gt=new THREE.TubeGeometry(cu,120,.95,18,false),mt=new THREE.MeshStandardMaterial({color:C('#a8c8ff'),transparent:true,opacity:.3,roughness:.08,metalness:.2,envMapIntensity:1.8,side:THREE.DoubleSide,clippingPlanes:[POTF],depthWrite:false});
 const tb=new THREE.Mesh(gt,mt);tb.renderOrder=2;tb.add(new THREE.Mesh(gt,new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:.55})));WH.add(tb);
 window.WHS=strip(cu.getPoints(60).map(p=>[p.x,p.y,p.z]),.2);WHS.m.parent.remove(WHS.m);WH.add(WHS.m);}
/* ---------- panggung tarikan tidal (di luar pandangan utama, dilihat lewat dua inset) ---------- */
const TX=[70,90],TA=TX.map(x=>{const a=bikinAstronaut();a.position.set(x,2.2,0);SD.add(a);return a;});
function panah(x,y0,len){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false});const sh=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,1,10),m),hd=new THREE.Mesh(new THREE.ConeGeometry(.2,.45,14),m);g.add(sh,hd);g.userData={sh,hd};SD.add(g);g.position.set(x,y0,0);return g;}
const PAN=TX.map(x=>[panah(x+1.5,4.0,1),panah(x+1.5,.4,1)]);
function aturPanah(p,len){const{sh,hd}=p.userData;sh.scale.y=Math.max(.01,len);sh.position.y=-len/2;hd.rotation.z=Math.PI;hd.position.y=-len-.1;p.visible=len>.05;}

/* ---------- KAMERA (ortografik, ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[6,4,0],105],[3.5,[10,4,0],62],[5.3,[11,3,0],46],[7.0,[4,0,0],50],[9.5,[0,-1,0],44],[12.0,[0,-1,0],40],[14.2,[11,3,0],46],[17.5,[7,1,0],34],[20.7,[6,0,0],32],[22.0,[7,2,0],30],[26.4,[3,-1,0],24],[28.0,[1,-3,0],26],[28.7,[0,3.5,0],58],[39.0,[0,3.5,0],58],[40.2,[0,-4,0],28],[45.4,[0,-4,0],22],[46.6,[0,-2,0],78],[54.3,[0,-2,0],74],[55.8,[0,-2,0],78]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,200);cam.lookAt(_v);}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;tg[0]+=nz(t*.35,1)*.05;tg[2]+=nz(t*.3,2)*.05;pasangKamera(KD,tg,h,h*W/H);}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
const KI=new THREE.OrthographicCamera(-1,1,1,-1,-400,400);

/* ---------- posisi astronaut sepanjang permukaan corong ---------- */
function letakkan(g,r,naik=2.0){const y=YF(r),n=new THREE.Vector3(r,y+1.0,0).normalize();g.position.set(r,y+naik,0);g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),n.clone().add(new THREE.Vector3(0,1,0)).normalize());}
const rGhost=t=>4.2+15.8*Math.exp(-Math.max(0,t-15.0)*.62),rNyata=t=>12.7-1.86*Math.max(0,t-21.6);

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
tanda({t:'Astronaut',s:'melayang dekat black hole',p:[20,7.4,0],o:[-120,-200],a:1.3,b:4.8});
tanda({t:'Pesawat',s:'sederhana, bertenaga surya',p:[24,8.6,-4],o:[110,-190],a:1.9,b:4.8});
tanda({t:'Black hole raksasa',s:'bahkan cahaya tak lolos',p:[0,4.5,0],o:[-40,-230],a:1.9,b:4.8,am:1});
tanda({t:'Piringan gas',s:'berpijar karena panas',p:[11,.4,0],o:[90,170],a:2.7,b:4.8});
tanda({t:'Ruang-waktu',s:'lembaran kisi yang melengkung',p:[8,YF(8),0],o:[110,-190],a:5.6,b:7.2,am:1});
tanda({t:'Gravitasi sangat kuat',s:'ruang-waktu melengkung dalam',p:[12,YF(12),0],o:[-60,-210],a:7.9,b:10.0});
tanda({t:'Horizon peristiwa',s:'batas tanpa jalan kembali',p:[4,YF(4),0],o:[130,-230],a:10.4,b:12.7,big:1,am:1});
tanda({t:'Singularitas',s:'titik di dasar corong',p:[0,YF(.15)-.1,0],o:[-120,-60],a:11.6,b:14.2,am:1});
tanda({t:'Cahaya terperangkap',s:'jalurnya melengkung kembali',p:[6.7,5,0],o:[130,-230],a:12.6,b:14.3,am:1});
tanda({t:'Pengamat jauh',s:'melihat dari luar',p:[25,9.6,0],o:[-40,-290],a:14.6,b:21.2});
tanda({t:'Tampak dari luar',s:'astronaut kian lambat',p:t=>{const r=rGhost(t);return[r,YF(r)+2.2,0];},o:[-150,170],a:15.1,b:19.0});
tanda({t:'Melambat & memerah',s:'cahayanya tertarik gravitasi',p:[11,5.2,0],o:[90,-60],a:16.3,b:18.4,am:1});
tanda({t:'Membeku di tepi horizon',s:'tampak dari luar',p:[4.2,.2,0],o:[150,190],a:17.7,b:19.9,big:1,am:1});
tanda({t:'Dilatasi waktu',s:'waktu melambat dekat gravitasi kuat',p:[3,-2,0],o:[160,230],a:19.9,b:21.1,big:1,am:1});
tanda({t:'Astronaut',s:'merasa waktu normal',p:t=>{const r=rNyata(t);return[r,YF(r)+2.2,0];},o:[110,-200],a:21.5,b:25.7,am:1});
tanda({t:'Melintasi horizon',s:'tanpa tanda khusus baginya',p:[4,YF(4),0],o:[130,-220],a:25.9,b:27.6,am:1});
tanda({t:'Semua lintasan',s:'mengarah ke singularitas',p:[5,YF(5)+.3,0],o:[130,-200],a:40.4,b:43.0,am:1});
tanda({t:'Singularitas',s:'titik di pusat black hole',p:[0,YF(.15)-.1,0],o:[-90,-210],a:41.3,b:45.6,big:1,am:1});
tanda({t:'Fisika kita berhenti',s:'tak bisa menjelaskan di sini',p:[.5,YF(.15)+.4,0],o:[110,190],a:43.5,b:45.8,am:1});
tanda({t:'Lubang cacing',s:'dua corong, satu terowongan',p:[0,-11.6,0],o:[-120,200],a:46.1,b:50.0,big:1,am:1});
tanda({t:'Dua titik ruang-waktu',s:'dihubungkan terowongan',p:[-11,-3.6,0],o:[140,-120],a:48.1,b:50.1});
tanda({t:'Belum pernah teramati',s:'murni hitungan teori',p:[11,-3.6,0],o:[-120,-120],a:50.1,b:52.5});
tanda({t:'Materi eksotis',s:'agar terowongan stabil',p:[4,-11.2,0],o:[120,190],a:51.1,b:54.5,am:1});
tanda({t:'HIPOTESIS',s:'belum terbukti',p:[0,-9.2,0],o:[-60,-250],a:53.5,b:55.8,big:1,am:1});
const JEJAK=[[0,'RUANG ANGKASA › <b>BLACK HOLE</b>'],[5.1,'BLACK HOLE › <b>RUANG-WAKTU</b>'],[9.8,'RUANG-WAKTU › <b>HORIZON</b>'],[14.2,'ASTRONAUT › <b>DARI LUAR</b>'],[21.1,'ASTRONAUT › <b>DARI DALAM</b>'],[28.2,'<b>TARIKAN TIDAL</b>'],[39.3,'HORIZON › <b>SINGULARITAS</b>'],[45.8,'<b>LUBANG CACING</b> (HIPOTESIS)']];
