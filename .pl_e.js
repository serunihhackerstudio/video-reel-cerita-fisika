
/* ---------- overlay: grafik, bar, jam, penghitung, pil ---------- */
const OV=mk('canvas','',$('#stage'));OV.width=W;OV.height=H;OV.style.cssText='position:absolute;left:0;top:0;z-index:11;pointer-events:none';const OC=OV.getContext('2d');
const DARK=mk('div','',$('#stage'));DARK.style.cssText='position:absolute;inset:0;z-index:7;background:radial-gradient(ellipse 90% 70% at 50% 50%,rgba(5,8,22,.45),rgba(5,8,22,.78));opacity:0;pointer-events:none';
const PUTIH=mk('div','',$('#stage'));PUTIH.style.cssText='position:absolute;inset:0;z-index:13;background:#eaf5ff;opacity:0;pointer-events:none';
const CNT=mk('div','',$('#stage'));Object.assign(CNT.style,{position:'absolute',left:0,width:W+'px',top:'560px',textAlign:'center',zIndex:12,opacity:0,font:'800 190px/1 var(--fj)',color:'#fff',textShadow:'0 0 30px '+PAL.aks+',0 0 70px '+PAL.aks+',0 4px 4px rgba(0,0,0,.7)'});
const mkPil=(txt,top,bg,fg,fs=44)=>{const d=mk('div','',$('#stage'));d.style.cssText='position:absolute;left:0;width:'+W+'px;top:'+top+'px;text-align:center;z-index:12;opacity:0;pointer-events:none';d.innerHTML='<span style="display:inline-block;padding:14px 30px;border-radius:16px;background:'+bg+';font:800 '+fs+'px/1.15 var(--fj);color:'+fg+';max-width:920px">'+txt+'</span>';return d;};
const PL1=mkPil('TIDAK ADA MANUSIA YANG BISA MELAKUKANNYA DI BUMI',760,PAL.aks,'#fff',46),PL2=mkPil('KECEPATAN CAHAYA = BATAS ALAM SEMESTA',340,'#fff','#06203a',46);
const OVT=(s,x,y,font,fill,al='left')=>{OC.font=font;OC.fillStyle=fill;OC.textAlign=al;OC.fillText(s,x,y);};
const vx=v=>130+v*830;
function lariS(t){let a=0;for(let u=11.4;u<t&&u<25.6;u+=1/30)a+=7.4*sstep(11.8,14.2,u)/30;return a;}   // jumlah putaran
function skorS(t){let d=0;for(let u=26.5;u<t;u+=1/30)d+=26*sstep(26.5,29.5,u)/30;return d;}
function gambarOverlay(t){OC.clearRect(0,0,W,H);
  // bar: kecepatan cahaya vs keliling Bumi
  const b=sstep(6.9,7.4,t)*(1-sstep(11.0,11.6,t));if(b>0){OC.globalAlpha=b;const g1=E.out(seg(t,7.0,8.4)),g2=E.out(seg(t,9.4,10.4));
    OC.fillStyle=PAL.aks;OC.shadowColor=PAL.aks;OC.shadowBlur=22;OC.fillRect(110,1010,860*g1,56);OC.shadowBlur=0;OVT('CAHAYA 300.000 km/dtk',110,998,'700 32px "JetBrains Mono", monospace','#fff');
    OC.fillStyle='#fff';OC.fillRect(110,1130,860*40/300*g2,56);OVT('KELILING BUMI 40.000 km',110,1118,'700 32px "JetBrains Mono", monospace','#fff');if(g2>.9)OVT('≈ 7,5× lebih pendek',110+860*40/300+20,1172,'700 34px "Sora", sans-serif',PAL.tb);OC.globalAlpha=1;}
  // grafik energi
  const ge=sstep(17.0,17.5,t)*(1-sstep(25.4,25.9,t));if(ge>0){OC.globalAlpha=ge;OC.strokeStyle='rgba(255,255,255,.85)';OC.lineWidth=4;OC.beginPath();OC.moveTo(130,1290);OC.lineTo(130,760);OC.moveTo(130,1290);OC.lineTo(975,1290);OC.stroke();
    OVT('ENERGI GERAK (× mc²)',130,740,'700 28px "JetBrains Mono", monospace','#fff');OVT('KECEPATAN →',975,1330,'700 28px "JetBrains Mono", monospace','#fff','right');
    [[0,'0'],[.5,'50%'],[.9,'90%'],[.99,'99%']].forEach(([v,s])=>OVT(s,vx(v),1322,'700 24px "JetBrains Mono", monospace','rgba(255,255,255,.8)','center'));OVT('c',vx(1),1322,'700 30px "Sora", sans-serif',PAL.tb,'center');
    const vm=lerp(0,.9992,E.io(seg(t,17.6,22.0))),yv=v=>1290-Math.min(20,1/Math.sqrt(1-v*v)-1)/20*520;OC.strokeStyle=PAL.aks;OC.lineWidth=10;OC.lineCap='round';OC.shadowColor=PAL.aks;OC.shadowBlur=26;OC.beginPath();for(let v=0;v<=vm;v+=.002){const x=vx(v),y=yv(v);v?OC.lineTo(x,y):OC.moveTo(x,y);}OC.stroke();OC.shadowBlur=0;
    if(t>22.2){const a=sstep(22.2,22.8,t);OC.setLineDash([16,12]);OC.strokeStyle='rgba(255,255,255,'+(.9*a)+')';OC.lineWidth=5;OC.beginPath();OC.moveTo(vx(1),1290);OC.lineTo(vx(1),760);OC.stroke();OC.setLineDash([]);OVT('v = c: energi tak terhingga',vx(1)-14,800,'700 30px "Sora", sans-serif','rgba(255,255,255,'+a+')','right');}
    if(t>20.0){const a=sstep(20.0,20.5,t),mx=vx(.99),my=yv(.99);OC.fillStyle='#fff';OC.shadowColor='#fff';OC.shadowBlur=20;OC.beginPath();OC.arc(mx,my,12+3*Math.sin(t*6),0,7);OC.fill();OC.shadowBlur=0;OVT('99% c ≈ 6 mc²',mx-30,my-40,'700 34px "Sora", sans-serif','rgba(183,220,255,'+a+')','right');OVT('(70 kg ≈ 9 miliar ton TNT)',mx-30,my-4,'700 24px "JetBrains Mono", monospace','rgba(255,255,255,'+(.85*a)+')','right');}OC.globalAlpha=1;}
  // dua jam: normal vs melambat
  const jm=sstep(35.4,35.9,t)*(1-sstep(41.6,42.2,t));if(jm>0){OC.globalAlpha=jm;const dt=Math.max(0,t-35.6),cl=(cx,cy,sec,ket,w)=>{OC.fillStyle='rgba(8,14,30,.78)';OC.beginPath();OC.arc(cx,cy,130,0,7);OC.fill();OC.strokeStyle='#fff';OC.lineWidth=6;OC.stroke();
      for(let i=0;i<12;i++){const a=i/12*6.283;OC.lineWidth=i%3?3:6;OC.beginPath();OC.moveTo(cx+Math.sin(a)*108,cy-Math.cos(a)*108);OC.lineTo(cx+Math.sin(a)*122,cy-Math.cos(a)*122);OC.stroke();}
      const a=sec*6.283,m=sec*6.283/12;OC.strokeStyle=PAL.aks;OC.lineWidth=7;OC.shadowColor=PAL.aks;OC.shadowBlur=16;OC.beginPath();OC.moveTo(cx,cy);OC.lineTo(cx+Math.sin(a)*100,cy-Math.cos(a)*100);OC.stroke();OC.shadowBlur=0;OC.strokeStyle='#fff';OC.lineWidth=9;OC.beginPath();OC.moveTo(cx,cy);OC.lineTo(cx+Math.sin(m)*66,cy-Math.cos(m)*66);OC.stroke();OVT(ket,cx,cy+190,'800 34px "Sora", sans-serif','#fff','center');OVT(w,cx,cy+232,'700 26px "JetBrains Mono", monospace',PAL.tb,'center');};
    cl(300,520,dt/3,'JAM DI BUMI','berdetak normal');cl(780,520,dt/3/GAM,'JAM PELARI','melambat ÷7,1');OC.globalAlpha=1;}
}
const SKR=[[.5,'hum',.2],[1.5,'tik',.3],[4.3,'whoosh',.4],[4.8,'tik',.3],[7.05,'zing',.3],[9.2,'whoosh',.3],[9.4,'tik',.3],[11.9,'whoosh',.3],[14.7,'zing',.3],[17.5,'tik',.3],[22.8,'zap',.35],[26.9,'whoosh',.35],[29.5,'tik',.3],[30.1,'zap',.3],[33.0,'zap',.45],[35.6,'tik',.3],[37.2,'whoosh',.3],[43.8,'zap',.5],[44.6,'zing',.4],[46.9,'tik',.3],[48.9,'whoosh',.4],[50.3,'tik',.3],[51.0,'whoosh',.3],[53.4,'tik',.3],[55.9,'zing',.4]];

