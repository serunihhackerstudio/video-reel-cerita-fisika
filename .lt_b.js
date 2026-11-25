
/* ---------- tekstur tambahan ---------- */
const tEs=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#dff4fa';x.fillRect(0,0,w,h);bintik(x,w,h,900,['#c5e8f2','#f2fcff','#b4dcea'],1,5,r);for(let i=0;i<24;i++){x.strokeStyle='rgba(120,180,205,.35)';x.lineWidth=1.5;x.beginPath();x.moveTo(r()*w,r()*h);x.lineTo(r()*w,r()*h);x.stroke();}},[.25,.25]);
const tKayu=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#8a6b46';x.fillRect(0,0,w,h);for(let i=0;i<128;i+=8){x.fillStyle=r()<.5?'rgba(0,0,0,.18)':'rgba(255,230,190,.12)';x.fillRect(0,i,w,2);}bintik(x,w,h,300,['#7a5d3b','#9a7b52'],1,2,r);},[2,2]);
const tDaun=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#ffffff';x.fillRect(0,0,w,h);bintik(x,w,h,900,['#e8e8e8','#f6f6f6','#d4d4d4','#bdbdbd'],1,4,r);},[2,2]);
const tAtap=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#a8452f';x.fillRect(0,0,w,h);for(let i=0;i<128;i+=10){x.fillStyle='rgba(0,0,0,.22)';x.fillRect(0,i,w,2);}bintik(x,w,h,300,['#98392a','#b8553a'],1,3,r);},[3,2]);

/* ---------- RENDERER, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=1.0;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-600,600);
SD.add(new THREE.HemisphereLight(C('#d6ecff'),C('#3a3224'),.6));
const SUN=new THREE.DirectionalLight(C('#fff3df'),2.5);SUN.castShadow=true;SUN.shadow.mapSize.set(3072,3072);SUN.shadow.bias=-.0004;SUN.shadow.normalBias=.05;SD.add(SUN,SUN.target);
Object.assign(SUN.shadow.camera,{left:-46,right:46,top:46,bottom:-46,near:1,far:300});SUN.shadow.camera.updateProjectionMatrix();
function sunKe(cx){SUN.position.set(cx+30,50,36);SUN.target.position.set(cx+4,-3,-6);SUN.target.updateMatrixWorld();}sunKe(0);
const tepiL=new THREE.DirectionalLight(C('#a9c8ff'),.6);tepiL.position.set(-30,10,-30);SD.add(tepiL);
const MT=(h,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:C(h),roughness:.7,metalness:0},o));
const sprite=()=>{const m=new THREE.SpriteMaterial({map:teksturK(64,64,(x)=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,230,120,.8)');g.addColorStop(1,'rgba(255,200,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64);}),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function mkStrip(pts,r,closed=false,col=PAL.aks){const cu=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),closed,'catmullrom',.25),N=closed?200:120,g=new THREE.TubeGeometry(cu,N,r,8,closed),tx=tAlir.clone();tx.needsUpdate=true;tx.repeat.set(cu.getLength()/1.6,1);
  const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:C(col),map:tx,transparent:true,depthWrite:false,toneMapped:false}));m.renderOrder=3;m.frustumCulled=false;
  return{cu,m,atur(isi,off,op){g.setDrawRange(0,Math.floor(clamp(isi)*N)*8*6);m.visible=isi>0&&op>.01;m.material.opacity=op;tx.offset.x=-off;}};}
const gh=x=>x<6?-10:x<20?-10+(x-6)*10/14:x<26?(x-20)*1.5/6:1.5+(x-26)*.5/8;

/* ---------- DUNIA LAUT (balok irisan) ---------- */
function bikinIkan(hex){const g=new THREE.Group(),m=MT(hex,{roughness:.45,metalness:.35,transparent:true});const b=new THREE.Mesh(new THREE.SphereGeometry(.5,14,10),m);b.scale.set(1.5,.7,.5);g.add(b);const t=new THREE.Mesh(new THREE.ConeGeometry(.34,.75,8),m);t.rotation.z=Math.PI/2;t.position.x=-.95;g.add(t);g.userData.mat=m;return g;}
function bikinKapal(){const g=new THREE.Group();
  const hs=new THREE.Shape([[-6,1.6],[5.5,1.6],[7.2,1.1],[5.4,-1.4],[-5.2,-1.4],[-6,-.8]].map(p=>new THREE.Vector2(...p)));const hg=new THREE.ExtrudeGeometry(hs,{depth:3.6,bevelEnabled:false});hg.translate(0,0,-1.8);
  const hull=new THREE.Mesh(hg,MT('#46627c',{map:tSikat,metalness:.8,roughness:.4,envMapIntensity:1.2}));hull.castShadow=true;g.add(hull);
  const gar=new THREE.Mesh(new THREE.BoxGeometry(12,.16,3.66),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));gar.position.set(.35,0,0);g.add(gar);
  const add=(geo,m,p)=>{const o=new THREE.Mesh(geo,m);o.position.set(...p);o.castShadow=true;g.add(o);return o;};
  const putih=MT('#eceff1',{map:tSikat,metalness:.4,roughness:.5});
  add(new THREE.BoxGeometry(3.6,2.2,2.6),putih,[-3,2.7,0]);add(new THREE.BoxGeometry(2.4,1.2,2.2),putih,[-3.4,4.4,0]);add(new THREE.BoxGeometry(2.6,.18,2.7),MT('#2d3a46'),[-3,3.82,0]);
  add(new THREE.CylinderGeometry(.5,.6,1.8,16),MT('#d64b3a',{metalness:.5,roughness:.45}),[-4.6,4.4,0]);add(new THREE.CylinderGeometry(.06,.06,3,6),MT('#9aa4ac',{metalness:.8}),[-2.6,6.6,0]);
  [['#d64b3a',0],['#2f78b7',1],['#e39a2b',2]].forEach(([h,i])=>add(new THREE.BoxGeometry(2.2,1.3,2.4),MT(h,{map:tSikatG,metalness:.5,roughness:.55}),[.8+i*2.3,2.25,0]));
  return g;}
