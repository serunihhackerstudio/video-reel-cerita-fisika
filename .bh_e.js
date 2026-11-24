
/* ---------- inset tarikan tidal (dua kamera dekat -> kanvas bulat) ---------- */
const mkInset=(left)=>{const c=mk('canvas','',$('#stage'));c.width=c.height=440;Object.assign(c.style,{position:'absolute',left:left+'px',top:'330px',width:'440px',height:'440px',borderRadius:'50%',zIndex:12,opacity:0,boxShadow:'0 0 0 5px rgba(255,255,255,.95),0 0 44px rgba(255,106,31,.5),0 10px 34px rgba(0,0,0,.5)',background:'radial-gradient(#1a2347,#05070f)'});return c;};
const INA=mkInset(50),INB=mkInset(590);
const mkCap=(left,nama,sub)=>{const d=mk('div','',$('#stage'),nama+'<small style="display:block;font:500 28px/1.2 var(--fm);color:#fff;margin-top:8px">'+sub+'</small>');Object.assign(d.style,{position:'absolute',left:left+'px',top:'782px',width:'440px',textAlign:'center',zIndex:12,opacity:0,font:'700 34px/1.1 var(--fm)',color:PAL.tb,textShadow:'0 2px 3px rgba(0,0,0,.8),0 0 14px rgba(0,0,0,.6)'});return d;};
const CPA=mkCap(50,'BLACK HOLE BINTANG','selisih tarikan kaki–kepala besar'),CPB=mkCap(590,'SUPERMASIF','tarikan di horizon jauh lebih lemah');
const SPG=mk('div','',$('#stage'),'SPAGHETTIFIKASI');Object.assign(SPG.style,{position:'absolute',left:'40px',top:'900px',width:'460px',textAlign:'center',zIndex:12,opacity:0,font:'700 40px/1 var(--fj)',color:'#fff',background:PAL.aks,padding:'12px 0',borderRadius:'16px'});
function renderInset(cv,cx,t){pasangKamera(KI,[cx,2.2,0],11*H/W,11);RD.render(SD,KI);const c=cv.getContext('2d');c.clearRect(0,0,440,440);c.drawImage(RD.domElement,0,(H-W)/2,W,W,0,0,440,440);}
const mkQ=()=>{const d=mk('div','',$('#stage'),'?');Object.assign(d.style,{position:'absolute',zIndex:12,opacity:0,font:'700 190px/1 var(--fj)',color:'#fff',textShadow:'0 0 30px '+PAL.aks+',0 0 70px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)',transform:'translate(-50%,-50%)'});return d;};
const Q1=mkQ(),Q2=mkQ();

