import { fourFourty } from './math_helper'
import * as io from './image-operation'
import * as m from 'mithril'
import * as _ from 'lodash'

const word1 = "ShapeLogic";
const word2 = "TypeScript" // _.trim("  TypeScript   ");

const hello = m('h1', [`${word1} ${word2}`]);
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const colorSequenceArray = [
    'rgba',
    'rbga',
    'bgra'
]

let colorIndex = 0
let imageSource = "./img/Lenna.png"

function showImage(): void {
    colorIndex = (colorIndex + 1) % colorSequenceArray.length;
    const colorSequence = colorSequenceArray[colorIndex];
    io.drawImageInContext(canvas, imageSource, colorSequence, 0.5, 0.8, 1)
}

m.render(document.getElementById("extra"), [hello,
    m('p', ["Computer vision in TypeScript and WebGL"]),
    m('button', { onclick: showImage }, `Process Image: ${imageSource}`),
    m('p', ["Will process image"])
]
);

import { drawImageInContext } from './image-operation';

export { drawImageInContext };