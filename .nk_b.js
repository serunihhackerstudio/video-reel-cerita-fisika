/* ============ HELPER ============ */
function catmull(a,b,c,d,k){ return b.map((_,i)=>.5*(2*b[i]+(c[i]-a[i])*k+(2*a[i]-5*b[i]+4*c[i]-d[i])*k*k+(3*b[i]-a[i]-3*c[i]+d[i])*k*k*k)); }
function trk(t,K){ const n=K.length; let i=0; while(i<n-2&&t>K[i+1][0]) i++; const k=E.s(clamp((t-K[i][0])/(K[i+1][0]-K[i][0]))); const g=(j,x)=>K[clamp(j,0,n-1)][x];
  return [catmull(g(i-1,1),g(i,1),g(i+1,1),g(i+2,1),k), catmull(g(i-1,2),g(i,2),g(i+1,2),g(i+2,2),k)]; }
let TT=0, FOV=32;
function setCam(pos,tg,shake){ const sh=shake||0; cam.position.set(pos.x+nz(TT*.9,1)*sh,pos.y+nz(TT*1.1,2)*sh,pos.z+nz(TT*.8,3)*sh);
  const d=cam.position.distanceTo(tg); cam.fov=FOV; cam.near=Math.max(.05,d*.002); cam.far=Math.max(3000,d*40); cam.updateProjectionMatrix(); cam.lookAt(tg); cam.updateMatrixWorld(); }
const vOf = a => V3(a[0],a[1],a[2]);
const pj = v => { const w=v.clone().project(cam); return [(w.x*.5+.5)*W,(-w.y*.5+.5)*H]; };
const OV=[]; function ov(html,css,a,b,fi,fo){ const e=document.createElement('div'); e.className='ov'; e.style.cssText=css; e.innerHTML=html; $('#stage').appendChild(e); OV.push({e,a,b,fi:fi||.7,fo:fo||.6}); return e; }
function ovUpd(t){ OV.forEach(o=>{ const k=seg(t,o.a,o.a+o.fi)*(1-seg(t,o.b-o.fo,o.b)); o.e.style.opacity=k.toFixed(3); o.e.style.visibility=k>.002?'visible':'hidden'; }); }
const LBL=[]; function lab(teks,warna,dx,dy,a,b,pos,ukuran){ const l=label({dx,dy,teks,warna,font:`'${FONT.judul}'`,ukuran:ukuran||50,tebal:600}); LBL.push({l,a,b,pos}); return l; }
function lblUpd(t){ LBL.forEach(o=>{ const p=(t>=o.a-.2&&t<=o.b+.2)?o.pos():null; if(p) o.l.atur(t,o.a,o.b,p[0],p[1]); else o.l.atur(t,-9,-8,0,0); }); }
const GLSL_N = GLSL_NOISE;
const SPRW = (() => { const c=kanvas(256,256), x=c.getContext('2d'); const g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.1,'rgba(255,255,255,.85)'); g.addColorStop(.3,'rgba(255,255,255,.25)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); })();
const mkSpr = (col,mult) => { const s=new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C(col).multiplyScalar(mult||1),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true})); s.visible=false; S.add(s); return s; };
const PROTON = () => new THREE.MeshStandardMaterial({color:C('#ff6a52'),emissive:C('#ff3a1e'),emissiveIntensity:.6,roughness:.35,metalness:.1,transparent:true});
const NEUTRON = () => new THREE.MeshStandardMaterial({color:C('#86a8ff'),emissive:C('#3a5cff'),emissiveIntensity:.6,roughness:.35,metalness:.1,transparent:true});
function nukleus(n,R,r,seed){ const rg=rng(seed), P=[]; let g=0; while(P.length<n&&g++<8000){ const p=V3((rg()-.5)*2,(rg()-.5)*2,(rg()-.5)*2); if(p.length()>1) continue; p.multiplyScalar(R); if(P.every(q=>q.distanceTo(p)>r*1.75)) P.push(p); }
  return P.map((p,i)=>({p,proton:i%2===0})); }

