"use strict";
var core_1 = require("@angular/core");
function defineMetadata(key, value, target) {
    Reflect.defineMetadata(key, value, target);
}
exports.defineMetadata = defineMetadata;
function getMetadata(key, target) {
    return Reflect.getMetadata(key, target);
}
exports.getMetadata = getMetadata;
function setAnnotation(cls, key, value) {
    var annotation = getAnnotation(cls);
    // Change metadata
    annotation[key] = value;
    // Set metadata
    Reflect.defineMetadata('annotations', [new core_1.Component(annotation)], cls);
}
exports.setAnnotation = setAnnotation;
function getAnnotation(cls) {
    // Annotation is an array with 1 entry
    // TODO: Check if always one entry
    var clsAnnotations = Reflect.getMetadata('annotations', cls);
    if (!clsAnnotations && clsAnnotations.length < 1) {
        throw new Error('Invalid base class');
    }
    return clsAnnotations[0];
}
exports.getAnnotation = getAnnotation;
function setAnimations(cls, animations) {
    setAnnotation(cls, 'animations', animations);
}
exports.setAnimations = setAnimations;
