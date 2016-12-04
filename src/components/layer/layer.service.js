"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
;
var LayerService = (function () {
    function LayerService() {
        this.layerNameMap = new Map();
        this.layerMap = new Map();
        this.visibleLayers = {};
        this._visibleLayers = new BehaviorSubject_1.BehaviorSubject(this.visibleLayers);
    }
    LayerService.prototype.visibleLayersFor = function (base) {
        if (base === void 0) { base = 'default'; }
        return this._visibleLayers.asObservable().map(function (layers) { return layers[base] || []; }).distinctUntilChanged();
    };
    LayerService.prototype.getVisibleLayers = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.visibleLayers[base] || [];
    };
    LayerService.prototype.hasVisibleLayers = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.getVisibleLayers(base).length > 0;
    };
    LayerService.prototype.closeAll = function (base) {
        if (base === void 0) { base = 'default'; }
        this.getVisibleLayers(base).forEach(function (layer) { return layer.close(); });
    };
    LayerService.prototype.closeTop = function (base) {
        if (base === void 0) { base = 'default'; }
        var layer = this.getVisibleLayers(base).slice(-1)[0];
        if (layer)
            layer.close();
    };
    LayerService.prototype.open = function (layerName, data) {
        if (this.layerNameMap.has(layerName)) {
            return this.layerNameMap.get(layerName).open(data);
        }
        else {
            return Observable_1.Observable.throw('Layer not found: ' + layerName);
        }
    };
    LayerService.prototype.close = function (layerName) {
        if (this.layerNameMap.has(layerName)) {
            this.layerNameMap.get(layerName).close();
        }
    };
    LayerService.prototype.register = function (layer) {
        var _this = this;
        if (layer.name && this.layerNameMap.has(layer.name)) {
            throw 'Duplicate layer name: ' + layer.name;
        }
        this.layerMap.set(layer, layer.visibilityChange$.subscribe(function () {
            if (!_this.visibleLayers[layer.base]) {
                _this.visibleLayers[layer.base] = [];
            }
            if (layer.visible) {
                _this.visibleLayers[layer.base] = _this.visibleLayers[layer.base].concat([layer]);
            }
            else {
                _this.visibleLayers[layer.base] = _this.visibleLayers[layer.base].filter(function (l) { return layer !== l; });
            }
            _this._visibleLayers.next(_this.visibleLayers);
        }));
        if (layer.name) {
            this.layerNameMap.set(layer.name, layer);
        }
    };
    LayerService.prototype.unregister = function (layer) {
        layer.close();
        if (layer.name) {
            this.layerNameMap.delete(layer.name);
        }
        var sub = this.layerMap.get(layer);
        if (sub && !sub.closed) {
            sub.unsubscribe();
        }
        this.layerMap.delete(layer);
    };
    LayerService.prototype.ngOnDestroy = function () {
        this.layerMap.forEach(function (sub) {
            if (sub && !sub.closed) {
                sub.unsubscribe();
            }
        });
        this.layerMap.clear();
        this.layerNameMap.clear();
    };
    LayerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LayerService.ctorParameters = [];
    return LayerService;
}());
exports.LayerService = LayerService;
