<!--@SCRIPT-->
/* Dari mana asal emas di Bumi? · isometrik dibongkar · ortho · aksen emas. Dunia luar (meja, cincin, tambang, Bumi) di sekitar asal; dunia abstrak (atom, bintang neutron, nebula, Bumi muda) di BASE. */
const PAL={langit:['#150f26','#0c0818','#040309'],aks:'#f7c13d',tb:'#ffe3a0',ta:'#fff2cc'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const POTR=new THREE.Plane(new THREE.Vector3(0,0,-1),999),POTG=new THREE.Plane(new THREE.Vector3(0,0,-1),999);let PLN=POTR;
