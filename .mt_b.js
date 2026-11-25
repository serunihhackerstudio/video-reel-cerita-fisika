
/* ---------- RENDERER, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=1.05;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-900,900);
const HEM=new THREE.HemisphereLight(C('#9db4e8'),C('#1a1410'),.5);SD.add(HEM);
const SUNL=new THREE.DirectionalLight(C('#fff1d0'),3.2);SD.add(SUNL,SUNL.target);
{const N=2200,pos=new Float32Array(N*3),col=new Float32Array(N*3),r=rng(21);for(let i=0;i<N;i++){const a=r()*6.283,b=Math.acos(2*r()-1),R=560+r()*60;pos.set([R*Math.sin(b)*Math.cos(a),R*Math.sin(b)*Math.sin(a),R*Math.cos(b)],i*3);const c=new THREE.Color().setHSL(.58+r()*.12,.3*r(),.7+r()*.3);col.set([c.r,c.g,c.b],i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));const st=new THREE.Points(g,new THREE.PointsMaterial({size:2.4,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,toneMapped:false}));st.frustumCulled=false;SD.add(st);}
const tGlow=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,214,110,.9)');g.addColorStop(.6,'rgba(255,170,40,.3)');g.addColorStop(1,'rgba(255,150,20,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const sprite=()=>{const m=new THREE.SpriteMaterial({map:tGlow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
/* ---------- tekstur ---------- */
const tMatahari=teksturK(512,256,(x,w,h,r)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#ffe9a0');g.addColorStop(.5,'#ffc84a');g.addColorStop(1,'#ffb02e');x.fillStyle=g;x.fillRect(0,0,w,h);bintik(x,w,h,2600,['#ffd978','#ffae35','#fff2b8','#f59a22'],2,10,r);},[1,1]);
const tBumi=teksturK(1024,512,(x,w,h,r)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2b7fc2');g.addColorStop(.5,'#1d63a6');g.addColorStop(1,'#2b7fc2');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let i=0;i<500;i++){x.strokeStyle='rgba(255,255,255,'+(.04+r()*.1)+')';x.lineWidth=1+r()*2;const a=r()*w,b=r()*h;x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(a+10,b-3,a+22,b);x.stroke();}
  const bl=(cx,cy,rx,ry,c1,c2)=>{for(let k=0;k<26;k++){const a=cx+(r()-.5)*rx*1.6,b=cy+(r()-.5)*ry*1.6,s=14+r()*30;x.fillStyle=r()<.6?c1:c2;x.beginPath();x.ellipse(a,b,s,s*(.6+r()*.5),r()*3,0,7);x.fill();}};
  bl(250,200,120,70,'#5b9448','#7da55a');bl(300,330,50,90,'#6f9a4f','#a08a5a');bl(640,190,150,60,'#6c9a47','#a89a62');bl(700,300,60,70,'#c4b27a','#8fa35a');bl(870,370,60,35,'#b8a46a','#7d9a4f');bl(480,120,40,25,'#88a85e','#a8b878');
  x.fillStyle='rgba(255,255,255,.9)';x.fillRect(0,0,w,26);x.fillRect(0,h-34,w,34);bintik(x,w,h,400,['rgba(255,255,255,.7)'],6,18,r,0,40);},[1,1]);
