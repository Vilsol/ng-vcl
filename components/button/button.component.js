"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/publishBehavior");
var core_1 = require("@angular/core");
var index_1 = require("../../core/index");
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["Click"] = 0] = "Click";
    InteractionType[InteractionType["Tap"] = 1] = "Tap";
})(InteractionType || (InteractionType = {}));
var ButtonContentDirective = (function () {
    function ButtonContentDirective(viewContainerRef, tempRef) {
        this.viewContainerRef = viewContainerRef;
        this.tempRef = tempRef;
        this.hasView = false;
        this.state = 'enabled';
    }
    ButtonContentDirective.prototype.render = function (state) {
        if (this.state === state) {
            this.hasView = true;
            this.viewContainerRef.createEmbeddedView(this.tempRef);
        }
        else {
            this.hasView = false;
            this.viewContainerRef.clear();
        }
    };
    return ButtonContentDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonContentDirective.prototype, "state", void 0);
ButtonContentDirective = __decorate([
    core_1.Directive({ selector: '[vcl-button-content]' }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.TemplateRef])
], ButtonContentDirective);
exports.ButtonContentDirective = ButtonContentDirective;
function dispatch(el, eventType) {
    var x = 10, y = 10;
    var msEventType = window.MSPointerEvent &&
        eventType.replace(/pointer([a-z])/, function (_, a) { return 'MSPointer' + a.toUpperCase(); });
    var event = document.createEvent('Event');
    event.initEvent(msEventType || eventType, true, true);
    event.getCurrentPoint = function () { return ({ x: x, y: y }); };
    event.setPointerCapture = event.releasePointerCapture = function () { };
    event.pointerId = 0;
    event.buttons = 1;
    event.pageX = x;
    event.pageY = y;
    event.clientX = x;
    event.clientY = y;
    event.screenX = x;
    event.screenY = y;
    event.pointerType = 'touch';
    event.identifier = 0;
    el.dispatchEvent(event);
}
function dispatchTap(el) {
    dispatch(el, 'pointerdown');
    setTimeout(function () {
        dispatch(el, 'pointerup');
    }, 100);
}
var ButtonComponent = (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.latestInteractionTime = 0;
        _this.pressed = false; // `true` if a pointer device is conducting a `down` gesture on the button
        _this.focused = false; // `true` if the element is focused  (CSS' :focus)
        _this.hovered = false; // `true` if a pointer device is hovering the button (CSS' :hover)
        _this.selected = false;
        _this.disabled = false;
        _this.disableA11yClick = false;
        _this.busy = false; // State to indicate that the button is disabled as a operation is in progress
        _this.flexLabel = false;
        _this.autoBlur = true;
        _this._press = new core_1.EventEmitter();
        _this._stateChange = new core_1.EventEmitter();
        _this.state$ = _this.observeChange('disabled', 'busy', 'label', 'busyLabel', 'appIcon', 'appIconBusy').publishBehavior(_this.state).refCount().map(function () { return _this.state; });
        _this.label$ = _this.state$.map(function (state) { return state === 'busy' && _this.busyLabel ? _this.busyLabel : _this.label; });
        _this.prepIcon$ = _this.state$.map(function (state) { return state === 'busy' && _this.prepIconBusy ? _this.prepIconBusy : _this.prepIcon; });
        _this.appIcon$ = _this.state$.map(function (state) { return state === 'busy' && _this.appIconBusy ? _this.appIconBusy : _this.appIcon; });
        _this.buttonContent = null;
        _this.stateSub = _this.state$.subscribe(function (state) {
            if (_this.buttonContent) {
                _this.buttonContent.forEach(function (bc) { return bc.render(state); });
            }
            _this._stateChange.emit(state);
        });
        _this.pressSub = _this.press.subscribe(function () {
            if (_this.autoBlur) {
                if (_this.elementRef.nativeElement && _this.elementRef.nativeElement.blur) {
                    _this.elementRef.nativeElement.blur();
                }
            }
        });
        return _this;
    }
    Object.defineProperty(ButtonComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "press", {
        get: function () {
            return this._press.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "stateChange", {
        get: function () {
            return this._stateChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "state", {
        get: function () {
            return this.disabled ? 'disabled' : (this.busy ? 'busy' : 'enabled');
        },
        enumerable: true,
        configurable: true
    });
    ButtonComponent.prototype.onKeypress = function (ev) {
        // Trigger a11yClick
        if (!this.disableA11yClick &&
            this.elementRef.nativeElement &&
            (ev.code === 'Space' ||
                ev.code === 'NumpadEnter' ||
                ev.code === 'Enter')) {
            ev.preventDefault();
            this.elementRef.nativeElement.click();
            dispatchTap(this.elementRef.nativeElement);
        }
    };
    ButtonComponent.prototype.onMouseEnter = function (e) { this.hovered = true; };
    ButtonComponent.prototype.onMouseLeave = function (e) { this.hovered = false; };
    ButtonComponent.prototype.onMouseUp = function (e) { this.pressed = false; };
    ButtonComponent.prototype.onMouseDown = function (e) { this.pressed = true; };
    ButtonComponent.prototype.onFocus = function (e) { this.focused = true; };
    ButtonComponent.prototype.onBlur = function (e) { this.focused = false; };
    ButtonComponent.prototype.onTap = function (e) {
        this.handleGhostClick(InteractionType.Tap, event);
    };
    ButtonComponent.prototype.onClick = function (e) {
        this.handleGhostClick(InteractionType.Click, event);
    };
    ButtonComponent.prototype.handleGhostClick = function (type, e) {
        var ANTI_GHOST_DELAY = 2000;
        var now = Date.now();
        if (type !== this.latestInteractionType) {
            if ((now - this.latestInteractionTime) > ANTI_GHOST_DELAY) {
                this.latestInteractionType = type;
                this._press.emit(e);
            }
        }
        else {
            this.latestInteractionType = type;
            this._press.emit(e);
        }
        this.latestInteractionTime = now;
    };
    ButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.buttonContent.forEach(function (bc) { return bc.render(_this.state); });
    };
    ButtonComponent.prototype.ngOnDestoy = function () {
        if (this.stateSub && !this.stateSub.closed)
            this.stateSub.unsubscribe();
        if (this.pressSub && !this.pressSub.closed)
            this.pressSub.unsubscribe();
    };
    return ButtonComponent;
}(index_1.ObservableComponent));
__decorate([
    core_1.HostBinding('class.vclHovered'),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "hovered", void 0);
__decorate([
    core_1.Input(),
    core_1.HostBinding('class.vclSelected'),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "selected", void 0);
__decorate([
    core_1.HostBinding('attr.aria-label'),
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "disableA11yClick", void 0);
__decorate([
    core_1.HostBinding('attr.disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonComponent.prototype, "isDisabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "busy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "flexLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "busyLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "prepIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "prepIconBusy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "autoBlur", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "appIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "appIconBusy", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Observable_1.Observable),
    __metadata("design:paramtypes", [])
], ButtonComponent.prototype, "press", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Observable_1.Observable),
    __metadata("design:paramtypes", [])
], ButtonComponent.prototype, "stateChange", null);
__decorate([
    core_1.ContentChildren(ButtonContentDirective),
    __metadata("design:type", core_1.QueryList)
], ButtonComponent.prototype, "buttonContent", void 0);
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onKeypress", null);
__decorate([
    core_1.HostListener('mouseenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onMouseLeave", null);
__decorate([
    core_1.HostListener('mouseup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onMouseUp", null);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onMouseDown", null);
__decorate([
    core_1.HostListener('onfocus', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onFocus", null);
__decorate([
    core_1.HostListener('onblur', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onBlur", null);
__decorate([
    core_1.HostListener('tap', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onTap", null);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ButtonComponent.prototype, "onClick", null);
ButtonComponent = __decorate([
    core_1.Component({
        selector: '[vcl-button]',
        host: {
            '[class.vclButton]': 'true',
        },
        templateUrl: 'button.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ButtonComponent);
exports.ButtonComponent = ButtonComponent;
