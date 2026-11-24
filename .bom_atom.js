
/* ================= DUNIA ATOM (renderer kedua, dibuka lewat lingkaran zoom) ================= */
const AT=mk('div','',$('#stage'));Object.assign(AT.style,{position:'absolute',left:0,top:0,width:W+'px',height:H+'px',zIndex:3,display:'none',background:'radial-gradient(ellipse 90% 70% at 50% 45%,#23323b 0%,#111b21 55%,#070b0e 100%)'});
mk('div','',AT).style.cssText='position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.035) 2px,transparent 2px);background-size:72px 72px;background-position:36px 36px';
const RA=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});RA.setPixelRatio(1);RA.setSize(W,H);RA.outputEncoding=THREE.sRGBEncoding;RA.toneMapping=THREE.ACESFilmicToneMapping;RA.toneMappingExposure=1.05;RA.setClearColor(0,0);
RA.domElement.style.cssText='position:absolute;left:0;top:0;display:block';AT.appendChild(RA.domElement);
const IRIS=mk('div','',$('#stage'));IRIS.style.cssText='position:absolute;left:0;top:0;width:'+W+'px;height:'+H+'px;z-index:4;pointer-events:none';
const IRISC=svgEl('circle',{cx:540,cy:960,r:0,fill:'none',stroke:'#fff','stroke-width':6,style:'filter:drop-shadow(0 0 10px '+PAL.aks+')'},svgEl('svg',{viewBox:'0 0 1080 1920',width:W,height:H,style:'position:absolute;left:0;top:0;overflow:visible'},IRIS));
const SA=new THREE.Scene();SA.environment=petaPantul(RA);
const KA=new THREE.OrthographicCamera(-1,1,1,-1,-300,300);
SA.add(new THREE.HemisphereLight(C('#cfdde6'),C('#2a2622'),.6));
const kunciA=new THREE.DirectionalLight(C('#fff0dc'),2.4);kunciA.position.set(8,14,10);SA.add(kunciA);
const tepiA=new THREE.DirectionalLight(C('#9fb8ff'),1.0);tepiA.position.set(-8,5,-8);SA.add(tepiA);
const logamA=bhn('#aab3b9',{metalness:.9,roughness:.3,envMapIntensity:1.3},false),prot=bhn('#eef1f3',{metalness:.25,roughness:.4,envMapIntensity:.8},false),neut=bhn('#7d8b94',{metalness:.3,roughness:.45,envMapIntensity:.8},false);
const glowB=(o)=>new THREE.MeshBasicMaterial(Object.assign({color:C(PAL.aks),toneMapped:false},o));
const tGlow=teksturK(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,150,100,.85)');g.addColorStop(.6,'rgba(255,90,31,.25)');g.addColorStop(1,'rgba(255,90,31,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
function sprite(){const m=new THREE.SpriteMaterial({map:tGlow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,opacity:0});const s=new THREE.Sprite(m);s.visible=false;SA.add(s);return s;}
function spr(s,pos,sc,op){s.position.set(...pos);s.scale.setScalar(sc);s.material.opacity=op;s.visible=op>.003;}
const _u=new THREE.Vector3(),_w=new THREE.Vector3(),UP=new THREE.Vector3(0,1,0);
function batangA(m,a,b){_u.set(...a);_w.set(...b).sub(_u);const L=_w.length();m.visible=L>1e-6;if(!m.visible)return;m.position.copy(_u).addScaledVector(_w,.5);m.scale.y=L;m.quaternion.setFromUnitVectors(UP,_w.normalize());}
function tabung(r,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,1,8),mat);m.visible=false;SA.add(m);return m;}

/* --- kisi logam uranium 5x5x5 + atom di tengah (kulit elektron) + inti --- */
const LAT=new THREE.InstancedMesh(new THREE.SphereGeometry(.3,24,16),Object.assign(logamA.clone(),{transparent:true}),125);SA.add(LAT);
{const M=new THREE.Matrix4();let n=0;for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)for(let k=-2;k<=2;k++){M.makeTranslation(i,j,k);if(!i&&!j&&!k)M.makeScale(1e-4,1e-4,1e-4);LAT.setMatrixAt(n++,M);}
 const pts=[];for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)for(let k=-2;k<=2;k++){if(i<2)pts.push(i,j,k,i+1,j,k);if(j<2)pts.push(i,j,k,i,j+1,k);if(k<2)pts.push(i,j,k,i,j,k+1);}
 const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));var LATL=new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:C('#c9d1d6'),transparent:true,opacity:.3}));SA.add(LATL);}
