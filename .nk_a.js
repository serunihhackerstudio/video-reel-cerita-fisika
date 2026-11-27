/* ============ [0] WAKTU (adegan 1 sementara, diperkirakan; disinkron ke suara setelah gambar disetujui) ============ */
const KATA = [
{w:'Sebuah',t0:.8,t1:1.2},{w:'benda',t0:1.25,t1:1.6},{w:'sebesar',t0:1.65,t1:2.1},{w:'bola',t0:2.15,t1:2.5},{w:'softball,',t0:2.55,t1:3.3},
{w:'bisa',t0:3.9,t1:4.15},{w:'melepaskan',t0:4.2,t1:4.8},{w:'energi',t0:4.85,t1:5.3},{w:'puluhan',t0:5.4,t1:5.9},{w:'ribu',t0:5.95,t1:6.3},{w:'ton',t0:6.35,t1:6.6},{w:'TNT.',t0:6.65,t1:7.3},
{w:'Dari',t0:8.4,t1:8.7},{w:'mana',t0:8.75,t1:9.1},{w:'energi',t0:9.15,t1:9.6},{w:'sebesar',t0:9.65,t1:10.1},{w:'itu?',t0:10.15,t1:10.9}];
const kt = w => KATA.find(k => k.w.toLowerCase().startsWith(w)).t0;
const DUR = 15;
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

/* kamera */
function catmull(a,b,c,d,k){ return b.map((_,i)=>.5*(2*b[i]+(c[i]-a[i])*k+(2*a[i]-5*b[i]+4*c[i]-d[i])*k*k+(3*b[i]-a[i]-3*c[i]+d[i])*k*k*k)); }
function trk(t,K){ const n=K.length; let i=0; while(i<n-2&&t>K[i+1][0]) i++; const k=E.s(clamp((t-K[i][0])/(K[i+1][0]-K[i][0]))); const g=(j,x)=>K[clamp(j,0,n-1)][x];
  return [catmull(g(i-1,1),g(i,1),g(i+1,1),g(i+2,1),k), catmull(g(i-1,2),g(i,2),g(i+1,2),g(i+2,2),k)]; }
const K1=[[0,[1.2,.9,2.4],[0,.5,0]],[3,[-1.0,.75,2.0],[0,.5,0]],[6.4,[-2.2,1.6,3.6],[0,.5,-1]],[9.5,[0,3.4,6.5],[0,.7,-30]],[12.5,[6,9,15],[0,0,-60]],[15,[8,14,20],[0,0,-70]]];
const vOf = a => V3(a[0],a[1],a[2]);
const pj = v => { const w=v.clone().project(cam); return [(w.x*.5+.5)*W,(-w.y*.5+.5)*H]; };
const OV=[]; function ov(html,css,a,b,fi,fo){ const e=document.createElement('div'); e.className='ov'; e.style.cssText=css; e.innerHTML=html; $('#stage').appendChild(e); OV.push({e,a,b,fi:fi||.7,fo:fo||.6}); return e; }
function ovUpd(t){ OV.forEach(o=>{ const k=seg(t,o.a,o.a+o.fi)*(1-seg(t,o.b-o.fo,o.b)); o.e.style.opacity=k.toFixed(3); o.e.style.visibility=k>.002?'visible':'hidden'; }); }
ov('<small>Pembahasan sains</small><b>Kenapa bom nuklir bisa<br>menghasilkan <i>daya ledak</i><br>yang luar biasa?</b>','left:150px;top:150px','',.5,4.6);
const TNT = ov('<small>Energi dari benda sebesar softball</small><b>≈ <i id="nT">0</i> ton TNT</b>','left:150px;top:140px','',7.0,14.2);
ov('<small>1 peti = 1 ton TNT (ilustrasi)</small>','left:150px;top:290px','',7.4,14.2);
const L_B = label({dx:140,dy:-140,teks:'sebesar bola softball',warna:PAL.aksen,font:`'${FONT.judul}'`,ukuran:54,tebal:600});
let subY = H*.88;
const SPEED = 0;
function gambar(t){
  const front = seg(t,6.4,13.2)*220 ; petiUpd(front);
  BOLA.rotation.y=t*.25; BOLA.rotation.x=.2; bolaGlow.material.opacity=.8+.2*Math.sin(t*2);
  MOTE.position.y=Math.sin(t*.3)*.3; MOTE.rotation.y=t*.01;
  const tr=trk(t,K1); const pos=vOf(tr[0]), tg=vOf(tr[1]); const d=pos.distanceTo(tg); cam.near=Math.max(.05,d*.002); cam.far=3000; cam.updateProjectionMatrix();
  cam.position.set(pos.x+nz(t*.9,1)*.012,pos.y+nz(t*1.1,2)*.01,pos.z+nz(t*.8,3)*.012); cam.lookAt(tg); cam.updateMatrixWorld();
  kubah.position.copy(cam.position);
  titik.intensity=1.4+.3*Math.sin(t*2.5);
  REN.setRenderTarget(RT); REN.render(S, cam);
  pSalin.uniforms.t.value = RT.texture; lewat(pSalin, R2);
  pTerang.uniforms.t.value = R2.texture; pTerang.uniforms.th.value = 1.0; lewat(pTerang, B4a); blur2(B4a, B4b, 1.2); blur2(B4a, B4b, 2.4);
  pSalin.uniforms.t.value = B4a.texture; lewat(pSalin, B8a); blur2(B8a, B8b, 1.6); blur2(B8a, B8b, 3.2);
  pSalin.uniforms.t.value = R2.texture; lewat(pSalin, RTS); blur2(RTS, RTSb, 1.5); blur2(RTS, RTSb, 2.5);
  const U = AKHIR.uniforms; Object.assign(U.tS,{value:RT.texture}); U.tB1.value=B4a.texture; U.tB2.value=B8a.texture; U.tR.value=RRAY.texture; U.tT.value=RTS.texture;
  U.ry.value=0; U.fok.value=.5; U.tilt.value=0; U.ex.value=1.02; U.bl.value=.7; U.vig.value=.55; U.hangat.value=.3; U.sat.value=1.08;
  U.gelap.value = clamp(1-sstep(0,.5,t)*(1-sstep(DUR-.5,DUR,t)));
  lewat(AKHIR,null);
  ovUpd(t); $('#nT').textContent=Math.round(20000*E.out(seg(t,7.0,11.2))).toLocaleString('id-ID');
  L_B.atur(t,3.9,6.6,...pj(BOLA.position.clone().add(V3(.4,.5,0))));
  Object.assign($('#vSub').style,{left:'260px',width:'1400px',top:(subY-180)+'px',height:'330px',opacity:t>.6&&t<14.6?.85:0});
}
const SCENE = {
  dur: DUR, kata: KATA,
  sub:{gaya:'polos',maks:4,font:`800 52px '${FONT.sub}'`,warna:PAL.teks,aksen:PAL.aksen,kunci:['softball,','puluhan','ribu','ton','tnt.','energi','mana','itu?'],y:()=>({x:W/2,y:subY})},
  audio:{vo:[],sfx:[],music:null},
  muat:()=>Promise.all([document.fonts.load(`600 100px '${FONT.judul}'`),document.fonts.load(`800 60px '${FONT.sub}'`),document.fonts.load(`500 24px 'Sora'`)]),
  build(tl){ grainOn(.05); },
  frame(t){ gambar(t); }
};
