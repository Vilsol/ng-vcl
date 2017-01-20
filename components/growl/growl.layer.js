"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var layer_module_1 = require("./../layer/layer.module");
var growl_component_1 = require("./growl.component");
var GrowlLayer = (function (_super) {
    __extends(GrowlLayer, _super);
    function GrowlLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.component = growl_component_1.GrowlComponent;
        _this.transparent = true;
        _this.offClickClose = false;
        _this.growls = [];
        return _this;
    }
    GrowlLayer.prototype.add = function (growl) {
        var _this = this;
        growl.subscribe(function () {
            _this.remove(growl);
        });
        this.growls = this.reverse ? [growl].concat(this.growls) : this.growls.concat([growl]);
        this.open({ growls: this.growls });
        return growl;
    };
    GrowlLayer.prototype.remove = function (growl) {
        this.growls = this.growls.filter(function (g) { return g !== growl; });
        if (this.growls.length === 0) {
            this.close();
        }
        else {
            this.open({ growls: this.growls });
        }
    };
    return GrowlLayer;
}(layer_module_1.ComponentLayerRef));
exports.GrowlLayer = GrowlLayer;
var GrowlLayerTopRight = (function (_super) {
    __extends(GrowlLayerTopRight, _super);
    function GrowlLayerTopRight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlTopRight';
        _this.reverse = true;
        return _this;
    }
    return GrowlLayerTopRight;
}(GrowlLayer));
GrowlLayerTopRight = __decorate([
    core_1.Injectable()
], GrowlLayerTopRight);
exports.GrowlLayerTopRight = GrowlLayerTopRight;
;
var GrowlLayerTop = (function (_super) {
    __extends(GrowlLayerTop, _super);
    function GrowlLayerTop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlTop';
        _this.reverse = true;
        return _this;
    }
    return GrowlLayerTop;
}(GrowlLayer));
GrowlLayerTop = __decorate([
    core_1.Injectable()
], GrowlLayerTop);
exports.GrowlLayerTop = GrowlLayerTop;
;
var GrowlLayerTopLeft = (function (_super) {
    __extends(GrowlLayerTopLeft, _super);
    function GrowlLayerTopLeft() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlTopLeft';
        _this.reverse = true;
        return _this;
    }
    return GrowlLayerTopLeft;
}(GrowlLayer));
GrowlLayerTopLeft = __decorate([
    core_1.Injectable()
], GrowlLayerTopLeft);
exports.GrowlLayerTopLeft = GrowlLayerTopLeft;
;
var GrowlLayerBottomRight = (function (_super) {
    __extends(GrowlLayerBottomRight, _super);
    function GrowlLayerBottomRight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlBottomRight';
        _this.reverse = false;
        return _this;
    }
    return GrowlLayerBottomRight;
}(GrowlLayer));
GrowlLayerBottomRight = __decorate([
    core_1.Injectable()
], GrowlLayerBottomRight);
exports.GrowlLayerBottomRight = GrowlLayerBottomRight;
;
var GrowlLayerBottom = (function (_super) {
    __extends(GrowlLayerBottom, _super);
    function GrowlLayerBottom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlBottom';
        _this.reverse = false;
        return _this;
    }
    return GrowlLayerBottom;
}(GrowlLayer));
GrowlLayerBottom = __decorate([
    core_1.Injectable()
], GrowlLayerBottom);
exports.GrowlLayerBottom = GrowlLayerBottom;
;
var GrowlLayerBottomLeft = (function (_super) {
    __extends(GrowlLayerBottomLeft, _super);
    function GrowlLayerBottomLeft() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customClass = 'vclLayerGrowlBottomLeft';
        _this.reverse = false;
        return _this;
    }
    return GrowlLayerBottomLeft;
}(GrowlLayer));
GrowlLayerBottomLeft = __decorate([
    core_1.Injectable()
], GrowlLayerBottomLeft);
exports.GrowlLayerBottomLeft = GrowlLayerBottomLeft;
;
