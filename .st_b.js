
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
/* ---------- tekstur baru (besar & lembut: anti-kedip) ---------- */
const tEarth=teksturK(1024,512,(x,w,h,r)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2d74bd');g.addColorStop(.5,'#1d5ba6');g.addColorStop(1,'#2d74bd');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let i=0;i<40;i++){x.fillStyle='rgba(255,255,255,'+(.03+r()*.04)+')';x.beginPath();x.ellipse(r()*w,r()*h,40+r()*90,10+r()*20,r()*3,0,7);x.fill();}
  const bl=(cx,cy,rx,ry,c1,c2)=>{for(let k=0;k<34;k++){const a=cx+(r()-.5)*rx*1.7,b=cy+(r()-.5)*ry*1.7,s=22+r()*48;x.fillStyle=r()<.6?c1:c2;x.beginPath();x.ellipse(a,b,s,s*(.6+r()*.5),r()*3,0,7);x.fill();}};
  bl(250,200,130,80,'#4f8f4a','#6f9f55');bl(300,340,55,100,'#5f9450','#a08a5a');bl(650,190,160,70,'#5c9048','#a89a62');bl(720,310,70,80,'#c4b27a','#8fa35a');bl(880,380,70,40,'#b8a46a','#6d9a4f');bl(500,120,50,30,'#7fa85e','#a8b878');
  x.fillStyle='rgba(240,248,255,.95)';x.fillRect(0,0,w,34);x.fillRect(0,h-40,w,40);},[1,1]);
