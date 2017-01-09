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
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/filter");
var core_1 = require("@angular/core");
var StoreActions = (function (_super) {
    __extends(StoreActions, _super);
    function StoreActions() {
        var _this = _super.call(this) || this;
        // Action dispatcher
        _this._dispatcher = new Subject_1.Subject();
        // Action stream ist just the last action
        _this.actions$ = _this._dispatcher.asObservable();
        _this.source = _this.actions$;
        return _this;
    }
    StoreActions.prototype.ofType = function () {
        var actionClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionClasses[_i] = arguments[_i];
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
    return StoreActions;
}(Observable_1.Observable));
StoreActions = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StoreActions);
exports.StoreActions = StoreActions;
