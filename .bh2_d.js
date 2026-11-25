/* ===== BLACK HOLE PART 2 · lubang cacing · (memakai ulang corong, astronaut, pesawat, bintang, label Part 1) ===== */
[S_JATUH,S_CAHAYA,...S_RAYA,...S_KONV].forEach(s=>s.m.visible=false);GHO.visible=false;OBS.visible=false;CORONG.visible=false;GRPF.visible=false;
const st2=document.createElement('style');st2.textContent='.lt.sm{font-size:34px}.lt.sm small{font-size:26px}.lt.big.sm{font-size:50px}.lt.big.sm small{font-size:28px}';document.head.appendChild(st2);

/* ---------- LEMBARAN KISI: dua cekungan/tonjolan, dilipat seperti kertas ---------- */
const Y0=7.29,XA=0,XB=26,XC=13,GP=5,SX0=-24,SX1=50,SZ=28,NX=148,NZ=84;
const baseY=(x,z)=>{const ra=Math.hypot(x-XA,z),rb=Math.hypot(x-XB,z);return Y0-13/(1+ra/3.4)+8.5/(1+rb/2.6);};
function lipat(x,y,z,f,o){if(f<=0||x<=XC){o[0]=x;o[1]=y;return o;}const p=f*Math.PI,c=Math.cos(p),s=Math.sin(p),yc=baseY(XC,z),vx=x-XC,vy=y-yc;
  o[0]=XC+vx*c-vy*s;o[1]=yc+vx*s+vy*c+GP*(1-c)/2*Math.min(1,vx/6);return o;}
const PXP=new THREE.Plane(new THREE.Vector3(-1,0,0),26);
const gKisi=new THREE.BufferGeometry(),nV=(NX+1)*(NZ+1),pK=new Float32Array(nV*3),uK=new Float32Array(nV*2),iK=[];
for(let j=0;j<=NZ;j++)for(let i=0;i<=NX;i++){const k=j*(NX+1)+i;uK[k*2]=i/NX*((SX1-SX0)/2);uK[k*2+1]=j/NZ*SZ;}
for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++){const a=j*(NX+1)+i,b=a+1,c=a+NX+1,d=c+1;iK.push(a,c,b,b,c,d);}
gKisi.setAttribute('position',new THREE.BufferAttribute(pK,3));gKisi.setAttribute('uv',new THREE.BufferAttribute(uK,2));gKisi.setIndex(iK);
const mKisi=new THREE.MeshStandardMaterial({color:C('#7f98e0'),map:salin(tKisi,1,1),transparent:true,opacity:0,roughness:.5,metalness:.2,side:THREE.DoubleSide,clippingPlanes:[POTF,PXP],depthWrite:false,envMapIntensity:.8,emissive:C('#1a2a66'),emissiveIntensity:.25});
mKisi.map.wrapS=mKisi.map.wrapT=THREE.RepeatWrapping;mKisi.map.repeat.set(1,1);
const KISI=new THREE.Mesh(gKisi,mKisi);KISI.renderOrder=1;KISI.frustumCulled=false;SD.add(KISI);
let _fK=-1;const _o=[0,0];
function aturKisi(f){if(f===_fK)return;_fK=f;for(let j=0;j<=NZ;j++){const z=-SZ+2*SZ*j/NZ;for(let i=0;i<=NX;i++){const x=SX0+(SX1-SX0)*i/NX,k=(j*(NX+1)+i)*3;lipat(x,baseY(x,z),z,f,_o);pK[k]=_o[0];pK[k+1]=_o[1];pK[k+2]=z;}}
  gKisi.attributes.position.needsUpdate=true;gKisi.computeVertexNormals();}
