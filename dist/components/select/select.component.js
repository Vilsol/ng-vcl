"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
/**
 * see
 * @link http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
 */
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent() {
        var _this = this;
        this.clickInside = false;
        this.popoverTarget = 'popoverTarget' + Math.random().toString().slice(2);
        this.select = new core_1.EventEmitter();
        this.expanded = false;
        this.minSelectableItems = 1;
        this.maxSelectableItems = 1;
        this.expandedIcon = 'fa:chevron-up';
        this.collapsedIcon = 'fa:chevron-down';
        this.inputValue = 'label';
        this.emptyLabel = 'Select value';
        this.select.subscribe(function (selectedItems) {
            _this.selected = selectedItems;
            !!_this.onChangeCallback && _this.onChangeCallback(selectedItems);
        });
    }
    SelectComponent.prototype.ngOnInit = function () {
        this.displayValue = this.emptyLabel;
    };
    SelectComponent.prototype.expand = function () {
        this.expanded = !this.expanded;
    };
    SelectComponent.prototype.selectItem = function (item) {
        this.dropdown.selectItem(item);
    };
    /**
     * TODO refactor this
     */
    SelectComponent.prototype.onSelect = function (items) {
        this.clickInside = true;
        this.select.emit(items);
        if (items && items[0] && this.maxSelectableItems === 1) {
            this.displayValue = items[0][this.inputValue];
        }
        else if (!items || items.length === 0) {
            this.displayValue = this.emptyLabel;
        }
        else {
            var result = '';
            for (var i = 0; i < items.length; i++) {
                result += items[i][this.inputValue];
                if (i !== items.length - 1) {
                    result += ', ';
                }
            }
            this.displayValue = result;
        }
    };
    SelectComponent.prototype.onOutsideClick = function (event) {
        this.expanded = false;
    };
    SelectComponent.prototype.writeValue = function (value) {
        if (value !== this.selected) {
            this.selected = value;
        }
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-select',
                    templateUrl: 'select.component.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = [];
    SelectComponent.propDecorators = {
        'dropdown': [{ type: core_1.ViewChild, args: ['dropdown',] },],
        'select': [{ type: core_1.Output },],
        'expanded': [{ type: core_1.Input },],
        'items': [{ type: core_1.Input },],
        'minSelectableItems': [{ type: core_1.Input },],
        'maxSelectableItems': [{ type: core_1.Input },],
        'expandedIcon': [{ type: core_1.Input },],
        'collapsedIcon': [{ type: core_1.Input },],
        'inputValue': [{ type: core_1.Input },],
        'emptyLabel': [{ type: core_1.Input },],
    };
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;