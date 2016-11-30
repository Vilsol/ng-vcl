"use strict";
var store_1 = require('./store');
var actions_1 = require('./actions');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var utils_1 = require('./utils');
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
var RouterUrlUpdateAction = (function () {
    function RouterUrlUpdateAction(url) {
        this.url = url;
    }
    return RouterUrlUpdateAction;
}());
exports.RouterUrlUpdateAction = RouterUrlUpdateAction;
var StoreRouter = (function () {
    function StoreRouter(router, store, actions$) {
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
    }
    // @Effect()
    // private navigateEffect = this.actions$.ofType(RouterNavigateAction).do((action: RouterNavigateAction) => {
    //   this.router.navigate(action.commands, action.extras);
    // });
    StoreRouter.prototype.navigate = function (commands, extras) {
        this.store.dispatch(new RouterNavigateAction(commands, extras));
    };
    StoreRouter.prototype.ngOnDestroy = function () {
        if (this.routerSub && !this.routerSub.closed)
            this.routerSub.unsubscribe();
    };
    StoreRouter.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StoreRouter.ctorParameters = [
        { type: router_1.Router, },
        { type: store_1.Store, },
        { type: actions_1.StoreActions, },
    ];
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
