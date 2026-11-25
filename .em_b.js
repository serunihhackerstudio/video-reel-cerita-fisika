/* ---------- RENDERER, KAMERA, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=.95;RD.localClippingEnabled=true;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.setClearColor(0,0);RD.autoClear=false;$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene(),SS=new THREE.Scene();
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-900,900),KS=new THREE.OrthographicCamera(-1,1,1,-1,-5000,5000);
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL)),_v=new THREE.Vector3();
function pasangKamera(cam,tg,h,w,D){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2,near:400-D,far:400+D});cam.updateProjectionMatrix();_v.set(tg.x,tg.y,tg.z);cam.position.copy(_v).addScaledVector(ARAH,400);cam.lookAt(_v);}
pasangKamera(KS,{x:0,y:0,z:0},1500,1500*W/H,5000);
const HEM=new THREE.HemisphereLight(C('#a8b8ff'),C('#2a1c10'),.55);SD.add(HEM);
const SUNL=new THREE.DirectionalLight(C('#fff0d2'),2.3);SUNL.position.set(16,26,12);SUNL.castShadow=true;SUNL.shadow.mapSize.set(2048,2048);
Object.assign(SUNL.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:1,far:90});SUNL.shadow.bias=-.0006;SUNL.shadow.normalBias=.02;SD.add(SUNL,SUNL.target);
{const N=2600,pos=new Float32Array(N*3),col=new Float32Array(N*3),r=rng(21);for(let i=0;i<N;i++){pos.set([(r()*2-1)*900,(r()*2-1)*900,(r()*2-1)*900],i*3);const c=new THREE.Color().setHSL(.6+r()*.15,.35*r(),.65+r()*.35);col.set([c.r,c.g,c.b],i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));SS.add(new THREE.Points(g,new THREE.PointsMaterial({size:2.4,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,toneMapped:false})));}
/* ---------- tekstur ---------- */
const glowTex=(a,b,c)=>teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,a);g.addColorStop(.28,b);g.addColorStop(.65,c);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tGlowG=glowTex('rgba(255,255,255,1)','rgba(255,214,110,.85)','rgba(255,160,40,.22)'),tGlowB=glowTex('rgba(255,255,255,1)','rgba(170,200,255,.8)','rgba(90,130,255,.2)'),tGlowO=glowTex('rgba(255,240,200,1)','rgba(255,150,50,.75)','rgba(220,70,20,.2)'),tGlowP=glowTex('rgba(255,255,255,.9)','rgba(170,140,255,.55)','rgba(110,70,210,.14)');
const sprite=(tex=tGlowG,par=SD)=>{const m=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;par.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
const tAlirV=teksturK(16,128,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.3)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,.3)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tTitik=teksturK(16,128,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<4;i++){const g=x.createLinearGradient(0,i*32,0,i*32+22);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,i*32,w,22);}});
const lingkarTex=(stops)=>teksturK(256,256,(x,w,h)=>{const g=x.createRadialGradient(128,128,0,128,128,128);stops.forEach(([o,c])=>g.addColorStop(o,c));x.fillStyle=g;x.fillRect(0,0,w,h);});
const V3=THREE.Vector3;
/* strip bercahaya (silinder antara dua titik) */
function mkLink(col,r,tex,par=SD){const geo=new THREE.CylinderGeometry(r,r,1,10,1,true),mt=new THREE.MeshBasicMaterial({color:C(col),map:tex.clone(),transparent:true,depthWrite:false,toneMapped:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});mt.map.needsUpdate=true;const m=new THREE.Mesh(geo,mt);m.renderOrder=20;m.visible=false;par.add(m);const hd=sprite(tGlowG,par);
  return{m,hd,off(){m.visible=false;hd.visible=false;},atur(A,B,u0,u1,off,op,rep=.7){const a=A.clone().lerp(B,u0),b=A.clone().lerp(B,u1),d=b.clone().sub(a),L=d.length();if(L<.003||op<.01){m.visible=false;hd.visible=false;return;}m.visible=true;m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.clone().normalize());m.scale.set(1,L,1);mt.map.repeat.set(1,Math.max(.2,L*rep));mt.map.offset.y=-off;mt.opacity=op;spr(hd,[b.x,b.y,b.z],r*9,op*.9);}};}
