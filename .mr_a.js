<!--@SCRIPT-->
/* Palung Mariana · isometrik dibongkar · MODE ortho · aksen biru bioluminesens. 1 satuan vertikal = 165 m. */
const PAL={langit:['#cfe6f2','#e6eef0','#d8e4e6'],aks:'#19e3ff',tb:'#b9f4ff',ta:'#e0fbff'};
{const s=document.documentElement.style;[['--l1',PAL.langit[0]],['--l2',PAL.langit[1]],['--l3',PAL.langit[2]],['--alir',PAL.aks],['--aks',PAL.aks],['--tb',PAL.tb],['--ta',PAL.ta]].forEach(([k,v])=>s.setProperty(k,v));}
const WAKTU={potong:[3.6,5.8],kapsul:[37.2,38.6],dur:52.6};
const POTW=new THREE.Plane(new THREE.Vector3(0,0,-1),99),POTK=new THREE.Plane(new THREE.Vector3(0,0,-1),99);let PLN=POTW;
const DY=m=>-m/165,ZR=0;   // z jalur kapsul (tepat di bidang potong)
