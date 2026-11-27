/* ============ KAMERA, OVERLAY, ADEGAN ============ */
let subY = H*.88;
function catmull(a,b,c,d,k){ return b.map((_,i)=>.5*(2*b[i]+(c[i]-a[i])*k+(2*a[i]-5*b[i]+4*c[i]-d[i])*k*k+(3*b[i]-a[i]-3*c[i]+d[i])*k*k*k)); }
function trk(t,K){ const n=K.length; let i=0; while(i<n-2&&t>K[i+1][0]) i++; const k=E.s(clamp((t-K[i][0])/(K[i+1][0]-K[i][0]))); const g=(j,x)=>K[clamp(j,0,n-1)][x];
  return [catmull(g(i-1,1),g(i,1),g(i+1,1),g(i+2,1),k), catmull(g(i-1,2),g(i,2),g(i+1,2),g(i+2,2),k)]; }
const lgl = (a,b,k) => Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*k);
function setCam(pos, tg, shake){ const sh=shake||0; cam.position.set(pos.x+nz(TT*.9,1)*sh, pos.y+nz(TT*1.1,2)*sh, pos.z+nz(TT*.8,3)*sh);
  const d=cam.position.distanceTo(tg); cam.near=Math.max(.1,d*.002); cam.far=Math.max(9000,d*80); cam.updateProjectionMatrix(); cam.lookAt(tg); cam.updateMatrixWorld(); }
let TT = 0;
const pj = v => { const w=v.clone().project(cam); return [(w.x*.5+.5)*W,(-w.y*.5+.5)*H]; };
const vOf = a => V3(a[0],a[1],a[2]);

/* overlay teks layar */
const OV=[]; function ov(html, css, a, b, fi, fo){ const e=document.createElement('div'); e.className='ov'; e.style.cssText=css; e.innerHTML=html; $('#stage').appendChild(e); OV.push({e,a,b,fi:fi||.7,fo:fo||.6}); return e; }
function ovUpd(t){ OV.forEach(o=>{ const k=seg(t,o.a,o.a+o.fi)*(1-seg(t,o.b-o.fo,o.b)); o.e.style.opacity=k.toFixed(3); o.e.style.visibility=k>.002?'visible':'hidden'; }); }
const LBL=[]; function lab(teks, warna, dx, dy, a, b, pos, ukuran){ const l=label({dx,dy,teks,warna,font:`'${FONT.judul}'`,ukuran:ukuran||50,tebal:400}); LBL.push({l,a,b,pos}); return l; }
function lblUpd(t){ LBL.forEach(o=>{ const p=(t>=o.a-.2&&t<=o.b+.2)?o.pos():null; if(p) o.l.atur(t,o.a,o.b,p[0],p[1]); else o.l.atur(t,-9,-8,0,0); }); }