/* ---------- BATUAN BERURAT EMAS (shader: urat 3D yang sama di luar dan di bidang potong) ---------- */
const VEINGL=`
float h31(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float vn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h31(i),h31(i+vec3(1,0,0)),f.x),mix(h31(i+vec3(0,1,0)),h31(i+vec3(1,1,0)),f.x),f.y),mix(mix(h31(i+vec3(0,0,1)),h31(i+vec3(1,0,1)),f.x),mix(h31(i+vec3(0,1,1)),h31(i+vec3(1,1,1)),f.x),f.y),f.z);}
float vein(vec3 p){float n=vn(p*1.5)*1.3+vn(p*3.4)*.4;
 float a=abs(sin(p.x*2.1+p.y*1.3+n*3.4)),b=abs(sin(p.z*2.6-p.y*1.9+n*2.9+1.7));
 float ma=smoothstep(.26,.44,vn(p*.9+3.1)),mb=smoothstep(.36,.52,vn(p*1.1+7.7));
 float v=(1.-smoothstep(.0,.17,a))*ma+(1.-smoothstep(.0,.12,b))*mb;v+=step(.93,vn(p*8.))*.8;return clamp(v,0.,1.);}`;
function pasangUrat(mat,frag){mat.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.)).xyz;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;\nfloat VV;\n'+VEINGL);frag(sh);};return mat;}
const ENV=petaPantul(RD);
const rockMat=pasangUrat(new THREE.MeshStandardMaterial({color:0xffffff,roughness:.92,metalness:0,envMap:ENV,envMapIntensity:.28,clippingPlanes:[POTR]}),sh=>{
  sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
  VV=vein(vWP);vec3 rk=mix(vec3(.05,.04,.035),vec3(.15,.125,.1),vn(vWP*4.5));rk=mix(rk,vec3(.34,.32,.3),smoothstep(.7,.84,vn(vWP*2.2+4.))*.5);rk*=.8+.4*vn(vWP*19.);
  diffuseColor.rgb=mix(rk,vec3(.95,.62,.14),VV);`).replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.22,VV);').replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor=mix(metalnessFactor,1.,VV);').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(.5,.32,.06)*VV*.55;');});
const capMat=pasangUrat(new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.BackSide,clippingPlanes:[POTR],toneMapped:false}),sh=>{
  sh.fragmentShader=sh.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
  float cv=vein(vWP);vec3 cb=mix(vec3(.012,.085,.1),vec3(.03,.2,.23),vn(vWP*6.));cb*=.8+.5*vn(vWP*24.);cb+=vec3(.0,.03,.03)*smoothstep(.5,.9,vn(vWP*2.));
  diffuseColor.rgb=mix(cb,vec3(1.1,.62,.12)*1.15,cv);`);});
/* tanah, bumi, pita lain memakai bahan standar */
const GOLD=new THREE.MeshStandardMaterial({color:C('#f2b73f'),metalness:1,roughness:.24,envMap:ENV,envMapIntensity:1.3});
const GOLD2=new THREE.MeshStandardMaterial({color:C('#ffd25a'),metalness:1,roughness:.12,envMap:ENV,envMapIntensity:1.5,emissive:C('#3a2400')});
/* ================== DUNIA LUAR: meja, cincin, batu, tambang, Bumi ================== */
const GA=new THREE.Group();SD.add(GA);
const RINGP=new V3(-2.2,1.2,.2),ROCKP=new V3(2.6,.045,.4);
const tWood=teksturK(512,256,(x,w,h,r)=>{x.fillStyle='#6b4528';x.fillRect(0,0,w,h);for(let i=0;i<190;i++){x.strokeStyle=`rgba(${r()<.5?30:150},${r()<.5?18:100},${r()<.5?8:60},${.05+r()*.12})`;x.lineWidth=1+r()*2;const y=r()*h;x.beginPath();x.moveTo(0,y);x.bezierCurveTo(w*.3,y+r()*8-4,w*.6,y+r()*8-4,w,y+r()*6-3);x.stroke();}},[1,1]);
const tKain=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#3d1733';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=r()<.5?'rgba(255,200,230,.05)':'rgba(0,0,0,.12)';x.fillRect(r()*w,r()*h,1+r()*2,1+r()*2);}},[3,2]);
const mWood=new THREE.MeshStandardMaterial({map:tWood,roughness:.6}),mKain=new THREE.MeshStandardMaterial({map:tKain,roughness:.95});
function kt(x0,x1,y0,y1,z0,z1,m,par=GA){const o=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,y1-y0,z1-z0),m);o.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);o.castShadow=o.receiveShadow=true;par.add(o);return o;}
kt(-8,8,-.8,0,-5,5,mWood);[[-7.4,-4.4],[6.7,-4.4],[-7.4,3.7],[6.7,3.7]].forEach(([x,z])=>kt(x,x+.7,-4.2,-.8,z,z+.7,mWood));
kt(-5.5,6.2,0,.03,-3.3,3.6,mKain);
const ringG=new THREE.Group();ringG.position.copy(RINGP);GA.add(ringG);
{const cin=new THREE.Mesh(new THREE.TorusGeometry(1,.17,40,120),GOLD);cin.castShadow=cin.receiveShadow=true;ringG.add(cin);
 const ban=new THREE.Mesh(new THREE.TorusGeometry(1,.115,24,120),GOLD2);ban.scale.set(1,1,1.45);ban.position.z=0;ringG.add(ban);ban.castShadow=true;}