/* irisan (penampang di bidang potong): pita oranye mengikuti profil lembaran */
const NR=300,gRib=new THREE.BufferGeometry(),pR=new Float32Array((NR+1)*2*3),iR=[];
for(let i=0;i<NR;i++){const a=i*2,b=a+1,c=a+2,d=a+3;iR.push(a,b,c,c,b,d);}
gRib.setAttribute('position',new THREE.BufferAttribute(pR,3));gRib.setIndex(iR);
const mRib=new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.DoubleSide,clippingPlanes:[PXP],toneMapped:false,transparent:true,opacity:0});
const RIB=new THREE.Mesh(gRib,mRib);RIB.renderOrder=2;RIB.frustumCulled=false;SD.add(RIB);
function aturRib(zc,f){for(let i=0;i<=NR;i++){const x=SX0+(SX1-SX0)*i/NR,y=baseY(x,zc);lipat(x,y,zc,f,_o);let k=i*6;pR[k]=_o[0];pR[k+1]=_o[1];pR[k+2]=zc;lipat(x,y-.4,zc,f,_o);pR[k+3]=_o[0];pR[k+4]=_o[1];pR[k+5]=zc;}
  gRib.attributes.position.needsUpdate=true;}
/* ujung corong A (dasar) dan ujung corong B setelah dilipat */
const TA2=[XA,baseY(XA,0)+.25,0],TB2=(()=>{const o=lipat(XB,baseY(XB,0),0,1,[0,0]);return[o[0],o[1]-.25,0];})();
/* terowongan penghubung: tabung berjari-jari berubah (bisa menutup) */
const cuT=new THREE.CatmullRomCurve3([new THREE.Vector3(...TB2),new THREE.Vector3(TB2[0]+1.7,lerp(TB2[1],TA2[1],.33),0),new THREE.Vector3(TB2[0]-1.4,lerp(TB2[1],TA2[1],.68),0),new THREE.Vector3(...TA2)],false,'catmullrom',.5);
const TU=48,TS=18,gTu=new THREE.BufferGeometry(),pT=new Float32Array((TU+1)*(TS+1)*3),iT=[],FR=cuT.computeFrenetFrames(TU,false),PT=cuT.getPoints(TU);
for(let u=0;u<TU;u++)for(let s=0;s<TS;s++){const a=u*(TS+1)+s,b=a+1,c=a+TS+1,d=c+1;iT.push(a,c,b,b,c,d);}
gTu.setAttribute('position',new THREE.BufferAttribute(pT,3));gTu.setIndex(iT);
function aturTu(r0,kp){for(let u=0;u<=TU;u++){const uu=u/TU,r=Math.max(.05,r0*(1-.93*kp*Math.pow(Math.sin(Math.PI*uu),.5)));for(let s=0;s<=TS;s++){const a=s/TS*6.2832,n=FR.normals[u],b=FR.binormals[u],k=(u*(TS+1)+s)*3,ca=Math.cos(a)*r,sa=Math.sin(a)*r;
  pT[k]=PT[u].x+ca*n.x+sa*b.x;pT[k+1]=PT[u].y+ca*n.y+sa*b.y;pT[k+2]=PT[u].z+ca*n.z+sa*b.z;}}gTu.attributes.position.needsUpdate=true;gTu.computeVertexNormals();}
const mTu=new THREE.MeshStandardMaterial({color:C('#a8c8ff'),transparent:true,opacity:0,roughness:.08,metalness:.2,envMapIntensity:1.8,side:THREE.DoubleSide,clippingPlanes:[POTF],depthWrite:false});
const TUN=new THREE.Mesh(gTu,mTu);TUN.renderOrder=3;TUN.frustumCulled=false;SD.add(TUN);
const mTuC=new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:0});const TUNC=new THREE.Mesh(gTu,mTuC);TUNC.frustumCulled=false;TUNC.renderOrder=3;SD.add(TUNC);
/* cincin materi eksotis: cincin energi berpendar yang menahan mulut terowongan */
const RING=[.1,.5,.9].map((uu,i)=>{const m=new THREE.MeshBasicMaterial({color:C('#ffb070'),blending:THREE.AdditiveBlending,transparent:true,opacity:0,depthWrite:false,toneMapped:false});
  const g=new THREE.Group(),tr=new THREE.Mesh(new THREE.TorusGeometry(2.4,.11,10,72),m),sp=sprite();SD.add(g);g.add(tr);const p=cuT.getPointAt(uu),tg=cuT.getTangentAt(uu);g.position.copy(p);g.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),tg.clone().normalize());g.userData={tr,sp,p,m,uu};return g;});
