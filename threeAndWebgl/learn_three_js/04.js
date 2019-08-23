/**
* 几何体三维建模
*/
let scene = new THREE.Scene();

//立方体
// // let box = new THREE.BoxGeometry(100,100,100);
// let box = new THREE.BoxGeometry(100,100,100,40,40,40);//后面三参数分别是长宽高的细分数，最低为2（两个三角形对象）
// // let box = new THREE.BoxGeometry();
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         // side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );
// let mesh = new THREE.Mesh(box,material);
// scene.add(mesh);



//球体
// let box = new THREE.SphereGeometry(60,40,40);//设置x,y,z方向的细分度
// // let box = new THREE.SphereGeometry(60);
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         // side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );





// //圆柱和圆台
// let box = new THREE.CylinderGeometry(60,40,100,40);//设置顶部半径，底部半径，高度以及圆周细分数
//
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         // side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );



// //立方体顶点位置坐标
// var vertices = [
//     -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
//     -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
// ];
// //立方体顶点索引，三个顶点定义一个三角面
// var indices = [
//     2,1,0,    0,3,2,
//     0,4,7,    7,3,0,
//     0,1,5,    5,4,0,
//     1,2,6,    6,5,1,
//     2,3,7,    7,6,2,
//     4,5,6,    6,7,4
// ];
// let box = new THREE.PolyhedronGeometry(vertices,indices,60);
//
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         // side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );


//
// //平面矩形
// let box = new THREE.PlaneGeometry(60,40);//矩形平面，宽度和高度，另外两个为细分数
//
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );

//平面圆形
// let box = new THREE.CircleGeometry(60,10);//圆的半径，细分数，可用来构建正多边形
// let box=new THREE.CircleGeometry(50,40,0,0.5*Math.PI);//四分之一扇形
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x26A69A,
//         // color:0xAD1457,
//         side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );
//
//
//
// let mesh = new THREE.Mesh(box,material);
// scene.add(mesh);










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
    requestAnimationFrame(render);
}
render();