const glowRing=sprite(tGlowG,GA);
/* bongkahan batu */
const batuGeo=(()=>{const g=new THREE.IcosahedronGeometry(1.5,4),p=g.attributes.position,r=rng(9);const n=(x,y,z)=>Math.sin(x*2.3+y*1.1)*Math.cos(z*2.1-x*.7)*.5+Math.sin(y*3.1+z*1.7)*.3+Math.sin(x*5+z*4+y*3)*.1;
  let ymin=1e9;for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);const k=1+.22*n(x,y,z);x*=k*1.18;y*=k*.8;z*=k*1.0;y=Math.max(y,-.78);p.setXYZ(i,x,y,z);ymin=Math.min(ymin,y);}
  for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)-ymin);g.computeVertexNormals();return g;})();
const batu=new THREE.Mesh(batuGeo,rockMat);batu.position.copy(ROCKP);batu.castShadow=batu.receiveShadow=true;GA.add(batu);
{const cap=new THREE.Mesh(batuGeo,capMat);cap.position.copy(ROCKP);GA.add(cap);}
const mKuarsa=new THREE.MeshStandardMaterial({color:C('#e8eef4'),roughness:.12,metalness:0,transparent:true,opacity:.82,envMap:ENV,envMapIntensity:1.2});
[[.7,1.35,-.5,.14,.7,.3],[1.05,1.15,-.1,.1,.55,-.4],[.4,1.45,.35,.12,.5,.5]].forEach(([x,y,z,r,l,rot])=>{const k=new THREE.Mesh(new THREE.CylinderGeometry(r*.5,r,l,6),mKuarsa);k.position.set(ROCKP.x+x-.5,ROCKP.y+y-.15,ROCKP.z+z);k.rotation.set(rot,0,-rot*.8);k.castShadow=true;GA.add(k);});
const tBingkai=teksturK(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,214,110,.16)');g.addColorStop(1,'rgba(255,214,110,.03)');x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,214,110,.9)';x.lineWidth=4;x.strokeRect(5,5,w-10,h-10);});
const bingkai=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3.4),new THREE.MeshBasicMaterial({map:tBingkai,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0,side:THREE.DoubleSide}));bingkai.visible=false;bingkai.position.set(ROCKP.x,1.2,3);GA.add(bingkai);
/* tanah, perbukitan, tambang terasering */
const RE=1100,EC=new V3(0,-4-RE,0),TC=[20,-25],PIT=[62,-60],PITR=34;
const sy=(x,z)=>EC.y+Math.sqrt(RE*RE-x*x-z*z),sm=(a,b,x)=>{const k=Math.min(1,Math.max(0,(x-a)/(b-a)));return k*k*(3-2*k);};
function hills(x,z){const dt=Math.hypot(x-TC[0],z-TC[1]);if(dt>127)return -.6;
  const n=Math.sin(x*.045+1.3)*Math.cos(z*.05)+Math.sin((x+z)*.03+2)*.8+Math.sin(x*.11+z*.07)*.35+Math.cos(z*.09-x*.06)*.3;
  const dp=Math.hypot(x-PIT[0],z-PIT[1]),t=dp/PITR;let o=(n+1.6)*4.4*sm(14,34,Math.hypot(x,z))*sm(1.0,1.5,t);
  const s=Math.min(1,t)*6,fl=Math.floor(s),fr=s-fl,st=(fl+sm(.7,1,fr))/6;
  o+=-24*(1-Math.min(1,st))*(1-sm(1.0,1.2,t));o+=3.2*Math.exp(-Math.pow((dp-PITR*1.1)/6,2));
  const ew=sm(95,125,dt);o=o*(1-ew)-.3*ew;return o;}
