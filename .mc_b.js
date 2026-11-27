/* ============ HELPER ============ */
function catmull(a,b,c,d,k){ return b.map((_,i)=>.5*(2*b[i]+(c[i]-a[i])*k+(2*a[i]-5*b[i]+4*c[i]-d[i])*k*k+(3*b[i]-a[i]-3*c[i]+d[i])*k*k*k)); }
function trk(t,K){ const n=K.length; let i=0; while(i<n-2&&t>K[i+1][0]) i++; const k=E.s(clamp((t-K[i][0])/(K[i+1][0]-K[i][0]))); const g=(j,x)=>K[clamp(j,0,n-1)][x];
  return [catmull(g(i-1,1),g(i,1),g(i+1,1),g(i+2,1),k), catmull(g(i-1,2),g(i,2),g(i+1,2),g(i+2,2),k)]; }
let TT=0, FOV=32;
function setCam(pos,tg,shake){ const sh=shake||0; cam.position.set(pos.x+nz(TT*.9,1)*sh,pos.y+nz(TT*1.1,2)*sh,pos.z+nz(TT*.8,3)*sh);
  const d=cam.position.distanceTo(tg); cam.fov=FOV; cam.near=Math.max(.02,d*.002); cam.far=Math.max(3000,d*40); cam.updateProjectionMatrix(); cam.lookAt(tg); cam.updateMatrixWorld(); }
const vOf = a => V3(a[0],a[1],a[2]);
const pj = v => { const w=v.clone().project(cam); return [(w.x*.5+.5)*W,(-w.y*.5+.5)*H]; };
const OV=[]; function ov(html,css,a,b,fi,fo){ const e=document.createElement('div'); e.className='ov'; e.style.cssText=css; e.innerHTML=html; $('#stage').appendChild(e); const o={e,a,b,fi:fi||.7,fo:fo||.6}; OV.push(o); return o; }
function ovUpd(t){ OV.forEach(o=>{ const k=seg(t,o.a,o.a+o.fi)*(1-seg(t,o.b-o.fo,o.b)); o.e.style.opacity=k.toFixed(3); o.e.style.visibility=k>.002?'visible':'hidden'; }); }
const LBL=[]; function lab(teks,warna,dx,dy,a,b,pos,ukuran){ const l=label({dx,dy,teks,warna,font:`'${FONT.judul}'`,ukuran:ukuran||50,tebal:500}); LBL.push({l,a,b,pos}); return l; }
function lblUpd(t){ LBL.forEach(o=>{ const p=(t>=o.a-.2&&t<=o.b+.2)?o.pos():null; if(p) o.l.atur(t,o.a,o.b,p[0],p[1]); else o.l.atur(t,-9,-8,0,0); }); }
const SPRW = (() => { const c=kanvas(256,256), x=c.getContext('2d'); const g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.1,'rgba(255,255,255,.85)'); g.addColorStop(.3,'rgba(255,255,255,.25)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); })();
const mkSpr = (col,mult) => { const s=new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C(col).multiplyScalar(mult||1),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true})); s.visible=false; S.add(s); return s; };
const ARAH_MATAHARI = V3(-.55,.38,.5).normalize();
/*EARTH*/
bumi.visible=atmos.visible=false;

/* ---- siluet manusia dari kapsul & elipsoid (bisa diambil sampelnya) ---- */
const FIGP=[['e',[0,1.58,0],[.095,.115,.1]],['c',[0,1.47,0],[0,1.53,0],.045,.045],['e',[0,1.25,0],[.19,.27,.11]],['e',[0,.95,0],[.17,.13,.11]],
 ['c',[-.21,1.38,0],[-.29,1.08,0],.052,.045],['c',[-.29,1.08,0],[-.33,.80,0],.043,.034],['e',[-.335,.74,0],[.035,.06,.025]],
 ['c',[.21,1.38,0],[.29,1.08,0],.052,.045],['c',[.29,1.08,0],[.33,.80,0],.043,.034],['e',[.335,.74,0],[.035,.06,.025]],
 ['c',[-.09,.9,0],[-.1,.5,0],.09,.062],['c',[-.1,.5,0],[-.1,.08,0],.06,.04],['e',[-.1,.03,.06],[.04,.03,.11]],
 ['c',[.09,.9,0],[.1,.5,0],.09,.062],['c',[.1,.5,0],[.1,.08,0],.06,.04],['e',[.1,.03,.06],[.04,.03,.11]]];
function figur(mat){ const g=new THREE.Group(); FIGP.forEach(p=>{ if(p[0]==='e'){ const m=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),mat); m.position.set(...p[1]); m.scale.set(...p[2]); g.add(m); }
  else { const a=V3(...p[1]),b=V3(...p[2]),L=a.distanceTo(b); const m=new THREE.Mesh(new THREE.CylinderGeometry(p[4],p[3],L,16,1),mat); m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(V3(0,1,0),b.clone().sub(a).normalize()); g.add(m);
    [a,b].forEach((q,i)=>{ const s=new THREE.Mesh(new THREE.SphereGeometry(i?p[4]:p[3],14,10),mat); s.position.copy(q); g.add(s); }); } }); return g; }
function dalamFigur(x,y,z){ for(const p of FIGP){ if(p[0]==='e'){ const c=p[1],r=p[2]; if(((x-c[0])/r[0])**2+((y-c[1])/r[1])**2+((z-c[2])/r[2])**2<=1) return true; }
  else { const a=V3(...p[1]),b=V3(...p[2]),ab=b.clone().sub(a),L2=ab.lengthSq(),q=V3(x,y,z).sub(a); const t=clamp(q.dot(ab)/L2); const rad=p[3]+(p[4]-p[3])*t; if(q.distanceTo(ab.multiplyScalar(t))<=rad) return true; } } return false; }
function sampelFigur(N,seed){ const r=rng(seed), P=new Float32Array(N*3); let n=0,g=0; while(n<N&&g++<N*60){ const x=(r()-.5)*.8,y=r()*1.7,z=(r()-.4)*.32; if(dalamFigur(x,y,z)){ P[n*3]=x;P[n*3+1]=y;P[n*3+2]=z;n++; } } return P; }
function rimMat(hot){ const m=new THREE.ShaderMaterial({transparent:true,uniforms:{uK:{value:1},uC:{value:C(hot||'#ffb066')}},vertexShader:'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float uK;uniform vec3 uC;varying vec3 vN;void main(){float r=pow(1.-clamp(abs(vN.z),0.,1.),2.3);vec3 base=vec3(.03,.022,.018)+vec3(.05,.04,.035)*clamp(vN.y,0.,1.);gl_FragColor=vec4(base+uC*r*1.9,uK);}'}); Object.defineProperty(m,'opacity',{get(){return this.uniforms.uK.value;},set(v){ this.uniforms.uK.value=v; }}); return m; }
const matTubuh = rimMat('#ffb066');
const poolTex=(col)=>{ const c=kanvas(256,256),x=c.getContext('2d'); const g=x.createRadialGradient(128,128,0,128,128,128); g.addColorStop(0,col); g.addColorStop(.5,'rgba(255,150,70,.12)'); g.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g; x.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); };

