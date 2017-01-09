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
    Object.defineProperty(Wormhole.prototype, "isConnected", {
        get: function () {
            return !!this.bridge;
        },
        enumerable: true,
        configurable: true
    });
    Wormhole.prototype.disconnect = function () {
        this.detach();
        this.bridge = null;
    };
    Wormhole.prototype.connect = function (bridge) {
        if (this.bridge) {
            this.disconnect();
        }
        this.bridge = bridge;
        this.attach();
    };
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
    TemplateWormhole.prototype.attach = function () {
        var _this = this;
        this.viewRef = this.bridge.viewContainerRef.createEmbeddedView(this.templateRef);
        this.viewRef.onDestroy(function () {
            _this.viewRef = null;
        });
    };
    TemplateWormhole.prototype.detach = function () {
        if (this.viewRef) {
            var i = this.bridge.viewContainerRef.indexOf(this.viewRef);
            if (i >= 0)
                this.bridge.viewContainerRef.remove(i);
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
    function ComponentWormhole(componentClass, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        _this.componentClass = componentClass;
        _this.injector = opts.injector;
        _this.data = opts.data;
        return _this;
    }
    ComponentWormhole.prototype.attach = function () {
        var _this = this;
        var viewContainerRef = this.bridge.viewContainerRef;
        var componentFactory = this.bridge.componentFactoryResolver.resolveComponentFactory(this.componentClass);
        this.compRef = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, this.injector || viewContainerRef.parentInjector);
        this.compRef.onDestroy(function () {
            _this.compRef = null;
        });
        this.setData(this.data);
    };
    ComponentWormhole.prototype.detach = function () {
        if (this.compRef) {
            var i = this.bridge.viewContainerRef.indexOf(this.compRef.hostView);
            if (i >= 0)
                this.bridge.viewContainerRef.remove(i);
        }
    };
    ComponentWormhole.prototype.setData = function (data) {
        if (data && typeof data === 'object') {
            if (this.compRef && !this.compRef.hostView.destroyed) {
                Object.assign(this.compRef.instance, data);
                this.compRef.changeDetectorRef.detectChanges();
            }
            else {
                this.data = data;
            }
        }
    };
    return ComponentWormhole;
}(Wormhole));
exports.ComponentWormhole = ComponentWormhole;
var ConnectWormholeDirective = (function () {
    function ConnectWormholeDirective(viewContainerRef, componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        // TODO: workaround. Does not disconnect the view when destroying the element when true
        // ngOnDestroy is called before the animations are fully traversed. This would remove the wormhole's ContentChild
        // before its host is removed from the DOM
        this.indisposable = false;
    }
    Object.defineProperty(ConnectWormholeDirective.prototype, "isConnected", {
        get: function () {
            return !!this.connectedWormhole;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectWormholeDirective.prototype, "connectWormhole", {
        set: function (wormhole) {
            if (this.isConnected) {
                this.disconnect();
            }
            if (wormhole) {
                this.connect(wormhole);
                this.wormhole = wormhole;
            }
        },
        enumerable: true,
        configurable: true
    });
    ConnectWormholeDirective.prototype.connect = function (wormhole) {
        this.connectedWormhole = wormhole;
        wormhole.connect(this);
    };
    ConnectWormholeDirective.prototype.disconnect = function () {
        if (this.connectedWormhole) {
            this.connectedWormhole.disconnect();
        }
    };
    ConnectWormholeDirective.prototype.ngOnDestroy = function () {
        if (this.isConnected && !this.indisposable) {
            this.disconnect();
        }
    };
    return ConnectWormholeDirective;
}());
__decorate([
    core_1.Input('wormholeIndisposable'),
    __metadata("design:type", Boolean)
], ConnectWormholeDirective.prototype, "indisposable", void 0);
__decorate([
    core_1.Input('connectWormhole'),
    __metadata("design:type", Wormhole),
    __metadata("design:paramtypes", [Wormhole])
], ConnectWormholeDirective.prototype, "connectWormhole", null);
ConnectWormholeDirective = __decorate([
    core_1.Directive({
        selector: '[connectWormhole]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.ComponentFactoryResolver])
], ConnectWormholeDirective);
exports.ConnectWormholeDirective = ConnectWormholeDirective;
