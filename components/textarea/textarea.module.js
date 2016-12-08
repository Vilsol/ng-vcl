"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var textarea_directive_1 = require('./textarea.directive');
var VCLTextareaModule = (function () {
    function VCLTextareaModule() {
    }
    VCLTextareaModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [forms_1.FormsModule],
                    exports: [textarea_directive_1.TextareaDirective],
                    declarations: [textarea_directive_1.TextareaDirective],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    VCLTextareaModule.ctorParameters = function () { return []; };
    return VCLTextareaModule;
}());
exports.VCLTextareaModule = VCLTextareaModule;