/* ============ ADEGAN A: hook + zoom tanpa putus ============ */
const GA=new THREE.Group(); GA.visible=false; S.add(GA);
const ST=[0,1,2,3,4,5].map(()=>{ const g=new THREE.Group(); GA.add(g); return {g,mats:[]}; });
const reg=(i,o)=>{ [].concat(o.material).forEach(m=>{ m.transparent=true; ST[i].mats.push(m); }); ST[i].g.add(o); return o; };
{ const f=figur(matTubuh); f.position.y=-.85*1.9; f.scale.setScalar(1.9); ST[0].g.add(f); ST[0].mats.push(matTubuh); ST[0].fig=f;
  const lt=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshBasicMaterial({map:poolTex('rgba(255,170,90,.55)'),transparent:true,depthWrite:false})); lt.rotation.x=-Math.PI/2; lt.position.y=-1.62; reg(0,lt); }
{ const dm=new THREE.MeshStandardMaterial({color:C('#3b1d10'),roughness:.32,metalness:.3,transparent:true,emissive:C('#1a0a04'),emissiveIntensity:.5});
  const ell=(c,r)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,20),dm); m.position.set(...c); m.scale.set(...r); ST[1].g.add(m); };
  ell([-1.0,0,0],[.85,.58,.58]); ell([0,.06,0],[.5,.34,.34]); ell([.85,.02,0],[.45,.38,.38]);
  for(let s=-1;s<=1;s+=2)for(let i=0;i<3;i++){ const x=-.2+i*.35, a=V3(x,.05,s*.2), b=V3(x+(i-1)*.25,-.1,s*1.25), c=V3(x+(i-1)*.5,-.62,s*1.9);
    [[a,b],[b,c]].forEach(([p,q])=>{ const L=p.distanceTo(q); const m=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,L,10),dm); m.position.copy(p).add(q).multiplyScalar(.5); m.quaternion.setFromUnitVectors(V3(0,1,0),q.clone().sub(p).normalize()); ST[1].g.add(m); }); }
  for(let s=-1;s<=1;s+=2){ const a=V3(1.15,.18,s*.18), b=V3(1.8,.55,s*.55); const L=a.distanceTo(b); const m=new THREE.Mesh(new THREE.CylinderGeometry(.02,.03,L,8),dm); m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(V3(0,1,0),b.clone().sub(a).normalize()); ST[1].g.add(m); }
  ST[1].mats.push(dm);
  const lf=new THREE.Mesh(new THREE.CircleGeometry(5,48),new THREE.MeshStandardMaterial({color:C('#12281a'),roughness:.8,transparent:true})); lf.rotation.x=-Math.PI/2; lf.position.y=-.64; reg(1,lf); }
{ const cm=new THREE.MeshStandardMaterial({color:C('#a86a70'),roughness:.45,metalness:0,transparent:true,opacity:.7,emissive:C('#3a1a30'),emissiveIntensity:.45}); const nm=new THREE.MeshStandardMaterial({color:C('#6b4a9a'),emissive:C('#4a2a8a'),emissiveIntensity:.6,roughness:.4,transparent:true});
  ST[2].mats.push(cm,nm); for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++){ if(Math.abs(q+r)>3) continue; const x=(q+r*.5)*1.05, z=r*.91; const c=new THREE.Mesh(new THREE.SphereGeometry(.52,32,20),cm); c.scale.y=.55; c.position.set(x,0,z); ST[2].g.add(c); const n=new THREE.Mesh(new THREE.SphereGeometry(.17,16,12),nm); n.position.set(x,.03,z); ST[2].g.add(n); } }
{ const mem=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,uniforms:{uK:{value:1}},vertexShader:'varying vec3 vN;varying vec3 vW;void main(){vN=normalize(mat3(modelMatrix)*normal);vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:'uniform float uK;varying vec3 vN;varying vec3 vW;void main(){vec3 V=normalize(cameraPosition-vW);float f=pow(1.-abs(dot(normalize(vN),V)),2.2);gl_FragColor=vec4(vec3(.2,.9,.8)*(f*1.1+.04)*uK,1.);}'});
  ST[3].mem=mem; const cell=new THREE.Mesh(new THREE.SphereGeometry(2.3,64,40),mem); ST[3].g.add(cell); ST[3].mats.push({set opacity(v){ mem.uniforms.uK.value=v; },get opacity(){ return mem.uniforms.uK.value; },transparent:true});
  const nuc=new THREE.MeshStandardMaterial({color:C('#6b7cff'),emissive:C('#3a4fd8'),emissiveIntensity:.7,roughness:.45,transparent:true}); ST[3].mats.push(nuc); const n=new THREE.Mesh(new THREE.SphereGeometry(.8,48,32),nuc); ST[3].g.add(n);
  const mit=new THREE.MeshStandardMaterial({color:C('#ff9a6a'),emissive:C('#d05a20'),emissiveIntensity:.55,roughness:.4,transparent:true}); ST[3].mats.push(mit); const rg=rng(5);
  for(let i=0;i<9;i++){ const a=rg()*6.283,rd=1.25+rg()*.7,m=new THREE.Mesh(new THREE.SphereGeometry(.18,16,12),mit); m.scale.set(1.7,.8,.8); m.position.set(Math.cos(a)*rd,(rg()-.5)*1.4,Math.sin(a)*rd); m.rotation.set(rg()*3,rg()*3,rg()*3); ST[3].g.add(m); }
  const pm=new THREE.PointsMaterial({size:.05,map:SPRW,color:C('#7ff0dc').multiplyScalar(1.4),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}); ST[3].mats.push(pm); const P=new Float32Array(900*3); for(let i=0;i<900;i++){ const v=V3(rg()-.5,rg()-.5,rg()-.5).normalize().multiplyScalar(.9+rg()*1.2); P.set([v.x,v.y,v.z],i*3); } const pg=new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(P,3)); ST[3].g.add(new THREE.Points(pg,pm)); }
{ const N=110, bm=new THREE.MeshStandardMaterial({color:C('#4adfc8'),emissive:C('#1ab8a0'),emissiveIntensity:.8,roughness:.35,transparent:true}), bm2=bm.clone(); bm2.color=C('#c070ff'); bm2.emissive=C('#8a30e0'); ST[4].mats.push(bm,bm2);
  const rm=[0,1,2,3].map(i=>{ const m=new THREE.MeshStandardMaterial({color:C(['#ffd36a','#ff6a6a','#6aa8ff','#6aff9a'][i]),emissive:C(['#c09020','#c02020','#2060c0','#20c060'][i]),emissiveIntensity:.7,transparent:true}); ST[4].mats.push(m); return m; });
  for(let i=0;i<N;i++){ const u=i/N, a=u*6.283*5.5, y=(u-.5)*7.0, R=.62; [[0,bm],[Math.PI,bm2]].forEach(([ph,m])=>{ const s=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),m); s.position.set(Math.cos(a+ph)*R,y,Math.sin(a+ph)*R); ST[4].g.add(s); });
    if(i%2===0){ const p1=V3(Math.cos(a)*R,y,Math.sin(a)*R),p2=V3(Math.cos(a+Math.PI)*R,y,Math.sin(a+Math.PI)*R),L=p1.distanceTo(p2); const c=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,L,6),rm[(i/2|0)%4]); c.position.copy(p1).add(p2).multiplyScalar(.5); c.quaternion.setFromUnitVectors(V3(0,1,0),p2.clone().sub(p1).normalize()); ST[4].g.add(c); } } }
{ const pm=new THREE.PointsMaterial({size:.05,map:SPRW,color:C('#7aa8ff').multiplyScalar(1.7),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}); const N=3200,P=new Float32Array(N*3),r=rng(23);
  for(let i=0;i<N;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u),rad=.5+Math.pow(r(),1.5)*2.3; P[i*3]=q*Math.cos(a)*rad;P[i*3+1]=u*rad;P[i*3+2]=q*Math.sin(a)*rad; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); ST[5].cl=new THREE.Points(g,pm); ST[5].g.add(ST[5].cl); ST[5].mats.push(pm);
  const nm=new THREE.MeshBasicMaterial({color:new THREE.Color(3,2.3,1.7),transparent:true}); ST[5].g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,16,12),nm)); ST[5].mats.push(nm); }
