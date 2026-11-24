
/* ---------- DUA GEDUNG LAB + DETEKTOR (dipotong bidang POTD) ---------- */
const CUBES=[],AX=[-26,26];
function gedung(cx){const s=Math.sign(cx);PLN=POTD;
  const metal=bhn('#d6dcd8',{map:tSikat,metalness:.5,roughness:.45}),bt=bhn('#ffffff',{map:tBetonB,roughness:.92,envMapIntensity:.3}),baja=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1}),bajaG=bhn('#ffffff',{map:tSikatG,metalness:.8,roughness:.4});
  dindingBox(SD,[cx-5.2,cx+5.2,0,6,-4.5,4.5],[[.14,metal,'#f2d9a6'],[.45,bt,'#e8a765']]);
  [-3.2,0,3.2].forEach(dx=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(2.2,1.6),new THREE.MeshStandardMaterial({color:C('#6f9fb8'),roughness:.1,metalness:.3,envMapIntensity:1.6,clippingPlanes:[POTD]}));w.position.set(cx+dx,3.6,4.62);SD.add(w);});
  kotak(cx-s*5.25,cx-s*5.0,0,2.6,-.9,.9,bajaG,SD);   // pintu sisi lab tengah
  // kabinet detektor (berongga) + isi
  dindingBox(SD,[cx-1.7,cx+1.7,.3,2.9,-1.2,1.2],[[.15,baja,'#dce6ec']]);
  const lensa=pasang(new THREE.CylinderGeometry(.5,.5,.1,26),new THREE.MeshStandardMaterial({color:C('#bfe2f2'),transparent:true,opacity:.45,roughness:.05,clippingPlanes:[POTD]}),SD,[cx-s*.9,1.5,0]);lensa.rotation.z=Math.PI/2;
  kotak(cx-s*.35-.05,cx-s*.35+.05,.9,2.1,-.5,.5,bajaG,SD,'#dce6ec');
  const ped=pasang(new THREE.CylinderGeometry(.22,.3,.6,18),new THREE.MeshStandardMaterial({color:C('#8d959b'),metalness:.8,roughness:.4}),SD,[cx+s*.6,.75,-.55]);
  const fk=[0,1,2,3,4,5].map(i=>[sisiKubus('↔',1),sisiKubus('↔',1),sisiKubus('↑',1),sisiKubus('↑',1),sisiKubus('↑',1),sisiKubus('↔',1)][i]);
  const kub=new THREE.Mesh(new THREE.BoxGeometry(.9,.9,.9),fk.map(m=>new THREE.MeshStandardMaterial({map:m,emissive:C('#7a5cff'),emissiveMap:m,emissiveIntensity:.8,roughness:.25,metalness:.3})));
  kub.position.set(cx+s*.6,1.5,-.55);kub.castShadow=true;SD.add(kub);CUBES.push(kub);
  PLN=POTC;}
gedung(-26);gedung(26);
// kabel serat optik (jaket tembus pandang) mulai dari kopler di meja
const jaket=bhn('#a9a8d8',{transparent:true,opacity:.4,roughness:.2,metalness:.2,depthWrite:false},false);
const jalur=s=>[[s*.7,2.95,0],[s*1.5,2.95,0],[s*2.4,2.75,0],[s*4.7,2.7,0],[s*5.2,2.4,0],[s*5.4,.6,0],[s*6.4,.28,0],[s*18,.28,0],[s*21.3,.28,0],[s*22.8,.9,0],[s*24.3,1.5,0],[s*25.1,1.5,0]];
[-1,1].forEach(s=>pasang(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(jalur(s).map(p=>new THREE.Vector3(...p)),false,'catmullrom',.12),160,.17,10,false),jaket,SD));

