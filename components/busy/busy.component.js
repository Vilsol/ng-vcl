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
var BusyComponent = (function () {
    function BusyComponent() {
        this.busy = false;
        this.busyLabel = null;
    }
    return BusyComponent;
}());
__decorate([
    core_1.Input('vcl-busy'),
    core_1.HostBinding('class.vclLoadingLayerContainer'),
    __metadata("design:type", Object)
], BusyComponent.prototype, "busy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BusyComponent.prototype, "busyLabel", void 0);
BusyComponent = __decorate([
    core_1.Component({
        selector: '[vcl-busy]',
        templateUrl: 'busy.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], BusyComponent);
exports.BusyComponent = BusyComponent;