const ZT=[[17.6,21.2],[23.4,25.8],[25.6,27.8],[29.8,31.9],[34.2,36.6]];
const SK=[[0,'1,7 m','manusia'],[.55,'3 milimeter','semut'],[1.5,'50 mikrometer','sel kulit'],[2.5,'1 mikrometer','di dalam sel'],[3.5,'2 nanometer','heliks DNA'],[4.5,'0,1 nanometer','atom']];
const SKL=ov('<small id="skn">manusia</small><b id="skv">1,7 m</b>','right:150px;top:120px;text-align:right',17.0,43.6);
const FOSS=mkSpr('#ffd9a0',1.4); FOSS.scale.set(5,5,1); FOSS.position.set(0,.4,-3);
ov('<small>Pembahasan sains</small><b>Mengecilkan tubuh sampai<br>level <i>atom</i></b>','left:150px;top:150px',.6,5.6);
ov('<b style="font-style:italic">apakah fisika<br>mengizinkannya?</b>','left:150px;top:150px',8.2,13.8);
function sA(t){ GA.visible=true; kubah.visible=true; hemi.intensity=.3;
  let z=0; ZT.forEach(([a,b])=>{ z+=E.io(seg(t,a,b)); });
  ST.forEach((s,i)=>{ const sc=Math.pow(520,z-i); s.g.visible=sc<40&&sc>.0006; s.g.scale.setScalar(sc);
    const al=(z<i)?sstep(i-1.15,i-.5,z):(1-sstep(i+.1,i+.75,z)); s.mats.forEach(m=>{ m.opacity=al; }); s.g.rotation.y=t*.12*(i%2?-1:1); s.g.rotation.x=(i==0||i==1)?0:.35*Math.sin(t*.2+i); });
  ST[0].g.rotation.y=Math.sin(t*.3)*.25; ST[1].g.rotation.x=.12; ST[4].g.rotation.x=0; ST[4].g.rotation.z=.25;
  const sh=sstep(7.0,10,t)*(1-sstep(13.5,14.6,t)); ST[0].fig.position.y=-.85*1.9+.03*Math.sin(t*30)*sh*0;
  ST[5].cl.rotation.y=t*.4; FOSS.visible=z<.8&&true; FOSS.material.opacity=1-sstep(.2,.8,z);
  KUB.uMix.value=clamp(z/4.2)*.95; kunci.intensity=lerp(2.4,1.2,clamp(z/3)); kunci.color.copy(C('#ffb27a')).lerp(C('#6fe0d0'),clamp(z/3)); rim.intensity=2.2; hemi.color.set(0x8a7a6a); hemi.intensity=lerp(.4,.6,clamp(z/4));
  const D=lerp(7.4,7,clamp(z/5)), az=t*.07+Math.PI*.12*(1-clamp(z)); const el=lerp(.12,.35,clamp(z));
  setCam(V3(Math.sin(az)*D,1.0+D*el,Math.cos(az)*D),V3(0,lerp(.1,0,clamp(z)),0),.01);
  PP={ex:1.02,bl:.7+.25*clamp(z/4),vig:.6,hangat:lerp(.45,.05,clamp(z/2)),sat:lerp(1.05,1.15,clamp(z/3)),tilt:0};
  const si=z<.5?0:z<1.5?1:z<2.5?2:z<3.5?3:z<4.5?4:5; $('#skv').textContent=SK[si][1]; $('#skn').textContent=SK[si][2]; }

/* ============ ADEGAN 3: massa & atom ============ */
const G3=new THREE.Group(); G3.visible=false; S.add(G3);
const fl3G=new THREE.PlaneGeometry(40,40,120,120); fl3G.rotateX(-Math.PI/2); const gridTex=(c1,c2)=>{ const c=kanvas(512,512),x=c.getContext('2d'); x.fillStyle=c1; x.fillRect(0,0,512,512); x.strokeStyle=c2; x.lineWidth=3; for(let i=0;i<=8;i++){ x.beginPath(); x.moveTo(i*64,0); x.lineTo(i*64,512); x.moveTo(0,i*64); x.lineTo(512,i*64); x.stroke(); } const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(10,10); t.anisotropy=8; return t; };
const fl3=new THREE.Mesh(fl3G,new THREE.MeshStandardMaterial({map:gridTex('#0b1a1f','rgba(127,240,220,.55)'),roughness:.85,metalness:.05,color:0xffffff,emissive:C('#06161a'),emissiveIntensity:.6})); G3.add(fl3);
const mF3=rimMat('#ffb066');
const FIG3=figur(mF3); FIG3.position.set(-3,0,0); G3.add(FIG3);
const AT=new THREE.Points((()=>{ const g=new THREE.BufferGeometry(); const P=sampelFigur(9000,77); g.setAttribute('position',new THREE.BufferAttribute(P,3)); return g; })(),new THREE.PointsMaterial({size:.022,map:SPRW,color:C('#7ff0dc').multiplyScalar(1.6),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); AT.position.set(-3,0,0); G3.add(AT);
function jaringan(n,R,sc,seed,col){ const r=rng(seed), P=[]; for(let i=0;i<n;i++){ const v=V3(r()-.5,r()-.5,r()-.5).normalize().multiplyScalar(Math.pow(r(),.45)*R); v.y*=.72; P.push(v); }
  const L=[]; for(let i=0;i<n;i++){ const d=P.map((p,j)=>[j,p.distanceTo(P[i])]).sort((a,b)=>a[1]-b[1]).slice(1,3); d.forEach(([j])=>L.push(P[i].x,P[i].y,P[i].z,P[j].x,P[j].y,P[j].z)); }
  const g=new THREE.Group(); const pg=new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.Float32BufferAttribute(P.flatMap(p=>[p.x,p.y,p.z]),3)); const pm=new THREE.PointsMaterial({size:sc,map:SPRW,color:C(col).multiplyScalar(2),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}); g.add(new THREE.Points(pg,pm));
  const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.Float32BufferAttribute(L,3)); const lm=new THREE.LineBasicMaterial({color:C(col).multiplyScalar(.9),transparent:true,opacity:.4,blending:THREE.AdditiveBlending,depthWrite:false}); g.add(new THREE.LineSegments(lg,lm)); g.userData.m=[pm,lm]; return g; }
