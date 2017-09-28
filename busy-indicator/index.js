var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator.component';
import { BusyComponent } from './busy.component';
export { BusyComponent, BusyIndicatorComponent };
var VCLBusyIndicatorModule = /** @class */ (function () {
    function VCLBusyIndicatorModule() {
    }
    VCLBusyIndicatorModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [BusyComponent, BusyIndicatorComponent],
            declarations: [BusyComponent, BusyIndicatorComponent]
        })
    ], VCLBusyIndicatorModule);
    return VCLBusyIndicatorModule;
}());
export { VCLBusyIndicatorModule };
