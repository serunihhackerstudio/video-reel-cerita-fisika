
/* ---------- tekstur baru (besar, kontras rendah: anti-kedip) ---------- */
const tSoil=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6a4630';x.fillRect(0,0,w,h);bintik(x,w,h,500,['#74503a','#5f3f2b','#6e4a34'],4,10,r);});
const tRock=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6f6a82';x.fillRect(0,0,w,h);for(let j=0;j<8;j++){x.fillStyle=j%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)';x.fillRect(0,j*32+((r()*10)|0),w,18+((r()*10)|0));}bintik(x,w,h,300,['#7a7590','#645f77'],6,14,r);});
const tMat=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#d6bf8c';x.fillRect(0,0,w,h);for(let i=0;i<16;i++){x.fillStyle=i%2?'#cdb27a':'#e0cb9c';x.fillRect(0,i*16,w,12);}for(let i=0;i<8;i++){x.fillStyle='#bba070';x.fillRect(i*32,0,3,h);}});
const tMoon=teksturK(512,256,(x,w,h,r)=>{x.fillStyle='#b9b8c4';x.fillRect(0,0,w,h);for(let i=0;i<60;i++){const cx=r()*w,cy=r()*h,rr=8+r()*26;x.fillStyle='rgba(60,60,80,.22)';x.beginPath();x.arc(cx,cy,rr,0,7);x.fill();x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.arc(cx-rr*.15,cy-rr*.15,rr*.8,0,7);x.fill();}});
const tGal=teksturK(512,512,(x,w,h,r)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(256,256,0,256,256,256);g.addColorStop(0,'rgba(255,240,210,1)');g.addColorStop(.12,'rgba(255,210,150,.85)');g.addColorStop(.4,'rgba(170,140,255,.35)');g.addColorStop(1,'rgba(120,90,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let k=0;k<2;k++)for(let i=0;i<1400;i++){const t=i/1400,a=t*9+k*Math.PI,rr=14+t*220+(r()-.5)*18,px=256+Math.cos(a)*rr,py=256+Math.sin(a)*rr;x.fillStyle=`rgba(${190+((r()*60)|0)},${170+((r()*50)|0)},255,${.25+r()*.5})`;x.beginPath();x.arc(px,py,1+r()*2.4,0,7);x.fill();}});
const tGal2=teksturK(256,256,(x,w,h,r)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,'rgba(255,200,170,1)');g.addColorStop(.3,'rgba(255,150,170,.6)');g.addColorStop(1,'rgba(255,100,160,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tSikat=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#b9bec3';x.fillRect(0,0,w,h);for(let i=0;i<60;i++){x.fillStyle=`rgba(${r()<.5?255:90},${r()<.5?255:95},${r()<.5?255:100},${.04+r()*.08})`;x.fillRect(0,r()*h,w,2);}});
const tGrassS=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6b9250';x.fillRect(0,0,w,h);bintik(x,w,h,160,['#628a49','#749a58','#6a9150','#5d8545'],10,26,r);bintik(x,w,h,120,['rgba(255,255,255,.04)','rgba(0,0,0,.05)'],8,18,r);});
[tGrassS,tGrass,tSoil,tRock,tMat,tMoon,tSikat].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
/* ================= BUKIT (tiga lapisan, tertutup, bisa diiris) ================= */
const HR=22,NG=64,GY0=3.0;
const hillH=(x,z)=>GY0*Math.exp(-(x*x+z*z)/200);
function slab(lo,hi,mat,cap,tile){const pos=[],uv=[],ix=[];let base=0;
  const addGrid=(nu,nv,f,flip,wallMode)=>{for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const p=f(i/nu,j/nv);pos.push(...p);if(wallMode)uv.push((p[0]+p[2])/tile,p[1]/tile);else uv.push(p[0]/tile,p[2]/tile);}
    for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=base+j*(nu+1)+i,b=a+1,c=a+nu+1,d=c+1;if(flip)ix.push(a,b,c,b,d,c);else ix.push(a,c,b,b,c,d);}base+=(nu+1)*(nv+1);};
  const X=u=>-HR+2*HR*u;
  addGrid(NG,NG,(u,v)=>[X(u),hi(X(u),X(v)),X(v)],false,false);addGrid(NG,NG,(u,v)=>[X(u),lo(X(u),X(v)),X(v)],true,false);
  const wall=(fx,flip)=>addGrid(NG,1,(u,v)=>{const[x,z]=fx(X(u)),yl=lo(x,z),yh=hi(x,z);return[x,yl+(yh-yl)*v,z];},flip,true);
  wall(x=>[x,-HR],false);wall(x=>[x,HR],true);wall(z=>[-HR,z],true);wall(z=>[HR,z],false);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
  const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;if(cap)o.add(new THREE.Mesh(g,capM(cap)));SD.add(o);return o;}
