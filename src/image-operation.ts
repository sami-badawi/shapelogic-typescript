import * as webglHelper from './webgl-helper'

const vertexSource = `
attribute vec2 a_texCoord;

varying vec2 v_texCoord;
    
void main() {
    v_texCoord = a_texCoord;
}
`

const fragmentSource = `
precision mediump float;
 
uniform sampler2D u_image;
 
varying vec2 v_texCoord;
 
void main() {
   gl_FragColor = texture2D(u_image, v_texCoord);
}
`

function render(image: HTMLImageElement, context: WebGLRenderingContext
) {
    const program = webglHelper.linkWebGLprog(context, vertexSource, fragmentSource)

    var texCoordLocation = context.getAttribLocation(program, "a_texCoord");

    var texCoordBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0]), context.STATIC_DRAW);
    context.enableVertexAttribArray(texCoordLocation);
    context.vertexAttribPointer(texCoordLocation, 2, context.FLOAT, false, 0, 0);

    var texture = context.createTexture();
    context.bindTexture(context.TEXTURE_2D, texture);

    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

    // Upload image
    context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
    context.drawArrays(context.TRIANGLES, 0, 6);
}

export function drawImageInContext(
    canvas: HTMLCanvasElement): void {
    console.log('call drawImageInContext');

    const r: number = 0.5;
    const g: number = 0.5;
    const b: number = 0.5;
    const alpha: number = 1.0;

    const context = webglHelper.getWebGLRenderingContext(canvas);

    // Only continue if WebGL is available and working
    if (!context) {
        console.log('WebGL not supported');
        return;
    }
    context.clearColor(r, g, b, alpha);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    var image = new Image();
    image.src = "./img/Lenna.png";
    image.onload = function () {
        render(image, context);
    }
}
