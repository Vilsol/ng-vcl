"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var core_1 = require('@angular/core');
var wormhole_1 = require('./../../directives/wormhole/wormhole');
var layer_service_1 = require('./layer.service');
var LayerDirective = (function (_super) {
    __extends(LayerDirective, _super);
    function LayerDirective(templateRef, elementRef, layerService) {
        _super.call(this, templateRef);
        this.templateRef = templateRef;
        this.elementRef = elementRef;
        this.layerService = layerService;
        this.visibilityChange$ = new core_1.EventEmitter();
        this.modal = true;
        this.closeOnOffClick = true;
        this.base = 'default';
        this.data = {};
        this.visible = false;
    }
    Object.defineProperty(LayerDirective.prototype, "visibilityChange", {
        get: function () {
            return this.visibilityChange$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerDirective.prototype, "state", {
        get: function () {
            return this.visible ? 'open' : 'closed';
        },
        enumerable: true,
        configurable: true
    });
    LayerDirective.prototype.ngOnInit = function () {
        this.layerService.register(this);
    };
    LayerDirective.prototype.ngOnDestroy = function () {
        this.layerService.unregister(this);
    };
    LayerDirective.prototype.offClick = function () {
        // allow offlick only on non-modal layers
        var allowOffClick = !this.modal && this.closeOnOffClick;
        if (allowOffClick) {
            this.close();
        }
    };
    LayerDirective.prototype.toggle = function () {
        this.visible = !this.visible;
        this.visibilityChange$.emit(this.visible);
    };
    LayerDirective.prototype.open = function (data) {
        if (!this._instanceResults) {
            this._instanceResults = new Subject_1.Subject();
        }
        if (typeof data === 'object' && data) {
            this.data = data;
        }
        if (!this.visible) {
            this.visible = true;
            this.visibilityChange$.emit(this.visible);
        }
        return this._instanceResults.asObservable();
    };
    LayerDirective.prototype.send = function (result) {
        if (result !== undefined && this._instanceResults) {
            this._instanceResults.next(result);
        }
    };
    LayerDirective.prototype.close = function (result) {
        this.data = {};
        if (result !== undefined && this._instanceResults) {
            this._instanceResults.next(result);
            this._instanceResults.complete();
            this._instanceResults = null;
        }
        if (this.visible) {
            this.visible = false;
            this.visibilityChange$.emit(this.visible);
        }
    };
    LayerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vcl-layer]',
                    exportAs: 'layer',
                },] },
    ];
    /** @nocollapse */
    LayerDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: core_1.ElementRef, },
        { type: layer_service_1.LayerService, },
    ]; };
    LayerDirective.propDecorators = {
        'visibilityChange': [{ type: core_1.Output },],
        'modal': [{ type: core_1.Input },],
        'closeOnOffClick': [{ type: core_1.Input },],
        'name': [{ type: core_1.Input },],
        'base': [{ type: core_1.Input },],
    };
    return LayerDirective;
}(wormhole_1.TemplateWormhole));
exports.LayerDirective = LayerDirective;
var LayerBaseComponent = (function () {
    function LayerBaseComponent(layerService) {
        this.layerService = layerService;
        this.visibleLayers = [];
        this.name = 'default';
        this.zIndex = 1000;
    }
    LayerBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layerService.registerBase(this);
        this.sub = this.layerService.visibleLayersFor(this.name).subscribe(function (visibleLayers) {
            _this.visibleLayers = visibleLayers;
        });
    };
    LayerBaseComponent.prototype.ngOnDestroy = function () {
        this.layerService.unregisterBase(this);
        this.visibleLayers.forEach(function (layer) { return layer.close(); });
        if (this.sub && !this.sub.closed) {
            this.sub.unsubscribe();
        }
    };
    LayerBaseComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-layer-base',
                    templateUrl: 'layer-base.component.html',
                    animations: [
                        core_1.trigger('boxState', []),
                        core_1.trigger('layerState', [])
                    ]
                },] },
    ];
    /** @nocollapse */
    LayerBaseComponent.ctorParameters = function () { return [
        { type: layer_service_1.LayerService, },
    ]; };
    LayerBaseComponent.propDecorators = {
        'name': [{ type: core_1.Input },],
        'zIndex': [{ type: core_1.Input },],
    };
    return LayerBaseComponent;
}());
exports.LayerBaseComponent = LayerBaseComponent;
