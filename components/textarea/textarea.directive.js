"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
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
    TextareaDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vcl-textarea]',
                    host: {
                        '[class.vclInput]': 'true',
                    }
                },] },
    ];
    /** @nocollapse */
    TextareaDirective.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: forms_1.NgModel, },
    ];
    TextareaDirective.propDecorators = {
        'selectAllOnFocus': [{ type: core_1.Input },],
        'autogrow': [{ type: core_1.Input },],
        'maxRows': [{ type: core_1.Input },],
        'minRows': [{ type: core_1.Input },],
        'onModelChange': [{ type: core_1.HostListener, args: ['ngModelChange', ['$event'],] },],
        'onFocus': [{ type: core_1.HostListener, args: ['focus', ['$event.target.value'],] },],
        'rows': [{ type: core_1.HostBinding, args: ['attr.rows',] },],
    };
    return TextareaDirective;
}());
exports.TextareaDirective = TextareaDirective;
