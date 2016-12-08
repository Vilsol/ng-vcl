"use strict";
var core_1 = require('@angular/core');
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
    InputDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vcl-input]',
                    host: {
                        '[class.vclInput]': 'true',
                    },
                },] },
    ];
    /** @nocollapse */
    InputDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    InputDirective.propDecorators = {
        'valueType': [{ type: core_1.Input },],
        'typedValue': [{ type: core_1.Input },],
        'typedValueChange': [{ type: core_1.Output },],
        'selectAllOnFocus': [{ type: core_1.Input },],
        'onChange': [{ type: core_1.HostListener, args: ['input', ['$event.target.value'],] },],
        'onFocus': [{ type: core_1.HostListener, args: ['focus', ['$event.target.value'],] },],
    };
    return InputDirective;
}());
exports.InputDirective = InputDirective;
