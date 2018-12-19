attribute vec3 position;
attribute float seed;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
varying vec4 vColor;

const float PI = 3.1415926535897932384626433832795;

void main(void){
  vColor = vec4(0.0, 0.0, 1.0, 1.0);
  float rad = (seed + time) * PI / 180.0;
  float y = cos(rad * 3.0) * 3.0;
  vColor.x = cos(rad);
  vColor.y = sin(rad);
  vec4 mvPosition = modelViewMatrix * vec4(position.x, y, position.z, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 2.0;
}
