/* ============ ASET ADEGAN 2-7 ============ */
const SPRW = (() => { const c=kanvas(256,256), x=c.getContext('2d'); const g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.1,'rgba(255,255,255,.85)'); g.addColorStop(.3,'rgba(255,255,255,.25)'); g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g; x.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); })();
const mkSpr = (col, mult) => { const m=new THREE.SpriteMaterial({map:SPRW,color:C(col).multiplyScalar(mult||1),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true});
  const s=new THREE.Sprite(m); s.visible=false; S.add(s); return s; };
const bandTex = (col, seed) => { const c=kanvas(512,256), x=c.getContext('2d'); const r=rng(seed||3); const base=new THREE.Color(col);
  for(let y=0;y<256;y++){ const k=.78+.28*Math.sin(y*.19+Math.sin(y*.05)*3)+(r()-.5)*.08; x.fillStyle=`rgb(${Math.min(255,base.r*255*k)|0},${Math.min(255,base.g*255*k)|0},${Math.min(255,base.b*255*k)|0})`; x.fillRect(0,y,512,1); }
  const t=new THREE.CanvasTexture(c); return t; };

/* --- Tata Surya (adegan 2) --- */
const SUNP = V3(PUSAT_B.x, PUSAT_B.y, PUSAT_B.z - 1500);
const GSOL = new THREE.Group(); GSOL.visible=false; S.add(GSOL);
const sunM = new THREE.Mesh(new THREE.SphereGeometry(260,48,32), new THREE.MeshBasicMaterial({color:new THREE.Color(4.5,3.2,1.6)})); sunM.position.copy(SUNP); GSOL.add(sunM);
const sunL = new THREE.PointLight(0xfff0d8, 3.4, 0, 0); sunL.position.copy(SUNP); GSOL.add(sunL);
const orbitLine = (a) => { const P=[]; for(let i=0;i<=256;i++){ const t=i/256*Math.PI*2; P.push(SUNP.x+Math.cos(t)*a, SUNP.y, SUNP.z+Math.sin(t)*a); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:C('#7b86d6').multiplyScalar(1.2),transparent:true,opacity:.55})); GSOL.add(l); };
orbitLine(1500);
[['merkurius',560,18,'#9a8f86',200,0],['venus',1020,40,'#d9b27a',330,0],['mars',2050,26,'#b5573a',40,0],['jupiter',3100,110,'#d8b08c',150,1],['saturnus',4100,95,'#e3cf9a',250,2],['uranus',5000,65,'#8fd6dc',20,0],['neptunus',5850,62,'#3f66d8',300,0]]
.forEach(([n,a,r,col,th,ty],i)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(r,48,32), new THREE.MeshStandardMaterial({color:ty?0xffffff:C(col), map:ty?bandTex(col,i+2):null, roughness:.85, metalness:0}));
  const ang=th*DEG; m.position.set(SUNP.x+Math.cos(ang)*a, SUNP.y, SUNP.z+Math.sin(ang)*a); GSOL.add(m); orbitLine(a);
  if(ty===2){ const rg=new THREE.Mesh(new THREE.RingGeometry(r*1.35,r*2.3,96), new THREE.MeshBasicMaterial({color:C('#d8c18a'),side:THREE.DoubleSide,transparent:true,opacity:.7})); rg.rotation.x=-Math.PI/2+.4; rg.position.copy(m.position); GSOL.add(rg); } });
/* --- skala antarbintang (adegan 2) --- */
const PROXP = SUNP.clone().add(V3(300000,0,-30000)), KEARAH = PROXP.clone().sub(SUNP), LY = KEARAH.length()/4.24;
const spSun = mkSpr('#fff1d6',2.2), spProx = mkSpr('#ff9c6b',2.0), spPulse = mkSpr('#9fd0ff',3.0);
const rulerG = (() => { const P=[SUNP.x,SUNP.y,SUNP.z,PROXP.x,PROXP.y,PROXP.z]; const d=KEARAH.clone().normalize();
  for(let i=1;i<=4;i++){ const p=SUNP.clone().addScaledVector(d,i*LY); P.push(p.x,p.y-9000,p.z,p.x,p.y+9000,p.z); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  const l=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:C('#9bb0ff').multiplyScalar(2.2),transparent:true,opacity:.9})); l.visible=false; l.frustumCulled=false; S.add(l); return l; })();
