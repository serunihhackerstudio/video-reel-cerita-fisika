
/* ---------- RENDERER, KAMERA, CAHAYA ---------- */
const RD=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RD.setPixelRatio(1);RD.setSize(W,H);RD.outputEncoding=THREE.sRGBEncoding;
RD.toneMapping=THREE.ACESFilmicToneMapping;RD.toneMappingExposure=1.0;RD.localClippingEnabled=true;RD.shadowMap.enabled=true;RD.shadowMap.type=THREE.PCFSoftShadowMap;RD.setClearColor(0,0);RD.autoClear=false;$('#dunia').appendChild(RD.domElement);
const SD=new THREE.Scene(),SS=new THREE.Scene();
const KD=new THREE.OrthographicCamera(-1,1,1,-1,-900,900),KS=new THREE.OrthographicCamera(-1,1,1,-1,-5000,5000);
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL)),_v=new THREE.Vector3();
function pasangKamera(cam,tg,h,w,D){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2,near:400-D,far:400+D});cam.updateProjectionMatrix();_v.set(tg.x,tg.y,tg.z);cam.position.copy(_v).addScaledVector(ARAH,400);cam.lookAt(_v);}
pasangKamera(KS,{x:0,y:0,z:0},1500,1500*W/H,5000);
const HEM=new THREE.HemisphereLight(C('#b6a8ff'),C('#3a2418'),.55);SD.add(HEM);
const SUNL=new THREE.DirectionalLight(C('#fff0cf'),3);SUNL.castShadow=true;SUNL.shadow.mapSize.set(4096,4096);
Object.assign(SUNL.shadow.camera,{left:-27,right:27,top:27,bottom:-27,near:1,far:170});SUNL.shadow.bias=-.0012;SUNL.shadow.normalBias=.09;SUNL.shadow.radius=2;SD.add(SUNL,SUNL.target);SUNL.target.position.set(0,3,0);
const ROOML=new THREE.PointLight(C('#ffb066'),0,30,1.4);ROOML.position.set(-.5,5.4,-2);SD.add(ROOML);
const ROOML2=new THREE.PointLight(C('#ffc58a'),0,14,1.4);ROOML2.position.set(-6,4.5,-1.8);SD.add(ROOML2);
/* bintang (layar) */
const STARS=(()=>{const N=2400,pos=new Float32Array(N*3),col=new Float32Array(N*3),r=rng(33);for(let i=0;i<N;i++){pos.set([(r()*2-1)*900,(r()*2-1)*900,(r()*2-1)*900],i*3);const c=new THREE.Color().setHSL(.7+r()*.12,.35*r(),.7+r()*.3);col.set([c.r,c.g,c.b],i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
 const p=new THREE.Points(g,new THREE.PointsMaterial({size:2.6,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:0,depthWrite:false,toneMapped:false}));p.frustumCulled=false;SS.add(p);return p;})();
/* ---------- TEKSTUR ---------- */
const tBrick=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#86503c';x.fillRect(0,0,w,h);const bw=64,bh=32,cs=['#a8573a','#a1523a','#ac5d3e','#9c4e36','#a95a3c','#a35439'];
  for(let j=0;j<8;j++)for(let i=-1;i<5;i++){const px=i*bw+(j%2)*32;x.fillStyle=cs[(r()*cs.length)|0];x.fillRect(px+3,j*bh+3,bw-6,bh-6);}
  bintik(x,w,h,300,['rgba(255,220,180,.06)','rgba(40,15,8,.07)'],2,4,r);});
