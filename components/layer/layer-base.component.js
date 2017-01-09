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
var layer_service_1 = require("./layer.service");
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
    return LayerBaseComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LayerBaseComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], LayerBaseComponent.prototype, "zIndex", void 0);
LayerBaseComponent = __decorate([
    core_1.Component({
        selector: 'vcl-layer-base',
        templateUrl: 'layer-base.component.html',
        // changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            core_1.trigger('boxState', []),
            core_1.trigger('layerState', [])
        ]
    }),
    __metadata("design:paramtypes", [layer_service_1.LayerService, core_1.ChangeDetectorRef])
], LayerBaseComponent);
exports.LayerBaseComponent = LayerBaseComponent;
