
/* ---------- LABEL: titik + garis + teks, tanpa kotak (dunia lab 'L' atau dunia atom 'A') ---------- */
const DAFTAR=[];
function tanda(o){o.el=mk('div','lt'+(o.o[0]<0?' r':'')+(o.big?' big':'')+(o.am?' am':''),$('#tanda'),o.t+(o.s?'<small>'+o.s+'</small>':'')+'<i></i>');
  o.dot=mk('div','dot'+(o.am?' am':''),$('#tanda'));o.ln=svgEl('polyline',{fill:'none',stroke:o.am?PAL.aks:'#fff','stroke-width':3,'stroke-linecap':'round',style:'filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))'},$('#garis'));DAFTAR.push(o);return o;}
function gambarTanda(t){DAFTAR.forEach(L=>{const k=sstep(L.a,L.a+.4,t)*(1-sstep(L.b,L.b+.3,t)),on=k>.001;
  L.el.style.display=L.dot.style.display=on?'block':'none';L.ln.style.display=on?'':'none';if(!on)return;
  const p=typeof L.p==='function'?L.p(t):L.p,[x,y]=L.w==='A'?keLayarA(p):keLayar(p);L.dot.style.left=x+'px';L.dot.style.top=y+'px';L.dot.style.opacity=k;L.dot.style.transform='scale('+(.4+.6*sstep(L.a,L.a+.25,t))+')';
  const ew=L.el.offsetWidth,eh=L.el.offsetHeight,kn=L.o[0]<0;let tx=x+L.o[0],ty=y+L.o[1];
  let kiri=clamp(kn?tx-ew:tx,AMAN.kiri-10,AMAN.kanan-ew);tx=kn?kiri+ew:kiri;const atas=clamp(ty-eh,300,1330-eh);ty=atas+eh;
  L.el.style.left=kiri+'px';L.el.style.top=atas+'px';L.el.style.opacity=sstep(L.a+.12,L.a+.45,t)*(1-sstep(L.b,L.b+.3,t));
  L.el.lastChild.style.transform='scaleX('+sstep(L.a+.1,L.a+.5,t)+')';const g=sstep(L.a,L.a+.35,t);L.ln.setAttribute('points',x+','+y+' '+lerp(x,tx,g)+','+lerp(y,ty,g));L.ln.style.opacity=k;});}
