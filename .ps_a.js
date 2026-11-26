<!--@SCRIPT-->
/* Pesta untuk penjelajah waktu · isometrik dibongkar · ortho · aksen ungu-magenta. Gedung kampus Cambridge (bata + batu krem), dipotong dua bidang (PZ depan, PX kanan) seperti rumah boneka. */
const PAL={langit:['#4a3a78','#2e2354','#150f30'],aks:'#d93cf5',tb:'#f3b9ff',ta:'#fcdfff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const C=h=>new THREE.Color(h).convertSRGBToLinear(),DEG=Math.PI/180;
const PZ=new THREE.Plane(new THREE.Vector3(0,0,-1),14),PX=new THREE.Plane(new THREE.Vector3(-1,0,0),14),PE=new THREE.Plane(new THREE.Vector3(-1,0,0),999),PY=new THREE.Plane(new THREE.Vector3(0,-1,0),60),CUT=[PZ,PX,PY];
