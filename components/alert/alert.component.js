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
var Subject_1 = require("rxjs/Subject");
var core_1 = require("@angular/core");
var layer_module_1 = require("./../layer/layer.module");
var types_1 = require("./types");
// TODO: support text, password, textarea, select, radio, checkbox file.
var AlertInputComponent = (function () {
    function AlertInputComponent() {
        this.alert = {};
        this.valueChange = new core_1.EventEmitter();
        this.inputValue = '';
    }
    AlertInputComponent.prototype.ngOnInit = function () {
        if (this.control === 'input' && typeof this.alert.inputValue === 'string') {
            this.inputValue = this.alert.inputValue;
        }
    };
    AlertInputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.input && this.input.nativeElement && this.input.nativeElement.focus) {
            setTimeout(function () { return _this.input.nativeElement.focus(); }, 1);
        }
        ;
    };
    Object.defineProperty(AlertInputComponent.prototype, "control", {
        get: function () {
            switch (this.alert.input) {
                case types_1.AlertInput.Text: return 'input';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertInputComponent.prototype, "placeholder", {
        get: function () {
            return this.alert.inputPlaceholder || '';
        },
        enumerable: true,
        configurable: true
    });
    AlertInputComponent.prototype.inputValueChange = function (value) {
        this.valueChange.emit(value);
    };
    return AlertInputComponent;
}());
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", Object)
], AlertInputComponent.prototype, "input", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AlertInputComponent.prototype, "alert", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AlertInputComponent.prototype, "valueChange", void 0);
AlertInputComponent = __decorate([
    core_1.Component({
        templateUrl: 'alert-input.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: 'alert-input'
    })
], AlertInputComponent);
exports.AlertInputComponent = AlertInputComponent;
var AlertComponent = (function () {
    function AlertComponent(layerRef, layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        this.alert = {};
        this.layerRef = layerRef;
    }
    Object.defineProperty(AlertComponent.prototype, "alertOpts", {
        set: function (opts) {
            this.updateAlertOpts(types_1.ALERT_DEFAULTS, opts);
        },
        enumerable: true,
        configurable: true
    });
    ;
    AlertComponent.prototype.updateAlertOpts = function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        this.alert = Object.assign.apply(Object, [{}, this.alert].concat(opts));
    };
    // Close the top layer when escape is pressed
    AlertComponent.prototype.onKeyUp = function (ev) {
        if (this.layerService.getVisibleLayers().pop() === this.layerRef) {
            if (ev.key === 'Escape' && this.alert.escClose) {
                this.dismiss('esc');
            }
            else if (ev.key === 'Enter') {
                this.confirm();
            }
        }
    };
    Object.defineProperty(AlertComponent.prototype, "alertClass", {
        get: function () {
            return types_1.TYPE_CLASS_MAP[this.alert.type || types_1.AlertType.None].alertClass + ' ' + this.alert.customClass || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "iconClass", {
        get: function () {
            return types_1.TYPE_CLASS_MAP[this.alert.type || types_1.AlertType.None].iconClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "titleAlignmentClass", {
        get: function () {
            return types_1.TEXT_ALIGNMENT_CLASS_MAP[this.alert.titleAlignment || types_1.AlertAlignment.Left];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "iconAlignmentClass", {
        get: function () {
            return types_1.TEXT_ALIGNMENT_CLASS_MAP[this.alert.iconAlignment || types_1.AlertAlignment.Center];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "contentAlignmentClass", {
        get: function () {
            return types_1.TEXT_ALIGNMENT_CLASS_MAP[this.alert.contentAlignment || types_1.AlertAlignment.Left];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "buttonAlignmentClass", {
        get: function () {
            return types_1.BUTTON_ALIGNMENT_CLASS_MAP[this.alert.buttonAlignment || types_1.AlertAlignment.Right];
        },
        enumerable: true,
        configurable: true
    });
    AlertComponent.prototype.confirm = function () {
        if (this.alert.loader)
            return;
        var result = {};
        if (this.alert.input) {
            if (this.alert.inputValidator) {
                var validationError = 'Invalid value';
                try {
                    var valid = this.alert.inputValidator(this.value);
                    if (!valid) {
                        this.validationError = 'Invalid value';
                        return;
                    }
                    result.value = this.value;
                }
                catch (ex) {
                    this.validationError = String(ex);
                    return;
                }
            }
        }
        if (this.alert.loaderOnConfirm) {
            this.updateAlertOpts({ loader: true });
            this.layerRef.send(result);
        }
        else {
            this.layerRef.close(result);
        }
    };
    AlertComponent.prototype.dismiss = function (reason) {
        this.layerRef.closeWithError(new types_1.AlertError(reason));
    };
    AlertComponent.prototype.cancel = function (reason) {
        this.dismiss('cancel');
    };
    AlertComponent.prototype.offClick = function () {
        this.dismiss('offClick');
    };
    AlertComponent.prototype.close = function (reason) {
        this.dismiss('close');
    };
    AlertComponent.prototype.valueChange = function (value) {
        this.value = value;
    };
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.offClickSub = this.layerRef.offClick$.subscribe(function () { return _this.offClick(); });
    };
    AlertComponent.prototype.ngOnDestroy = function () {
        if (this.offClickSub && !this.offClickSub.closed)
            this.offClickSub.unsubscribe();
    };
    return AlertComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AlertComponent.prototype, "alertOpts", null);
__decorate([
    core_1.HostListener('document:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], AlertComponent.prototype, "onKeyUp", null);
AlertComponent = __decorate([
    core_1.Component({
        templateUrl: 'alert.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [layer_module_1.LayerRef, layer_module_1.LayerService, core_1.ChangeDetectorRef])
], AlertComponent);
exports.AlertComponent = AlertComponent;
var AlertLayer = (function (_super) {
    __extends(AlertLayer, _super);
    function AlertLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.component = AlertComponent;
        _this.modal = true;
        _this.transparent = true;
        _this.offClick$ = new Subject_1.Subject();
        return _this;
    }
    AlertLayer.prototype.offClick = function () {
        this.offClick$.next();
    };
    return AlertLayer;
}(layer_module_1.ComponentLayerRef));
AlertLayer = __decorate([
    core_1.Injectable()
], AlertLayer);
exports.AlertLayer = AlertLayer;
;
