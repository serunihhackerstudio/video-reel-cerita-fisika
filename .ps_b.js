
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

/* ================= GEDUNG ================= */
const BLD=new THREE.Group();SD.add(BLD);
const FY=.75;
kb(-10.4,10.4,0,.6,-7.4,7.4,mStone,BLD,CAPF);
kb(-8.6,8.6,.6,FY,-5.6,5.6,mFloor,BLD,CAPF);
function wall(axis,c0,c1,a0,a1,y0,y1,holes,mats){const box=(p,q,r,s)=>{const o=axis==='z'?kb(p,q,r,s,c0,c1,mats,BLD,CAPW):kb(c0,c1,r,s,p,q,mats,BLD,CAPW);o.receiveShadow=false;return o;};let cur=a0;
  holes.forEach(([h0,h1,hy0,hy1])=>{if(h0>cur)box(cur,h0,y0,y1);box(h0,h1,y0,hy0);box(h0,h1,hy1,y1);cur=h1;});if(cur<a1)box(cur,a1,y0,y1);}
const WH=[[-4.4,-2.6,2.4,5.2],[-.9,.9,2.4,5.2],[2.6,4.4,2.4,5.2]];
wall('z',-7,-5.6,-10,10,0,7.2,[[4.2,6.6,FY,4.8]],WM.pz);
wall('x',-10,-8.6,-5.6,5.6,0,7.2,WH,WM.px);
wall('x',8.6,10,-5.6,5.6,0,7.2,WH,WM.nx);
wall('z',5.6,7,-10,10,0,7.2,[[-8.1,-6.3,2.4,5.2],[-5.3,-3.5,2.4,5.2],[-1.4,1.4,.6,4.8],[3.5,5.3,2.4,5.2],[6.3,8.1,2.4,5.2]],WM.nz);
/* jendela */
function jendela(axis,c,a0,a1,y0,y1,out){const t=.16,fr=mWhite,pt=(p,q,r,s,dep,m)=>axis==='z'?kb(p,q,r,s,c-dep,c+dep,m||fr,BLD):kb(c-dep,c+dep,r,s,p,q,m||fr,BLD);
  pt(a0,a1,y0,y1,.025,mGlassW());pt(a0,a1,y0,y0+t,.11);pt(a0,a1,y1-t,y1,.11);pt(a0,a0+t,y0,y1,.11);pt(a1-t,a1,y0,y1,.11);const am=(a0+a1)/2;pt(am-t/2,am+t/2,y0,y1,.08);const ym=y0+(y1-y0)*.6;pt(a0,a1,ym-t/2,ym+t/2,.08);
  const sl=(axis==='z')?kb(a0-.2,a1+.2,y0-.18,y0,c+(out>0?0:-.55)-(out>0?0:0)+(out>0?0:0),c+(out>0?.55:0),mStone,BLD,CAPW):kb(c+(out>0?0:-.55),c+(out>0?.55:0),y0-.18,y0,a0-.2,a1+.2,mStone,BLD,CAPW);}
WH.forEach(([a,b,y0,y1])=>{jendela('x',-9.3,a,b,y0,y1,-1);jendela('x',9.3,a,b,y0,y1,1);});
[[-8.1,-6.3],[-5.3,-3.5],[3.5,5.3],[6.3,8.1]].forEach(([a,b])=>jendela('z',6.3,a,b,2.4,5.2,1));
/* sudut batu + cornice */
[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>kb(sx>0?8.9:-10.15,sx>0?10.15:-8.9,.6,7.3,sz>0?5.75:-7.15,sz>0?7.15:-5.75,mStone,BLD,CAPW).receiveShadow=false);
kb(-10.5,10.5,7.2,7.6,-7.5,7.5,mStone,BLD,CAPW).receiveShadow=false;
/* lantai dalam: wainscot kayu */
kb(-8.6,-8.45,FY,2.2,-5.6,5.6,mWoodC,BLD);kb(-8.6,4.1,FY,2.2,-5.6,-5.45,mWoodC,BLD);kb(6.7,8.6,FY,2.2,-5.6,-5.45,mWoodC,BLD);
kb(-8.6,-8.4,2.2,2.32,-5.6,5.6,mBrassC,BLD);kb(-8.6,4.1,2.2,2.32,-5.6,-5.4,mBrassC,BLD);
/* atap pinggul */
{const A=[-10.9,7.6,-7.9],B=[10.9,7.6,-7.9],Cc=[10.9,7.6,7.9],D=[-10.9,7.6,7.9],R1=[-5.5,10.2,0],R2=[5.5,10.2,0];
 solid([[A,B,R2,R1],[D,Cc,R2,R1],[A,D,R1],[B,Cc,R2],[A,B,Cc,D]],mSlate,BLD,CAPR,v=>[v[0]/9,(v[1]*1.4+v[2]*.6)/9]);
 kb(-5.6,5.6,10.1,10.4,-.25,.25,mStone,BLD,CAPR);}
