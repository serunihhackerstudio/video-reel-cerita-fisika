<!--@SCRIPT-->
/* Perjalanan ke masa depan (EP 3) · isometrik dibongkar · ortho · aksen ungu-magenta. Stasiun luar angkasa di atas Bumi (dunia A), pesawat + jam atom 1971 (dunia B). */
const PAL={langit:['#171238','#0c0826','#030211'],aks:'#d93cf5',tb:'#f3b9ff',ta:'#fcdfff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const C=h=>new THREE.Color(h).convertSRGBToLinear(),DEG=Math.PI/180;
const PZ=new THREE.Plane(new THREE.Vector3(0,0,-1),400),PX=new THREE.Plane(new THREE.Vector3(-1,0,0),400),PY=new THREE.Plane(new THREE.Vector3(0,-1,0),400),CUT=[PZ,PX,PY];