/* ============ ADEGAN 2: molekul vs inti ============ */
const GB = new THREE.Group(); GB.visible=false; S.add(GB);
const molA=[[0,0,0],[1.5,0,0],[-.7,1.2,.3],[-.7,-1.2,-.2],[2.2,1.2,.4],[2.2,-1.2,-.3],[0,0,1.5]].map(a=>V3(...a)), molB=[[.4,.3,0],[-1.2,.9,.5],[1.6,-.6,.6],[-.2,-1.5,-.1],[2.4,.7,-.5],[.9,1.7,.2],[-1.0,-.3,-1.2]].map(a=>V3(...a));
const molCol=['#9aa3b5','#e8e8f2','#e8e8f2','#e8e8f2','#ff6a52','#ff6a52','#9aa3b5'];
const molM = molA.map((p,i)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(i==0||i==6?.45:i>3?.4:.28,32,20),new THREE.MeshStandardMaterial({color:C(molCol[i]),roughness:.4,metalness:.2,emissive:C(molCol[i]).multiplyScalar(.12)})); GB.add(m); return m; });
const bondA=[[0,1],[0,2],[0,3],[1,4],[1,5],[0,6]], bondB=[[0,5],[1,2],[2,6],[3,4],[0,1],[4,5]];
const bondG=new THREE.BufferGeometry(); bondG.setAttribute('position',new THREE.BufferAttribute(new Float32Array((bondA.length+bondB.length)*6),3)); bondG.setAttribute('color',new THREE.BufferAttribute(new Float32Array((bondA.length+bondB.length)*6),3));
const bonds=new THREE.LineSegments(bondG,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); bonds.frustumCulled=false; GB.add(bonds);
const MOLP = V3(-9,1.4,0);
const sparkG=new THREE.BufferGeometry(); sparkG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(90*3),3));
const sparks=new THREE.Points(sparkG,new THREE.PointsMaterial({size:.12,map:SPRW,color:C('#ffb36a').multiplyScalar(2),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); sparks.frustumCulled=false; GB.add(sparks);
const NUC2P = V3(9,1.8,0), N2 = nukleus(18,1.0,.34,4), N2M = N2.map(q=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(.34,24,16), q.proton?PROTON():NEUTRON()); GB.add(m); return m; });
const flash2 = mkSpr('#ffe2b0',5); const shock2 = mkSpr('#ffb070',2.5); GB.add(flash2,shock2); S.remove(flash2); S.remove(shock2);
const NEU2 = [0,1,2].map(i=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(.14,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(4,4.5,5)})); GB.add(m); return m; });
const ringL=new THREE.Mesh(new THREE.RingGeometry(3.6,3.8,96),new THREE.MeshBasicMaterial({color:C('#ffb36a').multiplyScalar(.6),transparent:true,opacity:.5,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false})); ringL.rotation.x=-Math.PI/2; ringL.position.set(MOLP.x,-.45,0); GB.add(ringL);
const ringR=ringL.clone(); ringR.material=new THREE.MeshBasicMaterial({color:C('#7a96ff').multiplyScalar(.7),transparent:true,opacity:.5,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false}); ringR.position.x=NUC2P.x; GB.add(ringR);
const light2 = new THREE.PointLight(C('#ffd0a0'),0,60,1.5); light2.position.copy(NUC2P); GB.add(light2);
function s2(t){ GB.visible=true; lantai.visible=true; S.fog.density=.016; titik.visible=false;
  const k=E.io(seg(t,15.9,18.2)), P=molA.map((a,i)=>a.clone().lerp(molB[i],k)); molM.forEach((m,i)=>{ m.position.copy(P[i]).add(MOLP).add(V3(0,Math.sin(t*1.6+i)*.06,0)); m.scale.setScalar(sstep(10.5,11.4,t)); });
  { const pos=bondG.attributes.position.array, col=bondG.attributes.color.array; const al=sstep(10.8,11.6,t); let n=0;
    bondA.forEach(b=>{ const a=molM[b[0]].position,c=molM[b[1]].position; pos.set([a.x,a.y,a.z,c.x,c.y,c.z],n*6); const f=(1-k)*al*2.2; col.set([1.2*f,.7*f,.3*f,1.2*f,.7*f,.3*f],n*6); n++; });
    bondB.forEach(b=>{ const a=molM[b[0]].position,c=molM[b[1]].position; pos.set([a.x,a.y,a.z,c.x,c.y,c.z],n*6); const f=k*al*2.2; col.set([1.2*f,.7*f,.3*f,1.2*f,.7*f,.3*f],n*6); n++; });
    bondG.attributes.position.needsUpdate=bondG.attributes.color.needsUpdate=true; }
  { const sp=sparkG.attributes.position.array, a=seg(t,17.6,20.2); const r=rng(8); for(let i=0;i<90;i++){ const th=r()*6.283,ph=r()*3.1416,sp_=.5+r()*1.6,d=a*sp_*(1+i%3*.4); sp.set([MOLP.x+Math.sin(ph)*Math.cos(th)*d*1.4,MOLP.y+Math.cos(ph)*d,Math.sin(ph)*Math.sin(th)*d],i*3); } sparkG.attributes.position.needsUpdate=true; sparks.material.opacity=a>0&&a<1?(1-a)*.9:0; }
  const nk=sstep(20.6,22.0,t), tf=24.9, sh=seg(t,21.8,tf)*(1-seg(t,tf,tf+.1)); const sp=E.out(seg(t,tf,tf+3.2));
  N2.forEach((q,i)=>{ const jig=sh*.12; const side=q.p.x>=0?1:-1; const o=q.p.clone().add(V3(Math.sin(t*40+i)*jig,Math.cos(t*37+i)*jig,Math.sin(t*33+i*2)*jig)); o.x+=side*sp*7; o.y+=(q.p.y*sp*1.1); o.z+=q.p.z*sp*1.2;
    N2M[i].position.copy(o).add(NUC2P); N2M[i].scale.setScalar(nk*(t<tf?1:Math.max(.0001,1-seg(t,tf+2.2,tf+4.2)))); N2M[i].material.opacity=1; });
  const fa=seg(t,tf,tf+.1)*(1-seg(t,tf+.1,tf+.9)); flash2.visible=fa>.01; flash2.position.copy(NUC2P); flash2.scale.setScalar(4+fa*10); flash2.material.opacity=fa*.8;
  const sa=seg(t,tf,tf+2.6); shock2.visible=sa>0&&sa<1; shock2.position.copy(NUC2P); shock2.scale.setScalar(2+sa*22); shock2.material.opacity=(1-sa)*.35;
  NEU2.forEach((m,i)=>{ const a=seg(t,tf,tf+2.4); m.visible=a>0&&a<1; const ang=[.5,2.5,4.3][i]; m.position.copy(NUC2P).add(V3(Math.cos(ang)*a*14,Math.sin(ang*1.7)*a*9,Math.sin(ang)*a*10)); });
  light2.intensity=fa*16+sa*(1-sa)*3; ringL.material.opacity=.5*sstep(10.5,11.5,t); ringR.visible=true; ringR.material.opacity=.5*nk;
  const K=[[10,[-6,2.8,13],[-8.6,1.3,0]],[20,[-4,2.8,14],[-6.5,1.3,0]],[22,[3,3,19],[2,1.4,0]],[25.5,[7.5,2.6,13],[9,1.6,0]],[30,[0,5.2,24],[0,4.6,0]],[42,[0,5.4,26],[0,4.8,0]]];
  const tr=trk(t,K); setCam(vOf(tr[0]),vOf(tr[1]),.012+fa*.08+sa*(1-sa)*.1); matahari.intensity=.9; rim.intensity=1.4;
  PP={ex:1.0,bl:.7+fa*.7,vig:.55,hangat:.25,sat:1.08};
  $('#cB2').style.width=(E.out(seg(t,35.6,38.4))*100).toFixed(1)+'%'; $('#cA2').style.width=(sstep(31.0,31.6,t)*.7).toFixed(2)+'%'; }
ov('<small>TNT</small><b>reaksi kimia</b>','left:150px;top:150px','',11.4,21.2);
ov('<small>NUKLIR</small><b>reaksi <i>inti</i></b>','right:150px;top:150px;text-align:right','',21.4,29.0);
ov('<div class="row"><small>1 KG TNT ≈ 4 JUTA JOULE</small><div class="trk"><i id="cA2"></i></div></div><div class="row"><small>1 KG URANIUM (JIKA SEMUANYA TERBELAH) ≈ 80 TRILIUN JOULE</small><div class="trk"><i id="cB2" class="vi"></i></div></div><b style="font-size:84px">≈ <i>20.000.000</i>× lebih besar</b>','left:150px;top:150px;width:1000px','',31.0,41.6);

