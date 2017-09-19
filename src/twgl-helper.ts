/**
 * twgl-helper.ts module serves the same purpose as image-operations.ts
 * 
 * Maybe this would work better as a class
 */

import * as sc from './shader/shader-code'
import * as twgl from 'twgl.js'
import * as webglHelper from './webgl-helper'
import * as twsh from './shader/twgl-shader-code'

const m4 = twgl.m4
const verboseLogging = false
const useColoredBackground = false

// dstX, dstY, dstWidth, dstHeight are in pixels
// computed from targetWidth and targetHeight
function makeMatrices(
    targetWidth: number,
    targetHeight: number,
    texWidth: number,
    texHeight: number,
    srcX?: number,
    srcY?: number,
    srcWidth?: number,
    srcHeight?: number,
    dstX?: number,
    dstY?: number,
    dstWidth?: number,
    dstHeight?: number): object {
    if (srcX === undefined) {
        srcX = 0
        srcY = 0
    }
    if (srcWidth === undefined) {
        srcWidth = texWidth;
        srcHeight = texHeight;
    }
    if (dstX === undefined) {
        dstX = srcX;
        dstY = srcY;
        srcX = 0;
        srcY = 0;
    }
    if (dstWidth === undefined) {
        dstWidth = srcWidth;
        dstHeight = srcHeight;
    }

    if (verboseLogging) {
        const variablesWithValues = `
    targetWidth, ${targetWidth},
    targetHeight, ${targetHeight},
    texWidth, ${texWidth},
    texHeight, ${texHeight},
    srcX, ${srcX},
    srcY, ${srcY},
    srcWidth, ${srcWidth},
    srcHeight, ${srcHeight},
    dstX, ${dstX},
    dstY, ${dstY},
    dstWidth, ${dstWidth},
    dstHeight, ${dstHeight}
`
        console.log(variablesWithValues)
    }

    var mat = m4.identity();
    var tmat = m4.identity();

    // these adjust the unit quad to generate texture coordinates
    // to select part of the src texture

    // NOTE: no check is done that srcX + srcWidth go outside of the
    // texture or are in range in any way. Same for srcY + srcHeight

    m4.translate(tmat, [srcX / texWidth, srcY / texHeight, 0], tmat);
    m4.scale(tmat, [srcWidth / texWidth, srcHeight / texHeight, 1], tmat);


    // these convert from pixels to clip space
    m4.ortho(0, targetWidth, targetHeight, 0, -1, 1, mat)

    //     // these move and scale the unit quad into the size we want
    //     // in the target as pixels
    m4.translate(mat, [dstX, dstY, 0], mat);
    m4.scale(mat, [dstWidth, dstHeight, 1], mat);

    var uniforms = {
        matrix: mat,
        textureMatrix: tmat
    };
    return uniforms
}

function renderImageWithNoOptions(
    image: HTMLImageElement,
    context: WebGLRenderingContext,
    fragmentShaderSource: string
): void {
    if (!context) {
        return;
    }

    const sources = [sc.vertexShaderSourceDefault, fragmentShaderSource]
    const program = twgl.createProgramInfo(
        context,
        sources
    )
    // var tex = twgl.createTexture(context,
}

function drawImage(
    gl: WebGLRenderingContext,
    programInfo: twgl.ProgramInfo,
    bufferInfo: any,
    tex: WebGLTexture,
    canvas: HTMLCanvasElement,
    img: twgl.TextureSrc,
    extraUniforms?: object
) {
    console.log(`drawImage started`)
    console.log(`img.width: ${img.width}`)
    const uniforms = makeMatrices(
        canvas.width,
        canvas.height,
        img.width,
        img.height
    )
    console.log(`uniforms: ${uniforms.matrix}`)

    uniforms["texture"] = tex;
    if (extraUniforms)
        Object.assign(uniforms, extraUniforms)

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES);
    console.log(`drawImage done`)
}

/**
 * Main interface function
 */
type RenderImageSource = (canvas: HTMLCanvasElement,
    imageSrc: string,
    fragmentShaderSource: string
) => void

/**
 * Main interface function implementation
 * @param canvas 
 * @param imageSrc 
 * @param fragmentShaderSource 
 */
export function doImageOperationTwgl(
    canvas: HTMLCanvasElement,
    imageSource: string,
    fragmentShaderSource: string,
    extraUniforms?: object
): void {
    console.log(`call doImageOperationNoArg for image src: ${imageSource}`);

    const alpha: number = 1.0;
    const [r, g, b] = useColoredBackground ? [0.5, 0.8, 1.0] : [1.0, 1.0, 1.0]

    const context = webglHelper.getWebGLRenderingContext(canvas);

    // Only continue if WebGL is available and working
    if (!context) {
        console.log('WebGL not supported');
        return;
    }
    webglHelper.clearCanvas(canvas, r, g, b, alpha)
    // var image = new Image();
    // image.src = imageSrc;
    // image.onload = function () {
    //     renderImageWithNoOptions(image, context, fragmentShaderSource);
    // }

    const gl = twgl.getWebGLContext(canvas);
    const programInfo = twgl.createProgramInfo(gl, [twsh.vertexShaderDefault, fragmentShaderSource]);
    console.log(`programInfo compiled: ${programInfo}`)

    // a unit quad
    const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

    // we're only using 1 texture so just make and bind it now
    let tex = twgl.createTexture(gl, {
        src: imageSource,
        crossOrigin: '', // not needed if image on same origin
    }, function (err, tex, img) {
        // wait for the image to load because we need to know it's size
        drawImage(gl, programInfo, bufferInfo, tex, canvas, img, extraUniforms);
    });
}
