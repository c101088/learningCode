// console.log("dadf");
var scene = new THREE.Scene();




var box=new THREE.BoxGeometry(100,100,100);//创建一个立方体几何对象
var material=new THREE.MeshLambertMaterial({color:0x0000ff});//材质对象
var mesh=new THREE.Mesh(box,material);//网格模型对象
scene.add(mesh);//网格模型添加到场景中



// var sphere = new THREE.SphereGeometry(60,40,40);
// var sphereMaterial = new THREE.MeshLambertMaterial({color:0x0000ff});
// var sphereMesh = new THREE.Mesh(sphere,sphereMaterial);
// // scene.add( cubeMesh );
// scene.add(sphereMesh);


//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);
//环境光
var ambient =new THREE.AmbientLight(0x444444);
scene.add(ambient);


//相机设置
var width = window.innerWidth;
var height = window.innerHeight;
var k = width/height;
var s =100;
//视野角度，宽高比，近截面，远截面
var camera = new THREE.PerspectiveCamera(-s*k,s*k,s,-s,1,1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);



var renderer = new THREE.WebGLRenderer();

renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild( renderer.domElement );


renderer.render(scene,camera);


