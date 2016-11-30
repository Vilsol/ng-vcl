"use strict";
var core_1 = require('@angular/core');
var input_control_group_component_1 = require('./input-control-group.component');
var common_1 = require('@angular/common');
var VCLInputControlGroupModule = (function () {
    function VCLInputControlGroupModule() {
    }
    VCLInputControlGroupModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [input_control_group_component_1.InputControlGroup],
                    declarations: [input_control_group_component_1.InputControlGroup],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    VCLInputControlGroupModule.ctorParameters = [];
    return VCLInputControlGroupModule;
}());
exports.VCLInputControlGroupModule = VCLInputControlGroupModule;
