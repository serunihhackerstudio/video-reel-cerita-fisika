/* ============ GAMBAR + SCENE ============ */
function gambar(t){ TT=t; hideAll(); hemi.color.set(0x6d86d6);
  const k=Math.max(0,SC.findIndex((v,i)=>i<7&&t>=v&&t<SC[i+1])); [s1,s2,s3,s4,s5,s6,s7][k](t);
  if(k!==0){ ['#tJudul','#tAngka','#tMinggu','#vJudul','#vAngka'].forEach(s=>$(s).style.opacity=0); }
  kubah.position.copy(cam.position); STARS.position.copy(cam.position);
  PROX.position.copy(cam.position).addScaledVector(ARAH_JALAN,3600).add(V3(0,160,0)); PROX.visible=(k===0);
  REN.setRenderTarget(RT); REN.render(S, cam);
  pSalin.uniforms.t.value = RT.texture; lewat(pSalin, R2);
  pTerang.uniforms.t.value = R2.texture; pTerang.uniforms.th.value = 1.0; lewat(pTerang, B4a); blur2(B4a, B4b, 1.2); blur2(B4a, B4b, 2.4);
  pSalin.uniforms.t.value = B4a.texture; lewat(pSalin, B8a); blur2(B8a, B8b, 1.6); blur2(B8a, B8b, 3.2);
  const sp=pj(cam.position.clone().addScaledVector(sunNow,4000)), arahK=V3(); cam.getWorldDirection(arahK);
  const ry=(k===6)?PP.ry:0;
  if (ry>0){ pTerang.uniforms.t.value = R2.texture; pTerang.uniforms.th.value = .55; lewat(pTerang, RSIN); pSinar.uniforms.t.value = RSIN.texture; pSinar.uniforms.sp.value.set(sp[0]/W, 1-sp[1]/H); lewat(pSinar, RRAY); }
  pSalin.uniforms.t.value = R2.texture; lewat(pSalin, RTS); blur2(RTS, RTSb, 1.5); blur2(RTS, RTSb, 2.5);
  const U = AKHIR.uniforms;
  Object.assign(U.tS, {value: RT.texture}); U.tB1.value = B4a.texture; U.tB2.value = B8a.texture; U.tR.value = RRAY.texture; U.tT.value = RTS.texture;
  U.ry.value = ry; U.fok.value = .5; U.tilt.value = 0; U.ex.value = PP.ex; U.bl.value = PP.bl; U.vig.value = PP.vig; U.hangat.value = PP.hangat; U.sat.value = PP.sat;
  let g=1-sstep(0,.5,t); DIPS.forEach(d=>{ g=Math.max(g,1-Math.abs(t-d)/.55); }); g=Math.max(g,sstep(179,180,t)); U.gelap.value = clamp(g);
  lewat(AKHIR, null);
  ovUpd(t); lblUpd(t); grafikUpd(t); lineUpd(t);
  Object.assign($('#vSub').style,{left:'260px',width:'1400px',top:(subY-180)+'px',height:'330px',opacity:t>.6&&t<179?.85:0});
}

const SCENE = {
  dur: DUR, kata: KATA,
  sub: {gaya:'polos', maks:4, font:`800 52px '${FONT.sub}'`, warna:PAL.teks, aksen:PAL.aksen,
    kunci:['voyager','satu,','tujuh','puluh','lima','ribu','tahun','proxima','centauri.','minggu?','einstein,','cahaya,','cahaya.','terhingga.','celah','melengkung','mengembang.','alcubierre','gelembung','menyusut,','percepatan','minggu,','negatif,','eksotis,','jupiter.','radiasi','mustahil','nanti?'],
    y:()=>({x:W/2,y:subY})},
  audio: __AUDIO__,
  muat: () => Promise.all([document.fonts.load(`400 100px '${FONT.judul}'`), document.fonts.load(`800 60px '${FONT.sub}'`), document.fonts.load(`500 24px 'Onest'`)]),
  build(tl){ grainOn(.05); wIn(tl,$('#tJudul'),MOMEN.judulMasuk,{st:.08,b:14,d:.9}); wOut(tl,$('#tJudul'),MOMEN.judulKeluar); },
  frame(t){ gambar(t); }
};
