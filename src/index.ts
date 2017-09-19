import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as sc from './shader/shader-code'
import * as m from 'mithril'
import * as mh from './mithril-helper'
import * as _ from 'lodash'
import * as twgl from 'twgl.js'
import * as twsh from './shader/twgl-shader-code'
import * as twhl from './twgl-helper'

// const twgl = require('../node_modules/twgl.js/dist/3.x/twgl-full')

const verboseLogging = false

const headerPart = m('header', [
    m('h1', [`ShapeLogic TypeScript`]),
    m('p', ["Computer vision in TypeScript and WebGL",
        m('a', { href: "https://github.com/sami-badawi/shapelogic-typescript" }, [` at GitHub`])]),
])

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const colorSequenceArray = [
    'inverse',
    'twgl',
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
    "shapelogicsmalltransparent.png",
    "https://farm6.staticflickr.com/5695/21506311038_9557089086_m_d.jpg"
]

function info() {
    const twglCreateProgramInfoType = typeof twgl.createProgramInfo;
    // twgl.createProgramInfo()
    console.log(`twglCreateProgramInfoType: ${twglCreateProgramInfoType}`)
}

function getShaderCodeFromInput(input: string): string {
    info()
    switch (input) {
        case 'twgl': return twsh.fragmentShaderSwapBgr;
        case 'inverse': return twsh.fragmentShaderColorInverse;
        case 'edge': return twsh.fragmentShaderEdge1;
        case 'threshold': return twsh.fragmentShaderThreshold;
        default: return twsh.fragmentShaderColorSwapper(input)
    }
}

const directOperations = new Set([])

function imageName2Url(imageName: string): string {
    if (imageName.startsWith('http'))
        return imageName
    else
        return "img/" + imageName
}

function showImage(): void {
    const colorSequence = getValueFromSelect("#familyname") || colorSequenceArray[0]
    const imageSource = imageName2Url(getValueFromSelect("#imageSources") || imageSources[0])
    const fragmentSource = getShaderCodeFromInput(colorSequence)
    if (directOperations.has(colorSequence))
        io.doImageOperationNoArg(canvas, imageSource, fragmentSource)
    else
        twhl.doImageOperationTwgl(canvas, imageSource, fragmentSource)
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