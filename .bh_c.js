
/* ---------- RUANG-WAKTU: lembaran kisi berbentuk corong (dipotong POTF) ---------- */
const YF=r=>7.29-17/(1+r/3),RR=26,RH=4;      // profil corong; horizon di r=4 (y=0)
function profilCorong(tebal){const top=[],bot=[];for(let i=0;i<=90;i++){const r=lerp(.15,RR,Math.pow(i/90,1.6));top.push([r,YF(r)]);bot.push([r,YF(r)-tebal]);}return top.reverse().concat(bot).concat([[RR,YF(RR)]]);}
const matF=new THREE.MeshStandardMaterial({color:C('#7f98e0'),map:salin(tKisi,36,20),transparent:true,opacity:0,roughness:.5,metalness:.2,side:THREE.DoubleSide,clippingPlanes:[POTF],clipShadows:true,depthWrite:false,envMapIntensity:.8,emissive:C('#1a2a66'),emissiveIntensity:.25});
const matFC=new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:0});
function bikinCorong(){const g=new THREE.LatheGeometry(profilCorong(.3).map(([r,y])=>new THREE.Vector2(r,y)),120);const m=new THREE.Mesh(g,matF);m.renderOrder=1;m.add(new THREE.Mesh(g,matFC));return m;}
const CORONG=bikinCorong();SD.add(CORONG);
const GRPF=new THREE.Group();SD.add(GRPF);   // cincin horizon + titik singularitas (terpotong)
const cincinH=new THREE.Mesh(new THREE.TorusGeometry(RH,.09,10,120),new THREE.MeshBasicMaterial({color:C(PAL.aks),clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:0}));cincinH.rotation.x=Math.PI/2;cincinH.position.y=YF(RH)+.02;GRPF.add(cincinH);
const titikS=new THREE.Mesh(new THREE.SphereGeometry(.28,16,12),new THREE.MeshBasicMaterial({color:C('#fff0e0'),toneMapped:false,transparent:true,opacity:0}));titikS.position.set(0,YF(.15)-.1,0);GRPF.add(titikS);
const GLS=sprite(),GLH=sprite(),GLCH=sprite();
function bingkai(w,h){const g=new THREE.Group();SD.add(g);const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.lineTo(-w/2,-h/2);
  g.add(new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:C(PAL.aks),transparent:true,opacity:.1,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})));
  g.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(s.getPoints().map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:C(PAL.aks),transparent:true,toneMapped:false})));return g;}
const FRC=bingkai(58,18);FRC.position.set(0,-1.5,0);

/* ---------- PESAWAT, ASTRONAUT (kain pelindung), PENGAMAT ---------- */
const bajaP=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.2},false),bajaGP=bhn('#ffffff',{map:tSikatG,metalness:.8,roughness:.4},false),kacaP=bhn('#9fd0ff',{transparent:true,opacity:.45,roughness:.05,metalness:.2,envMapIntensity:2},false);
function bikinPesawat(){const g=new THREE.Group();const lathe=(p,m)=>{const o=new THREE.Mesh(new THREE.LatheGeometry(p.map(([r,y])=>new THREE.Vector2(r,y)),32),m);o.rotation.z=-Math.PI/2;o.castShadow=true;g.add(o);return o;};
  lathe([[0,-1.8],[.55,-1.5],[.8,-.6],[.8,1.2],[.6,1.9],[.35,2.2],[0,2.25]],bajaP);   // badan
  const k=new THREE.Mesh(new THREE.SphereGeometry(.5,24,16,0,6.283,0,1.57),kacaP);k.position.set(1.0,.5,0);k.scale.set(1.5,.9,.9);g.add(k);
  [-1,1].forEach(s=>{const sa=new THREE.Mesh(new THREE.BoxGeometry(.2,.1,1.9),bajaGP);sa.position.set(-.2,0,s*1.6);sa.castShadow=true;g.add(sa);const pn=new THREE.Mesh(new THREE.BoxGeometry(1.5,.06,1.0),bhn('#ffffff',{map:tPanel,metalness:.5,roughness:.35},false));pn.position.set(-.2,0,s*3.0);pn.castShadow=true;g.add(pn);});
  const mt=new THREE.Mesh(new THREE.ConeGeometry(.42,.9,20),new THREE.MeshBasicMaterial({color:C('#ffb070'),toneMapped:false}));mt.rotation.z=Math.PI/2;mt.position.set(-2.3,0,0);g.add(mt);
  const es=new THREE.Sprite(new THREE.SpriteMaterial({map:tGlow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:.9}));es.scale.setScalar(2.2);es.position.set(-2.9,0,0);g.add(es);return g;}