/* ---- teks layar per adegan ---- */
ov('<small>ILUSTRASI · TIDAK SESUAI SKALA</small>','right:140px;bottom:260px;font:500 24px Onest;letter-spacing:.18em;color:#9fa9d8',22.4,27.4);
ov('<small>1 tahun cahaya</small><b>≈ 9,46 triliun km</b>','left:150px;top:190px','',30.2,36.2);
ov('<small>BIMA SAKTI</small><b>±100.000 tahun cahaya</b>','left:150px;top:190px','',37.0,42.9);
ov('<small>RELATIVITAS KHUSUS · EINSTEIN (1905)</small><b>Batas kecepatan alam semesta</b>','left:150px;top:160px','',43.9,49.4);
ov('<small>KECEPATAN CAHAYA</small><b>299.792 km/detik</b>','left:150px;top:160px','',50.4,58);
ov('<small>BERPACU DENGAN CAHAYA</small><b>perlombaan yang pasti kalah</b>','left:150px;top:160px','',64.6,69.1);
ov('<small>RUANG-WAKTU BISA MELENGKUNG</small>','left:150px;top:170px','',73.6,77.2);
ov('<small>ALAM SEMESTA MENGEMBANG SEJAK BIG BANG</small>','left:150px;top:170px','',77.2,83.2);
ov('<small>GALAKSI JAUH · MENJAUH LEBIH CEPAT DARI CAHAYA</small>','left:150px;top:240px','',79.8,83.4);
ov('<small>BATAS KECEPATAN BERLAKU UNTUK</small><b>benda di dalam ruang</b>','left:150px;top:160px','',85.0,88.2);
ov('<small>BUKAN UNTUK</small><b>ruangnya sendiri</b>','left:150px;top:160px','',88.4,91.0,.6,.4);
ov('<small>MIGUEL ALCUBIERRE · FISIKAWAN</small><b>Alcubierre Drive (1994)</b>','left:150px;top:160px','',91.6,97.8);
ov('<small>PENUMPANG DI DALAM GELEMBUNG</small><b>tanpa percepatan terasa</b>','left:150px;top:160px','',113.6,117.6);
ov('<small>ENERGI NEGATIF?</small><b>belum pernah ditemukan</b>','left:150px;top:160px','',129.6,134.6);
ov('<small>HAMBATAN</small><b>belum bisa dikendalikan</b>','left:150px;top:160px','',148.8,152.4);
ov('<small>SAAT BERHENTI</small><b>ledakan radiasi</b>','left:150px;top:160px','',152.6,156.4);
ov('<small>RISET LANJUTAN</small><b>NASA &amp; para fisikawan</b>','left:150px;top:160px','',161.0,166.4);
ov('<small>USULAN TEORI TERBARU</small><b>tanpa energi negatif?</b>','left:150px;top:160px','',166.8,171.4);
ov('<b class="akh">mungkin suatu hari nanti?</b>','left:0;right:0;top:300px;text-align:center','',176.2,179.6,1.2,.5);
/* perbandingan waktu tempuh (adegan 5) */
const CMP = ov('<div class="row"><small>ROKET SEPERTI VOYAGER 1</small><div class="trk"><i id="cA"></i></div><b id="tA">±75.000 tahun</b></div><div class="row"><small>MESIN WARP · CONTOH 100× KECEPATAN CAHAYA</small><div class="trk"><i id="cB" class="vi"></i></div><b id="tB">±15 hari</b></div><em>perjalanan ke Proxima Centauri (4,24 tahun cahaya)</em>','left:1010px;top:130px;width:780px','',117.4,124.4);
/* gauge energi (adegan 6) */
const GAU = ov('<small>ENERGI YANG DIBUTUHKAN</small><div class="trk"><i id="gF" class="am"></i></div><b id="gT" style="font-size:52px"></b>','left:150px;top:150px;width:980px','',135.0,147.6);
/* grafik energi (adegan 3) */
const GRC = document.createElement('canvas'); GRC.width=700; GRC.height=470; GRC.style.cssText='position:absolute;left:1120px;top:120px;z-index:6;opacity:0'; $('#stage').appendChild(GRC); const GRX=GRC.getContext('2d');
const SPD = ov('<small>KECEPATAN PESAWAT</small><b id="spN">0%</b>','left:1120px;top:600px','',53.6,66.6);
function grafikUpd(t){ const a=seg(t,53.7,54.6)*(1-seg(t,66.2,66.9)); GRC.style.opacity=a.toFixed(3); if(a<.01) return;
  const b=beta3(t), g=1/Math.sqrt(1-b*b), W0=700,H0=470, x0=70,y0=410,x1=660,y1=40; GRX.clearRect(0,0,W0,H0);
  GRX.font='500 22px Onest'; GRX.fillStyle='#c7cfea'; GRX.fillText('energi yang dibutuhkan',x0,y1-8); GRX.textAlign='right'; GRX.fillText('kecepatan (% cahaya)',x1,H0-6); GRX.textAlign='left';
  GRX.strokeStyle='rgba(180,195,255,.55)'; GRX.lineWidth=2; GRX.beginPath(); GRX.moveTo(x0,y1); GRX.lineTo(x0,y0); GRX.lineTo(x1,y0); GRX.stroke();
  GRX.setLineDash([6,8]); GRX.strokeStyle='rgba(255,170,120,.8)'; GRX.beginPath(); GRX.moveTo(x1-8,y1); GRX.lineTo(x1-8,y0); GRX.stroke(); GRX.setLineDash([]);
  GRX.fillStyle='rgba(255,170,120,.95)'; GRX.fillText('100%',x1-52,y0+30);
  const X=bb=>x0+(x1-8-x0)*bb, Y=gg=>y0-(y0-y1)*Math.min(1,(gg-1)/9);
  GRX.strokeStyle='#b9a8ff'; GRX.lineWidth=5; GRX.shadowColor='#8f7bff'; GRX.shadowBlur=14; GRX.beginPath(); let first=true;
  for(let bb=0;bb<=Math.max(.001,Math.min(b,.9995));bb+=.002){ const gg=1/Math.sqrt(1-bb*bb); const px=X(bb),py=Y(gg); if(first){GRX.moveTo(px,py);first=false;} else GRX.lineTo(px,py); } GRX.stroke(); GRX.shadowBlur=0;
  const px=X(Math.min(b,.9995)), py=Y(g); GRX.fillStyle='#fff'; GRX.beginPath(); GRX.arc(px,py,9,0,6.283); GRX.fill();
  if(g>10){ GRX.font='400 70px "Instrument Serif"'; GRX.fillStyle='#ffd9b0'; GRX.fillText('→ ∞',px-150,y1+60); }
  const pct=b*100; $('#spN').textContent=(pct<99?pct.toFixed(0):pct<99.9?pct.toFixed(1):pct.toFixed(2)).replace('.',',')+'% cahaya'; }

