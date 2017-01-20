"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/operator/filter");
require("rxjs/operator/map");
require("rxjs/operator/distinctUntilChanged");
var Subject_1 = require("rxjs/Subject");
var layer_references_1 = require("./layer.references");
var LayerService = (function () {
    function LayerService() {
        this.bases = [];
        this.visibleLayers = new Map();
        this.layers = new Map();
        this.layerChange = new Subject_1.Subject();
    }
    LayerService.prototype.layerChange$ = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.layerChange.filter(function (layer) { return layer.base === base; });
    };
    LayerService.prototype.visibleLayersChange$ = function (base) {
        var _this = this;
        if (base === void 0) { base = 'default'; }
        return this.layerChange.filter(function (layer) { return layer.base === base; })
            .map(function () { return _this.getVisibleLayers(base); })
            .distinctUntilChanged();
    };
    LayerService.prototype.getLayers = function (base) {
        if (base === void 0) { base = 'default'; }
        return Array.from(this.layers.keys()).filter(function (li) { return li.base === base; });
    };
    LayerService.prototype.getVisibleLayers = function (base) {
        if (base === void 0) { base = 'default'; }
        return (this.visibleLayers.get(base) || []).slice();
    };
    LayerService.prototype.hasVisibleLayers = function (base) {
        return this.getVisibleLayers(base).length > 0;
    };
    LayerService.prototype.closeAll = function (base) {
        this.getVisibleLayers(base).forEach(function (layer) { return layer.close(); });
    };
    LayerService.prototype.closeTop = function (base) {
        var layer = this.getVisibleLayers(base).pop();
        if (layer)
            layer.close();
    };
    LayerService.prototype.register = function (layerRef) {
        var _this = this;
        if (!(layerRef instanceof layer_references_1.LayerRef)) {
            throw 'Invalid layerRef';
        }
        this.layers.set(layerRef, layerRef.visible$.subscribe(function (visible) {
            var layerRefs = _this.visibleLayers.get(layerRef.base) || [];
            _this.visibleLayers.set(layerRef.base, visible ? layerRefs.concat([layerRef]) : layerRefs.filter(function (lr) { return lr !== layerRef; }));
            _this.layerChange.next(layerRef);
        }));
    };
    LayerService.prototype.unregister = function (layerRef) {
        layerRef.close();
        var sub = this.layers.get(layerRef);
        if (sub && !sub.closed) {
            sub.unsubscribe();
        }
        this.layers.delete(layerRef);
    };
    LayerService.prototype.registerBase = function (layerBase) {
        if (layerBase.name && this.bases.indexOf(layerBase.name) >= 0) {
            throw 'Duplicate vcl-layer-base: ' + layerBase.name;
        }
        this.bases.push(layerBase.name);
    };
    LayerService.prototype.unregisterBase = function (layerBase) {
        this.bases = this.bases.filter(function (base) { return base !== layerBase.name; });
    };
    LayerService.prototype.ngOnDestroy = function () {
        var _this = this;
        this.layers.forEach(function (sub, layerRef) { return _this.unregister(layerRef); });
    };
    return LayerService;
}());
LayerService = __decorate([
    core_1.Injectable()
], LayerService);
exports.LayerService = LayerService;
