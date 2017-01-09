"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var l10n_module_1 = require("../../l10n/l10n.module");
var index_1 = require("../../core/index");
var LinkComponent = (function (_super) {
    __extends(LinkComponent, _super);
    function LinkComponent(l10n) {
        var _this = _super.call(this) || this;
        _this.l10n = l10n;
        _this.locTitle$ = _this.observeChange('title').switchMap(function (title) { return _this.l10n.localize(title); });
        return _this;
    }
    Object.defineProperty(LinkComponent.prototype, "attrHref", {
        get: function () {
            if (this.disabled)
                return null;
            return this.scheme
                ? this.scheme + ":" + this.href
                : this.href;
        },
        enumerable: true,
        configurable: true
    });
    LinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locTitleSub = this.locTitle$.subscribe(function (title) { return _this.locTitle = title; });
    };
    LinkComponent.prototype.ngOnDestroy = function () {
        this.locTitleSub.unsubscribe();
    };
    return LinkComponent;
}(index_1.ObservableComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "href", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "scheme", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "prepIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LinkComponent.prototype, "appIcon", void 0);
__decorate([
    core_1.HostBinding('class.vclDisabled'),
    core_1.Input(),
    __metadata("design:type", Boolean)
], LinkComponent.prototype, "disabled", void 0);
__decorate([
    core_1.HostBinding('attr.href'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], LinkComponent.prototype, "attrHref", null);
__decorate([
    core_1.HostBinding('attr.title'),
    core_1.HostBinding('attr.aria-label'),
    __metadata("design:type", String)
], LinkComponent.prototype, "locTitle", void 0);
LinkComponent = __decorate([
    core_1.Component({
        selector: '[vcl-link]',
        templateUrl: 'link.component.html',
        host: {
            '[attr.touch-action]': 'touchAction' // TODO - no function?
        },
    }),
    __metadata("design:paramtypes", [l10n_module_1.L10nService])
], LinkComponent);
exports.LinkComponent = LinkComponent;
