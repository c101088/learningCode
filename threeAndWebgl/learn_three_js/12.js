//光照模型

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


let geometyry = new THREE.BoxGeometry(100,100,100);
let material = new THREE.MeshLambertMaterial({
    color:0x0000ff
});
let mesh = new THREE.Mesh(geometyry,material );
scene.add(mesh);




//点光源
let point = new THREE.PointLight(0xFFFFFF);
point.position.set(0,0,500);
scene.add(point);



/**
 * 相机设置
 */
//正交相机（矩形）
// let width = window.innerWidth;
// let height = window.innerHeight;
// let k =  width/height;
// let s = 100;
//
// let camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
// camera.position.set(0,0,51);
// camera.lookAt(scene.position);//设置相机的方向指向场景对象


//透视相机（锥形）
let width = window.innerWidth;
let height =window.innerHeight;
let camera =  new THREE.PerspectiveCamera(45,width/height,1,1000);
camera.position.set(100,200,200);
camera.lookAt(scene.position);
/**
 * 创建渲染器对象
 */
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);
// renderer.render(scene,camera);

let controls = new THREE.FirstPersonControls(camera);
controls.lookSpeed=0.4;
controls.movementSpeed = 100;
controls.noFly= true;
controls.lookVertical=true;
controls.constrainVertical=true;
controls.verticalMin=1.0;
controls.verticalMax= 2.0;
controls.lon=-150;
controls.lat = 120;


let clock = new THREE.Clock();
function render(){
    renderer.render(scene,camera);
    // mesh.rotateY(0.01);
    controls.update(clock.getDelta());
    requestAnimationFrame(render);

}
render();


