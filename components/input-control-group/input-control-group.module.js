"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var input_control_group_component_1 = require("./input-control-group.component");
var common_1 = require("@angular/common");
var VCLInputControlGroupModule = (function () {
    function VCLInputControlGroupModule() {
    }
    return VCLInputControlGroupModule;
}());
VCLInputControlGroupModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [input_control_group_component_1.InputControlGroup],
        declarations: [input_control_group_component_1.InputControlGroup],
        providers: [],
    })
], VCLInputControlGroupModule);
exports.VCLInputControlGroupModule = VCLInputControlGroupModule;
