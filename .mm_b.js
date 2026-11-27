
/* ---------- tekstur lembut (besar & kontras rendah: anti-kedip) ---------- */
const tWoodS=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#a67c52';x.fillRect(0,0,w,h);for(let i=0;i<4;i++){x.fillStyle=i%2?'#aa8157':'#a07548';x.fillRect(i*64,0,64,h);x.fillStyle='rgba(60,35,15,.16)';x.fillRect(i*64,0,3,h);}bintik(x,w,h,110,['rgba(255,235,200,.05)','rgba(50,30,10,.06)'],10,28,r);});
const tWallN=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#364377';x.fillRect(0,0,w,h);for(let i=0;i<4;i++){x.fillStyle=i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)';x.fillRect(i*64,0,64,h);}bintik(x,w,h,90,['rgba(255,255,255,.04)','rgba(0,0,0,.05)'],12,30,r);});
const tBlk=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#c98159';x.fillRect(0,0,w,h);for(let j=0;j<4;j++)for(let i=0;i<4;i++){if((i+j)%2){x.fillStyle='rgba(255,230,200,.13)';x.fillRect(i*64,j*64,64,64);}}bintik(x,w,h,70,['rgba(255,255,255,.05)','rgba(60,20,0,.06)'],10,24,r);});
const tPil=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#f1ede4';x.fillRect(0,0,w,h);bintik(x,w,h,40,['rgba(0,0,0,.035)','rgba(255,255,255,.4)'],10,28,r);});
const tPj=teksturK(128,128,(x,w,h)=>{x.fillStyle='#8fb4e8';x.fillRect(0,0,w,h);for(let i=0;i<4;i++){x.fillStyle='rgba(255,255,255,.28)';x.fillRect(i*32,0,12,h);}});
const tBrain=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#e9a9b9';x.fillRect(0,0,w,h);x.strokeStyle='rgba(150,60,95,.26)';x.lineWidth=7;x.lineCap='round';for(let i=0;i<9;i++){const y=14+i*28;x.beginPath();x.moveTo(0,y);for(let k=1;k<=6;k++)x.lineTo(k*w/6,y+(k%2?14:-14)+(r()-.5)*8);x.stroke();}});
const tSandS=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#e0c283';x.fillRect(0,0,w,h);bintik(x,w,h,140,['#d8b878','#e8cd90','#dcbd7e'],10,26,r);});
const tTow=teksturK(128,256,(x,w,h)=>{x.fillStyle='#16213f';x.fillRect(0,0,w,h);for(let j=0;j<6;j++)for(let i=0;i<3;i++){x.fillStyle=(i+j)%3?'#52e0ff':'#bff6ff';x.fillRect(i*42+8,j*42+8,26,26);}});
const tMoon=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,250,1)');g.addColorStop(.28,'rgba(220,235,255,.95)');g.addColorStop(.34,'rgba(170,200,255,.35)');g.addColorStop(1,'rgba(120,150,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tKisiG=teksturK(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(30,44,86,.5)';x.fillRect(0,0,w,h);x.fillStyle='rgba(190,215,255,.9)';x.fillRect(0,0,w,6);x.fillRect(0,0,6,h);});
[tWoodS,tWallN,tBlk,tPil,tPj,tBrain,tSandS,tTow].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
/* ---------- bahan umum (tanpa potong) ---------- */
const NM=(hex,o={})=>M(hex,o,false);
const mFl=NM('#ffffff',{map:tWoodS,roughness:.75}),mWl=NM('#ffffff',{map:tWallN,roughness:.92}),mBlk=NM('#ffffff',{map:tBlk,roughness:.95}),mPil=NM('#ffffff',{map:tPil,roughness:.95}),mPj=NM('#ffffff',{map:tPj,roughness:.9}),mWd=NM('#ffffff',{map:tWoodD,roughness:.6}),mWh=NM('#f1ede4',{roughness:.9}),mSkin=NM('#e8b894',{roughness:.65});
const mGlass=NM('#a9c8ff',{roughness:.05,transparent:true,opacity:.2,emissive:C('#2a4a9a'),emissiveIntensity:.5,depthWrite:false});
const ell=(par,mat,c,r,seg=24)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(1,seg,Math.round(seg*.7)),mat);o.scale.set(...r);o.position.set(...c);o.castShadow=o.receiveShadow=true;par.add(o);return o;};
const cyl=(par,mat,rt,rb,len,pos,rot,seg=16)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,len,seg),mat);o.position.set(...pos);if(rot)o.rotation.set(...rot);o.castShadow=o.receiveShadow=true;par.add(o);return o;};
const back=k=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);};
const popS=k=>k<=0?.001:k>=1?1:back(k);
/* ================= DUNIA A: KAMAR TIDUR + GELEMBUNG ================= */
const WA=new THREE.Group();SD.add(WA);
kb(-9,9,-.8,0,-9,9,mFl,WA,null,8);
kb(-9,-8.4,0,11,-9,9,mWl,WA,null,8);
kb(-8.4,2.4,0,11,-9,-8.4,mWl,WA,null,8);kb(7.6,9,0,11,-9,-8.4,mWl,WA,null,8);kb(2.4,7.6,0,4.4,-9,-8.4,mWl,WA,null,8);kb(2.4,7.6,9,11,-9,-8.4,mWl,WA,null,8);
kb(2.4,7.6,4.4,9,-8.9,-8.5,mGlass,WA,null,4);
kb(2.2,7.8,4.2,4.4,-9.1,-8.3,mWd,WA,null,4);kb(2.2,7.8,9,9.2,-9.1,-8.3,mWd,WA,null,4);kb(2.2,2.4,4.4,9,-9.1,-8.3,mWd,WA,null,4);kb(7.6,7.8,4.4,9,-9.1,-8.3,mWd,WA,null,4);kb(4.9,5.1,4.4,9,-9,-8.4,mWd,WA,null,4);
/* tempat tidur */
kb(-3.2,3.2,.5,1.3,-8.4,3.6,mWd,WA,null,4);kb(-3.2,3.2,1.3,4.4,-8.4,-7.9,mWd,WA,null,4);
[[-3.1,-8.3],[3.1,-8.3],[-3.1,3.5],[3.1,3.5]].forEach(([x,z])=>kb(x-.15,x+.15,0,.5,z-.15,z+.15,mWd,WA,null,3));
kb(-3.0,3.0,1.3,2.3,-7.9,3.4,mWh,WA,null,4);
ell(WA,mPil,[0,2.95,-6.3],[2.0,.6,1.3]);
kb(-3.05,3.05,2.3,3.1,-3.7,3.5,mBlk,WA,null,5);ell(WA,mBlk,[0,3.1,-1.7],[2.7,1.25,2.45],28);ell(WA,mBlk,[0,3.05,-4.0],[2.9,.5,.4]);
/* meja kecil + lampu */
kb(4.2,6.4,0,2.2,-8.4,-6,mWd,WA,null,4);
cyl(WA,NM('#d8c9a6',{roughness:.7}),.12,.35,.9,[5.3,2.65,-7.2]);const LAMPA=ell(WA,NM('#fff1d0',{emissive:C('#ffb85c'),emissiveIntensity:1.1,roughness:.6}),[5.3,3.4,-7.2],[.75,.6,.75]);
/* karpet + rak buku */
cyl(WA,NM('#3f5d9a',{roughness:1}),3.8,3.8,.08,[2.2,.04,3.2],null,40);
kb(-8.4,-6.8,0,6.2,-3,3,mWd,WA,null,4);[1.6,3.2,4.8].forEach(y=>kb(-8.4,-6.7,y,y+.18,-3,3,mWd,WA,null,4));
{const cs=['#c9503f','#e0a53a','#4f8fc0','#6fae6a','#a870c8'];let z=-2.6;for(let s=0;s<3;s++){z=-2.6;for(let i=0;i<7;i++){const wd=.4+((i*37+s*11)%5)*.06;kb(-8.3,-7.0,.18+s*1.6+(s?0:0),1.5+s*1.6-.0,z,z+wd,NM(cs[(i+s)%5],{roughness:.8}),WA,null,3);z+=wd+.08;}}}
/* penerangan malam */
const LAMPL=new THREE.PointLight(C('#ffb36b'),0,38,1.3);LAMPL.position.set(4.6,4.2,-6.4);WA.add(LAMPL);
const MOON=sprite(tMoon);
/* ---------- penidur: kepala berbidang potong sendiri ---------- */
const mPz=(hex,o)=>NM(hex,o);
cyl(WA,mSkin,.55,.62,.9,[0,3.45,-5.15],[Math.PI/2,0,0]);
const mPs=NM('#8fb4e8',{roughness:.9});ell(WA,mPs,[0,3.65,-3.7],[1.9,.95,1.45]);[-1,1].forEach(s=>{ell(WA,mPs,[s*1.5,3.7,-4.5],[.85,.8,.8]);cyl(WA,mPj,.4,.38,3,[s*2.4,3.95,-2.9],[Math.PI/2,0,0]);ell(WA,mSkin,[s*2.4,3.95,-1.3],[.42,.4,.42]);});
const MHd=mkM([PH]),CHd=mkCap([PH]);
const HD=new THREE.Group();HD.position.set(0,4.15,-6.7);HD.rotation.x=-Math.PI/2;WA.add(HD);
const sk=new THREE.Mesh(new THREE.SphereGeometry(1.5,48,32),MHd('#e8b894',{roughness:.65}));sk.castShadow=sk.receiveShadow=true;sk.add(new THREE.Mesh(sk.geometry,CHd('#f1c6a6')));HD.add(sk);
const hairM=new THREE.Mesh(new THREE.SphereGeometry(1.58,40,24,0,Math.PI*2,0,Math.PI*.58),MHd('#4a3020',{roughness:.9,side:THREE.DoubleSide}));hairM.position.set(0,.04,-.14);hairM.castShadow=true;HD.add(hairM);
const hpart=(g,m,pos,sc,rot)=>{const o=new THREE.Mesh(g,m);o.position.set(...pos);if(sc)o.scale.set(...sc);if(rot)o.rotation.set(...rot);o.castShadow=true;HD.add(o);return o;};
[-1,1].forEach(s=>{hpart(new THREE.SphereGeometry(1,16,12),MHd('#dba884',{roughness:.7}),[s*1.5,.1,-.05],[.2,.4,.3]);});
hpart(new THREE.ConeGeometry(.18,.42,14),MHd('#e0ac88',{roughness:.7}),[0,-.05,1.62],null,[Math.PI/2,0,0]);
hpart(new THREE.TorusGeometry(.26,.04,6,18,Math.PI),MHd('#b5605c',{roughness:.8}),[0,-.42,1.4],null,[0,0,Math.PI]);
const LID=[-1,1].map(s=>{hpart(new THREE.SphereGeometry(1,16,12),MHd('#dba884',{roughness:.7}),[s*.55,.28,1.4],[.3,.2,.14]);hpart(new THREE.TorusGeometry(.2,.024,6,14,Math.PI),MHd('#4a3020',{roughness:.9}),[s*.55,.27,1.53],null,[0,0,Math.PI]);return hpart(new THREE.SphereGeometry(1,12,10),MHd('#f0c9a8',{roughness:.7}),[s*.55,.34,1.5],[.12,.08,.06]);});
/* otak (potongan sagital di x=0) */
const mBr=MHd('#ffffff',{map:tBrain,roughness:.72});
const regM=[];
function elC(par,mat,c,r,capHex,cm){const o=new THREE.Mesh(new THREE.SphereGeometry(1,40,28),mat);o.scale.set(...r);o.position.set(...c);o.castShadow=false;par.add(o);const cap=cm||CHd(capHex);o.add(new THREE.Mesh(o.geometry,cap));return{o,cap};}
elC(HD,mBr,[0,.12,.05],[1.02,.82,1.12],'#f4a8c0');
elC(HD,MHd('#e29aae',{roughness:.8}),[0,-.62,-.62],[.5,.32,.4],'#d98aa8');
{const st=new THREE.Mesh(new THREE.CylinderGeometry(.2,.17,.9,14),MHd('#d58aa0',{roughness:.8}));st.position.set(0,-.88,-.1);HD.add(st);st.add(new THREE.Mesh(st.geometry,CHd('#c9809c')));}
const REG=[[0,.12,-.82,.34,.42,.2],[0,-.18,-.15,.3,.18,.42],[0,-.4,.42,.2,.2,.2]].map(([x,y,z,a,b,c],i)=>{const cm=new THREE.MeshBasicMaterial({color:C('#0e6b55'),side:THREE.BackSide,clippingPlanes:[PH],toneMapped:false});const m=MHd('#2fe0a8',{roughness:.5,emissive:C('#12f2c6'),emissiveIntensity:.6});const e=elC(HD,m,[x,y,z],[a,b,c],null,cm);regM.push(cm);return{cm,m,e:e.o,loc:[x,y,z]};});
const hw=([x,y,z])=>{HD.updateMatrixWorld(true);return HD.localToWorld(V3(x,y,z));};
const REGW=REG.map(r=>hw(r.loc));
const GLR=[sprite(tGlowM),sprite(tGlowM),sprite(tGlowM)];
/* ---------- gelembung di atas kepala ---------- */
const BR=4.3,BY=14.2,BS=9.6,RAX=V3(Math.SQRT1_2,0,-Math.SQRT1_2);
const BPOS=[-1,0,1].map(s=>V3(0,BY,-6.7).addScaledVector(RAX,s*BS));
const mkRim=tint=>new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{c:{value:new THREE.Color(tint)},k:{value:1}},vertexShader:'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform vec3 c;uniform float k;varying vec3 vN;void main(){float f=pow(1.-abs(normalize(vN).z),2.4);gl_FragColor=vec4(c*f*k,f*k);}'});
const mTow=NM('#ffffff',{map:tTow,roughness:.5,emissive:C('#ffffff'),emissiveMap:tTow,emissiveIntensity:.85});
function buildMini(theme,MT,CF,seed){const g=new THREE.Group(),P=[],rn=rng(seed);
 const cf=CF||(h=>null),pc=o=>{o.castShadow=o.receiveShadow=false;o.traverse(q=>{q.castShadow=false;q.receiveShadow=false;});P.push({o,p:o.position.clone(),r:o.rotation.clone(),d:V3((rn()-.5)*2,(rn()-.15)*1.7,(rn()-.5)*2).multiplyScalar(10)});return o;};
 const KB=(x0,x1,y0,y1,z0,z1,mat,cap,tile)=>pc(kbp(cf,x0,x1,y0,y1,z0,z1,mat,g,CF?cap:null,tile||6));
 const AD=(o,cap)=>{g.add(o);if(CF&&cap)o.add(new THREE.Mesh(o.geometry,CF(cap)));return pc(o);};
 const sph=(hex,c,r,o={})=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),MT(hex,o));m.scale.set(...r);m.position.set(...c);return m;};
 const flM=theme==='sea'?MT('#ffffff',{map:tSandS,roughness:1}):theme==='desert'?MT('#ffffff',{map:tSandS,roughness:1}):MT('#2b3354',{roughness:.5,metalness:.3});
 const wlM=theme==='sea'?MT('#6fd0c8',{roughness:.3,transparent:true,opacity:.55}):theme==='desert'?MT('#ffffff',{map:tSandS,roughness:1}):MT('#2e4278',{roughness:.5,metalness:.2});
 const wd=MT('#ffffff',{map:tWoodD,roughness:.6}),wh=MT('#f1ede4',{roughness:.9}),bk=MT(theme==='sea'?'#ec7a52':theme==='city'?'#37c2d6':'#c98159',{roughness:.95});
 KB(-9,9,-.7,0,-9,9,flM,'#d9c9a0',8);
 if(theme==='desert'){KB(-9,-8.5,0,5,-9,2,wlM,'#cdb27a');KB(-8.5,2,0,5,-9,-8.5,wlM,'#cdb27a');}else{KB(-9,-8.5,0,10,-9,9,wlM,'#c0e8ff');KB(-8.5,9,0,10,-9,-8.5,wlM,'#c0e8ff');}
 KB(-3,3,.4,1.2,-8.5,3.5,wd,'#d9c9a0',4);KB(-3,3,1.2,4,-8.5,-8,wd,'#d9c9a0',4);KB(-2.8,2.8,1.2,2.2,-8,3.3,wh,'#ffffff',4);KB(-2.9,2.9,2.2,3.1,-4.5,3.3,bk,'#ffd9b0',4);KB(-2,2,2.2,3,-7.8,-5.6,wh,'#ffffff',4);
 KB(4.2,6.4,0,2.2,-8.4,-6,wd,'#d9c9a0',4);
 AD(sph('#fff1d0',[5.3,3,-7.2],[.7,.6,.7],{emissive:C('#ffb85c'),emissiveIntensity:1}),'#fff1d0');
 if(theme==='city'){[[-14,-10,-6,2,16],[-4,4,-14,-10,20],[-14,-10,-14,-11,24],[7,12,-15,-11,14]].forEach(([x0,x1,z0,z1,h])=>KB(x0,x1,0,h,z0,z1,mTow,'#6fa8d6',6));KB(-9,9,0,.3,8.5,9,MT('#38e8ff',{emissive:C('#38e8ff'),emissiveIntensity:1.2}),'#38e8ff',4);
  const rg=new THREE.Mesh(new THREE.TorusGeometry(12,.35,8,48),new THREE.MeshBasicMaterial({color:C('#52e0ff'),toneMapped:false}));rg.rotation.x=Math.PI/2;rg.position.set(0,15,0);AD(rg,'#bff6ff');}
 if(theme==='sea'){[[-6,-6],[-7.5,5.5],[7,6.5],[8,-2]].forEach(([x,z],i)=>{const c=cyl(g,MT('#3f9a58',{roughness:.8}),.15,.5,7+i,[x,3.5+i*.5,z],[0,0,(i%2?.15:-.15)]);pc(c);});
  [[-5,6.5,1.2],[5.5,-5,1.6],[-6.5,-2,1.1]].forEach(([x,z,s])=>AD(sph('#ee78a6',[x,s*.6,z],[s,s*.9,s]),'#ffd1e3'));
  [[6,6.5,6],[-4,9,3],[1,11,-3]].forEach(([x,y,z])=>{const f=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),MT('#ff9a3d',{roughness:.5}));b.scale.set(1.5,.7,.6);const t=new THREE.Mesh(new THREE.ConeGeometry(.6,1.1,10),MT('#ff9a3d',{roughness:.5}));t.rotation.z=Math.PI/2;t.position.x=-1.8;f.add(b,t);f.position.set(x,y,z);f.rotation.y=.6;if(CF){b.add(new THREE.Mesh(b.geometry,CF('#ffd9a8')));t.add(new THREE.Mesh(t.geometry,CF('#ffd9a8')));}g.add(f);pc(f);});
  for(let i=0;i<7;i++)AD(sph('#e8fbff',[(rn()-.5)*14,2+rn()*11,(rn()-.5)*14],[.4,.4,.4],{transparent:true,opacity:.55,roughness:.1}),'#e8fbff');}
 if(theme==='desert'){AD(sph('#e0c283',[-10,-2.4,-3],[6,3.4,5],{map:tSandS,roughness:1}),'#cdb27a');AD(sph('#e0c283',[5,-2.6,-12],[8,3.4,5.5],{map:tSandS,roughness:1}),'#cdb27a');
  {const c=cyl(g,MT('#4f9a5a',{roughness:.8}),.55,.6,5.5,[-6.5,2.75,7],null);pc(c);const a1=cyl(g,MT('#4f9a5a',{roughness:.8}),.35,.35,2.2,[-5.4,3.4,7],[0,0,Math.PI/2.6]);pc(a1);}
  AD(sph('#8f8a82',[6.5,.9,8],[1.4,1,1.2],{roughness:1}),'#c9c3b8');
  AD(sph('#ffcf6a',[13,22,-10],[2.5,2.5,2.5],{emissive:C('#ffcf6a'),emissiveIntensity:1.4}),'#fff0c0');}
 /* tokoh kecil (muncul di bagian penutup) */
 const wp=new THREE.Group();wp.position.set(-5.8,0,3);{const sh=['#e86a4a','#4fae6a','#a870d8'][seed%3],pm=MT('#3a4568',{roughness:.8}),sm=MT(sh,{roughness:.8}),sk2=MT('#e8b894',{roughness:.7});[-.35,.35].forEach(x=>cyl(wp,pm,.3,.3,2,[x,1,0]));cyl(wp,sm,.62,.55,2.1,[0,3,0]);const h=new THREE.Mesh(new THREE.SphereGeometry(.62,16,12),sk2);h.position.y=4.5;wp.add(h);[-1,1].forEach(s=>cyl(wp,sm,.2,.2,1.8,[s*.85,3,0],[0,0,s*.2]));}
 wp.scale.setScalar(.001);wp.visible=false;g.add(wp);
 return{g,P,wp};}
