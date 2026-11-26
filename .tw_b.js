
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
/* ---------- tekstur (besar & lembut: anti-kedip) ---------- */
const tConc=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#b4b0aa';x.fillRect(0,0,w,h);bintik(x,w,h,160,['#aaa6a0','#bebab4','#b0aca6'],8,22,r);x.fillStyle='rgba(60,56,50,.10)';x.fillRect(0,0,w,3);x.fillRect(0,0,3,h);});
const tGrassS=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6b9250';x.fillRect(0,0,w,h);bintik(x,w,h,160,['#628a49','#749a58','#6a9150','#5d8545'],10,26,r);bintik(x,w,h,120,['rgba(255,255,255,.04)','rgba(0,0,0,.05)'],8,18,r);});
const tSoil=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6a4630';x.fillRect(0,0,w,h);bintik(x,w,h,400,['#74503a','#5f3f2b','#6e4a34'],6,14,r);});
const tMetal=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#c8ccd2';x.fillRect(0,0,w,h);for(let i=0;i<24;i++){const v=r()<.5?255:120;x.fillStyle=`rgba(${v},${v},${v},${.03+r()*.03})`;x.fillRect(0,r()*h,w,4);}});
const tSuit=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#f1f1f5';x.fillRect(0,0,w,h);bintik(x,w,h,30,['#e4e4ec','#fafafe'],14,36,r);});
[tConc,tGrassS,tSoil,tMetal,tSuit].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
function liveTex(w,h){const c=kanvas(w,h),x=c.getContext('2d'),t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return{c,x,t,w,h};}
function drawCal(L,head,year,sub){const x=L.x,w=L.w,h=L.h;x.fillStyle='#f7f1e4';x.fillRect(0,0,w,h);x.fillStyle='#b01fd0';x.fillRect(0,0,w,Math.round(h*.24));x.fillStyle='#fff';x.font="bold 46px 'JetBrains Mono',monospace";x.textAlign='center';x.textBaseline='middle';x.fillText(head,w/2,h*.12);
  x.fillStyle='#2a1c30';x.font="bold 120px 'JetBrains Mono',monospace";x.fillText(String(year),w/2,h*.55);x.fillStyle='#6a4a80';x.font="bold 34px 'JetBrains Mono',monospace";x.fillText(sub,w/2,h*.88);L.t.needsUpdate=true;}
/* bahan & alat dengan bidang potong sendiri */
const mkM=pl=>(hex,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:C(hex),roughness:.75},o,{clippingPlanes:pl,clipShadows:true}));
const mkCap=pl=>hex=>new THREE.MeshBasicMaterial({color:C(hex),side:THREE.BackSide,clippingPlanes:pl,toneMapped:false});
const MR=mkM([PR]),CR=mkCap([PR]),MH=mkM([PHZ,PHX,PHY]),CH=mkCap([PHZ,PHX,PHY]);
function kbp(CF,x0,x1,y0,y1,z0,z1,mat,par,cap,tile=4){const sx=x1-x0,sy=y1-y0,sz=z1-z0,g=new THREE.BoxGeometry(sx,sy,sz);boxUV(g,sx,sy,sz,tile);const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;o.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(cap)o.add(new THREE.Mesh(g,CF(cap)));par.add(o);return o;}
function ringTubeP(CF,rin,rout,z0,z1,seg,mat,par,cap,tile){const pos=[],nor=[],uv=[],ix=[];const add=(p,n,u,v)=>{pos.push(...p);nor.push(...n);uv.push(u,v);return pos.length/3-1;};
  const tri=(a,b,c,en)=>{const A=V3(pos[a*3],pos[a*3+1],pos[a*3+2]),B=V3(pos[b*3],pos[b*3+1],pos[b*3+2]),Cc=V3(pos[c*3],pos[c*3+1],pos[c*3+2]),n=B.clone().sub(A).cross(Cc.clone().sub(A));if(n.dot(en)<0)ix.push(a,c,b);else ix.push(a,b,c);};
  for(let i=0;i<seg;i++){const a0=i/seg*Math.PI*2,a1=(i+1)/seg*Math.PI*2,c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1),am=(a0+a1)/2,cm=Math.cos(am),sm=Math.sin(am),u0=i/seg*4,u1=(i+1)/seg*4;
    let v=[add([rout*c0,rout*s0,z0],[c0,s0,0],u0,z0/tile),add([rout*c1,rout*s1,z0],[c1,s1,0],u1,z0/tile),add([rout*c0,rout*s0,z1],[c0,s0,0],u0,z1/tile),add([rout*c1,rout*s1,z1],[c1,s1,0],u1,z1/tile)];tri(v[0],v[1],v[2],V3(cm,sm,0));tri(v[1],v[3],v[2],V3(cm,sm,0));
    v=[add([rin*c0,rin*s0,z0],[-c0,-s0,0],u0,z0/tile),add([rin*c1,rin*s1,z0],[-c1,-s1,0],u1,z0/tile),add([rin*c0,rin*s0,z1],[-c0,-s0,0],u0,z1/tile),add([rin*c1,rin*s1,z1],[-c1,-s1,0],u1,z1/tile)];tri(v[0],v[1],v[2],V3(-cm,-sm,0));tri(v[1],v[3],v[2],V3(-cm,-sm,0));
    [[z0,-1],[z1,1]].forEach(([z,sg])=>{v=[add([rin*c0,rin*s0,z],[0,0,sg],0,0),add([rin*c1,rin*s1,z],[0,0,sg],0,0),add([rout*c0,rout*s0,z],[0,0,sg],0,0),add([rout*c1,rout*s1,z],[0,0,sg],0,0)];tri(v[0],v[1],v[2],V3(0,0,sg));tri(v[1],v[3],v[2],V3(0,0,sg));});}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);
  const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;if(cap)o.add(new THREE.Mesh(g,CF(cap)));par.add(o);return o;}
