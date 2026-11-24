
/* ---------- overlay: inset, bar tekanan, pil tahun, penutup ---------- */
const mkLayer=(css)=>{const d=mk('div','',$('#stage'));d.style.cssText='position:absolute;z-index:12;opacity:0;pointer-events:none;'+css;return d;};
const INS=mk('canvas','',$('#stage'));INS.width=INS.height=440;Object.assign(INS.style,{position:'absolute',left:'320px',top:'330px',width:'440px',height:'440px',borderRadius:'50%',zIndex:12,opacity:0,boxShadow:'0 0 0 5px rgba(255,255,255,.95),0 0 44px rgba(25,227,255,.5),0 10px 34px rgba(0,0,0,.5)',background:'#0b1830'});
const CAP1=mkLayer('left:100px;top:790px;width:880px;text-align:center;font:700 36px/1.2 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.85),0 0 14px rgba(0,0,0,.6)');
const CAP2=mkLayer('left:60px;top:790px;width:960px;text-align:center;font:700 34px/1.25 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.85),0 0 14px rgba(0,0,0,.6)');
CAP2.innerHTML='<span style="color:'+PAL.tb+'">● RONGGA UDARA: MENGERUT</span> &nbsp; <span style="color:#fff">● BERISI AIR / TITANIUM: UTUH</span>';
const BARS=mkLayer('left:0;top:0;width:'+W+'px;height:'+H+'px');
BARS.innerHTML='<div style="position:absolute;left:90px;top:1296px;width:70px;height:16px;background:#fff;border-radius:6px 6px 0 0"></div><div id="b2" style="position:absolute;left:200px;top:1296px;width:70px;height:0;background:'+PAL.aks+';border-radius:6px 6px 0 0;transform-origin:50% 100%;box-shadow:0 0 24px '+PAL.aks+'"></div>'
 +'<div style="position:absolute;left:70px;top:1318px;width:110px;text-align:center;font:700 26px/1.1 var(--fm);color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.8)">1×<br><span style="font-size:20px">PERMUKAAN</span></div><div style="position:absolute;left:170px;top:1318px;width:130px;text-align:center;font:700 26px/1.1 var(--fm);color:'+PAL.tb+';text-shadow:0 2px 3px rgba(0,0,0,.8)">>1.000×<br><span style="font-size:20px">DASAR</span></div>';
const B2=BARS.querySelector('#b2');
const mkPil=(txt,top,bg,fg)=>{const d=mkLayer('left:0;width:'+W+'px;top:'+top+'px;text-align:center');d.innerHTML='<span style="display:inline-block;padding:12px 30px;border-radius:16px;background:'+bg+';font:700 44px/1 var(--fj);color:'+fg+'">'+txt+'</span>';return d;};
const PIL=[mkPil('TRIESTE · 1960',330,PAL.aks,'#04202a'),mkPil('JAMES CAMERON · 2012',410,'#fff','#06202c'),mkPil('VICTOR VESCOVO · 2019',490,PAL.aks,'#04202a')],PEND=mkPil('TEMPAT PALING EKSTREM PUN BISA DIHUNI',340,'#fff','#06202c');
function renderInset(cx,cy,S){pasangKamera(KI,[cx,cy,0],S*H/W,S);RD.render(SD,KI);const c=INS.getContext('2d');c.clearRect(0,0,440,440);c.drawImage(RD.domElement,0,(H-W)/2,W,W,0,0,440,440);}
function batangA(m,a,b){_u.set(...a);_w.set(...b).sub(_u);const L=_w.length();m.position.copy(_u).addScaledVector(_w,.5);m.scale.y=L;m.quaternion.setFromUnitVectors(UP,_w.normalize());}
const mixHex=(a,b,k)=>'#'+new THREE.Color(a).lerp(new THREE.Color(b),k).getHexString();

/* ---------- SCENE ---------- */
const TTS=__TTS__;const KATA=[];let _st=.3;TTS.forEach(o=>{let tk=o.teks.split(' ');if(tk.length===o.kata.length+1){const i=tk.findIndex((w,j)=>/^[\d.,]+$/.test(w)&&tk[j+1]==='meter');tk.splice(i,2,tk[i]+' '+tk[i+1]);}
  o.kata.forEach((k,i)=>KATA.push({w:tk[i],t0:+(_st+k[1]).toFixed(3),t1:+(_st+k[2]).toFixed(3)}));o.start=_st;_st+=o.kata[o.kata.length-1][2]+.4;});
