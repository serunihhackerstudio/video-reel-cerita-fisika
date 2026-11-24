/* ---------- ALAT 3D ---------- */
const C=h=>new THREE.Color(h).convertSRGBToLinear(),DEG=Math.PI/180;
const POT=new THREE.Plane(new THREE.Vector3(0,0,-1),99);
function bhn(hex,o={},klip=true){return new THREE.MeshStandardMaterial(Object.assign({color:C(hex),roughness:.6,metalness:0},o,klip?{clippingPlanes:[POT],clipShadows:true}:{}));}
function tutupM(hex){return new THREE.MeshBasicMaterial({color:C(hex),side:THREE.BackSide,clippingPlanes:[POT],toneMapped:false});}
function pasang(geo,m,par,pos,tutup){const o=new THREE.Mesh(geo,m);o.castShadow=o.receiveShadow=true;if(pos)o.position.set(...pos);if(tutup&&m.clippingPlanes)o.add(new THREE.Mesh(geo,tutupM(tutup)));par.add(o);return o;}
function kotak(x0,x1,y0,y1,z0,z1,m,par,tutup){return pasang(new THREE.BoxGeometry(x1-x0,y1-y0,z1-z0),m,par,[(x0+x1)/2,(y0+y1)/2,(z0+z1)/2],tutup);}
function bubut(prof,m,par,tutup,pos,n=72){const o=pasang(new THREE.LatheGeometry(prof.map(([r,y])=>new THREE.Vector2(r,y)),n),m,par,pos,tutup);return o;}
function bubutX(prof,m,par,tutup,pos){const g=new THREE.LatheGeometry(prof.map(([r,y])=>new THREE.Vector2(r,y)),56);g.rotateZ(-Math.PI/2);return pasang(g,m,par,pos,tutup);}
function silinder(r,y0,y1,m,par,tutup,pos){return pasang(new THREE.CylinderGeometry(r,r,y1-y0,40),m,par,pos||[0,(y0+y1)/2,0],tutup);}
function silinderX(r,x0,x1,m,par,tutup,y,z){const o=pasang(new THREE.CylinderGeometry(r,r,x1-x0,40),m,par,[(x0+x1)/2,y,z],tutup);o.rotation.z=Math.PI/2;return o;}
function batang(a,b,r,m,par,tutup){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=B.clone().sub(A);const o=pasang(new THREE.CylinderGeometry(r,r,d.length(),14),m,par,null,tutup);o.position.copy(A).add(B).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function selang(titik,r,m,par,n=64){return pasang(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(titik.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.15),n,r,10,false),m,par);}
const busur=(rx,cy,ry,a0,a1,n=14)=>Array.from({length:n+1},(_,i)=>{const a=lerp(a0,a1,i/n)*DEG;return[rx*Math.cos(a),cy+ry*Math.sin(a)];});
function dindingBox(par,[x0,x1,y0,y1,z0,z1],lapis,celah=.01){const g=new THREE.Group();par.add(g);let d=0;
  lapis.forEach(([e,m,w])=>{const a=x0+d,b=x1-d,c=y0+d,f=y1-d,h=z0+d,zf=z1-d;
    kotak(a,a+e,c,f,h,zf,m,g,w);kotak(b-e,b,c,f,h,zf,m,g,w);kotak(a+e,b-e,f-e,f,h,zf,m,g,w);kotak(a+e,b-e,c,c+e,h,zf,m,g,w);kotak(a+e,b-e,c+e,f-e,h,h+e,m,g,w);kotak(a+e,b-e,c+e,f-e,zf-e,zf,m,g,w);d+=e+celah;});return g;}
function petaPantul(ren){const c=kanvas(1024,512),x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,512);
  g.addColorStop(0,'#f4f1ea');g.addColorStop(.47,'#c9c5bb');g.addColorStop(.55,'#8d8778');g.addColorStop(1,'#5b5446');x.fillStyle=g;x.fillRect(0,0,1024,512);
  x.filter='blur(7px)';x.fillStyle='#fff';[[110,70,190,90],[600,110,240,60],[420,24,130,40]].forEach(r=>x.fillRect(...r));
  const t=new THREE.CanvasTexture(c);t.mapping=THREE.EquirectangularReflectionMapping;t.encoding=THREE.sRGBEncoding;return new THREE.PMREMGenerator(ren).fromEquirectangular(t).texture;}

