# ShapeLogic TypeScript

An exploration of TypeScript's suitability for computer vision.

TypeScript might not be the right technology for computer vision. It is often done in C++, Python or MatLab.

## Goals for ShapeLogic TypeScript

* ShapeLogic TypeScript might serve as a front end for ShapeLogic Scala
* Compare TypeScript and Scala for ease of doing computer vision work
* See how well WebGL works for image processing
* Investigate JavaScript machine learning libraries

## WebGL for Image Processing

* WebGL seems like a good way to do fast image processing. 
* There might be problem with browser compatibility.

## JavaScript Transpiler Problems

JavaScript has become the most popular programming language and Node provides a strong eco system. It is alarming to see that over 10,000 files are installed when doing a hello world example using TypeScript and a bundler like Webpack or Browserify.

## Minimal Dependencies

Most browsers are close to 100% ES6 / ES2015 completeness. 

ShapeLogic TypeScript's focus is on simplicity and minimal dependencies, not on transpiling to ES5 to work in more browsers.

# Dependencies

* **Mithril** minimal virtual dom
* **Lodash** missing functions 

## TypeScript, Node, Mithril Starter Project Without Webpack

TypeScript seems great but it is was hard to get it running without Webpack, Browserify or Gulp.

ShapeLogic TypeScript serves as a TypeScript, Node, Mithril starter project without webpack.

The project works with IntelliSense in Visual Studio Code.

## Status

ShapeLogic TypeScript is currently only useful as starter project.

# Problems and Limitations

## Problems with Cross Origin Images

You cannot do image operations on cross origin images:

https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html

You can capture images from video if user gives permission.
