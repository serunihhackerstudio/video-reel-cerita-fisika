
/* ---------- KAPAL RISET (di permukaan, di belakang bidang potong) ---------- */
const bajaP=DM('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.2}),bajaGP=DM('#ffffff',{map:tSikatG,metalness:.8,roughness:.4}),cat=DM('#ffffff',{map:tPutih,roughness:.45});
const KAPAL=new THREE.Group();SD.add(KAPAL);KAPAL.position.set(-1.6,.15,ZR-1.4);
{const hs=new THREE.Shape();hs.moveTo(-3.4,.9);hs.lineTo(3.0,.9);hs.lineTo(3.3,.55);hs.lineTo(3.0,-.35);hs.lineTo(-2.8,-.35);hs.lineTo(-3.4,.2);hs.lineTo(-3.4,.9);
 const hg=new THREE.ExtrudeGeometry(hs,{depth:1.8,bevelEnabled:true,bevelThickness:.1,bevelSize:.1,bevelSegments:2});hg.translate(0,0,-.9);const hull=new THREE.Mesh(hg,DM('#2c4a73',{roughness:.5,metalness:.3}));hull.castShadow=true;KAPAL.add(hull);
 const st=new THREE.Mesh(new THREE.BoxGeometry(6.6,.12,1.82),DM('#d94a3a'));st.position.set(-.05,.62,0);KAPAL.add(st);
 const bx=(w,h,d,x,y,z,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;KAPAL.add(o);return o;};
 bx(2.2,1.0,1.5,-1.9,1.5,0,cat);bx(1.6,.8,1.3,-2.1,2.3,0,cat);bx(1.7,.28,1.34,-2.0,2.2,0,DM('#274862',{metalness:.3,roughness:.15}));bx(2.0,.28,1.54,-1.9,1.55,0,DM('#274862',{metalness:.3,roughness:.15}));
 const mt=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.6,8),bajaGP);mt.position.set(-2.1,3.5,0);KAPAL.add(mt);const rd=new THREE.Mesh(new THREE.BoxGeometry(.9,.08,.2),bajaP);rd.position.set(-2.1,4.1,0);KAPAL.add(rd);
 [-.75,.75].forEach(z=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,2.2,8),bajaP);a.position.set(2.65,1.9,z);a.rotation.z=-.25;a.castShadow=true;KAPAL.add(a);});
 bx(.14,.14,1.7,2.38,3.0,0,bajaP);bx(1.4,.5,1.0,.4,1.05,0,cat);}
const CRANE=new THREE.Vector3(0,0,ZR);   // titik gantung kabel (dunia): x = KAPAL.x + 2.38 - 0.25 ≈ 0.7 -> kita pakai x=0.78
const RX=.78;

/* ---------- KAPSUL TITANIUM (dinding tebal, dipotong POTK) ---------- */
function bikinKapsul(){PLN=POTK;const g=new THREE.Group(),ti=bhn('#ffffff',{map:tSikatG,color:C('#c6ccd1'),metalness:.85,roughness:.32,envMapIntensity:1.2});
  const pts=[];for(let i=0;i<=24;i++){const a=lerp(-90,90,i/24)*DEG;pts.push([1.0*Math.cos(a),1.0*Math.sin(a)]);}for(let i=24;i>=0;i--){const a=lerp(-90,90,i/24)*DEG;pts.push([.72*Math.cos(a),.72*Math.sin(a)]);}pts.push(pts[0]);
  const sh=pasang(new THREE.LatheGeometry(pts.map(([r,y])=>new THREE.Vector2(Math.max(r,0.001),y)),64),ti,g,null,'#f4e2b0');
  // isi sempit: kursi, panel layar, tabung gas
  const kursi=bhn('#3b4650',{roughness:.7});pasang(new THREE.BoxGeometry(.5,.12,.5),kursi,g,[-.1,-.35,0],'#cfd6da');pasang(new THREE.BoxGeometry(.12,.5,.5),kursi,g,[-.34,-.1,0],'#cfd6da');
  const lay=new THREE.MeshBasicMaterial({color:C(PAL.aks),clippingPlanes:[POTK],toneMapped:false});pasang(new THREE.BoxGeometry(.06,.26,.4),lay,g,[.42,-.02,0]);
  pasang(new THREE.CylinderGeometry(.08,.08,.5,12),bhn('#c9a35a',{metalness:.8,roughness:.4}),g,[.1,-.5,.3],'#ffe4a8');
  PLN=POTW;
  // rangka & lampu & pelampung (tidak dipotong)
  const rk=bajaP;[[-1.35,0],[1.35,0]].forEach(([x,z])=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,2.3,8),rk);t.position.set(x,0,z);g.add(t);const lm=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),new THREE.MeshBasicMaterial({color:C('#fff6dc'),toneMapped:false}));lm.position.set(x,-1.1,z);g.add(lm);});
  const bf=new THREE.Mesh(new THREE.BoxGeometry(2.9,.35,.7),DM('#d8b24a',{roughness:.7}));bf.position.y=1.25;bf.castShadow=true;g.add(bf);
  const th=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.5,12),bajaGP);th.rotation.z=Math.PI/2;th.position.set(1.55,-.7,0);g.add(th);
  const pj=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.18,20),new THREE.MeshStandardMaterial({color:C('#bfe6ff'),transparent:true,opacity:.5,roughness:.05}));pj.rotation.x=Math.PI/2;pj.position.set(.55,.15,.86);g.add(pj);
  const lamp=new THREE.PointLight(C('#fff2d8'),0,16,2);lamp.position.set(0,-1.2,.5);g.add(lamp);g.userData.lamp=lamp;g.scale.setScalar(.85);return g;}
