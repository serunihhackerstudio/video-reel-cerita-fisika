
/* ---------- KAMERA (ortografik, ±45° / ±30°) ---------- */
const AZ=45*DEG,EL=30*DEG,ARAH=new THREE.Vector3(Math.sin(AZ)*Math.cos(EL),Math.sin(EL),Math.cos(AZ)*Math.cos(EL));
const KD_KUNCI=[[0,[0,4,0],118],[2.8,[0,4,0],70],[4.4,[.2,3.1,0],20],[6.5,[0,3.3,0],12.5],[7.6,[0,3.5,0],11.5],[14.8,[0,3.5,0],11],[16.5,[0,3.2,0],10.5],[17.7,[0,3.1,0],22],[18.9,[0,3,0],50],[20.2,[0,12,0],94],[46.0,[0,12,0],94],[47.4,[0,5,0],110],[53.8,[0,5,0],116]];
const halus=k=>k*k*k*(k*(k*6-15)+10),_v=new THREE.Vector3();
function cariKunci(K,t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;return[K[i],K[i+1],halus(clamp((t-K[i][0])/(K[i+1][0]-K[i][0])))];}
function pasangKamera(cam,tg,h,w){Object.assign(cam,{left:-w/2,right:w/2,top:h/2,bottom:-h/2});cam.updateProjectionMatrix();_v.set(...tg);cam.position.copy(_v).addScaledVector(ARAH,150);cam.lookAt(_v);}
function kameraDunia(t){const[A,B,e]=cariKunci(KD_KUNCI,t),tg=A[1].map((v,j)=>lerp(v,B[1][j],e)),h=Math.exp(lerp(Math.log(A[2]),Math.log(B[2]),e));window.HC=h;tg[0]+=nz(t*.35,1)*.04;tg[2]+=nz(t*.3,2)*.04;pasangKamera(KD,tg,h,h*W/H);}
function keLayar(p){_v.set(p[0],p[1],p[2]).project(KD);return[(_v.x+1)/2*W,(1-_v.y)/2*H];}
const KI=new THREE.OrthographicCamera(-1,1,1,-1,-400,400);

