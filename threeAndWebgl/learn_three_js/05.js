/**
* 二维轮廓线
*/
let scene = new THREE.Scene();



//圆弧--点渲染模式
let shape = new THREE.Shape();
shape.absarc(0,0,100,0,0.5*Math.PI);
let geometry = new THREE.ShapeGeometry(shape);
// let material = new THREE.PointsMaterial({
//     color:0x0000ff,
//     size:10.0
// });
// let line = new THREE.Points(geometry,material);

//
// //线渲染模式
// let material = new THREE.LineBasicMaterial({
//     color:0x0000ff
// });
// let line = new THREE.Line(geometry,material);

//面渲染模式
let material = new THREE.MeshBasicMaterial({
    color:0x0000ff
});
let line = new THREE.Mesh(geometry,material);


scene.add(line);


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
    requestAnimationFrame(render);
}
render();