/* ============ ADEGAN 3: masuk ke dalam atom ============ */
const GC = new THREE.Group(); GC.visible=false; S.add(GC);
const ST=[0,1,2,3].map(()=>{ const g=new THREE.Group(); GC.add(g); return {g,mats:[]}; });
{ const m=new THREE.MeshStandardMaterial({map:texBola,bumpMap:texBola,bumpScale:.25,metalness:.85,roughness:.46,emissive:C('#3b55c0'),emissiveIntensity:.07,transparent:true}); const s0=new THREE.Mesh(new THREE.SphereGeometry(1.4,96,48),m); ST[0].g.add(s0); ST[0].mats.push(m); }
{ const m=new THREE.MeshStandardMaterial({color:C('#8f86ff'),emissive:C('#4a3fd0'),emissiveIntensity:.5,roughness:.35,metalness:.3,transparent:true}); const n=7, im=new THREE.InstancedMesh(new THREE.SphereGeometry(.12,16,12),m,n*n*n); const o=new THREE.Object3D(); let q=0;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){ o.position.set((i-3)*.55,(j-3)*.55,(k-3)*.55); o.updateMatrix(); im.setMatrixAt(q,o.matrix); im.setColorAt(q,C(((i+j+k)%2)?'#9a8fff':'#6fb0ff')); q++; } ST[1].g.add(im); ST[1].mats.push(m); }
{ const m=new THREE.PointsMaterial({size:.05,map:SPRW,color:C('#7a96ff').multiplyScalar(1.6),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}); const N=2600,P=new Float32Array(N*3),r=rng(23);
  for(let i=0;i<N;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u),rad=.5+Math.pow(r(),1.6)*2.2; P[i*3]=q*Math.cos(a)*rad;P[i*3+1]=u*rad;P[i*3+2]=q*Math.sin(a)*rad; }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(P,3)); const cl=new THREE.Points(g,m); ST[2].g.add(cl); ST[2].mats.push(m); ST[2].cl=cl;
  const nm=new THREE.MeshBasicMaterial({color:new THREE.Color(3,2.2,1.6),transparent:true}); ST[2].g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,16,12),nm)); ST[2].mats.push(nm);
  ST[2].el=[0,1,2].map(i=>{ const em=new THREE.MeshBasicMaterial({color:new THREE.Color(.8,1.6,3.6),transparent:true}); const e=new THREE.Mesh(new THREE.SphereGeometry(.07,12,8),em); ST[2].g.add(e); ST[2].mats.push(em); return e; });
  [0,1,2].forEach(i=>{ const pts=[]; for(let a=0;a<=128;a++){ const t=a/128*6.283; pts.push(Math.cos(t)*1.6,0,Math.sin(t)*.9); } const g2=new THREE.BufferGeometry(); g2.setAttribute('position',new THREE.Float32BufferAttribute(pts,3)); const lm=new THREE.LineBasicMaterial({color:C('#6b86ff').multiplyScalar(1.4),transparent:true,opacity:.6}); const L=new THREE.Line(g2,lm); L.rotation.set(i*1.05,i*.8,i*.5); ST[2].g.add(L); ST[2].mats.push(lm); }); }
const NUC3 = nukleus(20,.78,.27,12); const N3M = NUC3.map(q=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(.27,32,20), q.proton?PROTON():NEUTRON()); m.position.copy(q.p); ST[3].g.add(m); ST[3].mats.push(m.material); return m; });
const N3glow = new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C('#ff8a60').multiplyScalar(.9),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true})); N3glow.scale.setScalar(4.4); ST[3].g.add(N3glow); ST[3].mats.push(N3glow.material);
const forceG=new THREE.BufferGeometry(); { const pts=[]; for(let i=0;i<NUC3.length;i++)for(let j=i+1;j<NUC3.length;j++) if(NUC3[i].p.distanceTo(NUC3[j].p)<.7){ const a=NUC3[i].p,b=NUC3[j].p; pts.push(a.x,a.y,a.z,b.x,b.y,b.z); } forceG.setAttribute('position',new THREE.Float32BufferAttribute(pts,3)); }
const forceM=new THREE.LineBasicMaterial({color:C('#ffd27a').multiplyScalar(3),transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false}); const force=new THREE.LineSegments(forceG,forceM); ST[3].g.add(force);
const pr=NUC3.filter(q=>q.proton).slice(0,4); const ARR=[[0,1],[2,3]].map(([a,b])=>{ const A=pr[a].p,B=pr[b].p; const d=B.clone().sub(A).normalize(); const h1=new THREE.ArrowHelper(d,B.clone().addScaledVector(d,.3),.55,0xff4a3a,.2,.14), h2=new THREE.ArrowHelper(d.clone().negate(),A.clone().addScaledVector(d,-.3),.55,0xff4a3a,.2,.14); ST[3].g.add(h1,h2); return [h1,h2]; });
function s3(t){ GC.visible=true; S.fog.density=0; lantai.visible=false; matahari.intensity=1.2; rim.intensity=2.4; titik.intensity=0; titik.visible=false;
  const z=E.io(seg(t,47.8,50.2))+E.io(seg(t,50.4,52.4))+E.io(seg(t,53.0,55.2)); const dol=E.io(seg(t,61.8,64.4));
  ST.forEach((s,i)=>{ const sc=Math.pow(700,z-i); s.g.visible=sc<30&&sc>.0007; s.g.scale.setScalar(sc);
    const al=(z<i)?sstep(i-1.15,i-.5,z):(1-sstep(i+.1,i+.75,z)); s.mats.forEach(m=>{ m.opacity=i==0?al:al; }); s.g.rotation.y=t*.15*(i%2?-1:1); s.g.rotation.x=.25*Math.sin(t*.2+i); });
  ST[2].el.forEach((e,i)=>{ const a=t*(1.4+i*.5)+i*2.1; const rr=[1.6,1.6,1.6][i]; e.position.set(Math.cos(a)*1.6,0,Math.sin(a)*.9); e.position.applyEuler(new THREE.Euler(i*1.05,i*.8,i*.5)); });
  N3M.forEach((m,i)=>{ const q=NUC3[i]; m.position.copy(q.p).multiplyScalar(1+.04*Math.sin(t*3+i)); });
  forceM.opacity=sstep(62.2,63.4,t)*(.7+.3*Math.sin(t*9)); const rk=seg(t,57.4,58.4)*(1-seg(t,60.2,61.2)); ARR.forEach(a=>a.forEach(h=>h.visible=rk>.02));
  const D=lerp(7.2,3.5,dol); const az=t*.12; setCam(V3(Math.sin(az)*D,1.2,Math.cos(az)*D),V3(0,0,0),.01);
  PP={ex:1.0,bl:.9,vig:.6,hangat:.1,sat:1.1};
  const n=Math.round(1+14*z/3); $('#skala').textContent='≈ 10⁻'+String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('')+' m'; }
ov('<small>SKALA</small><b id="skala">≈ 10⁻¹ m</b>','right:150px;top:120px;text-align:right','',44.0,69.6);
function pn(i){ const p=N3M[i].getWorldPosition(V3()); return pj(p); }
const iP=NUC3.findIndex(q=>q.proton), iN=NUC3.findIndex(q=>!q.proton);
lab('proton',PAL.aksen,-120,-110,55.2,59.8,()=>pn(iP),52);
lab('neutron','#a9c0ff',120,-110,55.8,59.8,()=>pn(iN),52);
lab('gaya nuklir kuat','#ffd27a',0,-190,63.0,69.8,()=>pj(ST[3].g.getWorldPosition(V3())),58);

