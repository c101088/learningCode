function loadShaderFromFile(filename, onLoadShader) {

    axios.get('learn_js/webgl_mutilTexture/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_mutilTexture/Fshader_src.glsl')
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
                            0.0,0.5,-0.4,0.4,1.0,0.4,
                            -0.5,-0.5,-0.4,0.4,1.0,0.4,
                            0.5,-0.5,-0.4,1.0,0.4,0.4,

                            0.5,0.4,-0.2,1.0,0.4,0.4,
                            -0.5,0.4,-0.2,1.0,1.0,0.4,
                            0.0,-0.6,-0.2,1.0,1.0,0.4,

                            0.0,0.5,0.0,0.4,0.4,1.0,
                            -0.5,-0.5,0.0,0.4,0.4,1.0,
                            0.5,-0.5,0.0,1.0,0.4,0.4
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
                        let texture0 = gl.createTexture();
                        let texture1 = gl.createTexture();
                        if (!texture0) {
                            console.log('创建纹理对象失败！');
                            return false;
                        }
                        //获取u_Sampler的存储位置
                        let u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
                        let u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
                        if (!u_Sampler0) {
                            console.log('获取 uniform 变量 u_Sampler 失败！');
                            return false;
                        }

                        //创建image对象
                        let image0 = new Image();
                        let image1 = new Image();

                        //加载纹理
                        image0.onload = function(){ loadTexture(gl, n, texture0, u_Sampler0, image0,0); };
                        image1.onload = function(){ loadTexture(gl, n, texture1, u_Sampler1, image1,1); };
                        // 浏览器开始加载图片 注意：一定是2^mx2^n尺寸的图片
                        image0.src = "learn_js/webgl_mutilTexture/img01.png";
                        image1.src="learn_js/webgl_mutilTexture/img02.jpg";


                        return true;

                    }

                    let g_texUnit0 = false,g_texUnit1 = false;
                    function loadTexture(gl, n, texture, u_Sampler,image,g_texUnit){

                        //1.对纹理图像进行Y轴反转
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

                        if(g_texUnit==0)
                        {
                            gl.activeTexture(gl.TEXTURE0);
                            g_texUnit0= true;
                        }else
                        {
                            gl.activeTexture(gl.TEXTURE1);
                            g_texUnit1 = true;
                        }

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
                        gl.uniform1i(u_Sampler, g_texUnit);
                        // 清空 <canvas>
                        gl.clear(gl.COLOR_BUFFER_BIT);

                        //绘制矩形
                        if(g_texUnit0 && g_texUnit1)
                        {
                            gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
                            console.log("test!");
                        }

                    }



                    // onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);



                })
        })
        .catch(err=>{console.log(err)}
        );

}
loadShaderFromFile(null,null);