kb(-5.0,-3.8,8.4,11.4,-4.1,-2.9,mBrick,BLD,CAPW);kb(3.8,5.0,8.4,11.4,-4.1,-2.9,mBrick,BLD,CAPW);
/* kubah kecil */
kb(-1.2,1.2,10.2,11.9,-1.2,1.2,mWhite,BLD,CAPW);kb(-1.5,1.5,11.9,12.15,-1.5,1.5,mStone,BLD,CAPW);
{const dm=new THREE.Mesh(new THREE.SphereGeometry(1.15,28,16,0,Math.PI*2,0,Math.PI/2),M('#6fa38c',{metalness:.3,roughness:.45}));dm.position.set(0,12.15,0);dm.castShadow=true;BLD.add(dm);
 silinder(.05,13.2,14.9,mBrassC,BLD,[0,0],8);const wv=new THREE.Mesh(new THREE.SphereGeometry(.2,12,8),mBrassC);wv.position.set(0,15.0,0);BLD.add(wv);}
/* portico depan */
[-3.3,-1.1,1.1,3.3].forEach(x=>{silinder(.42,.6,6.8,mStone,BLD,[x,8.6],20);silinder(.55,.6,1.0,mStone,BLD,[x,8.6],20);silinder(.55,6.6,6.9,mStone,BLD,[x,8.6],20);});
kb(-4.6,4.6,6.8,7.6,7.0,9.5,mStone,BLD,CAPW);
{const F=[[-4.7,7.6,9.5],[4.7,7.6,9.5],[0,10.0,9.5]],Bk=F.map(v=>[v[0],v[1],7.0]);solid([F,Bk,[F[0],F[1],Bk[1],Bk[0]],[F[0],F[2],Bk[2],Bk[0]],[F[1],F[2],Bk[2],Bk[1]]],mStone,BLD,CAPW,v=>[v[0]/3,v[1]/3]);}
kb(-4.4,4.4,0,.2,7.0,10.8,mStone,BLD,CAPF);kb(-4.4,4.4,.2,.4,7.0,10.0,mStone,BLD,CAPF);kb(-4.4,4.4,.4,.6,7.0,9.2,mStone,BLD,CAPF);
kb(-1.3,-.05,.6,4.7,6.3,6.5,mWoodC,BLD);kb(.05,1.3,.6,4.7,6.3,6.5,mWoodC,BLD);kb(-1.55,1.55,4.7,5.0,6.1,6.6,mStone,BLD,CAPW);
[-.25,.25].forEach(x=>{const k=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),mBrassC);k.position.set(x,2.7,6.55);BLD.add(k);});
/* pintu belakang (tertutup) */
kb(4.2,5.4,FY,4.8,-5.55,-5.35,M('#ffffff',{map:tWoodD,roughness:.5}),BLD,CAPW);kb(5.4,6.6,FY,4.8,-5.55,-5.35,M('#ffffff',{map:tWoodD,roughness:.5}),BLD,CAPW);
kb(4.0,6.8,4.8,5.15,-5.65,-5.3,mStone,BLD,CAPW);kb(4.0,4.2,FY,4.8,-5.65,-5.3,mStone,BLD,CAPW);kb(6.6,6.8,FY,4.8,-5.65,-5.3,mStone,BLD,CAPW);
[5.2,5.6].forEach(x=>{const k=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8),mBrassC);k.position.set(x,2.9,-5.28);BLD.add(k);});
kb(5.35,5.45,FY,4.8,-5.36,-5.32,M('#1a0f08',{roughness:.8}),BLD);
/* bingkai bidang potong (bercahaya) */
const mFr=new THREE.MeshBasicMaterial({color:C('#e458ff'),transparent:true,opacity:0,toneMapped:false,depthTest:false,depthWrite:false});
const mkFrame=(w,hh)=>{const g=new THREE.Group(),t=.16;[[w,t,0,-hh/2],[w,t,0,hh/2],[t,hh,-w/2,0],[t,hh,w/2,0]].forEach(([a,b,x,y])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a,b,t),mFr);m.position.set(x,y,0);m.renderOrder=40;g.add(m);});g.visible=false;SD.add(g);return g;};
const FRZ=mkFrame(23,14),FRX=mkFrame(17,14);FRX.rotation.y=Math.PI/2;
const FRY=mkFrame(23,17);FRY.rotation.x=Math.PI/2;