const gy=(x,z)=>sy(x,z)+hills(x,z);
const terrain=(()=>{const N=140,g=new THREE.PlaneGeometry(280,280,N,N);g.rotateX(-Math.PI/2);g.translate(TC[0],0,TC[1]);const p=g.attributes.position,col=new Float32Array(p.count*3),r=rng(5);
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);p.setY(i,gy(x,z));const dp=Math.hypot(x-PIT[0],z-PIT[1]),t=dp/PITR,h=hills(x,z),j=.88+r()*.24;let c;
   if(t<1.12){const lv=Math.floor(Math.min(1,t)*6),odd=lv%2;c=t<.08?[.34,.24,.17]:odd?[.62,.46,.30]:[.52,.37,.25];if(r()<.012)c=[1,.72,.2];}
   else if(Math.hypot(x,z)<22){c=[.34,.43,.24];}
   else{const a=Math.min(1,Math.max(0,h/12));c=[.27+.12*a,.43+.1*a,.2+.08*a];if(h>11)c=[.45,.42,.33];if(t<1.5)c=[c[0]*.6+.62*.4,c[1]*.6+.46*.4,c[2]*.6+.3*.4];}
   col.set([Math.pow(c[0]*j,2.2),Math.pow(c[1]*j,2.2),Math.pow(c[2]*j,2.2)],i*3);}
  g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.95}));m.receiveShadow=true;GA.add(m);return m;})();
/* pohon */
{const N=340,r=rng(33),cone=new THREE.ConeGeometry(1.3,3.4,6),im=new THREE.InstancedMesh(cone,new THREE.MeshStandardMaterial({color:C('#2d5a2b'),roughness:.9}),N),M=new THREE.Matrix4(),q=new THREE.Quaternion(),s=new V3();let n=0,tries=0;
 while(n<N&&tries<6000){tries++;const x=TC[0]+(r()*2-1)*115,z=TC[1]+(r()*2-1)*115;if(Math.hypot(x-TC[0],z-TC[1])>108||Math.hypot(x,z)<24||Math.hypot(x-PIT[0],z-PIT[1])<PITR*1.55)continue;const y=gy(x,z),k=.8+r()*.9;s.set(k,k*(.9+r()*.5),k);M.compose(new V3(x,y+1.6*k,z),q,s);im.setMatrixAt(n++,M);}
 im.count=n;im.castShadow=true;GA.add(im);}
/* bangunan tambang + truk */
const mKuning=new THREE.MeshStandardMaterial({color:C('#e0a52a'),roughness:.55}),mAbu=new THREE.MeshStandardMaterial({color:C('#8a8f95'),roughness:.5,metalness:.4}),mAtap=new THREE.MeshStandardMaterial({color:C('#7a3b2a'),roughness:.8});
{const bx=PIT[0]-46,bz=PIT[1]+18,y=gy(bx,bz);kt(bx-5,bx+5,y,y+4.2,bz-3,bz+3,mAbu);kt(bx-5.4,bx+5.4,y+4.2,y+4.8,bz-3.4,bz+3.4,mAtap);
 const mx=PIT[0]-44,mz=PIT[1]-26,y2=gy(mx,mz);kt(mx-.5,mx+.5,y2,y2+11,mz-.5,mz+.5,mAbu);kt(mx-3,mx+3,y2+11,y2+12,mz-.3,mz+.3,mAbu);kt(mx+2.4,mx+3.4,y2+7,y2+11,mz-.5,mz+.5,mKuning);}
