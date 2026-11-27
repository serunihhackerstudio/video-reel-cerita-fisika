/* ===== EP 6 · lubang cacing sebagai mesin waktu · memakai ulang kisi terlipat, astronaut, pesawat, label Part 2 ===== */
[S_JATUH,S_CAHAYA,...S_RAYA,...S_KONV].forEach(s=>s.m.visible=false);GHO.visible=false;OBS.visible=false;CORONG.visible=false;GRPF.visible=false;BH.visible=false;
const st2=document.createElement('style');st2.textContent='.lt.sm{font-size:34px}.lt.sm small{font-size:26px}.lt.big.sm{font-size:50px}.lt.big.sm small{font-size:28px}#tl{position:absolute;left:60px;right:60px;top:1060px;height:330px;z-index:13;opacity:0;pointer-events:none}#tl .ax{position:absolute;left:0;right:0;top:170px;height:6px;border-radius:3px;background:rgba(255,255,255,.55)}#tl .tk{position:absolute;top:186px;font:700 28px/1 var(--fm);color:rgba(255,255,255,.85);transform:translateX(-50%);text-shadow:0 2px 3px rgba(0,0,0,.8)}#tl .zn{position:absolute;top:120px;height:50px;border-radius:12px;font:700 26px/50px var(--fm);text-align:center;letter-spacing:.04em;color:#fff}#tl .mk{position:absolute;width:6px;transform:translateX(-50%);border-radius:3px}#tl .tx{position:absolute;white-space:nowrap;transform:translateX(-50%);font:700 32px/1.1 var(--fj);color:#fff;text-align:center;text-shadow:0 2px 3px rgba(0,0,0,.85),0 0 12px rgba(0,0,0,.6)}#tl .tx small{display:block;font:600 24px/1.1 var(--fm);margin-top:6px;color:#eee}';document.head.appendChild(st2);

/* ---------- LEMBARAN KISI TERLIPAT (shot yang sama dengan Part 2) ---------- */
const Y0=7.29,XA=0,XB=26,XC=13,GP=5,SX0=-24,SX1=50,SZ=28,NX=148,NZ=84;
const baseY=(x,z)=>{const ra=Math.hypot(x-XA,z),rb=Math.hypot(x-XB,z);return Y0-13/(1+ra/3.4)+8.5/(1+rb/2.6);};
function lipat(x,y,z,f,o){if(f<=0||x<=XC){o[0]=x;o[1]=y;return o;}const p=f*Math.PI,c=Math.cos(p),s=Math.sin(p),yc=baseY(XC,z),vx=x-XC,vy=y-yc;
  o[0]=XC+vx*c-vy*s;o[1]=yc+vx*s+vy*c+GP*(1-c)/2*Math.min(1,vx/6);return o;}