const ORB=sprite();
/* panggung dua panel (split screen): kiri black hole, kanan lubang cacing */
const PLX=100,PRX=200,SC_L=.8,SC_R=.3;
const CL=bikinCorong();CL.scale.setScalar(SC_L);CL.position.set(PLX,0,0);SD.add(CL);
const horL=new THREE.Mesh(new THREE.TorusGeometry(4*SC_L,.08,10,100),new THREE.MeshBasicMaterial({color:C(PAL.aks),clippingPlanes:[POTF],toneMapped:false}));horL.rotation.x=Math.PI/2;horL.position.set(PLX,SC_L*YF(4)+.02,0);SD.add(horL);
const tipLy=SC_L*(YF(.15)-.1);const sphL=new THREE.Mesh(new THREE.SphereGeometry(.28,16,12),new THREE.MeshBasicMaterial({color:C('#fff0e0'),toneMapped:false}));sphL.position.set(PLX,tipLy,0);SD.add(sphL);
const GLD=sprite(),GLO=sprite(),GLE=sprite();
const CR1=bikinCorong(),CR2=bikinCorong();[CR1,CR2].forEach((c,i)=>{c.scale.setScalar(SC_R);c.position.set(PRX+(i?9:-9),0,0);SD.add(c);});
const tipRy=SC_R*YF(.15);const cuW=new THREE.CatmullRomCurve3([[PRX-9,tipRy-.2,0],[PRX-6,-4.6,0],[PRX-2.6,-6.4,0],[PRX+2.6,-6.4,0],[PRX+6,-4.6,0],[PRX+9,tipRy-.2,0]].map(p=>new THREE.Vector3(...p)),false,'catmullrom',.4);
{const gt=new THREE.TubeGeometry(cuW,100,.9,16,false),tb=new THREE.Mesh(gt,new THREE.MeshStandardMaterial({color:C('#a8c8ff'),transparent:true,opacity:.3,roughness:.08,metalness:.2,envMapIntensity:1.8,side:THREE.DoubleSide,clippingPlanes:[POTF],depthWrite:false}));tb.renderOrder=2;
 tb.add(new THREE.Mesh(gt,new THREE.MeshBasicMaterial({color:C(PAL.aks),side:THREE.BackSide,clippingPlanes:[POTF],toneMapped:false,transparent:true,opacity:.55})));SD.add(tb);}
