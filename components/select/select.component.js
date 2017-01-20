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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    function SelectComponent(me, zone) {
        this.zone = zone;
        this.tabindex = 0;
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
        this.dropdownTop = -1;
        this.dropDirection = 'bottom';
        this.zone = zone;
        this.me = me;
    }
    SelectComponent.prototype.expand = function () {
        this.expanded = !this.expanded;
        this.calculateDropDirection();
    };
    SelectComponent.prototype.keydown = function (ev) {
        switch (ev.code) {
            case 'ArrowDown':
            case 'ArrowUp':
                this.expanded = true;
                break;
            case 'Space':
                this.expanded = !this.expanded;
                break;
            case 'Tab':
                if (!this.expanded)
                    this.me.nativeElement.blur();
            case 'Escape':
                this.expanded = false;
                break;
        }
    };
    SelectComponent.prototype.doTap = function (ev) {
        this.expanded = !this.expanded;
    };
    SelectComponent.prototype.onFocus = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 100); })];
                    case 1:
                        _a.sent();
                        this.expanded = true;
                        this.dropdown.listenKeys = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectComponent.prototype.onBlur = function (event) {
        this.expanded = false;
        this.dropdown.listenKeys = false;
    };
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
    /**
     * calculate if the dropdown should be displayed above or under the select-input
     */
    SelectComponent.prototype.calculateDropDirection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var position, screenHeight, spaceBottom, spaceTop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        position = this.me.nativeElement.getBoundingClientRect();
                        screenHeight = window.innerHeight
                            || document.documentElement.clientHeight
                            || document.body.clientHeight;
                        spaceBottom = screenHeight - position.bottom;
                        spaceTop = position.top;
                        if (spaceBottom < spaceTop)
                            this.dropDirection = 'top';
                        else
                            this.dropDirection = 'bottom';
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 0); })];
                    case 1:
                        _a.sent();
                        switch (this.dropDirection) {
                            case 'top':
                                this.dropdownTop = -1 *
                                    (this.dropdown.me.nativeElement.children[0].offsetHeight
                                        + this.select.nativeElement.offsetHeight
                                        - 1 // border
                                        + 0.3 // fix chrome ugly 1-pixel-render
                                    );
                                break;
                            case 'bottom':
                                this.dropdownTop = -1.1;
                                break;
                        }
                        return [2 /*return*/];
                }
            });
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
                .map(function (i) { return i.label; });
        }
    };
    SelectComponent.prototype.unselectItem = function (item) {
        item.selected = false;
        this.dropdown.value = this.dropdown.items
            .filter(function (i) { return i.selected; })
            .map(function (i) { return i.value; });
    };
    SelectComponent.prototype.displayValueTokens = function () {
        if (this.maxSelectableItems <= 1 || typeof this.displayValue === 'string')
            return false;
        else
            return true;
    };
    SelectComponent.prototype.selectItem = function (item) {
        this.dropdown.selectItem(item);
    };
    SelectComponent.prototype.onSelect = function (newValue) {
        this.value = newValue;
        if (this.maxSelectableItems == 1)
            this.expanded = false;
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
    core_1.HostBinding(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.ViewChild('dropdown'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "dropdown", void 0);
__decorate([
    core_1.ViewChild('select'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "select", void 0);
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
    __metadata("design:type", Object)
], SelectComponent.prototype, "displayValue", void 0);
__decorate([
    core_1.Output('change'),
    __metadata("design:type", Object)
], SelectComponent.prototype, "changeEE", void 0);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SelectComponent.prototype, "keydown", null);
__decorate([
    core_1.HostListener('tap', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SelectComponent.prototype, "doTap", null);
__decorate([
    core_1.HostListener('focus', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SelectComponent.prototype, "onFocus", null);
__decorate([
    core_1.HostListener('blur', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SelectComponent.prototype, "onBlur", null);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'vcl-select',
        templateUrl: 'select.component.html',
        /**
         * OnPush cannot be used because then the this.dropdownTop - style will not
         * be applied. Maybe this is a bug of ng2?
         */
        // changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], SelectComponent);
exports.SelectComponent = SelectComponent;
