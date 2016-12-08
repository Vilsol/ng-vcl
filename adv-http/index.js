"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var adv_http_service_1 = require('./adv-http.service');
__export(require('./adv-http.service'));
var AdvHttpModule = (function () {
    function AdvHttpModule() {
    }
    AdvHttpModule.forRoot = function (config) {
        return {
            ngModule: AdvHttpModule,
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
    AdvHttpModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    AdvHttpModule.ctorParameters = function () { return []; };
    return AdvHttpModule;
}());
exports.AdvHttpModule = AdvHttpModule;
