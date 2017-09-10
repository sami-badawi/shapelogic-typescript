# ShapeLogic TypeScript

TypeScript combined with WebGL seems like a good fit for computer vision. Explor how well it works.

Rudimentary live version of ShapeLogic TypeScript here
https://shapelogic-typescript.org/

## Practical Goals for ShapeLogic TypeScript

* Implement some standard image processing algorithms in WebGL
* Port some more complex algorithms from ShapeLogic Scala e.g. vectorization
* Make a GUI that is written in TypeScript living in the browser

## Abstract Goals for ShapeLogic TypeScript

* Compare TypeScript and Scala for ease of doing computer vision work
* See how well WebGL works for image processing
* Investigate JavaScript machine learning libraries

## WebGL for Image Processing

* WebGL seems like a good way to do fast image processing. 
* There might be problem with browser compatibility.

# Dependencies

* **Mithril** minimal virtual dom
* **Lodash** missing functions 
* **Node** for building and dependencies
* **Webpack** for bundeling of ES6 modules to one file. It is heavy but it works


## Status Pre alpha

* There is a live version on https://shapelogic-typescript.org/
* The project builds with IntelliSense in Visual Studio Code
* All parts are included
* WebGL code is working

# Problems and Limitations

## Problems with Cross Origin Images

You cannot do image operations on cross origin images:

https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html

You can capture images from video if user gives permission.
