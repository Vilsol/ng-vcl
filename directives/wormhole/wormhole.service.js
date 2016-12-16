"use strict";
var core_1 = require('@angular/core');
var WormholeService = (function () {
    function WormholeService(appRef, componentFactoryResolver, defaultInjector) {
        var _this = this;
        this.appRef = appRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.defaultInjector = defaultInjector;
        this.bootstrapReady = new Promise(function (resolve) {
            _this.bootstrapReadyResolve = resolve;
        });
    }
    WormholeService.prototype.ready = function () {
        this.bootstrapReadyResolve();
    };
    WormholeService.prototype.attachComponent = function (componentClass, node) {
        var _this = this;
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.defaultInjector);
        var componentRefRootNode = this.getComponentRootNode(componentRef);
        this.appRef.attachView(componentRef.hostView);
        this.getNode(node).then(function (targetNode) {
            if (targetNode) {
                targetNode.appendChild(componentRefRootNode);
            }
        });
        return {
            componentRef: componentRef,
            dispose: function () {
                _this.appRef.detachView(componentRef.hostView);
                _this.getNode(node).then(function (targetNode) {
                    if (targetNode) {
                        targetNode.removeChild(componentRefRootNode);
                    }
                });
            }
        };
    };
    WormholeService.prototype.getNode = function (node) {
        var _this = this;
        if (node) {
            return Promise.resolve(node);
        }
        else {
            return this.bootstrapReady.then(function () {
                var rootComponents = _this.appRef['_rootComponents'];
                var rootComponent = rootComponents.length && rootComponents[0];
                if (!rootComponent) {
                    console.log('Root View Container not found');
                    return null;
                }
                return _this.getComponentRootNode(rootComponent);
            });
        }
    };
    WormholeService.prototype.getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    WormholeService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    WormholeService.ctorParameters = function () { return [
        { type: core_1.ApplicationRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Injector, },
    ]; };
    return WormholeService;
}());
exports.WormholeService = WormholeService;