const mGr=M('#ffffff',{map:tGrassS,roughness:1}),mSo=M('#ffffff',{map:tSoil,roughness:1}),mRk=M('#ffffff',{map:tRock,roughness:.95});
slab((x,z)=>hillH(x,z)-.35,hillH,mGr,'#b9e57d',12);
slab((x,z)=>hillH(x,z)-2.6,(x,z)=>hillH(x,z)-.35,mSo,'#c07a40',6);
slab(()=>-7,(x,z)=>hillH(x,z)-2.6,mRk,'#a99ee0',6);
/* pohon rendah di tepi bukit */
function pohon(x,z,s,col){const g=new THREE.Group(),y=hillH(x,z);g.position.set(x,y,z);g.scale.setScalar(s);SD.add(g);silinder(.38,0,2.6,M('#4a3524',{roughness:1},false),g,[0,0],8,.55);
  [[0,4.1,0,2.8],[1.3,3.5,.5,2.2],[-1.1,3.6,-.7,2.3],[.2,5.4,.4,2.0]].forEach(([a,b,c,r],i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),M(col[i%col.length],{roughness:.95,flatShading:true},false));m.position.set(a,b,c);m.castShadow=m.receiveShadow=true;g.add(m);});}
const grn=['#3f6a35','#4a7a3c','#37602e'];
[[-14,-12,1.0],[-17,6,1.1],[-9,15,.9],[13,-14,1.0],[16,-2,1.1],[11,14,.9],[-4,-17,.9],[6,-18,1.0]].forEach(([x,z,s])=>pohon(x,z,s,grn));
[[-7,-7,.9],[8,-6,.8],[-10,9,.7],[10,8,.8],[3,-12,.7]].forEach(([x,z,s])=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1*s,1),M('#7d7a8c',{roughness:1,flatShading:true},false));m.position.set(x,hillH(x,z)+.2*s,z);m.scale.y=.7;m.castShadow=m.receiveShadow=true;SD.add(m);});
/* ================= PENGAMAT, TIKAR, TELESKOP, LENTERA ================= */
const GY=GY0+.03;
const OBS=new THREE.Group();SD.add(OBS);
{const mat=new THREE.Mesh(new THREE.BoxGeometry(2.6,.06,5.6),new THREE.MeshStandardMaterial({map:tMat,roughness:1}));mat.position.set(0,GY,0);mat.castShadow=mat.receiveShadow=true;boxUV(mat.geometry,2.6,.06,5.6,3);OBS.add(mat);
 [-1.18,1.18].forEach(x=>{const st=new THREE.Mesh(new THREE.BoxGeometry(.18,.075,5.6),M('#c92fe0',{roughness:.9},false));st.position.set(x,GY+.005,0);OBS.add(st);});}
const skin=M('#d7a47c',{roughness:.7},false),shirt=M('#2c3a66',{roughness:.9},false),pants=M('#7d6a4a',{roughness:.9},false),hair=M('#1a1410',{roughness:.9},false),shoe=M('#2a2430',{roughness:.8},false);
function limb(r,len,mat,pos,rot){const g=new THREE.Group(),c=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,14),mat);c.rotation.x=Math.PI/2;g.add(c);[-1,1].forEach(s=>{const b=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat);b.position.z=s*len/2;g.add(b);});g.traverse(m=>{if(m.isMesh)m.castShadow=true;});g.position.set(...pos);if(rot)g.rotation.y=rot;OBS.add(g);return g;}
{const by=GY+.5;limb(.5,1.5,shirt,[0,by,-.45]);                       // badan
 const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,20,16),skin);hd.position.set(0,by+.02,-1.62);hd.castShadow=true;OBS.add(hd);
 const hr=new THREE.Mesh(new THREE.SphereGeometry(.44,20,16,0,Math.PI*2,0,Math.PI*.55),hair);hr.position.set(0,by+.04,-1.65);hr.rotation.x=-.5;hr.castShadow=true;OBS.add(hr);
 limb(.24,1.5,pants,[-.24,by-.2,1.1]);limb(.24,1.5,pants,[.24,by-.2,1.1]);
 [-.24,.24].forEach(x=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.4,.28,.7),shoe);s.position.set(x,by-.28,2.05);s.castShadow=true;OBS.add(s);});
 limb(.17,1.5,shirt,[-.72,by-.1,-.3]);limb(.17,1.5,shirt,[.72,by-.1,-.3]);
 [-.72,.72].forEach(x=>{const h=new THREE.Mesh(new THREE.SphereGeometry(.18,12,8),skin);h.position.set(x,by-.1,.5);OBS.add(h);});}
