//模型对象的拾取

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


let geometyry = new THREE.BoxGeometry(100,100,100);
let material = new THREE.MeshLambertMaterial({
    color:0x0000ff
});
let mesh = new THREE.Mesh(geometyry,material );
scene.add(mesh);


function ray(event){
    //获取屏幕坐标（canvas）
    let Sx = event.clientX;
    let Sy = event.clientY;
    //转化为标准设备坐标（视口坐标）
    let x = (Sx/window.innerWidth)*2-1;
    let y = -(Sy/window.innerHeight)*2+1;
    //构建标准设备坐标（为啥Z为0.5）
    let standardVector= new THREE.Vector3(x,y,0.5);
    //通过相机投影矩阵（逆运算）将标准设备坐标转为世界坐标
    let worldVector = standardVector.unproject(camera);
    //通过相机位置和鼠标点世界坐标确定射线方向
    let rayDirection = worldVector.sub(camera.position).normalize();
    //创建射线拾取对象
    let rayCaster = new THREE.Raycaster(camera.position,rayDirection);
    //规定射线拾取对象可拾取的内容，避免拾取所有模型
    let intersects = rayCaster.intersectObjects([mesh]);
    //多模型重叠，只拾取第一个
    if(intersects.length>0){
        intersects[0].object.material.transparent = true;
        intersects[0].object.material.opacity = 0.5;

    }

}

addEventListener('click',ray);







//点光源
let point = new THREE.PointLight(0xFFFFFF);
point.position.set(0,0,500);
scene.add(point);



/**
 * 相机设置
 */
//正交相机（矩形）
let width = window.innerWidth;
let height = window.innerHeight;
let k =  width/height;
let s = 100;

let camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
camera.position.set(0,0,51);
camera.lookAt(scene.position);//设置相机的方向指向场景对象


/**
 * 创建渲染器对象
 */
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);
document.body.appendChild(renderer.domElement);
// renderer.render(scene,camera);



function render() {
    renderer.render(scene, camera);
    // mesh.rotateY(0.01);
    requestAnimationFrame(render);
}

render();

