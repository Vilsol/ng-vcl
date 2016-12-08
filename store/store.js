"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/withLatestFrom');
require('rxjs/add/operator/distinctUntilChanged');
var core_1 = require('@angular/core');
var actions_1 = require('./actions');
var observable_1 = require('./observable');
var utils_1 = require('./utils');
exports.STORE_INITIAL_REDUCERS = new core_1.OpaqueToken('store.initial.reducers');
exports.STORE_INITIAL_STATE = new core_1.OpaqueToken('store.initial.state');
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(actions$, initialState, initialReducers) {
        _super.call(this);
        this.actions$ = actions$;
        this.initialState = initialState;
        this.initialReducers = initialReducers;
        // The reducer stream
        this._reducer = new BehaviorSubject_1.BehaviorSubject(utils_1.reduceReducers.apply(void 0, this.initialReducers));
        // The state changes when an action is dispatched by running reducers
        // The new state is then cached for further subscribers
        this.state$ = this.actions$.withLatestFrom(this.reducer$).scan(function (currentState, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(currentState, action);
        }, this.initialState).distinctUntilChanged().publishReplay(1);
        // The source of the store observable is also the state stream
        this.source = this.state$;
        // Listen to actions by connecting the state observable
        this.stateSub = this.state$.connect();
        // Init action
        this.dispatch(new actions_1.InitAction());
    }
    Object.defineProperty(Store.prototype, "reducer$", {
        get: function () {
            return this._reducer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.replaceReducer = function (reducer) {
        if (typeof reducer === 'object') {
            this._reducer.next(utils_1.combineReducers(reducer));
        }
        else {
            this._reducer.next(reducer);
        }
    };
    Store.prototype.dispatch = function (action) {
        if (action) {
            this.actions$.dispatch(action);
        }
    };
    Store.prototype.select = function (path) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return observable_1.select.call.apply(observable_1.select, [this, path].concat(paths));
    };
    Store.prototype.next = function (action) {
        this.dispatch(action);
    };
    Store.prototype.error = function (err) { };
    Store.prototype.complete = function () { };
    Store.prototype.ngOnDestroy = function () {
        if (this.stateSub && !this.stateSub.closed)
            this.stateSub.unsubscribe();
    };
    Store.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Store.ctorParameters = function () { return [
        { type: actions_1.StoreActions, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.STORE_INITIAL_STATE,] },] },
        { type: Array, decorators: [{ type: core_1.Inject, args: [exports.STORE_INITIAL_REDUCERS,] },] },
    ]; };
    return Store;
}(Observable_1.Observable));
exports.Store = Store;