const PXP=new THREE.Plane(new THREE.Vector3(-1,0,0),80);
const gKisi=new THREE.BufferGeometry(),nV=(NX+1)*(NZ+1),pK=new Float32Array(nV*3),uK=new Float32Array(nV*2),iK=[];
for(let j=0;j<=NZ;j++)for(let i=0;i<=NX;i++){const k=j*(NX+1)+i;uK[k*2]=i/NX*((SX1-SX0)/2);uK[k*2+1]=j/NZ*SZ;}
for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++){const a=j*(NX+1)+i,b=a+1,c=a+NX+1,d=c+1;iK.push(a,c,b,b,c,d);}
gKisi.setAttribute('position',new THREE.BufferAttribute(pK,3));gKisi.setAttribute('uv',new THREE.BufferAttribute(uK,2));gKisi.setIndex(iK);
const mKisi=new THREE.MeshStandardMaterial({color:C('#7f98e0'),map:salin(tKisi,1,1),transparent:true,opacity:.9,roughness:.5,metalness:.2,side:THREE.DoubleSide,clippingPlanes:[POTF,PXP],depthWrite:false,envMapIntensity:.8,emissive:C('#1a2a66'),emissiveIntensity:.25});
mKisi.map.wrapS=mKisi.map.wrapT=THREE.RepeatWrapping;
const KISI=new THREE.Mesh(gKisi,mKisi);KISI.renderOrder=1;KISI.frustumCulled=false;SD.add(KISI);
const _o=[0,0];
(function(){for(let j=0;j<=NZ;j++){const z=-SZ+2*SZ*j/NZ;for(let i=0;i<=NX;i++){const x=SX0+(SX1-SX0)*i/NX,k=(j*(NX+1)+i)*3;lipat(x,baseY(x,z),z,1,_o);pK[k]=_o[0];pK[k+1]=_o[1];pK[k+2]=z;}}gKisi.attributes.position.needsUpdate=true;gKisi.computeVertexNormals();})();
const NR=300,gRib=new THREE.BufferGeometry(),pR=new Float32Array((NR+1)*2*3),iR=[];
for(let i=0;i<NR;i++){const a=i*2,b=a+1,c=a+2,d=a+3;iR.push(a,b,c,c,b,d);}
gRib.setAttribute('position',new THREE.BufferAttribute(pR,3));gRib.setIndex(iR);
const mRib=new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.DoubleSide,clippingPlanes:[PXP],toneMapped:false,transparent:true,opacity:0});
const RIB=new THREE.Mesh(gRib,mRib);RIB.renderOrder=2;RIB.frustumCulled=false;SD.add(RIB);
function aturRib(zc){for(let i=0;i<=NR;i++){const x=SX0+(SX1-SX0)*i/NR,y=baseY(x,zc);lipat(x,y,zc,1,_o);let k=i*6;pR[k]=_o[0];pR[k+1]=_o[1];pR[k+2]=zc;lipat(x,y-.4,zc,1,_o);pR[k+3]=_o[0];pR[k+4]=_o[1];pR[k+5]=zc;}gRib.attributes.position.needsUpdate=true;}
const TA2=[XA,baseY(XA,0)+.25,0],TB2=(()=>{const o=lipat(XB,baseY(XB,0),0,1,[0,0]);return[o[0],o[1]-.25,0];})();
const cuT=new THREE.CatmullRomCurve3([new THREE.Vector3(...TB2),new THREE.Vector3(TB2[0]+1.7,lerp(TB2[1],TA2[1],.33),0),new THREE.Vector3(TB2[0]-1.4,lerp(TB2[1],TA2[1],.68),0),new THREE.Vector3(...TA2)],false,'catmullrom',.5);
const TU=48,TS=18,gTu=new THREE.BufferGeometry(),pT=new Float32Array((TU+1)*(TS+1)*3),iT=[],FR=cuT.computeFrenetFrames(TU,false),PT=cuT.getPoints(TU);
for(let u=0;u<TU;u++)for(let s=0;s<TS;s++){const a=u*(TS+1)+s,b=a+1,c=a+TS+1,d=c+1;iT.push(a,c,b,b,c,d);}
gTu.setAttribute('position',new THREE.BufferAttribute(pT,3));gTu.setIndex(iT);
function aturTu(r0,kp){for(let u=0;u<=TU;u++){const uu=u/TU,r=Math.max(.05,r0*(1-.93*kp*Math.pow(Math.sin(Math.PI*uu),.5)));for(let s=0;s<=TS;s++){const a=s/TS*6.2832,n=FR.normals[u],b=FR.binormals[u],k=(u*(TS+1)+s)*3,ca=Math.cos(a)*r,sa=Math.sin(a)*r;
  pT[k]=PT[u].x+ca*n.x+sa*b.x;pT[k+1]=PT[u].y+ca*n.y+sa*b.y;pT[k+2]=PT[u].z+ca*n.z+sa*b.z;}}gTu.attributes.position.needsUpdate=true;gTu.computeVertexNormals();}
