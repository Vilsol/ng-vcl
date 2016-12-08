"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var utils_1 = require('./utils');
var core_1 = require('@angular/core');
var store_1 = require('./store');
var actions_1 = require('./actions');
var effects_1 = require('./effects');
var router_1 = require('./router');
__export(require('./actions'));
__export(require('./utils'));
__export(require('./effects'));
__export(require('./observable'));
__export(require('./store'));
__export(require('./router'));
exports.STORE_FORROOT_GUARD = new core_1.OpaqueToken('STORE_FORROOT_GUARD');
function provideForRootGuard(store) {
    if (store) {
        throw new Error("StoreModule.forRoot() called twice. Lazy loaded modules should use StoreModule.forChild() instead.");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;
function createReducer(reducers) {
    var reducer;
    if (Array.isArray(reducers)) {
        reducer = utils_1.reduceReducers.apply(void 0, reducers.map(function (reducer) {
            if (typeof reducer === 'object' && reducer) {
                return utils_1.combineReducers(reducer);
            }
            else if (typeof reducer === 'function') {
                return reducer;
            }
            else {
                throw 'Invalid reducer in config';
            }
        }));
    }
    else if (typeof reducers === 'function') {
        reducer = utils_1.reduceReducers(reducers);
    }
    else if (typeof reducers === 'object' && reducers) {
        reducer = utils_1.combineReducers(reducers);
    }
    else {
        reducer = function (appState) { return appState; };
    }
    return reducer;
}
var StoreModule = (function () {
    function StoreModule(guard) {
    }
    StoreModule.forRoot = function (config) {
        var initialReducer = createReducer(config.reducers);
        // Merge router reducer
        if (config.enableRouter) {
            initialReducer = utils_1.reduceReducers(initialReducer, router_1.routerReducer);
        }
        return {
            ngModule: StoreModule,
            providers: [
                {
                    provide: exports.STORE_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[store_1.Store, new core_1.Optional(), new core_1.SkipSelf()]]
                },
                actions_1.StoreActions,
                store_1.Store,
                router_1.StoreRouter,
                effects_1.Effects,
                {
                    provide: store_1.STORE_INITIAL_STATE,
                    useValue: config.state || {}
                },
                {
                    provide: store_1.STORE_INITIAL_REDUCERS,
                    multi: true,
                    useValue: initialReducer
                },
            ].concat((config.enableRouter ? [
                router_1.StoreRouter,
                {
                    provide: effects_1.STORE_EFFECTS,
                    useClass: router_1.StoreRouterEffects,
                    multi: true
                }
            ] : []), (config.effects || []).map(function (type) {
                return {
                    provide: effects_1.STORE_EFFECTS,
                    useClass: type,
                    multi: true
                };
            }))
        };
    };
    StoreModule.forChild = function (config) {
        var initialReducer = createReducer(config.reducers);
        return {
            ngModule: StoreModule,
            providers: [
                {
                    provide: store_1.STORE_INITIAL_REDUCERS,
                    multi: true,
                    useValue: initialReducer
                }
            ].concat((config.effects || []).map(function (type) {
                return {
                    provide: effects_1.STORE_EFFECTS,
                    useClass: type,
                    multi: true
                };
            }))
        };
    };
    StoreModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        actions_1.StoreActions,
                        store_1.Store,
                        effects_1.Effects,
                        {
                            provide: store_1.STORE_INITIAL_STATE,
                            useValue: {}
                        },
                        {
                            provide: store_1.STORE_INITIAL_REDUCERS,
                            useValue: function (appState) { return appState; },
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.STORE_FORROOT_GUARD,] },] },
    ]; };
    return StoreModule;
}());
exports.StoreModule = StoreModule;