const BRH=jaringan(900,1.15,.05,3,'#7ff0dc'); BRH.position.set(2.4,1.9,0); G3.add(BRH);
const BRA=jaringan(45,.2,.07,4,'#ffb066'); BRA.position.set(4.6,1.9,0); G3.add(BRA);
const mFS=rimMat('#ffb066'); const FIG3S=figur(mFS); FIG3S.scale.setScalar(.06); FIG3S.position.set(-3,0,0); FIG3S.visible=false; G3.add(FIG3S);
ov('<small>JUMLAH ATOM TUBUH MANUSIA</small><b>≈ 7 × 10<sup style="font-size:.55em">27</sup></b>','left:150px;top:150px',50.6,53.4);
ov('<small>KURANGI JUMLAH ATOM</small><b>otak kehabisan <i>neuron</i></b>','left:150px;top:150px',53.7,58.0);
ov('<small>JUMLAH NEURON</small><b>86 miliar vs 250 ribu</b>','left:150px;top:150px',58.6,65.0);
ov('<small>ATOM DIPADATKAN · TUBUH SEUKURAN SEMUT · MASSA TETAP ±70 KG</small><b>≈ 180 juta kali lebih <i>padat</i></b>','left:150px;top:150px',66.0,72.8);
lab('otak manusia','#7ff0dc',0,-100,60.3,65,()=>pj(BRH.position.clone().add(V3(0,1.3,0))),46);
lab('otak semut','#ffb066',0,-90,60.3,65,()=>pj(BRA.position.clone().add(V3(0,.6,0))),46);
function s3(t){ G3.visible=true; kubah.visible=true; KUB.uMix.value=.85;
  const fa=sstep(49.4,51,t), nat=1-fa*.0; mF3.opacity=1-fa; FIG3.visible=fa<.99; AT.visible=fa>0.01; AT.material.opacity=fa;
  const cnt=Math.round(lerp(9000,50,E.io(seg(t,53.7,56.8)))); AT.geometry.setDrawRange(0,cnt); const back=sstep(65.4,66.4,t);
  AT.material.opacity=fa*(1-back); const dk=E.io(seg(t,65.7,68.2)); FIG3S.visible=back>0; FIG3S.scale.setScalar(lerp(1,.05,dk)); mFS.opacity=back; if(back>0) FIG3.visible=false;
  const hb=sstep(55.6,57.2,t)*(1-sstep(65.2,66.4,t)); BRH.visible=BRA.visible=hb>0; BRH.userData.m.concat(BRA.userData.m).forEach((m,i)=>{ m.opacity=(i%2?.4:1)*hb*(.7+.3*Math.sin(t*5+i)); }); BRH.rotation.y=t*.15; BRA.rotation.y=-t*.2;
  const dent=2.6*E.io(seg(t,67.6,70.2)); const P=fl3G.attributes.position; for(let i=0;i<P.count;i++){ const x=P.getX(i),z=P.getZ(i); const r2=Math.pow(x+3,2)+z*z; P.setY(i,-dent/Math.sqrt(1+r2/.25)); } P.needsUpdate=true; fl3G.computeVertexNormals();
  FIG3S.position.set(-3,-dent*.92+.02,0);
  const K=[[45.5,[-1,1.5,6.5],[-3,.9,0]],[52,[-2,1.4,5.5],[-3,.9,0]],[56,[.5,1.8,7.2],[1.4,1.5,0]],[64.6,[1,1.9,8.2],[3.2,1.6,0]],[66.4,[-3.6,1.2,4],[-3,.7,0]],[69.5,[-3.3,.7,2.2],[-3,-.3,0]],[73,[-3.2,.8,2.3],[-3,-.45,0]]];
  const tr=trk(t,K); setCam(vOf(tr[0]),vOf(tr[1]),.008); kunci.intensity=2.0; kunci.color.set(0xffb27a); rim.intensity=2.4; hemi.intensity=.35; hemi.color.set(0x5a6a70);
  PP={ex:1.0,bl:.8,vig:.6,hangat:.1,sat:1.1,tilt:0}; }
