<!--@SCRIPT-->
/* Paradoks kembar (EP 4) · isometrik dibongkar · ortho · aksen ungu-magenta. Dunia A: landasan + roket + rumah; dunia B: kolom muon. */
const PAL={langit:['#2a2150','#171033','#07041a'],aks:'#d93cf5',tb:'#f3b9ff',ta:'#fcdfff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const C=h=>new THREE.Color(h).convertSRGBToLinear(),DEG=Math.PI/180;
const PZ=new THREE.Plane(new THREE.Vector3(0,0,-1),400),PX=new THREE.Plane(new THREE.Vector3(-1,0,0),400),PY=new THREE.Plane(new THREE.Vector3(0,-1,0),400),CUT=[PZ,PX,PY];
const PR=new THREE.Plane(new THREE.Vector3(0,0,-1),400),PHZ=new THREE.Plane(new THREE.Vector3(0,0,-1),400),PHX=new THREE.Plane(new THREE.Vector3(-1,0,0),400),PHY=new THREE.Plane(new THREE.Vector3(0,-1,0),400);
