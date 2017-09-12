import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as m from 'mithril'
import * as mh from './mithril-helper'
import * as _ from 'lodash'

const verboseLogging = false

const headerPart = m('header', [
    m('h1', [`ShapeLogic TypeScript`]),
    m('p', ["Computer vision in TypeScript and WebGL"])
])

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const colorSequenceArray = [
    'inverse',
    'rgba',
    'rbga',
    'gbra',
    'bgra',
    'rrra',
    'ggga',
    'bbba'
]

let colorIndex = 0
let imageSources = [
    "Lenna.png",
    "embryos.jpg",
    "baby-ball.jpg",
    "shapelogicsmalltransparent.png"]

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

function showImage(): void {
    const colorSequence = getValueFromSelect("#familyname") || colorSequenceArray[0]
    const imageSource = "img/" + (getValueFromSelect("#imageSources") || imageSources[0])
    const fragmentSource = (colorSequence == 'inverse') ? fragmentShaderColorInverse : io.fragmentShaderColorSwapper(colorSequence)
    io.doImageOperationNoArg(canvas, imageSource, fragmentSource)
}
/**
 * 
 * @param selector 
 */
function getValueFromSelect(selector: string): string | null {
    const domFamily = document.querySelector(selector) as HTMLSelectElement
    if (!domFamily) {
        console.warn('domFamily missing')
        return null
    }
    else {
        if (verboseLogging)
            console.log(domFamily)
        return domFamily.value
    }
}

function printFamilyname(): void {
    const familyname = getValueFromSelect("#familyname")

    console.log(`getFamilyname(): ${familyname}`)
}

m.render(document.getElementById("extra"), [
    headerPart,
    m('button', { onclick: showImage }, `Process Image`),
    m('div', [mh.makeDropdown(colorSequenceArray, 'familyname')]),
    m('div', [mh.makeDropdown(imageSources, 'imageSources')])
]
);

import { doImageOperationNoArg } from './image-operation';

export { doImageOperationNoArg };