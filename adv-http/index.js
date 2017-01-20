"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var adv_http_service_1 = require("./adv-http.service");
__export(require("./adv-http.service"));
var AdvHttpModule = AdvHttpModule_1 = (function () {
    function AdvHttpModule() {
    }
    AdvHttpModule.forRoot = function (config) {
        return {
            ngModule: AdvHttpModule_1,
            providers: [
                {
                    provide: adv_http_service_1.ADV_HTTP_CONFIG,
                    useValue: config
                },
                adv_http_service_1.AdvHttp,
                {
                    provide: adv_http_service_1.ErrorHandlerService,
                    useClass: config.errorHandlerService || adv_http_service_1.ErrorHandlerService
                },
                {
                    provide: adv_http_service_1.AdvHttp,
                    useClass: adv_http_service_1.AdvHttp,
                    // useFactory: (config: any, errorHandler: ErrorHandlerService, backend: XHRBackend, defaultOptions: RequestOptions) => {
                    //   return new AdvHttp(config, errorHandler, backend, defaultOptions);
                    // },
                    deps: [adv_http_service_1.ADV_HTTP_CONFIG, adv_http_service_1.ErrorHandlerService, http_1.XHRBackend, http_1.RequestOptions]
                },
            ]
        };
    };
    return AdvHttpModule;
}());
AdvHttpModule = AdvHttpModule_1 = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule],
        providers: [
            {
                provide: adv_http_service_1.ADV_HTTP_CONFIG,
                useValue: {}
            },
            adv_http_service_1.AdvHttp,
            {
                provide: adv_http_service_1.ErrorHandlerService,
                useClass: adv_http_service_1.ErrorHandlerService
            },
            {
                provide: adv_http_service_1.AdvHttp,
                useClass: adv_http_service_1.AdvHttp,
                // useFactory: (config: any, errorHandler: ErrorHandlerService, backend: XHRBackend, defaultOptions: RequestOptions) => {
                //   return new AdvHttp(config, errorHandler, backend, defaultOptions);
                // },
                deps: [adv_http_service_1.ADV_HTTP_CONFIG, adv_http_service_1.ErrorHandlerService, http_1.XHRBackend, http_1.RequestOptions]
            },
            {
                provide: adv_http_service_1.ADV_HTTP_CONFIG,
                useValue: {}
            }
        ]
    })
], AdvHttpModule);
exports.AdvHttpModule = AdvHttpModule;
var AdvHttpModule_1;