const tCloud=teksturK(1024,512,(x,w,h,r)=>{x.clearRect(0,0,w,h);for(let i=0;i<55;i++){const cx=r()*w,cy=40+r()*(h-80),rr=26+r()*60,g=x.createRadialGradient(cx,cy,0,cx,cy,rr);g.addColorStop(0,'rgba(255,255,255,.42)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,rr*1.6,rr*.6,r()*.6-.3,0,7);x.fill();}},[1,1]);
const tAtmo=teksturK(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(128,128,92,128,128,128);g.addColorStop(0,'rgba(120,180,255,.55)');g.addColorStop(.4,'rgba(100,150,255,.22)');g.addColorStop(1,'rgba(80,120,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tSolar=teksturK(256,512,(x,w,h)=>{x.fillStyle='#223a86';x.fillRect(0,0,w,h);for(let j=0;j<8;j++)for(let i=0;i<4;i++){x.fillStyle=(i+j)%2?'#2a449a':'#263f90';x.fillRect(i*64+3,j*64+3,58,58);}x.fillStyle='#c9a24a';x.fillRect(0,0,w,8);x.fillRect(0,h-8,w,8);x.fillRect(0,0,8,h);x.fillRect(w-8,0,8,h);x.fillStyle='#34509f';x.fillRect(w/2-3,8,6,h-16);},[1,1]);
const tMetal=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#c8ccd2';x.fillRect(0,0,w,h);for(let i=0;i<24;i++){const v=r()<.5?255:120;x.fillStyle=`rgba(${v},${v},${v},${.03+r()*.03})`;x.fillRect(0,r()*h,w,4);}});
const tFoil=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#d2a238';x.fillRect(0,0,w,h);bintik(x,w,h,40,['#e2b84e','#c0922c','#d9ab40'],14,34,r);});
const tSuit=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#f1f1f5';x.fillRect(0,0,w,h);bintik(x,w,h,30,['#e4e4ec','#fafafe'],14,36,r);});
[tEarth,tCloud,tSolar,tMetal,tFoil,tSuit].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
function liveTex(w,h){const c=kanvas(w,h),x=c.getContext('2d'),t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return{c,x,t,w,h};}
function drawClock(L,txt,sub){const x=L.x,w=L.w,h=L.h;x.fillStyle='#04050d';x.fillRect(0,0,w,h);x.strokeStyle='#d93cf5';x.lineWidth=7;x.strokeRect(8,8,w-16,h-16);x.fillStyle='#f6e8ff';x.font="bold 118px 'JetBrains Mono',monospace";x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h*.42);x.fillStyle='#e48bff';x.font="bold 34px 'JetBrains Mono',monospace";x.fillText(sub,w/2,h*.82);L.t.needsUpdate=true;}
/* bahan */
const mMetal=M('#ffffff',{map:tMetal,roughness:.35,metalness:.7},false),mFoil=M('#ffffff',{map:tFoil,roughness:.35,metalness:.8,emissive:C('#3a2806')},false),mSuit=M('#ffffff',{map:tSuit,roughness:.85},false);
const mMod=M('#ffffff',{map:tMetal,roughness:.5,metalness:.3}),mFoilC=M('#ffffff',{map:tFoil,roughness:.35,metalness:.8,emissive:C('#3a2806')}),CAPM='#f5b942';
/* ================= DUNIA A: BUMI + STASIUN ================= */
const WA=new THREE.Group();SD.add(WA);
const EC=V3(0,0,-46),ER=27;
const earthG=new THREE.Group();earthG.position.copy(EC);WA.add(earthG);
const earthM=new THREE.Mesh(new THREE.SphereGeometry(ER,96,64),new THREE.MeshStandardMaterial({map:tEarth,roughness:.9}));earthG.add(earthM);
const cloudM=new THREE.Mesh(new THREE.SphereGeometry(ER+.4,96,64),new THREE.MeshStandardMaterial({map:tCloud,transparent:true,roughness:1,depthWrite:false}));earthG.add(cloudM);
const atmoS=sprite(tAtmo);atmoS.material.blending=THREE.NormalBlending;
/* garis orbit (strip) */
const ringPts=(c,R,n)=>Array.from({length:n+1},(_,i)=>{const a=i/n*Math.PI*2;return[c.x+R*Math.sin(a),c.y,c.z+R*Math.cos(a)];});
const ORB=mkTube(ringPts(EC,46,120),.2,PAL.aks,tAlir,480);
/* tabung modul berongga (tertutup, bisa diiris) */
function ringTube(rin,rout,z0,z1,seg,mat,par,cap,tile){const pos=[],nor=[],uv=[],ix=[];const add=(p,n,u,v)=>{pos.push(...p);nor.push(...n);uv.push(u,v);return pos.length/3-1;};
  const tri=(a,b,c,en)=>{const A=V3(pos[a*3],pos[a*3+1],pos[a*3+2]),B=V3(pos[b*3],pos[b*3+1],pos[b*3+2]),Cc=V3(pos[c*3],pos[c*3+1],pos[c*3+2]),n=B.clone().sub(A).cross(Cc.clone().sub(A));if(n.dot(en)<0)ix.push(a,c,b);else ix.push(a,b,c);};
  for(let i=0;i<seg;i++){const a0=i/seg*Math.PI*2,a1=(i+1)/seg*Math.PI*2,c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1),am=(a0+a1)/2,cm=Math.cos(am),sm=Math.sin(am),u0=i/seg*4,u1=(i+1)/seg*4;
    let v=[add([rout*c0,rout*s0,z0],[c0,s0,0],u0,z0/tile),add([rout*c1,rout*s1,z0],[c1,s1,0],u1,z0/tile),add([rout*c0,rout*s0,z1],[c0,s0,0],u0,z1/tile),add([rout*c1,rout*s1,z1],[c1,s1,0],u1,z1/tile)];tri(v[0],v[1],v[2],V3(cm,sm,0));tri(v[1],v[3],v[2],V3(cm,sm,0));
    v=[add([rin*c0,rin*s0,z0],[-c0,-s0,0],u0,z0/tile),add([rin*c1,rin*s1,z0],[-c1,-s1,0],u1,z0/tile),add([rin*c0,rin*s0,z1],[-c0,-s0,0],u0,z1/tile),add([rin*c1,rin*s1,z1],[-c1,-s1,0],u1,z1/tile)];tri(v[0],v[1],v[2],V3(-cm,-sm,0));tri(v[1],v[3],v[2],V3(-cm,-sm,0));
    [[z0,-1],[z1,1]].forEach(([z,sg])=>{v=[add([rin*c0,rin*s0,z],[0,0,sg],0,0),add([rin*c1,rin*s1,z],[0,0,sg],0,0),add([rout*c0,rout*s0,z],[0,0,sg],0,0),add([rout*c1,rout*s1,z],[0,0,sg],0,0)];tri(v[0],v[1],v[2],V3(0,0,sg));tri(v[1],v[3],v[2],V3(0,0,sg));});}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);
  const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;if(cap)o.add(new THREE.Mesh(g,capM(cap)));par.add(o);return o;}
function cylZ(r,z0,z1,mat,par,cap){const g=new THREE.CylinderGeometry(r,r,z1-z0,48);g.rotateX(Math.PI/2);const o=new THREE.Mesh(g,mat);o.position.z=(z0+z1)/2;o.castShadow=o.receiveShadow=true;if(cap)o.add(new THREE.Mesh(g,capM(cap)));par.add(o);return o;}
const STN=new THREE.Group();WA.add(STN);
ringTube(3.1,3.4,-6,6,56,mMod,STN,CAPM,6);
cylZ(3.4,6,6.6,mMod,STN,CAPM);cylZ(3.4,-6.6,-6,mMod,STN,CAPM);
[-4.2,4.2].forEach(z=>ringTube(3.38,3.58,z-.6,z+.6,56,mFoilC,STN,CAPM,3));
[-1.8,1.8].forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(3.45,.07,8,56),new THREE.MeshBasicMaterial({color:C('#e458ff'),toneMapped:false}));t.position.z=z;STN.add(t);});
/* rangka + panel surya */
kb(-17,17,4.15,5.05,-.45,.45,mMetal,STN,null,3);
[-1.7,1.7].forEach(x=>kb(x-.15,x+.15,3.4,4.15,-.15,.15,mMetal,STN,null,3));
[-16,-10.5,10.5,16].forEach(xc=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(5,12),new THREE.MeshStandardMaterial({map:tSolar,roughness:.35,metalness:.5,side:THREE.DoubleSide}));p.rotation.x=-Math.PI/2;p.position.set(xc,4.6,0);p.castShadow=p.receiveShadow=true;STN.add(p);
  kb(xc-.1,xc+.1,4.4,4.8,-6.2,6.2,mMetal,STN,null,3);});
