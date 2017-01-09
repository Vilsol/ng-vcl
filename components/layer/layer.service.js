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
var Subject_1 = require("rxjs/Subject");
var layer_references_1 = require("./layer.references");
var LayerService = (function () {
    function LayerService(defaultInjector) {
        this.defaultInjector = defaultInjector;
        this.baseNameMap = new Map();
        this.layerDirectiveMap = new Map();
        // private layers = new Set<LayerReference>();
        this.layers = new Map();
        this.layersChange = new Subject_1.Subject();
    }
    LayerService.prototype.getVisibleLayersFor$ = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.layersChange.scan(function (layers, layerRef) {
            if (layerRef.visible) {
                return layers.concat([layerRef]);
            }
            else {
                return layers.filter(function (layer) { return layer !== layerRef; });
            }
        }, []);
    };
    LayerService.prototype.getLayersFor = function (base) {
        if (base === void 0) { base = 'default'; }
        return Array.from(this.layers.keys()).filter(function (li) { return li.base === base; });
    };
    LayerService.prototype.getVisibleLayersFor = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.getLayersFor(base).filter(function (layer) { return !!layer.visible; });
    };
    LayerService.prototype.hasVisibleLayers = function (base) {
        if (base === void 0) { base = 'default'; }
        return this.getLayersFor(base).some(function (layer) { return layer.visible; });
    };
    LayerService.prototype.closeAll = function (base) {
        if (base === void 0) { base = 'default'; }
        this.getVisibleLayersFor(base).forEach(function (layer) { return layer.close(); });
    };
    LayerService.prototype.closeTop = function (base) {
        if (base === void 0) { base = 'default'; }
        var layer = this.getVisibleLayersFor(base).slice(-1)[0];
        if (layer)
            layer.close();
    };
    LayerService.prototype.registerComponent = function (layer, opts) {
        if (opts === void 0) { opts = {}; }
        var layerRef = new layer_references_1.LayerComponentReference(opts, this.defaultInjector, layer);
        this.registerReference(layerRef);
        return layerRef;
    };
    LayerService.prototype.registerDirective = function (layer, opts) {
        if (opts === void 0) { opts = {}; }
        var layerRef = new layer_references_1.LayerDirectiveReference(opts, layer);
        this.layerDirectiveMap.set(layer, layerRef);
        this.registerReference(layerRef);
        return layerRef;
    };
    LayerService.prototype.registerReference = function (layerRef) {
        var _this = this;
        this.layers.set(layerRef, layerRef.subscribe(function (layerRef) {
            _this.layersChange.next(layerRef);
        }));
    };
    LayerService.prototype.disposeReference = function (layerRef) {
        var sub = this.layers.get(layerRef);
        if (sub && !sub.closed) {
            sub.unsubscribe();
        }
        this.layers.delete(layerRef);
    };
    LayerService.prototype.unregisterDirective = function (layer) {
        var layerRef = this.layerDirectiveMap.get(layer);
        if (layerRef) {
            layerRef.close();
            this.layers.delete(layerRef);
            this.layerDirectiveMap.delete(layer);
            this.disposeReference(layerRef);
        }
    };
    LayerService.prototype.registerBase = function (layerBase, opts) {
        if (opts === void 0) { opts = {}; }
        if (layerBase.name && this.baseNameMap.has(layerBase.name)) {
            throw 'Duplicate vcl-layer-base: ' + layerBase.name;
        }
        this.baseNameMap.set(layerBase.name, layerBase);
    };
    LayerService.prototype.unregisterBase = function (layerBase) {
        this.baseNameMap.delete(layerBase.name);
    };
    LayerService.prototype.ngOnDestroy = function () {
        this.layerDirectiveMap.clear();
        this.layers.forEach(function (sub) {
            if (sub && !sub.closed) {
                sub.unsubscribe();
            }
        });
        this.layers.clear();
    };
    return LayerService;
}());
LayerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Injector])
], LayerService);
exports.LayerService = LayerService;
