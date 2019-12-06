function loadShaderFromFile(filename, onLoadShader) {
    axios.get('learn_js/webgl_mutilAttributeSize/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_mutilAttributeSize/Fshader_src.glsl')
                .then(function(res){
                    let FSHADER_SOURCE=res.data;
                    onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);
                })
        })
        .catch(err=>{console.log(err)}
        );

}


function main (){

    var canvas = document.getElementById( "webgl");
    // var gl = getWebGLContext(canvas);
    var gl = canvas.getContext("webgl");
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return ;
    }

    function draw(VSHADER_SOURCE,FSHADER_SOURCE)
    {

        if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            console.log("Failed to initialize shaders");
            return ;
        }


        let vertices = new Float32Array(
            [0.0,0.5,-0.5,-0.5,0.5,-0.5]
        );
        let verticesSize = new Float32Array([10.0,15.0,20.0]);
        let n = 3;

        //创建一个缓冲区兑现
        let vertexBuffer = gl.createBuffer();
        let VertexSizeBuffer = gl.createBuffer();
        if(!vertexBuffer){
            console.log('Failed to create the buffer object');
            return -1;
        }
        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
        // 向缓冲区对象写入数据
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        let a_Position = gl.getAttribLocation(gl.program,'a_Position');
        if(a_Position<0)
        {
            console.log("failed to get the storage location of a_Position");
            return ;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT,  false, 0, 0);
        gl.enableVertexAttribArray(a_Position);



        gl.bindBuffer(gl.ARRAY_BUFFER,VertexSizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,verticesSize,gl.STATIC_DRAW);
        let a_PointSize = gl.getAttribLocation(gl.program,"a_PointSize");
        if(a_PointSize<0)
        {
            console.log("failed to get the storage location of a_PointSize");
            return ;
        }
        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT,  false, 0, 0);
        gl.enableVertexAttribArray(a_PointSize);



        let u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');


        gl.uniform4f(u_FragColor,1.0,0.0,0.0,1.0);
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // console.log(n);
        //显示的告诉gl要绘制n个内容
        gl.drawArrays(gl.POINTS,0,n);
    }

    loadShaderFromFile(null,draw);
}

main();
