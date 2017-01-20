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
var layer_references_1 = require("./layer.references");
var DirectiveLayerRef = (function (_super) {
    __extends(DirectiveLayerRef, _super);
    function DirectiveLayerRef(templateRef, layerService, cdRef) {
        var _this = _super.call(this) || this;
        _this.templateRef = templateRef;
        _this.layerService = layerService;
        _this.cdRef = cdRef;
        _this.modal = false;
        _this.offClickClose = true;
        _this.base = 'default';
        _this.transparent = false;
        _this.fill = false;
        _this.stickToBottom = false;
        _this.gutterPadding = false;
        _this.customClass = null;
        return _this;
    }
    DirectiveLayerRef.prototype.ngOnInit = function () {
        this.layerService.register(this);
    };
    DirectiveLayerRef.prototype.ngOnDestroy = function () {
        this.layerService.unregister(this);
    };
    DirectiveLayerRef.prototype.createWormhole = function () {
        return new wormhole_module_1.TemplateWormhole(this.templateRef);
    };
    DirectiveLayerRef.prototype.setData = function (data) {
    };
    return DirectiveLayerRef;
}(layer_references_1.LayerRef));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "offClickClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DirectiveLayerRef.prototype, "base", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "transparent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "stickToBottom", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DirectiveLayerRef.prototype, "gutterPadding", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DirectiveLayerRef.prototype, "customClass", void 0);
DirectiveLayerRef = __decorate([
    core_1.Directive({
        selector: '[vcl-layer]',
        exportAs: 'layer',
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef, layer_service_1.LayerService, core_1.ChangeDetectorRef])
], DirectiveLayerRef);
exports.DirectiveLayerRef = DirectiveLayerRef;
