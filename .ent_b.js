
const tLantai=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#d3d1c7';x.fillRect(0,0,w,h);x.fillStyle='#c2c0b5';x.fillRect(0,0,64,64);x.fillRect(64,64,64,64);bintik(x,w,h,700,['#cbc9be','#dcdad0'],1,2,r);x.fillStyle='rgba(40,38,32,.25)';x.fillRect(0,0,w,2);x.fillRect(0,0,2,h);},[8,8]);
const tLubang=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#b9bfc3';x.fillRect(0,0,w,h);for(let i=0;i<150;i++){x.fillStyle='rgba(255,255,255,'+(.05+r()*.12)+')';x.fillRect(r()*20,r()*h,w,1);}x.fillStyle='#2a2f33';for(let j=0;j<4;j++)for(let i=0;i<4;i++){x.beginPath();x.arc(16+i*32,16+j*32,4.5,0,7);x.fill();}},[10,5]);
const tHutan=teksturK(64,64,(x,w,h)=>{x.fillStyle='#000';x.fillRect(0,0,w,h);});
const tGlowV=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(190,170,255,.9)');g.addColorStop(.6,'rgba(122,92,255,.3)');g.addColorStop(1,'rgba(122,92,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
function sisiKubus(simbol,aksen){return teksturK(128,128,(x,w,h)=>{x.fillStyle='#161a2a';x.fillRect(0,0,w,h);x.strokeStyle='rgba(122,92,255,.35)';x.lineWidth=3;x.strokeRect(6,6,w-12,h-12);x.fillStyle=aksen?'#c9bfff':'#6c6f9a';x.shadowColor='#7a5cff';x.shadowBlur=aksen?18:6;x.font='700 92px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(simbol,64,70);});}

/* ---------- RENDERER, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=.9;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-400,400);
SD.add(new THREE.HemisphereLight(C('#eaf2f6'),C('#665c48'),.5));
const matahari=new THREE.DirectionalLight(C('#ffeccf'),2.9);matahari.castShadow=true;matahari.shadow.mapSize.set(4096,4096);matahari.shadow.bias=-.0003;matahari.shadow.normalBias=.04;SD.add(matahari,matahari.target);
matahari.position.set(36,60,30);matahari.target.position.set(0,0,0);Object.assign(matahari.shadow.camera,{left:-62,right:62,top:62,bottom:-62,near:1,far:260});matahari.shadow.camera.updateProjectionMatrix();
const isiL=new THREE.DirectionalLight(C('#cfe0ff'),.28);isiL.position.set(-20,12,30);SD.add(isiL);
const DM=(h,o)=>bhn(h,Object.assign({roughness:.88,envMapIntensity:.3},o),false);

/* ---------- KOTA: tanah berlapis, jalan, gedung, pohon ---------- */
const GX0=-48,GX1=48,GZ0=-32,GZ1=22;
{const sisi=a=>DM('#ffffff',{map:salin(tLapis,a,1),roughness:1});
 const tn=new THREE.Mesh(new THREE.BoxGeometry(GX1-GX0,TBL,GZ1-GZ0),[sisi(4),DM('#3a2e22'),DM('#ffffff',{map:salin(tRumput,1,1),roughness:1}),DM('#3a2e22'),sisi(3),DM('#3a2e22')]);
 tn.material[2].map.repeat.set(16,9);tn.position.set(0,-TBL/2,(GZ0+GZ1)/2);tn.receiveShadow=true;SD.add(tn);}
kotak(GX0,GX1,0,.05,10.5,15.5,DM('#ffffff',{map:tAspal,roughness:.85}),SD);for(let i=0;i<20;i++)kotak(GX0+2+i*4.8,GX0+4.6+i*4.8,.05,.07,12.9,13.1,DM('#e8dfb0'),SD);
{const r=rng(5),WN=['#d7d2c3','#c6ccd0','#d9cdb5','#bfc7c2'],kt=(w,d,h,c,x,z)=>{const m=DM('#ffffff',{map:salin(tJendela,w/6,h/3.2),roughness:.7}),a=DM(c),b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[m,m,a,a,m,m]);b.position.set(x,h/2,z);b.castShadow=b.receiveShadow=true;SD.add(b);kotak(x-w/2-.2,x+w/2+.2,h,h+.35,z-d/2-.2,z+d/2+.2,DM('#7a7468'),SD);};
 for(let i=0;i<22;i++){const x=lerp(GX0+4,GX1-4,(i+r()*.6)/22),w=3.5+r()*4,d=4+r()*4,h=5+r()*12,z=lerp(-27,-14,r());if(Math.abs(x)<12||Math.abs(Math.abs(x)-26)<7)continue;kt(w,d,h,WN[(r()*4)|0],x,z);}
 for(let i=0;i<10;i++){const x=lerp(GX0+4,GX1-4,(i+r()*.5)/10),w=4+r()*3,d=4,h=3+r()*4;if(Math.abs(Math.abs(x)-26)<9||Math.abs(x)<14)continue;kt(w,d,h,WN[(r()*4)|0],x,lerp(16.5,19.5,r()));}
 const NP=70,tj=new THREE.InstancedMesh(new THREE.CylinderGeometry(.18,.25,1.2,6),DM('#5b4330'),NP),dn=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),DM('#ffffff',{flatShading:true,roughness:.95}),NP),M=new THREE.Matrix4(),Q=new THREE.Quaternion(),Pv=new THREE.Vector3(),Sv=new THREE.Vector3();let n=0;
 for(let k=0;k<500&&n<NP;k++){const x=lerp(GX0+2,GX1-2,r()),z=lerp(GZ0+2,GZ1-2,r());if(Math.abs(x)<14&&z>-12&&z<11)continue;if(Math.abs(Math.abs(x)-26)<8&&z>-6&&z<7)continue;if(z>9.5&&z<16.5)continue;if(z<-12&&z>-27&&r()<.8)continue;const s=.9+r()*.9;
  Pv.set(x,.6,z);Sv.set(1,1,1);M.compose(Pv,Q,Sv);tj.setMatrixAt(n,M);Pv.set(x,1.4+s*.9,z);Sv.set(s*1.1,s*1.25,s*1.1);M.compose(Pv,Q,Sv);dn.setMatrixAt(n,M);dn.setColorAt(n,C(['#4c7a3b','#5a8a43','#3f6c35','#6a944c'][(r()*4)|0]));n++;}
 tj.count=dn.count=n;tj.castShadow=dn.castShadow=true;SD.add(tj,dn);}

/* ---------- LABORATORIUM OPTIK (tengah) ---------- */
kotak(-11,11,0,.25,-9.5,9.5,DM('#ffffff',{map:salin(tBeton,5,3)}),SD);kotak(-9.2,9.2,.25,.4,-8.4,8.4,DM('#ffffff',{map:tLantai,roughness:.4}),SD);
{const pl=DM('#d9d6c9',{roughness:.9}),at=DM('#a9a69e');kotak(-9.2,9.2,.4,6.6,-8.6,-8.0,pl,SD);kotak(-9.2,-8.6,.4,6.6,-8.6,8.4,pl,SD);kotak(-9.3,9.3,6.6,6.75,-8.7,-7.9,at,SD);kotak(-9.3,-8.5,6.6,6.75,-8.7,8.5,at,SD);
 const bg=DM('#4a5056',{metalness:.5,roughness:.4});kotak(-3,3,2.8,6.0,-7.95,-7.85,bg,SD);const kc=new THREE.Mesh(new THREE.PlaneGeometry(5.6,3),new THREE.MeshBasicMaterial({color:C('#e8f2f6'),toneMapped:false}));kc.position.set(0,4.4,-7.83);SD.add(kc);
 [-1.0,1.0].forEach(x=>kotak(x-.06,x+.06,2.9,5.9,-7.84,-7.8,bg,SD));kotak(-2.9,2.9,4.35,4.45,-7.84,-7.8,bg,SD);
 // lemari kaca + kabinet
 kotak(-8.4,-6.6,.4,2.4,-6.8,-3.0,DM('#8a9096',{metalness:.5,roughness:.45}),SD);kotak(-6.62,-6.58,.8,2.1,-6.6,-3.2,bhn('#cfe8f0',{transparent:true,opacity:.22,roughness:.05},false),SD);}
{const st=DM('#ffffff',{map:tLubang,metalness:.85,roughness:.34,envMapIntensity:1}),sg=DM('#ffffff',{map:tSikatG,metalness:.8,roughness:.4}),gl=DM('#2f3338',{roughness:.6});
 kotak(-4.6,4.6,2.2,2.5,-2.1,2.1,st,SD);kotak(-4.7,4.7,2.0,2.2,-2.2,2.2,sg,SD);[[-4.2,-1.8],[4.2,-1.8],[-4.2,1.8],[4.2,1.8]].forEach(([x,z])=>{kotak(x-.18,x+.18,.4,2.0,z-.18,z+.18,gl,SD);pasang(new THREE.CylinderGeometry(.34,.4,.18,18),sg,SD,[x,.5,z]);});kotak(-4.2,4.2,.9,1.0,-1.6,1.6,sg,SD);
 // laser, lensa, cermin, penyangga kristal, kopler serat
 kotak(-4.2,-2.5,2.5,3.4,-.6,.6,DM('#2d3036',{metalness:.6,roughness:.4}),SD);kotak(-4.2,-2.5,3.4,3.48,-.62,.62,sg,SD);pasang(new THREE.CylinderGeometry(.16,.16,.3,18),sg,SD,[-2.4,2.95,0]).rotation.z=Math.PI/2;
 pasang(new THREE.SphereGeometry(.09,12,10),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}),SD,[-2.2,2.95,0]);
 const ln=pasang(new THREE.CylinderGeometry(.34,.34,.08,26),bhn('#cfe8f0',{transparent:true,opacity:.35,roughness:.05},false),SD,[-1.6,2.95,0]);ln.rotation.z=Math.PI/2;pasang(new THREE.CylinderGeometry(.04,.04,.45,8),sg,SD,[-1.6,2.7,0]);
 [[-3.2,1.4,.4],[3.6,-1.4,.4]].forEach(([x,z])=>{kotak(x-.3,x+.3,2.5,3.1,z-.04,z+.04,bhn('#dfe6ea',{metalness:1,roughness:.12},false),SD);pasang(new THREE.CylinderGeometry(.06,.06,.5,8),sg,SD,[x,2.75,z]);});
 pasang(new THREE.CylinderGeometry(.15,.2,.4,18),sg,SD,[0,2.7,0]);
 [-1.5,1.5].forEach(x=>{const k=pasang(new THREE.CylinderGeometry(.2,.2,.5,18),sg,SD,[x,2.95,0]);k.rotation.z=Math.PI/2;});
 // monitor + kursi
 kotak(-6.2,-4.8,.4,.5,4.2,5.4,gl,SD);kotak(5.6,7.6,.4,2.2,-1.0,1.0,DM('#7d868d',{metalness:.6,roughness:.4}),SD);pasang(new THREE.CylinderGeometry(.5,.5,.1,22),gl,SD,[-6.0,1.9,3.2]);batang([-6,.4,3.2],[-6,1.9,3.2],.07,sg,SD);}
// kristal khusus (kaca optik) dipotong bidang POTC
PLN=POTC;
const KR=new THREE.Mesh(new THREE.BoxGeometry(1.2,.8,.8),new THREE.MeshStandardMaterial({color:C('#d8ceff'),transparent:true,opacity:.55,roughness:.05,metalness:.1,envMapIntensity:2,clippingPlanes:[POTC],clipShadows:true,side:THREE.DoubleSide,depthWrite:false}));KR.position.set(0,2.95,0);SD.add(KR);
KR.add(new THREE.Mesh(KR.geometry,new THREE.MeshBasicMaterial({color:C('#e6deff'),side:THREE.BackSide,clippingPlanes:[POTC],toneMapped:false,transparent:true,opacity:.75})));
