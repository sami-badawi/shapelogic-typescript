/**
 * 
 * @param glContext get from canvas
 * @param shaderType either 'vertex' | 'fragment'
 * @param source 
 */
export function compileShader(
    glContext: WebGLRenderingContext,
    shaderType: 'vertex' | 'fragment',
    source: string): WebGLShader {
    const shader = glContext.createShader(shaderType === 'vertex' ? glContext.VERTEX_SHADER : glContext.FRAGMENT_SHADER)
    glContext.shaderSource(shader, source)
    glContext.compileShader(shader)
    if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.log("could not compile " + shaderType + " shader:\n\n" + glContext.getShaderInfoLog(shader))
        glContext.deleteShader(shader)
        return null
    } else {
        return shader
    }
}

/**
 * 
 * @param glContext get from canvas
 * @param fragmentShaderSource source as string
 * @param vertexShaderSource source as string
 */
export function linkWebGLprog(
    glContext: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string): WebGLProgram {

    if (!glContext)
        console.log('WebGL is not supported for this device')
    else if (typeof fragmentShaderSource !== 'string')
        console.log('Fragment shader was not defined')
    else if (typeof vertexShaderSource !== 'string')
        console.log('Vertex shader was not defined')
    else {
        const compiled_vs = compileShader(glContext, 'vertex', vertexShaderSource)
        const compiled_fs = compileShader(glContext, 'fragment', fragmentShaderSource)

        if (!compiled_fs || !compiled_vs) return null

        const program = glContext.createProgram()
        glContext.attachShader(program, compiled_vs)
        glContext.attachShader(program, compiled_fs)
        glContext.linkProgram(program)

        if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
            console.log('could not link the shader program!')
            glContext.deleteProgram(program)
            glContext.deleteProgram(compiled_vs)
            glContext.deleteProgram(compiled_fs)
            return null
        } else {
            glContext.useProgram(program)
            return program
        }
    }
    return null
}

export function clearCanvas(
    canvas: HTMLCanvasElement,
    r: number,
    g: number,
    b: number,
    alpha: number): void {
    const context: WebGLRenderingContext = canvas.getContext("webgl")

    // Only continue if WebGL is available and working
    if (!context) {
        console.log('WebGL not supported');
        return;
    }
    context.clearColor(r, g, b, alpha);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
}

export function drapSimpleTriangle(
    canvas: HTMLCanvasElement,
    r: number,
    g: number,
    b: number,
    alpha: number): void {
    const context: WebGLRenderingContext = canvas.getContext("webgl")

    // Only continue if WebGL is available and working
    if (!context) {
        console.log('WebGL not supported');
        return;
    }
    context.clearColor(r, g, b, alpha);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

    const vertexSource = `
    attribute vec3 a_position; 

    void main() { 
        gl_Position = vec4 (a_position, 1); 
    }
`
    const fragmentSource = `
    precision mediump float;
    
    void main() { 
        gl_FragColor = vec4 (0.9,0,0.1,1); 
    }
    `
    const program = linkWebGLprog(context, vertexSource, fragmentSource)

    // Setup Geometry
    // Create a Vertex Buffer Object (VBO) and bind two buffers to it
    // 1. positions
    var positions = new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.0, 0.5, 0.0,
    ]);
    var positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    context.bufferData(context.ARRAY_BUFFER, positions, context.STATIC_DRAW);
    context.vertexAttribPointer(0, 3, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(0);
    context.bindAttribLocation(program, 0, "a_position")

    // // 2. colours
    // var colors = new Float32Array([
    //     1.0, 0.0, 0.0,
    //     0.0, 1.0, 0.0,
    //     0.0, 0.0, 1.0,
    // ]);
    // var colorBuffer = context.createBuffer();
    // context.bindBuffer(context.ARRAY_BUFFER, colorBuffer);
    // context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);
    // context.vertexAttribPointer(1, 3, context.FLOAT, false, 0, 0);
    // context.enableVertexAttribArray(1);

    context.drawArrays(context.TRIANGLES, 0, 3);
}