function bubble(i,theme,MT,CF,tint){const G=new THREE.Group();G.position.copy(BPOS[i]);WA.add(G);
 const shell=new THREE.Mesh(new THREE.SphereGeometry(BR,48,32),new THREE.MeshStandardMaterial({color:C(tint),transparent:true,opacity:.12,roughness:.05,metalness:.1,depthWrite:false,emissive:C(tint),emissiveIntensity:.18,clippingPlanes:CF?[PB]:[]}));shell.renderOrder=5;G.add(shell);
 const rim=new THREE.Mesh(new THREE.SphereGeometry(BR*1.01,48,32),mkRim(tint));rim.renderOrder=6;G.add(rim);
 const mi=buildMini(theme,MT,CF,40+i*7);mi.g.scale.setScalar(.19);mi.g.position.set(0,-2.2,0);G.add(mi.g);
 return{G,shell,rim,mi};}
const MB=mkM([PB]),CB=mkCap([PB]);
const BB=[bubble(0,'city',NM,null,'#8fdcff'),bubble(1,'sea',MB,CB,'#5fb8ff'),bubble(2,'desert',NM,null,'#ffd9a0')];
const BC=BB[1];
const capB=new THREE.Mesh(new THREE.SphereGeometry(BR-.02,48,32),new THREE.MeshBasicMaterial({color:C('#1d8f78'),side:THREE.BackSide,clippingPlanes:[PB],toneMapped:false}));capB.visible=false;BC.G.add(capB);
/* kartu ingatan melayang di gelembung tengah */
const CARDS=[];{const ic=[(x,s)=>{x.fillStyle='#e8b894';x.fillRect(s*.25,s*.45,s*.5,s*.35);x.fillStyle='#c9503f';x.beginPath();x.moveTo(s*.18,s*.46);x.lineTo(s*.5,s*.2);x.lineTo(s*.82,s*.46);x.fill();x.fillStyle='#46568f';x.fillRect(s*.44,s*.58,s*.12,s*.22);},(x,s)=>{x.fillStyle='#7a5438';x.fillRect(s*.46,s*.55,s*.08,s*.28);x.fillStyle='#4f9a5a';x.beginPath();x.arc(s*.5,s*.4,s*.24,0,7);x.fill();},(x,s)=>{x.fillStyle='#f2d2a0';x.fillRect(s*.22,s*.5,s*.56,s*.28);x.fillStyle='#ee78a6';x.fillRect(s*.22,s*.44,s*.56,s*.1);x.fillStyle='#ffd24d';x.fillRect(s*.48,s*.28,s*.05,s*.17);},(x,s)=>{x.strokeStyle='#33405f';x.lineWidth=s*.04;[.3,.7].forEach(a=>{x.beginPath();x.arc(s*a,s*.62,s*.15,0,7);x.stroke();});x.beginPath();x.moveTo(s*.3,s*.62);x.lineTo(s*.48,s*.4);x.lineTo(s*.7,s*.62);x.moveTo(s*.48,s*.4);x.lineTo(s*.42,s*.34);x.stroke();},(x,s)=>{x.fillStyle='#ffd24d';x.beginPath();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?s*.13:s*.3;x.lineTo(s*.5+Math.cos(a)*r,s*.5+Math.sin(a)*r);}x.fill();},(x,s)=>{x.fillStyle='#46568f';x.beginPath();x.arc(s*.5,s*.36,s*.14,0,7);x.fill();x.fillRect(s*.36,s*.54,s*.28,s*.3);}];
 ic.forEach((f,i)=>{const t=teksturK(128,128,(x,w,h)=>{x.fillStyle='#f6f1e4';x.fillRect(0,0,w,h);x.strokeStyle='#19e6a1';x.lineWidth=7;x.strokeRect(5,5,w-10,h-10);f(x,w);});t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;const m=new THREE.Mesh(new THREE.PlaneGeometry(1.15,1.15),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:0,toneMapped:false,side:THREE.DoubleSide}));m.visible=false;BC.G.add(m);const a=i/6*Math.PI*2+.4;CARDS.push({m,p:[Math.cos(a)*2.6,Math.sin(a*1.3)*1.3+.1,Math.sin(a)*1.4]});});}