const mTu=new THREE.MeshStandardMaterial({color:C('#a8c8ff'),transparent:true,opacity:.45,roughness:.08,metalness:.2,envMapIntensity:1.8,side:THREE.DoubleSide,clippingPlanes:[POTF],depthWrite:false});
const TUN=new THREE.Mesh(gTu,mTu);TUN.renderOrder=3;TUN.frustumCulled=false;SD.add(TUN);
const mTuC=new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:.6});const TUNC=new THREE.Mesh(gTu,mTuC);TUNC.frustumCulled=false;TUNC.renderOrder=3;SD.add(TUNC);
const midT=[(TA2[0]+TB2[0])/2,(TA2[1]+TB2[1])/2,0];
/* ---------- JAM BESAR DI SAMPING TIAP MULUT ---------- */
const RAXv=new THREE.Vector3(Math.cos(45*DEG),0,-Math.sin(45*DEG)),UPv=new THREE.Vector3(-Math.sin(30*DEG)*Math.sin(45*DEG),Math.cos(30*DEG),-Math.sin(30*DEG)*Math.cos(45*DEG));
const QCAM=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(RAXv,UPv,new THREE.Vector3(Math.sin(45*DEG)*Math.cos(30*DEG),Math.sin(30*DEG),Math.cos(45*DEG)*Math.cos(30*DEG))));
function bikinJam(nama){const g=new THREE.Group(),c=kanvas(512,512),x=c.getContext('2d'),tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;tx.anisotropy=8;
  const brass=bhn('#c9993a',{metalness:.8,roughness:.32,emissive:C('#3a2706')},false);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(2.75,2.75,.6,48),brass);body.rotation.x=Math.PI/2;body.castShadow=true;g.add(body);
  const bez=new THREE.Mesh(new THREE.TorusGeometry(2.62,.2,12,64),brass);bez.position.z=.3;g.add(bez);
  const face=new THREE.Mesh(new THREE.CircleGeometry(2.5,48),new THREE.MeshBasicMaterial({map:tx,toneMapped:false}));face.position.z=.32;g.add(face);
  const crown=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.55,16),brass);crown.position.set(0,3.0,0);g.add(crown);const lp=new THREE.Mesh(new THREE.TorusGeometry(.4,.1,8,20),brass);lp.position.set(0,3.55,0);g.add(lp);
  g.quaternion.copy(QCAM);SD.add(g);
  return{g,draw(year,sec,aks){x.fillStyle='#f6efd8';x.fillRect(0,0,512,512);x.strokeStyle='#2a1c10';for(let i=0;i<60;i++){const a=i*6*DEG,l=i%5?18:36;x.lineWidth=i%5?3:7;x.beginPath();x.moveTo(256+Math.sin(a)*(240-l),256-Math.cos(a)*(240-l));x.lineTo(256+Math.sin(a)*240,256-Math.cos(a)*240);x.stroke();}
    x.fillStyle='#6a3a8a';x.font="bold 46px 'JetBrains Mono',monospace";x.textAlign='center';x.textBaseline='middle';x.fillText(nama,256,150);
    x.fillStyle=aks?'#b01fd0':'#2a1c10';x.font="bold 120px 'Space Grotesk',sans-serif";x.fillText(String(Math.round(year)),256,330);
    const hand=(len,ang,w,col)=>{x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(256,256);x.lineTo(256+Math.sin(ang)*len,256-Math.cos(ang)*len);x.stroke();};
    hand(110,sec/12*.0+(sec*.05),12,'#2a1c10');hand(170,sec*.6,8,'#2a1c10');x.fillStyle='#b01fd0';x.beginPath();x.arc(256,256,16,0,7);x.fill();tx.needsUpdate=true;}};}