// --- dunia lab
tanda({t:'Logam uranium',s:'sebongkah kecil',p:[CX,CY+.35,ZC],o:[-90,-170],a:1.0,b:3.7,am:1});
tanda({t:'Dinamit',s:'pembanding ledakan kimia',p:[1.15,2.62+.5,0],o:[120,-190],a:1.8,b:3.7});
tanda({t:'Meja uji',s:'di dalam laboratorium',p:[1.9,2.5,1.6],o:[100,140],a:2.5,b:3.7});
tanda({t:'Susunan atom',s:'rapi, berderet seperti kisi',p:[CX+.25,CY+.25,ZC+.02],o:[150,-210],a:5.8,b:7.3,am:1});
// --- dunia atom
tanda({w:'A',t:'Dinamit',s:'ledakan kimia',p:[MX,2.3,0],o:[90,-130],a:7.45,b:11.0});
tanda({w:'A',t:'Ikatan ditata ulang',s:'atomnya tetap, hanya berpindah pasangan',p:[MX+.7,.6,0],o:[-60,230],a:9.1,b:11.0,am:1});
tanda({w:'A',t:'Atom uranium',s:'tersusun rapi',p:[1,1,1],o:[100,-200],a:11.0,b:12.6});
tanda({w:'A',t:'Inti atom',s:'hanya sebagian kecil volume atom',p:[0,.07,0],o:[120,-220],a:12.5,b:14.2,am:1});
tanda({w:'A',t:'Neutron',s:'pemicu pembelahan',p:t=>posNeu(0,t),o:[-60,-230],a:14.5,b:16.2,am:1});
tanda({w:'A',t:'Inti uranium',s:'jenis tertentu',p:[0,.06,0],o:[110,180],a:15.2,b:16.4});
tanda({w:'A',t:'FISI',s:'inti terbelah dua',p:[0,.1,0],o:[140,-250],a:17.5,b:19.3,big:1,am:1});
tanda({w:'A',t:'Panas besar',s:'dilepas saat membelah',p:[.1,-.05,0],o:[-60,230],a:19.3,b:20.5,am:1});
tanda({w:'A',t:'2–3 neutron baru',s:'melaju ke segala arah',p:t=>posNeu(2,t),o:[-70,-220],a:20.7,b:22.2,am:1});
tanda({w:'A',t:'Reaksi berantai',s:'dalam sekejap berlipat ganda',p:[0,1.6,0],o:[-40,-320],a:26.2,b:28.3,big:1,am:1});
tanda({w:'A',t:'Timbangan super sensitif',s:'membandingkan massa',p:[BX+.1,2.7,0],o:[70,-180],a:28.4,b:33.0});
tanda({w:'A',t:'Massa hilang',s:'sebagian kecil saja',p:[BX-1.7,1.2,0],o:[-60,200],a:30.0,b:36.0,am:1});
tanda({w:'A',t:'Energi',s:'muncul sebagai kilatan',p:[BX-1.7,2.6,0],o:[-90,-170],a:31.3,b:33.4,big:1,am:1});
const JEJAK=[[0,'LABORATORIUM'],[2.8,'LABORATORIUM › <b>LOGAM URANIUM</b>'],[3.9,'LOGAM URANIUM › <b>DIBELAH</b>'],[5.8,'LOGAM URANIUM › <b>SUSUNAN ATOM</b>'],[7.3,'ATOM › <b>IKATAN KIMIA</b>'],[10.9,'ATOM URANIUM › <b>INTI</b>'],[16.2,'INTI › <b>FISI</b>'],[22.3,'<b>REAKSI BERANTAI</b>'],[28.2,'INTI › <b>MASSA JADI ENERGI</b>'],[40.4,'BOM ATOM <b>VS</b> PLTN']];
const SKALA=t=>t<7.3?null:t<11.2?(t>7.3&&t<10.9?'ATOM  ·  NANOMETER':'ATOM  ·  NANOMETER'):t<22.3?'INTI  ·  FEMTOMETER':null;

/* ---------- overlay: angka berantai, rumus E = mc², grafik perbandingan, peredup ---------- */
const ANG=mk('div','',$('#stage'));Object.assign(ANG.style,{position:'absolute',left:'700px',top:'350px',zIndex:12,opacity:0,font:'700 90px/1 var(--fj)',color:PAL.ta,textShadow:'0 3px 3px rgba(0,0,0,.7),0 0 18px rgba(0,0,0,.5)'});
function gambarAngka(t){const o=sstep(23.1,23.5,t)*(1-sstep(27.9,28.3,t));ANG.style.opacity=o;if(o>0){const n=t>=25.9?27:t>=24.6?9:3;ANG.innerHTML=n+'<small style="display:block;font:700 30px/1.15 var(--fm);color:rgba(255,255,255,.88);margin-top:8px">INTI TERBELAH SERENTAK</small>';}}
const DARK=mk('div','',$('#stage'));DARK.style.cssText='position:absolute;inset:0;z-index:7;background:radial-gradient(ellipse 90% 70% at 50% 50%,rgba(4,7,9,.55),rgba(4,7,9,.8));opacity:0;pointer-events:none';
const FORM=mk('div','',$('#stage'),'<span>E</span><span> = </span><span>m</span><span>c<sup style="font-size:.55em;vertical-align:.5em">2</sup></span>');
Object.assign(FORM.style,{position:'absolute',left:0,width:W+'px',top:'360px',textAlign:'center',zIndex:12,font:'700 190px/1 var(--fj)',color:'#fff',textShadow:'0 0 26px '+PAL.aks+',0 0 60px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)',opacity:0,whiteSpace:'nowrap'});
const FSP=[...FORM.children];FSP.forEach(s=>s.style.display='inline-block');
const NOTE=mk('div','',$('#stage'),'c<sup style="font-size:.6em">2</sup> ≈ 9 × 10<sup style="font-size:.6em">16</sup><small style="display:block;font:700 30px/1.2 var(--fm);color:rgba(255,255,255,.9);margin-top:10px;text-align:center">C = KECEPATAN CAHAYA, ANGKA SANGAT BESAR</small>');
Object.assign(NOTE.style,{position:'absolute',left:0,width:W+'px',top:'610px',textAlign:'center',zIndex:12,font:'700 76px/1 var(--fj)',color:PAL.tb,opacity:0,textShadow:'0 3px 3px rgba(0,0,0,.7)'});
function gambarRumus(t){const o=sstep(33.5,33.7,t)*(1-sstep(39.9,40.5,t));FORM.style.opacity=o;if(o<=0){NOTE.style.opacity=0;return;}
  const tm=[33.6,33.78,34.18,34.34];FSP.forEach((s,i)=>{const k=E.back(seg(t,tm[i],tm[i]+.35));s.style.opacity=sstep(tm[i],tm[i]+.15,t);s.style.transform='scale('+(.6+.4*k)+')';});
  const pu=1+.03*Math.sin(t*7)*sstep(37.6,38.4,t);FORM.style.transform='scale('+pu+')';FORM.style.textShadow='0 0 '+(26+30*sstep(37.6,39,t))+'px '+PAL.aks+',0 0 '+(60+60*sstep(37.6,39,t))+'px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)';
  NOTE.style.opacity=sstep(35.9,36.4,t)*(1-sstep(39.9,40.4,t));}
