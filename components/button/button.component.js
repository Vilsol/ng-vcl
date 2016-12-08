"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('rxjs/add/operator/distinctUntilChanged');
var core_1 = require('@angular/core');
var index_1 = require('../../core/index');
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
    ButtonContentDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[vcl-button-content]' },] },
    ];
    /** @nocollapse */
    ButtonContentDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
    ]; };
    ButtonContentDirective.propDecorators = {
        'state': [{ type: core_1.Input },],
    };
    return ButtonContentDirective;
}());
exports.ButtonContentDirective = ButtonContentDirective;
var ButtonComponent = (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(elementRef) {
        var _this = this;
        _super.call(this);
        this.elementRef = elementRef;
        this.pressed = false; // `true` if a pointer device is conducting a `down` gesture on the button
        this.focused = false; // `true` if the element is focused  (CSS' :focus)
        this.hovered = false; // `true` if a pointer device is hovering the button (CSS' :hover)
        this.selected = false;
        this.disabled = false;
        this.busy = false; // State to indicate that the button is disabled as a operation is in progress
        this.flexLabel = false;
        this.autoBlur = true;
        this._press = new core_1.EventEmitter();
        this._stateChange = new core_1.EventEmitter();
        this.state$ = this.observeChange('disabled', 'busy').publishBehavior(this.state).refCount().map(function () { return _this.state; }).distinctUntilChanged();
        this.label$ = this.state$.map(function (state) { return state === 'busy' && _this.busyLabel ? _this.busyLabel : _this.label; });
        this.prepIcon$ = this.state$.map(function (state) { return state === 'busy' && _this.prepIconBusy ? _this.prepIconBusy : _this.prepIcon; });
        this.appIcon$ = this.state$.map(function (state) { return state === 'busy' && _this.appIconBusy ? _this.appIconBusy : _this.appIcon; });
        this.buttonContent = null;
        this.stateSub = this.state$.subscribe(function (state) {
            if (_this.buttonContent) {
                _this.buttonContent.forEach(function (bc) { return bc.render(state); });
            }
            _this._stateChange.emit(state);
        });
        this.pressSub = this.press.subscribe(function () {
            if (_this.autoBlur) {
                if (_this.elementRef.nativeElement && _this.elementRef.nativeElement.blur) {
                    _this.elementRef.nativeElement.blur();
                }
            }
        });
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
    ButtonComponent.prototype.onMouseEnter = function (e) { this.hovered = true; };
    ButtonComponent.prototype.onMouseLeave = function (e) { this.hovered = false; };
    ButtonComponent.prototype.onMouseUp = function (e) { this.pressed = false; };
    ButtonComponent.prototype.onMouseDown = function (e) { this.pressed = true; };
    ButtonComponent.prototype.onFocus = function (e) { this.focused = true; };
    ButtonComponent.prototype.onBlur = function (e) { this.focused = false; };
    ButtonComponent.prototype.onTap = function (e) { this._press.emit(e); };
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
    ButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[vcl-button]',
                    host: {
                        '[class.vclButton]': 'true',
                    },
                    templateUrl: 'button.component.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ButtonComponent.propDecorators = {
        'hovered': [{ type: core_1.HostBinding, args: ['class.vclHovered',] },],
        'selected': [{ type: core_1.Input }, { type: core_1.HostBinding, args: ['class.vclSelected',] },],
        'title': [{ type: core_1.HostBinding, args: ['attr.aria-label',] }, { type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'isDisabled': [{ type: core_1.HostBinding, args: ['attr.disabled',] },],
        'busy': [{ type: core_1.Input },],
        'flexLabel': [{ type: core_1.Input },],
        'busyLabel': [{ type: core_1.Input },],
        'label': [{ type: core_1.Input },],
        'prepIcon': [{ type: core_1.Input },],
        'prepIconBusy': [{ type: core_1.Input },],
        'autoBlur': [{ type: core_1.Input },],
        'appIcon': [{ type: core_1.Input },],
        'appIconBusy': [{ type: core_1.Input },],
        'press': [{ type: core_1.Output },],
        'stateChange': [{ type: core_1.Output },],
        'buttonContent': [{ type: core_1.ContentChildren, args: [ButtonContentDirective,] },],
        'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter', ['$event'],] },],
        'onMouseLeave': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
        'onMouseUp': [{ type: core_1.HostListener, args: ['mouseup', ['$event'],] },],
        'onMouseDown': [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] },],
        'onFocus': [{ type: core_1.HostListener, args: ['onfocus', ['$event'],] },],
        'onBlur': [{ type: core_1.HostListener, args: ['onblur', ['$event'],] },],
        'onTap': [{ type: core_1.HostListener, args: ['tap', ['$event'],] },],
    };
    return ButtonComponent;
}(index_1.ObservableComponent));
exports.ButtonComponent = ButtonComponent;
