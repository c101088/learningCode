/**
* 点线面的构成与操作
*/
let scene = new THREE.Scene();

//直线模型对象
// let geometry= new THREE.Geometry();
// let p1 = new THREE.Vector3(10,0,0);
// let p2 = new THREE.Vector3(0,20,0);
// geometry.vertices.push(p1,p2);
//
// let material = new THREE.LineBasicMaterial(
//     {
//         color:0x0000ff
//     }
// );
// let line = new THREE.Line(geometry,material);
// scene.add(line);

//点模型对象
// let geometry= new THREE.Geometry();
// let p1 = new THREE.Vector3(10,0,0);
// let p2 = new THREE.Vector3(0,20,0);
// let p3 = new THREE.Vector3(15,15,0);
// geometry.vertices.push(p1,p2,p3);
//
// let material = new THREE.PointsMaterial(
//     {
//         color:0x0000ff,
//         size:10.0
//     }
// );
// let points = new THREE.Points(geometry,material);
// scene.add(points);



//三角面网格模型对象
// let geometry= new THREE.Geometry();
// let p1 = new THREE.Vector3(80,0,0);
// let p2 = new THREE.Vector3(0,80,0);
// let p3 = new THREE.Vector3(0,0,80);
// geometry.vertices.push(p1,p2,p3);
// let normal = new THREE.Vector3(0,0,1);//三角面法向量
// let face = new THREE.Face3(0,1,2,normal);//选择geometry.vertices中的下标为0 ,1,2的point并组成faces对象
// geometry.faces.push( face ); //三角面添加到几何体
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x84FFFF,
//         side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);


//创建矩形平面网格模型
// let geometry= new THREE.Geometry();
// let p1 = new THREE.Vector3(0,0,0);
// let p2 = new THREE.Vector3(80,0,0);
// let p3 = new THREE.Vector3(80,80,0);
// let p4 = new THREE.Vector3(0,80,0);
// geometry.vertices.push(p1,p2,p3,p4);
// let normal = new THREE.Vector3(0,0,1);//三角面法向量
// let face0 = new THREE.Face3(0,1,2,normal);//选择geometry.vertices中的下标为0 ,1,2的point并组成faces对象
// let face1 = new THREE.Face3(0,2,3,normal);//选择geometry.vertices中的下标为0 ,1,2的point并组成faces对象
// geometry.faces.push( face0,face1 ); //三角面添加到几何体
// let material = new THREE.MeshLambertMaterial(
//     {
//         color:0x84FFFF,
//         side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);

//创建线条对象
//设置线条颜色渐变
// let geometry = new THREE.Geometry();
// let p1= new THREE.Vector3(50,0,0);
// let p2 = new THREE.Vector3(0,70,0);
// geometry.vertices.push(p1,p2);
// let color1= new THREE.Color(0xff0000);
// let color2= new THREE.Color(0x0000ff);
// let color3= new THREE.Color(0xFFF59D);
//
// geometry.colors.push(color1,color3);
// let material = new THREE.LineBasicMaterial(
//     {
//         vertexColors:THREE.VertexColors, //规定了线条颜色会根据定点颜色计算，顶点颜色放置到几何体的.colors属性中
//     }
// );
//
// let line = new THREE.Line(geometry,material);
// scene.add(line);




//三角面网格模型对象
//颜色渐变
//
// let geometry= new THREE.Geometry();
// let p1 = new THREE.Vector3(0,0,0);
// let p2 = new THREE.Vector3(80,0,0);
// let p3 = new THREE.Vector3(0,80,0);
// geometry.vertices.push(p1,p2,p3);
// let normal = new THREE.Vector3(0,0,1);//三角面法向量
// let face = new THREE.Face3(0,1,2,normal);//选择geometry.vertices中的下标为0 ,1,2的point并组成faces对象
//
//
// let color1= new THREE.Color(0xff0000);
// let color2= new THREE.Color(0x0000ff);
// let color3= new THREE.Color(0xfff59d);
// face.vertexColors.push(color1,color2,color3);
//
// geometry.faces.push( face ); //三角面添加到几何体
// let material = new THREE.MeshBasicMaterial(
//     {
//         vertexColors:THREE.VertexColors,
//         side:THREE.DoubleSide  //设置三角面两面可见
//     }
// );
// //
// // let material = new THREE.MeshLambertMaterial(
// //     {
// //         vertexColors:THREE.VertexColors,
// //         side:THREE.DoubleSide  //设置三角面两面可见
// //     }
// // );
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);




// 创建线模型对象
// let box = new THREE.BoxGeometry(100,100,100);
// let  material = new THREE.LineBasicMaterial({color:0x0000ff});
// let mesh = new THREE.Line(box,material);
// // let mesh = new THREE.LineLoop(box,material);
// // let mesh = new THREE.LineSegments(box,material);
// scene.add(mesh);


//创建点模型对象
let box = new THREE.BoxGeometry(100,100,100);
let  material = new THREE.PointsMaterial({
    color:0x0000ff,
    size:10.0
});
let mesh = new THREE.Points(box,material);
scene.add(mesh);

// let point = new THREE.PointLight(0xFF4081);
// point.position.set(100,100,100);
// scene.add(point);


/**
 * 相机设置
 */
let width = window.innerWidth;
let height = window.innerHeight;
let k =  width/height;
let s = 100;

let camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
camera.position.set(200,200,200);
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
    // mesh.rotateY(0.01);
    requestAnimationFrame(render);
}
render();