/* ============ ADEGAN 4: dunia kuantum ============ */
const G4=new THREE.Group(); G4.visible=false; S.add(G4);
const CL=(()=>{ const N=6000,P=new Float32Array(N*3),Co=new Float32Array(N*3); const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); g.setAttribute('color',new THREE.BufferAttribute(Co,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:.09,map:SPRW,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); p.frustumCulled=false; G4.add(p); return p; })();
const NUC4=new THREE.Mesh(new THREE.SphereGeometry(.08,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(3,2.3,1.6)})); G4.add(NUC4);
const EL4=new THREE.Mesh(new THREE.SphereGeometry(.09,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(.8,2.4,3.6)})); G4.add(EL4);
const ORB4=new THREE.Line((()=>{ const p=[]; for(let i=0;i<=128;i++){ const a=i/128*6.283; p.push(Math.cos(a)*1.8,0,Math.sin(a)*1.8); } const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(p,3)); return g; })(),new THREE.LineBasicMaterial({color:C('#6fb0ff').multiplyScalar(1.4),transparent:true,opacity:.6})); G4.add(ORB4);
const TX0=16; /* penghalang terowongan */
const BAR=new THREE.Mesh(new THREE.BoxGeometry(.7,3.4,3.4),new THREE.MeshStandardMaterial({color:C('#3a8f9a'),transparent:true,opacity:.28,roughness:.1,metalness:.3,emissive:C('#1a6a74'),emissiveIntensity:.6})); BAR.position.set(TX0,0,0); G4.add(BAR);
const WV=[0,1,2].map(i=>{ const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(240*3),3)); const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:C(['#7ff0dc','#ffb066','#9a86ff'][i]).multiplyScalar(2.2),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); l.frustumCulled=false; G4.add(l); return l; });
const PART4=new THREE.Mesh(new THREE.SphereGeometry(.14,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(.8,3,3.4)})); G4.add(PART4);
const HX0=32; const HZ=mkSpr('#9fe8ff',1.3); G4.add(HZ); S.remove(HZ); HZ.position.set(HX0,0,0);
const HARR=[]; for(let i=0;i<22;i++){ const a=new THREE.ArrowHelper(V3(1,0,0),V3(HX0,0,0),1,0x7ff0dc,.14,.1); G4.add(a); HARR.push(a); }
ov('<small>DI LEVEL ATOM</small><b>aturan alam <i>berubah</i></b>','left:150px;top:150px',74.4,78.0);
ov('<small>BUKAN BOLA KECIL YANG MENGORBIT</small><b>melainkan <i>awan probabilitas</i></b>','left:150px;top:150px',78.4,83.0);
ov('<small>PENGHALANG YANG SEHARUSNYA MUSTAHIL DITEMBUS</small><b>efek terowongan kuantum</b>','left:150px;top:150px',83.4,89.0);
ov('<small>PRINSIP KETIDAKPASTIAN HEISENBERG</small><b>Δx · Δp ≥ ħ/2</b>','left:150px;top:150px',89.4,96.4);
ov('<small>DUNIA KUANTUM</small><b>kabur, <i>bergetar</i></b>','left:150px;top:150px',96.8,101.2);
function wave(pos,xc,k,A,w,dir){ for(let i=0;i<240;i++){ const x=xc-6+i*.05; const e=Math.exp(-Math.pow((x-xc)/w,2)); pos[i*3]=x; pos[i*3+1]=A*e*Math.sin(k*(x-xc)*dir); pos[i*3+2]=0; } }
function s4(t){ G4.visible=true; kubah.visible=true; KUB.uMix.value=.97;
  { const P=CL.geometry.attributes.position.array, Co=CL.geometry.attributes.color.array, r=rng(Math.floor(t*14)+1), N=6000; const cloud=sstep(79.6,81.4,t), bohr=1-cloud;
    for(let i=0;i<N;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u); const rad=(.4+Math.pow(r(),1.3)*2.4)*(1+.06*Math.sin(t*20+i)); const on=r()<(.2+.8*cloud)?1:0;
      P[i*3]=q*Math.cos(a)*rad;P[i*3+1]=u*rad;P[i*3+2]=q*Math.sin(a)*rad; const f=on*(.35+r()*.9)*Math.max(.15,cloud); Co[i*3]=.9*f;Co[i*3+1]=2.2*f;Co[i*3+2]=2.0*f; }
    CL.geometry.attributes.position.needsUpdate=CL.geometry.attributes.color.needsUpdate=true; CL.visible=t<84.4; NUC4.visible=t<84.4;
    const a=t*3; EL4.visible=t<81.6&&t>77.2; EL4.position.set(Math.cos(a)*1.8,0,Math.sin(a)*1.8); EL4.scale.setScalar(bohr+.001); ORB4.visible=t<81.6&&t>77.2; ORB4.material.opacity=.6*bohr; }
  const tp=t-84.0, hit=.9; const vv=5.0; const xi=TX0-6.4+vv*Math.min(tp,hit+0.001);
  const inc=t>=82.4&&t<84.8+hit, ref=t>=84.9, trn=t>=84.9;
  WV[0].visible=t>=83.8&&t<86.4; wave(WV[0].geometry.attributes.position.array,TX0-5+vv*(Math.min(t,84.9)-83.8)*.9,9,1.0*(1-sstep(84.2,85.2,t)),.7,1); WV[0].geometry.attributes.position.needsUpdate=true;
  WV[1].visible=t>=84.9&&t<94; wave(WV[1].geometry.attributes.position.array,TX0-.4-vv*.9*(t-84.9),9,.8,.7,-1); WV[1].geometry.attributes.position.needsUpdate=true;
  WV[2].visible=t>=84.9&&t<94; wave(WV[2].geometry.attributes.position.array,TX0+.4+vv*.9*(t-84.9),9,.4,.7,1); WV[2].geometry.attributes.position.needsUpdate=true;
  BAR.visible=t>=83.0&&t<94.2; PART4.position.set(TX0+1.6+Math.min(3,(t-84.9)*3*.8),.1*Math.sin(t*30),0); PART4.visible=t>=84.9&&t<94&&(Math.sin(t*40)>-.3);
  const hs=t>=89.2; HZ.visible=hs&&t<101.5; HZ.scale.setScalar(lerp(2.6,.45,E.io(seg(t,91.8,95.4)))*(1+.15*Math.sin(t*25)))*0;
  const hsz=lerp(2.6,.45,E.io(seg(t,91.8,95.4))); HZ.scale.setScalar(hsz*(1+.08*Math.sin(t*25)));
  HARR.forEach((a,i)=>{ a.visible=hs&&t<101.5; const th=i/HARR.length*6.283, sp=lerp(.5,2.8,E.io(seg(t,91.8,95.4))); const d=V3(Math.cos(th),Math.sin(th*1.7),Math.sin(th)).normalize(); a.setDirection(d); a.setLength(sp*(.7+.3*Math.sin(t*9+i)),.14,.1); a.position.set(HX0,0,0); });
  const K=[[73.5,[0,.8,7],[0,0,0]],[78,[2.5,1.4,5.5],[0,0,0]],[82.6,[2.2,1.0,5.2],[0,0,0]],[84.6,[TX0-3,1.2,6.6],[TX0-.5,0,0]],[89,[TX0+6,1.5,6],[TX0+2,0,0]],[90.5,[HX0-1.5,1.0,5.5],[HX0,0,0]],[96,[HX0+1.5,.6,4.6],[HX0,0,0]],[102,[HX0+2,.8,4.5],[HX0,0,0]]];
  const tr=trk(t,K); const wob=.03+.05*sstep(95,100,t); setCam(vOf(tr[0]),vOf(tr[1]),wob);
  kunci.intensity=.8; rim.intensity=1.0; hemi.intensity=.2; hemi.color.set(0x406070); PP={ex:1.05,bl:1.0,vig:.65,hangat:0,sat:1.15,tilt:.55}; }
/* ============ ADEGAN 5: jam pasir, tabrakan, gelas pecah ============ */
const G5=new THREE.Group(); G5.visible=false; S.add(G5);
const fl5=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({map:gridTex('#0b1a1f','rgba(127,240,220,.35)'),roughness:.8,metalness:.1,emissive:C('#06161a'),emissiveIntensity:.5})); fl5.rotation.x=-Math.PI/2; G5.add(fl5);
const glassM=new THREE.MeshStandardMaterial({color:C('#bfe8f0'),transparent:true,opacity:.2,roughness:.05,metalness:.2,side:THREE.DoubleSide,emissive:C('#2a6a74'),emissiveIntensity:.2,depthWrite:false});
const HG=new THREE.Group(); G5.add(HG); HG.position.set(0,0,0);
{ const prof=[]; for(let i=0;i<=20;i++){ const u=i/20; prof.push(new THREE.Vector2(.08+.9*Math.sin(Math.PI*Math.min(1,u*1.1)*.5)**1.4*(u<.9?1:1)*0+ (u<.5? .08+ (1.0-.08)*Math.sin(u*Math.PI) : .08), (u)*1.1)); }
  const pt=[]; for(let i=0;i<=24;i++){ const u=i/24; pt.push(new THREE.Vector2(.06+.95*Math.pow(Math.sin(Math.PI*u),.7)*(1-u*.0), u*1.2)); }
  const top=new THREE.Mesh(new THREE.LatheGeometry(pt.map(p=>new THREE.Vector2(p.x,p.y)),48),glassM); top.position.y=1.2; HG.add(top);
  const bot=new THREE.Mesh(new THREE.LatheGeometry(pt.map(p=>new THREE.Vector2(p.x,1.2-p.y)),48),glassM); bot.position.y=0; HG.add(bot);
  const woodM=new THREE.MeshStandardMaterial({color:C('#6a4a2e'),roughness:.6,metalness:.1,emissive:C('#2a1608'),emissiveIntensity:.3});
  [0,2.4].forEach(y=>{ const d=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,.12,48),woodM); d.position.y=y-.05+(y?.1:0); HG.add(d); });
  for(let i=0;i<3;i++){ const a=i/3*6.283; const p=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,2.4,12),woodM); p.position.set(Math.cos(a)*1.0,1.2,Math.sin(a)*1.0); HG.add(p); } }
