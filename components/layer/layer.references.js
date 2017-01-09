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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
var wormhole_module_1 = require("./../../directives/wormhole/wormhole.module");
var layer_directive_1 = require("./layer.directive");
var LayerReference = (function (_super) {
    __extends(LayerReference, _super);
    function LayerReference(opts) {
        var _this = _super.call(this) || this;
        _this.stateChange = new Subject_1.Subject();
        _this.source = _this.stateChange.asObservable();
        _this.visible = false;
        _this.base = opts.base || 'default';
        _this.modal = !!opts.modal;
        _this.closeOnOffClick = !!opts.closeOnOffClick;
        _this.data = {};
        return _this;
    }
    LayerReference.prototype.open = function (data) {
        this.visible = true;
        this.data = data || {};
        this.wormhole = this.createWormhole();
        if (!this.results) {
            this.results = new Subject_1.Subject();
        }
        this.stateChange.next(this);
        return this.results.asObservable();
    };
    LayerReference.prototype.close = function (result) {
        this.visible = false;
        this.data = {};
        this.wormhole = null;
        if (this.results) {
            if (typeof result !== 'undefined') {
                this.results.next(result);
            }
            this.results.complete();
            this.results = null;
        }
        this.stateChange.next(this);
    };
    LayerReference.prototype.send = function (result) {
        if (result !== undefined && this.results) {
            this.results.next(result);
        }
    };
    return LayerReference;
}(Observable_1.Observable));
exports.LayerReference = LayerReference;
var LayerDirectiveReference = (function (_super) {
    __extends(LayerDirectiveReference, _super);
    function LayerDirectiveReference(opts, layer) {
        var _this = _super.call(this, opts) || this;
        _this.layer = layer;
        return _this;
    }
    LayerDirectiveReference.prototype.createWormhole = function () {
        return this.layer;
    };
    return LayerDirectiveReference;
}(LayerReference));
LayerDirectiveReference = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object, layer_directive_1.LayerDirective])
], LayerDirectiveReference);
exports.LayerDirectiveReference = LayerDirectiveReference;
var LayerComponentReference = LayerComponentReference_1 = (function (_super) {
    __extends(LayerComponentReference, _super);
    function LayerComponentReference(opts, defaultInjector, LayerClass) {
        var _this = _super.call(this, opts) || this;
        _this.defaultInjector = defaultInjector;
        _this.LayerClass = LayerClass;
        _this.injector = core_1.ReflectiveInjector.resolveAndCreate([{
                provide: LayerComponentReference_1,
                useValue: _this
            }], _this.defaultInjector);
        return _this;
    }
    LayerComponentReference.prototype.createWormhole = function () {
        if (this.wormhole instanceof wormhole_module_1.ComponentWormhole) {
            // Reuse existing wormhole and update data
            // Change detection is triggered within setData() 
            this.wormhole.setData(this.data);
            return this.wormhole;
        }
        return new wormhole_module_1.ComponentWormhole(this.LayerClass, { data: this.data, injector: this.injector });
    };
    return LayerComponentReference;
}(LayerReference));
LayerComponentReference = LayerComponentReference_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object, core_1.Injector, Object])
], LayerComponentReference);
exports.LayerComponentReference = LayerComponentReference;
var LayerComponentReference_1;
