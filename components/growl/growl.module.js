"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_module_1 = require("./../button/button.module");
var layer_module_1 = require("./../layer/layer.module");
var growl_component_1 = require("./growl.component");
var growl_layer_1 = require("./growl.layer");
var growl_service_1 = require("./growl.service");
exports.GrowlService = growl_service_1.GrowlService;
var growl_1 = require("./growl");
exports.Growl = growl_1.Growl;
var types_1 = require("./types");
exports.GrowlType = types_1.GrowlType;
exports.GrowlPosition = types_1.GrowlPosition;
var VCLGrowlModule = (function () {
    function VCLGrowlModule() {
    }
    return VCLGrowlModule;
}());
VCLGrowlModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            button_module_1.VCLButtonModule,
            layer_module_1.VCLLayerModule.withConfig({
                layers: [growl_layer_1.GrowlLayerTopRight, growl_layer_1.GrowlLayerBottomRight, growl_layer_1.GrowlLayerBottom, growl_layer_1.GrowlLayerBottomLeft, growl_layer_1.GrowlLayerTopLeft, growl_layer_1.GrowlLayerTop]
            })
        ],
        exports: [],
        declarations: [growl_component_1.GrowlComponent],
        entryComponents: [growl_component_1.GrowlComponent],
        providers: [growl_service_1.GrowlService],
    })
], VCLGrowlModule);
exports.VCLGrowlModule = VCLGrowlModule;
