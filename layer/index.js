var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Inject, Injectable, Injector, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCLWormholeModule } from '../wormhole/index';
import { defineMetadata, getMetadata } from './../core/index';
import { LayerManagerService } from './layer-manager.service';
import { LayerService } from './layer.service';
import { LayerRef, DynamicLayerRef, LayerResult } from './layer-ref';
import { LayerContainerComponent, COMPONENT_LAYER_ANNOTATION_ID, LAYER_ANIMATIONS } from './layer-container.component';
import { LayerRefDirective } from './layer-ref.directive';
export { LayerRefDirective, LayerRef, LayerService, LayerContainerComponent, DynamicLayerRef, LAYER_ANIMATIONS, LayerResult };
export var LAYERS = new OpaqueToken('@ng-vcl/ng-vcl#layers');
// The @Layer annotation
export function Layer(component, opts) {
    return function (target) {
        Injectable()(target);
        defineMetadata(COMPONENT_LAYER_ANNOTATION_ID, { component: component, opts: opts }, target);
    };
}
var VCLLayerModule = (function () {
    function VCLLayerModule(layers, layerManager, injector) {
        this.layers = layers;
        this.layerManager = layerManager;
        this.injector = injector;
        if (layers) {
            (layers || []).forEach(function (layerCls) {
                var layerMeta = getMetadata(COMPONENT_LAYER_ANNOTATION_ID, layerCls);
                var layerRef = injector.get(layerCls);
                layerManager._register(layerRef, layerMeta.component, injector, layerMeta.opts);
            });
        }
    }
    VCLLayerModule_1 = VCLLayerModule;
    VCLLayerModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return { ngModule: VCLLayerModule_1, providers: [
                LayerService,
                LayerManagerService
            ].concat((config.layers || []), [
                {
                    provide: LayerRef,
                    useValue: null
                },
                {
                    provide: LAYERS,
                    useValue: config.layers
                }
            ]) };
    };
    VCLLayerModule.forChild = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: VCLLayerModule_1,
            providers: [
                LayerService
            ].concat((config.layers || []), [
                {
                    provide: LAYERS,
                    useValue: config.layers
                }
            ])
        };
    };
    VCLLayerModule = VCLLayerModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                VCLWormholeModule
            ],
            exports: [LayerRefDirective, LayerContainerComponent],
            declarations: [LayerRefDirective, LayerContainerComponent],
            entryComponents: [LayerContainerComponent],
            providers: []
        }),
        __param(0, Inject(LAYERS)),
        __metadata("design:paramtypes", [Array, LayerManagerService,
            Injector])
    ], VCLLayerModule);
    return VCLLayerModule;
    var VCLLayerModule_1;
}());
export { VCLLayerModule };