const sandM=()=>new THREE.PointsMaterial({size:.035,map:SPRW,color:C('#ffcf8a').multiplyScalar(1.6),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});
const sandG=n=>{ const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3)); return g; };
const SAND_T=new THREE.Points(sandG(900),sandM()), SAND_B=new THREE.Points(sandG(900),sandM()), SAND_S=new THREE.Points(sandG(140),sandM()); [SAND_T,SAND_B,SAND_S].forEach(s=>{ s.frustumCulled=false; HG.add(s); });
function sandUpd(t){ const p=clamp((t-102.5)/26,0,.95); const set=(pts,n,f)=>{ const P=pts.geometry.attributes.position.array, r=rng(7); for(let i=0;i<n;i++){ const a=r()*6.283, u=Math.sqrt(r()), y01=r(); f(P,i,a,u,y01); } pts.geometry.attributes.position.needsUpdate=true; };
  const hT=(1-p)*.95, hB=p*.95;
  set(SAND_T,900,(P,i,a,u,y)=>{ const h=hT*y; const rad=Math.min(.9,.15+(1-y)*.75*Math.max(.08,hT))*u+.0; P[i*3]=Math.cos(a)*rad;P[i*3+1]=1.2+.08+h*.55*(1)+0; P[i*3+2]=Math.sin(a)*rad; if(hT<.03){ P[i*3+1]=-9; } });
  set(SAND_B,900,(P,i,a,u,y)=>{ const h=hB*(1-y*y)*.75; const rad=(.9*(1-y))*u*Math.min(1,hB*1.2+.05); P[i*3]=Math.cos(a)*rad;P[i*3+1]=.1+Math.max(0,h*(1-u)); P[i*3+2]=Math.sin(a)*rad; if(hB<.03){ P[i*3+1]=-9; } });
  { const P=SAND_S.geometry.attributes.position.array, r=rng(9); for(let i=0;i<140;i++){ const f=((r()+t*1.1)%1); P[i*3]=(r()-.5)*.03;P[i*3+1]=1.15-f*(1.15-.15-hB*.55);P[i*3+2]=(r()-.5)*.03; } SAND_S.geometry.attributes.position.needsUpdate=true; SAND_S.visible=p<.95; } }
const BA=new THREE.Mesh(new THREE.SphereGeometry(.35,32,20),new THREE.MeshStandardMaterial({color:C('#ffb066'),roughness:.3,metalness:.4,emissive:C('#a04a10'),emissiveIntensity:.5})), BB=new THREE.Mesh(new THREE.SphereGeometry(.35,32,20),new THREE.MeshStandardMaterial({color:C('#7ff0dc'),roughness:.3,metalness:.4,emissive:C('#108a78'),emissiveIntensity:.5})); BA.position.y=.35; BB.position.y=.35; G5.add(BA,BB);
function bolaUpd(t){ const c=(t-108.2)%4, ph=c<2?c:4-c; const x=ph<1?lerp(-4.2,-.4,ph):-.4; const xb=ph<1?.4:lerp(.4,4.2,(ph-1)); BA.position.x=x+7; BB.position.x=xb+7; BA.rotation.z=-x*2; BB.rotation.z=-xb*2; $('#mnd').textContent=c<2?'▶  maju':'◀  mundur'; }
const GL=new THREE.Group(); G5.add(GL); { const pr=[[.0,0],[.5,0],[.5,.04],[.05,.07],[.04,.7],[.38,.95],[.4,1.5],[.34,1.52],[.32,1.0],[.0,.78]].map(a=>new THREE.Vector2(a[0],a[1])); const gm=new THREE.Mesh(new THREE.LatheGeometry(pr,48),new THREE.MeshStandardMaterial({color:C('#cfeff5'),transparent:true,opacity:.35,roughness:.05,metalness:.2,side:THREE.DoubleSide,emissive:C('#2a7a84'),emissiveIntensity:.25,depthWrite:false})); GL.add(gm); GL.userData.m=gm; }
const NS=70, SHM=new THREE.InstancedMesh(new THREE.TetrahedronGeometry(1,0),new THREE.MeshStandardMaterial({color:C('#cfeff5'),transparent:true,opacity:.7,roughness:.05,metalness:.3,emissive:C('#2a7a84'),emissiveIntensity:.3,flatShading:true}),NS); SHM.frustumCulled=false; G5.add(SHM);
const GX0=-5, TI=119.0, SIM=[]; { const r=rng(13); const sh=[]; for(let i=0;i<NS;i++){ const a=r()*6.283,h=.1+r()*1.2,rd=.05+r()*.4; sh.push({p:V3(GX0+Math.cos(a)*rd,h+.15,Math.sin(a)*rd),v:V3(Math.cos(a)*(1+r()*3.2),1+r()*3.2,Math.sin(a)*(1+r()*3.2)),s:.04+r()*.1,q:V3(r()*6,r()*6,r()*6),w:V3((r()-.5)*14,(r()-.5)*14,(r()-.5)*14)}); }
  const dt=1/60; for(let k=0;k<900;k++){ SIM.push(sh.map(o=>[o.p.x,o.p.y,o.p.z,o.q.x,o.q.y,o.q.z])); sh.forEach(o=>{ o.v.y-=9.8*dt; o.p.addScaledVector(o.v,dt); o.q.addScaledVector(o.w,dt); if(o.p.y<o.s){ o.p.y=o.s; o.v.y*=-.32; o.v.x*=.7; o.v.z*=.7; o.w.multiplyScalar(.75); if(Math.abs(o.v.y)<.4) o.v.y=0; } }); } SIM.sizes=sh.map(o=>o.s); }
const _o=new THREE.Object3D();
function glasUpd(t){ const fall=t>=118.1; const y=fall?Math.max(.0,3.0-4.9*Math.pow(Math.min(t-118.1,.85),2)):3.0; GL.position.set(GX0,y,0); GL.rotation.z=fall?.3*(t-118.1):0; const broke=t>=TI; GL.visible=!broke&&t>=114;
  SHM.visible=broke; if(broke){ const k=Math.min(SIM.length-1,Math.floor((t-TI)*60)); for(let i=0;i<NS;i++){ const s=SIM[k][i]; _o.position.set(s[0],s[1],s[2]); _o.rotation.set(s[3],s[4],s[5]); _o.scale.setScalar(SIM.sizes[i]); _o.updateMatrix(); SHM.setMatrixAt(i,_o.matrix); } SHM.instanceMatrix.needsUpdate=true; } }
ov('<small>PERSAMAAN DASAR FISIKA</small><b>maju atau mundur: <i id="mnd">▶  maju</i></b>','left:150px;top:150px',108.2,112.6);
ov('<small>ENTROPI · UKURAN KETIDAKTERATURAN</small><b>cenderung <i>bertambah</i></b>','left:150px;top:150px',112.8,117.2);
ov('<small>PECAH BISA · MENYATU KEMBALI TIDAK</small>','left:150px;top:150px',120.3,123.6);
ov('<small>PANAH WAKTU</small><b>entropi = <i>panah waktu</i> →</b>','left:150px;top:150px',123.9,130.6);
ov('<small>JAM PASIR · DUNIA KECIL MAUPUN BESAR</small>','left:150px;top:150px',103.0,108.0);
const EN=ov('<small>ENTROPI</small><div class="trk" style="width:420px"><i id="enb" class="am"></i></div>','right:150px;top:150px',112.8,130.6);
function s5(t){ G5.visible=true; kubah.visible=true; KUB.uMix.value=.75; sandUpd(t); bolaUpd(t); glasUpd(t);
  const eb=clamp((t-112.8)/16)*.35+(t>=TI?E.out(clamp((t-TI)/6))*.6:0); $('#enb').style.width=(eb*100).toFixed(1)+'%';
  const K=[[102.5,[0,1.5,7.5],[0,1.1,0]],[107,[.5,1.6,7],[0,1.1,0]],[109.5,[7.5,1.6,8],[7,.6,0]],[113,[2.5,1.8,9],[1.5,1.0,0]],[116.5,[-3.2,2,6.4],[GX0,1.3,0]],[119.2,[-3.8,1.6,5.4],[GX0,.5,0]],[124,[-1,2.6,8],[GX0+.5,.4,0]],[131,[0,3.2,10],[-2,.4,0]]];
  const tr=trk(t,K); setCam(vOf(tr[0]),vOf(tr[1]),.012+.02*Math.exp(-Math.abs(t-TI)*2)); kunci.intensity=1.6; kunci.color.set(0xffc58a); rim.intensity=2.0; hemi.intensity=.25; hemi.color.set(0x405a64);
  PP={ex:1.02,bl:.8,vig:.6,hangat:.15,sat:1.1,tilt:0}; }
