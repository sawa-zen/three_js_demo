attribute vec3 position;
attribute float seed;
uniform mat4 pMatrix;
uniform mat4 mvMatrix;
uniform float time;
varying vec4 vColor;

const float PI = 3.1415926535897932384626433832795;

void main(void){
  vColor = vec4(0.0, 0.0, 1.0, 1.0);
  float rad = (seed + time) * PI / 180.0;
  float y = cos(rad * 3.0) * 3.0;
  vColor.x = cos(rad);
  vColor.y = sin(rad);
  vec4 mvPosition = mvMatrix * vec4(position.x, y, position.z, 1.0);
  gl_Position = pMatrix * mvPosition;
  gl_PointSize = 2.0;
}
