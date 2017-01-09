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
    return SelectOptionComponent;
}());
__decorate([
    core_1.Input('value'),
    __metadata("design:type", String)
], SelectOptionComponent.prototype, "value", void 0);
__decorate([
    core_1.Input('sublabel'),
    __metadata("design:type", String)
], SelectOptionComponent.prototype, "sublabel", void 0);
__decorate([
    core_1.Input('label'),
    __metadata("design:type", String)
], SelectOptionComponent.prototype, "label", void 0);
__decorate([
    core_1.Input('class'),
    __metadata("design:type", String)
], SelectOptionComponent.prototype, "class", void 0);
__decorate([
    core_1.Input('disabled'),
    __metadata("design:type", Boolean)
], SelectOptionComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input('selected'),
    __metadata("design:type", Boolean)
], SelectOptionComponent.prototype, "selected", void 0);
SelectOptionComponent = __decorate([
    core_1.Directive({
        selector: 'vcl-select-option'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SelectOptionComponent);
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
    return SelectComponent;
}());
__decorate([
    core_1.ViewChild('dropdown'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "dropdown", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "value", void 0);
__decorate([
    core_1.Input('expanded'),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "expanded", void 0);
__decorate([
    core_1.Input('items'),
    __metadata("design:type", Array)
], SelectComponent.prototype, "items", void 0);
__decorate([
    core_1.ContentChildren(SelectOptionComponent),
    __metadata("design:type", core_1.QueryList)
], SelectComponent.prototype, "templateItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectComponent.prototype, "minSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectComponent.prototype, "maxSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "expandedIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "collapsedIcon", void 0);
__decorate([
    core_1.Input('displayValue'),
    __metadata("design:type", String)
], SelectComponent.prototype, "displayValue", void 0);
__decorate([
    core_1.Output('change'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "changeEE", void 0);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'vcl-select',
        templateUrl: 'select.component.html',
        //  changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [])
], SelectComponent);
exports.SelectComponent = SelectComponent;