/* --- galaksi Bima Sakti (adegan 2 akhir) --- */
const GGAL = new THREE.Group(); GGAL.visible=false; S.add(GGAL);
(function(){ const N=60000,P=new Float32Array(N*3),Co=new Float32Array(N*3),Sz=new Float32Array(N); const r=rng(21);
  for(let i=0;i<N;i++){ let x,y,z,col; const k=r();
    if(k<.2){ const u=Math.pow(r(),1.8)*5200,a=r()*6.283,b=(r()-.5)*2; x=Math.cos(a)*u; z=Math.sin(a)*u; y=b*u*.34; col=[1,.78,.5]; }
    else { const arm=(r()<.5?0:Math.PI), rad=Math.pow(r(),.62)*30000+1200; const f=rad/30000;
      const th=arm+Math.log(rad/1200)*2.6+(r()-.5)*(.45+.5*f); x=Math.cos(th)*rad+(r()-.5)*rad*.07; z=Math.sin(th)*rad+(r()-.5)*rad*.07; y=(r()-.5)*(700+rad*.018);
      col=[1-f*.5,.84-f*.18,.68+f*.32]; }
    const br=.28+r()*.8; P[i*3]=x;P[i*3+1]=y;P[i*3+2]=z; Co[i*3]=col[0]*br;Co[i*3+1]=col[1]*br;Co[i*3+2]=col[2]*br; Sz[i]=1.3+Math.pow(r(),6)*3.2; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3)); g.setAttribute('sz',new THREE.BufferAttribute(Sz,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'attribute vec3 color;attribute float sz;varying vec3 vC;void main(){vC=color;gl_PointSize=sz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'varying vec3 vC;void main(){vec2 d=gl_PointCoord-.5;float a=smoothstep(.5,.0,length(d));gl_FragColor=vec4(vC*a*1.5,1.);}'});
  const pts=new THREE.Points(g,m); pts.frustumCulled=false; GGAL.add(pts); })();
const galCore = mkSpr('#ffd9a0',1.4); GGAL.add(galCore); S.remove(galCore); galCore.position.set(0,0,0); galCore.scale.setScalar(16000);
const galHalo = mkSpr('#7f8cff',.2); GGAL.add(galHalo); S.remove(galHalo); galHalo.scale.setScalar(90000);
const MARK_ANG = 1.1, MARK_R = 15600, MARK = V3(Math.cos(MARK_ANG)*MARK_R, 0, Math.sin(MARK_ANG)*MARK_R);
GGAL.rotation.x = .95; GGAL.rotation.z = .15;

/* --- pesawat utama: cakram dengan cincin energi --- */
const SHIP = new THREE.Group(); SHIP.visible=false; S.add(SHIP);
const texPanel = (() => { const c=kanvas(1024,256), x=c.getContext('2d'); const r=rng(14); const g=x.createLinearGradient(0,0,0,256); g.addColorStop(0,'#dfe4f0'); g.addColorStop(.5,'#b9c0d2'); g.addColorStop(1,'#8e96ab');
  x.fillStyle=g; x.fillRect(0,0,1024,256);
  for(let i=0;i<32;i++){ x.fillStyle='rgba(30,36,60,.35)'; x.fillRect(i*32,0,2,256); }
  for(let j=0;j<7;j++){ x.fillStyle='rgba(30,36,60,.3)'; x.fillRect(0,20+j*34,1024,2); }
  for(let i=0;i<260;i++){ x.fillStyle=`rgba(${r()<.5?'255,255,255':'40,46,70'},${.04+r()*.08})`; x.fillRect(r()*1024,r()*256,10+r()*50,6+r()*26); }
  for(let i=0;i<48;i++){ x.fillStyle='rgba(150,190,255,.9)'; x.fillRect(i*21.3+4,128,6,4); }
  const t=new THREE.CanvasTexture(c); t.wrapS=THREE.RepeatWrapping; return t; })();
const hullG = new THREE.LatheGeometry([[0,.36],[.45,.35],[.9,.3],[1.4,.2],[1.72,.08],[1.8,0],[1.72,-.07],[1.3,-.17],[.7,-.24],[0,-.27]].map(p=>new THREE.Vector2(p[0],p[1])),96);
SHIP.add(new THREE.Mesh(hullG, new THREE.MeshStandardMaterial({map:texPanel,bumpMap:texPanel,bumpScale:.6,metalness:.7,roughness:.34})));
const domeG = new THREE.SphereGeometry(.58,48,24,0,Math.PI*2,0,Math.PI/2); const dome = new THREE.Mesh(domeG, new THREE.MeshStandardMaterial({color:0x101a3a,metalness:.3,roughness:.08,emissive:0x3a5cff,emissiveIntensity:.55,transparent:true,opacity:.9}));
dome.scale.y=.55; dome.position.y=.33; SHIP.add(dome);
const ringMat = new THREE.MeshBasicMaterial({color:C('#9a86ff').multiplyScalar(2.6)}); const ringMat2 = new THREE.MeshBasicMaterial({color:C('#7fa8ff').multiplyScalar(2.2),transparent:true,opacity:.8});
const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.98,.07,16,160), ringMat); ring1.rotation.x=Math.PI/2; SHIP.add(ring1);
const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3,.022,12,160), ringMat2); ring2.rotation.x=Math.PI/2; SHIP.add(ring2);
const nodes = []; for(let i=0;i<10;i++){ const n=new THREE.Mesh(new THREE.SphereGeometry(.1,12,8), new THREE.MeshBasicMaterial({color:C('#e4dcff').multiplyScalar(4)})); SHIP.add(n); nodes.push(n); }
const shipLamp = new THREE.PointLight(C('#8b78ff'), 2.2, 9, 1.6); shipLamp.position.set(0,.2,0); SHIP.add(shipLamp);
const engGlow = new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C('#7fa8ff').multiplyScalar(2.2),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true})); engGlow.scale.set(2.6,2.6,1); engGlow.position.y=-.45; SHIP.add(engGlow);
SHIP.scale.setScalar(.9);
function kapalUpd(t, glow){ const g=(glow===undefined?1:glow); ringMat.color.copy(C('#9a86ff')).multiplyScalar((2.2+.7*Math.sin(t*3))*g); ringMat2.color.copy(C('#7fa8ff')).multiplyScalar(2.2*g);
  nodes.forEach((n,i)=>{ const a=t*1.4+i/nodes.length*6.283; n.position.set(Math.cos(a)*1.98,0,Math.sin(a)*1.98); n.visible=g>.05; }); shipLamp.intensity=2.2*g; engGlow.material.opacity=Math.min(1,g); }

