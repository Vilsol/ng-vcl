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
var Observable_1 = require("rxjs/Observable");
var InputDirective = (function () {
    function InputDirective(elRef) {
        this.elRef = elRef;
        this.valueType = null;
        this.typedValue = null;
        this._typedValueChange = new core_1.EventEmitter();
        this.selectAllOnFocus = false;
    }
    Object.defineProperty(InputDirective.prototype, "typedValueChange", {
        get: function () {
            return this._typedValueChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    InputDirective.prototype.ngOnInit = function () { };
    InputDirective.prototype.onChange = function (value) {
        this._typedValueChange.emit(this.toType(value));
    };
    InputDirective.prototype.toType = function (value) {
        if (this.valueType === 'number') {
            var tValue = Number(value);
            return isNaN(tValue) ? 0 : tValue;
        }
        else {
            return value;
        }
    };
    InputDirective.prototype.onFocus = function (value) {
        if (this.selectAllOnFocus) {
            if (this.elRef && this.elRef.nativeElement) {
                this.elRef.nativeElement.select();
            }
        }
    };
    return InputDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputDirective.prototype, "valueType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputDirective.prototype, "typedValue", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Observable_1.Observable),
    __metadata("design:paramtypes", [])
], InputDirective.prototype, "typedValueChange", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputDirective.prototype, "selectAllOnFocus", void 0);
__decorate([
    core_1.HostListener('input', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputDirective.prototype, "onChange", null);
__decorate([
    core_1.HostListener('focus', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputDirective.prototype, "onFocus", null);
InputDirective = __decorate([
    core_1.Directive({
        selector: '[vcl-input]',
        host: {
            '[class.vclInput]': 'true',
        },
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], InputDirective);
exports.InputDirective = InputDirective;
