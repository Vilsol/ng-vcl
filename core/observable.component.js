"use strict";
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
var ObservableComponent = (function () {
    function ObservableComponent() {
        this.changesSubject = new Subject_1.Subject();
        this.changes$ = this.changesSubject.asObservable();
    }
    ObservableComponent.prototype.ngOnChanges = function (changes) {
        this.changesSubject.next(changes);
    };
    ObservableComponent.prototype.observeChange = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i - 0] = arguments[_i];
        }
        return this.changes$
            .filter(function (changes) { return props.some(function (p) { return changes.hasOwnProperty(p); }); })
            .map(function (changes) { return props.length === 1
            ? changes[props[0]].currentValue
            : props.map(function (p) { return changes.hasOwnProperty(p) ? changes[p].currentValue : null; }); });
    };
    return ObservableComponent;
}());
exports.ObservableComponent = ObservableComponent;