const tStone=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#d9ccac';x.fillRect(0,0,w,h);bintik(x,w,h,2200,['#cdbf9d','#e3d8bb','#c5b793','#ddd0b0'],1,3,r);x.fillStyle='rgba(90,75,50,.28)';x.fillRect(0,0,w,2);x.fillRect(0,128,w,2);x.fillRect(0,0,2,128);x.fillRect(128,128,2,128);});
const tSlate=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#363a52';x.fillRect(0,0,w,h);for(let j=0;j<10;j++)for(let i=-1;i<8;i++){const px=i*32+(j%2)*16,v=(r()*14)|0;x.fillStyle=`rgb(${52+v},${57+v},${82+v})`;x.fillRect(px+1,j*26+1,30,24);x.fillStyle='rgba(0,0,0,.10)';x.fillRect(px+1,j*26+22,30,3);}});
const tGrass=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6a9150';x.fillRect(0,0,w,h);bintik(x,w,h,4200,['#5b8244','#78a059','#6a9150','#85ab63','#4f7439'],1,3,r);for(let i=0;i<1600;i++){x.strokeStyle=r()<.5?'rgba(35,65,20,.3)':'rgba(180,215,120,.3)';x.lineWidth=1;const a=r()*w,b=r()*h;x.beginPath();x.moveTo(a,b);x.lineTo(a+(r()-.5)*3,b-3-r()*4);x.stroke();}});
const tDirt=teksturK(256,256,(x,w,h,r)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#5a8a43');g.addColorStop(.1,'#6b4a30');g.addColorStop(.55,'#5a3d28');g.addColorStop(1,'#4a3322');x.fillStyle=g;x.fillRect(0,0,w,h);bintik(x,w,h,1500,['#7a5638','#4a3322','#6b4a30','#8a6644'],1,4,r);});
const tGravel=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#cdbc94';x.fillRect(0,0,w,h);bintik(x,w,h,3200,['#bfae86','#dccca4','#b09f78','#e6d8b4'],1,3,r);});
const tFloor=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#8b5a34';x.fillRect(0,0,w,h);for(let i=0;i<8;i++){const c=60+((r()*28)|0);x.fillStyle=`rgb(${130+c/3|0},${82+c/4|0},${48+c/6|0})`;x.fillRect(i*32+1,0,30,h);x.fillStyle='rgba(30,16,8,.45)';x.fillRect(i*32,0,2,h);}
  for(let i=0;i<260;i++){x.strokeStyle='rgba(50,28,12,.28)';x.lineWidth=1;const a=r()*w,b=r()*h;x.beginPath();x.moveTo(a,b);x.lineTo(a+(r()-.5)*4,b+10+r()*30);x.stroke();}for(let j=0;j<4;j++){x.fillStyle='rgba(30,16,8,.4)';x.fillRect(0,j*64+((r()*60)|0),w,2);}});
const tWoodD=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#4d311f';x.fillRect(0,0,w,h);for(let i=0;i<240;i++){x.strokeStyle=r()<.5?'rgba(20,10,4,.35)':'rgba(130,85,50,.22)';x.lineWidth=1+r()*1.5;const a=r()*w;x.beginPath();x.moveTo(a,0);x.bezierCurveTo(a+8,80,a-8,170,a+4,h);x.stroke();}});
const tPlaster=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#e8d9bc';x.fillRect(0,0,w,h);bintik(x,w,h,2000,['#dfcfb0','#efe2c8','#d6c5a4'],2,8,r);x.fillStyle='rgba(120,80,100,.07)';for(let i=0;i<4;i++)x.fillRect(i*64+30,0,4,h);});
const tCloth=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#f4efe6';x.fillRect(0,0,w,h);for(let i=0;i<64;i++){x.fillStyle='rgba(120,110,95,.09)';x.fillRect(i*2,0,1,h);x.fillRect(0,i*2,w,1);}});
const tCarpet=teksturK(128,128,(x,w,h,r)=>{x.fillStyle='#5a1f6e';x.fillRect(0,0,w,h);x.strokeStyle='#8c3aa6';x.lineWidth=3;x.beginPath();x.moveTo(64,6);x.lineTo(122,64);x.lineTo(64,122);x.lineTo(6,64);x.closePath();x.stroke();x.fillStyle='#d9a93e';x.beginPath();x.arc(64,64,6,0,7);x.fill();bintik(x,w,h,500,['rgba(255,255,255,.05)','rgba(0,0,0,.12)'],1,2,r);});
const tBanner=teksturK(1024,208,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#5c2085');g.addColorStop(1,'#431766');x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='#e8c25a';x.lineWidth=8;x.strokeRect(14,14,w-28,h-28);x.lineWidth=2;x.strokeRect(26,26,w-52,h-52);
  x.fillStyle='#ffe9a8';x.font="bold 82px Georgia,'Times New Roman',serif";x.textAlign='center';x.textBaseline='middle';x.fillText('Selamat datang,',w/2,76);x.font="italic bold 74px Georgia,'Times New Roman',serif";x.fillStyle='#ffd0ff';x.fillText('penjelajah waktu',w/2,148);});
