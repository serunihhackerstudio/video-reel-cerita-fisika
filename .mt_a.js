<!--@SCRIPT-->
/* Matahari tiba-tiba menghilang · isometrik dibongkar · ortho · aksen kuning keemasan. Matahari di pusat, Bumi mengorbit r=48 di bidang XZ. */
const PAL={langit:['#0a0e1d','#060814','#02030a'],aks:'#ffc61a',tb:'#ffe08a',ta:'#fff0b8'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const POTF=new THREE.Plane(new THREE.Vector3(0,0,-1),999);let PLN=POTF;
