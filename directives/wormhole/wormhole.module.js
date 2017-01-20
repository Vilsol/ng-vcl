"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var wormhole_1 = require("./wormhole");
exports.TemplateWormhole = wormhole_1.TemplateWormhole;
exports.ComponentWormhole = wormhole_1.ComponentWormhole;
exports.ConnectWormholeDirective = wormhole_1.ConnectWormholeDirective;
exports.Wormhole = wormhole_1.Wormhole;
var wormhole_service_1 = require("./wormhole.service");
exports.WormholeService = wormhole_service_1.WormholeService;
var VCLWormholeModule = VCLWormholeModule_1 = (function () {
    function VCLWormholeModule() {
    }
    VCLWormholeModule.withRootComponents = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        return {
            ngModule: VCLWormholeModule_1,
            providers: [
                {
                    provide: core_1.APP_BOOTSTRAP_LISTENER,
                    multi: true,
                    deps: [wormhole_service_1.WormholeService],
                    useFactory: function (wormholeService) {
                        return function () {
                            components.forEach(function (lc) { return wormholeService.attachComponent(lc); });
                        };
                    }
                }
            ]
        };
    };
    return VCLWormholeModule;
}());
VCLWormholeModule = VCLWormholeModule_1 = __decorate([
    core_1.NgModule({
        exports: [wormhole_1.ConnectWormholeDirective, wormhole_1.TemplateWormhole],
        declarations: [wormhole_1.ConnectWormholeDirective, wormhole_1.TemplateWormhole],
        providers: [
            wormhole_service_1.WormholeService,
            {
                provide: core_1.APP_BOOTSTRAP_LISTENER,
                multi: true,
                deps: [wormhole_service_1.WormholeService],
                useFactory: function (wormholeService) {
                    return function () {
                        wormholeService.ready();
                    };
                }
            }
        ]
    })
], VCLWormholeModule);
exports.VCLWormholeModule = VCLWormholeModule;
var VCLWormholeModule_1;