const TRUK=[0,1,2].map(i=>{const g=new THREE.Group();kt(-1.7,1.7,.5,2.1,-1,1,mKuning,g);kt(.9,1.9,2.1,3.3,-.9,.9,mAbu,g);kt(-1.6,-.2,2.1,2.8,-.9,.9,mAbu,g);GA.add(g);return g;});
/* Bumi di ruang angkasa (lubang dibuat di bola agar tambang menempel mulus) */
const tBumi=teksturK(1024,512,(x,w,h,r)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2b7fc2');g.addColorStop(.5,'#1d63a6');g.addColorStop(1,'#2b7fc2');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let i=0;i<500;i++){x.strokeStyle='rgba(255,255,255,'+(.04+r()*.1)+')';x.lineWidth=1+r()*2;const a=r()*w,b=r()*h;x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(a+10,b-3,a+22,b);x.stroke();}
  const bl=(cx,cy,rx,ry,c1,c2,n=34)=>{for(let k=0;k<n;k++){const a=cx+(r()-.5)*rx*1.6,b=cy+(r()-.5)*ry*1.6,s=14+r()*30;x.fillStyle=r()<.6?c1:c2;x.beginPath();x.ellipse(a,b,s,s*(.6+r()*.5),r()*3,0,7);x.fill();}};
  bl(250,200,120,70,'#5b9448','#7da55a');bl(300,330,50,90,'#6f9a4f','#a08a5a');bl(640,190,150,60,'#6c9a47','#a89a62');bl(700,300,60,70,'#c4b27a','#8fa35a');bl(870,370,60,35,'#b8a46a','#7d9a4f');bl(480,120,40,25,'#88a85e','#a8b878');bl(520,230,60,40,'#6c9a47','#5b9448');
  bl(768,256,90,60,'#6c9a47','#7da55a',60);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(0,0,w,10);x.fillRect(0,h-10,w,10);},[1,1]);
