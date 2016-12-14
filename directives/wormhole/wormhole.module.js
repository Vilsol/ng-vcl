"use strict";
var core_1 = require('@angular/core');
var wormhole_1 = require('./wormhole');
exports.TemplateWormhole = wormhole_1.TemplateWormhole;
exports.ComponentWormhole = wormhole_1.ComponentWormhole;
exports.ConnectWormholeDirective = wormhole_1.ConnectWormholeDirective;
exports.Wormhole = wormhole_1.Wormhole;
var wormhole_service_1 = require('./wormhole.service');
exports.WormholeService = wormhole_service_1.WormholeService;
var VCLWormholeModule = (function () {
    function VCLWormholeModule() {
    }
    VCLWormholeModule.withRootComponents = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i - 0] = arguments[_i];
        }
        return {
            ngModule: VCLWormholeModule,
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
    VCLWormholeModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    VCLWormholeModule.ctorParameters = function () { return []; };
    return VCLWormholeModule;
}());
exports.VCLWormholeModule = VCLWormholeModule;
