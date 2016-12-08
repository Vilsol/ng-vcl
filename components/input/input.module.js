"use strict";
var core_1 = require('@angular/core');
var input_directive_1 = require('./input.directive');
var VCLInputModule = (function () {
    function VCLInputModule() {
    }
    VCLInputModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    exports: [input_directive_1.InputDirective],
                    declarations: [input_directive_1.InputDirective],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    VCLInputModule.ctorParameters = function () { return []; };
    return VCLInputModule;
}());
exports.VCLInputModule = VCLInputModule;
