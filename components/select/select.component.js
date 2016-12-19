"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
/**
 * see
 * @link http://www.w3schools.com/tags/tag_option.asp
 */
var SelectOptionComponent = (function () {
    function SelectOptionComponent(elementRef) {
        this.elementRef = elementRef;
        this.class = '';
        this.disabled = false;
        this.selected = false;
    }
    SelectOptionComponent.prototype.ngOnInit = function () {
        if (!this.label || this.label == '') {
            this.label = this.elementRef.nativeElement.innerText;
            if (!this.label || this.label == '') {
                this.label = this.value;
            }
        }
    };
    /**
     * transforms this NavigationItemComponent into an object,
     * so it can be handled the same way as an inputList
     * @return {Object}
     */
    SelectOptionComponent.prototype.toObject = function () {
        var ret = {
            value: this.value,
            label: this.label,
            sublabel: this.sublabel,
            class: this.class,
            disabled: this.disabled,
            selected: this.selected
        };
        return ret;
    };
    SelectOptionComponent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'vcl-select-option'
                },] },
    ];
    /** @nocollapse */
    SelectOptionComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    SelectOptionComponent.propDecorators = {
        'value': [{ type: core_1.Input, args: ['value',] },],
        'sublabel': [{ type: core_1.Input, args: ['sublabel',] },],
        'label': [{ type: core_1.Input, args: ['label',] },],
        'class': [{ type: core_1.Input, args: ['class',] },],
        'disabled': [{ type: core_1.Input, args: ['disabled',] },],
        'selected': [{ type: core_1.Input, args: ['selected',] },],
    };
    return SelectOptionComponent;
}());
exports.SelectOptionComponent = SelectOptionComponent;
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent() {
        var _this = this;
        this.popoverTarget = 'popoverTarget' + Math.random().toString().slice(2); // TODO cant this be solved via view/content-childs?
        this.expanded = false;
        // options
        this.items = [];
        // multi-select
        this.minSelectableItems = 1;
        this.maxSelectableItems = 1;
        // styling
        this.expandedIcon = 'fa:chevron-up';
        this.collapsedIcon = 'fa:chevron-down';
        this.displayValue = 'Select value';
        this.changeEE = new core_1.EventEmitter(); // string[] if multi-select
        this.expand = function () { return _this.expanded = !_this.expanded; };
        this.onOutsideClick = function () { return _this.expanded = false; };
    }
    SelectComponent.prototype.ngOnInit = function () { };
    SelectComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // transform template-items if available
        var templateItemsAr = this.templateItems.toArray();
        if (templateItemsAr.length > 0) {
            this.items = templateItemsAr.map(function (i) { return i.toObject(); });
        }
        // make sure value and label exists on every option
        this.items.map(function (item) {
            if (!item.value)
                item.value = item.label;
            if (!item.label)
                item.label = item.value;
            return item;
        });
        this.reDisplayValue(this.value);
        this.changeEE.subscribe(function (newValue) {
            _this.reDisplayValue(newValue);
            // propagate form-change
            !!_this.onChangeCallback && _this.onChangeCallback(newValue);
        });
    };
    SelectComponent.prototype.reDisplayValue = function (newValue) {
        var _this = this;
        if (!newValue)
            return;
        // displayValue
        this.items
            .filter(function (i) { return i.value == newValue; })
            .map(function (i) { return _this.displayValue = i.label; });
        // displayValue for multiselect
        if (newValue.length) {
            this.displayValue = this.items
                .filter(function (i) { return _this.value.includes(i.value); })
                .map(function (i) { return i.label; })
                .join(', ');
        }
    };
    SelectComponent.prototype.selectItem = function (item) {
        this.dropdown.selectItem(item);
    };
    SelectComponent.prototype.onSelect = function (newValue) {
        this.value = newValue;
        this.changeEE.emit(this.value);
    };
    SelectComponent.prototype.writeValue = function (value) {
        if (this.value == value)
            return;
        this.value = value;
        this.changeEE.emit(this.value);
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
                    //  changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return []; };
    SelectComponent.propDecorators = {
        'dropdown': [{ type: core_1.ViewChild, args: ['dropdown',] },],
        'value': [{ type: core_1.Input, args: ['value',] },],
        'expanded': [{ type: core_1.Input, args: ['expanded',] },],
        'items': [{ type: core_1.Input, args: ['items',] },],
        'templateItems': [{ type: core_1.ContentChildren, args: [SelectOptionComponent,] },],
        'minSelectableItems': [{ type: core_1.Input },],
        'maxSelectableItems': [{ type: core_1.Input },],
        'expandedIcon': [{ type: core_1.Input },],
        'collapsedIcon': [{ type: core_1.Input },],
        'displayValue': [{ type: core_1.Input, args: ['displayValue',] },],
        'changeEE': [{ type: core_1.Output, args: ['change',] },],
    };
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