const CKA=bikinJam('MULUT A'),CKB=bikinJam('MULUT B');
const CKAp=[8.5,-2.4,3],CKBp=[11,7.5,3];
/* ---------- PESAWAT PEMBAWA MULUT B + ASTRONAUT ---------- */
const tokTex=teksturK(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='#ffffff';x.lineWidth=18;x.beginPath();x.arc(128,128,100,0,7);x.stroke();});
const TOK=new THREE.Group();SD.add(TOK);TOK.quaternion.copy(QCAM);{const r=new THREE.Mesh(new THREE.TorusGeometry(1.9,.2,12,56),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));TOK.add(r);const r2=new THREE.Mesh(new THREE.TorusGeometry(1.2,.1,10,48),new THREE.MeshBasicMaterial({color:C('#ffffff'),toneMapped:false,transparent:true,opacity:.8}));TOK.add(r2);}TOK.visible=false;
const GTOK=sprite(),GMRG=sprite();
const PTH=[[TB2[0],TB2[1]+.2,0],[3,7.5,1],[12,12,0],[28,16,-1],[46,20,-2],[62,23,-3],[46,17.5,-2],[28,12.8,0],[12,9.2,1],[3,5.4,1],[TB2[0],TB2[1]+.3,0]];
const S_VOY=strip(PTH,.16);
AST.scale.setScalar(1.15);
const tunPts=cuT.getPoints(24).reverse().map(p=>[p.x,p.y,p.z]);
const S_TERO=strip([[16,-1.5,1],[8,-3.4,.6],[TA2[0]+.3,TA2[1]-.1,0],...tunPts.slice(1,-1),[TB2[0],TB2[1]+.1,0],[-2.2,5.0,.5],[-4.2,6.0,1]],.15);
const RIAK=[0,1,2,3,4].map(i=>{const m=new THREE.MeshBasicMaterial({color:C('#ff9bff'),blending:THREE.AdditiveBlending,transparent:true,opacity:0,depthWrite:false,toneMapped:false});const g=new THREE.Group(),tr=new THREE.Mesh(new THREE.TorusGeometry(1,.1,10,64),m);g.add(tr);SD.add(g);g.userData={m};g.visible=false;return g;});
const GEN=sprite(),ORB=sprite();
/* ---------- KAMERA ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;o.dur=o.kata[o.kata.length-1][2];_st+=o.dur+.4;});
const CS=TTS.map(o=>o.start),CE=CS.map((s,i)=>s+TTS[i].dur),DURASI=CE[CE.length-1]+1.2;
const tw=(i,kw,n=0)=>{const ks=TTS[i].kata.filter(k=>k[0].toLowerCase().includes(kw));const k=ks[n]||TTS[i].kata[0];return CS[i]+k[1];};
const TC0=3.2,TC1=5.6,TCK=tw(0,'jembatan',1)-.35,TV0=tw(1,'dibawa')-.9,TV1=TV0+4.3,TV2=tw(3,'dibawa')-1.9,TV3=tw(3,'dibawa')+.2;
const TE0=tw(3,'masuk')-.5,TE1=tw(3,'keluar')+.2,TR0=tw(5,'energi')-.3,TR1=tw(5,'menghancurkannya')+.5;
const KD_KUNCI=[[0,[12,4,0],128],[3.0,[6,0,0],62],[6.0,[3,-1,0],46],[TV0-.2,[3,-1,0],44],[TV0+2.2,[28,9,0],100],[TV2-1.0,[28,9,0],100],[TV3+.4,[3,-1,0],46],[CS[4]-.3,[3,-4.5,0],44],[CE[4]+.3,[3,-4.5,0],44],[CS[5]+.4,[2,-5,0],30],[CE[5]+.2,[2,-5,0],26],[CS[6]+.6,[3,0,0],52],[DURASI,[3,0,0],56]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,200);cam.lookAt(_v);}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;pasangKamera(KD,tg,h,h*W/H);}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':'')+(o.sm?' sm':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
const voyP=t=>{const u=t<TV1?.5*E.io(seg(t,TV0,TV1)):t<TV2?.5:.5+.5*E.io(seg(t,TV2,TV3));return u;};
const tokPos=t=>{const p=S_VOY.cu.getPointAt(clamp(voyP(t)));return[p.x,p.y,p.z];};
const ASTI=[19,5.6,0],ASTP=t=>{const w=AST.position;return[w.x,w.y,w.z];};
tanda({t:'Lubang cacing',s:'jembatan antar dua tempat',p:midT,o:[130,-190],a:1.4,b:tw(0,'ternyata')-.2,big:1,am:1});
tanda({t:'Astronaut',s:'dan pesawat yang sama',p:ASTI,o:[-100,150],a:2.0,b:3.9});
tanda({t:'Mulut A',s:'satu ujung terowongan',p:TA2,o:[130,230],a:tw(0,'ternyata')-.2,b:tw(0,'jembatan',1)-.4,am:1});
tanda({t:'Mulut B',s:'ujung yang lain',p:TB2,o:[-130,-210],a:tw(0,'ternyata')+.1,b:tw(0,'jembatan',1)-.4,am:1});
tanda({t:'Jembatan antar dua waktu',s:'mungkin juga bisa',p:midT,o:[130,-230],a:tw(0,'jembatan',1)-.1,b:CE[0]+.5,big:1,am:1});
tanda({t:'Kip Thorne dan rekan',s:'usulan tahun 1988',p:midT,o:[130,-220],a:CS[1]+.3,b:tw(1,'andaikan')-.3,big:1,am:1});
tanda({t:'Lubang cacing stabil',s:'andaikan benar ada',p:midT,o:[-130,-220],a:tw(1,'andaikan')-.1,b:tw(1,'salah')-.3,am:1});
tanda({t:'Satu mulut dibawa pergi',s:'pesawat mendekati kecepatan cahaya',p:tokPos,o:[-100,-230],a:tw(1,'salah')-.1,b:tw(2,'paradoks')-.2,big:1,am:1});
tanda({t:'Paradoks kembar',s:'seperti episode 4',p:tokPos,o:[-100,-210],a:tw(2,'paradoks')-.1,b:tw(2,'mulut')-.3,am:1});
tanda({t:'Jam mulut B',s:'berdetak lebih lambat',p:CKBp,o:[-60,-230],a:tw(2,'mulut')-.2,b:CE[2]+.5,big:1,am:1});
tanda({t:'Dibawa pulang',s:'mulut B kembali ke tempatnya',p:TB2,o:[130,-230],a:tw(3,'dibawa')-.2,b:tw(3,'berbeda')-.2,am:1});
tanda({t:'Beda tahun',s:'jam A lebih maju dari jam B',p:CKAp,o:[-120,230],a:tw(3,'berbeda')-.2,b:TE0-.1,big:1,am:1});
tanda({t:'Masuk mulut A',s:'tahun 2060',p:ASTP,o:[130,230],a:TE0,b:tw(3,'keluar')-.3,am:1});
tanda({t:'Keluar di mulut B',s:'tahun 2050, lebih awal',p:TB2,o:[150,90],a:tw(3,'keluar')-.3,b:CE[3]+.4,big:1,am:1});
tanda({t:'Batas jangkauan',s:'tak bisa sebelum mesin dibuat',p:TB2,o:[-130,-230],a:CS[4]+.2,b:tw(4,'jawaban')-.3,big:1,am:1});
tanda({t:'Dugaan perlindungan<br>kronologi',s:'hukum alam mencegah mesin waktu',p:midT,o:[130,-220],a:CS[5]+.3,b:TR0-.2,big:1,am:1});
tanda({t:'Riak energi',s:'menumpuk di dalam terowongan',p:midT,o:[-130,-210],a:TR0-.1,b:tw(5,'menghancurkannya')-.3,am:1});
tanda({t:'Terowongan menutup',s:'sebelum dipakai',p:midT,o:[130,230],a:tw(5,'menghancurkannya')-.2,b:CE[5]+.4,big:1,am:1});
tanda({t:'Anggap berhasil',s:'terowongan terbuka lagi',p:midT,o:[130,-210],a:CS[6]+.2,b:tw(6,'mengubah')-.3,am:1});
tanda({t:'Mengubah masa lalu?',s:'apa yang terjadi?',p:TB2,o:[-130,-300],a:tw(6,'mengubah')-.2,b:DURASI,big:1,am:1});
const JEJAK=[[0,'LUBANG CACING › <b>JEMBATAN WAKTU</b>'],[CS[1],'<b>USULAN 1988</b> › MULUT DIBAWA PERGI'],[CS[2],'<b>JAM TIDAK SINKRON</b>'],[CS[3],'MASUK A › <b>KELUAR B LEBIH AWAL</b>'],[CS[4],'<b>BATAS</b> › MESIN WAKTU'],[CS[5],'<b>PELINDUNG ALAM</b> (DUGAAN)'],[CS[6],'<b>BISAKAH</b> MENGUBAH MASA LALU?']];
/* ---------- garis waktu 2000-2060 (bagian batas) ---------- */
const TL=mk('div','',$('#stage'));TL.id='tl';{const X=y=>(y-2000)/60*960;let h='<div class="zn" style="left:0;width:'+X(2030)+'px;background:rgba(120,120,140,.55)">TAK TERJANGKAU</div><div class="zn" id="zb" style="left:'+X(2030)+'px;width:'+(960-X(2030))+'px;background:'+PAL.aks+'">BISA DIKUNJUNGI</div><div class="ax"></div>';[2000,2010,2020,2030,2040,2050,2060].forEach(y=>{h+='<div class="tk" style="left:'+X(y)+'px">'+y+'</div>';});
  h+='<div class="mk" id="m30" style="left:'+X(2030)+'px;top:100px;height:84px;background:#fff"></div><div class="tx" id="t30" style="left:'+X(2030)+'px;top:30px">MESIN WAKTU JADI<small>2030</small></div>';
  h+='<div class="mk" id="m09" style="left:'+X(2009)+'px;top:140px;height:44px;background:#ffd24d"></div><div class="tx" id="t09" style="left:'+X(2009)+'px;top:228px;color:#ffd24d">PESTA HAWKING<small>2009 · tak ada tamu</small></div>';TL.innerHTML=h;}