/* ---- skenario kecepatan adegan 3 (dihitung sekali) ---- */
const BETA_K=[[43,.3],[49.5,.35],[54,.62],[56.6,.9],[60.6,.99],[62.8,.999],[69.6,.9995]];
function beta3(t){ let i=0; while(i<BETA_K.length-2&&t>BETA_K[i+1][0]) i++; const a=BETA_K[i],b=BETA_K[i+1]; return lerp(a[1],b[1],E.s(clamp((t-a[0])/(b[0]-a[0])))); }
const C3=60, X3=[0]; for(let i=1;i<=1400;i++){ const tt=43+(i-1)*.02; X3.push(X3[i-1]+beta3(tt)*C3*.02); }
const xs3 = t => { const f=clamp((t-43)/.02,0,1399), i=Math.floor(f); return lerp(X3[i],X3[i+1],f-i); };
const XL0 = xs3(49.5)+3.5, xl3 = t => XL0 + C3*(t-49.5);
/* adegan 5: lintasan pesawat */
const V5=t=>85*E.io(seg(t,104.9,108.6)); const X5=[0]; for(let i=1;i<=1800;i++){ const tt=91+(i-1)*.02; X5.push(X5[i-1]+V5(tt)*.02); }
const xs5 = t => { const f=clamp((t-91)/.02,0,1799), i=Math.floor(f); return lerp(X5[i],X5[i+1],f-i); };

/* ---- label 3D ---- */
let CTX = {};
lab('Tata Surya', PAL.label, 130, -110, 22.8, 27.2, () => pj(SUNP));
lab('Proxima Centauri', PAL.proxima, -60, -130, 27.4, 36.3, () => pj(PROXP));
lab('4,24 tahun cahaya', PAL.label, 0, -110, 28.4, 36.3, () => pj(SUNP.clone().addScaledVector(KEARAH,.5)));
[1,2,3,4].forEach(i => lab(String(i), PAL.label, 0, 86, 30.4+i*.35, 36.3, () => pj(SUNP.clone().addScaledVector(KEARAH.clone().normalize(),i*LY).add(V3(0,-9000,0))), 38));
lab('Bima Sakti', PAL.label, 80, -130, 37.2, 42.9, () => pj(GGAL.localToWorld(V3(-23000,0,-18000))));
lab('Tata Surya · kita di sini', PAL.proxima, -170, -120, 38.4, 42.9, () => pj(GGAL.localToWorld(MARK.clone())));
lab('Voyager 1', PAL.label, 150, 130, kw(0,'voyager')-.1, kw(0,'proxima')+.4, () => pj(PROBE.position));
lab('Proxima Centauri · 4,24 tahun cahaya', PAL.proxima, -170, -150, kw(0,'proxima')+.3, 13, () => pj(PROX.position));
lab('pesawat', PAL.label, 0, -90, 44.4, 69, () => pj(SHIP.position.clone().add(V3(0,3,0))), 44);
lab('cahaya', '#cfe6ff', 0, -80, 50.2, 66, () => pj(ORBL.position.clone().add(V3(0,1.5,0))), 44);
lab('menjauh > c', '#ffd9b0', 0, -80, 80.0, 83.4, () => pj(GX[0].s.position.clone().add(V3(0,3,0))), 40);
lab('menjauh > c', '#ffd9b0', 0, -80, 80.0, 83.4, () => pj(GX[1].s.position.clone().add(V3(0,3,0))), 40);
lab('pesawat', PAL.label, -30, 90, 85.2, 90.8, () => pj(SHIP.position.clone().add(V3(0,-1.5,0))), 40);
lab('foton', '#cfe6ff', 20, -80, 85.2, 89.4, () => pj(FOTON.position.clone().add(V3(0,.8,0))), 40);
lab('ruang menyusut', PAL.dingin, 60, -110, 100.9, 106.5, () => pj(SHIP.position.clone().add(V3(8.5,-3.5,0))), 52);
lab('ruang mengembang', '#e6a0ff', -60, -110, 102.7, 108, () => pj(SHIP.position.clone().add(V3(-8.5,3.2,0))), 52);
lab('gelembung warp', PAL.label, 80, -130, 99.0, 103.5, () => pj(SHIP.position.clone().add(V3(0,4.6,0))), 46);
lab('energi negatif?', '#e6a0ff', -100, -130, 129.8, 134.6, () => pj(SHIP.position.clone().add(V3(0,4.2,0))), 54);
lab('materi eksotis', '#c79bff', 100, 120, 131.0, 134.8, () => pj(SHIP.position.clone().add(V3(6,-1,0))), 46);
lab('≈ massa Jupiter', '#ffd9b0', 0, -150, 142.0, 146.5, () => pj(JUP.position.clone().add(V3(0,100,0))), 54);

