
const tLumpur=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6d6154';x.fillRect(0,0,w,h);bintik(x,w,h,3200,['#5e5347','#7c7062','#51473c','#8a7d6d'],1,5,r);for(let i=0;i<40;i++){x.strokeStyle='rgba(30,25,20,.18)';x.lineWidth=2;x.beginPath();const y=r()*h;x.moveTo(0,y);x.quadraticCurveTo(w/2,y+r()*12-6,w,y);x.stroke();}},[1.5,1.5]);
const tGlowB=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(110,235,255,.9)');g.addColorStop(.6,'rgba(25,227,255,.3)');g.addColorStop(1,'rgba(25,227,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tPutih=teksturK(64,64,(x,w,h)=>{x.fillStyle='#f2f4f4';x.fillRect(0,0,w,h);x.fillStyle='rgba(0,0,0,.05)';for(let i=0;i<64;i+=4)x.fillRect(0,i,w,1);});

/* ---------- RENDERER, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=.95;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.localClippingEnabled=true;RD.setClearColor(0,0);$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene();SD.environment=petaPantul(RD);
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-600,600);
const HEMI=new THREE.HemisphereLight(C('#e0f0ff'),C('#33404a'),.5);SD.add(HEMI);
const matahari=new THREE.DirectionalLight(C('#fff2dc'),2.7);matahari.castShadow=true;matahari.shadow.mapSize.set(4096,4096);matahari.shadow.bias=-.0004;matahari.shadow.normalBias=.04;SD.add(matahari,matahari.target);
matahari.position.set(40,90,35);matahari.target.position.set(0,-20,0);Object.assign(matahari.shadow.camera,{left:-60,right:60,top:60,bottom:-60,near:1,far:300});matahari.shadow.camera.updateProjectionMatrix();
const isiL=new THREE.DirectionalLight(C('#b8d8ff'),.3);isiL.position.set(-20,12,30);SD.add(isiL);
const sprite=()=>{const m=new THREE.SpriteMaterial({map:tGlowB,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
const DM=(h,o)=>bhn(h,Object.assign({roughness:.85,envMapIntensity:.4},o),false);

/* ---------- BALOK AIR RAKSASA: lapisan kedalaman diekstrusi dari penampang (x,y) ---------- */
function Sx(x){const a=Math.abs(x);if(a>=7.2)return -39.2-.2*Math.sin(a*3);if(a>=1.1)return lerp(-66.06,-39.2,(a-1.1)/6.1)+.2*Math.sin(a*7)*Math.sin((a-1.1)*.5);return -66.06;}
const BWX=8,BDZ=10;
function formaLapis(ya,yb){const sh=new THREE.Shape(),N=96,xs=Array.from({length:N+1},(_,i)=>lerp(-BWX,BWX,i/N));sh.moveTo(xs[0],ya);xs.forEach(x=>sh.lineTo(x,ya));for(let i=N;i>=0;i--){const x=xs[i];sh.lineTo(x,Math.min(ya,Math.max(yb,Sx(x))));}sh.lineTo(xs[0],ya);return sh;}
const LAPIS_D=[[0,200,'#8fe3f0'],[200,1000,'#3d9bd6'],[1000,4000,'#1f5fa8'],[4000,6000,'#143c78'],[6000,10900,'#0a2352']];
const LAPIS_M=[];
LAPIS_D.forEach(([a,b,c],i)=>{const g=new THREE.ExtrudeGeometry(formaLapis(DY(a),i==4?-70:DY(b)),{depth:BDZ,bevelEnabled:false,steps:1});g.translate(0,0,-BDZ/2);
  const fm=new THREE.MeshStandardMaterial({color:C(c),transparent:true,opacity:.2+.0*i,roughness:.1,metalness:0,clippingPlanes:[POTW],depthWrite:false,envMapIntensity:1.4}),m=new THREE.Mesh(g,fm);m.renderOrder=2;SD.add(m);
  const cm=new THREE.MeshBasicMaterial({color:C(c),side:THREE.BackSide,clippingPlanes:[POTW],toneMapped:false});const cp=new THREE.Mesh(g,cm);m.add(cp);LAPIS_M.push({fm,cm,c});});
// lapisan 5 (hadal) diperpanjang ke bawah profil dasar laut supaya tidak ada celah
{const sh=new THREE.Shape(),N=96,xs=Array.from({length:N+1},(_,i)=>lerp(-BWX,BWX,i/N));sh.moveTo(xs[0],-72);xs.forEach(x=>sh.lineTo(x,Sx(x)));sh.lineTo(BWX,-72);sh.lineTo(xs[0],-72);
  const g=new THREE.ExtrudeGeometry(sh,{depth:BDZ,bevelEnabled:false});g.translate(0,0,-BDZ/2);
  const mud=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:C('#6c6c70'),map:salin(tLumpur,.3,.3),roughness:1,envMapIntensity:.1,clippingPlanes:[POTW],clipShadows:true}));mud.castShadow=mud.receiveShadow=true;SD.add(mud);
  mud.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:C('#5a4e42'),side:THREE.BackSide,clippingPlanes:[POTW],toneMapped:false})));}
// laut lepas di sekeliling balok (dengan lubang)
{const s=new THREE.Shape();s.moveTo(-90,-90);s.lineTo(BWX,-90);s.lineTo(BWX,BDZ/2);s.lineTo(-90,BDZ/2);s.lineTo(-90,-90);const h=new THREE.Path();h.moveTo(-BWX,-BDZ/2);h.lineTo(-BWX,BDZ/2);h.lineTo(BWX,BDZ/2);h.lineTo(BWX,-BDZ/2);h.lineTo(-BWX,-BDZ/2);s.holes.push(h);
  const g=new THREE.ShapeGeometry(s);g.rotateX(-Math.PI/2);const uv=g.attributes.uv,p=g.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,p.getX(i)/10,p.getZ(i)/10);
  const lt=salin(tLaut,1,1);lt.repeat.set(1,1);const sea=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:C('#bfe4f2'),map:lt,roughness:.12,metalness:.05,envMapIntensity:1.8}));sea.receiveShadow=true;sea.position.y=-.02;SD.add(sea);window.SEAMAP=lt;}
const FRC=(()=>{const g=new THREE.Group();SD.add(g);const w=17,h=74,s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.lineTo(-w/2,-h/2);
  g.add(new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:C(PAL.aks),transparent:true,opacity:.08,depthWrite:false,side:THREE.DoubleSide,toneMapped:false})));
  g.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(s.getPoints().map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:C(PAL.aks),transparent:true,toneMapped:false})));g.position.set(0,-33,0);return g;})();