/* ================= RUANG PESTA ================= */
const INT=new THREE.Group();SD.add(INT);
const mCloth=M('#ffffff',{map:tCloth,roughness:.9},false),mCarpet=M('#ffffff',{map:tCarpet,roughness:.95},false),mVelv=M('#a21fc0',{roughness:.85},false),mOak=M('#5a3a24',{roughness:.5},false);
/* karpet */
kb(-8.0,6.0,FY,FY+.04,-4.4,.5,mCarpet,INT);kb(-8.0,6.0,FY+.04,FY+.06,-4.4,-4.25,M('#d9a93e',{roughness:.6},false),INT);kb(-8.0,6.0,FY+.04,FY+.06,.35,.5,M('#d9a93e',{roughness:.6},false),INT);
/* meja */
const TY=3.2;
kb(-5.7,5.7,TY-.16,TY,-3.2,-.8,mOak,INT);[[-5.3,-3.0],[5.3,-3.0],[-5.3,-1.0],[5.3,-1.0]].forEach(([x,z])=>silinder(.16,FY,TY-.16,mOak,INT,[x,z],10));
kb(-5.85,5.85,2.45,TY+.02,-3.35,-.65,mCloth,INT);kb(-5.7,5.7,TY+.02,TY+.04,-2.4,-1.6,M('#9d28bd',{roughness:.8},false),INT);
/* kursi */
function kursi(x,z,dir,big){const s=big?1.15:.95,hb=big?3.2:1.4,col=big?mVelv:mOak,g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=dir;INT.add(g);
  kb(-s/2,s/2,1.85,2.05,-s/2,s/2,col,g);kb(-s/2+.05,s/2-.05,2.05,2.2,-s/2+.05,s/2-.05,big?mVelv:M('#7b2394',{roughness:.9},false),g);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>kb(a*(s/2-.1)-.06,a*(s/2-.1)+.06,FY,1.85,b*(s/2-.1)-.06,b*(s/2-.1)+.06,mOak,g));
  kb(-s/2,s/2,2.05,2.05+hb,-s/2-.02,-s/2+.1,big?mVelv:mOak,g);if(big){[-1,1].forEach(a=>{const f=new THREE.Mesh(new THREE.SphereGeometry(.14,12,8),mBrass);f.position.set(a*s/2,2.05+hb,-s/2+.04);g.add(f);});kb(-s/2-.02,s/2+.02,2.05+hb-.18,2.05+hb,-s/2-.03,-s/2+.12,mBrass,g);}return g;}
[-4.3,-2.6,-.9,.8,2.5,4.2].forEach(x=>{kursi(x,.05,Math.PI,0);kursi(x,-4.05,0,0);});
const KTS=kursi(-7.0,-2.0,Math.PI/2,1);
/* piring, gelas */
const mPlate=M('#ffffff',{roughness:.3},false),mGlass=M('#e2f2ff',{transparent:true,opacity:.34,roughness:.04,side:THREE.DoubleSide,depthWrite:false},false),mWine=M('#b020d0',{roughness:.3,emissive:C('#4a0a58')},false);
const profG=[[0,0],[.2,0],[.2,.03],[.04,.07],[.04,.42],[.18,.52],[.2,.78],[.15,.9]],profW=[[0,.46],[.17,.54],[.185,.76],[0,.76]];
const GL=[];
[-4.3,-2.6,-.9,.8,2.5,4.2].forEach((x,i)=>{[[x,-1.3],[x,-2.7]].forEach(([px,pz],j)=>{if(i===0)return;silinder(.46,TY+.04,TY+.1,mPlate,INT,[px,pz],24);bubut(profG,mGlass,INT,[px+.6,TY+.04,pz+(j?.3:-.3)]);if((i+j)%2===0)bubut(profW,mWine,INT,[px+.6,TY+.04,pz+(j?.3:-.3)]);});});
/* kue */
{const ck=new THREE.Group();ck.position.set(0,TY+.04,-2.0);INT.add(ck);silinder(.95,0,.12,mBrass,ck,[0,0],32);const c1=silinder(.82,.12,.7,mCloth,ck,[0,0],32);silinder(.58,.7,1.2,mCloth,ck,[0,0],32);
  [[.83,.4],[.59,.95]].forEach(([r,y])=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.07,8,40),mVelv);t.rotation.x=Math.PI/2;t.position.y=y;ck.add(t);});
  silinder(.4,1.2,1.5,M('#ffd0f6',{roughness:.5},false),ck,[0,0],28);const ch=new THREE.Mesh(new THREE.SphereGeometry(.14,12,8),M('#b0102a',{roughness:.3},false));ch.position.y=1.62;ck.add(ch);}