/* ---- tampilan ---- */
const DIPS=[13.9,36.5,43.0,69.45,125.0,157.0], SC=[0,13.9,43.0,69.45,91,125.0,157.0,180];
let PP={ex:1.05,bl:.7,vig:.5,hangat:.15,sat:1.08,ry:0,sx:0,sy:0}, sunNow=ARAH_MATAHARI.clone();
function hideAll(){ [PROBE,bumi,atmos,GSOL,spSun,spProx,spPulse,rulerG,GGAL,SHIP,BUB,GRID,ORB,FOTON,FOTONGLOW,ORBL,ORBG,ORBT,DUST,STR,JUP,EXO,BURSTS,SHOCK,STAR7,STAR7G,PLAN7,PLAN7A,PROX].forEach(o=>o.visible=false); GX.forEach(g=>g.s.visible=false); }
function luminer(dir,mi,mf,hs){ matahari.position.copy(dir).multiplyScalar(300); matahari.target.position.set(0,0,0); matahari.intensity=mi; isi.intensity=mf; hemi.intensity=hs; }

/* ===== ADEGAN 1 ===== */
function s1(t){ PROBE.visible=bumi.visible=atmos.visible=PROX.visible=true; UB.uT.value=t; bumi.rotation.y=t*.012;
  const p=probeAt(t); PROBE.position.copy(p); const dir=probeDir(t); PROBE.rotation.set(0,Math.atan2(-dir.z,dir.x),Math.asin(dir.y)); PROBE.rotateX(t*.045); PROBE.updateMatrixWorld();
  kamera1(t); luminer(ARAH_MATAHARI,3.4,1.15,.38); sunNow=ARAH_MATAHARI.clone();
  PP={ex:1.05,bl:.7,vig:.5,hangat:.15,sat:1.08,ry:0,sx:0,sy:0};
  const tj=$('#tJudul'); tj.style.top='130px'; const aJ=seg(t,MOMEN.judulMasuk,MOMEN.judulMasuk+.6)*(1-seg(t,MOMEN.judulKeluar,MOMEN.judulKeluar+.6));
  Object.assign($('#vJudul').style,{left:'160px',width:'1600px',top:'20px',height:'330px',opacity:aJ});
  const aA=seg(t,MOMEN.angkaMasuk,MOMEN.angkaMasuk+.5)*(1-seg(t,MOMEN.angkaKeluar,MOMEN.angkaKeluar+.5)); const ta=$('#tAngka'); ta.style.top='250px'; ta.style.opacity=aA;
  $('#nA').textContent=Math.round(75000*E.out(seg(t,MOMEN.angkaMasuk,kw(0,'tahun')+.2))).toLocaleString('id-ID');
  Object.assign($('#vAngka').style,{left:'0px',width:'1100px',top:'150px',height:'520px',opacity:aA});
  const tm=$('#tMinggu'); tm.style.top='330px'; tm.style.opacity=seg(t,MOMEN.mingguMasuk,MOMEN.mingguMasuk+.6)*(1-seg(t,13.0,13.6)); }

