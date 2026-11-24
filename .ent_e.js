
/* ---------- SCENE ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{const tk=o.teks.split(' ');o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const ZP=.001,SKR=[[4.15,'whoosh',.4],[1.95,'tik',.3],[6.0,'tik',.3],[8.65,'tik',.3],[13.45,'zap',.3],[15.35,'tik',.3],[16.5,'zap',.4],[17.3,'tik',.3],[21.3,'whoosh',.3],[25.25,'zing',.4],[28.45,'zing',.4],[31.9,'zap',.3],[34.1,'tik',.3],[35.3,'zing',.35],[38.7,'zap',.3],[44.5,'tik',.3],[47.3,'zap',.4],[50.0,'tik',.3],[51.4,'tik',.3]];
const SCENE={dur:WAKTU.dur,
  kata:KATA,
  sub:{font:"700 66px 'Space Grotesk'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['entanglement','terhubung','berpasangan','foton','terjerat','kristal','diukur','acak','berkorelasi','bell','cahaya','pesan','nobel','kuantum','laser','detektor','eksperimennya','berjauhan']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    // bidang potong: kristal (POTC) lalu dua detektor (POTD)
    const kc=E.io(seg(t,...WAKTU.potong)),kd=E.io(seg(t,...WAKTU.detek));POTC.constant=lerp(3,ZP,kc);POTD.constant=lerp(6,ZP,kd);
    aturBingkai(FRC,POTC.constant,WAKTU.potong[0]-.05,WAKTU.potong[1],t);aturBingkai(FRA,POTD.constant,WAKTU.detek[0]-.05,WAKTU.detek[1],t);aturBingkai(FRB,POTD.constant,WAKTU.detek[0]-.05,WAKTU.detek[1],t);
    // laser terus menyala, foton tunggal masuk, kristal membelah jadi dua, dua foton berlawanan arah
    F_IN.atur(sstep(5.9,6.4,t),t,.35,.0);
    const pu=seg(t,15.0,16.4),HP=window._HP||(window._HP=sprite());spr(HP,[...F_IN.cu.getPointAt(E.io(pu)).toArray()],.9,pu>0&&pu<1?1:0);
    const kf=Math.sin(Math.PI*clamp(seg(t,16.35,17.4)));spr(KR_FL,[0,2.95,0],.8+1.6*kf,kf);
    const ph=seg(t,16.7,21.3),op=1-.62*sstep(21.8,23.2,t);F_L.atur(ph,t,op,.9);F_R.atur(ph,t,op,.9);
    // pasangan foton (S2) + benang pendek
    const ov=sstep(7.7,8.3,t)*(1-sstep(14.5,15.1,t)),th=t*1.5;ORB.forEach((o,i)=>{const s=i?1:-1;o.visible=ov>.01;o.position.set(Math.cos(th)*.6*s,4.35+Math.sin(t*2)*.08,Math.sin(th)*.6*s);o.scale.setScalar(.5+.5*ov);spr(ORBG[i],[o.position.x,o.position.y,o.position.z],1.1*ov,ov*.9);});
    isiBenang(BEN_S,[ORB[0].position.x,ORB[0].position.y,ORB[0].position.z],[ORB[1].position.x,ORB[1].position.y,ORB[1].position.z],0,.14,t,ov,1);
    // benang korelasi panjang antara dua gedung (simbol, bukan sinyal)
    const bl=sstep(20.8,22.2,t)*(1-sstep(46.2,46.9,t));isiBenang(BEN_L,[-26,6.6,0],[26,6.6,0],13,.5,t,bl>.01?1:0,1.4);BEN_L.material.opacity=.9*bl;
    // kubus hasil pengukuran
    const st=[stateKubus(t,0),stateKubus(t,2)];st.forEach((s,i)=>{CUBES[i].quaternion.copy(s.q);const pulsa=s.last?Math.exp(-Math.max(0,t-s.last.l)*2.6):0;CUBES[i].material.forEach(m=>m.emissiveIntensity=.35+(s.spin?.6:0)+pulsa*1.8);});
    // render inset (kamera dekat) lalu dunia utama
    const vi=Math.max(sstep(21.3,21.9,t)*(1-sstep(29.0,29.4,t)),sstep(37.7,38.2,t)*(1-sstep(46.3,46.8,t)));
    [INA,INB].forEach(c=>c.style.opacity=vi);[CPA,CPB].forEach(c=>c.style.opacity=vi);
    if(vi>.01){renderInset(INA,-26,t);renderInset(INB,26,t);const h=historia(t),ult=HASIL.filter(e=>t>=e.l).pop(),dsp=h;[CPA,CPB].forEach(c=>c.lastChild.textContent=dsp||(t>21.4?'…':''));}
    kameraDunia(t);RD.render(SD,KD);
    gambarTanda(t);
    let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});$('#jejak').innerHTML=j+'<span class="z">×'+Math.max(1,Math.round(118/(window.HC||118)))+'<small>ZOOM</small></span>';
    // sarung tangan (analogi), grafik Bell, pesan, perbandingan, Nobel
    GLV.style.opacity=sstep(29.3,29.8,t)*(1-sstep(32.9,33.3,t));STR.style.transform='rotate(27deg) scaleX('+E.out(seg(t,32.0,32.7))+')';BUK.style.opacity=sstep(32.0,32.5,t);
    gambarBell(t);
    MSG.style.opacity=sstep(38.6,39.0,t)*(1-sstep(41.9,42.3,t));
    const cp=sstep(44.3,44.8,t)*(1-sstep(46.2,46.7,t));CMP.style.opacity=cp;
    DARK.style.opacity=sstep(46.4,47.2,t);NOB.style.opacity=sstep(47.2,47.6,t);N2.style.opacity=sstep(48.0,48.4,t);N3.style.opacity=sstep(49.9,50.3,t);N4.style.opacity=sstep(51.3,51.7,t);
  }};