/* cupcake di nampan */
for(let i=0;i<6;i++){const a=i/6*6.283,px=3.0+Math.cos(a)*.55,pz=-2.0+Math.sin(a)*.55;silinder(.17,TY+.04,TY+.3,M('#d9b48a',{roughness:.8},false),INT,[px,pz],12);const t=new THREE.Mesh(new THREE.SphereGeometry(.2,12,8),i%2?mVelv:M('#fff0f8',{roughness:.6},false));t.position.set(px,TY+.36,pz);t.scale.y=.7;INT.add(t);}
silinder(.9,TY+.04,TY+.1,mBrass,INT,[3.0,-2.0],24);
/* botol */
const mBot=M('#1f5a3a',{transparent:true,opacity:.8,roughness:.1,side:THREE.DoubleSide,depthWrite:false},false);[[-2.4,-1.35],[-2.0,-1.35],[1.7,-2.9]].forEach(([x,z])=>bubut([[0,0],[.22,0],[.22,.9],[.1,1.15],[.1,1.5],[.08,1.55],[0,1.55]],mBot,INT,[x,TY+.04,z],16));
/* lilin */
const CND=[];[-3.4,-1.6,1.9,4.0].forEach(x=>{const g=new THREE.Group();g.position.set(x,TY+.04,-2.0);INT.add(g);silinder(.22,0,.12,mBrass,g,[0,0],16);silinder(.07,.12,.5,mBrass,g,[0,0],10);silinder(.2,.5,.58,mBrass,g,[0,0],16);
  const wax=silinder(.09,0,1,M('#fff6e0',{roughness:.5},false),g,[0,0],12);wax.position.y=.58+.5;const fl=sprite(tGlowW);CND.push({g,wax,fl,x});});
/* kartu undangan (amplop) */
const EX=-4.3,EZ_=-2.0,EY=TY+.04;
const ENV={x:EX,z:EZ_,y:EY};
kb(EX-.75,EX+.75,EY,EY+.05,EZ_-.45,EZ_+.45,M('#d5ad66',{roughness:.8},false),INT);
{const card=new THREE.Mesh(new THREE.PlaneGeometry(1.36,.84),new THREE.MeshStandardMaterial({map:tCard,roughness:.8}));card.rotation.x=-Math.PI/2;card.position.set(EX,EY+.075,EZ_);card.receiveShadow=true;INT.add(card);}
const mEnvTop=M('#e3bd7a',{roughness:.8,clippingPlanes:[PE]},false);
{const top=kb(EX-.75,EX+.75,EY+.08,EY+.14,EZ_-.45,EZ_+.45,mEnvTop,INT);const capE=new THREE.MeshBasicMaterial({color:C('#ff7ae8'),side:THREE.BackSide,clippingPlanes:[PE],toneMapped:false});top.add(new THREE.Mesh(top.geometry,capE));
 const seal=silinder(.17,EY+.14,EY+.2,M('#b0102a',{roughness:.4},false),INT,[EX-.4,EZ_],16);seal.material.clippingPlanes=[PE];}