const CEN=new THREE.Group();SA.add(CEN);
CEN.add(new THREE.Mesh(new THREE.SphereGeometry(.34,32,20),new THREE.MeshStandardMaterial({color:C('#9fd4ff'),transparent:true,opacity:.1,roughness:.1,depthWrite:false})));
const ORB=[[.30,.3,0],[.24,1.2,.6],[.18,2.0,1.1]].map(([r,rx,ry],i)=>{const g=new THREE.Group();g.rotation.set(rx,ry,0);CEN.add(g);g.add(new THREE.Mesh(new THREE.TorusGeometry(r,.004,6,64),glowB({color:C('#bfe6ff'),transparent:true,opacity:.5})));
  const e=new THREE.Mesh(new THREE.SphereGeometry(.022,12,10),glowB({color:C('#dff4ff')}));g.add(e);return{g,e,r,v:2.2-i*.5};});
// inti: 36 nukleon (proton putih, neutron abu)
const NUC=new THREE.Group();SA.add(NUC);const NK=[];
{const AXS=new THREE.Vector3(.8,.25,.55).normalize();window.AXS=AXS;for(let i=0;i<36;i++){const a=hash(i+1)*6.283,b=Math.acos(2*hash(i+60)-1),r=.055*Math.cbrt(hash(i+120));const p=new THREE.Vector3(Math.sin(b)*Math.cos(a)*r,Math.sin(b)*Math.sin(a)*r,Math.cos(b)*r);
  const m=new THREE.Mesh(new THREE.SphereGeometry(.0165,14,10),(i%2?prot:neut).clone());NUC.add(m);NK.push({m,p,s:p.dot(AXS)>=0?1:-1});}}
CEN.visible=false;
/* --- molekul dinamit (ikatan kimia ditata ulang) di x = -12 --- */
const MX=-12,MOL=[];
{const tipe=[['#8c9399',.2],['#b0483a',.22],['#5d7fa6',.2],['#e6e9ea',.14],['#8c9399',.2],['#b0483a',.22],['#5d7fa6',.2],['#e6e9ea',.14]];
 const A0=[[-1.9,1.0],[-.9,1.3],[-1.4,-.2],[-.4,-.3],[.9,1.2],[1.9,.9],[1.2,-.2],[2.1,-.4]],A1=[[-1.8,.5],[-.3,1.3],[-1.1,-.2],[.2,.5],[1.5,.9],[2.3,1.2],[1.2,-.1],[2.4,.2]];
 tipe.forEach(([c,r],i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),bhn(c,{metalness:.2,roughness:.4,envMapIntensity:.9},false));SA.add(m);MOL.push({m,a:A0[i],b:A1[i]});});}
const BA=[[0,1],[2,3],[4,5],[6,7]],BB=[[0,2],[1,3],[4,6],[5,7]];const molBond=(pairs)=>pairs.map(()=>{const m=tabung(.05,new THREE.MeshStandardMaterial({color:C('#d8dde0'),metalness:.5,roughness:.4,transparent:true}));return m;});
const MBA=molBond(BA),MBB=molBond(BB),MFL=Array.from({length:8},sprite);
/* --- neutron: kepala + jejak bercahaya --- */
const NEU=Array.from({length:4},()=>({h:new THREE.Mesh(new THREE.SphereGeometry(.013,12,10),glowB()),t:tabung(.004,glowB({transparent:true,opacity:.9})),g:sprite()}));NEU.forEach(n=>{n.h.visible=false;SA.add(n.h);});
const FL1=sprite(),RINGS=[sprite(),sprite(),sprite()];
/* --- reaksi berantai: 1 -> 3 -> 9 -> 27 --- */
const CH=[{p:[0,0,0],g:0,par:-1,tf:22.1}];
{const r=rng(77),D=[1.8,1.5,1.3],W3=[[22.6,23.5],[23.9,24.9],[25.0,26.2]];let lo=0;for(let g=0;g<3;g++){const hi=CH.length;for(let i=lo;i<hi;i++)for(let k=0;k<3;k++){let d;do{d=new THREE.Vector3(r()*2-1,(r()*2-1)*.8,r()*2-1);}while(d.lengthSq()>1||d.lengthSq()<.2);d.normalize().multiplyScalar(D[g]*(.8+r()*.4));
  const P=CH[i].p;CH.push({p:[P[0]+d.x,P[1]+d.y,P[2]+d.z],g:g+1,par:i,t0:W3[g][0]+(k*.07)+r()*.15,t1:W3[g][1]+r()*.2});}lo=hi;}
 CH.forEach((n,i)=>{if(i)n.tf=n.t1;});}
