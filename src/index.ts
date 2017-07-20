import {fourFourty} from './math_helper'
import * as m from 'mithril'
import * as _ from 'lodash'

const word1 = "ShapeLogic";
const word2 = "TypeScript" // _.trim("  TypeScript   ");

const hello = m('h1', [`${word1} ${word2} ${fourFourty}`]);

m.render(document.getElementById("root")!, [hello,
	m('p', ["An exploration of TypeScript's suitability for computer vision."]),
	m('p', ["ShapeLogic TypeScript might serve as a front end for ShapeLogic Scala."]),
	m('p', ["The plan is to keep dependencies minimal, Mithril and Lodash. Both are included in this project"]),
	m('p', ["TypeScript seems great but it is was hard to get it running without Webpack, Browserify or Gulp"])
]
);