const tClock=teksturK(256,256,(x,w,h)=>{x.fillStyle='#f6efd8';x.fillRect(0,0,w,h);x.fillStyle='#2a1c10';x.font="bold 34px Georgia,serif";x.textAlign='center';x.textBaseline='middle';
  for(let i=1;i<=12;i++){const a=i*30*DEG;x.fillText(String(i),128+Math.sin(a)*92,128-Math.cos(a)*92);}for(let i=0;i<60;i++){const a=i*6*DEG,l=i%5?6:12;x.strokeStyle='#2a1c10';x.lineWidth=i%5?1.5:3;x.beginPath();x.moveTo(128+Math.sin(a)*(122-l),128-Math.cos(a)*(122-l));x.lineTo(128+Math.sin(a)*122,128-Math.cos(a)*122);x.stroke();}});
const tCard=teksturK(512,320,(x,w,h)=>{x.fillStyle='#fbf6e8';x.fillRect(0,0,w,h);x.strokeStyle='#c99a3a';x.lineWidth=6;x.strokeRect(12,12,w-24,h-24);x.lineWidth=1.5;x.strokeRect(24,24,w-48,h-48);
  x.textAlign='center';x.textBaseline='middle';x.fillStyle='#6a2a86';x.font="bold 34px Georgia,serif";x.fillText('UNDANGAN PESTA',w/2,66);x.fillStyle='#3a2a20';x.font="italic 30px Georgia,serif";x.fillText('untuk para penjelajah waktu',w/2,108);
  x.fillStyle='#b01fd0';x.font="bold 70px Georgia,serif";x.fillText('28 JUNI 2009',w/2,186);x.fillStyle='#3a2a20';x.font="bold 34px Georgia,serif";x.fillText('pukul 12.00 · Cambridge',w/2,248);});
