//测试失败了，使用threeBSP官网的代码可以运行成功，此处代码不行

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




//几何体对象
var cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
var box = new THREE.BoxGeometry(40,5,40);//立方体
//材质对象
var material=new THREE.MeshPhongMaterial({color:0x0000ff});
//网格模型对象
var cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
var boxMesh=new THREE.Mesh(box,material);//立方体
//包装成ThreeBSP对象
var cylinderBSP = new ThreeBSP(cylinderMesh);
var boxBSP = new ThreeBSP(boxMesh);
// var result = cylinderBSP.subtract(boxBSP);
var result = cylinderBSP.intersect(boxBSP);
//ThreeBSP对象转化为网格模型对象
var mesh = result.toMesh();
scene.add(mesh);//网格模型添加到场景中





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