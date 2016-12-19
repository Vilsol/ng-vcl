"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var wormhole_module_1 = require('./../../directives/wormhole/wormhole.module');
var layer_service_1 = require('./layer.service');
var LayerDirective = (function (_super) {
    __extends(LayerDirective, _super);
    function LayerDirective(templateRef, elementRef, layerService) {
        _super.call(this, templateRef);
        this.templateRef = templateRef;
        this.elementRef = elementRef;
        this.layerService = layerService;
        this.modal = true;
        this.closeOnOffClick = true;
        this.base = 'default';
    }
    LayerDirective.prototype.ngOnInit = function () {
        this.layerRef = this.layerService.registerDirective(this, {
            base: this.base,
            closeOnOffClick: !!this.closeOnOffClick,
            modal: !!this.modal
        });
    };
    LayerDirective.prototype.ngOnDestroy = function () {
        this.layerService.unregisterDirective(this);
    };
    LayerDirective.prototype.open = function (data) {
        return this.layerRef.open(data);
    };
    LayerDirective.prototype.send = function (result) {
        this.layerRef.send(result);
    };
    LayerDirective.prototype.close = function (result) {
        this.layerRef.close();
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
        'modal': [{ type: core_1.Input },],
        'closeOnOffClick': [{ type: core_1.Input },],
        'base': [{ type: core_1.Input },],
    };
    return LayerDirective;
}(wormhole_module_1.TemplateWormhole));
exports.LayerDirective = LayerDirective;
