# ShapeLogic TypeScript

TypeScript combined with WebGL seems like a good fit for computer vision. Explor how well it works.

## Goals for ShapeLogic TypeScript

* ShapeLogic TypeScript might serve as a computer vision front end
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

* The project builds with IntelliSense in Visual Studio Code
* All parts are included
* WebGL code is working

# Problems and Limitations

## Problems with Cross Origin Images

You cannot do image operations on cross origin images:

https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html

You can capture images from video if user gives permission.