const CHN=new THREE.InstancedMesh(new THREE.SphereGeometry(.16,16,12),logamA.clone(),CH.length),CHF=new THREE.InstancedMesh(new THREE.SphereGeometry(.1,12,10),glowB(),CH.length*2);CHN.frustumCulled=CHF.frustumCulled=false;SA.add(CHN,CHF);
const CHT=CH.map((n,i)=>i?{t:tabung(.045,glowB({transparent:true,opacity:.95})),h:new THREE.Mesh(new THREE.SphereGeometry(.11,10,8),glowB({color:C('#fff0e0')}))}:null),CHS=CH.map(()=>sprite());CHT.forEach(c=>{if(c){c.h.visible=false;SA.add(c.h);}});
/* --- timbangan super sensitif di x = +14 --- */
const BX=14,BAL=new THREE.Group();BAL.position.set(BX,0,0);SA.add(BAL);
{const st=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.1},false),stG=bhn('#ffffff',{map:tSikatG,metalness:.8,roughness:.4},false);
 pasang(new THREE.CylinderGeometry(1.1,1.25,.16,40),stG,BAL,[0,.08,0]);pasang(new THREE.CylinderGeometry(.12,.16,2.1,20),st,BAL,[0,1.1,0]);pasang(new THREE.SphereGeometry(.2,20,14),st,BAL,[0,2.2,0]);}
const BEAM=new THREE.Group();BEAM.position.set(BX,2.2,0);SA.add(BEAM);
{const st=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.1},false);pasang(new THREE.BoxGeometry(3.4,.1,.14),st,BEAM,[0,0,0]);[-1.7,1.7].forEach(x=>pasang(new THREE.SphereGeometry(.07,12,8),st,BEAM,[x,0,0]));pasang(new THREE.ConeGeometry(.07,.5,4),glowB(),BEAM,[0,.3,0]);}
const PAN=[-1,1].map(s=>{const g=new THREE.Group();SA.add(g);const st=bhn('#ffffff',{map:tSikat,metalness:.85,roughness:.34,envMapIntensity:1.1},false);
  pasang(new THREE.CylinderGeometry(.62,.5,.07,36),st,g,[0,0,0]);const cap=pasang(new THREE.CylinderGeometry(.015,.015,1,6),logamA,g,[0,.5,0]);return{g,s,tali:cap};});
const MASA_L=new THREE.Mesh(new THREE.SphereGeometry(.24,28,20),logamA);SA.add(MASA_L);const MASA_L2=[0,1].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.17-i*.008,24,16),logamA);m.visible=false;SA.add(m);return m;});
const REF=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,.4,24),bhn('#c9a35a',{metalness:.9,roughness:.3},false));SA.add(REF);
const BEAMG=Array.from({length:6},sprite),EGL=sprite();
function tiltBal(t){return -.075*E.io(seg(t,30.6,31.8));}

/* --- kamera atom --- */
const KA_KUNCI=[[6.3,[0,0,0],9],[7.3,[0,0,0],9],[8.1,[MX+.3,.4,0],8],[10.6,[MX+.3,.4,0],8],[11.7,[0,0,0],4.5],[12.8,[0,0,0],1.2],[13.9,[0,0,0],.62],[16.2,[0,0,0],.62],[18.5,[0,0,0],.8],[22.2,[0,0,0],.8],[23.4,[0,0,0],9],[27.0,[0,0,0],15],[28.0,[0,0,0],15],[28.9,[BX,2.6,0],8.2],[33,[BX,2.6,0],7.6],[39.6,[BX,2.6,0],7.2],[40.4,[BX,2.6,0],7.2],[41.6,[0,0,0],15],[49,[0,0,0],16]];
function kameraAtom(t){const[A,B,e]=cariKunci(KA_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HA=h;const w=h*W/H;
  Object.assign(KA,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});KA.updateProjectionMatrix();_v.set(...tg);KA.position.copy(_v).addScaledVector(ARAH,60);KA.lookAt(_v);}
