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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/scan");
require("rxjs/add/operator/withLatestFrom");
require("rxjs/add/operator/distinctUntilChanged");
var core_1 = require("@angular/core");
var actions_1 = require("./actions");
var observable_1 = require("./observable");
var utils_1 = require("./utils");
exports.STORE_INITIAL_REDUCERS = new core_1.OpaqueToken('store.initial.reducers');
exports.STORE_INITIAL_STATE = new core_1.OpaqueToken('store.initial.state');
// Some store actions
var StoreInitAction = (function () {
    function StoreInitAction() {
    }
    return StoreInitAction;
}());
exports.StoreInitAction = StoreInitAction;
var StoreErrorAction = (function () {
    function StoreErrorAction(err) {
        this.err = err;
    }
    return StoreErrorAction;
}());
exports.StoreErrorAction = StoreErrorAction;
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(actions$, initialState, initialReducers) {
        var _this = _super.call(this) || this;
        _this.actions$ = actions$;
        _this.initialState = initialState;
        _this.initialReducers = initialReducers;
        // The reducer stream
        _this._reducer = new BehaviorSubject_1.BehaviorSubject(utils_1.reduceReducers.apply(void 0, _this.initialReducers));
        // The state changes when an action is dispatched by running reducers
        // The new state is then cached for further subscribers
        _this.state$ = _this.actions$.withLatestFrom(_this.reducer$).scan(function (currentState, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(currentState, action);
        }, _this.initialState).distinctUntilChanged().publishReplay(1);
        // The source of the store observable is also the state stream
        _this.source = _this.state$;
        // Listen to actions by connecting the state observable
        _this.stateSub = _this.state$.connect();
        // Init action
        _this.dispatch(new StoreInitAction());
        return _this;
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
    Store.prototype.actionOfType = function () {
        var actionClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionClasses[_i] = arguments[_i];
        }
        return (_a = this.actions$).ofType.apply(_a, actionClasses);
        var _a;
    };
    Store.prototype.next = function (action) {
        this.dispatch(action);
    };
    Store.prototype.error = function (err) {
        // Errors result in a StoreErrorAction
        this.dispatch(new StoreErrorAction(err));
    };
    Store.prototype.complete = function () { };
    Store.prototype.ngOnDestroy = function () {
        if (this.stateSub && !this.stateSub.closed)
            this.stateSub.unsubscribe();
    };
    return Store;
}(Observable_1.Observable));
Store = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(exports.STORE_INITIAL_STATE)),
    __param(2, core_1.Inject(exports.STORE_INITIAL_REDUCERS)),
    __metadata("design:paramtypes", [actions_1.StoreActions, Object, Array])
], Store);
exports.Store = Store;