const bumiBesar=new THREE.Mesh(new THREE.SphereGeometry(RE,160,96),pasangUrat(new THREE.MeshStandardMaterial({map:tBumi,roughness:.85}),sh=>{
  sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','if(length(vWP.xz-vec2('+TC[0]+'.,'+TC[1]+'.))<126.5&&vWP.y>-300.)discard;\n#include <map_fragment>');}));
bumiBesar.position.copy(EC);bumiBesar.rotation.x=Math.PI/2;tBumi.offset.x=0;GA.add(bumiBesar);
const udara=sprite(glowTex('rgba(120,170,255,0)','rgba(110,160,255,.0)','rgba(110,160,255,.0)'),GA);
const tUdara=teksturK(256,256,(x,w,h)=>{const g=x.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.78,'rgba(0,0,0,0)');g.addColorStop(.8,'rgba(120,170,255,.55)');g.addColorStop(.9,'rgba(90,140,255,.18)');g.addColorStop(1,'rgba(90,140,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const udaraS=sprite(tUdara,GA);udaraS.position.copy(EC);udaraS.scale.setScalar(RE*2/.78*1.0);udaraS.material.opacity=.0;udaraS.visible=false;
/* ================== DUNIA ABSTRAK (di BASE) ================== */
const BASE=new V3(0,2000,0);
/* --- atom emas --- */
const ATOM=new THREE.Group();ATOM.position.copy(BASE);SD.add(ATOM);ATOM.visible=false;
const NN=197,NPR=79,nuk=[];
{const r=rng(5);for(let i=0;i<NN;i++){let p;do{p=[r()*2-1,r()*2-1,r()*2-1];}while(p[0]**2+p[1]**2+p[2]**2>1);nuk.push(new V3(...p).multiplyScalar(.66));}
 for(let it=0;it<70;it++){for(let i=0;i<NN;i++)for(let j=i+1;j<NN;j++){const d=nuk[i].clone().sub(nuk[j]),L=d.length();if(L<.2&&L>1e-4){d.multiplyScalar((.2-L)/L*.5);nuk[i].add(d);nuk[j].sub(d);}}nuk.forEach(p=>{const L=p.length();if(L>.7)p.multiplyScalar(.7/L);});}
 nuk.sort((a,b)=>a.length()-b.length());}
const NUKL=new THREE.InstancedMesh(new THREE.SphereGeometry(.1,16,12),new THREE.MeshStandardMaterial({roughness:.32,metalness:.05,emissive:C('#2a1200')}),NN);
const TIPEN=[...Array(NN)].map((_,i)=>i<NPR?1:0);
{const M=new THREE.Matrix4(),r=rng(8),tipe=TIPEN;for(let i=NN-1;i>0;i--){const j=(r()*(i+1))|0;[tipe[i],tipe[j]]=[tipe[j],tipe[i]];}
 nuk.forEach((p,i)=>{M.setPosition(p);NUKL.setMatrixAt(i,M);NUKL.setColorAt(i,new THREE.Color(tipe[i]?C('#ff7340'):C('#a9c2da')));});}
ATOM.add(NUKL);
const nukGlow=sprite(tGlowG,ATOM);
const ORB=[1.6,2.5,3.5].map((R,i)=>{const g=new THREE.Group();g.rotation.set(1.2+i*.5,i*.9,i*.4);const t=new THREE.Mesh(new THREE.TorusGeometry(R,.012,6,160),new THREE.MeshBasicMaterial({color:C('#9db4e8'),transparent:true,opacity:.6,toneMapped:false}));g.add(t);
  const els=[...Array(i*2+2)].map(()=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),new THREE.MeshBasicMaterial({color:C('#bfe2ff'),toneMapped:false}));g.add(e);return e;});ATOM.add(g);return{g,R,els,t};});
const awan=sprite(glowTex('rgba(255,230,160,.0)','rgba(255,200,90,.16)','rgba(120,150,255,.12)'),ATOM);
const NSTRIP=[...Array(14)].map((_,i)=>{const r=rng(40+i),th=r()*6.283,ph=Math.acos(2*r()-1);const dir=new V3(Math.sin(ph)*Math.cos(th),Math.cos(ph),Math.sin(ph)*Math.sin(th));return{dir,ph0:r(),L:mkLink('#8fd6ff',.032,tAlirV,ATOM)};});
/* --- bintang neutron + gelombang gravitasi + ejecta + nebula (grup NS di BASE) --- */
const NSW=new THREE.Group();NSW.position.copy(BASE);SD.add(NSW);NSW.visible=false;
const mNS=()=>new THREE.MeshBasicMaterial({color:C('#dbe8ff'),toneMapped:false});
const NSA=new THREE.Mesh(new THREE.SphereGeometry(1.3,32,20),mNS()),NSB=new THREE.Mesh(new THREE.SphereGeometry(1.3,32,20),mNS());NSW.add(NSA,NSB);
const haloA=sprite(tGlowB,NSW),haloB=sprite(tGlowB,NSW),haloC=sprite(tGlowO,NSW),kilatNS=sprite(tGlowW(),NSW);
function tGlowW(){return glowTex('rgba(255,255,255,1)','rgba(255,250,230,.9)','rgba(255,220,150,.3)');}
const GWR=[...Array(7)].map(()=>{const m=new THREE.Mesh(new THREE.RingGeometry(1,1.014,180),new THREE.MeshBasicMaterial({color:C('#9db8ff'),transparent:true,opacity:0,toneMapped:false,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.rotation.x=Math.PI/2;m.visible=false;NSW.add(m);return m;});
const TRN=120,trailG=new THREE.BufferGeometry();trailG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(TRN*2*3),3));trailG.setAttribute('color',new THREE.BufferAttribute(new Float32Array(TRN*2*3),3));
const trail=new THREE.Points(trailG,new THREE.PointsMaterial({map:tGlowB,size:20,sizeAttenuation:false,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));trail.frustumCulled=false;NSW.add(trail);
const NE=1800,ejG=new THREE.BufferGeometry(),ejDir=new Float32Array(NE*4),ejCol=new Float32Array(NE*3);
{const r=rng(61);for(let i=0;i<NE;i++){const th=r()*6.283,u=r()*2-1,flat=.5+.5*r();const s=Math.sqrt(1-u*u);const dx=s*Math.cos(th),dz=s*Math.sin(th),dy=u*(r()<.8?.45:1)*flat;const L=Math.hypot(dx,dy,dz);ejDir.set([dx/L,dy/L,dz/L,.25+r()*.85],i*4);
  const c=new THREE.Color().setHSL(.1+r()*.04,.85+r()*.15,.55+r()*.35);ejCol.set([c.r,c.g,c.b],i*3);}}
ejG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NE*3),3));ejG.setAttribute('color',new THREE.BufferAttribute(ejCol,3));
const ejecta=new THREE.Points(ejG,new THREE.PointsMaterial({map:tGlowG,size:11,sizeAttenuation:false,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:1}));ejecta.frustumCulled=false;NSW.add(ejecta);
const AWAN=[0,1,2,3,4].map(()=>sprite(tGlowO,NSW));
/* nebula: awan gas (3 lapis) + butir emas */
const NG=1500,nebDef=[...Array(3)].map((_,k)=>{const r=rng(80+k),g=new THREE.BufferGeometry(),base=new Float32Array(NG*4),col=new Float32Array(NG*3);const pal=[['#6a7bd8','#8f6ad8'],['#b06ad0','#d86aa8'],['#5fb2d6','#6a8ad8']][k];
  for(let i=0;i<NG;i++){const R=Math.pow(r(),.55)*330,th=r()*6.283,ph=Math.acos(2*r()-1);base.set([R,th,ph,.4+r()*.9],i*4);const c=new THREE.Color(pal[r()<.5?0:1]).multiplyScalar(.45+r()*.7);col.set([c.r,c.g,c.b],i*3);}
  g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NG*3),3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({map:tGlowP,size:[34,52,76][k],sizeAttenuation:false,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:0}));p.frustumCulled=false;NSW.add(p);return{g,base,p};});
