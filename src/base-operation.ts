
/**
 * There are many different image operations
 * It would be nice to handle them in a similar way.
 */
export interface ImageOp {
    fragmentShaderSource: string,
    menu: string,
    title: string,
    handle: (image: HTMLImageElement,
        context: WebGLRenderingContext,
        callOptions: any) => boolean,
    vertexShaderSource: string
}

class ImageClassNoOpt implements ImageOp {
    fragmentShaderSource: string;
    menu: string;
    title: string;
    vertexShaderSource: string;
    constructor(
        fragmentShaderSource: string,
        menu: string,
        title: string,
        vertexShaderSource: string
    ) {
    }

    handle(image: HTMLImageElement,
        context: WebGLRenderingContext,
        callOptions: any): boolean {
        return true;
    }

}