const KAPS=bikinKapsul();SD.add(KAPS);
const KBL=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1,6),bajaGP);SD.add(KBL);

/* ---------- panah tekanan: makin rapat & tebal seiring kedalaman ---------- */
const _u=new THREE.Vector3(),_w=new THREE.Vector3(),UP=new THREE.Vector3(0,1,0);
function bikinPanah(){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false,transparent:true});const sh=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,10),m),hd=new THREE.Mesh(new THREE.ConeGeometry(1,1,14),m);g.add(sh,hd);g.userData={sh,hd,m};g.visible=false;SD.add(g);return g;}
function aturPanah(g,from,to,th,op=1){_w.set(to[0]-from[0],to[1]-from[1],to[2]-from[2]);const L=_w.length();g.visible=L>.001&&op>.01;if(!g.visible)return;const hl=Math.min(L*.4,th*5),sl=L-hl,q=new THREE.Quaternion().setFromUnitVectors(UP,_w.clone().normalize());
  const{sh,hd,m}=g.userData;m.opacity=op;sh.scale.set(th,sl,th);sh.position.set(from[0]+_w.x/L*sl/2,from[1]+_w.y/L*sl/2,from[2]+_w.z/L*sl/2);sh.quaternion.copy(q);
  hd.scale.set(th*2.4,hl,th*2.4);hd.position.set(from[0]+_w.x/L*(sl+hl/2),from[1]+_w.y/L*(sl+hl/2),from[2]+_w.z/L*(sl+hl/2));hd.quaternion.copy(q);}
const DIRS=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[.7,0,.7],[-.7,0,.7],[.7,0,-.7],[-.7,0,-.7],[0,1,0],[0,1,0]].map(d=>new THREE.Vector3(...d).normalize());
function klaster(){return DIRS.map(()=>bikinPanah());}
function aturKlaster(K,c,f,vis,R0=3.2,R1=1.9){const th=.02+.026*f*f,len=.4+.3*f,R=lerp(R0,R1,f);K.forEach((g,i)=>{const d=DIRS[i];aturPanah(g,[c[0]+d.x*R,c[1]+d.y*R,c[2]+d.z*R],[c[0]+d.x*(R-len),c[1]+d.y*(R-len),c[2]+d.z*(R-len)],th,vis);});}
const PA_ATAS=klaster(),PA_BAWAH=klaster(),PA_RIG=klaster();

/* ---------- aliran: lintasan kapsul + sinar matahari (strip bercahaya) ---------- */
const tA=teksturK(128,16,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,.35)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const glowM=o=>new THREE.MeshBasicMaterial(Object.assign({color:C(PAL.aks),transparent:true,depthWrite:false,toneMapped:false},o));
function strip(titik,r,warna){const cu=new THREE.CatmullRomCurve3(titik.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.2),g=new THREE.TubeGeometry(cu,200,r,8),tx=tA.clone();tx.needsUpdate=true;tx.repeat.set(cu.getLength()/1.6,1);
  const m=new THREE.Mesh(g,glowM(Object.assign({map:tx},warna?{color:C(warna)}:{})));m.renderOrder=3;SD.add(m);const hd=sprite();
  return{cu,m,atur(isi,off,op=1,sc=1.4){g.setDrawRange(0,Math.floor(clamp(isi)*200)*8*6);m.visible=isi>0&&op>.01;m.material.opacity=op;tx.offset.x=-off;if(isi>0&&isi<1){const p=cu.getPointAt(clamp(isi));spr(hd,[p.x,p.y,p.z],sc,op);}else spr(hd,[0,0,0],1,0);}};}
