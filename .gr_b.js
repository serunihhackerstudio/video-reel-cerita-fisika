
/* ---------- tekstur tambahan (besar & lembut: anti-kedip) ---------- */
const tAsphalt=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#55585e';x.fillRect(0,0,w,h);bintik(x,w,h,160,['#4d5056','#5e6167','#52555b'],10,24,r);});
const tFacade=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#bdc1c9';x.fillRect(0,0,w,h);for(let j=0;j<3;j++)for(let i=0;i<2;i++){const g=x.createLinearGradient(0,j*85+14,0,j*85+70);g.addColorStop(0,'#5b8fb8');g.addColorStop(1,'#33648f');x.fillStyle=g;x.fillRect(i*128+12,j*85+14,104,58);x.fillStyle='#9a9fa8';x.fillRect(i*128+62,j*85+14,6,58);}x.fillStyle='#a5aab3';for(let j=0;j<3;j++)x.fillRect(0,j*85,w,7);});
const tRockS=teksturK(256,256,(x,w,h,r)=>{x.fillStyle='#6f6a82';x.fillRect(0,0,w,h);for(let j=0;j<8;j++){x.fillStyle=j%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)';x.fillRect(0,j*32+((r()*10)|0),w,18+((r()*10)|0));}bintik(x,w,h,200,['#7a7590','#645f77'],8,18,r);});
const tKisiG=teksturK(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(30,44,86,.5)';x.fillRect(0,0,w,h);x.fillStyle='rgba(190,215,255,.9)';x.fillRect(0,0,w,6);x.fillRect(0,0,6,h);});
const tBumiS=teksturK(512,256,(x,w,h,r)=>{x.fillStyle='#2b73bd';x.fillRect(0,0,w,h);const bl=(cx,cy,rx,ry,c1,c2)=>{for(let k=0;k<26;k++){const a=cx+(r()-.5)*rx*1.6,b=cy+(r()-.5)*ry*1.6,s=14+r()*30;x.fillStyle=r()<.6?c1:c2;x.beginPath();x.ellipse(a,b,s,s*(.6+r()*.5),r()*3,0,7);x.fill();}};bl(130,100,60,40,'#4f8f4a','#6f9f55');bl(160,170,30,50,'#5f9450','#a08a5a');bl(330,95,80,35,'#5c9048','#a89a62');bl(370,155,35,40,'#c4b27a','#8fa35a');x.fillStyle='rgba(240,248,255,.9)';x.fillRect(0,0,w,16);x.fillRect(0,h-20,w,20);},[1,1]);
[tAsphalt,tFacade,tRockS,tKisiG,tBumiS].forEach(t=>{t.anisotropy=RD.capabilities.getMaxAnisotropy();});
/* ================= DUNIA A: KOTA + BUMI (satu bidang potong PR) ================= */
const WA=new THREE.Group();SD.add(WA);
const mFac=MR('#ffffff',{map:tFacade,roughness:.5,metalness:.1}),mConB=MR('#ffffff',{map:tConc,roughness:.9}),mAsp=MR('#ffffff',{map:tAsphalt,roughness:.95}),mSoilR=MR('#ffffff',{map:tSoil,roughness:1}),mRockR=MR('#ffffff',{map:tRockS,roughness:.95});
const mMan=MR('#e0661f',{roughness:.7,emissive:C('#4a1a08')}),mOut=MR('#ffb43a',{roughness:.6,emissive:C('#5a3a08')}),mInn=MR('#fff0b8',{roughness:.5,emissive:C('#6a5a30')});
const CX=0;
[[-17,17,-.6,0,mAsp,'#2a2c30'],[-17,17,-3,-.6,mSoilR,'#c07a40'],[-17,17,-9,-3,mRockR,'#a99ee0'],[-17,17,-23,-9,mMan,'#ff8a2a'],[-17,17,-37,-23,mOut,'#ffd05a'],[-17,17,-45,-37,mInn,'#fff6cc']].forEach(([x0,x1,y0,y1,m,c])=>kbp(CR,x0,x1,y0,y1,-17,17,m,WA,c,y1<-8?30:8));
kbp(CR,-9,9,0,.15,-9,9,mConB,WA,'#d9d2c4',6);
/* gedung pencakar langit: dinding + lantai + atap, berongga */
for(let y=4;y<=44;y+=4)kbp(CR,-5.5,5.5,y,y+.4,-5.5,5.5,mConB,WA,'#f0c987',6);
kbp(CR,-6,6,0,46,-6,-5.5,mFac,WA,'#f0c987',10);kbp(CR,-6,-5.5,0,46,-6,6,mFac,WA,'#f0c987',10);kbp(CR,5.5,6,0,46,-6,6,mFac,WA,'#f0c987',10);kbp(CR,-6,6,0,46,5.5,6,mFac,WA,'#f0c987',10);
kbp(CR,-6.4,6.4,46,46.8,-6.4,6.4,mConB,WA,'#d9b6ff',6);
{const an=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,6,8),mMetal0());an.position.set(0,50,-3);WA.add(an);}
function mMetal0(){return M('#ffffff',{map:tMetal,roughness:.4,metalness:.6},false);}
/* gedung kota di sekitar (ikut terpotong) */
[[-12,-9,7,7,11],[-12,5,6,6,8],[9,-12,7,7,12],[-2,-13,6,6,14]].forEach(([x,z,w,d,h])=>kbp(CR,x-w/2,x+w/2,0,h,z-d/2,z+d/2,mFac,WA,'#f0c987',10));
/* jam besar di dinding luar +x (lantai dasar & puncak) */
const CLO=mkWatch(WA,[6.15,3.2,-3],5.2),CHI=mkWatch(WA,[6.15,42.5,-3],5.2);[CLO,CHI].forEach(c=>{c.g.rotation.z=-Math.PI/2;});
const INL=new THREE.PointLight(C('#fff1dc'),1.2,60,1.1);INL.position.set(0,22,-2);WA.add(INL);
/* jam atom + penyangga 30 cm (laboratorium kecil di samping gedung) */
const LAB=new THREE.Group();WA.add(LAB);
{const wd=M('#ffffff',{map:tWoodD,roughness:.6},false),mt=mMetal0();
 kb(9.6,14.8,.9,1.1,-3.5,-.6,wd,LAB,null,3);[[9.8,-3.3],[14.6,-3.3],[9.8,-.8],[14.6,-.8]].forEach(([x,z])=>kb(x-.08,x+.08,0,.9,z-.08,z+.08,wd,LAB,null,3));
 kb(12.6,14.4,1.1,2.6,-3.2,-.9,M('#9aa0aa',{roughness:.6,metalness:.4},false),LAB,null,3);
 kb(10.0,11.8,1.1,2.3,-3.0,-1.0,mt,LAB,null,3);kb(12.8,14.2,2.6,3.8,-2.9,-1.1,mt,LAB,null,3);}
const ATA=mkWatch(LAB,[10.9,2.4,-2.0],1.3),ATB=mkWatch(LAB,[13.5,3.9,-2.0],1.3);
[ATA,ATB].forEach(c=>{});
const RULER=mkTube([[12.4,1.1,-.5],[12.4,2.6,-.5]],.06,PAL.aks,tAlir,20);
/* strip tarikan gravitasi (menuju pusat Bumi) */
const GST=[[-15,9,-14,2],[-12,12,-36,2],[-9,14,-24,2],[-6,-1,-42,2],[-3,-1,-47,2],[3,-1,-47,2],[6,-1,-42,2],[9,14,-24,2],[12,12,-36,2],[15,9,-14,2]].map(([x,y0,y1,z])=>{const t=mkTube([[x,y0,z],[x,(y0+y1)/2,z],[x,y1,z]],.15,PAL.aks,tAlir,60);const hd=new THREE.Mesh(new THREE.ConeGeometry(.9,1.8,10),new THREE.MeshBasicMaterial({color:C(PAL.tb),toneMapped:false,transparent:true,opacity:0}));hd.rotation.x=Math.PI;hd.position.set(x,y1-.9,z);WA.add(hd);return{t,hd,y0,y1};});
/* jam di permukaan dan di inti Bumi + titik pusat */
const CSF=mkWatch(WA,[9,1.5,2],3),CCR=mkWatch(WA,[0,-41,2],3.2);const coreGl=sprite(tGlowW),surfGl=sprite(tGlowM),cenGl=sprite(tGlowM);
/* ponsel + jam saku besar (K7) */
const WATK=mkWatch(WA,[-8,10,10],7);WATK.g.visible=false;
const PHONE=new THREE.Group();PHONE.position.set(-1,9.5,9.5);WA.add(PHONE);
const PHL=liveTex(256,512);{const body=new THREE.Mesh(new THREE.BoxGeometry(3.4,6.6,.5),M('#22232c',{roughness:.4,metalness:.5},false));PHONE.add(body);const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.0,6.1),new THREE.MeshBasicMaterial({map:PHL.t,toneMapped:false}));scr.position.z=.28;PHONE.add(scr);}PHONE.visible=false;
/* ================= DUNIA B: KISI RUANG-WAKTU (corong) ================= */
const BASE=V3(0,2000,0),SB=.62,WB=new THREE.Group();WB.position.copy(BASE);WB.scale.setScalar(SB);SD.add(WB);WB.visible=false;
const YF=r=>7.29-17/(1+r/3),RR=26,RH=4;
function profilCorong(tebal){const top=[],bot=[];for(let i=0;i<=90;i++){const r=lerp(.15,RR,Math.pow(i/90,1.6));top.push([r,YF(r)]);bot.push([r,YF(r)-tebal]);}return top.reverse().concat(bot).concat([[RR,YF(RR)]]);}
const tKisiR=tKisiG.clone();tKisiR.needsUpdate=true;tKisiR.repeat.set(28,14);tKisiR.wrapS=tKisiR.wrapT=THREE.RepeatWrapping;
const FUN=new THREE.Mesh(new THREE.LatheGeometry(profilCorong(.3).map(([r,y])=>new THREE.Vector2(r,y)),120),new THREE.MeshStandardMaterial({color:C('#8aa4ea'),map:tKisiR,transparent:true,opacity:.92,roughness:.5,metalness:.2,side:THREE.DoubleSide,depthWrite:false,emissive:C('#1a2a66'),emissiveIntensity:.5}));FUN.renderOrder=1;WB.add(FUN);
const BALL=new THREE.Mesh(new THREE.SphereGeometry(5,40,28),new THREE.MeshStandardMaterial({map:tBumiS,roughness:.9}));BALL.position.set(0,YF(.15)+6.4,0);BALL.castShadow=true;WB.add(BALL);
const BHOLE=new THREE.Group();BHOLE.position.set(0,YF(.15)+2.2,0);WB.add(BHOLE);
{const s=new THREE.Mesh(new THREE.SphereGeometry(3.3,36,24),new THREE.MeshBasicMaterial({color:0x000000,toneMapped:false}));BHOLE.add(s);const ring=new THREE.Mesh(new THREE.TorusGeometry(RH,.18,10,96),new THREE.MeshBasicMaterial({color:C(PAL.aks),toneMapped:false}));ring.rotation.x=Math.PI/2;ring.position.y=-1.6;BHOLE.add(ring);
 const ac=new THREE.Mesh(new THREE.RingGeometry(4.6,8.6,96),new THREE.MeshBasicMaterial({color:C('#ff9ad8'),transparent:true,opacity:.55,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));ac.rotation.x=-Math.PI/2;ac.position.y=-1.4;BHOLE.add(ac);}
BHOLE.visible=false;
const FCK=[23,15,9,5.4].map((r,i)=>{const a=(i*.9+.4),w=mkWatch(WB,[r*Math.cos(a),YF(r)+2.2,r*Math.sin(a)],3.6);return{w,r};});
const FALL=mkWatch(WB,[0,0,0],2.0),OBSC=mkWatch(WB,[24*Math.cos(.8),YF(24)+1.6,24*Math.sin(.8)],2.0);const fallGl=sprite(tGlowM);
const TANYA=sprite(tTanya);