function buatDunia(cx,fresh){
  const G=new THREE.Group();G.position.x=cx;SD.add(G);const D={G,fresh,reg:[],fish:[],birds:[],trees:[]};
  const ext=(pts,mat,capHex,sh=true)=>{const s=new THREE.Shape(pts.map(p=>new THREE.Vector2(...p)));const g=new THREE.ExtrudeGeometry(s,{depth:28,bevelEnabled:false});g.translate(0,0,-14);const m=new THREE.Mesh(g,mat);m.receiveShadow=sh;if(capHex)m.add(new THREE.Mesh(g,tutupM(capHex)));G.add(m);return m;};
  const reg=(mat,fadeHex,opEnd,grp)=>{D.reg.push({mat,base:mat.color.clone(),fade:C(fadeHex),op0:mat.opacity,op1:opEnd,grp});};
  // dasar laut, tanah pantai, air
  ext([[-26,-12],[-26,-10],[6,-10],[20,0],[20,-12]],MT('#ffffff',{map:salin(tPasir,.5,.5),roughness:1}),'#c9a56a');
  ext([[20,0],[26,1.5],[34,2],[34,-12],[20,-12]],MT('#ffffff',{map:salin(tRumput,.35,.35),roughness:1}),'#7a5c3e');
  const air=ext([[-26,-10],[6,-10],[20,0],[-26,0]],MT('#ffffff',{map:salin(tLaut,.25,.25),transparent:true,opacity:.55,roughness:.15,metalness:.1,envMapIntensity:1.5,depthWrite:false}),'#7fd6ee',false);air.renderOrder=2;
  // es kutub
  {const g=new THREE.BoxGeometry(1,3,28);const es=new THREE.Mesh(g,MT('#ffffff',{map:tEs,roughness:.25,metalness:.05,transparent:true,opacity:.95,clippingPlanes:[PLN],envMapIntensity:1.2}));es.add(new THREE.Mesh(g,tutupM('#eafcff')));es.castShadow=true;es.receiveShadow=true;es.renderOrder=3;G.add(es);D.es=es;}
  // kapal
  D.kapal=bikinKapal();D.kapal.position.set(-3,0,-6);G.add(D.kapal);
  // ikan
  {const r=rng(cx+11),warna=['#ff8f3a','#ffd23a','#7fc7ff','#ff6b8a','#c8d6e0','#ffa94d'];for(let i=0;i<15;i++){const f=bikinIkan(warna[i%warna.length]);const o={g:f,x0:-20+r()*34,y0:-7.4+r()*5.4,z0:i<11?-1.5-r()*10.5:2+r()*9,a:2+r()*3,s:.3+r()*.4,ph:r()*6.3,sc:.7+r()*.5};f.scale.setScalar(o.sc);G.add(f);D.fish.push(o);reg(f.userData.mat,'#a9c9d8',.28,'hidup');}}
  // karang
  {const r=rng(cx+5),w=['#ff7a59','#ff9ec4','#ffb347','#b57cff','#ff5d73'];for(let c=0;c<11;c++){const x=-23+c*2.7+r()*1.2,z=-11+r()*9,m=MT(w[c%w.length],{roughness:.75,transparent:true});const gr=new THREE.Group();gr.position.set(x,-10,z);for(let j=0;j<5;j++){const h=1.2+r()*1.8,k=new THREE.Mesh(new THREE.ConeGeometry(.22+r()*.14,h,7),m);k.position.set((r()-.5)*1.1,h/2-.1,(r()-.5)*1.1);k.rotation.set((r()-.5)*.5,0,(r()-.5)*.5);gr.add(k);}
    const b=new THREE.Mesh(new THREE.SphereGeometry(.7,12,8,0,6.283,0,1.57),m);b.position.set(.8,-.05,.6);gr.add(b);G.add(gr);reg(m,'#dfe6ea',.3,'hidup');}}
  // plankton
  {const N=280,pos=new Float32Array(N*3),r=rng(cx+3);for(let i=0;i<N;i++)pos.set([-23+r()*36,-3.4+r()*3,-12+r()*24],i*3);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    D.plank=new THREE.Points(g,new THREE.PointsMaterial({color:C('#e4ff8f'),size:5,sizeAttenuation:false,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));D.plank.frustumCulled=false;G.add(D.plank);}
  // penyu
  {const m=MT('#6e8f4e',{roughness:.7,transparent:true}),g=new THREE.Group();const sh=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,6.283,0,1.57),m);sh.scale.set(1.4,.7,1.1);g.add(sh);const hd=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),m);hd.position.set(1.5,0,0);g.add(hd);
    [[.7,.9],[.7,-.9],[-.8,.8],[-.8,-.8]].forEach(([x,z])=>{const f=new THREE.Mesh(new THREE.SphereGeometry(.5,8,6),m);f.scale.set(1.2,.2,.5);f.position.set(x,-.1,z);f.rotation.y=z>0?.5:-.5;g.add(f);});D.penyu=g;G.add(g);reg(m,'#cfdde0',.3,'hidup');}
  // bakau
  {const r=rng(cx+17);for(let i=0;i<8;i++){const x=17.5+i*1.0+r()*.8,z=i<6?-1.5-r()*10:2+r()*8,by=Math.max(gh(x),-.3)-.2,g=new THREE.Group();g.position.set(x,by,z);
      const tr=new THREE.Mesh(new THREE.CylinderGeometry(.16,.28,2.2,8),MT('#6b4a2e',{map:tKayu,roughness:.9}));tr.position.y=1.1;tr.castShadow=true;g.add(tr);
      for(let j=0;j<4;j++){const a=j*1.57+.5,ro=new THREE.Mesh(new THREE.ConeGeometry(.08,1.5,5),MT('#5a3d26',{roughness:.9}));ro.position.set(Math.cos(a)*.45,.55,Math.sin(a)*.45);ro.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);g.add(ro);}
      const m=MT('#3f8f4a',{map:tDaun,roughness:.85}),cp=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,1),m);cp.scale.set(1.35,.95,1.35);cp.position.y=2.7;cp.castShadow=true;g.add(cp);G.add(g);D.trees.push({g,cp,s:cp.scale.clone()});reg(m,'#c3a63c',1,'pantai');}}
  // kampung nelayan
  {const m1=MT('#ffffff',{map:tKayu,roughness:.9}),m2=MT('#ffffff',{map:tAtap,roughness:.85});[[28.2,-3],[30.8,-8],[32.4,-1.5],[29.6,4]].forEach(([x,z])=>{const g=new THREE.Group(),y=gh(x)+.9;g.position.set(x,y,z);const b=new THREE.Mesh(new THREE.BoxGeometry(2.4,1.5,2.1),m1);b.position.y=.75;b.castShadow=b.receiveShadow=true;g.add(b);
      const rf=new THREE.Mesh(new THREE.ConeGeometry(2.1,1.1,4),m2);rf.rotation.y=Math.PI/4;rf.position.y=2.05;rf.castShadow=true;g.add(rf);[[-1,-.9],[1,-.9],[-1,.9],[1,.9]].forEach(([a,c])=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.9,6),m1);s.position.set(a,-.1,c);g.add(s);});G.add(g);});}
  // perahu nelayan + tangkapan
  {const g=new THREE.Group();g.position.set(12.5,0,-3.5);const sh=new THREE.Shape([[-2,.7],[2.2,.7],[2.9,.25],[1.9,-.6],[-1.6,-.6]].map(p=>new THREE.Vector2(...p)));const hg=new THREE.ExtrudeGeometry(sh,{depth:1.4,bevelEnabled:false});hg.translate(0,0,-.7);const hl=new THREE.Mesh(hg,MT('#ffffff',{map:tKayu,roughness:.8}));hl.castShadow=true;g.add(hl);
    D.tangkap=[];for(let i=0;i<4;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.28,8,6),MT('#ff8f3a',{roughness:.5}));f.scale.set(1.5,.7,.6);f.position.set(-.8+i*.5,.9,(i%2-.5)*.4);g.add(f);D.tangkap.push(f);}
    D.perahu=g;G.add(g);}
  // burung laut
  for(let i=0;i<5;i++){const g=new THREE.Group(),m=MT('#f4f6f7',{roughness:.6}),a=new THREE.Mesh(new THREE.BoxGeometry(.9,.06,.28),m),b=a.clone();a.position.x=.42;b.position.x=-.42;g.add(a,b);G.add(g);D.birds.push({g,a,b,ph:i*1.3,R:3+i*.7});}
  // aliran: arus laut dalam (tiga ruas) dan rantai makanan (dua ruas)
  const P=[[-24,-1.2,-.3],[-25.3,-5,-.3],[-22.5,-8.6,-.3],[-9,-9,-.3],[4,-8.4,-.3],[9,-5,-.3],[10.5,-1.8,-.3],[5,-1,-.3],[-9,-1.1,-.3]],cuL=new THREE.CatmullRomCurve3(P.map(p=>new THREE.Vector3(...p)),true,'catmullrom',.3);
  const sub=(c,u0,u1,n=40)=>Array.from({length:n+1},(_,i)=>{const p=c.getPointAt(u0+(u1-u0)*i/n);return[p.x,p.y,p.z];});
  D.arus=[[0,.34],[.34,.66],[.66,1]].map(([a,b])=>mkStrip(sub(cuL,a,b),.34));D.arus.forEach(s=>G.add(s.m));
  D.rantai=[mkStrip([[-10,-1.7,-.3],[-7,-3.2,-.3],[-4,-4.4,-.3],[-1,-5.4,-.3]],.26,false,'#ffffff'),mkStrip([[-1,-5.4,-.3],[6,-6.5,-.3],[12,-5.2,-.3],[18,-1.8,-.3],[23,1.9,-.3],[29,3.6,-.3]],.26,false,'#ffffff')];D.rantai.forEach(s=>G.add(s.m));
  /* pembaruan per frame. p = {t, kb:daya apung, ki:es, kl:kehidupan laut, kc:pesisir, ku:arus, kr:rantai} (0 asin .. 1 tawar) */
  D.atur=function(p){const t=p.t,k=fresh?1:0,ap=a=>fresh?a:0;
    D.kapal.position.y=-.58*ap(p.kb)+Math.sin(t*1.1+cx)*.12;D.kapal.rotation.z=Math.sin(t*.8+cx)*.012;D.kapal.rotation.x=Math.sin(t*.6)*.01;
    const w=lerp(8,20,ap(p.ki));D.es.scale.x=w;D.es.position.set(-26+w/2,-.7+Math.sin(t*.7)*.04,0);
    D.reg.forEach(o=>{const q=o.grp==='hidup'?ap(p.kl):ap(p.kc);o.mat.color.copy(o.base).lerp(o.fade,q);o.mat.opacity=lerp(o.op0,o.op1,q);});
    D.fish.forEach(o=>{const x=o.x0+Math.sin(t*o.s+o.ph)*o.a,dx=Math.cos(t*o.s+o.ph);o.g.position.set(x,o.y0+Math.sin(t*o.s*1.7+o.ph)*.5,o.z0);o.g.rotation.y=dx>0?0:Math.PI;});
    D.plank.material.opacity=.9*(1-.88*ap(p.kl));D.plank.position.y=Math.sin(t*.8)*.12;
    D.penyu.position.set(11+Math.sin(t*.35)*3,-4.5+Math.sin(t*.6)*.3,-5.5);D.penyu.rotation.y=Math.cos(t*.35)>0?0:Math.PI;
    const kc=ap(p.kc);D.trees.forEach((o,i)=>{o.cp.scale.set(o.s.x,o.s.y*(1-.22*kc),o.s.z);o.cp.rotation.z=.22*kc*(i%2?1:-1);o.cp.position.y=2.7-.35*kc;});
    D.birds.forEach(o=>{const a=t*.6+o.ph,lv=kc;o.g.visible=lv<.985;o.g.position.set(16+Math.cos(a)*o.R+lv*70,7+Math.sin(a*1.3)*.8+lv*9,-5+Math.sin(a)*o.R*.8);o.g.rotation.y=-a;o.a.rotation.z=Math.sin(t*7+o.ph)*.5;o.b.rotation.z=-Math.sin(t*7+o.ph)*.5;});
    D.perahu.position.y=Math.sin(t*.9+cx)*.1;D.tangkap.forEach((f,i)=>{f.scale.setScalar(Math.max(.001,1-kc*1.2));f.visible=kc<.8;});
    const ku=ap(p.ku),kr=ap(p.kr);
    D.arus.forEach((s,i)=>{const op=(i===1?1-ku:1-.65*ku);s.atur(p.arusIsi,t*2.2+i,Math.max(0,op)*p.arusOp);});
    D.rantai.forEach((s,i)=>{const op=i===1?1-kr:1-.3*kr;s.atur(p.rantaiIsi[i],t*2,Math.max(0,op)*p.rantaiOp);});
  };
  return D;}
const DA=buatDunia(0,false),DB=buatDunia(200,true);