/* ---------- SCENE ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SCENE={dur:WAKTU.dur,
  kata:KATA,
  sub:{font:"800 66px 'Sora'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['kecepatan','cahaya','300.000','40.000','99','tujuh','energi','tak','terhingga','udara','plasma','melambat','memendek','dilatasi','kontraksi','relativitas','ledakan','batas','lhc','akselerator']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    kameraDunia(t);
    POTE.constant=lerp(135,.001,E.io(seg(t,...WAKTU.potong)));aturCaps(POTE.constant);POTL.constant=lerp(26,.001,E.io(seg(t,...WAKTU.lhc)));aturBingkai(FRE,POTE.constant,4.35,5.8,t);aturBingkai(FRL,POTL.constant,50.25,51.6,t);
    // latar: langit -> ruang angkasa saat kamera menjauh
    {const dc=t>=49?0:sstep(70,260,window.HC),st=document.documentElement.style;st.setProperty('--l1',mixHex(PAL.langit[0],'#06091c',dc));st.setProperty('--l2',mixHex(PAL.langit[1],'#04071a',dc));st.setProperty('--l3',mixHex(PAL.langit[2],'#02040c',dc));STARS.material.opacity=dc;}
    // pelari
    const f=1-(1-1/GAM)*E.io(seg(t,36.9,38.4)),D=skorS(t),run=sstep(26.4,27.2,t),lari=t>=26.4;
    RUN.position.set(0,yP(0),ZR);RUN.scale.set(f,1,1);RUN.visible=t<44.7;animPelari(t*15,lari?1:0);
    setSiluet(sstep(32.8,33.8,t));
    // jalan + tiang
    JALAN.offset.x=-D/7;TIANG.forEach(g=>{const x0=g.userData.x0;const x=(((x0-D+180)%360)+360)%360-180,xf=x*f,z=ZR-2.9;g.position.set(xf,yS(xf,z),z);g.visible=Math.abs(xf)<90&&t<49;});
    // molekul udara
    {const stream=sstep(27.2,30,t)*24,sc=t<49?1:0;for(let i=0;i<NA;i++){const b=AIRB[i];let x;if(t<26.6)x=b.x+.25*Math.sin(t*b.v+b.ph);else{x=b.x-D*(.7+.6*b.v);x=(((x+6)%36)+36)%36-6;}
      const y=yS(x,b.z)+b.h+.15*Math.sin(t*b.v*1.3+b.ph),gone=(t>=26.6&&x<1.7)||sc==0;_P.set(x,y,b.z);_S.setScalar(gone?1e-4:1);_M.compose(_P,_Q,_S);AIR.setMatrixAt(i,_M);}AIR.instanceMatrix.needsUpdate=true;AIR.visible=t<49;}
    // tumbukan dan plasma
    {const pk=sstep(30.4,33.8,t)*(1-sstep(34.4,35.6,t)),ctr=[2.8+.4*pk,yP(3)+1.7,ZR];spr(PLASMA,ctr,lerp(.5,5.2,pk)*(1+.05*Math.sin(t*9)),pk*.9);spr(PLASMA2,ctr,lerp(.8,9,pk),pk*.4);const sk=((t*1.1)%1);spr(SHOCK,ctr,2+9*sk*pk,pk*.6*(1-sk));
     FL.forEach((s,i)=>{const u=(t*3.2+hash(i)*5)%1,on=t>29.4&&t<34.4&&t<44,k=on?Math.sin(Math.PI*u):0;spr(s,[1.8+hash(i+3)*.6,yP(2)+.3+hash(i+7)*3.4,ZR+(hash(i+11)-.5)*1.2],1.2+.6*hash(i),k*.9);});
     for(let i=0;i<90;i++){const a=hash(i)*6.28+t*(1.5+hash(i+5)*2),r=(.4+hash(i+9)*1.0)*lerp(.3,4.2,pk);_P.set(ctr[0]+Math.cos(a)*r*.9,ctr[1]+Math.sin(a)*r*.8,ZR+Math.sin(a*1.7)*.6);_S.setScalar(pk>.05?(.5+hash(i+2)):1e-4);_M.compose(_P,_Q,_S);PLP.setMatrixAt(i,_M);}PLP.instanceMatrix.needsUpdate=true;PLP.visible=t<44.2;
     // ledakan energi (siluet cahaya -> ledakan)
     const ex=E.out(seg(t,43.4,46.4)),fa=(t>43.4?1:0)*(1-sstep(45.4,47.4,t));spr(FLASH,[0,yP(0)+1.7,ZR],lerp(3,42,ex),fa);spr(FLASH2,[0,yP(0)+1.7,ZR],lerp(3,64,ex),fa*.6);
     PUTIH.style.opacity=(sstep(43.5,43.9,t)*(1-sstep(43.9,44.6,t)))*.28+(sstep(48.85,49.0,t)*(1-sstep(49.0,49.25,t)));}
    // cincin lintasan mengelilingi Bumi + titik pelari
    {const lap=lariS(t),a=lap*Math.PI*2,rr=R+TA+3,orb=t>=11.4&&t<25.9,op=(t>=9?1:0)*(1-sstep(25.3,25.9,t))*(t>=9?1:0);
     S_RING.atur(t<9.9?seg(t,9.1,9.9):1,lap*14+t*(t<11.4?1.5:0),op*(t<9?0:1),0.1);
     spr(DOT,[rr*Math.sin(a),CY+rr*Math.cos(a),0],orb?lerp(14,30,sstep(11.8,14.2,t)):0,orb?1:0);spr(DOT2,[rr*Math.sin(a-.12),CY+rr*Math.cos(a-.12),0],orb?lerp(9,22,sstep(11.8,14.2,t)):0,orb?.7:0);
     const cn=sstep(11.7,12.2,t)*(1-sstep(16.9,17.4,t));CNT.style.opacity=cn;CNT.innerHTML=(7.4*sstep(11.8,14.2,t)).toFixed(1).replace('.',',')+'<small style="display:block;font:700 34px/1.2 var(--fm);color:#fff;margin-top:10px;text-shadow:0 2px 3px rgba(0,0,0,.8)">PUTARAN MENGELILINGI BUMI / DETIK</small>';}
    // LHC
    S_B1.atur(1,t*2.2,sstep(51.0,51.8,t),0);S_B2.atur(1,-t*2.2,sstep(51.0,51.8,t),0);
    {const u1=(t*.3)%1,u2=1-((t*.31)%1),p1=S_B1.cu.getPointAt(u1),p2=S_B2.cu.getPointAt(u2),k=sstep(51.0,51.8,t)*(t>=49?1:0);spr(BH1,[p1.x,p1.y,p1.z],3,p1.z<.3?k:0);spr(BH2,[p2.x,p2.y,p2.z],3,p2.z<.3?k:0);}
    DARK.style.opacity=sstep(17.0,17.5,t)*(1-sstep(25.4,25.9,t))*.9;
    PL1.style.opacity=sstep(46.9,47.4,t)*(1-sstep(48.6,48.9,t));PL2.style.opacity=sstep(50.2,50.7,t)*(1-sstep(52.8,53.3,t));
    RD.render(SD,KD);
    gambarTanda(t);gambarOverlay(t);
    {let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(130/(window.HC||130)))+'<small>ZOOM</small></span>';}
  }};
function mixHex(a,b,k){return '#'+new THREE.Color(a).lerp(new THREE.Color(b),k).getHexString();}