/* tokoh mimpi (mimpi sadar) di gelembung tengah */
const AV=new THREE.Group();BC.G.add(AV);AV.visible=false;AV.rotation.y=Math.PI/4;
{const sm=NM('#8fb4e8',{roughness:.85}),pm=NM('#4a5a90',{roughness:.85}),sk2=NM('#e8b894',{roughness:.7});cyl(AV,NM('#2fe0a8',{roughness:.5,transparent:true,opacity:.55,emissive:C('#0e8a68'),emissiveIntensity:.6}),1.7,1.7,.18,[0,-2,0],null,36);[-.22,.22].forEach(x=>cyl(AV,pm,.17,.17,.9,[x,-1.35,0]));cyl(AV,sm,.38,.34,1.0,[0,-.5,0]);[-1,1].forEach(s=>cyl(AV,sm,.11,.11,.9,[s*.5,-.55,0],[0,0,s*.18]));
 const hd=new THREE.Mesh(new THREE.SphereGeometry(.4,24,18),sk2);hd.position.set(0,.3,0);AV.add(hd);const hr=new THREE.Mesh(new THREE.SphereGeometry(.43,24,16,0,Math.PI*2,0,Math.PI*.55),NM('#4a3020',{roughness:.9}));hr.position.set(0,.33,-.03);AV.add(hr);}