/* orang bergaya sederhana (tanpa wajah di 3D) */
const mSuit=M('#ffffff',{map:tSuit,roughness:.85},false);
function mkPerson(o){const g=new THREE.Group(),mt=c=>M(c,{roughness:.85},false),skin=M('#d7a47c',{roughness:.7},false),bodyM=o.astro?mSuit:mt(o.shirt),legM=o.astro?mSuit:mt(o.pants),hairM=M(o.hair,{roughness:.9},false);
  const part=(r,len,m,pos,rot)=>{const p=new THREE.Group(),c=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,14),m);p.add(c);[-1,1].forEach(s=>{const b=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),m);b.position.y=s*len/2;p.add(b);});p.traverse(x=>{if(x.isMesh)x.castShadow=true;});p.position.set(...pos);if(rot)p.rotation.set(...rot);g.add(p);return p;};
  const P={g,hairM};
  if(o.seated){[-.28,.28].forEach((x,i)=>{part(.27,1.0,legM,[x,1.75,.5],[Math.PI/2,0,0]);part(.25,1.0,legM,[x,1.25,1.1]);});P.torso=part(.5,1.4,bodyM,[0,2.55,0]);}
  else{P.legL=part(.27,1.5,legM,[-.28,.95,0]);P.legR=part(.27,1.5,legM,[.28,.95,0]);P.torso=part(.5,1.4,bodyM,[0,2.55,0]);}
  P.armL=part(.17,1.5,bodyM,[-.72,2.5,0],[0,0,.15]);P.armR=part(.17,1.5,bodyM,[.72,2.5,0],[0,0,-.15]);
  const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,20,16),skin);hd.position.y=3.65;hd.castShadow=true;g.add(hd);P.head=hd;
  const hr=new THREE.Mesh(new THREE.SphereGeometry(.45,20,16,0,Math.PI*2,0,Math.PI*.55),hairM);hr.position.y=3.68;hr.castShadow=true;g.add(hr);P.hair=hr;
  if(o.astro){const hel=new THREE.Mesh(new THREE.SphereGeometry(.64,24,18),new THREE.MeshStandardMaterial({color:C('#f4f4f8'),roughness:.4,transparent:true,opacity:.25,depthWrite:false}));hel.position.y=3.66;g.add(hel);const pk=new THREE.Mesh(new THREE.BoxGeometry(.9,1.2,.4),M('#cfd2da',{roughness:.5,metalness:.3},false));pk.position.set(0,2.6,-.55);g.add(pk);
    const pa=new THREE.Mesh(new THREE.BoxGeometry(.3,.22,.06),M('#b01fd0',{roughness:.5,emissive:C('#3a0a46')},false));pa.position.set(-.2,2.9,.5);g.add(pa);}
  else{[-.28,.28].forEach(x=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.4,.26,.7),M('#3a3140',{roughness:.8},false));s.position.set(x,.15,.1);g.add(s);});}
  return P;}
