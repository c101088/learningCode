/**
* 二维轮廓线
*/
let scene = new THREE.Scene();



//圆弧--点渲染模式
// let shape = new THREE.Shape();
// shape.absarc(0,0,100,0,0.5*Math.PI);
// let geometry = new THREE.ShapeGeometry(shape);
//
//
//
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
// let material = new THREE.MeshBasicMaterial({
//     color:0x0000ff
// });
// let line = new THREE.Mesh(geometry,material);

//
// scene.add(line);





//创建一个拉伸网格模型
// let shape = new THREE.Shape();
// shape.moveTo(0,0);
// shape.lineTo(0,100);
// shape.lineTo(100,100);
// shape.lineTo(100,0);
// shape.lineTo(0,0);
//
// let geometry = new THREE.ExtrudeGeometry(//拉伸造型
//     shape,//二维轮廓
//     {
//         depth:120,//拉伸长度
//         bevelEnabled:false//无倒角
//     }
// );
//
// let material = new THREE.MeshBasicMaterial({color:0x0000ff});
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);

//创建扫描网格模型
// let shape = new THREE.Shape();
// //创建四条直线绘制矩形
// shape.moveTo(0,0);
// shape.lineTo(0,10);
// shape.lineTo(10,10);
// shape.lineTo(10,0);
// shape.lineTo(0,0);
// //创建罗阔的扫描轨迹（3D样条曲线）
// // let curve = new THREE.SplineCurve3([ // SplineCurve3方法已废弃
// //     new THREE.Vector3(-10,-50,-50),
// //     new THREE.Vector3(10,0,0),
// //     new THREE.Vector3(8,50,50),
// //     new THREE.Vector3(-5,0,100)
// // ]);
// let curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-10,-50,-50),
//     new THREE.Vector3(10,0,0),
//     new THREE.Vector3(8,50,50),
//     new THREE.Vector3(-5,0,100)
// ]);
//
//
// // let geometry = new THREE.ExtrudeGeometry(
// //     shape,
// //     {
// //         bevelEnabled:false,
// //         extrudePath:curve,
// //         steps:50
// //     }
// // );
// //圆管道
// let geometry =  new THREE.TubeGeometry(curve,40,2,8,false);
// let material = new THREE.MeshPhongMaterial({color:0x0000ff});
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);






//参数化曲面
//创建平面网格模型
// TODO:参数化曲面创建失败，日后深入研究
// function plane(u,v,w){
//     let width = 50,height =  100;
//     let x= u*width;
//     let y = v*height;
//     let z = 0;
//     w=new THREE.Vector3(x,y,z);
//     return w;
// }
//
// function paraboloid(u,v,w) {
//     var k = 100;//x、y取值范围
//     var a = 0.2;//旋转抛物面焦点
//     var x = (u-0.5)*k;
//     var y = (v-0.5)*k;
//     var z = Math.pow(a,2)*(Math.pow(x,2)+Math.pow(y,2));
//     w=new THREE.Vector3(x,y,z);
//     return w;
// }
//
//
// let geometry  = new THREE.ParametricGeometry(plane,10,10);
// let material =  new THREE.MeshPhongMaterial({
//     color:0x0000ff,
//     side:THREE.DoubleSide
// });
// material.wireframe=true;
// let mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);
//




/*
    旋转造型
 */

let points = [
    new THREE.Vector2(50,60),
    new THREE.Vector2(25,0),
    new THREE.Vector2(50,-60),
];
let geometry = new THREE.LatheGeometry(points,30);
let material = new THREE.MeshPhongMaterial(
    {
        color:0x0000ff,
        side:THREE.DoubleSide
    }
);

// material.wireframe = true;
let mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);




//坐标系与原点
let srcPoint = new THREE.Geometry();
let pointPosition = new THREE.Vector3(0,0,0);
srcPoint.vertices.push(pointPosition);
let pointMaterial = new THREE.PointsMaterial({
    color:0xdc3023,
    size:20.0
});
let newPoint = new THREE.Points(srcPoint,pointMaterial);
scene.add(newPoint);


let srcLine = new THREE.Geometry();
srcLine.vertices.push(
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1000,0,0),
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(0,1000,0),
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(0,0,1000)
);
let lineMaterial = new THREE.LineBasicMaterial({
    color:0xFF6F00
    // color:0xdc3023
});
let newLine = new THREE.LineSegments(srcLine,lineMaterial);
scene.add(newLine);













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
camera.position.set(300,300,300);
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

let controls = new THREE.OrbitControls(camera);//创建控件对象
// controls.addEventListener('change', render);//监听鼠标、键盘事件