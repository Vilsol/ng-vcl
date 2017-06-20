var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCLIconModule } from '../icon/index';
import { L10nModule } from '../l10n/index';
import { FormControlLabelComponent } from './form-control-label.component';
var VCLFormControlLabelModule = (function () {
    function VCLFormControlLabelModule() {
    }
    return VCLFormControlLabelModule;
}());
VCLFormControlLabelModule = __decorate([
    NgModule({
        imports: [CommonModule, VCLIconModule, L10nModule],
        exports: [FormControlLabelComponent],
        declarations: [FormControlLabelComponent]
    })
], VCLFormControlLabelModule);
export { VCLFormControlLabelModule };