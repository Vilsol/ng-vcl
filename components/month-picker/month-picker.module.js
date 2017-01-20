"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var month_picker_component_1 = require("./month-picker.component");
var button_module_1 = require("../button/button.module");
var l10n_module_1 = require("../../l10n/l10n.module");
var VCLMonthPickerModule = (function () {
    function VCLMonthPickerModule() {
    }
    return VCLMonthPickerModule;
}());
VCLMonthPickerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_module_1.VCLButtonModule, l10n_module_1.L10nModule],
        exports: [month_picker_component_1.MonthPickerComponent],
        declarations: [month_picker_component_1.MonthPickerComponent],
        providers: [],
    })
], VCLMonthPickerModule);
exports.VCLMonthPickerModule = VCLMonthPickerModule;
