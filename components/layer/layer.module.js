"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var off_click_module_1 = require("../../directives/off-click/off-click.module");
var wormhole_module_1 = require("../../directives/wormhole/wormhole.module");
var layer_directive_1 = require("./layer.directive");
exports.DirectiveLayerRef = layer_directive_1.DirectiveLayerRef;
var layer_component_1 = require("./layer.component");
exports.ComponentLayerRef = layer_component_1.ComponentLayerRef;
var layer_base_component_1 = require("./layer-base.component");
exports.LayerBaseComponent = layer_base_component_1.LayerBaseComponent;
var layer_service_1 = require("./layer.service");
exports.LayerService = layer_service_1.LayerService;
var layer_references_1 = require("./layer.references");
exports.LayerRef = layer_references_1.LayerRef;
var LAYER_BOOTSTRAP = [{
        provide: core_1.APP_BOOTSTRAP_LISTENER,
        multi: true,
        deps: [wormhole_module_1.WormholeService, layer_service_1.LayerService],
        useFactory: function (wormholeService) {
            return function () {
                wormholeService.attachComponent(layer_base_component_1.LayerBaseComponent);
            };
        }
    }];
var VCLLayerModule = VCLLayerModule_1 = (function () {
    function VCLLayerModule() {
    }
    VCLLayerModule.withConfig = function (config) {
        var layers = config.layers || [];
        return {
            ngModule: VCLLayerModule_1,
            providers: layers.concat([
                {
                    provide: core_1.APP_BOOTSTRAP_LISTENER,
                    multi: true,
                    deps: [layer_service_1.LayerService, core_1.Injector].concat(layers),
                    useFactory: function (layerService, injector) {
                        var layers = [];
                        for (var _i = 2; _i < arguments.length; _i++) {
                            layers[_i - 2] = arguments[_i];
                        }
                        return function () {
                            layers.forEach(function (layer) { return layer.initialize(layerService); });
                        };
                    }
                }
            ])
        };
    };
    return VCLLayerModule;
}());
VCLLayerModule = VCLLayerModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, wormhole_module_1.VCLWormholeModule, off_click_module_1.VCLOffClickModule],
        exports: [layer_base_component_1.LayerBaseComponent, layer_directive_1.DirectiveLayerRef],
        declarations: [layer_base_component_1.LayerBaseComponent, layer_directive_1.DirectiveLayerRef],
        entryComponents: [layer_base_component_1.LayerBaseComponent],
        providers: [
            layer_service_1.LayerService
        ].concat(LAYER_BOOTSTRAP, [
            {
                provide: layer_references_1.LayerRef,
                useValue: null
            }
        ])
    })
], VCLLayerModule);
exports.VCLLayerModule = VCLLayerModule;
var VCLLayerModule_1;
