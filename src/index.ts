import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as sc from './shader/shader-code'
import * as m from 'mithril'
import * as mh from './gui/mithril-helper'
import * as _ from 'lodash'
import * as twgl from 'twgl.js'
import * as twsh from './shader/twgl-shader-code'
import * as twhl from './twgl-helper'

// const twgl = require('../node_modules/twgl.js/dist/3.x/twgl-full')

const verboseLogging = false
const version = "0.7.0"

const menuElement = document.getElementById("menuElement")

import { makeHeaderWithMenuTest } from './gui/mithril-menu'

const headerPart = m('header', [
    m('h1', [`ShapeLogic TypeScript`]),
    m('p', [`Computer vision in TypeScript and WebGL`,
        m('i', [`, ${version}`]),
        m('a', { href: "https://github.com/sami-badawi/shapelogic-typescript" }, [` at GitHub`])]),
    makeHeaderWithMenuTest((title: string) => makeClosure(title))
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
    "Lenna.jpg",
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
        case 'inverse': return twsh.fragmentShaderColorInverse;
        case 'edge': return twsh.fragmentShaderEdge1;
        case 'threshold': return twsh.fragmentShaderThreshold;
        default: return twsh.fragmentShaderColorSwapper(input)
    }
}

function imageName2Url(imageName: string): string {
    if (imageName.startsWith('http'))
        return imageName
    else
        return "img/" + imageName
}

/**
 * You can either run operatons through twgl or directly.
 * First I did it directly, but currently all are moved to use twgl
 */
const directOperations = new Set([])

function showImage(): void {
    const colorSequence = getValueFromSelect("#familyname") || colorSequenceArray[0]
    processImage(colorSequence)
}

function makeClosure(title: string): () => void {
    return () => { processImage(title) }
}

function processImage(colorSequence: string): void {
    let u_limit = 0.3
    const textInput1 = document.getElementById("text1") as HTMLInputElement
    if (textInput1) {
        const text = textInput1.value
        console.log(`textInput1: ${text}`)
        const foundFloat: number = parseFloat(text)
        if (!Number.isNaN(foundFloat))
            u_limit = foundFloat * 0.01
        else
            console.log(`Could not parse textInput1`)
    }
    else {
        console.log("#text1 not found")
    }
    const imageurlInput = document.getElementById("imageurl") as HTMLInputElement
    const imageSource = imageurlInput.value.trim() || imageName2Url(getValueFromSelect("#imageSources") || imageSources[0])
    const fragmentSource = getShaderCodeFromInput(colorSequence)
    if (directOperations.has(colorSequence))
        io.doImageOperationNoArg(canvas, imageSource, fragmentSource)
    else if (colorSequence == 'threshold')
        twhl.doImageOperationTwgl(canvas, imageSource, fragmentSource, { u_limit: u_limit })
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

const extra = document.getElementById("extra")

if (extra) {
    m.render(extra, [
        headerPart,
        // makeHeaderWithMenuTest((title: string) => makeClosure(title)),
        m('div', [
            m('label', 'Image operation'),
            mh.makeDropdown(colorSequenceArray, 'familyname')
        ]),
        m('div', [
            m('button', { onclick: showImage }, `Process Image`),
            m('input', { id: "text1", placeholder: "parameter", type: "range" }, `text1`)]),
        m('div', [
            m('label', 'Image source'),
            mh.makeDropdown(imageSources, 'imageSources')
        ]),
        m('div', [
            m('label', 'Image URL'),
            m('input', { id: "imageurl", placeholder: "Takes priority over dropdown", width: "70%" }, `imageurl`)
        ])
    ]
    );
}


if (menuElement) {
    // m.render(menuElement, makeHeaderWithMenuTest())
    // m.render(menuElement, makeHeaderWithMenuTest((title: string) => makeClosure(title)))
}

import { doImageOperationNoArg } from './image-operation';
export { doImageOperationNoArg };
