function loadShaderFromFile(filename, onLoadShader) {
    axios.get('learn_js/webgl_texture/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_texture/Fshader_src.glsl')
                .then(function(res){
                    let FSHADER_SOURCE=res.data;

                    axios.get('learn_js/webgl_texture/img01.png')
                        .then(function(res){
                            let textureImg=new Image();
                            textureImg.src= "learn_js/webgl_texture/img01.png";
                            // console.log(textureImg);
                            onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE,textureImg);
                        })




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

    function draw(VSHADER_SOURCE,FSHADER_SOURCE,textureImg)
    {

        if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            console.log("Failed to initialize shaders");
            return ;
        }


        let vertices = new Float32Array(
            [
               // 顶点坐标 ，纹理坐标
               -0.5,0.5,0.0,1.0,
                -0.5,-0.5,0.0,0.0,
                0.5,0.5,1.0,1.0,
                0.5,-0.5,1.0,0.0
            ]
        );
        let n =4;

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
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT,  false, FSize*4, 0);
        gl.enableVertexAttribArray(a_Position);

        let a_TexCoord = gl.getAttribLocation(gl.program,"a_TexCoord");
        if(a_TexCoord<0)
        {
            console.log("failed to get the storage location of a_TexCoord");
            return ;
        }

        gl.vertexAttribPointer(a_TexCoord,3,gl.FLOAT,false,FSize*4,FSize*2);
        gl.enableVertexAttribArray(a_TexCoord);

        let texture = gl.createTexture();
        let u_Sampler = gl.getUniformLocation(gl.program,"u_Sampler");

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,textureImg);
        gl.uniform1i(u_Sampler,0);

        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // console.log(n);
        //显示的告诉gl要绘制n个内容
        // gl.drawArrays(gl.POINTS,0,n);
        gl.drawArrays(gl.TRIANGLES,0,n);
    }

    loadShaderFromFile(null,draw);
}

main();
