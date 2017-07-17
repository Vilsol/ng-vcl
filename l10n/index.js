var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { L10nLoaderService, L10nNoopLoaderService, L10nStaticLoaderService, L10nAsyncLoaderService, L10N_LOADER_CONFIG } from './l10n-loader.service';
import { L10nParserService, L10nFormatParserService } from './l10n-parser.service';
import { L10nService, L10N_CONFIG } from './l10n.service';
import { L10nPipe } from './l10n.pipe';
// export {L10nNoopLoaderService, L10nStaticLoaderService, L10nFormatParserService, L10nService };
export { L10nNoopLoaderService, L10nStaticLoaderService, L10nAsyncLoaderService, L10nFormatParserService, L10nService };
var L10nModule = (function () {
    function L10nModule() {
    }
    L10nModule_1 = L10nModule;
    L10nModule.forRoot = function (config) {
        return {
            ngModule: L10nModule_1,
            providers: [
                L10nService,
                {
                    provide: L10N_CONFIG,
                    useValue: config.config || {}
                },
                {
                    provide: L10nLoaderService,
                    useClass: config.loader
                }, {
                    provide: L10N_LOADER_CONFIG,
                    useValue: config.loaderConfig
                }, {
                    provide: L10nParserService,
                    useClass: config.parser || L10nFormatParserService
                }
            ]
        };
    };
    L10nModule = L10nModule_1 = __decorate([
        NgModule({
            imports: [],
            declarations: [L10nPipe],
            exports: [L10nPipe]
        })
    ], L10nModule);
    return L10nModule;
    var L10nModule_1;
}());
export { L10nModule };