/* --- gelembung warp --- */
const BUB = new THREE.Mesh(new THREE.SphereGeometry(4.7,72,48), new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
  uniforms:{uT:{value:0},uK:{value:0},uF:{value:0}},
  vertexShader:'varying vec3 vN;varying vec3 vW;varying vec3 vP;void main(){vN=normalize(mat3(modelMatrix)*normal);vP=position;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
  fragmentShader:`uniform float uT,uK,uF;varying vec3 vN;varying vec3 vW;varying vec3 vP;${GLSL_NOISE}
   void main(){vec3 V=normalize(cameraPosition-vW);float f=pow(1.-abs(dot(normalize(vN),V)),2.4);
    float r=fbm(vP*.9+vec3(uT*.7,uT*.5,0.))*.7+.3;float bands=.5+.5*sin(vP.x*2.6-uT*3.2+fbm(vP*.8)*5.);
    float fl=1.-uF*step(.5,fract(sin(floor(uT*14.)*91.7)*43758.5));
    vec3 c=mix(vec3(.25,.4,1.),vec3(.75,.4,1.),bands)*(f*1.9*r+.035)*uK*fl;gl_FragColor=vec4(c,1.);}`}));
BUB.visible=false; S.add(BUB);

/* --- kisi ruang-waktu --- */
const GN=141, GM=141, GS=1.35;
const gridPos=new Float32Array(GN*GM*3), gridCol=new Float32Array(GN*GM*3), gidx=[];
for(let i=0;i<GN;i++)for(let j=0;j<GM;j++){ const a=i*GM+j; if(i<GN-1) gidx.push(a,a+GM); if(j<GM-1) gidx.push(a,a+1); }
const gridG=new THREE.BufferGeometry(); gridG.setAttribute('position',new THREE.BufferAttribute(gridPos,3)); gridG.setAttribute('color',new THREE.BufferAttribute(gridCol,3)); gridG.setIndex(gidx);
const GRID=new THREE.LineSegments(gridG,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); GRID.frustumCulled=false; GRID.visible=false; S.add(GRID);
function gridUpd(P){ const hx=(GN-1)/2, hz=(GM-1)/2; let n=0; const gs=GS*P.a;
  for(let i=0;i<GN;i++)for(let j=0;j<GM;j++){
    const x=(i-hx)*gs+P.cx, z=(j-hz)*gs+P.cz; let y=0, cr=.2, cg=.3, cb=.85;
    if(P.D){ const dx=x-P.wx, dz=z-P.wz, w=P.ww; const q=P.D/Math.sqrt(1+(dx*dx+dz*dz)/(w*w)); y-=q; const m=Math.min(1,q/10); cr+=.6*m; cg+=.15*m; cb-=.3*m; }
    if(P.A){ const dx=x-P.xs, dz=z-P.zs, rs=Math.sqrt(dx*dx+dz*dz)+1e-4, e=(rs-P.R)/P.w, gg=Math.exp(-e*e); const h=-P.A*(dx/rs)*gg; y+=h;
      if(h<0){ const m=Math.min(1,-h/3); cr-=.1*m; cg+=.35*m; cb+=.25*m; } else { const m=Math.min(1,h/3); cr+=.7*m; cg-=.1*m; cb+=.2*m; } }
    const dd=Math.hypot(x-P.fx, z-P.fz), fd=Math.max(0,1-(dd/P.fr)*(dd/P.fr)), br=P.op*fd*1.5;
    gridPos[n]=x; gridPos[n+1]=y; gridPos[n+2]=z; gridCol[n]=Math.max(0,cr)*br; gridCol[n+1]=Math.max(0,cg)*br; gridCol[n+2]=Math.max(0,cb)*br; n+=3; }
  gridG.attributes.position.needsUpdate=true; gridG.attributes.color.needsUpdate=true; }

