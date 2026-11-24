
const tKisi=teksturK(64,64,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(30,44,86,.55)';x.fillRect(0,0,w,h);x.fillStyle='rgba(190,215,255,.95)';x.fillRect(0,0,w,3);x.fillRect(0,0,3,h);x.fillStyle='rgba(120,150,230,.25)';x.fillRect(3,3,w,2);});
const tCakram=teksturK(512,512,(x,w,h,r)=>{x.clearRect(0,0,w,h);const c=256;for(let k=0;k<5;k++){const g=x.createRadialGradient(c,c,60+k*0,c,c,250);g.addColorStop(0,'rgba(255,248,224,0)');g.addColorStop(.18,'rgba(255,240,200,.95)');g.addColorStop(.4,'rgba(255,170,70,.8)');g.addColorStop(.75,'rgba(220,70,20,.55)');g.addColorStop(1,'rgba(120,20,5,0)');x.globalCompositeOperation=k?'lighter':'source-over';x.fillStyle=g;x.globalAlpha=k?.12:1;x.beginPath();x.arc(c,c,250,0,7);x.fill();}
  x.globalAlpha=1;x.globalCompositeOperation='source-over';for(let i=0;i<70;i++){const a=r()*6.283,rr=90+r()*150,l=.6+r()*1.2;x.strokeStyle='rgba(255,'+(150+r()*90|0)+',90,'+(.12+r()*.28)+')';x.lineWidth=2+r()*5;x.beginPath();x.arc(c,c,rr,a,a+l);x.stroke();}
  x.globalCompositeOperation='destination-out';const g2=x.createRadialGradient(c,c,100,c,c,120);g2.addColorStop(0,'rgba(0,0,0,1)');g2.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g2;x.beginPath();x.arc(c,c,125,0,7);x.fill();});
const tCincin=teksturK(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(128,128,70,128,128,126);g.addColorStop(0,'rgba(255,120,40,0)');g.addColorStop(.62,'rgba(255,200,130,.95)');g.addColorStop(.75,'rgba(255,100,30,.5)');g.addColorStop(1,'rgba(255,80,20,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tGlow=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,170,100,.9)');g.addColorStop(.6,'rgba(255,90,30,.3)');g.addColorStop(1,'rgba(255,90,30,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tBatu=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#8a7c6c';x.fillRect(0,0,w,h);bintik(x,w,h,3500,['#7a6d5f','#9a8c7a','#6b5f52','#a89a88'],1,5,r);for(let i=0;i<14;i++){const a=r()*w,b=r()*h,rr=8+r()*22;x.fillStyle='rgba(40,34,28,.35)';x.beginPath();x.arc(a,b,rr,0,7);x.fill();x.fillStyle='rgba(190,175,150,.3)';x.beginPath();x.arc(a-2,b-2,rr*.8,0,7);x.fill();}},[2,1]);
const tKainA=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#ecebe6';x.fillRect(0,0,w,h);for(let i=0;i<128;i+=3){x.fillStyle='rgba(0,0,0,.05)';x.fillRect(0,i,w,1);x.fillRect(i,0,1,h);}bintik(x,w,h,400,['#e0dfd8','#f4f3ee'],1,2,r);x.fillStyle='rgba(60,60,60,.35)';x.fillRect(0,62,w,3);},[2,2]);
const tPanel=teksturK(128,128,(x,w,h)=>{x.fillStyle='#1d2b52';x.fillRect(0,0,w,h);x.strokeStyle='rgba(150,180,255,.6)';x.lineWidth=2;for(let i=0;i<=128;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke();}},[2,1]);

/* ---------- RENDERER, CAHAYA, LATAR BINTANG ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=1.0;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-600,600);
SD.add(new THREE.HemisphereLight(C('#cdd8ff'),C('#2a1e16'),.45));
const matahari=new THREE.DirectionalLight(C('#fff0dc'),2.6);matahari.castShadow=true;matahari.shadow.mapSize.set(4096,4096);matahari.shadow.bias=-.0004;matahari.shadow.normalBias=.04;SD.add(matahari,matahari.target);
matahari.position.set(40,60,30);matahari.target.position.set(0,0,0);Object.assign(matahari.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:300});matahari.shadow.camera.updateProjectionMatrix();
const tepiL=new THREE.DirectionalLight(C('#9db4ff'),.8);tepiL.position.set(-30,10,-30);SD.add(tepiL);
{const N=1600,pos=new Float32Array(N*3),col=new Float32Array(N*3),r=rng(9);for(let i=0;i<N;i++){const a=r()*6.283,b=Math.acos(2*r()-1),R=220+r()*60;pos.set([R*Math.sin(b)*Math.cos(a),R*Math.sin(b)*Math.sin(a),R*Math.cos(b)],i*3);const c=new THREE.Color().setHSL(.6+r()*.1,.4*r(),.75+r()*.25);col.set([c.r,c.g,c.b],i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));const st=new THREE.Points(g,new THREE.PointsMaterial({size:2.6,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,toneMapped:false}));st.frustumCulled=false;SD.add(st);}
const sprite=()=>{const m=new THREE.SpriteMaterial({map:tGlow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
const DM=(h,o)=>bhn(h,Object.assign({roughness:.85,envMapIntensity:.4},o),false);

/* ---------- BLACK HOLE RAKSASA + PIRINGAN GAS (adegan 1) ---------- */
const BH=new THREE.Group();SD.add(BH);
const bola=new THREE.Mesh(new THREE.SphereGeometry(4,64,40),new THREE.MeshBasicMaterial({color:0x000000,transparent:true}));BH.add(bola);
const cak=new THREE.Mesh(new THREE.RingGeometry(5.2,15,160,1),new THREE.MeshBasicMaterial({map:tCakram,transparent:true,side:THREE.DoubleSide,depthWrite:false,toneMapped:false}));cak.rotation.x=-Math.PI/2+.0;cak.material.map.center.set(.5,.5);
{const uv=cak.geometry.attributes.uv,p=cak.geometry.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,(p.getX(i)/15+1)/2,(p.getY(i)/15+1)/2);}
const CAKG=new THREE.Group();CAKG.rotation.x=.22;CAKG.add(cak);BH.add(CAKG);
const cinF=new THREE.Sprite(new THREE.SpriteMaterial({map:tCincin,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));cinF.scale.setScalar(12.6);BH.add(cinF);
const cinF2=new THREE.Sprite(new THREE.SpriteMaterial({map:tCincin,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:.6}));cinF2.scale.setScalar(22);cinF2.position.set(-3,2,-3);BH.add(cinF2);
// bulan berbatu pelengkap
const BL=new THREE.Mesh(new THREE.IcosahedronGeometry(3.2,4),DM('#ffffff',{map:tBatu,roughness:1}));{const p=BL.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),d=1+.12*Math.sin(x*2.1+1)*Math.sin(y*1.7)+.08*Math.sin(z*2.6+2);p.setXYZ(i,x*d,y*d,z*d);}BL.geometry.computeVertexNormals();}
BL.position.set(34,10,-26);BL.castShadow=BL.receiveShadow=true;SD.add(BL);