const EYE=V3(0,GY+1.1,-1.55);
function V3(x,y,z){return new THREE.Vector3(x,y,z);}
/* teleskop */
{const g=new THREE.Group(),ap=V3(2.7,GY+2.1,-.7);OBS.add(g);const mm=M('#ffffff',{map:tSikat,roughness:.35,metalness:.8},false);
 [[1,0],[-.5,.87],[-.5,-.87]].forEach(([a,b])=>{const gnd=V3(ap.x+a*1.0,GY,ap.z+b*1.0),d=gnd.clone().sub(ap),L=d.length(),c=new THREE.Mesh(new THREE.CylinderGeometry(.045,.06,L,8),M('#3a3340',{roughness:.6,metalness:.4},false));c.position.copy(ap).add(gnd).multiplyScalar(.5);c.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());c.castShadow=true;g.add(c);});
 const dir=V3(-.38,.84,-.4).normalize(),tb=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,2.6,24),mm);tb.position.copy(ap).addScaledVector(dir,1.0);tb.quaternion.setFromUnitVectors(V3(0,1,0),dir);tb.castShadow=true;g.add(tb);
 const rg=new THREE.Mesh(new THREE.TorusGeometry(.21,.035,8,24),mBrass);rg.position.copy(ap).addScaledVector(dir,2.28);rg.quaternion.setFromUnitVectors(V3(0,0,1),dir);g.add(rg);
 const ep=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.5,12),mBrass);ep.position.copy(ap).addScaledVector(dir,-.4);ep.quaternion.setFromUnitVectors(V3(0,1,0),dir);g.add(ep);
 const hb=new THREE.Mesh(new THREE.SphereGeometry(.16,12,10),mBrass);hb.position.copy(ap);g.add(hb);window.TELE=ap;}
/* lentera hangat */
const LANT=new THREE.Group();LANT.position.set(-2.2,GY,.9);OBS.add(LANT);
silinder(.22,0,.12,mBrass,LANT,[0,0],16);{const gl=new THREE.Mesh(new THREE.CylinderGeometry(.17,.19,.5,14),new THREE.MeshStandardMaterial({color:C('#ffd9a0'),emissive:C('#ffb257'),emissiveIntensity:1.2,transparent:true,opacity:.85}));gl.position.y=.37;LANT.add(gl);}
silinder(.2,.62,.68,mBrass,LANT,[0,0],16);
const LANTL=new THREE.PointLight(C('#ffb26a'),1.6,14,1.4);LANTL.position.set(-2.2,GY+.9,.9);SD.add(LANTL);
/* jam saku kuningan (motif seri) */
const PW=new THREE.Group();PW.position.set(1.2,GY+.04,1.7);PW.scale.setScalar(1.2);OBS.add(PW);
silinder(.45,0,.14,mBrass,PW,[0,0],32);{const fc=new THREE.Mesh(new THREE.CircleGeometry(.38,32),new THREE.MeshStandardMaterial({map:tClock,roughness:.5}));fc.rotation.x=-Math.PI/2;fc.position.y=.145;PW.add(fc);
 const bw=new THREE.Mesh(new THREE.TorusGeometry(.1,.035,8,16),mBrass);bw.position.set(0,.1,-.55);bw.rotation.x=Math.PI/2;PW.add(bw);}
