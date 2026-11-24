
/* ---------- PELARI bergaya sederhana (kain pakaian lari) ---------- */
const RUN=new THREE.Group();SD.add(RUN);
const MS={baju:new THREE.MeshStandardMaterial({color:C('#ffffff'),map:tKainL,roughness:.9}),celana:new THREE.MeshStandardMaterial({color:C('#ffffff'),map:tShort,roughness:.9}),kulit:new THREE.MeshStandardMaterial({color:C('#e0b48c'),roughness:.7}),rambut:new THREE.MeshStandardMaterial({color:C('#2a1c14'),roughness:.9}),sepatu:new THREE.MeshStandardMaterial({color:C('#f2f2f2'),roughness:.5})};
const SIL=new THREE.MeshBasicMaterial({color:C('#d8ecff'),transparent:true,opacity:1,toneMapped:false,blending:THREE.AdditiveBlending,depthWrite:false});
const PRT=[];function bagian(geo,mat,par,pos,rot){const o=new THREE.Mesh(geo,mat);o.position.set(...pos);if(rot)o.rotation.set(...rot);o.castShadow=true;o.userData.mat=mat;par.add(o);PRT.push(o);return o;}
const PEL=new THREE.Group();PEL.position.y=1.62;RUN.add(PEL);
bagian(new THREE.CylinderGeometry(.34,.3,.8,22),MS.baju,PEL,[0,.62,0]);bagian(new THREE.SphereGeometry(.34,20,14),MS.baju,PEL,[0,1.02,0]);bagian(new THREE.CylinderGeometry(.3,.33,.36,20),MS.celana,PEL,[0,.04,0]);
bagian(new THREE.SphereGeometry(.3,22,16),MS.kulit,PEL,[.04,1.5,0]);bagian(new THREE.SphereGeometry(.31,22,12,0,6.283,0,1.25),MS.rambut,PEL,[.0,1.53,0]);
const LEG=[-1,1].map(s=>{const hip=new THREE.Group();hip.position.set(0,-.1,s*.17);PEL.add(hip);bagian(new THREE.CylinderGeometry(.15,.12,.78,14),MS.celana,hip,[0,-.38,0]);const knee=new THREE.Group();knee.position.set(0,-.78,0);hip.add(knee);bagian(new THREE.CylinderGeometry(.11,.09,.78,14),MS.kulit,knee,[0,-.38,0]);bagian(new THREE.BoxGeometry(.5,.16,.22),MS.sepatu,knee,[.1,-.82,0]);return{hip,knee};});
const ARM=[-1,1].map(s=>{const sh=new THREE.Group();sh.position.set(0,.95,s*.43);PEL.add(sh);bagian(new THREE.CylinderGeometry(.1,.08,.52,12),MS.kulit,sh,[0,-.26,0]);const el=new THREE.Group();el.position.set(0,-.52,0);sh.add(el);bagian(new THREE.CylinderGeometry(.08,.07,.5,12),MS.kulit,el,[0,-.25,0]);return{sh,el};});
function animPelari(ph,amp){LEG.forEach((l,i)=>{const p=ph+(i?Math.PI:0);l.hip.rotation.z=Math.sin(p)*.9*amp;l.knee.rotation.z=-Math.max(0,-Math.sin(p+.9))*1.25*amp-.12*amp;});ARM.forEach((a,i)=>{const p=ph+(i?0:Math.PI);a.sh.rotation.z=Math.sin(p)*.8*amp;a.el.rotation.z=-.9-.4*Math.sin(p)*amp;});PEL.rotation.z=-.12*amp;PEL.position.y=1.62+Math.abs(Math.sin(ph))*.08*amp;}
function setSiluet(k){PRT.forEach(o=>{o.material=k>.02?SIL:o.userData.mat;});SIL.opacity=clamp(k);}