const AVE=[-1,1].map(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.12,14,10),NM('#ffffff',{roughness:.3}));e.position.set(s*.16,.32,.35);AV.add(e);const p=new THREE.Mesh(new THREE.SphereGeometry(.06,12,8),new THREE.MeshBasicMaterial({color:C('#0b3a2c'),toneMapped:false}));p.position.set(0,0,.1);e.add(p);return p;});
const avGl=sprite(tGlowM);
/* alat perekam gerak mata */
const REC=new THREE.Group();REC.position.set(6.1,0,-3.6);REC.rotation.y=Math.PI/4;WA.add(REC);
const REC_L=liveTex(512,288);
{const mm=NM('#2e323c',{roughness:.45,metalness:.6});cyl(REC,mm,.3,.4,1.7,[0,.85,0]);const bx=new THREE.Mesh(new THREE.BoxGeometry(3.4,2.2,1.5),mm);bx.position.set(0,2.8,0);bx.castShadow=bx.receiveShadow=true;REC.add(bx);
 const sc=new THREE.Mesh(new THREE.PlaneGeometry(2.9,1.6),new THREE.MeshBasicMaterial({map:REC_L.t,toneMapped:false}));sc.position.set(0,2.95,.76);REC.add(sc);[-1.2,-.7,-.2].forEach(x=>cyl(REC,NM('#aab0bc',{roughness:.4,metalness:.7}),.12,.12,.12,[x,1.95,.76],[Math.PI/2,0,0]));}
