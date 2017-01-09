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
var icogram_component_1 = require("./icogram.component");
var icon_module_1 = require("../icon/icon.module");
var l10n_module_1 = require("../../l10n/l10n.module");
var VCLIcogramModule = (function () {
    function VCLIcogramModule() {
    }
    return VCLIcogramModule;
}());
VCLIcogramModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, icon_module_1.VCLIconModule, l10n_module_1.L10nModule],
        exports: [icogram_component_1.IcogramComponent],
        declarations: [icogram_component_1.IcogramComponent],
        providers: [],
    }),
    __metadata("design:paramtypes", [])
], VCLIcogramModule);
exports.VCLIcogramModule = VCLIcogramModule;