const CHV=mk('canvas','',$('#stage'));CHV.width=W;CHV.height=H;CHV.style.cssText='position:absolute;left:0;top:0;z-index:11;pointer-events:none';const CHC=CHV.getContext('2d');
const mkLab=(html,x,y,col)=>{const d=mk('div','',$('#stage'),html);Object.assign(d.style,{position:'absolute',left:x+'px',top:y+'px',zIndex:12,opacity:0,font:'700 54px/1.05 var(--fj)',color:col,textShadow:'0 3px 3px rgba(0,0,0,.8)',whiteSpace:'nowrap'});return d;};
const CL1=mkLab('BOM ATOM<small style="display:block;font:500 30px/1.2 var(--fm);color:#fff;margin-top:8px">energi terlepas seketika</small>',250,760,PAL.aks);
const CL2=mkLab('PLTN<small style="display:block;font:500 30px/1.2 var(--fm);color:#fff;margin-top:8px">reaksi dikendalikan pelan-pelan</small>',300,985,'#e9edef');
const CL3=mkLab('ENERGI',150,690,'#fff');CL3.style.font='700 30px/1 var(--fm)';const CL4=mkLab('WAKTU →',790,1245,'#fff');CL4.style.font='700 30px/1 var(--fm)';
function gambarGrafik(t){CHC.clearRect(0,0,W,H);const o=sstep(40.5,41.1,t);[CL3,CL4].forEach(e=>e.style.opacity=o*.9);CL1.style.opacity=sstep(41.7,42.2,t);CL2.style.opacity=sstep(44.0,44.5,t);if(o<=0)return;
  CHC.lineCap='round';CHC.lineJoin='round';CHC.strokeStyle='rgba(255,255,255,'+(.75*o)+')';CHC.lineWidth=4;CHC.beginPath();CHC.moveTo(150,1220);CHC.lineTo(150,740);CHC.moveTo(150,1220);CHC.lineTo(960,1220);CHC.stroke();
  const pb=E.out(seg(t,41.3,41.9));if(pb>0){const pts=[[160,1220],[186,1220],[194,810],[222,1220],[300,1220]],n=Math.max(2,Math.ceil(pb*(pts.length-1)+1));CHC.strokeStyle=PAL.aks;CHC.lineWidth=10;CHC.shadowColor=PAL.aks;CHC.shadowBlur=30;CHC.beginPath();pts.slice(0,n).forEach((p,i)=>i?CHC.lineTo(p[0],p[1]):CHC.moveTo(p[0],p[1]));CHC.stroke();CHC.shadowBlur=0;
    const fk=Math.sin(Math.PI*clamp(seg(t,41.5,42.3)));if(fk>0){const g=CHC.createRadialGradient(194,810,2,194,810,180*fk+20);g.addColorStop(0,'rgba(255,200,160,'+(.9*fk)+')');g.addColorStop(1,'rgba(255,90,31,0)');CHC.fillStyle=g;CHC.fillRect(0,600,500,500);}}
  const pp=E.io(seg(t,44.2,46.9));if(pp>0){CHC.strokeStyle='#e9edef';CHC.lineWidth=9;CHC.shadowColor='rgba(255,255,255,.6)';CHC.shadowBlur=14;CHC.beginPath();for(let x=300;x<=300+640*pp;x+=8){const y=1130+Math.sin(x*.03)*3;x===300?CHC.moveTo(x,y):CHC.lineTo(x,y);}CHC.stroke();CHC.shadowBlur=0;}}

