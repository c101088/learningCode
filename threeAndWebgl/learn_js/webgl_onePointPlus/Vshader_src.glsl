attribute vec4 a_Poistion;

void main()
{
    gl_Position = a_Poistion;
    gl_PointSize = 10.0;
}
