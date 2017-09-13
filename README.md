# ShapeLogic TypeScript

TypeScript combined with WebGL seems like a good fit for computer vision.

You can try a simple early version of [ShapeLogic TypeScript here](https://shapelogic-typescript.org/)

## Implemented Image Processing Algorithms

So far a few simple image processing algorithms has been implemented:

* Edge detection
* Inverse color
* Color threshold
* Channel selector
* Channel swappers

First impression is that it has been easy to implement those in WebGL.

## Goals for ShapeLogic TypeScript

* Implement some more standard image processing algorithms in WebGL
* Port some more complex algorithms from [ShapeLogic Scala](http://shapelogicscala.org/) e.g. vectorization
* Make a GUI that is written in TypeScript living in the browser
* Compare TypeScript and Scala for ease of doing computer vision work
* See how well WebGL works for image processing
* Investigate JavaScript machine learning libraries

# Dependencies

* **Mithril** minimal virtual dom
* **Lodash** missing functions
* **Node** for building and dependencies
* **TWGL** will probably be added for WebGL
* **Webpack** for bundeling of ES6 modules to one file. It is heavy but it works

## Status Alpha

* There is an early live version of [ShapeLogic TypeScript here](https://shapelogic-typescript.org/)
* The project builds with IntelliSense in Visual Studio Code
* All parts are included
* WebGL code is working

# Problems and Limitations

## Problems with Cross Origin Images

You cannot do image operations on cross origin images:

https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html

You can capture images from video if user gives permission.