const tGlowM=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(246,170,255,.9)');g.addColorStop(.6,'rgba(217,60,245,.3)');g.addColorStop(1,'rgba(217,60,245,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tGlowW=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,250,225,1)');g.addColorStop(.3,'rgba(255,200,110,.85)');g.addColorStop(.7,'rgba(255,150,40,.2)');g.addColorStop(1,'rgba(255,140,20,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tAlir=teksturK(128,16,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,.35)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const tTitik=teksturK(128,16,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<4;i++){const g=x.createLinearGradient(i*32,0,i*32+22,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(i*32,0,22,h);}});
const tTanya=teksturK(256,256,(x,w,h)=>{x.textAlign='center';x.textBaseline='middle';x.font="bold 220px Georgia,serif";x.shadowColor='#d93cf5';x.shadowBlur=40;x.fillStyle='#fcdfff';x.fillText('?',128,138);x.fillText('?',128,138);});
/* ---------- bahan & alat ---------- */
const M=(hex,o={},klip=true)=>new THREE.MeshStandardMaterial(Object.assign({color:C(hex),roughness:.75,metalness:0},o,klip?{clippingPlanes:CUT,clipShadows:true}:{}));
const capM=hex=>new THREE.MeshBasicMaterial({color:C(hex),side:THREE.BackSide,clippingPlanes:CUT,toneMapped:false});
const CAPW='#f0c987',CAPF='#b8743c',CAPR='#9475dc',BRASS='#c9993a';
[tBrick,tStone,tSlate,tPlaster,tGrass,tFloor,tWoodD].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
const mBrick=M('#ffffff',{map:tBrick,roughness:.92}),mStone=M('#ffffff',{map:tStone,roughness:.85}),mPlaster=M('#ffffff',{map:tPlaster,roughness:.95}),mSlate=M('#ffffff',{map:tSlate,roughness:.7}),mFloor=M('#ffffff',{map:tFloor,roughness:.6});
const wm=f=>{const a=[mBrick,mBrick,mStone,mStone,mBrick,mBrick];a[f]=mPlaster;return a;};const WM={px:wm(0),nx:wm(1),pz:wm(4),nz:wm(5)};
const mWoodC=M('#ffffff',{map:tWoodD,roughness:.55}),mWhite=M('#f3eee2',{roughness:.6}),mWoodD=M('#ffffff',{map:tWoodD,roughness:.55},false),mBrass=M(BRASS,{metalness:.75,roughness:.32,emissive:C('#3a2706')},false),mBrassC=M(BRASS,{metalness:.75,roughness:.32,emissive:C('#3a2706')});
const winMats=[];
const mGlassW=()=>{const m=M('#a9c9ec',{roughness:.05,transparent:true,opacity:.24,emissive:C('#ffb860'),emissiveIntensity:0,depthWrite:false});winMats.push(m);return m;};
function boxUV(g,sx,sy,sz,tile){const uv=g.attributes.uv,s=[[sz,sy],[sz,sy],[sx,sz],[sx,sz],[sx,sy],[sx,sy]];for(let f=0;f<6;f++)for(let v=0;v<4;v++){const i=f*4+v;uv.setXY(i,uv.getX(i)*s[f][0]/tile,uv.getY(i)*s[f][1]/tile);}}
function kb(x0,x1,y0,y1,z0,z1,mat,par,cap,tile=4.5){const sx=x1-x0,sy=y1-y0,sz=z1-z0,g=new THREE.BoxGeometry(sx,sy,sz);boxUV(g,sx,sy,sz,tile);const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;o.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);if(cap)o.add(new THREE.Mesh(g,capM(cap)));par.add(o);return o;}
function silinder(r,y0,y1,mat,par,pos,seg=24,rb){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,rb||r,y1-y0,seg),mat);o.castShadow=o.receiveShadow=true;o.position.set(pos[0],(y0+y1)/2,pos[1]);par.add(o);return o;}
function bubut(prof,mat,par,pos,n=28){const o=new THREE.Mesh(new THREE.LatheGeometry(prof.map(([r,y])=>new THREE.Vector2(r,y)),n),mat);o.castShadow=true;if(pos)o.position.set(...pos);par.add(o);return o;}
function solid(polys,mat,par,cap,uvf){const cen=new THREE.Vector3();let n=0;polys.forEach(p=>p.forEach(v=>{cen.add(new THREE.Vector3(...v));n++;}));cen.divideScalar(n);const pos=[],uv=[];
  polys.forEach(p=>{const a=new THREE.Vector3(...p[0]),b=new THREE.Vector3(...p[1]),c=new THREE.Vector3(...p[2]),nr=b.clone().sub(a).cross(c.clone().sub(a)),fc=new THREE.Vector3();p.forEach(v=>fc.add(new THREE.Vector3(...v)));fc.divideScalar(p.length);
    const q=nr.dot(fc.sub(cen))<0?p.slice().reverse():p;for(let i=1;i<q.length-1;i++)[q[0],q[i],q[i+1]].forEach(v=>{pos.push(...v);uv.push(...uvf(v));});});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();
  const o=new THREE.Mesh(g,mat);o.castShadow=o.receiveShadow=true;if(cap)o.add(new THREE.Mesh(g,capM(cap)));par.add(o);return o;}
/* sprite glow */
const sprite=(tex)=>{const m=new THREE.SpriteMaterial({map:tex||tGlowM,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SD.add(s);return s;};
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
/* tabung bercahaya (strip) dengan drawRange */
function mkTube(pts,r,col,tex,segs=320){const path=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.3),geo=new THREE.TubeGeometry(path,segs,r,8,false),
  mt=new THREE.MeshBasicMaterial({color:C(col),map:tex.clone(),transparent:true,depthWrite:false,toneMapped:false,side:THREE.DoubleSide});mt.map.needsUpdate=true;
  const m=new THREE.Mesh(geo,mt);m.renderOrder=20;m.visible=false;m.frustumCulled=false;SD.add(m);const hd=sprite(tGlowM),L=path.getLength();
  return{path,L,pos:u=>path.getPoint(clamp(u)),atur(u0,u1,off,op,rep=.6){const a=Math.floor(clamp(u0)*segs),b=Math.floor(clamp(u1)*segs);if(b-a<1||op<.01){m.visible=false;spr(hd,[0,0,0],1,0);return;}
    m.visible=true;geo.setDrawRange(a*48,(b-a)*48);mt.map.repeat.set(L*rep,1);mt.map.offset.x=-off;mt.opacity=op;const p=path.getPoint(clamp(u1));spr(hd,[p.x,p.y,p.z],r*10,op*.9);}};}

