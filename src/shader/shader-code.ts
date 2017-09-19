
// ----------------------- Vertex Shaders -----------------------

/**
 * This is the standard image processing vertexShaderSource
 */
export const vertexShaderSourceDefault =
    `attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
// convert the rectangle from pixels to 0.0 to 1.0
vec2 zeroToOne = a_position / u_resolution;

// convert from 0->1 to 0->2
vec2 zeroToTwo = zeroToOne * 2.0;

// convert from 0->2 to -1->+1 (clipspace)
vec2 clipSpace = zeroToTwo - 1.0;

gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

// pass the texCoord to the fragment shader
// The GPU will interpolate this value between points.
v_texCoord = a_texCoord;
}
`;

// ----------------------- Fragment Shaders -----------------------

export function fragmentShaderColorSwapper(colorSequence: string = 'bgra'): string {
    return `
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    gl_FragColor = texture2D(u_image, v_texCoord).${colorSequence};
}
`
}

export const fragmentShaderColorInverse: string = `
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    gl_FragColor = vec4(1, 1, 1, 2) - texture2D(u_image, v_texCoord).rgba;
}
`

/**
 * Component wise threshold
 */
export const fragmentShaderThreshold: string = `
precision mediump float;

// our texture
uniform sampler2D u_image;

float limit = 0.5;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    vec3 rgb1 = texture2D(u_image, v_texCoord).rgb;
    vec3 rgb2 = (sign(rgb1 - vec3(0.5, 0.5, 0.5)) * 2.0) - 1.0;
    gl_FragColor = vec4(rgb2, 1);
}
`

export const fragmentShaderEdge1: string = `
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / 400.0;
    vec4 colorSumH = abs(texture2D(u_image, v_texCoord + onePixel * vec2(1, 0)) -
    texture2D(u_image, v_texCoord + onePixel * vec2(-1, 0)));
    vec4 colorSumV = abs(texture2D(u_image, v_texCoord + onePixel * vec2(0, 1)) -
    texture2D(u_image, v_texCoord + onePixel * vec2(0, -1)));
    vec4 colorSum = max(colorSumV, colorSumH);
    gl_FragColor = vec4((colorSum).rgb, 1.0);
}
`
