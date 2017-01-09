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
var TextareaDirective = (function () {
    function TextareaDirective(elRef, ngModel) {
        this.elRef = elRef;
        this.ngModel = ngModel;
        this.selectAllOnFocus = false;
        this.autogrow = true;
        this.maxRows = null;
        this.minRows = null;
        this.rows = null;
    }
    TextareaDirective.prototype.onModelChange = function (value) {
        this.setRowsByValue(value);
    };
    TextareaDirective.prototype.onFocus = function (value) {
        if (this.selectAllOnFocus) {
            if (this.elRef && this.elRef.nativeElement) {
                this.elRef.nativeElement.select();
            }
        }
    };
    TextareaDirective.prototype.ngOnInit = function () {
        this.setRowsByValue(this.ngModel.model);
    };
    TextareaDirective.prototype.setRowsByValue = function (value) {
        if (this.autogrow && typeof value === 'string') {
            var rows = value.split('\n').length + 1;
            if (typeof this.minRows === 'number' && rows < this.minRows) {
                this.rows = this.minRows;
            }
            else if (typeof this.maxRows === 'number' && rows > this.maxRows) {
                this.rows = this.maxRows;
            }
            else {
                this.rows = rows;
            }
        }
    };
    return TextareaDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TextareaDirective.prototype, "selectAllOnFocus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TextareaDirective.prototype, "autogrow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextareaDirective.prototype, "maxRows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextareaDirective.prototype, "minRows", void 0);
__decorate([
    core_1.HostListener('ngModelChange', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TextareaDirective.prototype, "onModelChange", null);
__decorate([
    core_1.HostListener('focus', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TextareaDirective.prototype, "onFocus", null);
__decorate([
    core_1.HostBinding('attr.rows'),
    __metadata("design:type", Number)
], TextareaDirective.prototype, "rows", void 0);
TextareaDirective = __decorate([
    core_1.Directive({
        selector: '[vcl-textarea]',
        host: {
            '[class.vclInput]': 'true',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, forms_1.NgModel])
], TextareaDirective);
exports.TextareaDirective = TextareaDirective;
