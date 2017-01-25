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
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropdownComponent; }),
    multi: true
};
var DropdownComponent = (function () {
    function DropdownComponent(me) {
        this.change$ = new core_1.EventEmitter();
        this.tabindex = 0;
        this.expanded = false;
        this.maxSelectableItems = 1;
        this.minSelectableItems = 1;
        this.ariaRole = 'listbox';
        this.listenKeys = false;
        this.me = me;
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
    DropdownComponent.prototype.markNext = function () {
        if (this.items.length == 0)
            return;
        var ix = this.items.findIndex(function (i) { return i.marked == true; });
        if (this.items[ix])
            this.items[ix].marked = false;
        if (ix < 0 ||
            !this.items[ix + 1])
            this.items[0].marked = true;
        else
            this.items[ix + 1].marked = true;
    };
    DropdownComponent.prototype.markPrev = function () {
        if (this.items.length == 0)
            return;
        var ix = this.items.findIndex(function (i) { return i.marked == true; });
        if (this.items[ix])
            this.items[ix].marked = false;
        if (ix <= 0)
            this.items[this.items.length - 1].marked = true;
        else
            this.items[ix - 1].marked = true;
    };
    DropdownComponent.prototype.selectMarked = function () {
        var firstMarked = this.items.filter(function (i) { return i.marked == true; })[0];
        this.selectItem(firstMarked);
    };
    DropdownComponent.prototype.scrollToMarked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemEl, boxHeight, isTop, itemHeight, itemTop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 0); })];
                    case 1:
                        _a.sent();
                        itemEl = this.listbox.nativeElement.querySelectorAll('.vclHighlighted')[0];
                        if (!itemEl)
                            return [2 /*return*/];
                        boxHeight = this.listbox.nativeElement.offsetHeight;
                        isTop = this.listbox.nativeElement.scrollTop;
                        itemHeight = itemEl.offsetHeight;
                        itemTop = itemEl.offsetTop;
                        // to low
                        if ((itemTop + itemHeight) > (isTop + boxHeight))
                            this.listbox.nativeElement.scrollTop = itemTop;
                        // to height
                        if (itemTop < isTop)
                            this.listbox.nativeElement.scrollTop = itemTop;
                        return [2 /*return*/];
                }
            });
        });
    };
    DropdownComponent.prototype.keyboardInput = function (ev) {
        if (!this.listenKeys)
            return;
        var prevent = true;
        switch (ev.code) {
            case 'ArrowDown':
                this.markNext();
                this.scrollToMarked();
                break;
            case 'ArrowUp':
                this.markPrev();
                this.scrollToMarked();
                break;
            case 'Enter':
                this.selectMarked();
                this.scrollToMarked();
                break;
            case 'Space':
                this.listbox.nativeElement.scrollTop += 10;
                break;
            default:
                var prevent_1 = false;
        }
        prevent && ev.preventDefault();
    };
    DropdownComponent.prototype.writeValue = function (v) {
        if (!v) {
            this.value = '';
            return;
        }
        if (typeof this.value === 'undefined' ||
            v.toString() != this.value.toString())
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
    core_1.ViewChild('listbox'),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "listbox", void 0);
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
    __metadata("design:type", Boolean)
], DropdownComponent.prototype, "listenKeys", void 0);
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
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        host: { '(window:keydown)': 'keyboardInput($event)' }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