/* ===== ADEGAN 2 ===== */
const EC = PUSAT_B.clone(), Mid2 = SUNP.clone().addScaledVector(KEARAH,.5);
function s2(t){ const u1=E.io(seg(t,14,23.2)), u2=E.io(seg(t,26.2,35.8));
  if(t<36.5){ bumi.visible=atmos.visible=t<27; GSOL.visible=true; spSun.visible=spProx.visible=true; rulerG.visible=t>27.2; spPulse.visible=t>28.6&&t<35.4;
    const es=lerp(1,.45,E.io(seg(t,19.6,23))); bumi.scale.setScalar(es); atmos.scale.setScalar(es); bumi.rotation.y=t*.012; UB.uT.value=t;
    const sd=ARAH_MATAHARI.clone().lerp(V3(0,0,-1),sstep(15,22,t)).normalize(); UB.uSun.value.copy(sd); sunNow=sd;
    let tg, dist, d3; const dA=V3(.02,.14,1).normalize(), dB=V3(0,.64,.77).normalize();
    if(t<26.2){ tg=EC.clone().add(V3(10,80,0)).lerp(SUNP,u1); dist=lgl(380,17000,u1); d3=dA.clone().lerp(dB,u1).normalize(); }
    else { tg=SUNP.clone().lerp(Mid2,u2); dist=lgl(17000,640000,u2); d3=dB.clone(); }
    setCam(tg.clone().addScaledVector(d3,dist), tg, .05+dist*.0004);
    const d=dist; spSun.position.copy(SUNP); spSun.scale.setScalar(Math.max(1,d*.05)); spSun.material.opacity=sstep(9000,60000,d);
    spProx.position.copy(PROXP); spProx.scale.setScalar(Math.max(1,d*.035)); spProx.material.opacity=sstep(60000,200000,d);
    GSOL.visible=d<120000; sunM.scale.setScalar(Math.max(.001,sstep(18.2,19.6,t))); UB.uSun.value.copy(sd);
    const pu=E.io(seg(t,28.6,35.2)); spPulse.position.copy(SUNP).addScaledVector(KEARAH,pu); spPulse.scale.setScalar(d*.03);
    luminer(ARAH_MATAHARI,0,0,.1); PP={ex:1.05,bl:.7,vig:.5,hangat:.1,sat:1.05,ry:0,sx:0,sy:0}; }
  else { GGAL.visible=true; GGAL.rotation.y=(t-36.5)*.02; GGAL.updateMatrixWorld(true);
    const u=E.io(seg(t,36.8,43)); const dist=lerp(150000,108000,u), ang=lerp(.0,.5,u);
    const tg=V3(0,0,0); const pos=V3(Math.sin(ang)*dist*.22, dist*.58, dist*.8); setCam(pos,tg,0);
    galCore.visible=galHalo.visible=true; GGAL.add(galCore,galHalo);
    luminer(ARAH_MATAHARI,0,0,.1); PP={ex:1.15,bl:.9,vig:.5,hangat:.2,sat:1.1,ry:0,sx:0,sy:0}; sunNow=ARAH_MATAHARI.clone();
    const p1=pj(GGAL.localToWorld(V3(-30000,0,0))), p2=pj(GGAL.localToWorld(V3(30000,0,0))); CTX.line=[p1,p2]; } }
