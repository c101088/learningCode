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

//多种几何体的贴图，默认映射方式
// let geometry  =new THREE.PlaneGeometry(60,50);
// let geometry = new THREE.SphereGeometry(50,32,32);
// let geometry = new THREE.BoxGeometry(60,60,60);
// let geometry = new THREE.CylinderGeometry(40,40,100,40);
// let texture = THREE.ImageUtils.loadTexture("static/img01.png");
// let material = new THREE.MeshLambertMaterial({
//     map:texture,
//     side:THREE.DoubleSide
// });
// let mesh =new THREE.Mesh(geometry,material);
// scene.add(mesh);


//为立方体添加局部贴图
// let box = new THREE.BoxGeometry(100,100,100);
// let boxMaterial = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// let boxMesh = new THREE.Mesh(box,boxMaterial);
// scene.add(boxMesh);
//
// let plane = new THREE.PlaneGeometry(60,30);
// let texture = THREE.ImageUtils.loadTexture("static/img01.png");
// let planeMaterial = new THREE.MeshLambertMaterial({
//     map:texture
// });
//
// let planeMesh = new THREE.Mesh(plane,planeMaterial);
// planeMesh.translateZ(50.1);
// scene.add(planeMesh);


//纹理贴图网格模型
let geometry = new THREE.Geometry();
//顶点坐标
let p1 = new THREE.Vector3(0,0,0);
let p2 = new THREE.Vector3(80,0,0);
let p3 = new THREE.Vector3(80,80,0);
let p4 = new THREE.Vector3(0,80,0);
geometry.vertices.push(p1,p2,p3,p4);
//法线与三角面
let normal = new THREE.Vector3(0,0,1);
let face0 = new THREE.Face3(0,1,2,normal);
let face1 = new THREE.Face3(0,2,3,normal);
geometry.faces.push(face0,face1);
//纹理坐标
let t0 = new THREE.Vector2(0,0);//图片左下角
let t1 = new THREE.Vector2(1,0);
let t2 = new THREE.Vector2(0,1);
let t3 = new THREE.Vector2(1,1);
//选中图片中的一个三角形区域像素--映射到三角面中
uv1=[t0,t1,t2];
uv2= [t0,t2,t3];
geometry.faceVertexUvs[0].push(uv1,uv2);
let texture = THREE.ImageUtils.loadTexture("static/img01.png");
let material = new THREE.MeshLambertMaterial({
    map:texture,
    side:THREE.DoubleSide
});
let mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

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
    requestAnimationFrame(render);
}
render();
let controls = new THREE.OrbitControls(camera);//创建控件对象
controls.addEventListener('change', render);//监听鼠标、键盘事件