/* galaksi-galaksi di kisi (adegan 4) */
const galTex = (() => { const c=kanvas(128,128), x=c.getContext('2d'); const g=x.createRadialGradient(64,64,0,64,64,60); g.addColorStop(0,'rgba(255,240,210,1)'); g.addColorStop(.18,'rgba(255,225,190,.8)'); g.addColorStop(1,'rgba(150,170,255,0)'); x.fillStyle=g; x.fillRect(0,0,128,128);
  x.globalCompositeOperation='lighter'; x.translate(64,64); x.rotate(.5); x.scale(1,.42); for(let a=0;a<2;a++){ x.rotate(Math.PI); x.beginPath(); for(let t=0;t<5.5;t+=.1){ const rr=3+t*9; x.lineTo(Math.cos(t)*rr,Math.sin(t)*rr); } x.strokeStyle='rgba(200,215,255,.55)'; x.lineWidth=7; x.stroke(); }
  return new THREE.CanvasTexture(c); })();
const GX = []; { const r=rng(31); for(let i=0;i<24;i++){ const a=r()*6.283, rad=(i<2?[52,64][i]:8+Math.sqrt(r())*62); const s=new THREE.Sprite(new THREE.SpriteMaterial({map:galTex,color:C('#ffffff').multiplyScalar(1.3),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));
  s.visible=false; S.add(s); GX.push({s,x:Math.cos(a)*rad,z:Math.sin(a)*rad,sc:2.2+r()*1.6}); } }
GX[0].x=-34; GX[0].z=32; GX[1].x=44; GX[1].z=-38;
const ORB = new THREE.Mesh(new THREE.SphereGeometry(2.4,48,32), new THREE.MeshStandardMaterial({color:0xffc77a,emissive:0xff9a30,emissiveIntensity:.9,roughness:.5})); ORB.visible=false; S.add(ORB);
const FOTON = new THREE.Mesh(new THREE.SphereGeometry(.3,16,12), new THREE.MeshBasicMaterial({color:new THREE.Color(5,5,5)})); FOTON.visible=false; S.add(FOTON);
const FOTONGLOW = mkSpr('#cfe6ff',3); FOTONGLOW.scale.setScalar(3.6);

/* --- adegan 3: orb cahaya, debu --- */
const streakTex = (() => { const c=kanvas(256,16), x=c.getContext('2d'); const g=x.createLinearGradient(0,0,256,0); g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(1,'rgba(255,255,255,1)'); x.fillStyle=g; x.fillRect(0,0,256,16); return new THREE.CanvasTexture(c); })();
const ORBL = new THREE.Mesh(new THREE.SphereGeometry(.55,24,16), new THREE.MeshBasicMaterial({color:new THREE.Color(6,6,6)})); ORBL.visible=false; S.add(ORBL);
const ORBG = mkSpr('#cfe6ff',3.2); ORBG.scale.setScalar(9);
const ORBT = new THREE.Mesh(new THREE.PlaneGeometry(90,.9), new THREE.MeshBasicMaterial({map:streakTex,color:C('#d6e8ff').multiplyScalar(3),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})); ORBT.visible=false; S.add(ORBT);
const DUST = (() => { const N=1400,P=new Float32Array(N*3); const r=rng(41); for(let i=0;i<N;i++){ P[i*3]=r()*800; P[i*3+1]=(r()-.5)*90; P[i*3+2]=(r()-.5)*120; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uCx:{value:0},uK:{value:1}},
    vertexShader:'uniform float uCx;varying float vA;void main(){vec3 p=position;p.x=uCx+mod(p.x-uCx+400.,800.)-400.;vA=1.-abs(p.x-uCx)/400.;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(120./-mv.z,1.5,4.);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform float uK;varying float vA;void main(){vec2 d=gl_PointCoord-.5;gl_FragColor=vec4(vec3(.55,.65,1.)*smoothstep(.5,0.,length(d))*vA*uK,1.);}'});
  const p=new THREE.Points(g,m); p.frustumCulled=false; p.visible=false; S.add(p); return p; })();

