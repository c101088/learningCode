function loadShaderFromFile(filename, onLoadShader) {

    axios.get('learn_js/webgl_PointLightCube_perFragment/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_PointLightCube_perFragment/Fshader_src.glsl')
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
                    // gl.clearColor(0.0,0.0,0.0,1.0);


                    let u_MvpMatrix = gl.getUniformLocation(gl.program,"u_MvpMatrix");
                    let u_ModelMatrix = gl.getUniformLocation(gl.program ,'u_ModelMatrix');
                    let u_LightColor = gl.getUniformLocation(gl.program,'u_LightColor');
                    let u_LightPosition = gl.getUniformLocation(gl.program,'u_LightPosition');
                    let u_AmbientLight = gl.getUniformLocation(gl.program ,'u_AmbientLight');
                    if(u_MvpMatrix<0)
                    {
                        console.log("加载u_MvpMatrix失败");
                        return;
                    }


                    let viewMatrix = new Matrix4();
                    viewMatrix.setLookAt(3,3,7,0,0,0,0,1,0);
                    let  modelMatrix = new Matrix4();
                    modelMatrix.setRotate(0,0,0,1);
                    let projMatrix = new Matrix4();
                    projMatrix.setPerspective(30,canvas.width/canvas.height,1,100);
                    let mvpMatrix = projMatrix.multiply(viewMatrix.multiply(modelMatrix));

                    gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);
                    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
                    gl.uniform3f(u_LightColor,1.0,1.0,1.0);
                    gl.uniform3f(u_LightPosition,0.0,3.0,4.0);
                    // 指定清除颜色
                    gl.uniform3f(u_AmbientLight,0.5,0.2,0.2);

                    gl.clearColor(0.0, 0.5, 0.5, 1.0);
                    gl.enable(gl.DEPTH_TEST);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
                    // gl.drawElements(gl.LINE_LOOP,n,gl.UNSIGNED_BYTE,0);
                    // gl.drawElements(gl.POINTS,n,gl.UNSIGNED_BYTE,0);

                    console.log(" helloCube done!");

                    function initBuffers(gl) {
                        //顶点坐标和颜色
                        let vertices = new Float32Array([
                            1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,  // v0-v1-v2-v3 front
                            1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,  // v0-v3-v4-v5 right
                            1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
                            -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,  // v1-v6-v7-v2 left
                            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,  // v7-v4-v3-v2 down
                            1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0   // v4-v7-v6-v5 back
                        ]);

                        let colors = new Float32Array([
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
                            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
                        ]);
                        let normals = new Float32Array(
                            [
                                0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
                                1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
                                0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
                                -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
                                0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
                                0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
                            ]
                        );

                        let indices = new Uint8Array([       // Indices of the vertices
                            0, 1, 2, 0, 2, 3,    // front
                            4, 5, 6, 4, 6, 7,    // right
                            8, 9, 10, 8, 10, 11,    // up
                            12, 13, 14, 12, 14, 15,    // left
                            16, 17, 18, 16, 18, 19,    // down
                            20, 21, 22, 20, 22, 23     // back
                        ]);
                        //创建缓冲区对象
                        let vertexBuffer = gl.createBuffer();
                        let colorBuffer = gl.createBuffer();
                        let normalBuffer = gl.createBuffer();
                        let indexBuffer = gl.createBuffer();
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
                        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*3, 0);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Position);

                        gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
                        //向缓冲区写入数据
                        gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);

                        FSIZE = colors.BYTES_PER_ELEMENT;

                        //获取坐标点
                        let a_Color = gl.getAttribLocation(gl.program, "a_Color");

                        if(a_Color<0)
                        {
                            console.log("a_Color");
                            return ;
                        }
                        //将缓冲区对象分配给a_Position变量
                        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*3, 0);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Color);


                        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
                        //向缓冲区写入数据
                        gl.bufferData(gl.ARRAY_BUFFER,normals,gl.STATIC_DRAW);

                        FSIZE = normals.BYTES_PER_ELEMENT;

                        //获取坐标点
                        let a_Normal = gl.getAttribLocation(gl.program, "a_Normal");

                        if(a_Normal<0)
                        {
                            console.log("a_Normal");
                            return ;
                        }
                        //将缓冲区对象分配给a_Position变量
                        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, FSIZE*3, 0);
                        //连接a_Position变量与分配给它的缓冲区对象
                        gl.enableVertexAttribArray(a_Normal);



                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
                        return indices.length;
                    }



                    // onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);



                })
        })
        .catch(err=>{console.log(err)}
        );

}
loadShaderFromFile(null,null);