/* ============ ADEGAN 4: E = mc² ============ */
const GD = new THREE.Group(); GD.visible=false; S.add(GD);
const grain = new THREE.Mesh(new THREE.SphereGeometry(.1,32,20), new THREE.MeshBasicMaterial({color:new THREE.Color(3.2,3.6,5)})); GD.add(grain);
const grainG = mkSpr('#9fb4ff',1.6); GD.add(grainG); S.remove(grainG); grainG.scale.setScalar(1.6);
const BN=2600, burstG=new THREE.BufferGeometry(); burstG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(BN*3),3)); burstG.setAttribute('color',new THREE.BufferAttribute(new Float32Array(BN*3),3));
const BV=[]; { const r=rng(31); for(let i=0;i<BN;i++){ const u=r()*2-1,a=r()*6.283,q=Math.sqrt(1-u*u),sp=3+Math.pow(r(),2)*30; BV.push([q*Math.cos(a)*sp,u*sp,q*Math.sin(a)*sp,r()]); } }
const burst=new THREE.Points(burstG,new THREE.PointsMaterial({size:.12,map:SPRW,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); burst.frustumCulled=false; GD.add(burst);
const flash4 = mkSpr('#fff0d0',6); GD.add(flash4); S.remove(flash4);
const shock4 = new THREE.Mesh(new THREE.RingGeometry(.95,1,128),new THREE.MeshBasicMaterial({color:C('#ffd9a0').multiplyScalar(3),transparent:true,opacity:0,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false})); GD.add(shock4);
const FM = ov('<b id="fmb" style="font:600 260px/1 \'Cormorant Garamond\',serif;letter-spacing:.02em">E = mc<sup style="font-size:.55em;vertical-align:.5em">2</sup></b>','left:0;right:0;top:140px;text-align:center','',73.6,98.4,.9,.1);
OV.pop();
ov('<small>RUMUS EINSTEIN, 1905</small>','left:150px;top:150px','',71.0,73.6);
ov('<small><b style="display:inline;font:600 44px \'Cormorant Garamond\';color:#FFB878">E</b> &nbsp;energi</small>','left:420px;top:470px','',76.6,87.6);
ov('<small><b style="display:inline;font:600 44px \'Cormorant Garamond\';color:#FFB878">m</b> &nbsp;massa</small>','left:860px;top:470px','',77.6,87.6);
ov('<small><b style="display:inline;font:600 44px \'Cormorant Garamond\';color:#FFB878">c²</b> &nbsp;kecepatan cahaya kuadrat</small>','left:1160px;top:470px','',78.4,87.6);
ov('<small>c ≈ 300.000 km/detik</small><b style="font-size:76px">c² ≈ 9 × 10<sup style="font-size:.55em">16</sup></b>','left:150px;top:640px','',81.0,88.4);
ov('<small>BOM HIROSHIMA · MASSA YANG HILANG</small><b>&lt; 1 gram</b>','left:150px;top:640px','',92.9,98.3);
ov('<small>1 KILOTON = 1.000 TON TNT</small><b>≈ 15 kiloton = 15.000 ton TNT</b>','left:150px;top:790px','',96.8,100,.6,.3);
function s4(t){ GD.visible=true; lantai.visible=false; S.fog.density=0; titik.visible=false; matahari.intensity=0; rim.intensity=1.0;
  const bt=96.7, ba=seg(t,bt,bt+5.0); grain.visible=t<bt; const gp=sstep(84.6,86.0,t); grain.scale.setScalar(Math.max(.001,gp)*(1+.1*Math.sin(t*5))); grainG.visible=t<bt; grainG.position.set(0,0,0); grainG.scale.setScalar(1.6*gp+.001);
  { const P=burstG.attributes.position.array, Co=burstG.attributes.color.array, dt=Math.max(0,t-bt); for(let i=0;i<BN;i++){ const v=BV[i], f=Math.max(0,1-ba*(.7+v[3]*.5)), tt=Math.pow(dt,.9); P.set([v[0]*tt,v[1]*tt,v[2]*tt],i*3); const b=t>=bt?f*(.45+v[3]*.5):0; Co.set([b*1.4,b*1.0,b*.6],i*3); }
    burstG.attributes.position.needsUpdate=burstG.attributes.color.needsUpdate=true; }
  const fa=seg(t,bt,bt+.1)*(1-seg(t,bt+.1,bt+.8)); flash4.visible=fa>.01; flash4.scale.setScalar(4+fa*10); flash4.material.opacity=fa*.75;
  shock4.visible=t>bt; shock4.scale.setScalar(.1+E.out(seg(t,bt,bt+3.5))*30); shock4.material.opacity=.45*(1-seg(t,bt,bt+3.5)); shock4.lookAt(cam.position);
  const fm=$('#fmb'), ex=seg(t,bt-.1,bt+1.3); fm.style.transform=`scale(${1+ex*.9})`; fm.style.filter=`blur(${ex*22}px)`; FM.style.opacity=(seg(t,73.6,74.5)*(1-ex)).toFixed(3); FM.style.visibility=FM.style.opacity>.002?'visible':'hidden';
  const D=lerp(5.0,3.2,E.io(seg(t,70,96)))+ lerp(0,12,E.io(seg(t,bt,bt+2))); const az=.4+t*.05; setCam(V3(Math.sin(az)*D,.6+.3*Math.sin(t*.3),Math.cos(az)*D),V3(0,0,0),.01+fa*.1);
  PP={ex:1.0,bl:.75+fa*.4,vig:.65,hangat:.15,sat:1.08}; }
const ovFM = null;

/* ============ ADEGAN 5: reaksi berantai ============ */
const GE = new THREE.Group(); GE.visible=false; S.add(GE);
const NN=420, NP=[]; { const r=rng(41); let g=0; while(NP.length<NN&&g++<40000){ const p=V3((r()-.5)*2,(r()-.5)*2,(r()-.5)*2); if(p.length()>1) continue; p.multiplyScalar(11); p.y*=.8; if(NP.every(q=>q.distanceTo(p)>1.15)) NP.push(p); } }
const root=NP.reduce((b,p,i)=>p.x<NP[b].x?i:b,0);
const TF=new Array(NP.length).fill(Infinity), PAR=new Array(NP.length).fill(-1), GEN=new Array(NP.length).fill(-1);
const GT=[105.25,113.4,115.9,117.8,119.0,120.0,120.8,121.5,122.1,122.6,123.0,123.35];
{ TF[root]=GT[0]; GEN[root]=0; let front=[root]; for(let g=1;g<GT.length;g++){ const nf=[]; const taken=new Set(); front.forEach(f=>{ const cand=NP.map((p,i)=>[i,p.distanceTo(NP[f])]).filter(([i])=>TF[i]===Infinity&&!taken.has(i)).sort((a,b)=>a[1]-b[1]).slice(0,2); cand.forEach(([i])=>{ taken.add(i); TF[i]=GT[g]; PAR[i]=f; GEN[i]=g; nf.push(i); }); }); front=nf; if(!front.length) break; } }
const nucM=new THREE.InstancedMesh(new THREE.SphereGeometry(.26,16,12),new THREE.MeshStandardMaterial({color:C('#6a7cf0'),emissive:C('#3a4fd8'),emissiveIntensity:.55,roughness:.4}),NN); nucM.frustumCulled=false; GE.add(nucM);
const fragM=new THREE.InstancedMesh(new THREE.SphereGeometry(.2,12,8),new THREE.MeshBasicMaterial({color:0xffffff}),NN*2); fragM.frustumCulled=false; GE.add(fragM);
const flM=new THREE.InstancedMesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}),NN); flM.frustumCulled=false; GE.add(flM);
const neuM=new THREE.InstancedMesh(new THREE.SphereGeometry(.09,10,8),new THREE.MeshBasicMaterial({color:new THREE.Color(3.5,4,5)}),NN); neuM.frustumCulled=false; GE.add(neuM);
const netG=new THREE.BufferGeometry(); netG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(NN*6),3)); netG.setAttribute('color',new THREE.BufferAttribute(new Float32Array(NN*6),3));
const net=new THREE.LineSegments(netG,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); net.frustumCulled=false; GE.add(net);
const N0 = V3(-34,.5,7);  /* neutron pertama datang dari luar */
const t0f=GT[0], tn0=102.9, rootP=NP[root];
const _d=new THREE.Object3D(); const FDIR=NP.map((p,i)=>{ const r=rng(100+i); return V3(r()-.5,r()-.5,r()-.5).normalize(); });
const cntAt = t => { let c=0; for(let i=0;i<NN;i++) if(TF[i]<=t) c++; return c; };
function s5(t){ GE.visible=true; lantai.visible=false; S.fog.density=0; titik.visible=false; matahari.intensity=0; rim.intensity=.6;
  let nv=0;
  for(let i=0;i<NN;i++){ const tf=TF[i], p=NP[i]; const alive=t<tf; _d.position.copy(p); _d.rotation.set(0,0,0); _d.scale.setScalar(alive?1+.06*Math.sin(t*4+i):.0001); _d.updateMatrix(); nucM.setMatrixAt(i,_d.matrix);
    const dt=t-tf, fk=dt>0?clamp(dt/.9):0; for(let j=0;j<2;j++){ const dd=FDIR[i].clone(); if(j) dd.negate(); _d.position.copy(p).addScaledVector(dd,E.out(fk)*1.6); _d.scale.setScalar(dt>0&&dt<1.8?(1-seg(dt,.8,1.8))*1:.0001); _d.updateMatrix(); fragM.setMatrixAt(i*2+j,_d.matrix); fragM.setColorAt(i*2+j,new THREE.Color(1.6*(1-fk*.5),.55+.3*(1-fk),.2)); }
    const fa=dt>0&&dt<1.2?(1-dt/1.2):(dt>=1.2?.2:0); _d.position.copy(p); _d.scale.setScalar(dt>=1.2?.34:.2+(1-fa)*1.6); if(fa<=0) _d.scale.setScalar(.0001); _d.updateMatrix(); flM.setMatrixAt(i,_d.matrix); flM.setColorAt(i,new THREE.Color(1.8*fa,1.0*fa,.45*fa));
    const par=PAR[i]; let nvis=false; if(par>=0){ const ts=TF[par]; const k=clamp((t-ts)/(tf-ts)); if(t>=ts&&t<tf){ _d.position.copy(NP[par]).lerp(p,k); _d.scale.setScalar(1); nvis=true; } }
    if(!nvis&&i===root){ const k=clamp((t-tn0)/(tf-tn0)); if(t>=tn0&&t<tf){ _d.position.copy(N0).lerp(rootP,k); _d.scale.setScalar(1.4); nvis=true; } }
    if(!nvis){ _d.position.set(0,-999,0); _d.scale.setScalar(.0001); } _d.updateMatrix(); neuM.setMatrixAt(i,_d.matrix); }
  nucM.instanceMatrix.needsUpdate=fragM.instanceMatrix.needsUpdate=flM.instanceMatrix.needsUpdate=neuM.instanceMatrix.needsUpdate=true; if(fragM.instanceColor) fragM.instanceColor.needsUpdate=true; if(flM.instanceColor) flM.instanceColor.needsUpdate=true;
  { const P=netG.attributes.position.array, Co=netG.attributes.color.array; for(let i=0;i<NN;i++){ const par=PAR[i]; let a=V3(0,-999,0), b=a, f=0; if(par>=0&&t>=TF[par]){ const k=clamp((t-TF[par])/(TF[i]-TF[par])); a=NP[par]; b=NP[par].clone().lerp(NP[i],k); f=.55*(.4+.6*(1-clamp((t-TF[i])/6))); } else if(i===root&&t>=tn0){ const k=clamp((t-tn0)/(TF[i]-tn0)); a=N0; b=N0.clone().lerp(rootP,k); f=.9; }
      P.set([a.x,a.y,a.z,b.x,b.y,b.z],i*6); Co.set([1.4*f,.8*f,.35*f,1.4*f,.8*f,.35*f],i*6); } netG.attributes.position.needsUpdate=netG.attributes.color.needsUpdate=true; }
  const np=N0.clone().lerp(rootP,clamp((t-tn0)/(t0f-tn0)));
  const K=[[100,[-26,3.4,14],[-22,.8,3]],[102.9,[-28,1.8,8],[-26,.6,4]],[104.4,[-13.5,1.8,5.8],[-9.8,.3,.2]],[106.5,[-6,3.5,11],[-9,0,0]],[110,[-2,5.5,15],[-8,0,0]],[114,[3,7.5,21],[-2,0,0]],[118,[9,9,27],[0,0,0]],[124,[16,10,31],[0,0,0]],[130,[20,11,33],[0,0,0]]];
  const tr=trk(t,K); let pos=vOf(tr[0]), tg=vOf(tr[1]); if(t<104.6){ tg=np.clone().add(V3(1.6,0,0)); }
  setCam(pos,tg,.01+.02*seg(t,113,124)); PP={ex:1.02,bl:.9+.5*sstep(116,123,t),vig:.6,hangat:.2,sat:1.1};
  const c=cntAt(t); $('#cnt').textContent=c.toLocaleString('id-ID'); }
