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
var forms_1 = require("@angular/forms");
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return FlipSwitchComponent; }),
    multi: true
};
var FlipSwitchComponent = (function () {
    function FlipSwitchComponent() {
        var _this = this;
        this.tabindex = 0;
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.value = false;
        this.change$ = new core_1.EventEmitter();
        this.change$.subscribe(function (newVal) {
            _this.value = newVal;
            !!_this.onChangeCallback && _this.onChangeCallback(newVal);
        });
    }
    FlipSwitchComponent.prototype.onClick = function () {
        this.value = !this.value;
        this.change$.emit(this.value);
    };
    FlipSwitchComponent.prototype.keydown = function (ev) {
        switch (ev.code) {
            case 'Space':
                ev.preventDefault();
                this.onClick();
                break;
        }
    };
    FlipSwitchComponent.prototype.writeValue = function (value) {
        if (value !== this.value)
            this.value = value;
    };
    FlipSwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    FlipSwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return FlipSwitchComponent;
}());
__decorate([
    core_1.HostBinding(),
    __metadata("design:type", Object)
], FlipSwitchComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input('onLabel'),
    __metadata("design:type", String)
], FlipSwitchComponent.prototype, "onLabel", void 0);
__decorate([
    core_1.Input('offLabel'),
    __metadata("design:type", String)
], FlipSwitchComponent.prototype, "offLabel", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Boolean)
], FlipSwitchComponent.prototype, "value", void 0);
__decorate([
    core_1.Output('change'),
    __metadata("design:type", Object)
], FlipSwitchComponent.prototype, "change$", void 0);
__decorate([
    core_1.HostListener('tap', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlipSwitchComponent.prototype, "onClick", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FlipSwitchComponent.prototype, "keydown", null);
FlipSwitchComponent = __decorate([
    core_1.Component({
        selector: 'vcl-flip-switch',
        templateUrl: 'flip-switch.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        host: {
            '[class.vclFlipSwitch]': 'true',
            '[class.vclFlipSwitchPressed]': 'value',
            '[attr.role]': '"button"',
            '[attr.aria-pressed]': 'value',
            '[attr.touch-action]': '"pan-y"',
            '[style.display]': '"block"' // TODO this should be done by vcl itself
        }
    }),
    __metadata("design:paramtypes", [])
], FlipSwitchComponent);
exports.FlipSwitchComponent = FlipSwitchComponent;