/* jam saku kuningan (motif seri) */
const PW=new THREE.Group();PW.position.set(-5.2,TY+.04,-1.15);INT.add(PW);
silinder(.45,0,.14,mBrass,PW,[0,0],32);{const fc=new THREE.Mesh(new THREE.CircleGeometry(.38,32),new THREE.MeshStandardMaterial({map:tClock,roughness:.5}));fc.rotation.x=-Math.PI/2;fc.position.y=.145;PW.add(fc);}
{const bw=new THREE.Mesh(new THREE.TorusGeometry(.1,.035,8,16),mBrass);bw.position.set(0,.1,-.55);bw.rotation.x=Math.PI/2;PW.add(bw);const ch=new THREE.Mesh(new THREE.TorusGeometry(.38,.025,6,24,Math.PI*1.1),mBrass);ch.rotation.x=Math.PI/2;ch.position.set(0,.06,-.55);ch.rotation.z=2.2;PW.add(ch);}
const pwHand=new THREE.Group();pwHand.position.y=.16;PW.add(pwHand);kb(-.015,.015,0,.01,-.3,0,M('#1a1008',{},false),pwHand);const pwHand2=new THREE.Group();pwHand2.position.y=.165;PW.add(pwHand2);kb(-.02,.02,0,.01,-.2,0,M('#1a1008',{},false),pwHand2);
/* spanduk, jam dinding */
const BAN=new THREE.Mesh(new THREE.PlaneGeometry(8.2,1.5),new THREE.MeshStandardMaterial({map:tBanner,roughness:.9,side:THREE.DoubleSide}));BAN.position.set(-1.1,5.7,-5.5);BAN.receiveShadow=true;INT.add(BAN);
[[-5.2],[3.0]].forEach(([x])=>{const k=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),mBrass);k.position.set(x,6.5,-5.45);INT.add(k);});
{const wc=new THREE.Group();wc.position.set(-7.0,5.2,-5.5);INT.add(wc);const fc=new THREE.Mesh(new THREE.CircleGeometry(.9,40),new THREE.MeshStandardMaterial({map:tClock,roughness:.5}));wc.add(fc);const rg=new THREE.Mesh(new THREE.TorusGeometry(.92,.1,10,40),mBrass);wc.add(rg);
  window.WCLOCK=wc;const hm=new THREE.Group(),hh=new THREE.Group();hm.position.z=.05;hh.position.z=.07;wc.add(hm,hh);kb(-.03,.03,0,.74,-.01,.02,M('#1a1008',{},false),hm);kb(-.045,.045,0,.5,-.01,.02,M('#1a1008',{},false),hh);window.WCH=[hh,hm];const cp=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),mBrass);cp.position.z=.09;wc.add(cp);}
/* balon */
const BAL=[];const balCols=['#d93cf5','#f4ead6','#d9a93e','#4cc4c0','#7a3aa8','#f08fd0'];
function balon(ax,az,ay,bx,by,bz,ci){const col=balCols[ci%balCols.length],m=new THREE.Mesh(new THREE.SphereGeometry(.52,18,14),M(col,{roughness:.25,metalness:.05},false));m.scale.y=1.18;m.castShadow=true;INT.add(m);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.011,.011,1,5),M('#e8e0d0',{},false));INT.add(st);BAL.push({m,st,a:[ax,ay,az],b:[bx,by,bz],ph:BAL.length*1.3});}
[[-7.7,-4.6,FY,-7.4,5.8,-4.8,0],[-7.7,-4.6,FY,-6.7,5.2,-4.5,1],[-7.7,-4.6,FY,-7.9,4.7,-4.2,2],[3.5,-4.9,FY,3.5,5.4,-4.9,3],[3.5,-4.9,FY,3.9,4.9,-4.6,4],[5.4,-1.9,TY+.04,5.3,6.2,-1.9,0],[5.4,-1.9,TY+.04,4.6,5.8,-2.4,5],[5.4,-1.9,TY+.04,6.0,5.6,-1.5,2],[-2.0,-1.0,TY+.04,-2.3,6.0,-2.6,4]].forEach(a=>balon(...a));
/* lampu tali */
const BULB=[];for(let i=0;i<16;i++){const u=i/15,x=-8.3+u*7,y=6.3-Math.sin(u*Math.PI)*.45,z=-5.35;const b=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),new THREE.MeshBasicMaterial({color:C('#ffd890'),toneMapped:false}));b.position.set(x,y,z);INT.add(b);BULB.push(b);}
for(let i=0;i<14;i++){const u=i/13,z=-5.3+u*6.8,y=6.3-Math.sin(u*Math.PI)*.4;const b=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),new THREE.MeshBasicMaterial({color:C('#ffd890'),toneMapped:false}));b.position.set(-8.35,y,z);INT.add(b);BULB.push(b);}
/* gelas terangkat (tuan rumah) */
const GLS=new THREE.Group();GLS.position.set(-5.9,4.7,-2.0);INT.add(GLS);bubut(profG,mGlass,GLS,[0,0,0]);bubut(profW,mWine,GLS,[0,0,0]);GLS.scale.setScalar(2.3);GLS.rotation.z=-.2;
const glsGlow=sprite(tGlowM);
/* '?' besar */
const TANYA=sprite(tTanya);

