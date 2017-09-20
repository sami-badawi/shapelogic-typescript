// twgl-shader-code.ts

// ----------------------- Vertex Shaders -----------------------

export const vertexShaderDefault = `// we will always pass a 0 to 1 unit quad
// and then use matrices to manipulate it
attribute vec4 position;   

uniform mat4 matrix;
uniform mat4 textureMatrix;

varying vec2 texcoord;

void main () {
  gl_Position = matrix * position;
  
  texcoord = (textureMatrix * position).xy;
}
`

// ----------------------- Fragment Shaders -----------------------

export const fragmentShaderDefault = `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;

void main() {
  if (texcoord.x < 0.0 || texcoord.x > 1.0 ||
      texcoord.y < 0.0 || texcoord.y > 1.0) {
    discard;
  }
  gl_FragColor = texture2D(texture, texcoord);
}
`

export const fragmentShaderColorInverse = `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;

void main() {
  if (texcoord.x < 0.0 || texcoord.x > 1.0 ||
      texcoord.y < 0.0 || texcoord.y > 1.0) {
    discard;
  }
  gl_FragColor = vec4(1, 1, 1, 2) - texture2D(texture, texcoord).rgba;
}
`

export const fragmentShaderThreshold = `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;

uniform float u_limit;

void main() {
  if (texcoord.x < 0.0 || texcoord.x > 1.0 ||
      texcoord.y < 0.0 || texcoord.y > 1.0) {
    discard;
  }
  vec3 rgb1 = texture2D(texture, texcoord).rgb;
  vec3 rgb2 = (sign(rgb1 - u_limit) * 2.0) - 1.0;
  gl_FragColor = vec4(rgb2, 1);
}
`


export const fragmentShaderSwapBgr = fragmentShaderColorSwapper('bgra')

export function fragmentShaderColorSwapper(colorSequence: string = 'bgra'): string {
  return `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;

void main() {
  if (texcoord.x < 0.0 || texcoord.x > 1.0 ||
      texcoord.y < 0.0 || texcoord.y > 1.0) {
    discard;
  }
  gl_FragColor = texture2D(texture, texcoord).${colorSequence};
}
`
}

export const fragmentShaderEdge1: string = `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;
uniform float u_width;
uniform float u_height;

void main() {
    vec2 onePixel = vec2(1.0 / u_width, 1.0 / u_height);
    vec4 colorSumH = abs(texture2D(texture, texcoord + onePixel * vec2(1, 0)) -
    texture2D(texture, texcoord + onePixel * vec2(-1, 0)));
    vec4 colorSumV = abs(texture2D(texture, texcoord + onePixel * vec2(0, 1)) -
    texture2D(texture, texcoord + onePixel * vec2(0, -1)));
    vec4 colorSum = max(colorSumV, colorSumH);
    gl_FragColor = vec4((colorSum).rgb, 1.0);
}
`