const ptL=[];for(let r=19;r>=.4;r-=.65)ptL.push([PLX-SC_L*r,SC_L*(YF(r)+.55),0]);ptL.push([PLX-.2,tipLy+.5,0]);
const pLs=strip(ptL,.38);
const ptR=[];for(let r=18;r>=.5;r-=1.1)ptR.push([PRX-9-SC_R*r,SC_R*(YF(r)+.6),0]);
cuW.getPoints(26).slice(1,-1).forEach(p=>ptR.push([p.x,p.y+.0,0]));
for(let r=.5;r<=18;r+=1.1)ptR.push([PRX+9+SC_R*r,SC_R*(YF(r)+.6),0]);ptR.push([PRX+9+SC_R*19+4,SC_R*YF(20)+4,0],[PRX+9+SC_R*19+8,SC_R*YF(20)+8.5,0]);
const pRs=strip(ptR,.38);
const AL=bikinAstronaut(),AR=bikinAstronaut();[AL,AR].forEach(a=>{a.scale.setScalar(.8);SD.add(a);});
/* ---------- KAMERA ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[6,4,0],105],[3.6,[10,4,0],62],[4.5,[8,3,0],56],[5.9,[2,0,0],50],[7.2,[4,0,0],56],[9.8,[13,3,0],112],[11.0,[13,3,0],112],[13.5,[8,1,0],86],[16.4,[0,-2,0],54],[18.5,[0,-2.2,0],40],[20.3,[0,-2.5,0],27],[29.6,[0,-2.5,0],25],[31,[0,-2.5,0],30],[45.4,[0,-2.5,0],30],[46.4,[0,-2.5,0],34],[56,[0,-1,0],70]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,200);cam.lookAt(_v);}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;tg[0]+=nz(t*.35,1)*.05;tg[2]+=nz(t*.3,2)*.05;pasangKamera(KD,tg,h,h*W/H);}
const PAN={L:{x:24,y:330,w:510,h:700,tg:[PLX,.6,0],lebar:27,cam:new THREE.OrthographicCamera(-1,1,1,-1,-400,400)},R:{x:546,y:330,w:510,h:700,tg:[PRX,.2,0],lebar:34,cam:new THREE.OrthographicCamera(-1,1,1,-1,-400,400)}};
Object.values(PAN).forEach(p=>pasangKamera(p.cam,p.tg,p.lebar*p.h/p.w,p.lebar));
function keLayar(p,pn){const P=pn?PAN[pn]:null;_v.set(p[0],p[1],p[2]).project(P?P.cam:KD);return P?[P.x+(_v.x+1)/2*P.w,P.y+(1-_v.y)/2*P.h]:[(_v.x+1)/2*W,(1-_v.y)/2*H];}
function letakkan(g,x,y,naik=1.3){g.position.set(x,y+naik,0);}
/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':'')+(o.sm?' sm':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p,L.pn);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0,b0=L.pn?PAN[L.pn].x+12:AMAN.kiri-10,b1=L.pn?PAN[L.pn].x+PAN[L.pn].w-12:AMAN.kanan;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,b0,b1-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,L.pn?380:300,(L.pn?PAN[L.pn].y+PAN[L.pn].h-16:1330)-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
const midT=[(TA2[0]+TB2[0])/2,(TA2[1]+TB2[1])/2,0];
tanda({t:'Singularitas',s:'titik di pusat black hole',p:[0,4.5,0],o:[-60,-230],a:1.5,b:4.5,am:1});
tanda({t:'Astronaut',s:'mencari jalan keluar',p:[20,7.4,0],o:[-120,-190],a:2.7,b:4.6});
tanda({t:'Ruang-waktu',s:'lembaran kisi yang melengkung',p:[9,baseY(9,0),0],o:[110,-190],a:5.3,b:7.0,am:1});
tanda({t:'Relativitas umum',s:'dari persamaannyalah solusi ini lahir',p:[-9,baseY(-9,0),0],o:[-60,-190],a:6.3,b:9.0});
tanda({t:'Lubang cacing',s:'terowongan teoretis',p:[XB,baseY(XB,0)+.2,0],o:[-130,-200],a:8.0,b:11.3,big:1,am:1});
tanda({t:'Dua titik ruang-waktu',s:'dihubungkan satu terowongan',p:[XA,baseY(XA,0),0],o:[130,-200],a:9.9,b:11.9});
tanda({t:'Dilipat',s:'seperti selembar kertas',p:[XC,baseY(XC,0)+.3,0],o:[120,-230],a:12.4,b:15.6,big:1,am:1});
tanda({t:'Ujung corong kedua',s:'muncul di sisi seberang',p:TB2,o:[140,-210],a:16.2,b:18.4,am:1});
tanda({t:'Terowongan',s:'penghubung dua sisi',p:midT,o:[-120,140],a:17.0,b:19.4});
tanda({t:'Materi eksotis',s:'energi negatif penahan terowongan',p:[TB2[0]+1.7,midT[1]+1,0],o:[140,-210],a:21.4,b:24.2,big:1,am:1});
tanda({t:'BELUM PERNAH DITEMUKAN',s:'hanya ada di persamaan',p:[midT[0]-1.4,midT[1]-1.4,0],o:[-120,230],a:24.3,b:27.4,big:1,am:1});
tanda({t:'Terowongan menutup',s:'sebelum ada yang sempat lewat',p:midT,o:[130,-230],a:27.7,b:30.2,am:1});
tanda({t:'Black hole',s:'ujungnya singularitas',p:[PLX-SC_L*10,SC_L*YF(10),0],o:[-40,-190],a:31.0,b:33.0,sm:1,pn:'L'});
tanda({t:'Singularitas',s:'titik di dasar corong',p:[PLX,tipLy,0],o:[-60,-210],a:32.4,b:45.4,sm:1,am:1,pn:'L'});
tanda({t:'Lubang cacing',s:'jika memang ada',p:[PRX-9-SC_R*9,SC_R*YF(9),0],o:[-30,-190],a:34.9,b:37.0,sm:1,pn:'R'});
tanda({t:'Sisi lain',s:'keluar di corong kedua',p:[PRX+9+SC_R*16,SC_R*YF(16)+.6,0],o:[-40,-190],a:38.4,b:45.4,sm:1,pn:'R'});
tanda({t:'Persamaan membolehkan',s:'secara matematika',p:midT,o:[130,-190],a:46.3,b:48.0,am:1});
tanda({t:'Belum teramati',s:'alam belum pernah menunjukkannya',p:TB2,o:[140,-220],a:48.1,b:50.3});
tanda({t:'HIPOTESIS',s:'belum terbukti',p:[midT[0],midT[1]-.5,0],o:[-110,-250],a:50.3,b:56,big:1,am:1});
const JEJAK=[[0,'RUANG ANGKASA › <b>SINGULARITAS</b>'],[4.5,'BLACK HOLE › <b>RUANG-WAKTU</b>'],[7.8,'<b>LUBANG CACING</b> (HIPOTESIS)'],[11.0,'KISI › <b>DILIPAT</b> JADI DUA SISI'],[18.3,'<b>MATERI EKSOTIS</b> · ENERGI NEGATIF'],[30.4,'BLACK HOLE <b>vs</b> LUBANG CACING'],[45.5,'<b>MANA DULUAN?</b>']];
/* ---------- panel split: bingkai, judul, spanduk ---------- */
const bgP={};['L','R'].forEach(k=>{const P=PAN[k];const b=mk('div','',$('#langit'));Object.assign(b.style,{position:'absolute',left:P.x+'px',top:P.y+'px',width:P.w+'px',height:P.h+'px',borderRadius:'30px',background:'radial-gradient(ellipse at 50% 40%,#1a2347,#05070f)',opacity:0});
  const f=mk('div','',$('#stage'));Object.assign(f.style,{position:'absolute',left:P.x+'px',top:P.y+'px',width:P.w+'px',height:P.h+'px',borderRadius:'30px',boxSizing:'border-box',border:'5px solid rgba(255,255,255,.95)',boxShadow:'0 0 40px rgba(255,106,31,.35),0 10px 34px rgba(0,0,0,.5)',zIndex:11,opacity:0,pointerEvents:'none'});
  const h=mk('div','',$('#stage'),k==='L'?'BLACK HOLE':'LUBANG CACING');Object.assign(h.style,{position:'absolute',left:P.x+'px',top:(P.y+22)+'px',width:P.w+'px',textAlign:'center',zIndex:12,opacity:0,font:'700 40px/1 var(--fj)',color:'#fff',textShadow:'0 2px 3px rgba(0,0,0,.8)'});
  bgP[k]={b,f,h};});
