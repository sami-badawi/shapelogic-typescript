

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

export const fragmentShaderEdge1: string = `
precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / 200.0;
    vec4 colorSum = texture2D(u_image, v_texCoord + onePixel * vec2(1, 0)) -
    texture2D(u_image, v_texCoord + onePixel * vec2(-1, 0));
    gl_FragColor = vec4((colorSum).rgb, 1.0);
}
`