function bikinAstronaut(){const g=new THREE.Group(),mats=[];const M=(h,o)=>{const m=new THREE.MeshStandardMaterial(Object.assign({color:C(h),roughness:.9},o,{transparent:true}));mats.push(m);return m;};
  const kain=M('#ffffff',{map:tKainA}),logam=M('#b9bfc4',{metalness:.85,roughness:.34}),emas=M('#e3b04a',{metalness:1,roughness:.12,envMapIntensity:1.6}),aks=M(PAL.aks,{roughness:.6});
  const part=(geo,m,pos,rot)=>{const o=new THREE.Mesh(geo,m);o.position.set(...pos);if(rot)o.rotation.set(...rot);o.castShadow=true;g.add(o);return o;};
  part(new THREE.CylinderGeometry(.52,.46,1.2,22),kain,[0,.1,0]);part(new THREE.SphereGeometry(.52,20,14),kain,[0,.7,0]);part(new THREE.SphereGeometry(.46,20,14),kain,[0,-.5,0]);
  part(new THREE.BoxGeometry(.6,.75,.28),logam,[0,.2,-.56]);part(new THREE.BoxGeometry(.38,.3,.12),aks,[0,.4,.5]);
  part(new THREE.SphereGeometry(.5,24,18),kain,[0,1.5,0]);part(new THREE.SphereGeometry(.4,24,18,-1.2,2.4,.5,1.5),emas,[0,1.5,.2]);
  [-1,1].forEach(s=>{part(new THREE.CylinderGeometry(.17,.15,1.0,14),kain,[s*.72,.1,0],[0,0,s*.25]);part(new THREE.SphereGeometry(.2,14,10),logam,[s*.82,-.42,0]);
    part(new THREE.CylinderGeometry(.2,.17,1.1,14),kain,[s*.26,-1.25,0]);part(new THREE.BoxGeometry(.34,.24,.5),logam,[s*.26,-1.85,.08]);});
  g.userData.mats=mats;return g;}
const PES=bikinPesawat();PES.position.set(24,8.2,-4);PES.rotation.y=.5;SD.add(PES);
const AST=bikinAstronaut();SD.add(AST);const GHO=bikinAstronaut();SD.add(GHO);
const OBS=new THREE.Group();SD.add(OBS);{OBS.position.set(25,8.5,0);const b=new THREE.Mesh(new THREE.BoxGeometry(1.3,.9,.9),bajaP);b.castShadow=true;OBS.add(b);const d=new THREE.Mesh(new THREE.SphereGeometry(.8,22,12,0,6.283,0,1.2),bajaGP);d.rotation.x=Math.PI;d.position.y=1;OBS.add(d);const e=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1,6),bajaGP);e.position.y=1.5;OBS.add(e);}
const FIG=(f,mat)=>{};
/* ---------- ALIRAN: strip bercahaya ---------- */
const tA=teksturK(128,16,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,.35)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const glowM=o=>new THREE.MeshBasicMaterial(Object.assign({color:C(PAL.aks),transparent:true,depthWrite:false,toneMapped:false},o));
function strip(titik,r){const cu=new THREE.CatmullRomCurve3(titik.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.2),g=new THREE.TubeGeometry(cu,240,r,8),tx=tA.clone();tx.needsUpdate=true;const pj=cu.getLength();tx.repeat.set(pj/1.4,1);
  const m=new THREE.Mesh(g,glowM({map:tx}));m.renderOrder=3;SD.add(m);const hd=sprite();
  return{cu,m,atur(isi,off,op=1,sc=1.1,col){g.setDrawRange(0,Math.floor(clamp(isi)*240)*8*6);m.visible=isi>0&&op>.01;m.material.opacity=op;if(col)m.material.color.copy(C(col));tx.offset.x=-off;if(isi>0&&isi<1){const p=cu.getPointAt(clamp(isi));spr(hd,[p.x,p.y,p.z],sc,op);}else spr(hd,[0,0,0],1,0);}};}
const jalurPerm=(phi,r0,r1,dy=.35,n=36)=>Array.from({length:n},(_,i)=>{const r=lerp(r0,r1,i/(n-1));return[r*Math.cos(phi),YF(r)+dy,r*Math.sin(phi)];});
const S_JATUH=strip(jalurPerm(0,20,1.2,.5),.12);
const S_CAHAYA=strip([[4.6,YF(4.6)+.5,0],[6.4,3.4,0],[11,6.0,0],[18,8.0,0],[24,8.7,0]],.11);
const S_RAYA=[[[4.3,.3,0],[6.6,2.8,0],[6.7,5.0,0],[4.5,5.2,0],[2.6,2.0,0],[1.6,-3.4,0]],[[-4.3,.3,0],[-6.2,2.6,0],[-6.8,4.6,0],[-4.8,5.0,-.5],[-2.7,1.8,-.4],[-1.6,-3.5,-.3]]].map(p=>strip(p,.1));
const S_KONV=[Math.PI*1.0,-Math.PI*.35,-Math.PI*.65,-Math.PI*.5,0.0,Math.PI*.9].map(phi=>strip(jalurPerm(phi,4.6,.35,.3,34),.1));
const TR_FL=sprite();
