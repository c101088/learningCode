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



let box = new THREE.BoxGeometry(100,100,100);
let material = new THREE.MeshLambertMaterial({color:0x0000ff});
let mesh = new THREE.Mesh(box,material);
scene.add(mesh);


//缩放
// mesh.scale.x=2.0;
// mesh.scale.set(0.5,0.5,0.5);

//平移
// mesh.translateX(100);
// let axis = new THREE.Vector3(0,1,0);
// mesh.translateOnAxis(axis,100);

//旋转
// mesh.rotateX(Math.PI/4);
// let axis = new THREE.Vector3(0,1,0);
// mesh.rotateOnAxis(axis,Math.PI/4);


//位置
// mesh.position.y = 80;
// mesh.position.set(80,80,10);
// mesh.position.set(0,0,0);


//角度
// mesh.rotation.x= Math.PI/4;
// mesh.rotation.set(Math.PI/4,Math.PI/4,Math.PI/4);

//一个几何体，多个网格模型
let mesh1 = new THREE.Mesh(box,material );
mesh1.translateX(-80);
mesh1.translateY(-80);
scene.add(mesh1);

//几何体的变换会导致其派生的网格模型全部变换
box.translate(100,100,100);

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