/* ============ ADEGAN 6: dilatasi waktu ============ */
const G6=new THREE.Group(); G6.visible=false; S.add(G6);
const ISS=new THREE.Group(); { const wm=new THREE.MeshStandardMaterial({color:C('#e8e8ee'),metalness:.6,roughness:.4}), sm=new THREE.MeshStandardMaterial({color:C('#1a2f6a'),metalness:.7,roughness:.3,emissive:C('#0a1a4a'),emissiveIntensity:.5}), gm=new THREE.MeshStandardMaterial({color:C('#bfa060'),metalness:.8,roughness:.4});
  ISS.add(new THREE.Mesh(new THREE.BoxGeometry(14,.35,.35),wm)); [-5.5,-2.5,2.5,5.5].forEach(x=>[-1,1].forEach(s=>{ const p=new THREE.Mesh(new THREE.BoxGeometry(2.6,.04,6.5),sm); p.position.set(x,0,s*4); ISS.add(p); }));
  [[0,0,0,1.0,3.2],[ -2,0,0,.7,2.6],[2,0,0,.7,2.6]].forEach(([x,y,z,r,l])=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.5,r*.5,l,20),wm); m.rotation.z=Math.PI/2; m.position.set(x,y-.6,z); ISS.add(m); }); const rm=new THREE.Mesh(new THREE.BoxGeometry(.5,.6,3),gm); rm.position.set(0,0,0); ISS.add(rm); } G6.add(ISS);
const GPSA=[0,1,2,3].map(i=>{ const g=new THREE.Group(); const b=new THREE.Mesh(new THREE.BoxGeometry(2.4,2.4,3),new THREE.MeshStandardMaterial({color:C('#c9a24a'),metalness:.8,roughness:.35})); g.add(b); [-1,1].forEach(s=>{ const p=new THREE.Mesh(new THREE.BoxGeometry(6,.06,2.6),new THREE.MeshStandardMaterial({color:C('#1a2f6a'),metalness:.7,roughness:.3,emissive:C('#0a1a4a'),emissiveIntensity:.5})); p.position.set(s*4.8,0,0); g.add(p); }); G6.add(g); return g; });
const ORBL=(r,inc,col)=>{ const p=[]; for(let i=0;i<=200;i++){ const a=i/200*6.283; p.push(r*Math.cos(a),r*Math.sin(a)*Math.sin(inc),r*Math.sin(a)*Math.cos(inc)); } const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(p,3)); const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:C(col).multiplyScalar(1.3),transparent:true,opacity:.5})); G6.add(l); return l; };
ORBL(112,51.6*DEG,'#7ff0dc'); ORBL(205,55*DEG,'#ffb066');
const orbPos=(r,inc,a,rot)=>{ const p=V3(r*Math.cos(a),r*Math.sin(a)*Math.sin(inc),r*Math.sin(a)*Math.cos(inc)); p.applyAxisAngle(V3(0,1,0),rot||0); return p; };
const JE=document.createElement('canvas'); JE.width=JE.height=260; JE.className='jam'; JE.style.cssText='left:150px;top:520px'; $('#stage').appendChild(JE);
const JO=document.createElement('canvas'); JO.width=JO.height=260; JO.className='jam'; JO.style.cssText='left:470px;top:520px'; $('#stage').appendChild(JO);
function jam(cv,t,rate,lbl,col){ const x=cv.getContext('2d'); x.clearRect(0,0,260,260); x.strokeStyle=col; x.lineWidth=5; x.shadowColor=col; x.shadowBlur=14; x.beginPath(); x.arc(130,120,98,0,6.283); x.stroke(); x.shadowBlur=0;
  for(let i=0;i<12;i++){ const a=i/12*6.283; x.beginPath(); x.moveTo(130+Math.sin(a)*84,120-Math.cos(a)*84); x.lineTo(130+Math.sin(a)*94,120-Math.cos(a)*94); x.lineWidth=3; x.stroke(); }
  const s=t*rate*.8, m=s/60; x.lineCap='round'; x.strokeStyle='#F2EDE6'; x.lineWidth=7; x.beginPath(); x.moveTo(130,120); x.lineTo(130+Math.sin(m*6.283)*50,120-Math.cos(m*6.283)*50); x.stroke();
  x.strokeStyle=col; x.lineWidth=4; x.beginPath(); x.moveTo(130,120); x.lineTo(130+Math.sin(s*6.283/10)*82,120-Math.cos(s*6.283/10)*82); x.stroke();
  x.fillStyle='#F2EDE6'; x.font='500 26px Outfit'; x.textAlign='center'; x.fillText(lbl,130,248); }
ov('<small>DILATASI WAKTU</small><b>terbukti secara ilmiah</b>','left:150px;top:150px',133.5,136.9);
ov('<small>BERGERAK CEPAT · GRAVITASI KUAT</small><b>waktu <i>melambat</i></b>','left:150px;top:150px',137.0,143.4);
ov('<small>ISS · ±7,7 KM/DETIK</small><b>+ ±5 milidetik / 6 bulan</b>','left:150px;top:150px',143.8,149.6);
ov('<small>SATELIT GPS</small><b>+ 38 mikrodetik / hari</b><div style="margin-top:12px;font:500 28px Outfit;letter-spacing:.08em;color:#CBD3D6">TANPA KOREKSI: MELESET ±11 KM PER HARI</div>','left:150px;top:150px',150.0,157.6);
lab('ISS','#7ff0dc',60,-60,143.8,149.6,()=>pj(ISS.position),46);
lab('satelit GPS','#ffb066',60,-60,150.2,157.6,()=>pj(GPSA[0].position),46);
function s6(t){ G6.visible=true; bumi.visible=atmos.visible=true; bumi.position.set(0,0,0); atmos.position.set(0,0,0); STARS.visible=true; kubah.visible=true; KUB.uMix.value=1; UB.uT.value=t; bumi.rotation.y=t*.02; UB.uSun.value.copy(ARAH_MATAHARI);
  const a=t*.3; ISS.position.copy(orbPos(112,51.6*DEG,a)); ISS.rotation.y=.4; ISS.scale.setScalar(1.3);
  GPSA.forEach((g,i)=>{ g.position.copy(orbPos(205,55*DEG,t*.07+i*1.57,i*1.57)); g.lookAt(0,0,0); });
  const iss=ISS.position;
  const K=[[131.5,[-60,40,330],[0,0,0]],[137,[120,60,300],[0,0,0]],[142.5,[200,30,200],[0,0,0]]];
  let pos,tg; if(t<143.2){ const tr=trk(t,K); pos=vOf(tr[0]); tg=vOf(tr[1]); } else if(t<149.8){ const k=E.io(seg(t,143.2,145.4)); const out=iss.clone().normalize(), sd=V3().crossVectors(out,V3(0,1,0)).normalize(); const off=out.clone().multiplyScalar(14).add(sd.multiplyScalar(18)).add(V3(0,5,0)); const p1=iss.clone().add(off), t1=iss.clone(); pos=V3(200,30,200).lerp(p1,k); tg=V3(0,0,0).lerp(t1,k); } else { const k=E.io(seg(t,149.8,152.4)); const p1=V3(120,330,380), g=GPSA[0].position.clone(); pos=(iss.clone().add(iss.clone().normalize().multiplyScalar(14)).add(V3().crossVectors(iss.clone().normalize(),V3(0,1,0)).normalize().multiplyScalar(18)).add(V3(0,5,0))).lerp(p1,k); tg=iss.clone().lerp(V3(0,40,0),k); }
  setCam(pos,tg,.01); FOV=32; kunci.position.copy(ARAH_MATAHARI).multiplyScalar(50); kunci.intensity=3.2; rim.intensity=.5; hemi.intensity=.2; hemi.color.set(0x405060);
  PP={ex:1.0,bl:.8,vig:.55,hangat:.2,sat:1.05,tilt:0};
  const ja=sstep(137.6,138.6,t)*(1-sstep(157.0,157.8,t)); JE.style.opacity=JO.style.opacity=ja.toFixed(3); if(ja>.01){ jam(JE,t-137,1,'di Bumi','#ffb066'); jam(JO,t-137,.86,'di orbit','#7ff0dc'); }
  [JE,JO].forEach(c=>c.style.top='560px'); }