function mkWatch(par,pos,sc){const g=new THREE.Group();g.position.set(...pos);g.scale.setScalar(sc);par.add(g);silinder(.45,0,.14,mBrass,g,[0,0],32);const fc=new THREE.Mesh(new THREE.CircleGeometry(.38,32),new THREE.MeshStandardMaterial({map:tClock,roughness:.5}));fc.rotation.x=-Math.PI/2;fc.position.y=.145;g.add(fc);
  const bw=new THREE.Mesh(new THREE.TorusGeometry(.1,.035,8,16),mBrass);bw.position.set(0,.1,-.55);bw.rotation.x=Math.PI/2;g.add(bw);const h1=new THREE.Group();h1.position.y=.16;g.add(h1);kb(-.015,.015,0,.01,-.3,0,M('#1a1008',{},false),h1);const h2=new THREE.Group();h2.position.y=.165;g.add(h2);kb(-.02,.02,0,.01,-.2,0,M('#1a1008',{},false),h2);return{g,h1,h2};}
const ringPts=(c,R,n)=>Array.from({length:n+1},(_,i)=>{const a=i/n*Math.PI*2;return[c.x+R*Math.sin(a),c.y,c.z+R*Math.cos(a)];});
/* ================= DUNIA A: LANDASAN ================= */
const WA=new THREE.Group();SD.add(WA);
const mGr=M('#ffffff',{map:tGrassS,roughness:1},false),mSo=M('#ffffff',{map:tSoil,roughness:1},false),mCo=M('#ffffff',{map:tConc,roughness:.9},false);
kb(-32,32,-4,0,-32,32,[mSo,mSo,mGr,mSo,mSo,mSo],WA,null,10);
kb(-10,10,0,.5,-9,12,mCo,WA,null,6);kb(8,20,0,.1,-3,2,mCo,WA,null,6);
function pohon(x,z,s){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(s);WA.add(g);silinder(.38,0,2.8,M('#4a3524',{roughness:1},false),g,[0,0],8,.55);
  [[0,4.3,0,2.9],[1.3,3.7,.5,2.3],[-1.1,3.8,-.7,2.4],[.2,5.7,.4,2.1]].forEach(([a,b,c,r],i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),M(['#4a7a3c','#3f6a35','#548445'][i%3],{roughness:.95,flatShading:true},false));m.position.set(a,b,c);m.castShadow=m.receiveShadow=true;g.add(m);});}
[[-22,-14,1.1],[-24,6,1.2],[-16,22,1.0],[-8,-22,1.1],[22,-24,1.2],[26,2,1.1],[24,22,1.0],[6,-26,1.0],[-26,-4,.9],[14,24,.9]].forEach(([x,z,s])=>pohon(x,z,s));
/* ================= ROKET (bisa diiris) ================= */
const RK=new THREE.Group();RK.position.set(0,.5,0);WA.add(RK);
const mRk=MR('#ffffff',{map:tMetal,roughness:.4,metalness:.55}),RKY=new THREE.Group();RKY.rotation.x=-Math.PI/2;RK.add(RKY);
ringTubeP(CR,2.0,2.3,0,12,56,mRk,RKY,'#f5b942',6);
{const cone=new THREE.Mesh(new THREE.ConeGeometry(2.3,3.8,56),mRk);cone.position.y=12+1.9;cone.castShadow=cone.receiveShadow=true;cone.add(new THREE.Mesh(cone.geometry,CR('#f5b942')));RK.add(cone);
 const tank=new THREE.Mesh(new THREE.CylinderGeometry(2.0,2.0,5.8,48),MR('#e8782a',{roughness:.7}));tank.position.y=3.9;tank.castShadow=true;tank.add(new THREE.Mesh(tank.geometry,CR('#ffd08a')));RK.add(tank);
 const fl=new THREE.Mesh(new THREE.CylinderGeometry(2.0,2.0,.3,48),MR('#6b6f80',{roughness:.6,metalness:.4}));fl.position.y=6.95;fl.add(new THREE.Mesh(fl.geometry,CR('#d9d2ff')));RK.add(fl);
 const ce=new THREE.Mesh(new THREE.CylinderGeometry(2.0,2.0,.3,48),MR('#6b6f80',{roughness:.6,metalness:.4}));ce.position.y=11.8;ce.add(new THREE.Mesh(ce.geometry,CR('#d9d2ff')));RK.add(ce);
 for(let i=0;i<3;i++){const f=new THREE.Group();f.rotation.y=i*Math.PI*2/3+.5;RK.add(f);kb(2.2,3.2,.2,3.4,-.15,.15,M('#b01fd0',{roughness:.5,emissive:C('#3a0a46')},false),f,null,3);}
 const nz=new THREE.Mesh(new THREE.ConeGeometry(1.3,1.4,32,1,true),M('#3a3340',{roughness:.5,metalness:.6,side:THREE.DoubleSide},false));nz.rotation.x=Math.PI;nz.position.y=-.5;RK.add(nz);
 const bd=new THREE.Mesh(new THREE.TorusGeometry(2.33,.08,8,56),new THREE.MeshBasicMaterial({color:C('#e458ff'),toneMapped:false}));bd.rotation.x=Math.PI/2;bd.position.y=5.2;RK.add(bd);
 [[1.63,9.3,1.63],[-1.63,9.3,1.63]].forEach(([x,y,z])=>{const w=new THREE.Group();w.position.set(x,y,z);w.rotation.y=Math.atan2(x,z);RK.add(w);const gl=new THREE.Mesh(new THREE.CircleGeometry(.5,24),new THREE.MeshStandardMaterial({color:C('#9fc9f0'),roughness:.05,transparent:true,opacity:.5,emissive:C('#3a5a80')}));gl.position.z=.04;w.add(gl);const rg=new THREE.Mesh(new THREE.TorusGeometry(.52,.07,8,24),mBrass);w.add(rg);});}
