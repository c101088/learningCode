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



//直线阵列
// let box =new THREE.BoxGeometry(10,10,10);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// for(let i=0 ;i<10;i++){
//     let mesh = new THREE.Mesh(box,material);
//     mesh.translateX(i*15);
//     scene.add(mesh);
// }

//整体平移立方体
// let box =new THREE.BoxGeometry(10,10,10);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// let object =  new THREE.Object3D();
// for(let i = 0;i<10;i++){
//     let mesh = new THREE.Mesh(box,material );
//     mesh.position.set(i*15,0,0);
//     object.add(mesh);
// }
// object.translateY(20);
// scene.add(object);

// // 平面阵列
// let box =new THREE.BoxGeometry(10,10,10);
// let material = new THREE.MeshLambertMaterial({
//     color:0x0000ff
// });
// let object =  new THREE.Object3D();
// for(let i = 0;i<10;i++){
//     for(let j = 0;j<10;j++){
//         let mesh = new THREE.Mesh(box,material );
//         mesh.position.set(i*15,j*15,0);
//         object.add(mesh);
//     }
// }
// scene.add(object);




// 单位阵列
let box =new THREE.BoxGeometry(10,10,10);
let material = new THREE.MeshLambertMaterial({
    color:0x0000ff
});
let object =  new THREE.Object3D();
for(let i = 0;i<10;i++){
    for(let j = 0;j<10;j++){
        for (let k = 0;k<10;k++){
            let mesh = new THREE.Mesh(box,material );
            mesh.position.set(i*15,j*15,k*15);
            object.add(mesh);

        }
    }
}
scene.add(object);




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