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
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.value = null;
        this.secondaryValue = null;
        this.minValue = 0;
        this.maxValue = 100;
        this.indeterminate = false;
        this.label = null;
    }
    Object.defineProperty(ProgressBarComponent.prototype, "showIndeterminate", {
        get: function () {
            return this.indeterminate && !this.validateValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "showValue", {
        get: function () {
            return !this.indeterminate || this.validateValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "showSecondaryValue", {
        get: function () {
            return this.validateValue(this.secondaryValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "transformValue", {
        get: function () {
            var value = this.validateValue(this.value) ? this.scaleValue(this.value) : 0;
            return "scaleX(" + value + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "transformSecondaryValue", {
        get: function () {
            var value = this.validateValue(this.secondaryValue) ? this.scaleValue(this.secondaryValue) : 0;
            return "scaleX(" + value + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "range", {
        get: function () {
            return this.maxValue - this.minValue;
        },
        enumerable: true,
        configurable: true
    });
    ProgressBarComponent.prototype.scaleValue = function (value) {
        return (value - this.minValue) / this.range;
    };
    ProgressBarComponent.prototype.validateValue = function (value) {
        return typeof value === 'number' &&
            value !== NaN &&
            value >= this.minValue &&
            value <= this.maxValue;
    };
    return ProgressBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "secondaryValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "minValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "maxValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ProgressBarComponent.prototype, "indeterminate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProgressBarComponent.prototype, "label", void 0);
ProgressBarComponent = __decorate([
    core_1.Component({
        selector: 'vcl-progress-bar',
        templateUrl: 'progress-bar.component.html',
        host: {
            '[attr.role]': '"progressbar"',
        },
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    })
], ProgressBarComponent);
exports.ProgressBarComponent = ProgressBarComponent;