/* ---------- LABEL ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=keLayar(p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
tanda({t:'Gedung lab A',s:'detektor di ujung kabel',p:[-26,6.4,0],o:[60,-190],a:1.8,b:4.0});
tanda({t:'Gedung lab B',s:'jauh dari lab A',p:[26,6.4,0],o:[-60,-200],a:2.3,b:4.0});
tanda({t:'Serat optik',s:'menjalar ke dua arah',p:[-14,.3,0],o:[60,120],a:2.9,b:4.2});
tanda({t:'Meja peredam getar',s:'penuh lubang berulir',p:[3.6,2.5,1.6],o:[100,150],a:4.8,b:7.3});
tanda({t:'Laser',s:'sumber cahaya',p:[-3.3,3.45,0],o:[-80,-200],a:6.0,b:7.4,am:1});
tanda({t:'Pasangan foton',s:'keadaannya saling terkait',p:[0,4.4,0],o:[130,-210],a:8.6,b:13.3,am:1});
tanda({t:'ENTANGLEMENT',s:'keadaan tak bisa dipisah',p:[0,4.6,0],o:[100,-260],a:13.4,b:14.9,big:1,am:1});
tanda({t:'Kristal khusus',s:'membelah satu foton',p:[0,3.4,0],o:[-120,-200],a:15.3,b:18.2,am:1});
tanda({t:'Sepasang foton',s:'terjerat, saling berkorelasi',p:[-1.0,3.0,0],o:[-90,200],a:17.2,b:18.9,big:1,am:1});
tanda({t:'Serat optik',s:'foton dikirim berjauhan',p:[-16,.3,0],o:[70,-200],a:19.4,b:21.2});
const JEJAK=[[0,'KOTA › <b>DUA LABORATORIUM</b>'],[3.2,'DUA LAB › <b>LAB OPTIK</b>'],[4.4,'LAB OPTIK › <b>KRISTAL DIBELAH</b>'],[7.6,'<b>ENTANGLEMENT</b>'],[14.9,'KRISTAL › <b>SEPASANG FOTON</b>'],[21.3,'DETEKTOR A <b>&</b> B'],[29.3,'ANALOGI › <b>SARUNG TANGAN</b>'],[33.2,'<b>UJI BELL</b>'],[37.6,'<b>BUKAN KIRIM PESAN</b>'],[46.4,'<b>NOBEL FISIKA 2022</b>']];

/* ---------- inset detektor A & B (kamera dekat -> kanvas bulat) ---------- */
const mkInset=(left)=>{const c=mk('canvas','',$('#stage'));c.width=c.height=440;Object.assign(c.style,{position:'absolute',left:left+'px',top:'330px',width:'440px',height:'440px',borderRadius:'50%',zIndex:12,opacity:0,boxShadow:'0 0 0 5px rgba(255,255,255,.95),0 0 44px rgba(122,92,255,.55),0 10px 34px rgba(0,0,0,.5)',background:'#0d1020'});return c;};
const INA=mkInset(50),INB=mkInset(590);
const mkCap=(left,nama)=>{const d=mk('div','',$('#stage'),nama+'<span style="display:block;font:700 58px/1.15 var(--fj);color:'+PAL.aks+';margin-top:6px;letter-spacing:.06em"></span>');Object.assign(d.style,{position:'absolute',left:left+'px',top:'782px',width:'440px',textAlign:'center',zIndex:12,opacity:0,font:'700 32px/1 var(--fm)',color:'#fff',textShadow:'0 2px 3px rgba(0,0,0,.8),0 0 14px rgba(0,0,0,.6)'});return d;};
const CPA=mkCap(50,'DETEKTOR A'),CPB=mkCap(590,'DETEKTOR B');
function renderInset(cv,cx,t){const[ , ]=[0,0];pasangKamera(KI,[cx,1.5,0],6.4/(W/H),6.4);RD.render(SD,KI);const c=cv.getContext('2d');c.save();c.clearRect(0,0,440,440);c.drawImage(RD.domElement,0,(H-W*6.4/6.4)/2+0,W,W,0,0,440,440);c.restore();}
const SIMB=r=>r?'↔':'↑';
function historia(t){const h=HASIL.filter(e=>t>=e.l);return h.map(e=>SIMB(e.r)).join(' ');}
/* sarung tangan, grafik Bell, pesan, perbandingan, Nobel */
const mkLayer=(css)=>{const d=mk('div','',$('#stage'));d.style.cssText='position:absolute;z-index:12;opacity:0;'+css;return d;};
const GLV=mkLayer('left:0;top:0;width:'+W+'px;height:'+H+'px;pointer-events:none');
GLV.innerHTML='<div style="position:absolute;left:50px;top:330px;width:440px;height:440px;border-radius:50%;background:radial-gradient(#2a2f4a,#0d1020);box-shadow:0 0 0 5px #fff,0 10px 34px rgba(0,0,0,.5);font:230px/440px sans-serif;text-align:center">🧤</div><div style="position:absolute;left:590px;top:330px;width:440px;height:440px;border-radius:50%;background:radial-gradient(#2a2f4a,#0d1020);box-shadow:0 0 0 5px #fff,0 10px 34px rgba(0,0,0,.5);font:230px/440px sans-serif;text-align:center;transform:scaleX(-1)">🧤</div>'
 +'<div style="position:absolute;left:0;width:'+W+'px;top:792px;text-align:center;font:700 40px/1.1 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.8),0 0 14px rgba(0,0,0,.6)">SUDAH TERTENTU SEJAK AWAL</div>'
 +'<div id="strike" style="position:absolute;left:60px;top:390px;width:960px;height:10px;background:'+PAL.aks+';border-radius:5px;transform-origin:0 50%;transform:rotate(27deg) scaleX(0);box-shadow:0 0 24px '+PAL.aks+'"></div>'
 +'<div style="position:absolute;left:0;width:'+W+'px;top:880px;text-align:center"><span id="bukan" style="display:inline-block;padding:14px 34px;border-radius:18px;background:'+PAL.aks+';font:700 54px/1 var(--fj);color:#fff;opacity:0">BUKAN SEPERTI INI</span></div>';
