var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavComponent } from './tab-nav.component';
import { TabComponent, TabLabelDirective } from './tab.component';
import { L10nModule } from '../l10n/index';
import { VCLWormholeModule } from '../wormhole/index';
var VCLTabNavModule = (function () {
    function VCLTabNavModule() {
    }
    VCLTabNavModule = __decorate([
        NgModule({
            imports: [CommonModule, L10nModule, VCLWormholeModule],
            exports: [TabComponent, TabLabelDirective, TabNavComponent],
            declarations: [TabComponent, TabLabelDirective, TabNavComponent],
            providers: [],
        })
    ], VCLTabNavModule);
    return VCLTabNavModule;
}());
export { VCLTabNavModule };
