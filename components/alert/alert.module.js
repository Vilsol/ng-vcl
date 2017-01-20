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
var icogram_module_1 = require("./../icogram/icogram.module");
var button_module_1 = require("./../button/button.module");
var layer_module_1 = require("./../layer/layer.module");
var input_module_1 = require("./../input/input.module");
var alert_component_1 = require("./alert.component");
var alert_service_1 = require("./alert.service");
exports.AlertService = alert_service_1.AlertService;
var types_1 = require("./types");
exports.AlertType = types_1.AlertType;
exports.AlertError = types_1.AlertError;
exports.AlertInput = types_1.AlertInput;
exports.AlertAlignment = types_1.AlertAlignment;
var VCLAlertModule = (function () {
    function VCLAlertModule() {
    }
    return VCLAlertModule;
}());
VCLAlertModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            button_module_1.VCLButtonModule,
            input_module_1.VCLInputModule,
            icogram_module_1.VCLIcogramModule,
            layer_module_1.VCLLayerModule.withConfig({
                layers: [alert_component_1.AlertLayer]
            })
        ],
        exports: [],
        declarations: [alert_component_1.AlertComponent, alert_component_1.AlertInputComponent],
        entryComponents: [alert_component_1.AlertComponent],
        providers: [alert_service_1.AlertService],
    })
], VCLAlertModule);
exports.VCLAlertModule = VCLAlertModule;