ov('<small>INTI YANG SUDAH TERBELAH</small><b id="cnt">0</b><em style="display:block;margin-top:14px;font:500 24px Sora;letter-spacing:.1em;color:#BBB8D0;font-style:normal">ILUSTRASI · DIPERLAMBAT JUTAAN KALI</em>','right:150px;top:120px;text-align:right','',112.2,129.2);
ov('<small>REAKSI BERANTAI</small><b>1 → 2 → 4 → 8 → …</b>','left:150px;top:150px','',119.8,129.4);
lab('neutron','#bcd0ff',0,-80,103.0,105.0,()=>pj(N0.clone().lerp(rootP,clamp((TT-tn0)/(t0f-tn0)))),48);
lab('inti atom berat','#9fb0ff',150,-110,103.8,106.4,()=>pj(rootP),48);
const C1=PAR.indexOf(root); lab('neutron baru','#bcd0ff',90,-100,109.8,112.8,()=>pj(NP[root].clone().lerp(NP[C1],clamp((TT-GT[0])/(GT[1]-GT[0])))),44);
/* ============ ADEGAN 6: gurun, ledakan, hening ============ */
const GF = new THREE.Group(); GF.visible=false; S.add(GF);
const texGurun=(()=>{ const c=kanvas(1024,1024),x=c.getContext('2d'); const r=rng(61); x.fillStyle='#4a3a2c'; x.fillRect(0,0,1024,1024); for(let i=0;i<9000;i++){ x.fillStyle=`rgba(${r()<.5?'120,95,70':'30,22,16'},${.04+r()*.09})`; x.fillRect(r()*1024,r()*1024,2+r()*18,1+r()*6); } const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(220,220); t.anisotropy=8; return t; })();
const gurun=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),new THREE.MeshStandardMaterial({map:texGurun,bumpMap:texGurun,bumpScale:.6,roughness:.95,metalness:0,color:0x8a7a68})); gurun.rotation.x=-Math.PI/2; GF.add(gurun);
{ const seg_=240, g=new THREE.PlaneGeometry(8000,420,seg_,1); const P=g.attributes.position; const r=rng(77); const ph=[r()*9,r()*9,r()*9]; for(let i=0;i<=seg_;i++){ const x=(i/seg_-.5)*8000; const h=60+90*Math.abs(Math.sin(x*.0011+ph[0]))*Math.abs(Math.sin(x*.0027+ph[1]))+30*Math.sin(x*.009+ph[2]); P.setY(i,h); P.setY(i+seg_+1,-30); }
  const mt=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x1b1613,roughness:1,metalness:0})); mt.position.set(0,0,-3300); GF.add(mt); const mt2=mt.clone(); mt2.position.set(300,0,-3700); mt2.scale.y=1.4; mt2.material=new THREE.MeshStandardMaterial({color:0x141016,roughness:1}); GF.add(mt2); }
