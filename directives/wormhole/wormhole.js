"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
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
        _super.call(this);
        this.templateRef = templateRef;
    }
    TemplateWormhole.prototype.attach = function () {
        this.viewRef = this.bridge.viewContainerRef.createEmbeddedView(this.templateRef);
    };
    TemplateWormhole.prototype.detach = function () {
        if (this.viewRef) {
            var i = this.bridge.viewContainerRef.indexOf(this.viewRef);
            if (i >= 0)
                this.bridge.viewContainerRef.remove(i);
        }
    };
    TemplateWormhole.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[wormhole]',
                    exportAs: 'wormhole',
                },] },
    ];
    /** @nocollapse */
    TemplateWormhole.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return TemplateWormhole;
}(Wormhole));
exports.TemplateWormhole = TemplateWormhole;
var ComponentWormhole = (function (_super) {
    __extends(ComponentWormhole, _super);
    function ComponentWormhole(componentClass, opts) {
        if (opts === void 0) { opts = {}; }
        _super.call(this);
        this.componentClass = componentClass;
        this.injector = opts.injector;
        this.data = opts.data;
    }
    ComponentWormhole.prototype.attach = function () {
        var viewContainerRef = this.bridge.viewContainerRef;
        var componentFactory = this.bridge.componentFactoryResolver.resolveComponentFactory(this.componentClass);
        this.compRef = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, this.injector || viewContainerRef.parentInjector);
        this.setData(this.data);
    };
    ComponentWormhole.prototype.detach = function () {
        if (this.compRef) {
            var i = this.bridge.viewContainerRef.indexOf(this.compRef.hostView);
            if (i >= 0)
                this.bridge.viewContainerRef.remove(i);
            this.compRef.destroy();
        }
        this.compRef = null;
    };
    ComponentWormhole.prototype.setData = function (data) {
        if (data && typeof data === 'object') {
            Object.assign(this.compRef.instance, data);
            this.compRef.changeDetectorRef.detectChanges();
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
    ConnectWormholeDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[connectWormhole]'
                },] },
    ];
    /** @nocollapse */
    ConnectWormholeDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    ConnectWormholeDirective.propDecorators = {
        'indisposable': [{ type: core_1.Input, args: ['wormholeIndisposable',] },],
        'connectWormhole': [{ type: core_1.Input, args: ['connectWormhole',] },],
    };
    return ConnectWormholeDirective;
}());
exports.ConnectWormholeDirective = ConnectWormholeDirective;
