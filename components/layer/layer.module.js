"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var layer_component_1 = require('./layer.component');
exports.LayerBaseComponent = layer_component_1.LayerBaseComponent;
exports.LayerDirective = layer_component_1.LayerDirective;
var layer_service_1 = require('./layer.service');
exports.LayerService = layer_service_1.LayerService;
var off_click_module_1 = require('../../directives/off-click/off-click.module');
var wormhole_module_1 = require('../../directives/wormhole/wormhole.module');
function getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
}
function bootstrapLayer(appRef, componentFactoryResolver, defaultInjector) {
    return function () {
        var layerBaseFactory = componentFactoryResolver.resolveComponentFactory(layer_component_1.LayerBaseComponent);
        var layerBaseRef = layerBaseFactory.create(defaultInjector);
        layerBaseRef.onDestroy(function () {
            appRef.detachView(layerBaseRef.hostView);
        });
        appRef.attachView(layerBaseRef.hostView);
        var rootComponents = appRef['_rootComponents'];
        var rootComponent = rootComponents.length && rootComponents[0];
        if (!rootComponent) {
            console.log('Root View Container not found');
            return;
        }
        var layerBaseRootNode = getComponentRootNode(layerBaseRef);
        var appComponentNode = getComponentRootNode(rootComponent);
        if (appComponentNode && layerBaseRef) {
            appComponentNode.appendChild(layerBaseRootNode);
        }
    };
}
var VCLLayerModule = (function () {
    function VCLLayerModule() {
    }
    VCLLayerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, wormhole_module_1.VCLWormholeModule, off_click_module_1.VCLOffClickModule],
                    exports: [layer_component_1.LayerBaseComponent, layer_component_1.LayerDirective],
                    declarations: [layer_component_1.LayerBaseComponent, layer_component_1.LayerDirective],
                    entryComponents: [layer_component_1.LayerBaseComponent],
                    providers: [
                        layer_service_1.LayerService,
                        {
                            provide: core_1.APP_BOOTSTRAP_LISTENER,
                            multi: true,
                            deps: [core_1.ApplicationRef, core_1.ComponentFactoryResolver, core_1.Injector],
                            useFactory: bootstrapLayer
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    VCLLayerModule.ctorParameters = function () { return []; };
    return VCLLayerModule;
}());
exports.VCLLayerModule = VCLLayerModule;
