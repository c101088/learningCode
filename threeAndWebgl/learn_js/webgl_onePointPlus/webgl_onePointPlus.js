
function loadShaderFromFile(filename, onLoadShader) {
    axios.get('learn_js/webgl_onePointPlus/Vshader_src.glsl')
        .then(function(res){
            // console.log(res.data);
            let VSHADER_SOURCE=res.data;

            axios.get('learn_js/webgl_onePointPlus/Fshader_src.glsl')
                .then(function(res){
                    let FSHADER_SOURCE=res.data;
                    onLoadShader(VSHADER_SOURCE,FSHADER_SOURCE);
                })
        })
        .catch(err=>{console.log(err)}
        );

}

function main (){

    var canvas = document.getElementById("webgl");


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

        console.log(gl.program);
        let a_Position = gl.getAttribLocation(gl.program,'a_Poistion');
        let u_FragColor = gl.getUniformLocation(gl.program,"u_FragColor");

        if(a_Position<0)
        {
            console.log("failed to get the storage location of a_Position");
            return ;
        }
        gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
        gl.uniform4fv(u_FragColor,new Float32Array([1.0,1.0,0.0,1.0]));

        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS,0,1);

    }
    loadShaderFromFile(null,draw);

}

main();
