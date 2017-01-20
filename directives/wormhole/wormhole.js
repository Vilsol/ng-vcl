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
var core_1 = require("@angular/core");
var Wormhole = (function () {
    function Wormhole() {
    }
    return Wormhole;
}());
exports.Wormhole = Wormhole;
var TemplateWormhole = (function (_super) {
    __extends(TemplateWormhole, _super);
    // The wormhole directive needs a reference to the template
    function TemplateWormhole(templateRef) {
        var _this = _super.call(this) || this;
        _this.templateRef = templateRef;
        return _this;
    }
    Object.defineProperty(TemplateWormhole.prototype, "isConnected", {
        get: function () {
            return !!(this.viewRef && this.viewContainerRef);
        },
        enumerable: true,
        configurable: true
    });
    TemplateWormhole.prototype.connect = function (viewContainerRef) {
        var _this = this;
        this.disconnect();
        this.viewContainerRef = viewContainerRef;
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.viewRef.onDestroy(function () {
            _this.viewRef = null;
        });
    };
    TemplateWormhole.prototype.disconnect = function () {
        if (this.isConnected) {
            var i = this.viewContainerRef.indexOf(this.viewRef);
            if (i >= 0)
                this.viewContainerRef.remove(i);
        }
    };
    return TemplateWormhole;
}(Wormhole));
TemplateWormhole = __decorate([
    core_1.Directive({
        selector: '[wormhole]',
        exportAs: 'wormhole',
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], TemplateWormhole);
exports.TemplateWormhole = TemplateWormhole;
var ComponentWormhole = (function (_super) {
    __extends(ComponentWormhole, _super);
    function ComponentWormhole(componentClass, initialData) {
        if (initialData === void 0) { initialData = {}; }
        var _this = _super.call(this) || this;
        _this.componentClass = componentClass;
        _this.data = initialData;
        return _this;
    }
    Object.defineProperty(ComponentWormhole.prototype, "isConnected", {
        get: function () {
            return !!(this.compRef && this.viewContainerRef);
        },
        enumerable: true,
        configurable: true
    });
    ComponentWormhole.prototype.connect = function (viewContainerRef) {
        this.destroyComponent();
        this.viewContainerRef = viewContainerRef;
        this.initializeComponent();
    };
    ComponentWormhole.prototype.disconnect = function () {
        this.destroyComponent();
    };
    ComponentWormhole.prototype.initializeComponent = function () {
        var _this = this;
        if (!this.injector) {
            this.injector = this.createInjector();
        }
        if (!this.compFactory) {
            var componentFactoryResolver = this.injector.get(core_1.ComponentFactoryResolver);
            this.compFactory = componentFactoryResolver.resolveComponentFactory(this.componentClass);
        }
        this.destroyComponent();
        this.compRef = this.viewContainerRef.createComponent(this.compFactory, this.viewContainerRef.length, this.injector);
        this.compRef.onDestroy(function () {
            _this.compRef = null;
        });
        if (this.data && typeof this.data === 'object') {
            Object.assign(this.compRef.instance, this.data);
        }
        this.compRef.changeDetectorRef.detectChanges();
    };
    ComponentWormhole.prototype.destroyComponent = function () {
        if (this.isConnected) {
            var i = this.viewContainerRef.indexOf(this.compRef.hostView);
            if (i >= 0)
                this.viewContainerRef.remove(i);
        }
    };
    ComponentWormhole.prototype.createInjector = function () {
        return this.viewContainerRef.parentInjector;
    };
    ComponentWormhole.prototype.setData = function (data) {
        this.data = data;
        if (this.isConnected && this.data && typeof this.data === 'object') {
            // TODO: Change detection is not triggering
            // this.compRef.changeDetectorRef.markForCheck();
            // this.compRef.changeDetectorRef.detectChanges();
            // Workaround
            // if call markForCheck on component instance or reinitialize component
            if (this.compRef.instance.markForCheck) {
                Object.assign(this.compRef.instance, this.data);
                this.compRef.instance.markForCheck();
            }
            else {
                this.initializeComponent();
            }
        }
    };
    return ComponentWormhole;
}(Wormhole));
exports.ComponentWormhole = ComponentWormhole;
var ConnectWormholeDirective = (function () {
    function ConnectWormholeDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(ConnectWormholeDirective.prototype, "isAttached", {
        get: function () {
            return !!this.wormhole;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectWormholeDirective.prototype, "connectWormhole", {
        set: function (wormhole) {
            if (this.isAttached) {
                this.detach();
            }
            this.attach(wormhole);
        },
        enumerable: true,
        configurable: true
    });
    ConnectWormholeDirective.prototype.attach = function (wormhole) {
        this.wormhole = wormhole;
        wormhole.connect(this.viewContainerRef);
    };
    ConnectWormholeDirective.prototype.detach = function () {
        if (this.isAttached) {
            this.wormhole.disconnect();
        }
    };
    ConnectWormholeDirective.prototype.ngOnDestroy = function () {
        if (this.isAttached) {
            this.detach();
        }
    };
    return ConnectWormholeDirective;
}());
__decorate([
    core_1.Input('connectWormhole'),
    __metadata("design:type", Wormhole),
    __metadata("design:paramtypes", [Wormhole])
], ConnectWormholeDirective.prototype, "connectWormhole", null);
ConnectWormholeDirective = __decorate([
    core_1.Directive({
        selector: '[connectWormhole]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], ConnectWormholeDirective);
exports.ConnectWormholeDirective = ConnectWormholeDirective;