/* ---------- SCENE ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SKR=[[.4,'hum',.22],[1.95,'tik',.3],[4.9,'whoosh',.4],[5.65,'tik',.3],[10.5,'tik',.3],[12.7,'zap',.3],[14.7,'tik',.3],[17.7,'zap',.3],[19.95,'tik',.3],[21.6,'tik',.3],[26.0,'zing',.4],[28.6,'whoosh',.3],[32.2,'whoosh',.3],[34.4,'zap',.35],[39.9,'tik',.3],[41.4,'zap',.4],[45.9,'whoosh',.4],[46.2,'tik',.3],[53.6,'zing',.4]];
const SCENE={dur:WAKTU.dur,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['black','hole','horizon','peristiwa','cahaya','melambat','memerah','membeku','dilatasi','spaghettifikasi','memanjang','supermasif','singularitas','lubang','cacing','hipotesis','gravitasi','teramati','eksotis']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    const ZP=.001;POTF.constant=lerp(12,ZP,E.io(seg(t,...WAKTU.potong)));
    // bingkai bidang potong
    {const t0=WAKTU.potong[0]-.05,t1=WAKTU.potong[1],k=Math.sin(Math.PI*clamp(seg(t,t0,t1+.5)));FRC.position.z=POTF.constant+.01;FRC.visible=t>t0&&t<t1+.5;FRC.children.forEach((c,i)=>c.material.opacity=(i?1:.12)*k);}
    // black hole raksasa memudar, kisi ruang-waktu muncul
    const fb=1-sstep(4.9,5.8,t),kf=sstep(4.7,5.6,t);BH.visible=fb>.01;bola.material.opacity=fb;cak.material.opacity=fb;cinF.material.opacity=fb;cinF2.material.opacity=.6*fb;cak.rotation.z=t*.4;
    matF.opacity=.9*kf;matFC.opacity=kf;const kh=sstep(6.4,7.0,t);cincinH.material.opacity=kh;titikS.material.opacity=kh;
    const ks=1+.35*Math.sin(t*3),sing=t>41.3&&t<45.8?2.2:1;spr(GLS,[0,YF(.15)-.1,0],1.6*ks*sing,kh*.85);
    const kw=E.out(seg(t,45.9,46.9)),ku=1-E.in(seg(t,45.4,46.1));CORONG.scale.setScalar(Math.max(.001,ku));GRPF.visible=ku>.05;GRPF.scale.setScalar(Math.max(.001,ku));CORONG.visible=ku>.01;WH.scale.setScalar(Math.max(.001,kw));WH.visible=kw>.01;
    // astronaut: melayang -> (tampak dari luar: melambat, memerah) -> (nyata: melintasi horizon)
    const jatuh=t>=14.9;
    if(!jatuh){AST.visible=true;AST.position.set(20,YF(20)+2.4+Math.sin(t*1.3)*.25,0);AST.rotation.set(Math.sin(t*.7)*.12,.5+t*.1,Math.cos(t*.6)*.1);}
    else if(t<21.4){AST.visible=false;}
    else if(t<28.1){AST.visible=true;letakkan(AST,Math.max(.7,rNyata(t)));}else AST.visible=false;
    GHO.visible=t>=14.9&&t<21.4;if(GHO.visible){const r=rGhost(t);letakkan(GHO,r);const red=sstep(16.0,18.8,t),dim=sstep(18.6,20.8,t);GHO.userData.mats.forEach(m=>{m.emissive.copy(C('#ff2a10'));m.emissiveIntensity=red*.9;m.opacity=1-.62*dim;});const f=1-.0*dim;GHO.scale.setScalar(1);}
    PES.visible=t<28;PES.position.y=8.2+Math.sin(t*.9)*.3;PES.rotation.y=.5+Math.sin(t*.4)*.1;
    // aliran bercahaya
    const prog=t<21.4?(20-rGhost(t))/18.8:(20-rNyata(t))/18.8,pa=t<14.9?0:clamp(prog),opJ=(t<21.4?.95:.95)*(1-.6*sstep(21.0,21.5,t)*(t<21.6?1:0))*(1-sstep(28.0,28.6,t));
    S_JATUH.atur(pa,t*2.4,t>=14.9&&t<28.6?opJ:0,1.2);
    const uc=sstep(15.5,18.6,t);S_CAHAYA.atur(seg(t,15.3,17.0),8*(1-Math.exp(-.5*Math.max(0,t-15.3))),(t>15.2&&t<21.2)?(1-.78*sstep(19.2,20.5,t)):0,1.1,'#'+new THREE.Color().lerpColors(new THREE.Color('#fff3d8'),new THREE.Color('#e8200c'),uc).getHexString());
    S_RAYA.forEach((s,i)=>s.atur(seg(t,12.6+i*.2,13.9+i*.2),t*2+i,(1-sstep(14.0,14.6,t))*(t>12.5?1:0),1.0));
    S_KONV.forEach((s,i)=>s.atur(seg(t,40.6+i*.14,42.4+i*.14),t*2.6+i,(t>40.5&&t<45.8)?(1-.8*sstep(44.8,45.7,t)):0,1.0));
    const cr=Math.sin(Math.PI*clamp(seg(t,25.8,26.9)));spr(GLH,[4,YF(4),0],1.8+1.6*cr,cr*.6);
    WHS.atur(1,t*1.5,.55*kw,.0);
    // tarikan tidal: dua astronaut di panggung
    const fA=1+1.7*E.io(seg(t,31.9,34.3)),fB=1+.12*E.io(seg(t,38.0,38.9));[[fA,0],[fB,1]].forEach(([f,i])=>{TA[i].scale.set(1/Math.sqrt(f),f,1/Math.sqrt(f));TA[i].rotation.y=.35;const hY=2.2+1.95*f,fY=2.2-1.85*f,k=sstep(29.4,30.4,t);
      PAN[i][0].position.y=hY;PAN[i][1].position.y=fY;PAN[i][0].position.x=PAN[i][1].position.x=TX[i]+1.9;aturPanah(PAN[i][0],(i?1.0:1.0)*k);aturPanah(PAN[i][1],(i?1.06:2.6)*k);});
    const vi=sstep(28.8,29.3,t)*(1-sstep(38.9,39.3,t));[INA,INB,CPA,CPB].forEach(c=>c.style.opacity=vi);SPG.style.opacity=sstep(34.2,34.6,t)*(1-sstep(36.1,36.5,t));
    if(vi>.01){renderInset(INA,TX[0],t);renderInset(INB,TX[1],t);}
    kameraDunia(t);RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(105/(window.HC||105)))+'<small>ZOOM</small></span>';
    // tanda tanya: singularitas & lubang cacing
    {const o=sstep(43.4,43.9,t)*(1-sstep(45.4,45.9,t));Q1.style.opacity=o;if(o>0){const[x,y]=keLayar([0,YF(.15)+2.6,0]);Q1.style.left=x+'px';Q1.style.top=y+'px';Q1.style.transform='translate(-50%,-50%) scale('+(1+.06*Math.sin(t*6))+')';}
     const o2=sstep(47.4,47.9,t);Q2.style.opacity=o2;if(o2>0){const[x,y]=keLayar([0,-4.5,0]);Q2.style.left=x+'px';Q2.style.top=y+'px';Q2.style.transform='translate(-50%,-50%) scale('+(1+.06*Math.sin(t*5))+')';}}
  }};
