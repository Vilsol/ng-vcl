"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var icon_component_1 = require("./icon.component");
exports.IconComponent = icon_component_1.IconComponent;
var icon_service_1 = require("./icon.service");
exports.IconService = icon_service_1.IconService;
var l10n_module_1 = require("../../l10n/l10n.module");
var VCLIconModule = VCLIconModule_1 = (function () {
    function VCLIconModule() {
    }
    VCLIconModule.forRoot = function (config) {
        return {
            ngModule: VCLIconModule_1,
            providers: [
                {
                    provide: icon_service_1.IconService,
                    useClass: config.service || icon_service_1.IconService
                }
            ]
        };
    };
    return VCLIconModule;
}());
VCLIconModule = VCLIconModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, l10n_module_1.L10nModule],
        exports: [icon_component_1.IconComponent],
        declarations: [icon_component_1.IconComponent],
        providers: [icon_service_1.IconService],
    })
], VCLIconModule);
exports.VCLIconModule = VCLIconModule;
var VCLIconModule_1;
