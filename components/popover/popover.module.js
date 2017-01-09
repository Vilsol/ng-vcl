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
var popover_component_1 = require("./popover.component");
exports.PopoverComponent = popover_component_1.PopoverComponent;
var tether_module_1 = require("../tether/tether.module");
var off_click_module_1 = require("../../directives/off-click/off-click.module");
var overlayManager_service_1 = require("./overlayManager.service");
exports.OverlayManagerService = overlayManager_service_1.OverlayManagerService;
var VCLPopoverModule = (function () {
    function VCLPopoverModule() {
    }
    return VCLPopoverModule;
}());
VCLPopoverModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tether_module_1.VCLTetherModule,
            off_click_module_1.VCLOffClickModule
        ],
        providers: [overlayManager_service_1.OverlayManagerService],
        exports: [popover_component_1.PopoverComponent],
        declarations: [popover_component_1.PopoverComponent]
    }),
    __metadata("design:paramtypes", [])
], VCLPopoverModule);
exports.VCLPopoverModule = VCLPopoverModule;