const STR=GLV.querySelector('#strike'),BUK=GLV.querySelector('#bukan');
const BELL=mk('canvas','',$('#stage'));BELL.width=W;BELL.height=H;BELL.style.cssText='position:absolute;left:0;top:0;z-index:11;pointer-events:none';const BC=BELL.getContext('2d');
const mkTxt=(html,css)=>{const d=mk('div','',$('#stage'),html);d.style.cssText='position:absolute;z-index:12;opacity:0;text-shadow:0 3px 3px rgba(0,0,0,.8);'+css;return d;};
const BT1=mkTxt('BATAS PENJELASAN BIASA<small style="display:block;font:700 40px/1 var(--fj);margin-top:6px">S ≤ 2</small>','left:130px;top:1270px;width:440px;font:700 28px/1.15 var(--fm);color:#fff;text-align:center');
const BT2=mkTxt('HASIL EKSPERIMEN<small style="display:block;font:700 40px/1 var(--fj);margin-top:6px;color:'+PAL.tb+'">S ≈ 2,8</small>','left:530px;top:1270px;width:440px;font:700 28px/1.15 var(--fm);color:'+PAL.aks+';text-align:center');
const BT3=mkTxt('KORELASI','left:140px;top:735px;font:700 28px/1 var(--fm);color:#fff');
const MSG=mkLayer('left:0;width:'+W+'px;top:880px;text-align:center');MSG.innerHTML='<span style="display:inline-block;padding:14px 34px;border-radius:18px;background:'+PAL.aks+';font:700 50px/1.1 var(--fj);color:#fff">✕ TIDAK BISA KIRIM PESAN</span><div style="margin:18px auto 0;width:820px;font:700 34px/1.2 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.8)">lebih cepat dari cahaya</div>';
const CMP=mkLayer('left:0;top:0;width:'+W+'px;height:'+H+'px;pointer-events:none');
CMP.innerHTML='<div style="position:absolute;left:140px;top:905px;width:800px;border-top:6px dashed #e9edef;box-shadow:0 0 14px rgba(255,255,255,.5)"></div><div style="position:absolute;left:0;width:'+W+'px;top:930px;text-align:center;font:700 34px/1.2 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.8)">DIBANDINGKAN LEWAT JALUR BIASA</div><div style="position:absolute;left:0;width:'+W+'px;top:985px;text-align:center;font:700 56px/1 var(--fj);color:'+PAL.aks+';text-shadow:0 0 24px '+PAL.aks+'">✓ SEMUANYA COCOK</div>';
const DARK=mk('div','',$('#stage'));DARK.style.cssText='position:absolute;inset:0;z-index:7;background:radial-gradient(ellipse 90% 70% at 50% 50%,rgba(8,8,22,.5),rgba(8,8,22,.82));opacity:0;pointer-events:none';
const NOB=mkLayer('left:0;top:0;width:'+W+'px;height:'+H+'px;pointer-events:none');
NOB.innerHTML='<div id="n1" style="position:absolute;left:0;width:'+W+'px;top:430px;text-align:center;font:700 118px/1.02 var(--fj);color:#fff;text-shadow:0 0 30px '+PAL.aks+',0 0 70px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)">NOBEL<br>FISIKA 2022</div><div id="n2" style="position:absolute;left:0;width:'+W+'px;top:750px;text-align:center;font:700 38px/1.3 var(--fm);color:'+PAL.tb+';text-shadow:0 2px 3px rgba(0,0,0,.8)">Aspect · Clauser · Zeilinger</div><div id="n3" style="position:absolute;left:0;width:'+W+'px;top:900px;text-align:center"><span style="display:inline-block;padding:14px 32px;border-radius:18px;background:'+PAL.aks+';font:700 46px/1 var(--fj);color:#fff">KOMUNIKASI KUANTUM AMAN</span></div><div id="n4" style="position:absolute;left:0;width:'+W+'px;top:1030px;text-align:center"><span style="display:inline-block;padding:14px 32px;border-radius:18px;background:#fff;font:700 46px/1 var(--fj);color:#1b1640">KOMPUTER KUANTUM</span></div>';
const N1=NOB.querySelector('#n1'),N2=NOB.querySelector('#n2'),N3=NOB.querySelector('#n3'),N4=NOB.querySelector('#n4');
function gambarBell(t){BC.clearRect(0,0,W,H);const o=sstep(33.3,33.8,t)*(1-sstep(37.1,37.6,t));[BT1,BT2,BT3].forEach(e=>e.style.opacity=o);if(o<=0)return;
  BC.lineCap='round';BC.strokeStyle='rgba(255,255,255,'+(.8*o)+')';BC.lineWidth=4;BC.beginPath();BC.moveTo(140,1250);BC.lineTo(140,770);BC.moveTo(140,1250);BC.lineTo(980,1250);BC.stroke();
  const y2=1250-2*140,yq=1250-2.83*140,b1=E.out(seg(t,34.0,34.7)),b2=E.out(seg(t,35.2,36.4));
  BC.fillStyle='rgba(200,204,210,'+(.9*o)+')';BC.fillRect(190,1250-2*140*b1,340,2*140*b1);
  BC.fillStyle=PAL.aks;BC.shadowColor=PAL.aks;BC.shadowBlur=26;BC.fillRect(590,1250-2.83*140*b2,340,2.83*140*b2);BC.shadowBlur=0;
  if(b1>.3){BC.setLineDash([14,10]);BC.strokeStyle='rgba(255,255,255,'+(.95*o*b1)+')';BC.lineWidth=5;BC.beginPath();BC.moveTo(140,y2);BC.lineTo(980,y2);BC.stroke();BC.setLineDash([]);}}
