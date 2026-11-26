<!--@SCRIPT-->
/* Bintang = masa lalu · isometrik dibongkar · ortho · aksen ungu-magenta. Bukit berumput malam hari, dipotong dua bidang (PZ depan, PX kanan); langit diiris jadi lapisan jarak. */
const PAL={langit:['#2a1f58','#150f33','#06040f'],aks:'#d93cf5',tb:'#f3b9ff',ta:'#fcdfff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const C=h=>new THREE.Color(h).convertSRGBToLinear(),DEG=Math.PI/180;
const PZ=new THREE.Plane(new THREE.Vector3(0,0,-1),40),PX=new THREE.Plane(new THREE.Vector3(-1,0,0),40),PY=new THREE.Plane(new THREE.Vector3(0,-1,0),400),CUT=[PZ,PX,PY];