const NGD=520,gdG=new THREE.BufferGeometry(),gdBase=new Float32Array(NGD*4);
{const r=rng(99);for(let i=0;i<NGD;i++){const R=Math.pow(r(),.6)*320,th=r()*6.283,ph=Math.acos(2*r()-1);gdBase.set([R,th,ph,.5+r()],i*4);}}
gdG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NGD*3),3));
const gdPts=new THREE.Points(gdG,new THREE.PointsMaterial({map:tGlowG,color:C('#ffd24a'),size:9,sizeAttenuation:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:0}));gdPts.frustumCulled=false;NSW.add(gdPts);
const sunMuda=new THREE.Mesh(new THREE.SphereGeometry(10,32,20),new THREE.MeshBasicMaterial({color:C('#ffe9a0'),toneMapped:false}));sunMuda.visible=false;NSW.add(sunMuda);const sunGlow=sprite(tGlowG,NSW),sunGlow2=sprite(tGlowO,NSW);
/* --- Bumi muda: bola lava, lapisan bidang potong, tetesan emas, asteroid --- */
const YE=new THREE.Group();YE.position.copy(BASE);SD.add(YE);YE.visible=false;
const YR=4;
const tLava=teksturK(1024,512,(x,w,h,r)=>{x.fillStyle='#2b0e06';x.fillRect(0,0,w,h);bintik(x,w,h,3000,['#3a160a','#1f0904','#4a1c0c'],2,10,r);for(let i=0;i<340;i++){x.strokeStyle=r()<.5?'#ff8a1e':'#ffc247';x.lineWidth=1.5+r()*3.5;x.beginPath();let a=r()*w,b=r()*h;x.moveTo(a,b);for(let k=0;k<7;k++){a+=(r()-.5)*70;b+=(r()-.5)*40;x.lineTo(a,b);}x.stroke();}},[1,1]);
const tKerak=teksturK(1024,512,(x,w,h,r)=>{x.fillStyle='#5a4a3c';x.fillRect(0,0,w,h);for(let i=0;i<260;i++){x.fillStyle=r()<.5?'rgba(40,30,22,.16)':'rgba(120,100,78,.14)';x.beginPath();x.ellipse(r()*w,r()*h,20+r()*70,12+r()*40,r()*3,0,7);x.fill();}bintik(x,w,h,16000,['#4a3c30','#6c5a48','#3a2e24','#7a6a58'],1,4,r);for(let i=0;i<40;i++){x.fillStyle='rgba(25,18,12,.4)';x.beginPath();x.ellipse(r()*w,r()*h,6+r()*14,5+r()*10,r()*3,0,7);x.fill();x.strokeStyle='rgba(150,130,100,.35)';x.lineWidth=1.5;x.stroke();}},[1,1]);
const lavaS=new THREE.Mesh(new THREE.SphereGeometry(YR,96,60),new THREE.MeshStandardMaterial({map:tLava,emissiveMap:tLava,emissive:0xffffff,emissiveIntensity:.95,roughness:.9,clippingPlanes:[POTG]}));YE.add(lavaS);
const kerakS=new THREE.Mesh(new THREE.SphereGeometry(YR+.03,96,60),new THREE.MeshStandardMaterial({map:tKerak,roughness:.95,transparent:true,opacity:0,clippingPlanes:[POTG],depthWrite:false}));YE.add(kerakS);
const tMantel=lingkarTex([[0,'#ff7a2a'],[.45,'#e0561f'],[1,'#b73d17']]),tInti=lingkarTex([[0,'#fff4b0'],[.6,'#ffcf4a'],[1,'#ffa81f']]),tLuar=lingkarTex([[0,'#ffb33a'],[1,'#f27f12']]);
const lap=(tex)=>new THREE.MeshBasicMaterial({map:tex,toneMapped:false,depthWrite:false,side:THREE.DoubleSide});
const LAPY=[['kerak',YR,new THREE.MeshBasicMaterial({color:C('#5c4938'),toneMapped:false,depthWrite:false,side:THREE.DoubleSide})],['mantel',YR-.24,lap(tMantel)],['luar',1.7,lap(tLuar)],['dalam',.85,lap(tInti)]];
const DISKY=LAPY.map(([n,r,m],i)=>{const d=new THREE.Mesh(new THREE.CircleGeometry(1,96),m);d.renderOrder=10+i;d.userData={n,r};d.visible=false;YE.add(d);return d;});
const NDR=70,drG=new THREE.BufferGeometry();drG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NDR*3),3));
const dropAw=[...Array(NDR)].map((_,i)=>{const r=rng(120+i);return{a:r()*6.283,r0:1.95+r()*1.6,r1:.05+r()*.75,s:r()*1.9};});
const drPts=new THREE.Points(drG,new THREE.PointsMaterial({map:tGlowG,color:C('#ffd24a'),size:22,sizeAttenuation:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:1}));drPts.frustumCulled=false;YE.add(drPts);
const inti1=sprite(tGlowG,YE),yeGlow=sprite(tGlowO,YE);
const NAS=12,AST=[...Array(NAS)].map((_,i)=>{const r=rng(200+i),az=(r()-.5)*1.9+.2,el=.15+r()*.9;const n=new V3(Math.sin(AZ+az)*Math.cos(el),Math.sin(el),Math.cos(AZ+az)*Math.cos(el)).normalize();
  const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.16+r()*.14,1),new THREE.MeshStandardMaterial({color:C('#6a5a4a'),roughness:.9,emissive:C('#a05a10'),emissiveIntensity:.8}));m.visible=false;YE.add(m);
  return{n,m,sz:.16+r()*.14,L:mkLink('#ffb347',.07,tAlirV,YE),t:r()};});
