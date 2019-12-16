precision mediump float;
uniform vec3 u_LightColor;
uniform vec3 u_LightPosition;
uniform vec3 u_AmbientLight;

varying vec4 v_Color;
varying vec3 v_Normal;
varying vec3 v_Position;

void main(){
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition-v_Position);
    float nDotL = max(dot(lightDirection,normal),0.0);
    vec3 diffuse = u_LightColor*vec3(v_Color)*nDotL;
    vec3 ambient = u_AmbientLight*vec3(v_Color);

    gl_FragColor = vec4(diffuse+ambient,v_Color.a);

}
