
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

/**
 * Simplest version of class that takes on parameters
 */
export class ImageClassNoOpt implements ImageOp {
    constructor(
        public fragmentShaderSource: string,
        public menu: string,
        public title: string,
        public vertexShaderSource: string
    ) {
    }

    handle(image: HTMLImageElement,
        context: WebGLRenderingContext,
        callOptions: any): boolean {
        return true;
    }

}