/* isi kabin: layar kalender di dinding kiri + astronaut duduk */
const CALR=liveTex(512,320);
{const sc=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.6),new THREE.MeshBasicMaterial({map:CALR.t,toneMapped:false}));sc.rotation.y=Math.PI/2;sc.position.set(-1.9,9.4,0);RK.add(sc);
 kb(-1.98,-1.88,8.3,10.5,-1.5,1.5,mMetal0(),RK,null,3);
 kb(-.6,.6,7.1,7.6,-.5,.7,M('#5a4a8a',{roughness:.8},false),RK,null,3);}
function mMetal0(){return M('#ffffff',{map:tMetal,roughness:.4,metalness:.6},false);}
const ASEAT=mkPerson({astro:1,hair:'#5a3a24',seated:1});ASEAT.g.position.set(.15,7.1,-.2);ASEAT.g.rotation.y=-Math.PI/2;ASEAT.g.scale.setScalar(.82);RK.add(ASEAT.g);
const INL=new THREE.PointLight(C('#fff3e0'),1.2,14,1.2);INL.position.set(1.0,9.6,1.2);RK.add(INL);
/* ================= RUMAH DI BUMI (bisa diiris) ================= */
const HS=new THREE.Group();WA.add(HS);
const mPl=MH('#ffffff',{map:tPlaster,roughness:.95}),mSl=MH('#ffffff',{map:tSlate,roughness:.7}),mFl=MH('#ffffff',{map:tFloor,roughness:.6});
kbp(CH,11,19,0,.4,-10,-2,mFl,HS,'#b8743c',4);
kbp(CH,11,19,.4,5,-10,-9.6,mPl,HS,'#f0c987',4);kbp(CH,11,11.4,.4,5,-10,-2,mPl,HS,'#f0c987',4);kbp(CH,18.6,19,.4,5,-10,-2,mPl,HS,'#f0c987',4);kbp(CH,11,19,.4,5,-2.4,-2,mPl,HS,'#f0c987',4);
{const A=[10.4,5,-10.4],B=[19.6,5,-10.4],Cc=[19.6,5,-1.6],D=[10.4,5,-1.6],R1=[10.4,8.4,-6],R2=[19.6,8.4,-6];const rf=solid([[A,B,R2,R1],[D,Cc,R2,R1],[A,D,R1],[B,Cc,R2],[A,B,Cc,D]],mSl,HS,null,v=>[v[0]/9,(v[1]*1.4+v[2]*.6)/9]);rf.add(new THREE.Mesh(rf.geometry,CH('#9475dc')));
 [[11.5,3.2,-2.0],[16.5,3.2,-2.0]].forEach(([x,y,z])=>{const gl=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6),new THREE.MeshStandardMaterial({color:C('#9fc9f0'),roughness:.05,transparent:true,opacity:.35}));gl.position.set(x+.8,y,z-.45);HS.add(gl);});}
