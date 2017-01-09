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
    return WormholeService;
}());
WormholeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ApplicationRef, core_1.ComponentFactoryResolver, core_1.Injector])
], WormholeService);
exports.WormholeService = WormholeService;
