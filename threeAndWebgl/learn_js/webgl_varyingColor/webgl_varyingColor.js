function loadShaderFromFile(filename, onLoadShader) {
    axios.get('learn_js/webgl_varyingColor/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_varyingColor/Fshader_src.glsl')
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
            [
                0.0,0.5,1.0,0.0,0.0,
                -0.5,-0.5,0.0,1.0,0.0,
                0.5,-0.5,0.0,0.0,1.0
            ]
        );
        let n =3;

        //创建一个缓冲区兑现
        let vertexBuffer = gl.createBuffer();

        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
        // 向缓冲区对象写入数据
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        let FSize = vertices.BYTES_PER_ELEMENT;
        let a_Position = gl.getAttribLocation(gl.program,'a_Position');
        if(a_Position<0)
        {
            console.log("failed to get the storage location of a_Position");
            return ;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT,  false, FSize*5, 0);
        gl.enableVertexAttribArray(a_Position);

        let a_Color = gl.getAttribLocation(gl.program,"a_Color");
        if(a_Color<0)
        {
            console.log("failed to get the storage location of a_Color");
            return ;
        }

        gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSize*5,FSize*2);
        gl.enableVertexAttribArray(a_Color);

        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // console.log(n);
        //显示的告诉gl要绘制n个内容
        gl.drawArrays(gl.POINTS,0,n);
    }

    loadShaderFromFile(null,draw);
}

main();
