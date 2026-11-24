
const tJalan=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#4a4d52';x.fillRect(0,0,w,h);bintik(x,w,h,1400,['#3f4247','#585b61','#35383d','#63666c'],1,3,r);x.fillStyle='#e8e1b8';x.fillRect(0,60,64,8);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(0,4,w,4);x.fillRect(0,h-8,w,4);},[1,1]);
const tKainL=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#2d6fd6';x.fillRect(0,0,w,h);for(let i=0;i<128;i+=3){x.fillStyle='rgba(0,0,0,.08)';x.fillRect(0,i,w,1);x.fillRect(i,0,1,h);}x.fillStyle='#f4f6f8';x.fillRect(0,50,w,12);x.fillRect(0,76,w,6);bintik(x,w,h,300,['#2a66c4','#3a7ae6'],1,2,r);},[2,2]);
const tShort=teksturK(64,64,(x,w,h,r)=>{x.fillStyle='#14233f';x.fillRect(0,0,w,h);for(let i=0;i<64;i+=3){x.fillStyle='rgba(255,255,255,.06)';x.fillRect(0,i,w,1);}x.fillStyle='#f4f6f8';x.fillRect(0,0,w,5);},[2,2]);
const tGlowE=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(210,235,255,.95)');g.addColorStop(.55,'rgba(46,155,255,.35)');g.addColorStop(1,'rgba(46,155,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tCincinE=teksturK(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(128,128,70,128,128,126);g.addColorStop(0,'rgba(46,155,255,0)');g.addColorStop(.7,'rgba(210,235,255,.95)');g.addColorStop(.82,'rgba(46,155,255,.45)');g.addColorStop(1,'rgba(46,155,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});

/* ---------- RENDERER, CAHAYA, BINTANG ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=.95;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-4000,4000);
const HEMI=new THREE.HemisphereLight(C('#e0f0ff'),C('#5a5a4a'),.55);SD.add(HEMI);
const matahari=new THREE.DirectionalLight(C('#fff2dc'),2.8);matahari.castShadow=true;matahari.shadow.mapSize.set(4096,4096);matahari.shadow.bias=-.0004;matahari.shadow.normalBias=.03;SD.add(matahari,matahari.target);
matahari.position.set(22,40,26);matahari.target.position.set(2,0,-1.5);Object.assign(matahari.shadow.camera,{left:-28,right:28,top:28,bottom:-28,near:1,far:160});matahari.shadow.camera.updateProjectionMatrix();
{const N=1500,pos=new Float32Array(N*3),col=new Float32Array(N*3),r=rng(9);for(let i=0;i<N;i++){const a=r()*6.283,b=Math.acos(2*r()-1),Rr=1800+r()*200;pos.set([Rr*Math.sin(b)*Math.cos(a),Rr*Math.sin(b)*Math.sin(a),Rr*Math.cos(b)],i*3);const c=new THREE.Color().setHSL(.6,.3*r(),.8);col.set([c.r,c.g,c.b],i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));window.STARS=new THREE.Points(g,new THREE.PointsMaterial({size:2.4,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:0,depthWrite:false,toneMapped:false}));STARS.frustumCulled=false;SD.add(STARS);}
const sprite=(tex=tGlowE)=>{const m=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
const DM=(h,o)=>bhn(h,Object.assign({roughness:.85,envMapIntensity:.4},o),false);

/* ---------- BUMI: lempeng irisan (z -8..0) + tutup penampang eksplisit ---------- */
const CAPS=[];
{PLN=POTE;const E0=new THREE.Vector3(0,CY,0),mk3=(g,m)=>{const o=new THREE.Mesh(g,m);o.position.copy(E0);SD.add(o);return o;};
 const gA=new THREE.SphereGeometry(R+TA,192,96),gC=new THREE.SphereGeometry(R,256,128);
 const atm=mk3(gA,new THREE.MeshStandardMaterial({color:C('#bfe3ff'),transparent:true,opacity:.16,roughness:.1,clippingPlanes:[POTE,POTB],depthWrite:false,envMapIntensity:1.2}));atm.renderOrder=2;
 const kr=mk3(gC,new THREE.MeshStandardMaterial({color:C('#ffffff'),map:salin(tRumput,320,160),roughness:1,envMapIntensity:.3,clippingPlanes:[POTE,POTB],clipShadows:true}));kr.receiveShadow=true;
 const cap=(g,c)=>{const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:C(c),toneMapped:false,side:THREE.DoubleSide,clippingPlanes:[POTB]}));SD.add(m);CAPS.push(m);return m;};
 cap(new THREE.CircleGeometry(R-TC,256),'#a8552e');cap(new THREE.RingGeometry(R-TC,R,256,1),'#d9a066');cap(new THREE.RingGeometry(R,R+TA,256,1),'#8ec8f5');}
function aturCaps(z){CAPS.forEach(m=>{m.position.set(0,CY,-7.9);m.visible=true;});}
{const N=240,pos=[],uv=[],idx=[];for(let i=0;i<=N;i++){const x=lerp(-70,110,i/N);[-1.9,1.9].forEach((dz,k)=>{const z=ZR+dz;pos.push(x,yS(x,z)+.04,z);uv.push(x/7,k);});}
 for(let i=0;i<N;i++){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 const tj=salin(tJalan,1,1);window.JALAN=tj;const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:tj,roughness:.9,envMapIntensity:.3,side:THREE.DoubleSide,clippingPlanes:[POTE]}));m.receiveShadow=true;SD.add(m);}
// tiang penanda di tepi jalan (jarak dipendekkan saat kontraksi panjang)
const TIANG=Array.from({length:61},(_,k)=>{const g=new THREE.Group(),m=DM('#ffffff',{map:tSikat,metalness:.8,roughness:.4});const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,2.6,10),m);p.position.y=1.3;p.castShadow=true;g.add(p);
  const l=new THREE.Mesh(new THREE.BoxGeometry(.5,.18,.3),new THREE.MeshBasicMaterial({color:C('#fff6dc'),toneMapped:false}));l.position.set(.2,2.6,0);g.add(l);SD.add(g);g.userData.x0=(k-30)*6;return g;});
// molekul udara (titik-titik kecil)
const NA=300,AIR=new THREE.InstancedMesh(new THREE.SphereGeometry(.06,10,8),new THREE.MeshStandardMaterial({color:C('#2c5d9e'),roughness:.4,emissive:C('#14325a'),emissiveIntensity:.35}),NA);AIR.frustumCulled=false;AIR.castShadow=false;SD.add(AIR);
const _M=new THREE.Matrix4(),_Q=new THREE.Quaternion(),_P=new THREE.Vector3(),_S=new THREE.Vector3();
const AIRB=Array.from({length:NA},(_,i)=>({x:lerp(-6,30,hash(i+1)),h:.5+hash(i+300)*6.2,z:lerp(-3.3,-.2,hash(i+600)),v:.6+hash(i+900)*.8,ph:hash(i+1200)*6.28}));
