import * as webglHelper from './webgl-helper'
import * as sc from './shader/shader-code'

function renderImageWithNoOptions(
    image: HTMLImageElement,
    context: WebGLRenderingContext,
    fragmentShaderSource: string
): void {
    if (!context) {
        return;
    }

    // setup GLSL program
    const program = webglHelper.linkWebGLprog(context, sc.vertexShaderSourceDefault, fragmentShaderSource)

    const positionLocation = context.getAttribLocation(program, "a_position");
    const texcoordLocation = context.getAttribLocation(program, "a_texCoord");


    // Create a buffer to put three 2d clip space points in
    var positionBuffer = context.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    // Set a rectangle the same size as the image.
    setRectangle(context, 0, 0, image.width, image.height);

    // provide texture coordinates for the rectangle.
    var texcoordBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ]), context.STATIC_DRAW);

    // Create a texture.
    var texture = context.createTexture();
    context.bindTexture(context.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

    // Upload the image into the texture.
    context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);

    // lookup uniforms
    var resolutionLocation = context.getUniformLocation(program, "u_resolution");

    //    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    context.viewport(0, 0, context.canvas.width, context.canvas.height);

    // Clear the canvas
    context.clearColor(0, 0, 0, 0);
    context.clear(context.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    context.useProgram(program);

    // Turn on the position attribute
    context.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = context.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    context.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset)

    // Turn on the teccord attribute
    context.enableVertexAttribArray(texcoordLocation);

    // Bind the position buffer.
    context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = context.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    context.vertexAttribPointer(
        texcoordLocation, size, type, normalize, stride, offset)

    // set the resolution
    context.uniform2f(resolutionLocation, context.canvas.width, context.canvas.height);

    // Draw the rectangle.
    var primitiveType = context.TRIANGLES;
    var offset = 0;
    var count = 6;
    context.drawArrays(primitiveType, offset, count);
}

function setRectangle(
    context: WebGLRenderingContext,
    x: number,
    y: number,
    width: number,
    height: number) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), context.STATIC_DRAW);
}

export function doImageOperationNoArg(
    canvas: HTMLCanvasElement,
    imageSrc: string,
    fragmentShaderSource: string
): void {
    console.log(`call doImageOperationNoArg for image src: ${imageSrc}`);

    const alpha: number = 1.0;
    const [r, g, b] = [0.5, 0.8, 1]

    const context = webglHelper.getWebGLRenderingContext(canvas);

    // Only continue if WebGL is available and working
    if (!context) {
        console.log('WebGL not supported');
        return;
    }
    webglHelper.clearCanvas(canvas, r, g, b, alpha)
    var image = new Image();
    image.src = imageSrc;
    image.onload = function () {
        renderImageWithNoOptions(image, context, fragmentShaderSource);
    }
}
