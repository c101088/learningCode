function loadShaderFromFile(filename, onLoadShader) {

    axios.get('learn_js/webgl_LookAtTriangle/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_LookAtTriangle/Fshader_src.glsl')
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

                    let u_ViewMatrix = gl.getUniformLocation(gl.program,"u_ViewMatrix");

                    let viewMatrix = new Matrix4();
                    viewMatrix.setLookAt(0.25,0.25,0.25,0,0,0,0,1,0);
                    console.log(viewMatrix);

                    gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);
                    // 指定清除颜色
                    gl.clearColor(0.0, 0.5, 0.5, 1.0);
                    gl.drawArrays(gl.TRIANGLES,0,n);

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
                        let n = 9;//点的个数
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
                        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6, 0);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Position);

                        //获取Color坐标点
                        let a_Color = gl.getAttribLocation(gl.program, "a_Color");
                        if (a_Color < 0) {
                            console.log('获取 attribute 变量 a_TexCoord 失败！');
                            return -1;
                        }

                        //将缓冲区对象分配给a_Position变量
                        gl.vertexAttribPointer(a_Color,3, gl.FLOAT, false, FSIZE*6, FSIZE*3);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Color);
                        return n;
                    }





                    // onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);



                })
        })
        .catch(err=>{console.log(err)}
        );

}
loadShaderFromFile(null,null);
