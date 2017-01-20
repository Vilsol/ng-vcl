"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var types_1 = require("./types");
var growl_1 = require("./growl");
var growl_layer_1 = require("./growl.layer");
var GrowlService = (function () {
    function GrowlService(growlLayerTopRightRef, growlLayerBottomRightRef, growlLayerBottomRef, growlLayerBottomLeftRef, growlLayerTopLeftRef, growlLayerTopRef) {
        this.growlLayerTopRightRef = growlLayerTopRightRef;
        this.growlLayerBottomRightRef = growlLayerBottomRightRef;
        this.growlLayerBottomRef = growlLayerBottomRef;
        this.growlLayerBottomLeftRef = growlLayerBottomLeftRef;
        this.growlLayerTopLeftRef = growlLayerTopLeftRef;
        this.growlLayerTopRef = growlLayerTopRef;
    }
    GrowlService.prototype.growl = function (text, opts) {
        return this.queue({ text: text }, opts);
    };
    GrowlService.prototype.info = function (text, opts) {
        return this.queue({ text: text, type: types_1.GrowlType.Info }, opts);
    };
    GrowlService.prototype.success = function (text, opts) {
        return this.queue({ text: text, type: types_1.GrowlType.Success }, opts);
    };
    GrowlService.prototype.warning = function (text, opts) {
        return this.queue({ text: text, type: types_1.GrowlType.Warning }, opts);
    };
    GrowlService.prototype.error = function (text, opts) {
        return this.queue({ text: text, type: types_1.GrowlType.Error }, opts);
    };
    GrowlService.prototype.queue = function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        var growlOpts = Object.assign.apply(Object, [{}, types_1.GROWL_DEFAULTS].concat(opts));
        var growl = new growl_1.Growl(growlOpts);
        if (growlOpts.position === types_1.GrowlPosition.TopRight) {
            this.growlLayerTopRightRef.add(growl);
        }
        else if (growlOpts.position === types_1.GrowlPosition.BottomRight) {
            this.growlLayerBottomRightRef.add(growl);
        }
        else if (growlOpts.position === types_1.GrowlPosition.Bottom) {
            this.growlLayerBottomRef.add(growl);
        }
        else if (growlOpts.position === types_1.GrowlPosition.BottomLeft) {
            this.growlLayerBottomLeftRef.add(growl);
        }
        else if (growlOpts.position === types_1.GrowlPosition.TopLeft) {
            this.growlLayerTopLeftRef.add(growl);
        }
        else if (growlOpts.position === types_1.GrowlPosition.Top) {
            this.growlLayerTopRef.add(growl);
        }
        else {
            this.growlLayerTopRightRef.add(growl);
        }
        return growl;
    };
    return GrowlService;
}());
GrowlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [growl_layer_1.GrowlLayerTopRight,
        growl_layer_1.GrowlLayerBottomRight,
        growl_layer_1.GrowlLayerBottom,
        growl_layer_1.GrowlLayerBottomLeft,
        growl_layer_1.GrowlLayerTopLeft,
        growl_layer_1.GrowlLayerTop])
], GrowlService);
exports.GrowlService = GrowlService;
