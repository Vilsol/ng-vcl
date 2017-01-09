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
var overlayManager_service_1 = require("./overlayManager.service");
var PopoverComponent = (function () {
    function PopoverComponent(overlayManger, myElement, zone) {
        this.overlayManger = overlayManger;
        this.myElement = myElement;
        this.zone = zone;
        this.class = 'vclPopOver';
        this.zIndex = 10;
        this.coverZIndex = -1;
        this.targetAttachment = 'bottom left';
        this.attachment = 'top left';
        this.open = false;
        this.visible = false;
        this.layer = false;
        this.openChange = new core_1.EventEmitter();
        this.zIndexManaged = true;
        this.expandManaged = true;
        this.timeout = 0;
        this.state = 'open';
    }
    PopoverComponent.prototype.close = function () {
        this.state = 'void';
        this.open = false;
        this.openChange.emit(this.open);
    };
    PopoverComponent.prototype.offClick = function () {
        if (this.expandManaged && !this.layer) {
            this.close();
        }
    };
    PopoverComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        try {
            if (this.zIndexManaged) {
                if (changes.open.currentValue === true) {
                    this.zIndex = this.overlayManger.register(this);
                    this.coverZIndex = this.zIndex - 1;
                    this.state = 'open';
                    // TODO: Workaround for css "position relative" 
                    // Tether copies the dom element to the body. The component is removed before the copy is moved back
                    // so it is not destroyed 
                    setTimeout(function () { return _this.zone.run(function () { return _this.visible = true; }); }, this.timeout);
                }
                else if (changes.open.currentValue === false) {
                    this.state = 'void';
                    this.zIndex = this.overlayManger.unregister(this);
                    this.coverZIndex = -1;
                    setTimeout(function () { return _this.zone.run(function () { return _this.visible = false; }); }, this.timeout);
                }
            }
        }
        catch (ex) { }
    };
    return PopoverComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "target", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PopoverComponent.prototype, "zIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "targetAttachment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "attachment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PopoverComponent.prototype, "open", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PopoverComponent.prototype, "layer", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PopoverComponent.prototype, "openChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PopoverComponent.prototype, "zIndexManaged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PopoverComponent.prototype, "expandManaged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PopoverComponent.prototype, "timeout", void 0);
PopoverComponent = __decorate([
    core_1.Component({
        selector: 'vcl-popover',
        templateUrl: 'popover.component.html',
        animations: [
            core_1.trigger('popOverState', [])
        ]
    }),
    __metadata("design:paramtypes", [overlayManager_service_1.OverlayManagerService,
        core_1.ElementRef,
        core_1.NgZone])
], PopoverComponent);
exports.PopoverComponent = PopoverComponent;
