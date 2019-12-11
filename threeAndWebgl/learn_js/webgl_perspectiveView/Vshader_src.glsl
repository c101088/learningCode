attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4  u_ModelMatrix;
uniform mat4  u_ViewMatrix;
uniform mat4  u_ProjectMatrix;
varying vec4 v_Color;
void main()
{
    gl_Position = u_ProjectMatrix*u_ViewMatrix*u_ModelMatrix*a_Position;
    v_Color = a_Color;
}
