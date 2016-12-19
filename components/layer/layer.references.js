"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
var wormhole_module_1 = require('./../../directives/wormhole/wormhole.module');
var layer_directive_1 = require('./layer.directive');
var LayerReference = (function (_super) {
    __extends(LayerReference, _super);
    function LayerReference(opts) {
        _super.call(this);
        this.stateChange = new Subject_1.Subject();
        this.source = this.stateChange.asObservable();
        this.visible = false;
        this.base = opts.base || 'default';
        this.modal = !!opts.modal;
        this.closeOnOffClick = !!opts.closeOnOffClick;
        this.data = {};
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
        if (typeof result !== 'undefined') {
            this.results.next(result);
        }
        this.results.complete();
        this.results = null;
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
        _super.call(this, opts);
        this.layer = layer;
    }
    LayerDirectiveReference.prototype.createWormhole = function () {
        return this.layer;
    };
    LayerDirectiveReference.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LayerDirectiveReference.ctorParameters = function () { return [
        null,
        { type: layer_directive_1.LayerDirective, },
    ]; };
    return LayerDirectiveReference;
}(LayerReference));
exports.LayerDirectiveReference = LayerDirectiveReference;
var LayerComponentReference = (function (_super) {
    __extends(LayerComponentReference, _super);
    function LayerComponentReference(opts, defaultInjector, LayerClass) {
        _super.call(this, opts);
        this.defaultInjector = defaultInjector;
        this.LayerClass = LayerClass;
        this.injector = core_1.ReflectiveInjector.resolveAndCreate([{
                provide: LayerComponentReference,
                useValue: this
            }], this.defaultInjector);
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
    LayerComponentReference.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LayerComponentReference.ctorParameters = function () { return [
        null,
        { type: core_1.Injector, },
        null,
    ]; };
    return LayerComponentReference;
}(LayerReference));
exports.LayerComponentReference = LayerComponentReference;
