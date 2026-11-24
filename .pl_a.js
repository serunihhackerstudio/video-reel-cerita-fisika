<!--@SCRIPT-->
/* Pelari mendekati kecepatan cahaya · isometrik dibongkar · MODE ortho · aksen biru listrik. Bumi = bola R=110 (skema), bidang potong z = 0. */
const PAL={langit:['#bfe0fb','#e6f1f6','#d9e6e8'],aks:'#2e9bff',tb:'#b7dcff',ta:'#e3f1ff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const WAKTU={potong:[4.4,5.8],lhc:[50.3,51.6],dur:58.2};
const POTB=new THREE.Plane(new THREE.Vector3(0,0,1),8),POTE=new THREE.Plane(new THREE.Vector3(0,0,-1),99),POTL=new THREE.Plane(new THREE.Vector3(0,0,-1),99);let PLN=POTE;
const R=110,TA=12,TC=6,CY=-R,ZR=-1.5,GAM=7.0888,LX=700;
const yS=(x,z)=>CY+Math.sqrt(R*R-x*x-z*z);