const LINE = document.createElement('div'); LINE.style.cssText='position:absolute;height:3px;background:linear-gradient(90deg,rgba(185,168,255,0),#b9a8ff 12%,#b9a8ff 88%,rgba(185,168,255,0));z-index:6;transform-origin:0 50%;box-shadow:0 0 12px #8f7bff;opacity:0'; $('#stage').appendChild(LINE);
function lineUpd(t){ const o=seg(t,40.0,40.9)*(1-seg(t,42.3,42.9)); if(!CTX.line||o<.01||t<37){ LINE.style.opacity=0; return; }
  const [a,b]=CTX.line; const dx=b[0]-a[0], dy=b[1]-a[1]; LINE.style.left=a[0]+'px'; LINE.style.top=a[1]+'px'; LINE.style.width=Math.hypot(dx,dy)+'px'; LINE.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`; LINE.style.opacity=o.toFixed(3); }

/* ===== ADEGAN 3 ===== */
function s3(t){ SHIP.visible=true; DUST.visible=true; const xs=xs3(t); SHIP.position.set(xs,0,0); SHIP.rotation.set(0,0,-.1); SHIP.rotation.y=t*.2;
  const b=beta3(t); kapalUpd(t,.5+.5*b); const orb=t>=49.5; let cx=xs+14, dist=44;
  if(orb){ const xl=xl3(t); ORBL.visible=ORBG.visible=ORBT.visible=true; ORBL.position.set(xl,3.2,0); ORBG.position.copy(ORBL.position); ORBT.position.set(xl-45,3.2,0); const ap=sstep(49.5,50.4,t); ORBL.scale.setScalar(ap); ORBG.scale.setScalar(9*ap);
    cx=(xs+xl)/2; dist=Math.max(44,(xl-xs)*.95+30); } else { cx=xs+8; }
  DUST.visible=true; DUST.material.uniforms.uCx.value=cx;
  setCam(V3(cx,5+dist*.04,dist),V3(cx,1.4+dist*.13,0),.04); const ks=Math.pow(Math.max(1,dist/44),.85); SHIP.scale.setScalar(.9*ks); if(orb){ ORBG.scale.multiplyScalar(Math.pow(Math.max(1,dist/44),.55)); ORBL.scale.multiplyScalar(ks); } luminer(V3(.4,.7,.6).normalize(),3.4,.8,.35);
  PP={ex:1.05,bl:.8,vig:.55,hangat:.05,sat:1.05,ry:0,sx:0,sy:0}; SHIP.updateMatrixWorld(); sunNow=V3(.4,.7,-.6).normalize(); }

/* ===== ADEGAN 4 ===== */
function cam4(t){ const a=(-50+80*E.io(seg(t,69.5,91)))*DEG, R=46+16*E.io(seg(t,77,84))-26*E.io(seg(t,84.5,91)), y=lerp(26,12,E.io(seg(t,69.5,91)));
  return [V3(Math.cos(a)*R,y,Math.sin(a)*R), V3(0,lerp(-2,1.5,E.io(seg(t,84.5,91))),0)]; }
const A_EXP = t => 1+.9*E.io(seg(t,77.4,84));
function s4(t){ GRID.visible=true; const a=A_EXP(t);
  const D=12*E.io(seg(t,73.4,75.6))*(1-E.io(seg(t,76.2,77.4)));
  gridUpd({a,cx:0,cz:0,fx:0,fz:0,fr:95*a,op:sstep(69.6,71.4,t),D,wx:0,wz:0,ww:7,A:0});
  const os=sstep(72.6,73.6,t)*(1-sstep(76.2,77.2,t)); ORB.visible=os>.01; ORB.scale.setScalar(Math.max(.01,os)); ORB.position.set(0,-D+2.4*os,0);
  GX.forEach(g=>{ g.s.visible=t>76.2; const k=sstep(76.2,77.6,t); g.s.position.set(g.x*a,1.4,g.z*a); g.s.scale.setScalar(g.sc*k); g.s.material.opacity=k; });
  const sk=sstep(84.6,85.6,t); const sx=lerp(-14,0,E.io(seg(t,84.8,91))); SHIP.visible=sk>.01; SHIP.position.set(sx,2.2,0); SHIP.scale.setScalar(.9*sk); SHIP.rotation.set(0,t*.2,-.08); kapalUpd(t,.8);
  const fp=seg(t,85.0,88.8); FOTON.visible=FOTONGLOW.visible=fp>0&&fp<1; FOTON.position.set(lerp(-30,34,E.io(fp)*0+fp),2.2,-3.6); FOTONGLOW.position.copy(FOTON.position);
  const [p,tg]=cam4(t); setCam(p,tg,.03); luminer(V3(.3,.8,.5).normalize(),2.0,.4,.3);
  PP={ex:1.05,bl:.85,vig:.55,hangat:.05,sat:1.05,ry:0,sx:0,sy:0}; SHIP.updateMatrixWorld(); sunNow=V3(.3,.8,-.5).normalize(); }

/* ===== ADEGAN 5 ===== */
const K5=[[91,[13,5.5,6],[0,1,0]],[97,[4,6,14.5],[0,1,0]],[100,[-14,13,25],[1,0,0]],[104.9,[-22,15,26],[3,0,0]],[107.5,[-13,6,10],[5,1,0]],[109.5,[3.6,1.2,7.4],[0,1.2,0]],[113.5,[2.5,1.5,7.4],[0,1.2,0]],[117,[-14,6,24],[6,0,0]],[123.8,[-34,15,42],[12,0,0]],[125,[-36,16,44],[12,0,0]]];
function s5(t){ const xs=xs5(t), sp=V5(t); GRID.visible=true; SHIP.visible=true; BUB.visible=t>98.6; const sy=2.2; SHIP.position.set(xs,sy,0); SHIP.scale.setScalar(.9); SHIP.rotation.set(0,t*.2,-.08*sstep(104,108,t)); kapalUpd(t,1);
  const Aamp=4.0*E.io(seg(t,99.8,104)), gsA=GS*1.9, cx=Math.round(xs/gsA)*gsA;
  gridUpd({a:1.9,cx,cz:0,fx:xs,fz:0,fr:92,op:1,D:0,A:Aamp,xs,zs:0,R:6.3,w:3.0});
  BUB.position.set(xs,sy,0); BUB.material.uniforms.uK.value=E.io(seg(t,98.6,100.2))*(1-sstep(124,124.9,t)); BUB.material.uniforms.uT.value=t; BUB.material.uniforms.uF.value=0;
  const sk=E.io(seg(t,105.2,108.2))*(1-sstep(123.8,124.8,t)); STR.visible=sk>.01; if(STR.visible) streakUpd(t,xs,sy,0,Math.max(10,sp),sk);
  const tr=trk(t,K5), S0=V3(xs,sy,0); let pos=S0.clone().add(vOf(tr[0])), tg=S0.clone().add(vOf(tr[1]));
  if(t<96){ const [p4,t4]=cam4(91), k=E.io(seg(t,91,96)); pos=p4.clone().lerp(pos,k); tg=t4.clone().lerp(tg,k); }
  setCam(pos,tg,.03+.06*sk); luminer(V3(.3,.8,.5).normalize(),2.4,.6,.3);
  PP={ex:1.08,bl:.9+.3*sk,vig:.55,hangat:.05,sat:1.08,ry:0,sx:0,sy:0}; SHIP.updateMatrixWorld(); sunNow=V3(.3,.8,-.5).normalize();
  const rA=E.out(seg(t,117.8,120.2)), rB=E.out(seg(t,120.6,121.8)); $('#cA').style.width=(rA*100).toFixed(1)+'%'; $('#cB').style.width=Math.max(.8,rB*1.1).toFixed(1)+'%'; $('#tA').style.opacity=rA>.5?1:0; $('#tB').style.opacity=rB>.5?1:0; }

/* ===== ADEGAN 6 ===== */
const K6=[[125,[8,1.2,9],[0,0,0]],[128,[10,2,8],[0,0,0]],[134.5,[-2,3,14],[0,0,0]],[138,[0,12,40],[0,0,0]],[140.5,[35,5,70],[-60,10,-80]],[144.5,[40,6,75],[-110,14,-150]],[148.4,[16,3,28],[-30,6,-30]],[149.2,[8,1.5,10],[0,0,0]],[152,[9,2,10],[0,0,0]],[155,[14,3,22],[10,0,0]],[157,[20,5,32],[14,0,0]]];
function s6(t){ SHIP.visible=true; SHIP.position.set(0,0,0); SHIP.rotation.set(0,t*.1,-.05); SHIP.scale.setScalar(.9);
  const col=1-E.io(seg(t,152.3,153.3)); kapalUpd(t,.45*col); BUB.visible=col>.02; const wob=seg(t,148.8,152.4);
  BUB.scale.setScalar(Math.max(.05,col*(1+.06*Math.sin(t*9)*wob)));
  BUB.material.uniforms.uK.value=.55*col; BUB.material.uniforms.uT.value=t; BUB.material.uniforms.uF.value=Math.max(seg(t,125.6,128),wob)*.8;
  JUP.visible=t>138.5&&t<148.6; JUP.rotation.y=t*.03;
  const ek=seg(t,128.6,129.8)*(1-seg(t,147,148.4)); EXO.visible=ek>.01; EXO.material.opacity=.9*ek; { const m=EXO.userData.m, P=EXO.geometry.attributes.position.array;
    m.forEach((q,i)=>{ const a=q[0]+t*q[4]*.5, r=q[2]; P[i*3]=Math.cos(a)*r*.55; P[i*3+1]=q[1]*3.5; P[i*3+2]=Math.sin(a)*r; }); EXO.geometry.attributes.position.needsUpdate=true; }
  const t0=153.3, bk=seg(t,t0,156.4); BURSTS.visible=SHOCK.visible=t>=t0&&t<156.6;
  if(BURSTS.visible){ const V=BURSTS.userData.V, P=BURSTS.geometry.attributes.position.array, Co=BURSTS.geometry.attributes.color.array, dt=t-t0;
    for(let i=0;i<V.length;i++){ const v=V[i], f=Math.max(0,1-bk*(.9+v[3]*.3)); P[i*3]=v[0]*dt; P[i*3+1]=v[1]*dt; P[i*3+2]=v[2]*dt; Co[i*3]=1.6*f;Co[i*3+1]=.7*f;Co[i*3+2]=.35*f; }
    BURSTS.geometry.attributes.position.needsUpdate=true; BURSTS.geometry.attributes.color.needsUpdate=true;
    SHOCK.rotation.y=Math.PI/2; SHOCK.scale.setScalar(1+dt*55); SHOCK.material.opacity=.8*(1-bk)*(1-bk); SHOCK.position.set(0,0,0); }
  const tr=trk(t,K6); const sh=.03+.1*wob+.5*(seg(t,153.3,153.9)*(1-seg(t,153.9,156)));
  setCam(vOf(tr[0]),vOf(tr[1]),sh); luminer(V3(-.7,.35,.5).normalize(),2.3,.5,.12);
  PP={ex:.9,bl:.8,vig:.75,hangat:.0,sat:.9,ry:0,sx:0,sy:0}; SHIP.updateMatrixWorld(); sunNow=V3(-.7,.35,-.5).normalize();
  const gk=E.out(seg(t,135.3,139.2)), gs=E.io(seg(t,140.2,144.6)); const fill=t<140?gk*120:lerp(120,22,gs); $('#gF').style.width=Math.min(100,fill).toFixed(1)+'%'; $('#gF').style.opacity=1;
  $('#gT').textContent=t<139.6?(gk>.85?'▶ melampaui massa alam semesta teramati':''):(t<145.4?'≈ setara massa planet Jupiter':'tetap mustahil untuk sekarang'); }

/* ===== ADEGAN 7 ===== */
const K7=[[157,[-9,2.5,13],[8,1.5,-12]],[166,[-8,2.0,11],[10,2,-16]],[172,[-8.5,1.6,9.5],[14,3,-20]],[177,[-11,2.2,12],[16,4,-26]],[180,[-13,3,15],[18,5,-30]]];
function s7(t){ SHIP.visible=STAR7.visible=STAR7G.visible=PLAN7.visible=PLAN7A.visible=true; const xs=.35*(t-157); SHIP.position.set(xs,Math.sin(t*.5)*.15,0); SHIP.rotation.set(0,t*.15,-.06); SHIP.scale.setScalar(.9); kapalUpd(t,1);
  const tr=trk(t,K7); setCam(vOf(tr[0]),vOf(tr[1]),.025);
  const dk=STAR7.position.clone().sub(SHIP.position).normalize(); key7.position.copy(dk).multiplyScalar(300); key7.target.position.set(0,0,0); key7.intensity=3.4; luminer(V3(0,1,0),0,.55,.32); matahari.intensity=0;
  hemi.color.set(0x8a6a58); sunNow=STAR7.position.clone().sub(cam.position).normalize();
  const fw=V3(); cam.getWorldDirection(fw); PP={ex:.95,bl:.75,vig:.55,hangat:.3,sat:1.08,ry:0,sx:0,sy:0};
  STAR7G.scale.setScalar(210+8*Math.sin(t*1.3)); SHIP.updateMatrixWorld(); }