function keLayarA(p){_v.set(p[0],p[1],p[2]).project(KA);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
const tNeu=[[14.4,15.9,[-.42,.13,.22],[0,0,0]],[20.3,21.6,[0,0,0],[.5,.3,-.42]],[20.55,21.8,[0,0,0],[-.35,-.38,.4]],[20.8,22.0,[0,0,0],[.1,-.5,-.5]]];
function posNeu(i,t){const[a,b,P,Q]=tNeu[i],k=E.io(seg(t,a,b));return[lerp(P[0],Q[0],k),lerp(P[1],Q[1],k),lerp(P[2],Q[2],k)];}

function animAtom(t){
  // kisi + atom tengah
  const fadeL=1-sstep(10.9,12.0,t);LAT.material.opacity=fadeL;LAT.visible=LATL.visible=fadeL>.01;LATL.material.opacity=.3*fadeL;
  CEN.visible=t>10.8&&t<14.2;ORB.forEach(o=>o.e.position.set(Math.cos(t*o.v)*o.r,Math.sin(t*o.v)*o.r*.0,Math.sin(t*o.v)*o.r));
  CEN.children[0].material.opacity=.12*(1-sstep(13.0,13.9,t));ORB.forEach(o=>o.g.visible=t<13.4);
  // molekul
  const mv=E.io(seg(t,9.2,10.4)),mon=t>7.3&&t<11.6;MOL.forEach(o=>{o.m.visible=mon;const x=lerp(o.a[0],o.b[0],mv)+MX,y=lerp(o.a[1],o.b[1],mv)+Math.sin(mv*3.14)*.35*(hash(7)-.5);o.m.position.set(x,y,Math.sin(t*1.2+o.a[0])*.1);});
  const pa=(P,A,f)=>P.forEach((pr,i)=>{const m=A[i];m.visible=mon&&f>.02;if(!m.visible)return;batangA(m,[MOL[pr[0]].m.position.x,MOL[pr[0]].m.position.y,MOL[pr[0]].m.position.z],[MOL[pr[1]].m.position.x,MOL[pr[1]].m.position.y,MOL[pr[1]].m.position.z]);m.material.opacity=f;});
  pa(BA,MBA,1-sstep(9.2,9.7,t));pa(BB,MBB,sstep(10.0,10.5,t));MFL.forEach((s,i)=>{const k=Math.sin(Math.PI*clamp(seg(t,9.25+i*.04,10.45)));spr(s,[MOL[i].m.position.x,MOL[i].m.position.y,.2],.9,mon?k*.9:0);});
  // inti & fisi
  const nv=t>13.2&&t<22.4;NUC.visible=nv;
  const jig=t<15.9?.0012:0,str=E.io(seg(t,15.9,16.5)),sep=E.out(seg(t,16.5,17.8)),heat=sstep(19.0,19.8,t)*(1-sstep(21.2,22.2,t));
  NK.forEach((o,i)=>{const m=o.m,p=o.p,d=p.dot(AXS),stretch=1+.9*str,sg=o.s;let x=p.x,y=p.y,z=p.z;
    x+=AXS.x*d*(stretch-1);y+=AXS.y*d*(stretch-1);z+=AXS.z*d*(stretch-1);
    const off=sg*(.01+.2*sep)*(t>16.5?1:0);x+=AXS.x*off;y+=AXS.y*off;z+=AXS.z*off;
    const ph=t*9+i;x+=Math.sin(ph)*jig*(1+str*3);y+=Math.cos(ph*1.3)*jig;z+=Math.sin(ph*.7)*jig;m.position.set(x,y,z);
    const em=Math.max(heat*1.4,(t>16.5?sstep(16.5,16.9,t)*(1-sstep(17.8,19.0,t)):0)*1.2,str*.5);m.material.emissive=m.material.emissive||new THREE.Color();m.material.emissive.copy(C(PAL.aks));m.material.emissiveIntensity=em*(.7+.3*Math.sin(t*10+i));});
  // neutron
  NEU.forEach((n,i)=>{const[a,b,P]=tNeu[i],on=t>=a&&t<b+(i?1.2:0)&&t<22.3,pos=posNeu(i,t);n.h.visible=on&&(t<b||i>0);n.h.position.set(...pos);
    n.t.visible=on;if(on){const st=P,back=[lerp(st[0],pos[0],.0),lerp(st[1],pos[1],.0),lerp(st[2],pos[2],.0)];const tl=i?[lerp(st[0],pos[0],0),lerp(st[1],pos[1],0),lerp(st[2],pos[2],0)]:st;batangA(n.t,tl,pos);n.t.material.opacity=.9*(1-sstep(b,b+.9,t));}
    spr(n.g,pos,.12,on&&t<b+.6?.9:0);if(i===0&&t>=b)n.h.visible=false;});
  // kilatan + gelombang panas
  const fk=Math.sin(Math.PI*clamp(seg(t,16.45,17.3)));spr(FL1,[0,0,0],.12+.25*seg(t,16.45,17.3),fk);
  RINGS.forEach((s,i)=>{const u=((t-19.3-i*.5)/1.5),k=u>=0&&u<1&&t<21.8?u:-1;spr(s,[0,0,0],k<0?.01:.08+.35*E.out(k),k<0?0:.55*(1-k));});
  // reaksi berantai
  const cv=t>22.0;CHN.visible=CHF.visible=cv;const M4=new THREE.Matrix4(),Qi=new THREE.Quaternion(),Pp=new THREE.Vector3(),Ss=new THREE.Vector3();
  CH.forEach((n,i)=>{const hit=t>=n.tf,ap=n.g===0?1:sstep(n.t0-.1,n.t0+.2,t);
    Pp.set(...n.p);Ss.setScalar(hit||ap<.02?1e-4:1);if(n.g>0&&ap>0.02&&!hit)Ss.setScalar(.4+.6*E.out(ap));M4.compose(Pp,Qi,Ss);CHN.setMatrixAt(i,M4);
    const f=hit?E.out(seg(t,n.tf,n.tf+.35)):0;[0,1].forEach(k=>{const sg=k?1:-1;Pp.set(n.p[0]+AXS.x*sg*.09*f,n.p[1]+AXS.y*sg*.09*f,n.p[2]+AXS.z*sg*.09*f);Ss.setScalar(hit?(.4+.6*f):1e-4);M4.compose(Pp,Qi,Ss);CHF.setMatrixAt(i*2+k,M4);});
    const fl=hit?Math.sin(Math.PI*clamp(seg(t,n.tf,n.tf+.7))):0;spr(CHS[i],n.p,1.1+.6*fl,cv?fl*.85:0);
    if(i){const c=CHT[i],p=seg(t,n.t0,n.t1),pr=CH[n.par].p,head=[lerp(pr[0],n.p[0],p),lerp(pr[1],n.p[1],p),lerp(pr[2],n.p[2],p)];c.t.visible=cv&&p>0;c.h.visible=cv&&p>0&&p<1;c.h.position.set(...head);if(c.t.visible){batangA(c.t,pr,head);c.t.material.opacity=.95*(1-.55*sstep(n.t1,n.t1+1.5,t));}}});
  CHN.instanceMatrix.needsUpdate=CHF.instanceMatrix.needsUpdate=true;
  // timbangan
  const bal=t>28.3&&t<41.0;[BAL,BEAM].forEach(o=>o.visible=bal);PAN.forEach(p=>{p.g.visible=bal;});MASA_L.visible=REF.visible=bal&&t<30.9;
  const th=tiltBal(t);BEAM.rotation.z=th;const kk=E.out(seg(t,30.0,31.0));
  PAN.forEach(p=>{const ex=BX+p.s*1.7*Math.cos(th),ey=2.2+p.s*1.7*Math.sin(th);p.g.position.set(ex,ey-1.15,0);p.tali.scale.y=1.15;p.tali.position.y=.575;});
  const L=PAN[0].g.position,R=PAN[1].g.position;MASA_L.position.set(L.x,L.y+.3,0);const sh=1-.02*E.out(seg(t,30.0,31.0));MASA_L.scale.setScalar(sh);REF.position.set(R.x,R.y+.24,0);
  MASA_L2.forEach((m,i)=>{m.visible=bal&&t>=30.0&&t<41.0;const s=i?1:-1,o=.34*E.out(seg(t,30.0,30.9));m.position.set(L.x+s*o,L.y+.26+(i?0:0),0);m.scale.setScalar(t>31?1:1);});
  MASA_L.visible=bal&&t<30.0;
  const eb=Math.sin(Math.PI*clamp(seg(t,30.1,31.6)));BEAMG.forEach((s,i)=>{const u=clamp(seg(t,30.1+i*.06,31.4+i*.06));spr(s,[L.x+Math.sin(i*2.1+t*3)*.2,L.y+.4+u*2.4,.2],.5+.5*(1-u),eb*(1-u)*.9);});spr(EGL,[L.x,L.y+.55,.3],1.8*eb+.1,eb*.8);
}