const NSP=300,spkG=new THREE.BufferGeometry(),spkPos=new Float32Array(NSP*3),spkT=new Float32Array(NSP);
{const r=rng(310);for(let i=0;i<NSP;i++){const a=AST[(i*NAS/NSP)|0],ang=r()*6.283,rr=r()*.65,u=new V3(1,0,0).cross(a.n).normalize(),w=a.n.clone().cross(u);const p=a.n.clone().multiplyScalar(YR+.04).addScaledVector(u,Math.cos(ang)*rr).addScaledVector(w,Math.sin(ang)*rr).normalize().multiplyScalar(YR+.045);spkPos.set([p.x,p.y,p.z],i*3);}}
spkG.setAttribute('position',new THREE.BufferAttribute(spkPos,3));
const spkPts=new THREE.Points(spkG,new THREE.PointsMaterial({map:tGlowG,color:C('#ffd24a'),size:9,sizeAttenuation:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:0}));spkPts.frustumCulled=false;YE.add(spkPts);
const impS=[...Array(NAS)].map(()=>sprite(tGlowO,YE));
/* percikan emas di akhir (di atas meja) */
const NSPK=70,sprkG=new THREE.BufferGeometry(),sprkB=new Float32Array(NSPK*4);{const r=rng(500);for(let i=0;i<NSPK;i++)sprkB.set([(r()-.5)*5,r()*3.5,(r()-.5)*5,r()],i*4);}
sprkG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NSPK*3),3));
const sprkP=new THREE.Points(sprkG,new THREE.PointsMaterial({map:tGlowG,color:C('#ffd24a'),size:12,sizeAttenuation:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,opacity:0}));sprkP.frustumCulled=false;GA.add(sprkP);
