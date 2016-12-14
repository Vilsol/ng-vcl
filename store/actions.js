"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/filter');
var core_1 = require('@angular/core');
var StoreActions = (function (_super) {
    __extends(StoreActions, _super);
    function StoreActions() {
        _super.call(this);
        // Action dispatcher
        this._dispatcher = new Subject_1.Subject();
        // Action stream ist just the last action
        this.actions$ = this._dispatcher.asObservable();
        this.source = this.actions$;
    }
    StoreActions.prototype.ofType = function () {
        var actionClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionClasses[_i - 0] = arguments[_i];
        }
        return this.actions$.filter(function (action) { return actionClasses.some(function (cls) { return action instanceof cls; }); });
    };
    StoreActions.prototype.dispatch = function (action) {
        var _this = this;
        setTimeout(function () { return _this._dispatcher.next(action); }, 0);
    };
    StoreActions.prototype.next = function (action) {
        this.dispatch(action);
    };
    StoreActions.prototype.error = function (err) { };
    StoreActions.prototype.complete = function () { };
    StoreActions.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StoreActions.ctorParameters = function () { return []; };
    return StoreActions;
}(Observable_1.Observable));
exports.StoreActions = StoreActions;
