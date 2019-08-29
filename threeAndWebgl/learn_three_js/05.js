/**
* 二维轮廓线
*/
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


//点光源
let point = new THREE.PointLight(0xFFFFFF);
point.position.set(0,0,500);
scene.add(point);








//圆弧--点渲染模式
// let shape = new THREE.Shape();
// shape.absarc(0,0,100,0,0.5*Math.PI);
// let geometry = new THREE.ShapeGeometry(shape);
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

// scene.add(line);




//创建拉伸网格模型
// let shape = new THREE.Shape();
// shape.moveTo(0,0);//起点
// shape.lineTo(0,100);//第2点
// shape.lineTo(100,100);//第3点
// shape.lineTo(100,0);//第4点
// shape.lineTo(0,0);//第5点
// let geometry = new THREE.ExtrudeGeometry(//拉伸造型
//     shape,//二维轮廓
//     //拉伸参数
//     {
//         amount:120,//拉伸长度
//         bevelEnabled:false//无倒角
//     }
// );
// let material=new THREE.MeshPhongMaterial({color:0x0288D1});//材质对象
// let mesh=new THREE.Mesh(geometry,material);//网格模型对象
// scene.add(mesh);//网格模型添加到场景中

//创建扫描网格模型
// var shape = new THREE.Shape();
// /**四条直线绘制一个矩形轮廓*/
// shape.moveTo(0,0);//起点
// shape.lineTo(0,10);//第2点
// shape.lineTo(10,10);//第3点
// shape.lineTo(10,0);//第4点
// shape.lineTo(0,0);//第5点
// /**创建轮廓的扫描轨迹(3D样条曲线)*/
// var curve = new THREE.CatmullRomCurve3 ([
//     new THREE.Vector3( -10, -50, -50 ),
//     new THREE.Vector3( 10, 0, 0 ),
//     new THREE.Vector3( 8, 50, 50 ),
//     new THREE.Vector3( -5, 0, 100)
// ]);
// var geometry = new THREE.ExtrudeGeometry(//拉伸造型
//     shape,//二维轮廓
//     //拉伸参数
//     {
//         bevelEnabled:false,//无倒角
//         extrudePath:curve,//选择扫描轨迹
//         steps:50//扫描方向细分数
//     }
// );
// var material=new THREE.MeshPhongMaterial({color:0x0000ff});//材质对象
// var mesh=new THREE.Mesh(geometry,material);//扫描网格模型对象
// scene.add(mesh);//扫描网格模型添加到场景中

//扫描3D样条曲线生成管道
// var path = new THREE.CatmullRomCurve3([//创建轮廓的扫描轨迹(3D样条曲线)
//     new THREE.Vector3( -10, -50, -50 ),
//     new THREE.Vector3( 10, 0, 0 ),
//     new THREE.Vector3( 8, 50, 50 ),
//     new THREE.Vector3( -5, 0, 100)
// ]);
//
// var geometry = new THREE.TubeGeometry( path, 40, 2, 8, false );
// var material=new THREE.MeshPhongMaterial({
//     color:0x0000ff,
//     side:THREE.DoubleSide//两面可见
// });//材质对象
// var mesh=new THREE.Mesh(geometry,material);//管道网格模型对象
// scene.add(mesh);//管道网格模型添加到场景中


// 旋转网格模型
// let points = [
//     new THREE.Vector2(50,60),
//     new THREE.Vector2(25,0),
//     new THREE.Vector2(50,-60)
// ];
//
// let geometry = new THREE.LatheGeometry(points,30);
// let material = new THREE.MeshPhongMaterial({
//     color:0x0000ff,
//     side:THREE.DoubleSide
// });
//
// material.wireframe = true;
// let mesh = new THREE.Mesh(geometry,material );
// scene.add(mesh);



//根据样条曲线插值点并绘制旋转网格模型
let shape = new THREE.Shape();
let points = [
    new THREE.Vector2(50,60),
    new THREE.Vector2(25,0),
    new THREE.Vector2(50,-60)
];
shape.splineThru(points);
let splinePoints= shape.getPoints(20);
let geometry = new THREE.LatheGeometry(splinePoints,30);

let material = new THREE.MeshPhongMaterial({
    color:0x0000ff,
    side:THREE.DoubleSide
});

material.wireframe = true;
let mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

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