/* ---------- ALIRAN: foton (strip + kepala bercahaya) dan benang korelasi ---------- */
const glowM=o=>new THREE.MeshBasicMaterial(Object.assign({color:C(PAL.aks),transparent:true,depthWrite:false,toneMapped:false},o));
function sprite(){const m=new THREE.SpriteMaterial({map:tGlowV,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;}
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
function strip(titik,r,kec=2,clip){const cu=new THREE.CatmullRomCurve3(titik.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.12),g=new THREE.TubeGeometry(cu,200,r,8),tx=tAlir.clone();tx.needsUpdate=true;
  const pj=cu.getLength();tx.repeat.set(pj/1.1,1);const m=new THREE.Mesh(g,glowM(Object.assign({map:tx},clip?{clippingPlanes:[clip]}:{})));m.renderOrder=3;SD.add(m);const hd=sprite();
  return{cu,atur(isi,t,op=1,sc=.9){g.setDrawRange(0,Math.floor(clamp(isi)*200)*8*6);m.visible=isi>0;m.material.opacity=op;tx.offset.x=-t*kec;if(isi>0&&isi<1){const p=cu.getPointAt(clamp(isi));spr(hd,[p.x,p.y,p.z],sc,1);}else spr(hd,[0,0,0],1,0);}};}
const F_IN=strip([[-2.1,2.95,0],[-1.2,2.95,0],[-.6,2.95,0]],.05,2.5),F_L=strip(jalur(-1).slice(0,1).concat(jalur(-1)),.08,2.5),F_R=strip(jalur(1).slice(0,1).concat(jalur(1)),.08,2.5);
const KR_FL=sprite();
function benang(n){const m=new THREE.InstancedMesh(new THREE.SphereGeometry(.2,10,8),glowM({opacity:.9}),n);m.frustumCulled=false;SD.add(m);return m;}
const BEN_S=benang(26),BEN_L=benang(70),_m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_p=new THREE.Vector3(),_s=new THREE.Vector3();
function isiBenang(m,a,b,tinggi,amp,t,vis,sz=1){const n=m.count;for(let i=0;i<n;i++){const u=i/(n-1),w=Math.sin(u*14+t*5)*amp*Math.sin(Math.PI*u);_p.set(lerp(a[0],b[0],u),lerp(a[1],b[1],u)+Math.sin(Math.PI*u)*tinggi+w,lerp(a[2],b[2],u)+Math.cos(u*11+t*4)*amp*.6*Math.sin(Math.PI*u));_s.setScalar(vis>0?sz*(.7+.5*Math.sin(u*20-t*6)**2):1e-4);_m.compose(_p,_q,_s);m.setMatrixAt(i,_m);}m.instanceMatrix.needsUpdate=true;}
const ORB=[0,1].map(()=>new THREE.Mesh(new THREE.SphereGeometry(.2,20,14),glowM({color:C('#d9d0ff')}))),ORBG=[sprite(),sprite()];ORB.forEach(o=>{o.visible=false;SD.add(o);});
// bingkai bidang potong bercahaya
function bingkai(w,h){const g=new THREE.Group();SD.add(g);const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.lineTo(-w/2,-h/2);
  g.add(new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:C(PAL.aks),transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})));
  g.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(s.getPoints().map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:C(PAL.aks),transparent:true,toneMapped:false})));return g;}
const FRC=bingkai(2.6,1.7),FRA=bingkai(11.6,6.6),FRB=bingkai(11.6,6.6);FRC.position.set(0,2.95,0);FRA.position.set(-26,3.1,0);FRB.position.set(26,3.1,0);
function aturBingkai(g,z,t0,t1,t){const k=Math.sin(Math.PI*clamp(seg(t,t0,t1+.5)));g.position.z=z+.01;g.visible=t>t0&&t<t1+.5;g.children.forEach((c,i)=>c.material.opacity=(i?1:.14)*k);}

/* ---------- kubus hasil pengukuran: berputar acak lalu mengunci ---------- */
const HASIL=[{s:21.4,l:25.3,r:0},{s:27.0,l:28.5,r:1},{s:39.5,l:41.6,r:0},{s:42.2,l:43.4,r:1},{s:43.8,l:44.9,r:1},{s:45.3,l:46.3,r:0}];
const Qr=[new THREE.Quaternion(),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI)];
function qPutar(t,i){const a=new THREE.Vector3(Math.sin(i*2.3+1),Math.cos(i*1.7+.4),Math.sin(i*.9+2)).normalize(),w=5.5+i*.8;return new THREE.Quaternion().setFromAxisAngle(a,w*t).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.sin(t*3.1+i)*.6));}
function stateKubus(t,i){let ev=null,last=null;HASIL.forEach(e=>{if(t>=e.s)last=e;if(t>=e.s&&t<e.l)ev=e;});const q=new THREE.Quaternion();let kunci=0;
  if(ev){const k=sstep(ev.l-.55,ev.l,t);q.copy(qPutar(t,i)).slerp(Qr[ev.r],k);kunci=k;}else if(last)q.copy(Qr[last.r]),kunci=1;else q.copy(Qr[0]);
  return{q,kunci,spin:!!ev,last};}
