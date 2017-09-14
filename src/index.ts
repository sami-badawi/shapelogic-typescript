import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as sc from './shader-code'
import * as m from 'mithril'
import * as mh from './mithril-helper'
import * as _ from 'lodash'
// import * as twgl from '../node_modules/twgl.js/dist/3.x/twgl-full.js'
const twgl = require('../node_modules/twgl.js/dist/3.x/twgl-full')

const verboseLogging = false

const headerPart = m('header', [
    m('h1', [`ShapeLogic TypeScript`]),
    m('p', ["Computer vision in TypeScript and WebGL",
    m('a', {href: "https://github.com/sami-badawi/shapelogic-typescript"},[` at GitHub`])]),
])

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const colorSequenceArray = [
    'inverse',
    'edge',
    'threshold',
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

function info() {
    const twglCreateProgramInfoType = typeof twgl.createProgramInfo;
    console.log(`twglCreateProgramInfoType: ${twglCreateProgramInfoType}`)
}

function getShaderCodeFromInput(input: string): string {
    info()
    switch(input) {
        case 'inverse': return sc.fragmentShaderColorInverse;
        case 'edge': return sc.fragmentShaderEdge1;
        case 'threshold': return sc.fragmentShaderThreshold;
        default: return sc.fragmentShaderColorSwapper(input)
    }
}

function showImage(): void {
    const colorSequence = getValueFromSelect("#familyname") || colorSequenceArray[0]
    const imageSource = "img/" + (getValueFromSelect("#imageSources") || imageSources[0])
    const fragmentSource = getShaderCodeFromInput(colorSequence)
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