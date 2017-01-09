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
var common_1 = require("@angular/common");
var layer_directive_1 = require("./layer.directive");
exports.LayerDirective = layer_directive_1.LayerDirective;
var layer_base_component_1 = require("./layer-base.component");
exports.LayerBaseComponent = layer_base_component_1.LayerBaseComponent;
var layer_service_1 = require("./layer.service");
exports.LayerService = layer_service_1.LayerService;
var off_click_module_1 = require("../../directives/off-click/off-click.module");
var wormhole_module_1 = require("../../directives/wormhole/wormhole.module");
var layer_references_1 = require("./layer.references");
exports.LayerDirectiveReference = layer_references_1.LayerDirectiveReference;
exports.LayerComponentReference = layer_references_1.LayerComponentReference;
function getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
}
var LAYER_BOOTSTRAP = {
    provide: core_1.APP_BOOTSTRAP_LISTENER,
    multi: true,
    deps: [wormhole_module_1.WormholeService],
    useFactory: function (wormholeService) {
        return function () {
            wormholeService.attachComponent(layer_base_component_1.LayerBaseComponent);
        };
    }
};
var VCLLayerModule = (function () {
    function VCLLayerModule() {
    }
    return VCLLayerModule;
}());
VCLLayerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, wormhole_module_1.VCLWormholeModule, off_click_module_1.VCLOffClickModule],
        exports: [layer_base_component_1.LayerBaseComponent, layer_directive_1.LayerDirective],
        declarations: [layer_base_component_1.LayerBaseComponent, layer_directive_1.LayerDirective],
        entryComponents: [layer_base_component_1.LayerBaseComponent],
        providers: [layer_service_1.LayerService, LAYER_BOOTSTRAP]
    }),
    __metadata("design:paramtypes", [])
], VCLLayerModule);
exports.VCLLayerModule = VCLLayerModule;