const tEs=teksturK(512,256,(x,w,h,r)=>{x.fillStyle='#e6f6fb';x.fillRect(0,0,w,h);bintik(x,w,h,1500,['#cfeaf4','#f6fdff','#b9dcea'],2,9,r);for(let i=0;i<60;i++){x.strokeStyle='rgba(130,185,210,.4)';x.lineWidth=1.5;x.beginPath();x.moveTo(r()*w,r()*h);x.lineTo(r()*w,r()*h);x.stroke();}},[1,1]);
const tAlirV=teksturK(16,128,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.3)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,.3)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tTitik=teksturK(16,128,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<4;i++){const g=x.createLinearGradient(0,i*32,0,i*32+22);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,i*32,w,22);}});
const lingkarTex=(stops)=>teksturK(256,256,(x,w,h)=>{const g=x.createRadialGradient(128,128,0,128,128,128);stops.forEach(([o,c])=>g.addColorStop(o,c));x.fillStyle=g;x.fillRect(0,0,w,h);});
/* ---------- MATAHARI, ORBIT ---------- */
const Ro=40,SUNR=7.5,ER=4;
const MAT=new THREE.Group();SD.add(MAT);
const sunMesh=new THREE.Mesh(new THREE.SphereGeometry(SUNR,48,32),new THREE.MeshBasicMaterial({map:tMatahari,toneMapped:false}));MAT.add(sunMesh);
const glowA=sprite(),glowB=sprite(),flash=sprite();
const orbit=new THREE.Mesh(new THREE.TorusGeometry(Ro,.09,6,260),new THREE.MeshBasicMaterial({color:C('#9db4d6'),transparent:true,opacity:.55,toneMapped:false,depthWrite:false}));orbit.rotation.x=Math.PI/2;SD.add(orbit);
/* ---------- BUMI (bidang potong: lingkaran bertumpuk) ---------- */
const EG=new THREE.Group();SD.add(EG);
const lap=(tex,o={})=>new THREE.MeshBasicMaterial(Object.assign({map:tex,transparent:false,toneMapped:false,depthWrite:false,side:THREE.DoubleSide},o));
const bumiMesh=new THREE.Mesh(new THREE.SphereGeometry(ER,64,40),new THREE.MeshStandardMaterial({map:tBumi,roughness:.85,metalness:0,clippingPlanes:[POTF]}));bumiMesh.rotation.z=23*DEG;EG.add(bumiMesh);
const esMesh=new THREE.Mesh(new THREE.SphereGeometry(ER+.04,64,40),new THREE.MeshStandardMaterial({map:tEs,roughness:.3,transparent:true,opacity:0,clippingPlanes:[POTF],depthWrite:false}));EG.add(esMesh);
const LAPISB=[['es','#dff4fb',ER],['laut','#2fa4d8',ER-.0],['kerak','#8a6a48',ER-.3],['mantel','#d8552b',ER-.78],['intiLuar','#ff9a1f',1.7],['intiDalam','#ffe27a',.78]];
const tMantel=lingkarTex([[0,'#ff7a2a'],[.45,'#e0561f'],[1,'#b73d17']]),tInti=lingkarTex([[0,'#fff4b0'],[.6,'#ffcf4a'],[1,'#ffa81f']]),tLuar=lingkarTex([[0,'#ffb33a'],[1,'#f27f12']]);
const DISK=LAPISB.map(([n,h,r],i)=>{const tex=n==='mantel'?tMantel:n==='intiLuar'?tLuar:n==='intiDalam'?tInti:null;const m=new THREE.Mesh(new THREE.CircleGeometry(1,96),tex?lap(tex):new THREE.MeshBasicMaterial({color:C(h),toneMapped:false,depthWrite:false,side:THREE.DoubleSide}));m.renderOrder=10+i;m.userData={n,r};EG.add(m);return m;});
const dDisk=n=>DISK.find(d=>d.userData.n===n);
/* ventilasi dasar laut, cacing tabung, gelembung panas */
const VENT=[34,74,112].map(a=>{const g=new THREE.Group(),r=ER-.3;g.position.set(r*Math.cos(a*DEG),r*Math.sin(a*DEG),-.1);g.rotation.z=(a-90)*DEG;
  const kon=new THREE.Mesh(new THREE.ConeGeometry(.2,.5,8),new THREE.MeshStandardMaterial({color:C('#4a3a2c'),roughness:.9}));kon.position.y=.2;g.add(kon);
  const cw=new THREE.MeshStandardMaterial({color:C('#e0463a'),roughness:.6,emissive:C('#601510')});for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.03,.035,.22+i*.03,6),cw);c.position.set((i-2)*.1,.42,.12*((i%2)-.5));c.rotation.z=(i-2)*.12;g.add(c);}
  const gl=sprite();g.userData={gl,a};EG.add(g);return g;});
const GEL=[...Array(18)].map(()=>{const s=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshBasicMaterial({color:C('#ffd27a'),transparent:true,opacity:0,toneMapped:false}));EG.add(s);return s;});
/* ---------- strip bercahaya (silinder antara dua titik) ---------- */
function mkLink(col,r,tex){const geo=new THREE.CylinderGeometry(r,r,1,10,1,true),mt=new THREE.MeshBasicMaterial({color:C(col),map:tex.clone(),transparent:true,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});mt.map.needsUpdate=true;const m=new THREE.Mesh(geo,mt);m.renderOrder=20;m.visible=false;SD.add(m);const hd=sprite();
  return{m,atur(A,B,u0,u1,off,op,rep=.7){const a=A.clone().lerp(B,u0),b=A.clone().lerp(B,u1),d=b.clone().sub(a),L=d.length();if(L<.05||op<.01){m.visible=false;spr(hd,[0,0,0],1,0);return;}m.visible=true;m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());m.scale.set(1,L,1);mt.map.repeat.set(1,L*rep);mt.map.offset.y=-off;mt.opacity=op;spr(hd,[b.x,b.y,b.z],r*9,op*.8);}};}
const LINK_CAH=mkLink('#ffe27a',.22,tAlirV),LINK_GRAV=mkLink('#ffb020',.16,tTitik);
const HEAT=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,-.2),new THREE.Vector3(.4*Math.cos((34+i*38)*DEG)*2,.4*Math.sin((34+i*38)*DEG)*2,-.2),new THREE.Vector3(2.2*Math.cos((38+i*38)*DEG)*1.0,2.2*Math.sin((38+i*38)*DEG)*1.0,-.2),new THREE.Vector3((ER-.35)*Math.cos((34+i*38)*DEG),(ER-.35)*Math.sin((34+i*38)*DEG),-.2)]),60,.07,8),new THREE.MeshBasicMaterial({color:C(PAL.aks),map:tAlir.clone(),transparent:true,depthWrite:false,toneMapped:false}));m.material.map.needsUpdate=true;m.material.map.repeat.set(7,1);m.renderOrder=22;m.visible=false;EG.add(m);return m;});
