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
    DropdownComponent.prototype.selectItem = function (item) {
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
    return DropdownComponent;
}());
DropdownComponent.TAG = 'DropdownComponent';
__decorate([
    core_1.Output('change'),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "change$", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DropdownComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DropdownComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DropdownComponent.prototype, "expanded", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DropdownComponent.prototype, "maxSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DropdownComponent.prototype, "minSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownComponent.prototype, "ariaRole", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownComponent.prototype, "value", null);
DropdownComponent = __decorate([
    core_1.Component({
        selector: 'vcl-dropdown',
        templateUrl: 'dropdown.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
