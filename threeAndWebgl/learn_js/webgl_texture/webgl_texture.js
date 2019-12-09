function loadShaderFromFile(filename, onLoadShader) {

    axios.get('learn_js/webgl_texture/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_texture/Fshader_src.glsl')
                .then(function(res){
                    let FSHADER_SOURCE=res.data;



                    // 获取canvas对象
                    let canvas = document.getElementById('webgl');
                    // console.log(canvas);
                    // 获取webgl 上下文对象
                    let gl = canvas.getContext("webgl");

                    // 初始化着色器
                    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
                        console.log('初始化着色器失败！');
                        return false;
                    }

                    // 设置顶点位置
                    let n = initBuffers(gl);
                    if (n < 0) {
                        console.log('顶点写入缓存失败！');
                        return false;
                    }

                    // 指定清除颜色
                    gl.clearColor(0.0, 0.5, 0.5, 1.0);

                    // 配置纹理
                    if (!initTexture(gl, n)){
                        console.log('无法配置纹理！');
                        return false;
                    }
                    console.log("done!");





                    function initBuffers(gl) {
                        //顶点坐标和颜色
                        let vertices = new Float32Array([
                            -0.5,  0.5,  0.0, 1.0,
                            -0.5, -0.5,  0.0, 0.0,
                            0.5,  0.5,  1.0, 1.0,
                            0.5, -0.5,  1.0, 0.0
                        ]);
                        let n = 4;//点的个数
                        //创建缓冲区对象
                        let vertexBuffer = gl.createBuffer();

                        //将缓冲区对象绑定到目标
                        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
                        //向缓冲区写入数据
                        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

                        let FSIZE = vertices.BYTES_PER_ELEMENT;

                        //获取坐标点
                        let a_Position = gl.getAttribLocation(gl.program, "a_Position");

                        if(a_Position<0)
                        {
                            console.log("获取a_Position地址失败");
                            return ;
                        }
                        //将缓冲区对象分配给a_Position变量
                        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*4, 0);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Position);

                        //获取Color坐标点
                        let a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
                        if (a_TexCoord < 0) {
                            console.log('获取 attribute 变量 a_TexCoord 失败！');
                            return -1;
                        }

                        //将缓冲区对象分配给a_Position变量
                        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*4, FSIZE*2);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_TexCoord);
                        return n;
                    }



                    function initTexture(gl, n){
                        //创建纹理对象
                        let texture = gl.createTexture();
                        if (!texture) {
                            console.log('创建纹理对象失败！');
                            return false;
                        }
                        //获取u_Sampler的存储位置
                        let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
                        if (!u_Sampler) {
                            console.log('获取 uniform 变量 u_Sampler 失败！');
                            return false;
                        }

                        //创建image对象
                        let image = new Image();

                        //加载纹理
                        image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
                        // 浏览器开始加载图片 注意：一定是2^mx2^n尺寸的图片
                        image.src = "learn_js/webgl_texture/img02.jpg";


                        return true;

                    }


                    function loadTexture(gl, n, texture, u_Sampler,image){

                        //1.对纹理图像进行Y轴反转
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                        //2.开启0号纹理单元
                        gl.activeTexture(gl.TEXTURE0);
                        //3.向target绑定纹理对象
                        gl.bindTexture(gl.TEXTURE_2D, texture);

                        //4.配置纹理参数
                        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        //5.配置纹理图像
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

                        //6.将0号纹理图像传递给着色器
                        gl.uniform1i(u_Sampler, 0);
                        // 清空 <canvas>
                        gl.clear(gl.COLOR_BUFFER_BIT);

                        //绘制矩形
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

                    }



                    // onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);



                })
        })
        .catch(err=>{console.log(err)}
        );

}
loadShaderFromFile(null,null);

function main (){

    let canvas = document.getElementById( "webgl");
    // let gl = getWebGLContext(canvas);
    let gl = canvas.getContext("webgl");
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return ;
    }

    function draw(VSHADER_SOURCE,FSHADER_SOURCE)
    {


        let textureImg = document.getElementById("img01");


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
                0.5,-0.5,1.0,0.0,
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

        gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSize*4,FSize*2);
        gl.enableVertexAttribArray(a_TexCoord);

        let texture = gl.createTexture();
        let u_Sampler = gl.getUniformLocation(gl.program,"u_Sampler");
        if(u_Sampler<0)
        {
            console.log("获取u_Sampler失败");
            return ;
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,textureImg);
        gl.uniform1i(u_Sampler,0);

        gl.clearColor(0.1,0.1,0.1,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // console.log(n);
        //显示的告诉gl要绘制n个内容
        // gl.drawArrays(gl.LINE_LOOP,0,n);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
        console.log("done!");
    }

    loadShaderFromFile(null,draw);
}

// main();
