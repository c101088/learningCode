

function main()
{
    var canvas = document.getElementById( "webgl");
    var gl = getWebGLContext(canvas,true);
    // var gl = canvas.getContext("webgl");
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return ;
    }

    gl.clearColor(1.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
main();
