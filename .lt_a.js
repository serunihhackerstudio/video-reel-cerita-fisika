<!--@SCRIPT-->
/* Laut tidak asin lagi · isometrik dibongkar · ortho · aksen kuning cerah. Dunia A (laut asin) di x=0, dunia B (laut tawar) di x=200. Bidang potong z=konstan, balok laut z -14..14. */
const PAL={langit:['#245a74','#173f58','#0b2236'],aks:'#ffd400',tb:'#fff0a0',ta:'#fff6c0'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const POTF=new THREE.Plane(new THREE.Vector3(0,0,-1),99);let PLN=POTF;