/* --- adegan 5: garis bintang saat warp --- */
const STR = (() => { const N=700,P=new Float32Array(N*6),Co=new Float32Array(N*6),R=[]; const r=rng(51);
  for(let i=0;i<N;i++){ const a=r()*6.283, rd=14+Math.pow(r(),.6)*110; R.push([r()*600,Math.cos(a)*rd*.5,Math.sin(a)*rd,.3+r()*.7]); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3));
  const l=new THREE.LineSegments(g,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); l.frustumCulled=false; l.visible=false; l.userData.R=R; S.add(l); return l; })();
function streakUpd(t, sx, sy, sz, spd, k){ const R=STR.userData.R, P=STR.geometry.attributes.position.array, Co=STR.geometry.attributes.color.array; const len=2+spd*.55*k;
  for(let i=0;i<R.length;i++){ const [u,y,z,b]=R[i]; const x=sx+((u-t*spd*.9)%600+600)%600-300; const o=i*6;
    P[o]=x;P[o+1]=sy+y;P[o+2]=sz+z;P[o+3]=x-len*(.4+b);P[o+4]=sy+y;P[o+5]=sz+z;
    const f=k*b*(1-Math.abs(x-sx)/300); Co[o]=.6*f;Co[o+1]=.75*f;Co[o+2]=1.2*f;Co[o+3]=0;Co[o+4]=0;Co[o+5]=0; }
  STR.geometry.attributes.position.needsUpdate=true; STR.geometry.attributes.color.needsUpdate=true; }