/* ================= HALAMAN ================= */
const LAW=new THREE.Group();SD.add(LAW);
const mGrassTop=M('#ffffff',{map:tGrass,roughness:.95},false),mDirt=M('#ffffff',{map:tDirt,roughness:1},false);
kb(-34,34,-3,0,-26,40,[mDirt,mDirt,mGrassTop,mDirt,mDirt,mDirt],LAW,null,6);
kb(-2.0,2.0,0,.04,10.8,40,M('#ffffff',{map:tGravel,roughness:1},false),LAW,null,3);kb(-9,9,0,.04,10.8,13.6,M('#ffffff',{map:tGravel,roughness:1},false),LAW,null,3);
function pohon(x,z,s,col){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(s);LAW.add(g);silinder(.38,0,3,M('#5a3d28',{roughness:1},false),g,[0,0],8,.55);
  [[0,4.6,0,3.1],[1.4,3.9,.6,2.4],[-1.2,4.0,-.8,2.5],[.2,6.0,.4,2.2]].forEach(([a,b,c,r],i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),M(col[i%col.length],{roughness:.95,flatShading:true},false));m.position.set(a,b,c);m.castShadow=m.receiveShadow=true;g.add(m);});}
const grn=['#4f7d3a','#5e8c44','#486f35'];
[[-24,-12,1.2],[-27,4,1.4],[-22,22,1.1],[-14,-21,1.3],[-6,-22,1.0],[16,-21,1.3],[24,-9,1.2],[27,8,1.4],[22,26,1.1],[-17,30,1.2],[-12,12,.8],[14,15,.8]].forEach(([x,z,s])=>pohon(x,z,s,grn));
[[-14,13.5],[14,13.5]].forEach(([x,z])=>{kb(x-5,x+5,0,1.2,z-.8,z+.8,M('#3f6a30',{roughness:1},false),LAW);});
[[-3.2,16],[3.2,16],[-3.2,28],[3.2,28]].forEach(([x,z])=>{silinder(.12,0,4.6,M('#262026',{roughness:.5},false),LAW,[x,z],8);const b=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshBasicMaterial({color:C('#ffd890'),toneMapped:false}));b.position.set(x,4.9,z);LAW.add(b);BULB.push(b);});
/* bangku */
[[-8,18],[8,18]].forEach(([x,z])=>{kb(x-1.2,x+1.2,.7,.85,z-.4,z+.4,mOak,LAW);kb(x-1.2,x+1.2,.85,1.6,z-.45,z-.35,mOak,LAW);[-1,1].forEach(a=>kb(x+a*1.05-.06,x+a*1.05+.06,0,.7,z-.3,z+.3,mOak,LAW));});

/* ================= STRIP & CINCIN TAHUN ================= */
const S1=mkTube([[EX+.4,3.5,-2.0],[-1,4.1,-2.0],[3,4.5,-2.0],[7.5,4.9,-1.6],[11.5,5.6,-1.1],[14,13,-1],[14,40,-1],[14,80,-1],[14,118,-1]],.16,PAL.aks,tAlir,360);
const S2=mkTube([[14,118,-1],[16,80,0],[15,44,0],[13,15,-1],[11,7,-3],[7.6,4.6,-5.0],[5.4,3.5,-5.2]],.13,'#f6b6ff',tTitik,300);
const RINGS=[];[[13,'2009'],[28,'2020'],[46,'2040'],[68,'2070'],[94,'2100']].forEach(([y,l],i)=>{const rg=new THREE.Mesh(new THREE.TorusGeometry(2.3,.14,10,64),new THREE.MeshBasicMaterial({color:C(PAL.tb),transparent:true,opacity:0,toneMapped:false,depthWrite:false}));rg.rotation.x=Math.PI/2;rg.position.set(14,y,-1);rg.renderOrder=18;SD.add(rg);RINGS.push({rg,y,l});});
const PORTAL=new THREE.Group();PORTAL.position.set(14,118,-1);SD.add(PORTAL);
[[4.6,.22],[3.5,.14],[2.4,.1]].forEach(([r,t],i)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,10,72),new THREE.MeshBasicMaterial({color:C(i?PAL.tb:PAL.aks),transparent:true,opacity:0,toneMapped:false,depthWrite:false}));m.rotation.x=Math.PI/2;m.renderOrder=19;PORTAL.add(m);});
const portGlow=sprite(tGlowM);
/* berkas bintang malam hari */
const SB=mkTube([[-6,38,-8],[-4.5,26,-6],[-2.5,14,-4],[-.8,6.5,-2.6],[0,3.8,-2.0]],.2,'#ffffff',tAlir,200);
const starGlow=sprite(tGlowM);
