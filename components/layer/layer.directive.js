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
var wormhole_module_1 = require("./../../directives/wormhole/wormhole.module");
var layer_service_1 = require("./layer.service");
var LayerDirective = (function (_super) {
    __extends(LayerDirective, _super);
    function LayerDirective(templateRef, elementRef, layerService) {
        var _this = _super.call(this, templateRef) || this;
        _this.templateRef = templateRef;
        _this.elementRef = elementRef;
        _this.layerService = layerService;
        _this.modal = true;
        _this.closeOnOffClick = true;
        _this.base = 'default';
        return _this;
    }
    LayerDirective.prototype.ngOnInit = function () {
        this.layerRef = this.layerService.registerDirective(this, {
            base: this.base,
            closeOnOffClick: !!this.closeOnOffClick,
            modal: !!this.modal
        });
    };
    LayerDirective.prototype.ngOnDestroy = function () {
        this.layerService.unregisterDirective(this);
    };
    LayerDirective.prototype.open = function (data) {
        return this.layerRef.open(data);
    };
    LayerDirective.prototype.send = function (result) {
        this.layerRef.send(result);
    };
    LayerDirective.prototype.close = function (result) {
        this.layerRef.close();
    };
    return LayerDirective;
}(wormhole_module_1.TemplateWormhole));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LayerDirective.prototype, "modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LayerDirective.prototype, "closeOnOffClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LayerDirective.prototype, "base", void 0);
LayerDirective = __decorate([
    core_1.Directive({
        selector: '[vcl-layer]',
        exportAs: 'layer',
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef, core_1.ElementRef, layer_service_1.LayerService])
], LayerDirective);
exports.LayerDirective = LayerDirective;
