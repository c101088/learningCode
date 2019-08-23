/**
* 创建场景对象
*/
let scene = new THREE.Scene();

/**
 * 创建网格模型
 */

let box = new THREE.BoxGeometry(100,100,100);
let material = new THREE.MeshLambertMaterial({color:0x0000ff});
let mesh = new THREE.Mesh(box,material);
scene.add(mesh);


let sphere =  new THREE.SphereGeometry(60,40,40);
// let sphereMaterial = new THREE.MeshLambertMaterial({color:0xff0000}); //漫反射
// let sphereMaterial = new THREE.MeshLambertMaterial({
//     color:0xff0000,
//     transparent:true,
//     opacity:0.7
//     });  //开启几何体的透明效果并设置透明度

let sphereMaterial = new THREE.MeshPhongMaterial({//镜面反射
    color:0x0000ff,
    specular:0x4488ee,//网格模型的高光颜色
    shininess:12 //光照的强度系数
});
let sphereMesh = new THREE.Mesh(sphere,sphereMaterial);
scene.add(sphereMesh);
sphereMesh.translateY(100);//球体网格模型沿Y轴正方向平移100

/**
 * 光源设置
 */
//点光源
let point = new THREE.PointLight(0xffffff);
point.position.set(400,200,300);
scene.add(point);
//环境光
let ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);


/**
 * 相机设置
 */
let width = window.innerWidth;
let height = window.innerHeight;
let k =  width/height;
let s = 100;

let camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
camera.position.set(200,300,200);
// camera.position.set(0,500,500);
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
    mesh.rotateY(0.01);
    requestAnimationFrame(render);
}
render();