/* isi ruang: panel rak di dinding kiri, layar jam digital besar */
const mRack=M('#e6e8ee',{roughness:.6,metalness:.2},false),mRackA=M('#b01fd0',{roughness:.5,metalness:.2,emissive:C('#3a0a46')},false);
[-4.4,-1.6,1.6,4.4].forEach((z,zi)=>{[140,160,200,220].forEach((deg,di)=>{const g=new THREE.Group();g.position.set(0,0,z);g.rotation.z=deg*DEG;STN.add(g);kb(2.55,2.95,-.55,.55,-.95,.95,(zi+di)%5===0?mRackA:mRack,g,null,3);});});
const CLK=liveTex(512,256);
{const scr=new THREE.Mesh(new THREE.PlaneGeometry(5.0,2.5),new THREE.MeshBasicMaterial({map:CLK.t,toneMapped:false}));scr.rotation.y=Math.PI/2;scr.position.set(-2.66,.3,.2);STN.add(scr);
 kb(-2.9,-2.7,-1.35,1.65,-1.35,1.75,mMetal,STN,null,3);}
const INL=new THREE.PointLight(C('#fff3e0'),1.0,16,1.2);INL.position.set(1.2,2.0,2.5);WA.add(INL);
/* astronaut melayang */
const ASTRO=new THREE.Group();ASTRO.position.set(.3,-.2,1.6);STN.add(ASTRO);
function limbY(r,len,mat,pos,rx,rz){const g=new THREE.Group(),c=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,14),mat);g.add(c);[-1,1].forEach(s=>{const b=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat);b.position.y=s*len/2;g.add(b);});g.traverse(m=>{if(m.isMesh)m.castShadow=true;});g.position.set(...pos);g.rotation.set(rx||0,0,rz||0);ASTRO.add(g);return g;}
{limbY(.48,1.1,mSuit,[0,0,0],0,.2);                                   // badan
 const hel=new THREE.Mesh(new THREE.SphereGeometry(.56,24,18),mSuit);hel.position.set(-.12,1.1,0);hel.castShadow=true;ASTRO.add(hel);
 const vis=new THREE.Mesh(new THREE.SphereGeometry(.5,20,14,-.9,1.8,.5,1.7),M('#2a1c40',{roughness:.15,metalness:.9},false));vis.position.set(-.12,1.1,.1);vis.rotation.y=.7;ASTRO.add(vis);
 const pk=new THREE.Mesh(new THREE.BoxGeometry(.8,1.2,.4),M('#cfd2da',{roughness:.5,metalness:.3},false));pk.position.set(.2,.05,-.55);pk.rotation.z=.2;ASTRO.add(pk);
 limbY(.2,1.2,mSuit,[-.5,.3,.2],0,1.2);limbY(.2,1.2,mSuit,[.55,.55,.3],0,-.9);
 limbY(.24,1.3,mSuit,[-.15,-1.1,.15],0,.35);limbY(.24,1.3,mSuit,[.25,-1.0,-.1],0,-.15);
 const pa=new THREE.Mesh(new THREE.BoxGeometry(.3,.22,.06),mRackA);pa.position.set(-.1,.35,.5);pa.rotation.z=.2;ASTRO.add(pa);}