/* --- adegan 6: Jupiter, materi eksotis, ledakan radiasi --- */
const JUP = new THREE.Mesh(new THREE.SphereGeometry(90,64,48), new THREE.MeshStandardMaterial({map:bandTex('#c99a6a',9),roughness:.9,metalness:0})); JUP.position.set(-260,25,-470); JUP.visible=false; S.add(JUP);
const EXO = (() => { const N=900,P=new Float32Array(N*3),Co=new Float32Array(N*3),meta=[]; const r=rng(61);
  for(let i=0;i<N;i++){ meta.push([r()*6.283,(r()-.5)*2.2,6.6+r()*1.8,r()*6.283,.4+r()*1.2]); Co[i*3]=.55;Co[i*3+1]=.18;Co[i*3+2]=.75; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:.5,map:SPRW,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.9})); p.frustumCulled=false; p.visible=false; p.userData.m=meta; S.add(p); return p; })();
const BURSTS = (() => { const N=1600,P=new Float32Array(N*3),Co=new Float32Array(N*3),V=[]; const r=rng(71);
  for(let i=0;i<N;i++){ const th=(r()-.5)*1.7, ph=r()*6.283, sp=18+r()*70; V.push([Math.cos(th)*sp, Math.sin(th)*Math.cos(ph)*sp*.9, Math.sin(th)*Math.sin(ph)*sp*.9, r()]); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:1.1,map:SPRW,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); p.frustumCulled=false; p.visible=false; p.userData.V=V; S.add(p); return p; })();
const SHOCK = new THREE.Mesh(new THREE.RingGeometry(.92,1,128), new THREE.MeshBasicMaterial({color:C('#ff9a6a').multiplyScalar(3),transparent:true,opacity:0,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false})); SHOCK.visible=false; S.add(SHOCK);

/* --- adegan 7: bintang Proxima hangat + planet --- */
const STAR7 = new THREE.Mesh(new THREE.SphereGeometry(22,48,32), new THREE.MeshBasicMaterial({color:new THREE.Color(3.2,1.7,.85)})); STAR7.position.set(300,26,-440); STAR7.visible=false; S.add(STAR7);
const STAR7G = mkSpr('#ff9c5a',1.1); STAR7G.position.copy(STAR7.position); STAR7G.scale.setScalar(900);
const PLAN7 = new THREE.Mesh(new THREE.SphereGeometry(30,48,32), new THREE.MeshStandardMaterial({color:C('#3d302b'),roughness:.95,metalness:0})); PLAN7.position.set(140,10,-300); PLAN7.visible=false; S.add(PLAN7);
const PLAN7A = new THREE.Mesh(new THREE.SphereGeometry(31.4,48,32), new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.BackSide,uniforms:{uP:{value:PLAN7.position.clone()}},
  vertexShader:'varying vec3 vNW;varying vec3 vW;void main(){vNW=normalize(mat3(modelMatrix)*normal);vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
  fragmentShader:'varying vec3 vNW;varying vec3 vW;void main(){vec3 V=normalize(cameraPosition-vW);float f=clamp(-dot(normalize(vNW),V)/.3,0.,1.);gl_FragColor=vec4(vec3(1.,.55,.3)*pow(f,2.)*1.4,1.);}'})); PLAN7A.position.copy(PLAN7.position); PLAN7A.visible=false; S.add(PLAN7A);
const key7 = new THREE.DirectionalLight(C('#ffb078'), 0); S.add(key7);
