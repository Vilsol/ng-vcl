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
var icon_service_1 = require("./icon.service");
var IconComponent = (function () {
    function IconComponent(_iconService) {
        this._iconService = _iconService;
    }
    Object.defineProperty(IconComponent.prototype, "mergedIconClass", {
        get: function () {
            var fontIconClass = this.icon ? this._iconService.lookup(this.icon) : '';
            return "vclIcon " + fontIconClass + " " + (this.iconClass || '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "isAriaHidden", {
        // Do not hide from aria when a label is provided
        get: function () {
            return !this.label;
        },
        enumerable: true,
        configurable: true
    });
    return IconComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "src", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "svguse", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "iconClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "icon", void 0);
__decorate([
    core_1.HostBinding('attr.aria-label'),
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "label", void 0);
__decorate([
    core_1.HostBinding('attr.role'),
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "ariaRole", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], IconComponent.prototype, "mergedIconClass", null);
__decorate([
    core_1.HostBinding('attr.aria-hidden'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], IconComponent.prototype, "isAriaHidden", null);
IconComponent = __decorate([
    core_1.Component({
        selector: 'vcl-icon, [vcl-icon]',
        templateUrl: 'icon.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        host: {
            '[class.vclIcon]': 'true',
        },
    }),
    __metadata("design:paramtypes", [icon_service_1.IconService])
], IconComponent);
exports.IconComponent = IconComponent;