/* ============ ADEGAN 7: penutup ============ */
const G7=new THREE.Group(); G7.visible=false; S.add(G7);
const AT7=new THREE.Points(ST[5].cl.geometry,new THREE.PointsMaterial({size:.05,map:SPRW,color:C('#ffd9a0').multiplyScalar(1.8),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); AT7.position.set(2.8,1.4,0); G7.add(AT7);
const NU7=new THREE.Mesh(new THREE.SphereGeometry(.07,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(4,3,2)})); NU7.position.copy(AT7.position); G7.add(NU7);
const HG7=HG.clone(); HG7.position.set(-2.8,0,0); G7.add(HG7);
const fl7=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({color:C('#1c120c'),roughness:.7,metalness:.2})); fl7.rotation.x=-Math.PI/2; G7.add(fl7);
const HW=mkSpr('#ffb066',.8); G7.add(HW); S.remove(HW); HW.position.set(0,2,-6); HW.scale.set(26,16,1);
ov('<b style="font-size:84px">Mengecil tidak membawa kita<br>ke <i>masa lalu</i></b>','left:150px;top:150px',160.2,164.0);
ov('<small>TAPI DUNIA ATOM TETAP</small><b>tempat paling <i>aneh</i> di alam semesta</b>','left:150px;top:150px',164.2,167.6);
ov('<b style="font-size:96px;font-style:italic;text-align:center">ke masa depan,<br>atau ke masa lalu?</b>','left:0;right:0;top:230px;text-align:center',168.2,177.4,.9,.5);
function s7(t){ G7.visible=true; kubah.visible=true; KUB.uMix.value=.12; HW.visible=true; sandUpd(t+0); HG7.children.forEach(c=>{}); AT7.rotation.y=t*.4; AT7.visible=true; AT7.scale.setScalar(2.1);
  const K=[[160,[-.5,1.6,9],[0,1.2,0]],[168,[1.5,1.8,8.2],[.2,1.3,0]],[178,[3,2.4,10.5],[0,1.2,0]]];
  const tr=trk(t,K); setCam(vOf(tr[0]),vOf(tr[1]),.012); kunci.intensity=1.5; kunci.color.set(0xffb27a); rim.intensity=1.2; rim.color.set(0xffd9a0); hemi.intensity=.35; hemi.color.set(0x8a7a6a);
  PP={ex:1.05,bl:.85,vig:.55,hangat:.55,sat:1.1,tilt:0}; }

/* ============ DISPATCH ============ */
const SC=[0,45,73,102,131,159.5,178], DIPS=[45,73,102,131,159.5];
let PP={ex:1,bl:.7,vig:.55,hangat:.3,sat:1.08,tilt:0};
function hideAll(){ [GA,G3,G4,G5,G6,G7,bumi,atmos,FOSS].forEach(o=>o.visible=false); STARS.visible=false; FOV=32; rim.color.set(0x6fe0d0); kunci.color.set(0xffb27a); kunci.position.set(6,5,8); }
let subY=H*.88;
function gambar(t){ TT=t; hideAll();
  const k=Math.max(0,SC.findIndex((v,i)=>i<6&&t>=v&&t<SC[i+1])); [sA,s3,s4,s5,s6,s7][k](t);
  if(k!==5){ JE.style.opacity=0; JO.style.opacity=0; } if(k!==4){ JE.style.opacity=0; JO.style.opacity=0; }
  kubah.position.copy(cam.position); STARS.position.copy(cam.position);
  REN.setRenderTarget(RT); REN.render(S, cam);
  pSalin.uniforms.t.value = RT.texture; lewat(pSalin, R2);
  pTerang.uniforms.t.value = R2.texture; pTerang.uniforms.th.value = 1.0; lewat(pTerang, B4a); blur2(B4a, B4b, 1.2); blur2(B4a, B4b, 2.4);
  pSalin.uniforms.t.value = B4a.texture; lewat(pSalin, B8a); blur2(B8a, B8b, 1.6); blur2(B8a, B8b, 3.2);
  pSalin.uniforms.t.value = R2.texture; lewat(pSalin, RTS); blur2(RTS, RTSb, 1.5); blur2(RTS, RTSb, 2.5);
  const U=AKHIR.uniforms; Object.assign(U.tS,{value:RT.texture}); U.tB1.value=B4a.texture; U.tB2.value=B8a.texture; U.tR.value=RRAY.texture; U.tT.value=RTS.texture;
  U.ry.value=0; U.fok.value=.5; U.tilt.value=PP.tilt; U.ex.value=PP.ex; U.bl.value=PP.bl; U.vig.value=PP.vig; U.hangat.value=PP.hangat; U.sat.value=PP.sat;
  let g=1-sstep(0,.5,t); DIPS.forEach(d=>{ g=Math.max(g,1-Math.abs(t-d)/.5); }); g=Math.max(g,sstep(177,178,t)); U.gelap.value=clamp(g);
  lewat(AKHIR,null); ovUpd(t); lblUpd(t);
  Object.assign($('#vSub').style,{left:'260px',width:'1400px',top:(subY-180)+'px',height:'330px',opacity:t>.6&&t<177?.85:0});
}
const SCENE = {
  dur: DUR, kata: KATA,
  sub:{gaya:'polos',maks:4,font:`800 52px '${FONT.sub}'`,warna:PAL.teks,aksen:PAL.aksen,kunci:['kuantum,','mengizinkannya?','atom.','atom,','dnA,','dna,','semut,','sel,','neuron','miliar.','berat.','padat','probabilitas.','terowongan','kuantum.','heisenberg,','bergetar.','entropi,','waktu,','dilatasi','einstein.','lambat.','gps','masa','lalu?','depan,','aneh'],y:()=>({x:W/2,y:subY})},
  audio: __AUDIO__,
  muat:()=>Promise.all([document.fonts.load(`500 100px '${FONT.judul}'`),document.fonts.load(`italic 500 100px '${FONT.judul}'`),document.fonts.load(`800 60px '${FONT.sub}'`),document.fonts.load(`500 24px 'Outfit'`)]),
  build(tl){ grainOn(.05); },
  frame(t){ gambar(t); }
};
