<!--@SCRIPT-->
/* Entanglement kuantum · isometrik dibongkar · MODE ortho · satu warna aksen ungu-biru elektrik. Semua pusat objek di bidang z = 0. */
const PAL={langit:['#cfdde6','#e8e7dc','#e3dcc8'],aks:'#7a5cff',tb:'#c9bfff',ta:'#e6e0ff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const WAKTU={potong:[4.3,5.9],detek:[21.0,22.2],dur:53.8};
const POTC=new THREE.Plane(new THREE.Vector3(0,0,-1),99),POTD=new THREE.Plane(new THREE.Vector3(0,0,-1),99);let PLN=POTC;
