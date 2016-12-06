"use strict";
var core_1 = require('@angular/core');
var FormComponent = (function () {
    function FormComponent() {
        this.layout = 'vertical';
        this.valueChange = new core_1.EventEmitter(); // emits ngForm
    }
    FormComponent.prototype.onSubmitTemplateBased = function () {
    };
    FormComponent.prototype.ngOnInit = function () { };
    FormComponent.prototype.ngSubmit = function (form) {
        this.valueChange.emit(form);
    };
    FormComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-form',
                    templateUrl: 'form.component.html',
                    host: {
                        '[class.vclForm]': 'true',
                    }
                },] },
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = [];
    FormComponent.propDecorators = {
        'layout': [{ type: core_1.Input },],
        'valueChange': [{ type: core_1.Output, args: ['ngSubmit',] },],
    };
    return FormComponent;
}());
exports.FormComponent = FormComponent;
