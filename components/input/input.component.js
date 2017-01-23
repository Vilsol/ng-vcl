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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var utils_1 = require("../../utils");
// Invalid input type. Using one of these will throw an error
var INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var InputComponent = (function () {
    function InputComponent(elRef) {
        this.elRef = elRef;
        this.type = 'text';
        this.selectOnFocus = false;
        this._valueSubject = new BehaviorSubject_1.BehaviorSubject(this.value);
        this.typedValueChange = this._valueSubject.asObservable();
        this.subs = [];
        if (utils_1.includes(INPUT_INVALID_TYPES, this.type))
            throw new Error('type not allowed for vcl-input: ' + this.type);
    }
    InputComponent.prototype.ngOnInit = function () {
    };
    InputComponent.prototype.toType = function (value) {
        if (this.type === 'number') {
            var tValue = Number(value);
            return isNaN(tValue) ? 0 : tValue;
        }
        else
            return value;
    };
    InputComponent.prototype.onChange = function (value) {
        this._valueSubject.next(this.toType(value));
    };
    InputComponent.prototype.onFocus = function (value) {
        if (this.selectOnFocus) {
            if (this.elRef && this.elRef.nativeElement) {
                this.elRef.nativeElement.select();
            }
        }
    };
    InputComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return InputComponent;
}());
__decorate([
    core_1.Input('state'),
    __metadata("design:type", String)
], InputComponent.prototype, "state", void 0);
__decorate([
    core_1.Input('type'),
    __metadata("design:type", String)
], InputComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "selectOnFocus", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object)
], InputComponent.prototype, "value", void 0);
__decorate([
    core_1.Output('typedValueChange'),
    __metadata("design:type", Object)
], InputComponent.prototype, "typedValueChange", void 0);
__decorate([
    core_1.HostListener('input', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputComponent.prototype, "onChange", null);
__decorate([
    core_1.HostListener('focus', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputComponent.prototype, "onFocus", null);
InputComponent = __decorate([
    core_1.Directive({
        selector: '[vcl-input]',
        host: {
            '[class.vclInput]': 'true',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], InputComponent);
exports.InputComponent = InputComponent;
