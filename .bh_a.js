<!--@SCRIPT-->
/* Black hole & lubang cacing · isometrik dibongkar · MODE ortho · aksen oranye menyala. Semua pusat objek di bidang z = 0. */
const PAL={langit:['#0c1226','#070a16','#030409'],aks:'#ff6a1f',tb:'#ffc3a0',ta:'#ffe0cc'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const WAKTU={potong:[5.1,6.5],dur:55.8};
const POTF=new THREE.Plane(new THREE.Vector3(0,0,-1),99);let PLN=POTF;