const pwH=new THREE.Group();pwH.position.y=.16;PW.add(pwH);kb(-.015,.015,0,.01,-.3,0,M('#1a1008',{},false),pwH);const pwH2=new THREE.Group();pwH2.position.y=.165;PW.add(pwH2);kb(-.02,.02,0,.01,-.2,0,M('#1a1008',{},false),pwH2);
/* ================= LAPISAN LANGIT ================= */
const LAYY=[12.5,22.5,33.5,45.5,58.5],LAYP=[V3(-5,12.5,-3),V3(6.5,22.5,-4),V3(-6,33.5,-6),V3(5.5,45.5,-8),V3(-3,58.5,-10)];
const mRim=()=>new THREE.MeshBasicMaterial({color:C('#e458ff'),transparent:true,opacity:0,toneMapped:false,depthWrite:false});
const LAY=LAYY.map((y,i)=>{const g=new THREE.Group();g.position.y=y;SD.add(g);const fill=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshBasicMaterial({color:C('#a995ff'),transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,toneMapped:false}));fill.rotation.x=-Math.PI/2;fill.renderOrder=5;g.add(fill);
  const rm=mRim(),bars=[[30,.14,0,-15],[30,.14,0,15],[.14,30,-15,0],[.14,30,15,0]].map(([a,b,px,pz])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a,.14,b===.14?a:b),rm);const horiz=a>1;m.geometry=new THREE.BoxGeometry(horiz?30:.14,.14,horiz?.14:30);m.position.set(px,0,pz);m.renderOrder=6;g.add(m);return m;});
  g.visible=false;return{g,fill,rm,y};});
/* benda langit */
const moonM=new THREE.Mesh(new THREE.SphereGeometry(1.5,36,24),new THREE.MeshStandardMaterial({map:tMoon,emissive:C('#8a8aa0'),emissiveMap:tMoon,emissiveIntensity:.6,roughness:1}));moonM.position.copy(LAYP[0]);SD.add(moonM);
const sunM=new THREE.Mesh(new THREE.SphereGeometry(2.2,36,24),new THREE.MeshBasicMaterial({color:C('#ffd25a'),toneMapped:false}));sunM.position.copy(LAYP[1]);SD.add(sunM);
const starM=new THREE.Mesh(new THREE.SphereGeometry(1.1,28,20),new THREE.MeshBasicMaterial({color:C('#fff4d6'),toneMapped:false}));starM.position.copy(LAYP[2]);SD.add(starM);
const andM=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshBasicMaterial({map:tGal,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,side:THREE.DoubleSide,opacity:0}));andM.position.copy(LAYP[3]);andM.rotation.set(-1.1,0,.5);SD.add(andM);
const galM=new THREE.Mesh(new THREE.PlaneGeometry(4,2.6),new THREE.MeshBasicMaterial({map:tGal2,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,side:THREE.DoubleSide,opacity:0}));galM.position.copy(LAYP[4]);galM.rotation.set(-1.0,0,.3);SD.add(galM);
const glMoon=sprite(tGlowW),glSun=sprite(tGlowW),glStar=sprite(tGlowW),glGal=sprite(tGlowM);
[moonM,sunM,starM,andM,galM].forEach(m=>m.visible=false);
/* teleskop raksasa (cermin segi enam emas) di jalur cahaya galaksi jauh */
const MIR=new THREE.Group();SD.add(MIR);
{const gm=M('#e8b53a',{metalness:.85,roughness:.28,emissive:C('#3a2806')},false);const hx=[[0,0],[1,0],[-1,0],[.5,.87],[-.5,.87],[.5,-.87],[-.5,-.87],[1.5,.87],[-1.5,.87],[1.5,-.87],[-1.5,-.87],[0,1.73],[0,-1.73],[1,1.73],[-1,1.73],[1,-1.73],[-1,-1.73],[2,0],[-2,0]];
 hx.forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.12,6),gm);m.rotation.x=Math.PI/2;m.position.set(a*1.02,b*1.02,0);m.rotation.y=0;MIR.add(m);});}
MIR.visible=false;
/* '?' dan strip */
const TANYA=sprite(tTanya);
const EYEA=[EYE.x,EYE.y,EYE.z],SG=[[-2.5,21,-6],[-5,12.5,-3],[6.5,22.5,-4],[-6,33.5,-6],[5.5,45.5,-8],[-3,58.5,-10]].map((p,i)=>mkTube([p,EYEA],i?.13:.12,PAL.aks,tAlir,160));
const PKT=SG.map(()=>sprite(tGlowM));
