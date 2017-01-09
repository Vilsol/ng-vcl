"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/pluck");
require("rxjs/add/operator/map");
function select(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var select$;
    if (typeof path === 'string') {
        select$ = this.pluck.apply(this, [path].concat(paths));
    }
    else if (typeof path === 'function') {
        select$ = this.map(path);
    }
    else {
        throw new TypeError("Unexpected type " + typeof path + " in select operator");
    }
    select$ = select$.distinctUntilChanged();
    return new StoreObservable(select$);
}
exports.select = select;
var StoreObservable = (function (_super) {
    __extends(StoreObservable, _super);
    function StoreObservable(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        return _this;
    }
    StoreObservable.prototype.select = function (path) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return select.call.apply(select, [this, path].concat(paths));
    };
    StoreObservable.prototype.lift = function (operator) {
        var observable = new StoreObservable(this);
        observable.operator = operator;
        return observable;
    };
    return StoreObservable;
}(Observable_1.Observable));
exports.StoreObservable = StoreObservable;
;
