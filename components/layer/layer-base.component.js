"use strict";
var core_1 = require('@angular/core');
var layer_service_1 = require('./layer.service');
var LayerBaseComponent = (function () {
    function LayerBaseComponent(layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        this.name = 'default';
        this.zIndex = 1000;
    }
    LayerBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layerService.registerBase(this);
        this.sub = this.layerService.getVisibleLayersFor$(this.name).subscribe(function (layerRefs) {
            _this.layerRefs = layerRefs;
            _this.cdRef.detectChanges();
        });
    };
    LayerBaseComponent.prototype.ngOnDestroy = function () {
        this.layerService.unregisterBase(this);
        this.layerRefs.forEach(function (layer) { return layer.close(); });
        if (this.sub && !this.sub.closed) {
            this.sub.unsubscribe();
        }
    };
    LayerBaseComponent.prototype.offClick = function (layerRef) {
        if (!layerRef.modal && layerRef.closeOnOffClick) {
            layerRef.close();
        }
    };
    LayerBaseComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-layer-base',
                    templateUrl: 'layer-base.component.html',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        core_1.trigger('boxState', []),
                        core_1.trigger('layerState', [])
                    ]
                },] },
    ];
    /** @nocollapse */
    LayerBaseComponent.ctorParameters = function () { return [
        { type: layer_service_1.LayerService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    LayerBaseComponent.propDecorators = {
        'name': [{ type: core_1.Input },],
        'zIndex': [{ type: core_1.Input },],
    };
    return LayerBaseComponent;
}());
exports.LayerBaseComponent = LayerBaseComponent;
