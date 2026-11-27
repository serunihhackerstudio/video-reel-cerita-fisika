/* ============ [0] WAKTU dari suara ============ */
const TTS=__TTS__;
const START=[.7,14.5,45.5,73.5,102.5,131.5,160];
const KATA=[],KS=[];
TTS.forEach((o,k)=>{const tk=o.teks.split(' ');KS[k]=[];o.kata.forEach((q,i)=>{const e={w:tk[i],t0:+(START[k]+q[1]).toFixed(3),t1:+(START[k]+q[2]).toFixed(3)};KATA.push(e);KS[k].push(e);});o.start=START[k];});
const kw=(k,w,n)=>{const m=KS[k].filter(e=>e.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(w));return m[n||0].t0;};
const DUR=178;
const C = h => new THREE.Color(h).convertSRGBToLinear(), V3 = (x,y,z) => new THREE.Vector3(x,y,z), DEG = Math.PI/180;
const PAL = {teks:'#F2EDE6', aksen:'#7FF0DC', hangat:'#FFB066', ungu:'#9a86ff'};
const FONT = {judul:'Fraunces', sub:'Outfit'};

/*POST*/

const S = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(32, W/H, .05, 3000); S.add(cam);
const GLSL_NOISE = `float h13(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),f.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),f.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float s=0.,a=.5;for(int i=0;i<6;i++){s+=a*n3(p);p=p*2.07+vec3(1.7,9.2,3.1);a*=.5;}return s;}`;
const KUB = {uMix:{value:0}};
const kubah = new THREE.Mesh(new THREE.SphereGeometry(1500,32,16), new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:KUB,
  vertexShader:'varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`uniform float uMix;varying vec3 vD;${GLSL_NOISE} void main(){vec3 d=normalize(vD);float h=d.y*.5+.5;
   vec3 warm=mix(vec3(.07,.038,.02),vec3(.012,.008,.005),smoothstep(.3,.9,h))+vec3(.06,.03,.012)*exp(-pow((d.y-.05)*5.,2.));
   vec3 cold=mix(vec3(.012,.05,.06),vec3(.003,.012,.02),smoothstep(.3,.95,h))+vec3(.006,.03,.03)*fbm(d*3.+2.);
   gl_FragColor=vec4(mix(warm,cold,uMix),1.);}`})); kubah.frustumCulled=false; S.add(kubah);
let STARS; (function(){ const N=5000,P=new Float32Array(N*3),Co=new Float32Array(N*3),Sz=new Float32Array(N); const r=rng(11);
  for(let i=0;i<N;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u); P[i*3]=q*Math.cos(a)*1300;P[i*3+1]=u*1300;P[i*3+2]=q*Math.sin(a)*1300; const T=r(); const col=T<.2?[.7,.8,1]:T<.75?[1,.96,.9]:[1,.8,.6]; const br=Math.pow(r(),5)*1.4+.3; Co[i*3]=col[0]*br;Co[i*3+1]=col[1]*br;Co[i*3+2]=col[2]*br; Sz[i]=1.5+Math.pow(r(),9)*3; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3)); g.setAttribute('sz',new THREE.BufferAttribute(Sz,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexShader:'attribute vec3 color;attribute float sz;varying vec3 vC;void main(){vC=color;gl_PointSize=sz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vC;void main(){vec2 d=gl_PointCoord-.5;float a=smoothstep(.5,.0,length(d));gl_FragColor=vec4(vC*a*2.4,1.);}'});
  STARS=new THREE.Points(g,m); STARS.frustumCulled=false; S.add(STARS); })();

/* lampu */
const kunci = new THREE.DirectionalLight(C('#ffb27a'), 2.4); kunci.position.set(6,5,8); S.add(kunci);
const rim = new THREE.DirectionalLight(C('#6fe0d0'), 2.2); rim.position.set(-6,4,-7); S.add(rim);
const hemi = new THREE.HemisphereLight(0x8a7a6a,0x0a0a10,.3); S.add(hemi);
