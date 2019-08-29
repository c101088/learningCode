let scene = new THREE.Scene();

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
var result = cylinderBSP.subtract(boxBSP);
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