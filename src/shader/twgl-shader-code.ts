// twgl-shader-code.ts

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

export const fragmentShaderSwapBgr = `precision mediump float;

varying vec2 texcoord;
uniform sampler2D texture;

void main() {
  if (texcoord.x < 0.0 || texcoord.x > 1.0 ||
      texcoord.y < 0.0 || texcoord.y > 1.0) {
    discard;
  }
  gl_FragColor = texture2D(texture, texcoord).bgra;
}
`

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