/* perabot + kalender dinding (live) */
const CALH=liveTex(512,320);
{const wd=M('#ffffff',{map:tWoodD,roughness:.6},false);
 kb(12.4,14.6,1.9,2.1,-7.2,-5.6,wd,WA,null,3);[[12.5,-7.1],[14.5,-7.1],[12.5,-5.7],[14.5,-5.7]].forEach(([x,z])=>kb(x-.06,x+.06,.4,1.9,z-.06,z+.06,wd,WA,null,3));
 kb(11.5,13.2,.4,.55,-9.5,-9.3,wd,WA,null,3);kb(11.5,13.4,.4,4.4,-9.55,-9.0,wd,WA,null,3);
 const rug=new THREE.Mesh(new THREE.BoxGeometry(3.4,.04,2.6),M('#b01fd0',{roughness:1},false));rug.position.set(13.2,.42,-6.4);WA.add(rug);
 const cl=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.5),new THREE.MeshBasicMaterial({map:CALH.t,toneMapped:false}));cl.position.set(14.4,3.2,-9.55);WA.add(cl);}
const HTWIN=mkPerson({shirt:'#4d6fa8',pants:'#7d6a4a',hair:'#5a3a24',seated:1});HTWIN.g.position.set(12.9,.4,-6.4);HTWIN.g.rotation.y=Math.PI/2;HTWIN.g.scale.setScalar(.7);WA.add(HTWIN.g);
const CANE=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,2.2,8),M('#3a2418',{roughness:.7},false));WA.add(CANE);
/* ================= SI KEMBAR (berdiri) + jam saku ================= */
const T1=mkPerson({astro:1,hair:'#5a3a24'}),T2=mkPerson({shirt:'#4d6fa8',pants:'#7d6a4a',hair:'#5a3a24'});
T1.g.position.set(-3.6,.5,5.6);T2.g.position.set(-.8,.5,5.6);WA.add(T1.g,T2.g);
const W1=mkWatch(WA,[-3.6,3.0,6.5],.55),W2=mkWatch(WA,[-.8,3.0,6.5],.55);
/* ================= LINTASAN ROKET (strip) ================= */
const OUT=mkTube([[0,16,0],[3,50,-8],[9,90,-28],[14,115,-48],[18,132,-62]],.7,PAL.aks,tAlir,300);
const RET=mkTube([[18,132,-62],[14,106,-46],[8,70,-26],[3,34,-10],[0.5,17,-.5]],.55,'#f6b6ff',tTitik,300);
const HEADS=sprite(tGlowM);
const RINGE=[[0,16,0],[18,132,-62],[0.5,17,-.5]].map(p=>{const r=new THREE.Mesh(new THREE.TorusGeometry(4.5,.35,10,48),new THREE.MeshBasicMaterial({color:C(PAL.tb),transparent:true,opacity:0,toneMapped:false,depthWrite:false}));r.position.set(...p);r.rotation.x=Math.PI/2;r.renderOrder=18;WA.add(r);return r;});
/* jam saku besar (motif akhir) + '?' */
const WATK=mkWatch(WA,[0,9,10],6);WATK.g.visible=false;
const TANYA=sprite(tTanya);
/* ================= DUNIA B: KOLOM MUON ================= */
const BASE=V3(0,2000,0),WB=new THREE.Group();WB.position.copy(BASE);SD.add(WB);WB.visible=false;
kb(-14,14,-4,0,-9,9,[mSo,mSo,mGr,mSo,mSo,mSo],WB,null,8);
const mLane=(c)=>new THREE.MeshBasicMaterial({color:C(c),transparent:true,opacity:.1,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});
const LANE=[[-6,'#8a8fbf'],[6,'#c78bff']].map(([x,c])=>{const g=new THREE.Group();g.position.x=x;WB.add(g);const f=new THREE.Mesh(new THREE.BoxGeometry(8,64,6),mLane(c));f.position.y=32;g.add(f);const rm=new THREE.MeshBasicMaterial({color:C(c),transparent:true,opacity:.8,toneMapped:false,depthWrite:false});[[-4,0],[4,0]].forEach(([dx])=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.2,64,.2),rm);b.position.set(dx,32,3);g.add(b);});const t=new THREE.Mesh(new THREE.BoxGeometry(8,.2,.2),rm);t.position.set(0,64,3);g.add(t);return g;});
const NM=18,muPos=new Float32Array(NM*2*3),muCol=new Float32Array(NM*2*3),muG=new THREE.BufferGeometry();muG.setAttribute('position',new THREE.BufferAttribute(muPos,3));muG.setAttribute('color',new THREE.BufferAttribute(muCol,3));
const MUON=new THREE.Points(muG,new THREE.PointsMaterial({size:34,sizeAttenuation:false,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false,map:tGlowM}));MUON.frustumCulled=false;WB.add(MUON);
const hitG=sprite(tGlowM);