const Q1=mk('div','',$('#stage'),'?');Object.assign(Q1.style,{position:'absolute',zIndex:12,opacity:0,font:'700 190px/1 var(--fj)',color:'#fff',textShadow:'0 0 30px '+PAL.aks+',0 0 70px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)',transform:'translate(-50%,-50%)'});
/* ---------- SFX & SCENE ---------- */
const SKR=[[.4,'hum',.2],[TC0,'whoosh',.3],[TCK,'zing',.28],[TV0+.4,'whoosh',.3],[TV0+2.0,'zap',.28],[TV2,'whoosh',.3],[TV3,'zing',.3],[TE0,'zap',.28],[TE1,'zing',.28],[CS[4]+.3,'tik',.26],[TR0,'hum',.26],[TR1,'hiss',.28],[CS[6]+.3,'zing',.26]];
DAFTAR.forEach(L=>{if(!SKR.some(s=>Math.abs(s[0]-L.a)<.3))SKR.push([L.a+.05,'tik',L.am?.26:.2]);});SKR.sort((a,b)=>a[0]-b[0]);
const SCENE={dur:DURASI,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['lubang','cacing','jembatan','waktu','waktu.','Thorne','1988,','stabil','mulutnya','kecepatan','cahaya','lambat','paradoks','berbeda','awal','keluar','mesin','Hawking','hukum','energi','menumpuk','menghancurkannya','berhasil.','mengubah','lalu?','masa']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    POTF.constant=lerp(32,.001,E.io(seg(t,TC0,TC1)));PXP.constant=80;
    {const k=Math.sin(Math.PI*clamp(seg(t,TC0-.05,TC1+.5)));FRC.position.z=POTF.constant+.01;FRC.visible=t>TC0&&t<TC1+.5;FRC.children.forEach((c,i)=>c.material.opacity=(i?1:.12)*k);}
    aturRib(clamp(POTF.constant,-27,27));mRib.opacity=sstep(TC0,TC0+.6,t);
    BL.visible=true;
    /* tunnel: menutup saat riak energi, buka lagi */
    const pin=E.io(seg(t,TR0+1.2,TR1))*(1-E.io(seg(t,CS[6]-.2,CS[6]+.8)));aturTu(1.3,pin);
    const kt=E.out(seg(t,TC0+1.2,TC1+.6));TUN.visible=TUNC.visible=kt>.01;mTu.opacity=.45*kt;mTuC.opacity=.6*kt;
    /* jam besar */
    const kj=sstep(TCK,TCK+.7,t),eV=clamp((t-TV0)/(TV3-TV0)),yA=2030+30*eV,yB=2030+20*eV,hold=t>TV3?1:0;
    [[CKA,CKAp,yA,1],[CKB,CKBp,yB,.667]].forEach(([J,p,y,rate],i)=>{J.g.visible=kj>.01;J.g.scale.setScalar(.55*popK(kj)+.001);J.g.position.set(p[0],p[1]+Math.sin(t*1.1+i)*.15,p[2]);J.draw(y,t*rate*10,i===1&&t>TV0);});
    /* pesawat + mulut B yang dibawa */
    const u=voyP(t),vis=t>=TV0-.2&&t<TV3+.9?1:0,pp=S_VOY.cu.getPointAt(clamp(u)),tg=S_VOY.cu.getTangentAt(clamp(u));
    TOK.visible=vis>0;TOK.position.set(pp.x,pp.y,pp.z);TOK.scale.setScalar(1+.08*Math.sin(t*6));
    spr(GTOK,[pp.x,pp.y,pp.z],7,vis?.7:0);
    const away=t<TV0-.2?0:1;
    if(vis){PES.position.set(pp.x+3.2,pp.y+.8,pp.z);PES.rotation.set(0,Math.atan2(-tg.z,tg.x)+(u>.5?Math.PI:0)*0,0);PES.rotation.y=u>.5?Math.PI+.2:.2;}
    else{PES.position.set(27,7+Math.sin(t*.9)*.3,-2);PES.rotation.y=.5+Math.sin(t*.4)*.1;}
    S_VOY.atur(clamp(u*1.0+.001),t*2.6,vis*.9,1.3,'#f7b6ff');
    {const f=Math.exp(-Math.pow((t-TV3)/.35,2));spr(GMRG,TB2,4+f*6,f*.9);}
    /* astronaut */
    {const aa=t<TE0-1.0?0:t<TE0?E.io(seg(t,TE0-1.0,TE0)):1,pS=clamp(seg(t,TE0,TE1)),pt=S_TERO.cu.getPointAt(clamp(pS*(t<TE0?0:1)));
     if(t<TE0-1.0)AST.position.set(ASTI[0],ASTI[1]+Math.sin(t*1.3)*.3,0);else if(t<TE0){const q=S_TERO.cu.getPointAt(0);AST.position.set(lerp(ASTI[0],q.x,aa),lerp(ASTI[1],q.y,aa),0);}else AST.position.set(pt.x,pt.y,pt.z);
     AST.rotation.set(Math.sin(t*.7)*.12,.5+t*.1,Math.cos(t*.6)*.1);
     S_TERO.atur(t<TE0?0:pS,t*2.6,(t>=TE0&&t<TE1+1.0?1:0)*.95*(1-sstep(TE1+.6,TE1+1.4,t)),1.3,'#f7b6ff');}
    /* riak energi di terowongan */
    {const kE=sstep(TR0,TR0+.6,t)*(1-sstep(TR1,TR1+.4,t)),gr=seg(t,TR0,TR1);RIAK.forEach((g,i)=>{const uu=((t*.45)+i/5)%1,p=cuT.getPointAt(uu),tg2=cuT.getTangentAt(uu);g.visible=kE>.01;g.position.copy(p);g.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),tg2.clone().normalize());
      const sc=.6+gr*2.1*(.6+.4*Math.sin(uu*Math.PI));g.scale.setScalar(sc);g.userData.m.opacity=kE*(.45+.5*gr)*Math.sin(uu*Math.PI);});
     spr(GEN,[midT[0],midT[1],0],4+gr*12,kE*(.35+.6*gr));
     const f=Math.exp(-Math.pow((t-TR1)/.3,2));spr(ORB,[midT[0],midT[1],0],3+f*9,f*.95);}
    /* garis waktu (bagian batas) */
    {const k=sstep(CS[4]+.1,CS[4]+.7,t)*(1-sstep(CE[4]+.1,CE[4]+.7,t));TL.style.opacity=k;
     $('#t30').style.opacity=sstep(tw(4,'sebelum')-.4,tw(4,'sebelum')+.2,t);$('#m30').style.opacity=sstep(tw(4,'sebelum')-.4,tw(4,'sebelum')+.2,t);
     $('#t09').style.opacity=sstep(tw(4,'pesta')-.4,tw(4,'pesta')+.2,t);$('#m09').style.opacity=sstep(tw(4,'pesta')-.4,tw(4,'pesta')+.2,t);}
    {const o=sstep(tw(6,'mengubah'),tw(6,'mengubah')+.5,t);Q1.style.opacity=o*.95;if(o>.01){const[x,y]=keLayar([TB2[0],TB2[1]+9,0]);Q1.style.left=x+'px';Q1.style.top=y+'px';Q1.style.transform='translate(-50%,-50%) scale('+(1+.06*Math.sin(t*5))+')';}}
    const sr=$('#seri');if(sr){const k=sstep(.35,.95,t);sr.style.opacity=k;sr.style.transform='translateY('+(1-k)*-14+'px)';const wh=sr.querySelector('.wh'),wm=sr.querySelector('.wm');if(wh){wh.setAttribute('transform','rotate('+(t*30)+' 32 36)');wm.setAttribute('transform','rotate('+(t*180)+' 32 36)');}}
    kameraDunia(t);
    RD.setScissorTest(false);RD.setViewport(0,0,W,H);RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(130/(window.HC||130)))+'<small>ZOOM</small></span>';
  }};
function popK(k){const c1=1.70158,c3=c1+1;return k<=0?0:k>=1?1:1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);}
