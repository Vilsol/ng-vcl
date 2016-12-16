"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropdownComponent; }),
    multi: true
};
var DropdownComponent = (function () {
    function DropdownComponent() {
        this.change$ = new core_1.EventEmitter();
        this.tabindex = 0;
        this.expanded = false;
        this.maxSelectableItems = 1;
        this.minSelectableItems = 1;
        this.ariaRole = 'listbox';
    }
    Object.defineProperty(DropdownComponent.prototype, "value", {
        get: function () {
            var ret = this.items
                .filter(function (i) { return i.selected; })
                .map(function (i) { return i.value; });
            if (this.maxSelectableItems == 1)
                ret = ret[0];
            return ret;
        },
        set: function (v) {
            if (!Array.isArray(v))
                v = [v];
            this.items
                .forEach(function (i) {
                if (v.includes(i.value))
                    i.selected = true;
                else
                    i.selected = false;
            });
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    ;
    DropdownComponent.prototype.ngOnInit = function () {
        // ensure items have a value
        this.items = this.items.map(function (i) {
            if (!i.value)
                i.value = i.label;
            if (!i.label)
                i.label = i.value;
            return i;
        });
    };
    DropdownComponent.prototype.selectedItems = function () {
        return this.items.filter(function (i) { return i.selected; });
    };
    DropdownComponent.prototype.clickItem = function (item) {
        if (item.disabled)
            return;
        if (!item.selected) {
            // prevent overflow maxSelectableItems
            if (this.selectedItems().length >= this.maxSelectableItems)
                this.items.find(function (i) { return i.selected; }).selected = false;
            if (this.maxSelectableItems == 1)
                this.items.forEach(function (i) { return i.selected = false; });
        }
        else {
            // prevent underflow minSelectableItems
            if (this.selectedItems().length <= this.minSelectableItems)
                return;
        }
        item.selected = !item.selected;
        this.onChange();
    };
    DropdownComponent.prototype.onChange = function () {
        this.change$.emit(this.value);
        !!this.onChangeCallback && this.onChangeCallback(this.value);
    };
    DropdownComponent.prototype.writeValue = function (v) {
        if (v.toString() != this.value.toStrig())
            this.value = v;
    };
    DropdownComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DropdownComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DropdownComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-dropdown',
                    templateUrl: 'dropdown.component.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DropdownComponent.ctorParameters = function () { return []; };
    DropdownComponent.propDecorators = {
        'change$': [{ type: core_1.Output, args: ['change',] },],
        'items': [{ type: core_1.Input },],
        'tabindex': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'maxSelectableItems': [{ type: core_1.Input },],
        'minSelectableItems': [{ type: core_1.Input },],
        'ariaRole': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
    };
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