/* jam saku kuningan (motif seri) */
function mkWatch(par,pos,sc){const g=new THREE.Group();g.position.set(...pos);g.scale.setScalar(sc);par.add(g);silinder(.45,0,.14,mBrass,g,[0,0],32);const fc=new THREE.Mesh(new THREE.CircleGeometry(.38,32),new THREE.MeshStandardMaterial({map:tClock,roughness:.5}));fc.rotation.x=-Math.PI/2;fc.position.y=.145;g.add(fc);
  const bw=new THREE.Mesh(new THREE.TorusGeometry(.1,.035,8,16),mBrass);bw.position.set(0,.1,-.55);bw.rotation.x=Math.PI/2;g.add(bw);const h1=new THREE.Group();h1.position.y=.16;g.add(h1);kb(-.015,.015,0,.01,-.3,0,M('#1a1008',{},false),h1);const h2=new THREE.Group();h2.position.y=.165;g.add(h2);kb(-.02,.02,0,.01,-.2,0,M('#1a1008',{},false),h2);return{g,h1,h2};}
const WAT_A=mkWatch(WA,[-8,7,7],1.9),WAT_B=mkWatch(WA,[3,7.4,7],1.9);
const WSTRIP=mkTube([[1,7.4,7],[20,7.4,7]],.14,PAL.aks,tAlir,60);
/* ================= DUNIA B: PESAWAT + JAM ATOM (1971) ================= */
const BASE=V3(0,2000,0),WB=new THREE.Group();WB.position.copy(BASE);SD.add(WB);WB.visible=false;
const GR=16;
const globeM=new THREE.Mesh(new THREE.SphereGeometry(GR,96,64),new THREE.MeshStandardMaterial({map:tEarth,roughness:.9}));WB.add(globeM);
const cloudB=new THREE.Mesh(new THREE.SphereGeometry(GR+.3,96,64),new THREE.MeshStandardMaterial({map:tCloud,transparent:true,roughness:1,depthWrite:false}));WB.add(cloudB);
/* jam atom di darat (menara kecil di garis lintang 0, depan) */
const PED=new THREE.Group();PED.position.set(0,0,GR);WB.add(PED);
silinder(.7,0,1.8,mMetal,PED,[0,0],20);kb(-1.1,1.1,1.8,3.0,-.8,.8,M('#dfe3ea',{roughness:.5,metalness:.4},false),PED,null,3);kb(-.9,.9,2.0,2.8,.8,.84,M('#04050d',{roughness:.3},false),PED,null,3);kb(-1.1,1.1,2.95,3.05,-.8,.8,mRackA,PED,null,3);
/* pesawat */
const PLN=new THREE.Group();WB.add(PLN);
{const wh=M('#f4f4f8',{roughness:.35,metalness:.2},false),pm=M('#b01fd0',{roughness:.4,metalness:.2,emissive:C('#3a0a46')},false),dk=M('#2a2a36',{roughness:.5},false);
 const fus=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,6,24),wh);fus.rotation.z=Math.PI/2;fus.castShadow=true;PLN.add(fus);
 const nose=new THREE.Mesh(new THREE.SphereGeometry(.6,20,14),wh);nose.scale.x=1.8;nose.position.x=3.0;nose.castShadow=true;PLN.add(nose);
 const tail=new THREE.Mesh(new THREE.ConeGeometry(.6,2.2,20),wh);tail.rotation.z=Math.PI/2;tail.position.x=-4.0;tail.castShadow=true;PLN.add(tail);
 kb(-.7,.9,-.12,.0,-3.7,3.7,wh,PLN,null,3);kb(-3.9,-2.7,.1,1.6,-.07,.07,wh,PLN,null,3);kb(-3.8,-2.9,.0,.08,-1.4,1.4,wh,PLN,null,3);kb(-3.9,-2.7,.9,1.4,-.08,.08,pm,PLN,null,3);
 [-1.9,1.9].forEach(z=>{const en=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,1.2,16),dk);en.rotation.z=Math.PI/2;en.position.set(.5,-.45,z);en.castShadow=true;PLN.add(en);});
 const st=new THREE.Mesh(new THREE.BoxGeometry(5.8,.12,1.25),pm);st.position.set(0,.02,0);PLN.add(st);
 for(let i=0;i<9;i++){const w=new THREE.Mesh(new THREE.BoxGeometry(.2,.16,1.24),dk);w.position.set(2.0-i*.42,.2,0);PLN.add(w);}
 kb(-.4,.5,-.95,-.55,-.4,.4,mMetal,PLN,null,3);kb(-.35,.45,-.85,-.7,.405,.43,mRackA,PLN,null,3);}
const PLG=sprite(tGlowM);
const PTR=mkTube(ringPts(V3(2000*0,0,0),19.5,120).map(p=>[p[0]+BASE.x,p[1]+BASE.y,p[2]+BASE.z]),.17,PAL.aks,tAlir,480);
/* '?' besar */
const TANYA=sprite(tTanya);