const SKR=[[.4,'hum',.2],[1.4,'tik',.3],[3.55,'whoosh',.4],[3.95,'tik',.3],[7.55,'tik',.3],[11.8,'zap',.35],[13.9,'tik',.3],[17.5,'zap',.3],[21.5,'tik',.3],[25.7,'zap',.3],[28.4,'tik',.3],[28.9,'zap',.25],[30.9,'zap',.3],[36.9,'tik',.3],[37.1,'whoosh',.35],[38.5,'tik',.3],[38.95,'zing',.3],[42.3,'zing',.3],[44.1,'zing',.3],[47.8,'zing',.4],[49.9,'tik',.3]];
const SCENE={dur:WAKTU.dur,
  kata:KATA,
  sub:{font:"800 66px 'Overpass'",warna:'#ffffff',aksen:PAL.tb,y:.755,maks:4,kunci:['mariana','challenger','tekanan','cahaya','gelap','suhunya','gas','paru-paru','kapsul','trieste','cameron','vescovo','kehidupan','ekstrem','dihuni','1.000','10,9']},
  audio:{vo:TTS.map((o,i)=>({src:'assets/audio/vo-0'+(i+1)+'.mp3',at:+o.start.toFixed(2),teks:o.teks})),sfx:SKR.map(([at,n,vol])=>({src:'assets/audio/sfx-'+n+'.wav',at,vol})),music:null},
  frame(t){
    kameraDunia(t);
    // bidang potong: balok air (POTW) lalu kapsul titanium (POTK)
    POTW.constant=lerp(8,.001,E.io(seg(t,...WAKTU.potong)));POTK.constant=lerp(4,ZR+.001,E.io(seg(t,...WAKTU.kapsul)));
    {const k=Math.sin(Math.PI*clamp(seg(t,3.55,6.3)));FRC.position.z=POTW.constant+.01;FRC.visible=t>3.55&&t<6.3;FRC.children.forEach((c,i)=>c.material.opacity=(i?1:.1)*k);}
    SEAMAP.offset.set(t*.004,t*.003);
    // cahaya & latar menggelap mengikuti kedalaman kamera
    {const dc=sstep(2,34,-window.CTY);matahari.intensity=2.7*(1-.9*dc);HEMI.intensity=.5-.44*dc;const st=document.documentElement.style;st.setProperty('--l1',mixHex(PAL.langit[0],'#0a2a4e',dc));st.setProperty('--l2',mixHex(PAL.langit[1],'#04162c',dc));st.setProperty('--l3',mixHex(PAL.langit[2],'#020a16',dc));}
    // kapal, kapsul, kabel, panah tekanan
    KAPAL.position.y=.15+Math.sin(t*.9)*.05;KAPAL.rotation.z=Math.sin(t*.7)*.015;
    const yk=yKaps(t);KAPS.position.set(RX,yk,ZR);KAPS.rotation.y=Math.sin(t*.4)*.3;KAPS.visible=t<45.9;KAPS.userData.lamp.intensity=2.4*sstep(8,40,-yk);
    batangA(KBL,[RX,3.0,ZR-1.4],[RX,yk+.95,ZR]);KBL.visible=t<45.9;
    const fR=Math.pow(clamp(-yk/64.6),.75);aturKlaster(PA_RIG,[RX,yk,ZR],t>=36.0?1:fR,(t>13.8&&t<45.8&&!(t>=20.8&&t<27.9))?1:0,3.3,2.2);
    aturKlaster(PA_BAWAH,[0,-65.2,ZR],1,(t>10.6&&t<13.5)?1:0,3.4,2.0);spr(window.GB||(window.GB=sprite()),[0,-65.2,ZR],2.6+.4*Math.sin(t*4),(t>10.6&&t<13.5)?.9:0);
    S_LINT.atur(t<13.6?0:clamp((3.0-yk)/67.6),t*2,(t>13.6&&t<45.8)?.9*(1-sstep(44.8,45.8,t)):0,1.1);
    S_SURYA.atur(seg(t,13.7,15.0),t*2,(t>13.6?1:0)*(1-sstep(15.0,16.3,t)),1.4);
    // kehidupan di dasar
    CRE.visible=t>45.4;{const k=sstep(46.2,47.2,t);IKAN.position.set(1.4*Math.sin(t*.45),FY+1.05+.2*Math.sin(t*1.3),ZR-.2+.5*Math.sin(t*.3));IKAN.rotation.y=Math.cos(t*.45)>0?0:Math.PI;IKAN.rotation.z=Math.sin(t*5)*.07;
     TERI.position.set(-.6+.25*Math.sin(t*.12),FY+.22,ZR+.5);TERI.rotation.y=.4;AMFI.forEach((a,i)=>{a.position.set((i?-1.1:1.0)+.3*Math.sin(t*.8+i),FY+.45+.12*Math.sin(t*2.1+i),ZR+(i?.2:.9));a.rotation.y=i?Math.PI:0;a.rotation.z=.1*Math.sin(t*3+i);
      a.userData.seg.forEach((s,j)=>{if(s.geometry.type==='SphereGeometry'){const idx=a.userData.seg.filter((q,ii)=>ii<j&&q.geometry.type==='SphereGeometry').length;s.position.set(-idx*.2,.06*Math.sin(idx*.9+t*3)+(idx>3?-.04*idx:0),0);}else{const ii=s.userData.i;s.position.x=-(ii)*.2;s.position.y=-.14;}});});
     [IKAN,TERI].forEach(o=>{o.userData.gl.intensity=.9*k;o.userData.m.emissiveIntensity=.35+.25*Math.sin(t*3)*k+.3*k;});AMFI.forEach(a=>a.userData.m.emissiveIntensity=.3+.3*k*(.6+.4*Math.sin(t*2)));
     const M4=new THREE.Matrix4(),P=new THREE.Vector3(),S=new THREE.Vector3(),Q=new THREE.Quaternion();for(let i=0;i<50;i++){P.set((hash(i)-.5)*6,FY+((t*.08+hash(i+9))%1)*3.2,ZR+(hash(i+30)-.5)*4);S.setScalar(k*(.5+hash(i+4)));M4.compose(P,Q,S);PART.setMatrixAt(i,M4);}PART.instanceMatrix.needsUpdate=true;}
    // inset 1 (penyelam) & inset 2 (rak tekanan)
    const v1=sstep(20.9,21.4,t)*(1-sstep(27.5,27.9,t)),v2=sstep(28.0,28.5,t)*(1-sstep(35.9,36.3,t));
    {const dy=E.io(seg(t,21.2,23.6))*4.0,d=dy*10,s=Math.cbrt(1/(1+d/10));DIV.position.set(X1-1.8+Math.sin(t*.8)*.08,.4-dy+Math.sin(t*1.2)*.05,-1.2);BAL1.position.set(X1+1.8,DIV.position.y+.6,-1.2);BAL1.scale.setScalar(s);GH1.position.copy(BAL1.position);TALI1.visible=false;
     CAP1.innerHTML='SELAM ±'+Math.round(d)+' m<br><span style="color:'+PAL.tb+'">VOLUME GAS ×'+(s**3).toFixed(2).replace('.',',')+'</span>'+(t>25.9?'<br><span style="color:'+PAL.aks+'">GAS NAPAS MULAI BERBAHAYA</span>':'');}
    aturInset2(t);
    INS.style.opacity=Math.max(v1,v2);CAP1.style.opacity=v1;CAP2.style.opacity=v2;
    if(v1>.01)renderInset(X1,-4,14);else if(v2>.01)renderInset(X2,0,8);
    RD.render(SD,KD);
    gambarTanda(t);
    // jejak + kedalaman/tekanan
    {let j=JEJAK[0][1];JEJAK.forEach(([s,x])=>{if(t>=s)j=x;});const m=Math.round(dFokus(t)),show=t>=6.4;
     $('#jejak').innerHTML=j+(show?'<span class="z" style="font-size:60px">'+m.toLocaleString('id-ID')+'<small>m · ±'+Math.round(m/10+1).toLocaleString('id-ID')+' ATM</small></span>':'<span class="z">×'+Math.max(1,Math.round(98/(window.HC||98)))+'<small>ZOOM</small></span>');}
    // bar perbandingan tekanan
    BARS.style.opacity=sstep(11.5,12.0,t)*(1-sstep(13.3,13.7,t));B2.style.height=(520*E.out(seg(t,11.9,13.0)))+'px';B2.style.top=(1312-520*E.out(seg(t,11.9,13.0)))+'px';
    [38.9,42.2,44.0].forEach((a,i)=>PIL[i].style.opacity=sstep(a,a+.4,t)*(1-sstep(45.9,46.3,t)));PEND.style.opacity=sstep(49.9,50.4,t);
  }};