/* ---------- strip bercahaya (lintasan) + arus ---------- */
const tA=teksturK(128,16,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,.35)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const glowM=o=>new THREE.MeshBasicMaterial(Object.assign({color:C(PAL.aks),transparent:true,depthWrite:false,toneMapped:false},o));
function strip(titik,r,tutup=false,rep=1.6){const cu=new THREE.CatmullRomCurve3(titik.map(p=>new THREE.Vector3(...p)),tutup,'catmullrom',.2),g=new THREE.TubeGeometry(cu,Math.max(200,titik.length*3),r,8,tutup),tx=tA.clone();tx.needsUpdate=true;tx.repeat.set(cu.getLength()/rep,1);
  const m=new THREE.Mesh(g,glowM({map:tx}));m.renderOrder=3;SD.add(m);const hd=sprite(),nS=g.index.count;
  return{cu,m,atur(isi,off,op=1,sc=3,col){g.setDrawRange(0,Math.floor(clamp(isi)*nS/6)*6);m.visible=isi>0&&op>.01;m.material.opacity=op;if(col)m.material.color.copy(C(col));tx.offset.x=-off;if(isi>0&&isi<1){const p=cu.getPointAt(clamp(isi));spr(hd,[p.x,p.y,p.z],sc,op);}else spr(hd,[0,0,0],1,0);}};}
const ringPts=(r,cx,cy,n=96)=>Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2;return[cx+r*Math.sin(a),cy+r*Math.cos(a),0];});
const S_RING=strip(ringPts(R+TA+3,0,CY),1.2,true,14);
const DOT=sprite(),DOT2=sprite();
const S_AIR=strip([[3.4,2.0,ZR-.4],[6,2.4,ZR-.2],[9,2.0,ZR-.4],[12,2.4,ZR-.2]],.06);
const PLASMA=sprite(),PLASMA2=sprite(),SHOCK=sprite(tCincinE),FLASH=sprite(),FLASH2=sprite(tCincinE);
const FL=Array.from({length:26},()=>sprite());
const PLP=new THREE.InstancedMesh(new THREE.SphereGeometry(.06,8,6),new THREE.MeshBasicMaterial({color:C('#e8f4ff'),toneMapped:false}),90);PLP.frustumCulled=false;SD.add(PLP);

/* ---------- LHC: cincin akselerator (di x = 700), dipotong POTL ---------- */
const LHC=new THREE.Group();LHC.position.set(LX,0,0);SD.add(LHC);
{PLN=POTL;const st=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.2}),gt=new THREE.TorusGeometry(16,.95,28,160);
 const tr=new THREE.Mesh(gt,st);tr.rotation.x=Math.PI/2;tr.castShadow=true;LHC.add(tr);const cp=new THREE.Mesh(gt,new THREE.MeshBasicMaterial({color:C('#fff0c0'),side:THREE.BackSide,clippingPlanes:[POTL],toneMapped:false}));cp.rotation.x=Math.PI/2;LHC.add(cp);
 const gp=new THREE.TorusGeometry(16,.32,16,160),pp=new THREE.Mesh(gp,bhn('#cfd6dc',{metalness:.9,roughness:.2}));pp.rotation.x=Math.PI/2;LHC.add(pp);const pc=new THREE.Mesh(gp,new THREE.MeshBasicMaterial({color:C('#14233f'),side:THREE.BackSide,clippingPlanes:[POTL],toneMapped:false}));pc.rotation.x=Math.PI/2;LHC.add(pc);
 const gs=new THREE.CylinderGeometry(27,27,1.4,96),sl=new THREE.Mesh(gs,new THREE.MeshStandardMaterial({color:C('#ffffff'),map:salin(tRumput,12,12),roughness:1,clippingPlanes:[POTL],clipShadows:true}));sl.position.y=-1.8;sl.receiveShadow=true;LHC.add(sl);{const sc=new THREE.Mesh(gs,new THREE.MeshBasicMaterial({color:C('#d9a066'),side:THREE.BackSide,clippingPlanes:[POTL],toneMapped:false}));sc.position.set(0,-1.8,0);LHC.add(sc);}
 PLN=POTE;
 for(let i=0;i<20;i++){const a=Math.PI+(i+.5)/20*Math.PI,m=new THREE.Mesh(new THREE.BoxGeometry(1.9,1.9,3.6),DM('#2d5fa8',{metalness:.5,roughness:.4}));m.position.set(Math.cos(a)*16,0,Math.sin(a)*16);m.rotation.y=-a+Math.PI/2;m.castShadow=true;LHC.add(m);}}
const S_B1=strip(ringPts(16,0,0).map(([x,y,z])=>[x+LX,.0,y]),.22,true,3),S_B2=strip(ringPts(15.6,0,0).map(([x,y,z])=>[x+LX,.0,y]),.22,true,3);
const BH1=sprite(),BH2=sprite();
function batangA(m,a,b){const u=new THREE.Vector3(...a),w=new THREE.Vector3(...b).sub(u),L=w.length();m.position.copy(u).addScaledVector(w,.5);m.scale.y=L;m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),w.normalize());}