REC.scale.setScalar(.001);REC.visible=false;
const ELW=hw([1.05,.35,1.1]),ELD=ELW.clone();
const ELP=[ELW.toArray(),[ELW.x+1.3,ELW.y+.7,ELW.z-.2],[3.7,3.7,-6.9],[4.2,1.3,-6.4],[4.9,.15,-5.4],[5.6,1.4,-4.5],[6.1,2.0,-3.9]];
const SELE=mkTube(ELP,.1,PAL.aks,tAlir,70);
const elDot=sprite(tGlowM);
const SOM=[];
/* strip sinyal di otak -> naik membentuk gelembung */
const brainPath=(dx,v)=>{const L=(x,y,z)=>hw([x+dx,y,z]).toArray();return[L(0,-.8,-.1),L(0,-.4,.02),L(0,-.18,-.2),L(0,.0,-.7),L(0,.3,-.2),L(0,.2,.7),L(0,.1,1.5),[dx*.6,7.2,-6.7],[dx*.3,8.6,-6.7],[0,BY-BR*.55,-6.7]];};
const FLO=[brainPath(.05),brainPath(.05).map(p=>[p[0],p[1],p[2]]).map((p,i)=>i>=3?[p[0]+(i<7?.35:.15),p[1],p[2]+(i<7?.15:0)]:p),brainPath(.05).map((p,i)=>i>=3?[p[0]-(i<7?.3:.1),p[1],p[2]-(i<7?.2:0)]:p)].map(pts=>mkTube(pts,.09,PAL.aks,tAlir,90));
/* ================= DUNIA B: TIGA GAMBARAN MULTIVERSE ================= */
const BASE=V3(0,2000,0),WB=new THREE.Group();WB.position.copy(BASE);SD.add(WB);WB.visible=false;
const RV=V3(Math.SQRT1_2,0,-Math.SQRT1_2),DV=V3(-Math.SQRT1_2,0,-Math.SQRT1_2);
const PG=(a,d,y)=>V3(0,0,0).addScaledVector(RV,a).addScaledVector(DV,d).add(V3(0,y,0));
const PW=(a,d,y)=>PG(a,d,y).add(BASE).toArray();
const mPane=()=>new THREE.MeshStandardMaterial({color:C('#c8ffee'),transparent:true,opacity:.16,roughness:.1,emissive:C('#0b8a62'),emissiveIntensity:.5,depthWrite:false,side:THREE.DoubleSide});
const mEdge=new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false});
/* B1: pohon garis waktu */
const B1=new THREE.Group();WB.add(B1);
const TIP=[-11,-8,-5,-2,2,5,8,11],LVL=[[0],[-6.5,6.5],[-9.5,-3.5,3.5,9.5],TIP],AL=[-10,-4.5,1.5,7.5];
const TRB=[];for(let l=0;l<3;l++)LVL[l+1].forEach((d,j)=>{const par=LVL[l][Math.floor(j/2)];TRB.push({l,t:mkTube([PW(AL[l],par,.4),PW((AL[l]+AL[l+1])/2,(par+d)/2,.4),PW(AL[l+1],d,.4)],.2,PAL.aks,tAlir,28)});});
const TIPS=TIP.map((d,i)=>{const c=new THREE.Mesh(new THREE.SphereGeometry(1.15,28,20),new THREE.MeshStandardMaterial({color:C(['#9be8ff','#d6b8ff','#ffe0a0','#a6ffd8'][i%4]),transparent:true,opacity:.34,roughness:.1,emissive:C(['#2a8aaa','#7a50b0','#aa8230','#10a070'][i%4]),emissiveIntensity:.45,depthWrite:false}));c.position.copy(PG(AL[3],d,1.4));B1.add(c);const k=new THREE.Mesh(new THREE.SphereGeometry(.42,16,12),new THREE.MeshBasicMaterial({color:C('#ffffff'),toneMapped:false}));k.position.copy(c.position);B1.add(k);return{c,k};});
[-6.5,0,6.5].forEach(d=>{const p=new THREE.Mesh(new THREE.BoxGeometry(7,3.2,.14),mPane());p.rotation.y=Math.PI/4;p.position.copy(PG(7.5,d,1.6));p.renderOrder=3;B1.add(p);const e=new THREE.Mesh(new THREE.BoxGeometry(7,.14,.2),mEdge);e.rotation.y=Math.PI/4;e.position.copy(PG(7.5,d,3.2));B1.add(e);});
/* B2: gelembung di ruang mengembang */
const B2=new THREE.Group();WB.add(B2);
const SLAB=new THREE.Mesh(new THREE.BoxGeometry(21,.2,21),new THREE.MeshStandardMaterial({color:C('#8aa4ea'),map:(()=>{const t=tKisiG.clone();t.needsUpdate=true;t.repeat.set(8,8);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;})(),transparent:true,opacity:.8,roughness:.5,emissive:C('#1a2a66'),emissiveIntensity:.5}));SLAB.rotation.y=Math.PI/4;SLAB.position.y=-.2;B2.add(SLAB);
const TINT=[['#9be8ff','#2a8aaa'],['#d6b8ff','#7a50b0'],['#ffe0a0','#aa8230'],['#a6ffd8','#10a070'],['#ffb8cf','#b04a6a']];
const BUBS=[[-7,-6,3.4,1.5],[0,-8.5,5,1.2],[7,-5,3,1.9],[-4,2,5.4,1.7],[4,3,3.2,1.4],[9,6,5,1.3],[-9,7,3.5,1.1],[0,8,4.2,1.9],[-1,-1,2.4,.9],[10,-1,2.8,1],[-10,-1,4.5,1.3],[6,10,3,1],[-5,10,5,1.2]].map(([a,d,y,r],i)=>{const tn=TINT[i%5],m=new THREE.Mesh(new THREE.SphereGeometry(r,28,20),new THREE.MeshStandardMaterial({color:C(tn[0]),transparent:true,opacity:.5,roughness:.1,emissive:C(tn[1]),emissiveIntensity:.8,depthWrite:false}));m.position.copy(PG(a,d,y));B2.add(m);const rm=new THREE.Mesh(new THREE.SphereGeometry(r*1.04,24,16),mkRim(tn[0]));rm.renderOrder=6;B2.add(rm);const k=new THREE.Mesh(new THREE.SphereGeometry(r*.2,14,10),new THREE.MeshBasicMaterial({color:C('#ffffff'),toneMapped:false}));k.position.copy(m.position);B2.add(k);return{m,k,rm,p0:m.position.clone(),r};});
/* B3: lembaran semesta sejajar */
const B3=new THREE.Group();WB.add(B3);
const tSheet=tKisiG.clone();tSheet.needsUpdate=true;tSheet.repeat.set(7,5);tSheet.wrapS=tSheet.wrapT=THREE.RepeatWrapping;
const SHT=['#9be8ff','#d6b8ff','#ffe0a0','#a6ffd8','#ffb8cf'];
const SHEETS=SHT.map((c,i)=>{const s=new THREE.Mesh(new THREE.BoxGeometry(15,.16,7),new THREE.MeshStandardMaterial({color:C(c),map:tSheet,transparent:true,opacity:.4,roughness:.2,emissive:C(c),emissiveIntensity:.18,depthWrite:false,side:THREE.DoubleSide}));s.rotation.y=Math.PI/4;s.position.y=(i-2)*4.4;s.renderOrder=3;B3.add(s);
 for(let k=0;k<5;k++){const o=new THREE.Mesh(new THREE.SphereGeometry(.34+.1*(k%3),12,10),new THREE.MeshBasicMaterial({color:C(c),toneMapped:false}));o.position.copy(PG(-6+k*3+(i%2)*.8,-2.4+((k*5+i*3)%5),(i-2)*4.4+.4));B3.add(o);}
 const e=new THREE.Mesh(new THREE.BoxGeometry(15,.12,.14),mEdge);e.rotation.y=Math.PI/4;e.position.copy(PG(0,3.5,(i-2)*4.4));B3.add(e);return s;});
const PROBE=new THREE.Mesh(new THREE.SphereGeometry(.8,18,14),new THREE.MeshBasicMaterial({color:C('#ffffff'),toneMapped:false}));PROBE.visible=false;B3.add(PROBE);
const prGl=sprite(tGlowM),hitGl=sprite(tGlowM);
const TANYA=sprite(tTanya);
