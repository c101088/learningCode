//几何变化的旋转、缩放与平移

let scene = new THREE.Scene();


//原点与坐标轴
let pointGeo = new THREE.Geometry();//声明一个空几何体对象
pointGeo.vertices.push(new THREE.Vector3(0,0,0)); //顶点坐标添加到geometry对象
let pointMaterial=new THREE.PointsMaterial({
    color:0xA00037,
    size:10.0
});//材质对象
let srcPoint=new THREE.Points(pointGeo,pointMaterial);//点模型对象
scene.add(srcPoint);//点对象添加到场景中

let lineGeo = new THREE.Geometry();
lineGeo.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(1000,0,0),new THREE.Vector3(0,0,0),new THREE.Vector3(0,1000,0),new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1000),);
let lineMaterial = new THREE.LineBasicMaterial({
    color:0xA00037
});
let srcLine = new THREE.LineSegments(lineGeo,lineMaterial);
scene.add(srcLine);


//几何体clone
// let box = new THREE.BoxGeometry(10,10,10);
// let box2 = box.clone();
// box.translate(20,20,0);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// let material2 = new THREE.MeshLambertMaterial({
//     color:0xff0000
// });
//
// let mesh = new THREE.Mesh(box,material);
// let mesh2 = new THREE.Mesh(box2,material2);
// scene.add(mesh);
// scene.add(mesh2);

//几何体copy
// let box = new THREE.BoxGeometry(10,10,10);
// let box2 = new THREE.Geometry();
// box2.copy(box);
// box.translate(20,20,0);
// box2.translate(20,20,0);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// let mesh = new THREE.Mesh(box,material);
// let mesh2 = new THREE.Mesh(box2,material);
// scene.add(mesh);
// scene.add(mesh2);



//网格模型clone
// let box = new THREE.BoxGeometry(10,10,10);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
//
// let mesh = new THREE.Mesh(box,material);
// let mesh2 = mesh.clone();
// mesh.translateX(20);
// box.scale(1.5,1.5,1.5);
// scene.add(mesh);
// scene.add(mesh2);


//网格模型copy
let box = new THREE.BoxGeometry(10,10,10);
let material = new THREE.MeshLambertMaterial({
    color:0x0000ff
});
let material2 = new THREE.MeshLambertMaterial({
    color:0x00E676
});


let mesh = new THREE.Mesh(box,material);
let mesh2 = new THREE.Mesh(box,material2);
mesh2.copy(mesh);
mesh2.translateX(20);
scene.add(mesh);
scene.add(mesh2);



//点光源
let point = new THREE.PointLight(0xFFFFFF);
point.position.set(0,0,500);
scene.add(point);





/**
 * 相机设置
 */
let width = window.innerWidth;
let height = window.innerHeight;
let k =  width/height;
let s = 100;

let camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
// camera.position.set(0,0,500);
camera.position.set(0,0,500);
camera.lookAt(scene.position);//设置相机的方向指向场景对象

/**
 * 创建渲染器对象
 */
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);
// renderer.render(scene,camera);

function render(){
    renderer.render(scene,camera);
    // mesh.rotateY(0.01);
    // requestAnimationFrame(render);
}
render();
let controls = new THREE.OrbitControls(camera);//创建控件对象
controls.addEventListener('change', render);//监听鼠标、键盘事件