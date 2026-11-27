/* ============ [0] WAKTU dari suara ============ */
const TTS=__TTS__;
const START=[.7,10.5,42.5,70.5,100.5,130.5,160.5];
const KATA=[],KS=[];
TTS.forEach((o,k)=>{const tk=o.teks.split(' ');KS[k]=[];o.kata.forEach((q,i)=>{const e={w:tk[i],t0:+(START[k]+q[1]).toFixed(3),t1:+(START[k]+q[2]).toFixed(3)};KATA.push(e);KS[k].push(e);});o.start=START[k];});
const kw=(k,w,n)=>{const m=KS[k].filter(e=>e.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(w));return m[n||0].t0;};
const DUR=180;
const C = h => new THREE.Color(h).convertSRGBToLinear(), V3 = (x,y,z) => new THREE.Vector3(x,y,z), DEG = Math.PI/180;
const PAL = {teks:'#F3EEE8', aksen:'#FFB878', atom:'#6f8cff', ungu:'#6b5bd6', tnt:'#E39A4B'};
const FONT = {judul:'Cormorant Garamond', sub:'Sora'};

/*POST*/

const S = new THREE.Scene(); S.fog = new THREE.FogExp2(0x090a1a, .021);
const cam = new THREE.PerspectiveCamera(32, W/H, .05, 3000); S.add(cam);
const GLSL_NOISE = `float h13(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),f.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),f.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n3(p);p=p*2.07+vec3(1.7,9.2,3.1);a*=.5;}return s;}`;
/* langit gelap violet-biru */
const kubah = new THREE.Mesh(new THREE.SphereGeometry(1500,32,16), new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,
  vertexShader:'varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`varying vec3 vD;${GLSL_NOISE} void main(){vec3 d=normalize(vD);float h=d.y*.5+.5;
   vec3 c=mix(vec3(.022,.02,.055),vec3(.006,.007,.02),smoothstep(.35,.9,h));c+=vec3(.05,.03,.08)*fbm(d*3.+2.)*smoothstep(.2,.7,h)*1.3;
   c+=vec3(.12,.06,.04)*exp(-pow((d.y+.02)*9.,2.))*.7;gl_FragColor=vec4(c,1.);}`})); kubah.frustumCulled=false; S.add(kubah);
let STARS; (function(){ const N=5000,P=new Float32Array(N*3),Co=new Float32Array(N*3),Sz=new Float32Array(N); const r=rng(11);
  for(let i=0;i<N;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u); P[i*3]=q*Math.cos(a)*1300;P[i*3+1]=Math.abs(u)*1300;P[i*3+2]=q*Math.sin(a)*1300; const T=r(); const col=T<.2?[.7,.8,1]:T<.75?[1,.96,.9]:[1,.8,.6]; const br=Math.pow(r(),5)*1.4+.3; Co[i*3]=col[0]*br;Co[i*3+1]=col[1]*br;Co[i*3+2]=col[2]*br; Sz[i]=1.5+Math.pow(r(),9)*3; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3)); g.setAttribute('sz',new THREE.BufferAttribute(Sz,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexShader:'attribute vec3 color;attribute float sz;varying vec3 vC;void main(){vC=color;gl_PointSize=sz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vC;void main(){vec2 d=gl_PointCoord-.5;float a=smoothstep(.5,.0,length(d));gl_FragColor=vec4(vC*a*2.4,1.);}'});
  STARS=new THREE.Points(g,m); STARS.frustumCulled=false; S.add(STARS); })();
/* lantai gelap berkabut */
const texLantai = (() => { const c=kanvas(1024,1024), x=c.getContext('2d'); const r=rng(3); x.fillStyle='#17182a'; x.fillRect(0,0,1024,1024);
  for(let i=0;i<5000;i++){ x.fillStyle=`rgba(${r()<.5?'90,95,150':'10,10,24'},${.03+r()*.07})`; x.fillRect(r()*1024,r()*1024,2+r()*10,2+r()*10); }
  x.strokeStyle='rgba(120,130,220,.10)'; x.lineWidth=2; for(let i=0;i<=16;i++){ x.beginPath(); x.moveTo(i*64,0); x.lineTo(i*64,1024); x.moveTo(0,i*64); x.lineTo(1024,i*64); x.stroke(); }
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(60,60); t.anisotropy=8; return t; })();
const lantai = new THREE.Mesh(new THREE.PlaneGeometry(1600,1600), new THREE.MeshStandardMaterial({map:texLantai,bumpMap:texLantai,bumpScale:.4,roughness:.7,metalness:.25,color:0x2a2d4a}));
lantai.rotation.x=-Math.PI/2; lantai.position.y=-.5; S.add(lantai);

/* bola: logam gelap dengan inti biru samar (generik, bukan rancangan senjata) */
const texBola = (() => { const c=kanvas(1024,512), x=c.getContext('2d'); const r=rng(9); const g=x.createLinearGradient(0,0,0,512); g.addColorStop(0,'#b8bfd2'); g.addColorStop(.5,'#8d95ab'); g.addColorStop(1,'#656c82'); x.fillStyle=g; x.fillRect(0,0,1024,512);
  for(let i=0;i<1200;i++){ x.fillStyle=`rgba(${r()<.5?'255,255,255':'20,24,40'},${.03+r()*.07})`; x.fillRect(r()*1024,r()*512,2+r()*14,1+r()*5); }
  const t=new THREE.CanvasTexture(c); t.wrapS=THREE.RepeatWrapping; return t; })();
const BOLA = new THREE.Mesh(new THREE.SphereGeometry(.5,128,64), new THREE.MeshStandardMaterial({map:texBola,bumpMap:texBola,bumpScale:.25,metalness:.85,roughness:.46,emissive:C('#3b55c0'),emissiveIntensity:.07}));
BOLA.position.set(0,.5,0); S.add(BOLA);
const bolaGlow = new THREE.Sprite(new THREE.SpriteMaterial({map:(()=>{const c=kanvas(256,256),x=c.getContext('2d');const g=x.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(255,255,255,.55)');g.addColorStop(.4,'rgba(255,255,255,.1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,256,256);return new THREE.CanvasTexture(c);})(),color:C('#5a78ff').multiplyScalar(.5),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));
bolaGlow.scale.setScalar(3.2); bolaGlow.position.copy(BOLA.position); S.add(bolaGlow);
/* debu melayang */
const MOTE = (() => { const N=700,P=new Float32Array(N*3),r=rng(5); for(let i=0;i<N;i++){ P[i*3]=(r()-.5)*40; P[i*3+1]=r()*14; P[i*3+2]=(r()-.5)*40; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:.07,color:C('#9fb0ff'),transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false})); p.frustumCulled=false; S.add(p); return p; })();

/* hamparan peti 1 ton (20.000 buah) */
const NC=20000, COLS=100, SP=.62, PETI=.4;
const texPeti = (() => { const c=kanvas(128,128), x=c.getContext('2d'); const r=rng(2); x.fillStyle='#8a5a2c'; x.fillRect(0,0,128,128);
  for(let i=0;i<8;i++){ x.fillStyle=`rgba(40,20,5,${.25+r()*.2})`; x.fillRect(0,i*16,128,2); }
  x.fillStyle='rgba(40,20,5,.5)'; x.fillRect(0,0,6,128); x.fillRect(122,0,6,128); x.fillRect(0,0,128,6); x.fillRect(0,122,128,6);
  for(let i=0;i<260;i++){ x.fillStyle=`rgba(${r()<.5?'200,150,80':'30,15,5'},${.05+r()*.1})`; x.fillRect(r()*128,r()*128,2+r()*8,1+r()*2); }
  return new THREE.CanvasTexture(c); })();
const PETI_M = new THREE.InstancedMesh(new THREE.BoxGeometry(PETI,PETI,PETI), new THREE.MeshStandardMaterial({map:texPeti,bumpMap:texPeti,bumpScale:.6,roughness:.8,metalness:0,color:0xffd2a0,emissive:C('#4a2200'),emissiveIntensity:.5}), NC);
PETI_M.frustumCulled=false; S.add(PETI_M);
const PX = [], PZ = []; for(let i=0;i<NC;i++){ const col=i%COLS, row=(i/COLS)|0; PX.push((col-(COLS-1)/2)*SP); PZ.push(-3.5-row*SP); }
const _o = new THREE.Object3D();
function petiUpd(front){ for(let i=0;i<NC;i++){ const d=(i/COLS|0); const k=clamp((front-d)/9); const s=E.out(k); _o.position.set(PX[i],-.5+PETI/2*s,PZ[i]); _o.scale.setScalar(Math.max(.0001,s)); _o.rotation.y=(i%7)*.03; _o.updateMatrix(); PETI_M.setMatrixAt(i,_o.matrix); } PETI_M.instanceMatrix.needsUpdate=true; }
/* lampu */
const matahari = new THREE.DirectionalLight(C('#ffb27a'), 1.5); matahari.position.set(30,16,20); S.add(matahari);
const rim = new THREE.DirectionalLight(C('#6f8cff'), 2.0); rim.position.set(-24,10,-16); S.add(rim);
const titik = new THREE.PointLight(C('#7a96ff'), 1.4, 10, 1.8); titik.position.set(0,.9,1.6); S.add(titik);
const hemi = new THREE.HemisphereLight(0x5a5fa8,0x0a0a16,.14); S.add(hemi);

