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
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var store_1 = require('./store');
var actions_1 = require('./actions');
var utils_1 = require('./utils');
var effects_1 = require('./effects');
exports.initialRouterState = {
    url: ''
};
var RouterNavigateAction = (function () {
    function RouterNavigateAction(commands, extras) {
        this.commands = commands;
        this.extras = extras;
    }
    return RouterNavigateAction;
}());
exports.RouterNavigateAction = RouterNavigateAction;
var RouterNavigateByUrlAction = (function () {
    function RouterNavigateByUrlAction(url, extras) {
        this.url = url;
        this.extras = extras;
    }
    return RouterNavigateByUrlAction;
}());
exports.RouterNavigateByUrlAction = RouterNavigateByUrlAction;
var RouterUrlUpdateAction = (function () {
    function RouterUrlUpdateAction(url) {
        this.url = url;
    }
    return RouterUrlUpdateAction;
}());
exports.RouterUrlUpdateAction = RouterUrlUpdateAction;
var StoreRouterEffects = (function () {
    function StoreRouterEffects(router, store, actions$) {
        var _this = this;
        this.router = router;
        this.store = store;
        this.actions$ = actions$;
        this.routerSub = this.router
            .events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function (event) { return event.url; })
            .subscribe(function (url) {
            _this.store.dispatch(new RouterUrlUpdateAction(url));
        });
        this.navigateEffect = this.actions$
            .ofType(RouterNavigateAction)
            .map(function (action) {
            _this.router.navigate(action.commands, action.extras);
        });
        this.navigateByUrlEffect = this.actions$
            .ofType(RouterNavigateByUrlAction)
            .map(function (action) {
            _this.router.navigateByUrl(action.url, action.extras);
        });
    }
    StoreRouterEffects.prototype.ngOnDestroy = function () {
        if (this.routerSub && !this.routerSub.closed)
            this.routerSub.unsubscribe();
    };
    StoreRouterEffects.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StoreRouterEffects.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: store_1.Store, },
        { type: actions_1.StoreActions, },
    ]; };
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], StoreRouterEffects.prototype, "navigateEffect", void 0);
    __decorate([
        effects_1.Effect(), 
        __metadata('design:type', Object)
    ], StoreRouterEffects.prototype, "navigateByUrlEffect", void 0);
    return StoreRouterEffects;
}());
exports.StoreRouterEffects = StoreRouterEffects;
var StoreRouter = (function () {
    function StoreRouter(store) {
        this.store = store;
    }
    StoreRouter.prototype.navigate = function (commands, extras) {
        this.store.dispatch(new RouterNavigateAction(commands, extras));
    };
    StoreRouter.prototype.navigateByUrl = function (url, extras) {
        this.store.dispatch(new RouterNavigateByUrlAction(url, extras));
    };
    StoreRouter.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StoreRouter.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return StoreRouter;
}());
exports.StoreRouter = StoreRouter;
exports.routerReducer = utils_1.combineReducers({
    router: function (state, action) {
        if (state === void 0) { state = exports.initialRouterState; }
        if (action instanceof RouterUrlUpdateAction) {
            return {
                url: action.url
            };
        }
        return state;
    }
});
