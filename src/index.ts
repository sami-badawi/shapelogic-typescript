import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as sc from './shader-code'
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
    'edge',
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

function getShaderCodeFromInput(input: string): string {
    switch(input) {
        case 'inverse': return sc.fragmentShaderColorInverse;
        case 'edge': return sc.fragmentShaderEdge1;
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