function smokeMat(seed){ return new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uT:{value:0},uHeat:{value:1},uK:{value:1},uSeed:{value:seed||0}},
 vertexShader:`uniform float uT,uSeed;varying vec3 vP;varying vec3 vN;varying vec3 vW;${GLSL_N}
  void main(){vec3 p=position;float n=fbm(p*.9+vec3(uSeed,uT*.15,0.));vec3 q=p+normal*(n-.5)*.55;vP=p;vN=normalize(mat3(modelMatrix)*normal);vec4 w=modelMatrix*vec4(q,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
 fragmentShader:`uniform float uT,uHeat,uK,uSeed;varying vec3 vP;varying vec3 vN;varying vec3 vW;${GLSL_N}
  void main(){float n=fbm(vP*3.2+vec3(uSeed,uT*.2,3.));float n2=fbm(vP*9.+vec3(uT*.5));vec3 V=normalize(cameraPosition-vW);float fr=pow(1.-max(dot(normalize(vN),V),0.),1.6);
   vec3 hot=mix(vec3(1.,.5,.12),vec3(1.,.93,.78),uHeat*uHeat);vec3 smoke=mix(vec3(.07,.05,.045),vec3(.30,.16,.08),uHeat)*(.55+.9*n);
   vec3 c=mix(smoke,hot*(1.3+1.6*n2)*2.6,clamp(uHeat*(.45+.9*n),0.,1.));float a=uK*clamp(.35+1.15*n+fr*.35,0.,1.);gl_FragColor=vec4(c,a);}`}); }
const mFB=smokeMat(1), mSt=smokeMat(2), mCap=smokeMat(3), mRing=smokeMat(4), mDust=smokeMat(5);
const FB=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),mFB), STEM=new THREE.Mesh(new THREE.CylinderGeometry(1,1.5,1,48,24,true),mSt), CAP=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),mCap), VR=new THREE.Mesh(new THREE.TorusGeometry(1,.28,24,64),mRing);
[FB,STEM,CAP,VR].forEach(m=>{ m.frustumCulled=false; GF.add(m); });
const BLAST = V3(0,0,-1800), SHW=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,120,1,true),mDust); SHW.frustumCulled=false; mDust.side=THREE.DoubleSide; GF.add(SHW); SHW.position.copy(BLAST).setY(0);
const SHRING=new THREE.Mesh(new THREE.RingGeometry(.985,1,200),new THREE.MeshBasicMaterial({color:C('#ffcf9a').multiplyScalar(2),transparent:true,opacity:0,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false})); SHRING.rotation.x=-Math.PI/2; SHRING.position.set(0,2,-1800); GF.add(SHRING);
const flash6=mkSpr('#fff1d8',6); GF.add(flash6); S.remove(flash6); const glow6=mkSpr('#ff9a50',2.4); GF.add(glow6); S.remove(glow6);
const light6=new THREE.PointLight(C('#ffb070'),0,0,0); light6.position.set(0,160,-1500); GF.add(light6);
const TB0=133.1;
function s6(t){ GF.visible=true; lantai.visible=false; S.fog.density=.00042; S.fog.color.set(0x120d12); FOV=52; titik.visible=false;
  const dt=t-TB0, d=Math.max(0,dt), on=dt>0;
  const rF=on?55+30*Math.min(d,12)+5*Math.max(0,d-12):.001, yc=on?rF*.9+12*Math.pow(d,1.1)*6:0; FB.position.set(0,yc,-1800); FB.scale.setScalar(rF); FB.visible=on&&d<22;
  const heat=on?Math.exp(-d*.32):0; [mFB,mSt,mCap,mRing].forEach(m=>{ m.uniforms.uT.value=t; m.uniforms.uHeat.value=heat; m.uniforms.uK.value=on?1-.25*seg(d,18,26):0; });
  mFB.uniforms.uK.value=on?(1-seg(d,5,9)):0; mFB.uniforms.uHeat.value=on?Math.exp(-d*.2):0;
  const cap=on?clamp(d/3.2):0, yCap=on?60+110*Math.pow(d,.8):0, rC=on?60+22*d:.001;
  CAP.position.set(0,yCap,-1800); CAP.scale.set(rC*1.5,rC*.7*cap+.001,rC*1.5); CAP.visible=on&&d>1.2; const hc=on?Math.exp(-d*.18):0; mCap.uniforms.uHeat.value=hc;
  VR.position.set(0,yCap-rC*.25,-1800); VR.rotation.x=Math.PI/2; VR.scale.setScalar(rC*1.25); VR.visible=CAP.visible; mRing.uniforms.uHeat.value=hc*.8;
  const stH=Math.max(.01,yCap-rC*.35), stR=on?44+7*d:.001; STEM.position.set(0,stH/2,-1800); STEM.scale.set(stR,stH,stR); STEM.visible=on&&d>.8; mSt.uniforms.uHeat.value=heat*.7;
  const R=on?1800*Math.pow(d/7.9,1.3):.001; SHW.scale.set(R,20+R*.035,R); SHW.position.set(0,(20+R*.035)/2,-1800); SHW.visible=on&&R>5; const band=on?(1-seg(d,7.5,16))*sstep(.3,1.4,d):0; mDust.uniforms.uK.value=.6*band; mDust.uniforms.uT.value=t; mDust.uniforms.uHeat.value=heat*.5;
  SHRING.scale.setScalar(Math.max(.01,R)); SHRING.material.opacity=on?.9*(1-seg(d,.3,8))*sstep(.1,.5,d)*.5:0; SHRING.visible=on&&R>5;
  const fa=on?Math.exp(-d*5)*(1-Math.exp(-d*60)):0; flash6.visible=fa>.01; flash6.position.set(0,yc||160,-1800); flash6.scale.setScalar(300+fa*2600); flash6.material.opacity=Math.min(1,fa);
  glow6.visible=on&&d<20; glow6.position.set(0,yc,-1800); glow6.scale.setScalar(900+rF*4); glow6.material.opacity=on?Math.exp(-d*.25)*.55:0;
  light6.intensity=on?(9*Math.exp(-d*.5)+.9*Math.exp(-d*.1))*(1-seg(d,16,28)):0; light6.position.set(0,Math.max(160,yc),-1500);
  matahari.intensity=0; rim.intensity=.25; hemi.intensity=.18; hemi.color.set(0x303060);
  const tgY=lerp(120,560,E.io(seg(d,0,12))), sh=on?.9*Math.exp(-Math.pow((d-7.9)/.9,2))+.3*Math.exp(-d*.7)+(d>7.9?.12*Math.exp(-(d-7.9)*.25):0):0;
  setCam(V3(0,6,0),V3(0,tgY,-1800),sh); PP={ex:1.0/(1+3.2*fa),bl:.9+.6*Math.exp(-d*1.5)*(on?1:0),vig:.7,hangat:.35,sat:1.0};
  const dk=seg(t,150,157.5); PP.ex*=1-.35*dk; }
ov('<small>HIROSHIMA</small><b>6 Agustus 1945</b>','left:150px;top:150px','',143.2,148.4);
ov('<small>NAGASAKI</small><b>9 Agustus 1945</b>','left:150px;top:150px','',148.6,153.6);
ov('<small>KITA MENGENANG MEREKA</small>','left:0;right:0;top:420px;text-align:center','',156.4,159.4,1.0,.8);
ov('<small>BOLA API</small>','left:150px;top:520px','',134.4,137.4);
ov('<small>GELOMBANG KEJUT</small>','left:150px;top:520px','',137.6,141.6);
ov('<small>PANAS</small> &nbsp;&nbsp; <small style="display:inline">· RADIASI</small>','left:150px;top:520px','',139.8,143.0);

/* ============ ADEGAN 7: PLTN dan cahaya kota ============ */
const GG = new THREE.Group(); GG.visible=false; S.add(GG);
const tanah=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.MeshStandardMaterial({color:0x14161e,roughness:.95,metalness:0})); tanah.rotation.x=-Math.PI/2; GG.add(tanah);
const mBeton=new THREE.MeshStandardMaterial({color:0x5f6170,roughness:.75,metalness:.1,emissive:C('#241c14'),emissiveIntensity:.25});
const MC=[]; function menara(x,z,s){ const pts=[]; for(let i=0;i<=24;i++){ const u=i/24, r=9-4.2*Math.sin(Math.PI*Math.min(1,u*1.15)*.5*1.0)+(u>.7?(u-.7)*3:0); pts.push(new THREE.Vector2(r*s,u*30*s)); } const m=new THREE.Mesh(new THREE.LatheGeometry(pts,64),mBeton); m.position.set(x,0,z); GG.add(m); MC.push([x,30*s,z]); return m; }
menara(-14,-6,1); menara(14,-10,1);
const kub=new THREE.Mesh(new THREE.SphereGeometry(7,48,24,0,Math.PI*2,0,Math.PI/2),mBeton); kub.position.set(0,6,8); GG.add(kub); const sil=new THREE.Mesh(new THREE.CylinderGeometry(7,7,6,48),mBeton); sil.position.set(0,3,8); GG.add(sil);
const texJendela=(()=>{ const c=kanvas(256,256),x=c.getContext('2d'); x.fillStyle='#1d1a1c'; x.fillRect(0,0,256,256); const r=rng(5); for(let j=0;j<8;j++)for(let i=0;i<8;i++){ if(r()<.78){ x.fillStyle=r()<.3?'#ffe0a8':'#ffc070'; x.fillRect(i*32+5,j*32+7,22,17); } } return new THREE.CanvasTexture(c); })();
const mJ=new THREE.MeshBasicMaterial({map:texJendela,color:C('#ffb060').multiplyScalar(1.4)});
[[-26,8,14,10,8],[26,8,12,9,8],[0,-20,26,8,7],[20,22,16,12,9]].forEach(([x,z,w,h,d])=>{ const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[mJ,mJ,mBeton,mBeton,mJ,mJ]); b.position.set(x,h/2,z); GG.add(b); });
const uap=[0,1,2,3,4,5].map(i=>{ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C('#f4dcd2'),transparent:true,depthWrite:false,opacity:.5})); GG.add(s); return s; });
const uap2=[0,1,2,3,4,5].map(i=>{ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:SPRW,color:C('#f4dcd2'),transparent:true,depthWrite:false,opacity:.5})); GG.add(s); return s; });
const kotaN=5200, kotaG=new THREE.BufferGeometry(); { const P=new Float32Array(kotaN*3),Co=new Float32Array(kotaN*3),r=rng(91); for(let i=0;i<kotaN;i++){ const a=r()*6.283,rad=Math.pow(r(),.6)*190; P[i*3]=Math.cos(a)*rad*1.5+10;P[i*3+1]=.6+r()*1.4;P[i*3+2]=-250+Math.sin(a)*rad*.45; const w=.6+r()*1.2; Co[i*3]=1.4*w;Co[i*3+1]=.85*w;Co[i*3+2]=.4*w; } kotaG.setAttribute('position',new THREE.BufferAttribute(P,3)); kotaG.setAttribute('color',new THREE.BufferAttribute(Co,3)); }
const kota=new THREE.Points(kotaG,new THREE.PointsMaterial({size:3.2,map:SPRW,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); kota.frustumCulled=false; GG.add(kota);
const kotaGlow=mkSpr('#ff9a50',1.3); GG.add(kotaGlow); S.remove(kotaGlow); kotaGlow.position.set(10,14,-250); kotaGlow.scale.set(520,60,1);
{ const pts=[]; for(let i=0;i<9;i++){ const z=-30-i*40, x=-8+i*1.6; const g=(a,b,c)=>pts.push(...a,...b); pts.push(x-3,0,z,x,13,z, x+3,0,z,x,13,z, x-3,12.4,z,x+3,12.4,z); if(i<8){ const z2=-30-(i+1)*40, x2=-8+(i+1)*1.6; pts.push(x-3,12.4,z,x2-3,12.4,z2, x+3,12.4,z,x2+3,12.4,z2); } }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pts,3)); GG.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:C('#ffb070').multiplyScalar(1.0),transparent:true,opacity:.7}))); }
const key7=new THREE.PointLight(C('#ffb070'),0,0,0); key7.position.set(0,40,40); GG.add(key7);
const K7=[[160,[-30,5,80],[0,14,0]],[166,[-16,6,70],[0,14,-20]],[171,[8,12,78],[0,10,-60]],[176,[24,30,120],[8,6,-170]],[180,[30,44,150],[10,4,-230]]];
function s7(t){ GG.visible=true; lantai.visible=false; S.fog.density=.0015; S.fog.color.set(0x181018); FOV=34; titik.visible=false;
  const on=sstep(160.8,164,t); mJ.color.copy(C('#ffb060')).multiplyScalar(.1+1.4*on); kota.material.opacity=.15+.85*sstep(161,172,t); kotaGlow.visible=true; kotaGlow.material.opacity=.15+.85*sstep(166,175,t); key7.intensity=.15+1.1*on;
  uap.forEach((s,i)=>{ const f=((t*.12+i/6)%1); s.position.set(-14+Math.sin(t*.4+i)*1.6,30+f*30,-6); s.scale.setScalar(8+f*18); s.material.opacity=.5*Math.sin(f*Math.PI); });
  uap2.forEach((s,i)=>{ const f=((t*.12+i/6+.4)%1); s.position.set(14+Math.sin(t*.4+i)*1.6,30+f*30,-10); s.scale.setScalar(8+f*18); s.material.opacity=.5*Math.sin(f*Math.PI); });
  matahari.intensity=0; rim.intensity=0; hemi.intensity=.1; hemi.color.set(0x5a6088);
  const tr=trk(t,K7); setCam(vOf(tr[0]),vOf(tr[1]),.02); PP={ex:1.05,bl:.9,vig:.55,hangat:.55,sat:1.1}; }
ov('<small>REAKSI BERANTAI · DIKENDALIKAN</small>','left:150px;top:150px','',165.6,171.6);
ov('<small>PANAS</small> <b style="display:inline;font-size:60px">→</b> <small style="display:inline">UAP</small> <b style="display:inline;font-size:60px">→</b> <small style="display:inline">TURBIN</small> <b style="display:inline;font-size:60px">→</b> <small style="display:inline">LISTRIK</small>','left:150px;top:260px','',169.0,172.4);
ov('<b>menghancurkan,</b>','left:150px;top:130px','',173.4,176.7,.6,.6);
ov('<b>atau <i>menerangi</i> dunia.</b>','left:150px;top:250px','',174.6,179.6,.7,.4);
ov('<b style="font-size:70px;font-style:italic">Pilihannya ada pada kita.</b>','left:0;right:0;top:430px;text-align:center','',176.8,179.7,.8,.4);

/* ============ ADEGAN 1 + DISPATCH ============ */
const K1=[[0,[1.2,.9,2.4],[0,.5,0]],[2.5,[-1.0,.75,2.0],[0,.5,0]],[4.8,[-2.2,1.6,3.6],[0,.5,-1]],[7.2,[0,3.4,6.5],[0,.7,-30]],[8.8,[6,9,15],[0,0,-60]],[10,[8,14,20],[0,0,-70]]];
ov('<small>Pembahasan sains</small><b>Kenapa bom nuklir bisa<br>menghasilkan <i>daya ledak</i><br>yang luar biasa?</b>','left:150px;top:150px','',.5,3.6);
ov('<small>Energi dari benda sebesar softball</small><b>≈ <i id="nT">0</i> ton TNT</b>','left:150px;top:140px','',kw(0,'puluhan'),9.6);
ov('<small>1 peti = 1 ton TNT (ilustrasi)</small>','left:150px;top:290px','',kw(0,'puluhan')+.4,9.6);
const L_B=lab('sebesar bola softball',PAL.aksen,140,-140,1.4,4.4,()=>pj(BOLA.position.clone().add(V3(.4,.5,0))),54);
function s1(t){ [BOLA,bolaGlow,MOTE,PETI_M,lantai].forEach(o=>o.visible=true); S.fog.density=.021; titik.visible=true;
  petiUpd(seg(t,kw(0,'puluhan')-.4,8.6)*220); BOLA.rotation.y=t*.25; BOLA.rotation.x=.2; bolaGlow.material.opacity=.8+.2*Math.sin(t*2); MOTE.position.y=Math.sin(t*.3)*.3; MOTE.rotation.y=t*.01;
  const tr=trk(t,K1); setCam(vOf(tr[0]),vOf(tr[1]),.012); titik.intensity=1.4+.3*Math.sin(t*2.5); matahari.intensity=1.5; rim.intensity=2.0; PP={ex:1.02,bl:.7,vig:.55,hangat:.3,sat:1.08};
  $('#nT').textContent=Math.round(20000*E.out(seg(t,kw(0,'puluhan'),8.0))).toLocaleString('id-ID'); }
const SC=[0,10,42,70,100,130,160,180], DIPS=[10,42,70,100,130,160];
let PP={ex:1,bl:.7,vig:.55,hangat:.3,sat:1.08};
function hideAll(){ [BOLA,bolaGlow,MOTE,PETI_M,lantai,GB,GC,GD,GE,GF,GG].forEach(o=>o.visible=false); titik.visible=true; FOV=32; S.fog.color.set(0x090a1a); hemi.intensity=.14; hemi.color.set(0x5a5fa8); }
let subY=H*.88;
function gambar(t){ TT=t; hideAll();
  const k=Math.max(0,SC.findIndex((v,i)=>i<7&&t>=v&&t<SC[i+1])); [s1,s2,s3,s4,s5,s6,s7][k](t);
  kubah.position.copy(cam.position); STARS.position.copy(cam.position); STARS.visible=k>=2;
  REN.setRenderTarget(RT); REN.render(S, cam);
  pSalin.uniforms.t.value = RT.texture; lewat(pSalin, R2);
  pTerang.uniforms.t.value = R2.texture; pTerang.uniforms.th.value = 1.0; lewat(pTerang, B4a); blur2(B4a, B4b, 1.2); blur2(B4a, B4b, 2.4);
  pSalin.uniforms.t.value = B4a.texture; lewat(pSalin, B8a); blur2(B8a, B8b, 1.6); blur2(B8a, B8b, 3.2);
  pSalin.uniforms.t.value = R2.texture; lewat(pSalin, RTS); blur2(RTS, RTSb, 1.5); blur2(RTS, RTSb, 2.5);
  const U=AKHIR.uniforms; Object.assign(U.tS,{value:RT.texture}); U.tB1.value=B4a.texture; U.tB2.value=B8a.texture; U.tR.value=RRAY.texture; U.tT.value=RTS.texture;
  U.ry.value=0; U.fok.value=.5; U.tilt.value=0; U.ex.value=PP.ex; U.bl.value=PP.bl; U.vig.value=PP.vig; U.hangat.value=PP.hangat; U.sat.value=PP.sat;
  let g=1-sstep(0,.5,t); DIPS.forEach(d=>{ g=Math.max(g,1-Math.abs(t-d)/.5); }); g=Math.max(g,sstep(179,180,t)); U.gelap.value=clamp(g);
  lewat(AKHIR,null); ovUpd(t); lblUpd(t);
  Object.assign($('#vSub').style,{left:'260px',width:'1400px',top:(subY-180)+'px',height:'330px',opacity:t>.6&&t<179?.85:0});
}
const SCENE = {
  dur: DUR, kata: KATA,
  sub:{gaya:'polos',maks:4,font:`800 52px '${FONT.sub}'`,warna:PAL.teks,aksen:PAL.aksen,kunci:['softball','tnt.','tnt,','puluhan','ribu','kimia.','inti','sendiri.','joule.','joule,','lipat.','atom.','proton','neutron.','neutron','nuklir','kuat','alam.','einstein','kuadrat.','massa','gram','energi.','berantai.','domino','bola','api','matahari.','hiroshima,','nagasaki.','hormat.','menerangi','menghancurkan,','dunia.','kita.'],y:()=>({x:W/2,y:subY})},
  audio: __AUDIO__,
  muat:()=>Promise.all([document.fonts.load(`600 100px '${FONT.judul}'`),document.fonts.load(`italic 600 100px '${FONT.judul}'`),document.fonts.load(`800 60px '${FONT.sub}'`),document.fonts.load(`500 24px 'Sora'`)]),
  build(tl){ grainOn(.05); },
  frame(t){ gambar(t); }
};