const S_LINT=strip([[RX,3.0,ZR],[RX,-20,ZR],[RX,-40,ZR],[RX,-64.6,ZR]],.07);
const S_SURYA=strip([[-5.6,.2,ZR],[-5.6,-3,ZR],[-5.6,-6.2,ZR]],.08,'#fff4c8');

/* ---------- KEHIDUPAN DI DASAR (berpendar lembut) ---------- */
const FY=-66.06,CRE=new THREE.Group();SD.add(CRE);
const glowMat=(c,op=.55)=>new THREE.MeshStandardMaterial({color:C(c),emissive:C(PAL.aks),emissiveIntensity:.55,transparent:true,opacity:op,roughness:.35,metalness:0});
function bikinIkan(){const g=new THREE.Group(),m=glowMat('#bfeaf5',.5);const b=new THREE.Mesh(new THREE.SphereGeometry(.5,24,16),m);b.scale.set(1.5,.5,.42);g.add(b);
  const tl=new THREE.Mesh(new THREE.ConeGeometry(.28,.6,3),m);tl.rotation.z=-Math.PI/2;tl.position.x=-.95;tl.scale.set(1,1,.2);g.add(tl);const d=new THREE.Mesh(new THREE.ConeGeometry(.2,.5,3),m);d.position.set(-.1,.3,0);d.scale.set(1,1,.2);g.add(d);
  [-1,1].forEach(z=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),new THREE.MeshBasicMaterial({color:0x06202c}));e.position.set(.55,.1,z*.17);g.add(e);});
  [-.3,.1,.5].forEach(x=>{const o=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));o.position.set(x,-.15,.17);g.add(o);});
  const gl=new THREE.PointLight(C(PAL.aks),0,4,2);g.add(gl);g.userData.gl=gl;g.userData.m=m;g.scale.setScalar(.55);return g;}
function bikinTeripang(){const g=new THREE.Group(),m=glowMat('#e4c6b4',.85);m.emissiveIntensity=.22;for(let i=0;i<9;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.2,16,12),m);const k=1-Math.abs(i-4)/6;s.scale.set(1.3,.75*k+.2,.85*k+.15);s.position.set(i*.2-.8,0,0);g.add(s);
  const sp=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));sp.position.set(i*.2-.8,.17*k+.05,(i%2?.1:-.1));g.add(sp);}
  const gl=new THREE.PointLight(C(PAL.aks),0,3,2);g.add(gl);g.userData.gl=gl;g.userData.m=m;g.scale.setScalar(.9);return g;}
function bikinAmfipoda(){const g=new THREE.Group(),m=glowMat('#f2e0c8',.5);m.emissiveIntensity=.4;const seg=[];for(let i=0;i<7;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.17-i*.012,14,10),m);s.scale.set(1.2,.9,.8);g.add(s);seg.push(s);
  if(i>0&&i<6)[-1,1].forEach(z=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.32,6),m);l.position.z=z*.1;l.rotation.x=z*.5;l.userData.i=i;g.add(l);seg.push(l);});}
  [-1,1].forEach(z=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.5,6),m);a.position.set(.45,.1,z*.1);a.rotation.z=-1.1;g.add(a);});
  const eye=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));eye.position.set(.28,.07,.06);g.add(eye);
  g.userData.seg=seg;g.userData.m=m;g.scale.setScalar(.9);return g;}
const IKAN=bikinIkan(),TERI=bikinTeripang(),AMFI=[bikinAmfipoda(),bikinAmfipoda()];[IKAN,TERI,...AMFI].forEach(o=>{o.scale.multiplyScalar(1.3);CRE.add(o);});CRE.visible=false;
const PART=new THREE.InstancedMesh(new THREE.SphereGeometry(.035,8,6),new THREE.MeshBasicMaterial({color:C('#9ff3ff'),toneMapped:false,transparent:true,opacity:.85}),50);PART.frustumCulled=false;CRE.add(PART);
