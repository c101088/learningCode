
var  VSHADER_SOURCE =
    'attribute vec4 a_Position;\n'+
    'attribute float a_PointSize;\n'+
    'void main() {\n'+
    'gl_Position = a_Position;\n'+
    // 'gl_PointSize =a_PointSize;\n'+
    '}\n' ;


var  FSHADER_SOURCE =
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main() {\n'+
    'gl_FragColor = u_FragColor;\n'+
    '}\n' ;

function initVertexBuffers(gl) {
    let vertices = new Float32Array(
        [-0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5]
    );
    let n = 4;

    //创建一个缓冲区兑现
    let vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(gl.program,'a_Position');
    //将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT,  false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}


function main () {

    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    // var gl = canvas.getContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders");
        return;
    }


    let n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the position of the vertices");
        return;
    }

    // let a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // let a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    // if(a_Position<0){
    //     console.log("Failed to get the storage location of a_Position");
    //     return;
    // }

    // if(a_PointSize<0){
    //     console.log("Failed to get the storage location of a_PointSize");
    //     return ;
    // }

    // gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
    // gl.vertexAttrib1f(a_PointSize,10.0);
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //显示的告诉gl要绘制n个内容

    // gl.drawArrays(gl.TRIANGLE_STRIP,0,n);//gl.TRIANGLE_STRIP 新的三角形就是顺序下的新的三个点组成的
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n); //所有三角形共享v0点
}

main();