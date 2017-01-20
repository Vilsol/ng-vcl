"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@angular/core");
var wormhole_module_1 = require("./../../directives/wormhole/wormhole.module");
var layer_references_1 = require("./layer.references");
var LayerComponentWormhole = (function (_super) {
    __extends(LayerComponentWormhole, _super);
    function LayerComponentWormhole(layerRef, componentClass, data) {
        var _this = _super.call(this, componentClass, data) || this;
        _this.layerRef = layerRef;
        return _this;
    }
    LayerComponentWormhole.prototype.createInjector = function () {
        var injector = _super.prototype.createInjector.call(this);
        // The created injector injects this instance as LayerRef
        // It is used in the component instance created within the wormhole
        return core_1.ReflectiveInjector.resolveAndCreate([{
                provide: layer_references_1.LayerRef,
                useValue: this.layerRef
            }], injector);
    };
    return LayerComponentWormhole;
}(wormhole_module_1.ComponentWormhole));
var ComponentLayerRef = (function (_super) {
    __extends(ComponentLayerRef, _super);
    function ComponentLayerRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentLayerRef.prototype.initialize = function (layerService) {
        layerService.register(this);
    };
    ComponentLayerRef.prototype.setData = function (data) {
        // Update wormhole data
        // Change detection is triggered within setData()
        this.wormhole.setData(data);
    };
    Object.defineProperty(ComponentLayerRef.prototype, "instance", {
        get: function () {
            return this.visible ? this.wormhole.compRef.instance : null;
        },
        enumerable: true,
        configurable: true
    });
    ComponentLayerRef.prototype.createWormhole = function (data) {
        return new LayerComponentWormhole(this, this.component, data);
    };
    return ComponentLayerRef;
}(layer_references_1.LayerRef));
exports.ComponentLayerRef = ComponentLayerRef;