/* ---------- SCENE ---------- */
const TTS=JSON.parse('__TTS__');const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SCENE={dur:48.8,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['bom','atom','ledak','dinamit','ikatan','inti','atomnya','neutron','fisi','panas','berantai','massa','energi','rumusnya','kuadrat','singkat','dikendalikan','pelan-pelan','uranium','bongkar']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),
    sfx:[[3.75,'whoosh',.4],[6.3,'whoosh',.4],[1.05,'tik',.3],[5.95,'tik',.3],[7.45,'tik',.3],[12.55,'tik',.3],[17.5,'tik',.3],[16.5,'zap',.45],[22.7,'zap',.25],[24.0,'zap',.25],[25.2,'zap',.25],[26.25,'tik',.3],[28.0,'whoosh',.3],[28.4,'tik',.3],[30.5,'zing',.4],[31.3,'tik',.3],[33.6,'zap',.3],[41.5,'zap',.4]].map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    if(t<7.6){kameraDunia(t);
      const kp=E.io(seg(t,...WAKTU.potong)),zc=lerp(.9,ZC+.001,kp);POTM.constant=zc;BPOT.position.z=zc+.01;
      BPOT.visible=t>WAKTU.potong[0]-.05&&t<WAKTU.potong[1]+.5;BPOT.children.forEach((c,i)=>c.material.opacity=(i?1:.14)*Math.sin(Math.PI*clamp(seg(t,WAKTU.potong[0]-.05,WAKTU.potong[1]+.5))));
      logam.rotation.y=nz(t*.2,3)*.04;const kl=sstep(...WAKTU.lattice,t);KISI.material.opacity=kl*(.8+.2*Math.sin(t*4));KISI.scale.setScalar(.9+.1*kl);GLOW.intensity=kl*.7;
      RD.render(SD,KD);}
    // lingkaran zoom: lab -> dunia atom
    const a0=6.3,a1=7.3;if(t>=a0){const[ix,iy]=t<7.6?keLayar([CX,CY,ZC]):[540,960],r=sstep(a0,a1,t)**2*1900;window._ic=window._ic||[ix,iy];if(t<7.6)window._ic=[ix,iy];const[cx,cy]=window._ic;
      AT.style.display='block';AT.style.clipPath=t>=a1?'none':'circle('+r.toFixed(1)+'px at '+cx.toFixed(1)+'px '+cy.toFixed(1)+'px)';IRISC.setAttribute('cx',cx);IRISC.setAttribute('cy',cy);IRISC.setAttribute('r',r);IRISC.style.opacity=t<a1&&r>.5?1:0;
      kameraAtom(t);animAtom(t);RA.render(SA,KA);}else AT.style.display='none';
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});const sk=SKALA(t);
    $('#jejak').innerHTML=j+(sk?'<span class="z" style="font-size:40px">'+sk+'</span>':(t<7.3?'<span class="z">×'+Math.max(1,Math.round(44/(window.HC||44)))+'<small>ZOOM</small></span>':''));
    gambarAngka(t);gambarRumus(t);DARK.style.opacity=sstep(40.3,41.2,t);gambarGrafik(t);
  }};
