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
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.forRoot = function (config) {
        var initialReducer;
        if (Array.isArray(config.reducers)) {
            var reducers = config.reducers.map(function (reducer) {
                if (typeof reducer === 'object' && reducer) {
                    return utils_1.combineReducers(reducer);
                }
                else if (typeof reducer === 'function') {
                    return reducer;
                }
                else {
                    throw 'Invalid reducer in config.reducers';
                }
            });
            initialReducer = utils_1.reduceReducers.apply(void 0, reducers);
        }
        else if (typeof config.reducers === 'function') {
            initialReducer = utils_1.reduceReducers(config.reducers);
        }
        else if (typeof config.reducers === 'object' && config.reducers) {
            initialReducer = utils_1.combineReducers(config.reducers);
        }
        else {
            initialReducer = function (appState) { return appState; };
        }
        // Merge router reducer
        if (config.enableRouter) {
            initialReducer = utils_1.reduceReducers(initialReducer, router_1.routerReducer);
        }
        return {
            ngModule: StoreModule,
            providers: [
                actions_1.StoreActions,
                store_1.Store,
                router_1.StoreRouter,
                effects_1.Effects,
                {
                    provide: store_1.STORE_INITIAL_STATE,
                    useValue: config.state || {}
                },
                {
                    provide: store_1.STORE_INITIAL_REDUCER,
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
                            provide: store_1.STORE_INITIAL_REDUCER,
                            useValue: function (appState) { return appState; }
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = [];
    return StoreModule;
}());
exports.StoreModule = StoreModule;