const mkPil=(k,txt,l)=>{const d=mk('div','',$('#stage'),txt);Object.assign(d.style,{position:'absolute',left:(PAN[k].x+10)+'px',top:'1052px',width:(PAN[k].w-20)+'px',textAlign:'center',zIndex:12,opacity:0,font:'700 46px/1 var(--fj)',color:'#fff',background:PAL.aks,padding:'14px 0',borderRadius:'16px'});return d;};
const PILL=mkPil('L','JALAN BUNTU'),PILR=mkPil('R','JEMBATAN (?)');
const BAN=mk('div','',$('#stage'),'KEDUANYA MASIH SEBATAS TEORI');Object.assign(BAN.style,{position:'absolute',left:'90px',top:'1150px',width:'900px',textAlign:'center',zIndex:13,opacity:0,font:'700 40px/1 var(--fj)',color:'#fff',background:PAL.aks,padding:'12px 0',borderRadius:'16px'});
const mkQ=()=>{const d=mk('div','',$('#stage'),'?');Object.assign(d.style,{position:'absolute',zIndex:12,opacity:0,font:'700 190px/1 var(--fj)',color:'#fff',textShadow:'0 0 30px '+PAL.aks+',0 0 70px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)',transform:'translate(-50%,-50%)'});return d;};
const Q1=mkQ(),Q2=mkQ();
function renderPanel(k){const P=PAN[k];RD.setViewport(P.x,H-P.y-P.h,P.w,P.h);RD.setScissor(P.x,H-P.y-P.h,P.w,P.h);RD.render(SD,P.cam);}
const SPK=[];
/* ---------- SCENE ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SKR=[[.4,'hum',.2],[1.6,'tik',.25],[4.45,'whoosh',.3],[5.4,'tik',.25],[6.4,'tik',.22],[8.0,'tik',.28],[8.1,'whoosh',.2],[12.3,'whoosh',.3],[16.2,'zing',.3],[17.0,'tik',.22],[20.3,'zing',.3],[21.4,'tik',.25],[24.3,'tik',.28],[26.4,'hiss',.25],[27.7,'tik',.22],[30.4,'whoosh',.3],[31.0,'tik',.22],[33.3,'zap',.3],[34.9,'tik',.22],[37.4,'zing',.3],[40.0,'tik',.25],[45.5,'whoosh',.3],[46.3,'tik',.22],[50.3,'zing',.3]];
const SCENE={dur:56.0,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['singularitas','lubang','cacing','corong','terowongan','eksotis','negatif','teori','buntu','jembatan','black','hole','menutup','ruang-waktu','relativitas','dilipat','ditemukan','sempat']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    const ZP=.001;POTF.constant=lerp(12,ZP,E.io(seg(t,4.5,5.9)));
    {const t0=4.45,t1=5.9,k=Math.sin(Math.PI*clamp(seg(t,t0,t1+.5)));FRC.position.z=POTF.constant+.01;FRC.visible=t>t0&&t<t1+.5;FRC.children.forEach((c,i)=>c.material.opacity=(i?1:.12)*k);}
    const split=sstep(30.4,31.1,t)*(1-sstep(45.5,46.2,t)),main=1-split;
    // black hole raksasa memudar, lembaran kisi muncul
    const fb=1-sstep(4.9,5.8,t),kf=sstep(4.7,5.6,t);BH.visible=fb>.01&&t<6;bola.material.opacity=fb;cak.material.opacity=fb;cinF.material.opacity=fb;cinF2.material.opacity=.6*fb;cak.rotation.z=t*.4;
    BL.visible=t<5.9;AST.visible=t<5.6;PES.visible=t<5.6;
    AST.position.set(20,YF(20)+2.4+Math.sin(t*1.3)*.25,0);AST.rotation.set(Math.sin(t*.7)*.12,.5+t*.1,Math.cos(t*.6)*.1);
    PES.position.y=8.2+Math.sin(t*.9)*.3;PES.rotation.y=.5+Math.sin(t*.4)*.1;
    // lembaran: ungkap bagian kanan lalu dilipat
    PXP.constant=lerp(26,62,E.io(seg(t,7.4,9.8)));
    const f=E.io(seg(t,11.0,16.4)),zc=Math.max(POTF.constant,-27);aturKisi(f);aturRib(clamp(zc,-27,27),f);
    mKisi.opacity=.9*kf*main;mRib.opacity=kf*main;KISI.visible=RIB.visible=main>.01&&kf>.01;
    // terowongan, cincin materi eksotis, penutupan
    const kt=E.out(seg(t,16.2,17.6)),kc=sstep(20.3,21.0,t)*(1-sstep(26.0,26.6,t)),pin=E.io(seg(t,26.3,29.2));
    aturTu(1.3,pin);TUN.visible=TUNC.visible=main>.01&&kt>.01;mTu.opacity=.42*kt*main;mTuC.opacity=.6*kt*main;
    RING.forEach((g,i)=>{const u=g.userData,fl=kc*(.8+.2*Math.sin(t*9+i*2)),vis=main>.01&&kc>.01;g.visible=vis;g.scale.setScalar(1+.07*Math.sin(t*5+i)+.35*(1-sstep(20.3,21.3,t)));u.m.opacity=fl;spr(u.sp,[u.p.x,u.p.y,u.p.z],6.5,vis?kc*.45:0);g.rotation.z=t*.6;});
    {const uo=clamp(seg(t,27.2,29.0))*.55,p=cuT.getPointAt(uo),op=(t>27.2&&t<29.5)?1:0,fl=sstep(29.0,29.2,t)*(1-sstep(29.2,29.8,t));spr(ORB,[p.x,p.y,p.z],1.3+fl*3.2,main>.01?Math.max(op*.95,fl):0);}
    // panel split
    ['L','R'].forEach(k=>{const b=bgP[k];b.b.style.opacity=split;b.f.style.opacity=split;b.h.style.opacity=split;});
    PILL.style.opacity=sstep(33.2,33.6,t)*split;PILR.style.opacity=sstep(37.4,37.8,t)*split;BAN.style.opacity=sstep(40.0,40.4,t)*(1-sstep(42.4,42.8,t));
    CL.visible=horL.visible=sphL.visible=CR1.visible=CR2.visible=split>.01;[AL,AR].forEach(a=>a.visible=split>.01);
    // pastikan material corong terlihat saat dipakai panel
    matF.opacity=.9;matFC.opacity=1;
    spr(GLD,[PLX,tipLy,0],1.6*(1+.35*Math.sin(t*3))*(t>33.2?2.2:1),split>.01?.85:0);
    const aL=seg(t,31.4,33.3),aR=seg(t,35.0,39.6);
    pLs.atur(split>.01?aL:0,t*2.4,split,1.8,'#ffe2b8');pRs.atur(split>.01?aR:0,t*2.4,split,1.8,'#ffe2b8');
    {const p=pLs.cu.getPointAt(clamp(aL));letakkan(AL,p.x,p.y,1.4);AL.rotation.set(0,.5,0);AL.visible=split>.01&&t>31.2&&t<33.5;const fz=sstep(33.0,33.6,t);spr(GLO,[PLX,tipLy+.3,0],3.5+3*Math.sin(Math.PI*clamp(seg(t,33.2,34.4))),split>.01?.9*(1-sstep(34.4,35,t))*(t>33.2?1:0):0);}
    {const p=pRs.cu.getPointAt(clamp(aR));letakkan(AR,p.x,p.y,1.1);AR.rotation.set(0,.5,0);AR.visible=split>.01&&t>34.9&&t<39.7;}
    {const o=sstep(39.0,39.5,t)*split;Q2.style.opacity=o;if(o>.01){const[x,y]=keLayar([PRX+9+SC_R*19+8,SC_R*YF(20)+8.5,0],'R');Q2.style.left=Math.min(x,PAN.R.x+PAN.R.w-70)+'px';Q2.style.top=y+'px';Q2.style.transform='translate(-50%,-50%) scale('+(1+.06*Math.sin(t*5))+')';}}
    {const o=sstep(46.6,47.1,t)*main;Q1.style.opacity=o*.95;if(o>.01){const[x,y]=keLayar([TB2[0],TB2[1]+7.5,0]);Q1.style.left=x+'px';Q1.style.top=y+'px';Q1.style.transform='translate(-50%,-50%) scale('+(1+.06*Math.sin(t*5))+')';}}
    kameraDunia(t);
    RD.setScissorTest(false);RD.setViewport(0,0,W,H);
    if(split<.999){RD.render(SD,KD);}
    if(split>.01){RD.setScissorTest(true);if(split>=.999){RD.setScissorTest(false);RD.clear();RD.setScissorTest(true);}renderPanel('L');renderPanel('R');RD.setScissorTest(false);RD.setViewport(0,0,W,H);}
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(105/(window.HC||105)))+'<small>ZOOM</small></span>';
  }};
