import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as m from 'mithril'
import * as mh from './mithril-helper'
import * as _ from 'lodash'

const verboseLogging = false

const word1 = "ShapeLogic";
const word2 = "TypeScript" // _.trim("  TypeScript   ");

const headerPart = m('header', [
    m('h1', [`ShapeLogic TypeScript`]),
    m('p', ["Computer vision in TypeScript and WebGL"])
])

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const colorSequenceArray = [
    'rgba',
    'rbga',
    'bgra'
]

let colorIndex = 0
let imageSources = [
    "Lenna.png",
    "embryos.jpg",
    "baby-ball.jpg",
    "shapelogicsmalltransparent.png"]

function showImage(): void {
    colorIndex = (colorIndex + 1) % colorSequenceArray.length;
    // const colorSequence = colorSequenceArray[colorIndex];
    const colorSequence = getValueFromSelect("#familyname") || colorSequenceArray[0]
    const imageSource = "img/" + (getValueFromSelect("#imageSources") || imageSources[0])
    io.drawImageInContext(canvas, imageSource, colorSequence, 0.5, 0.8, 1)
}
/**
 * 
 * @param selector 
 */
function getValueFromSelect(selector: string): string | null {
    // const domFamily = document.getElementById('familyname')
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

import { drawImageInContext } from './image-operation';

export { drawImageInContext };