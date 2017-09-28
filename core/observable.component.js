import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
var ObservableComponent = /** @class */ (function () {
    function ObservableComponent() {
        this.changesSubject = new Subject();
        this.observedProps = {};
        this.changes$ = this.changesSubject.asObservable();
    }
    ObservableComponent.prototype.ngOnChanges = function (changes) {
        this.changesSubject.next(changes);
    };
    ObservableComponent.prototype.ngOnDestroy = function () {
        this.changesSubject.complete();
    };
    ObservableComponent.prototype.observeChanges = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return this.changes$.filter(function (changes) { return props.some(function (p) { return changes.hasOwnProperty(p); }); });
    };
    ObservableComponent.prototype.observeChange = function (prop) {
        if (!this.observedProps[prop]) {
            var c$ = this.changes$
                .filter(function (changes) { return changes.hasOwnProperty(prop); })
                .map(function (changes) { return changes[prop]; })
                .publishReplay(1);
            c$.connect();
            this.observedProps[prop] = c$;
        }
        return this.observedProps[prop];
    };
    ObservableComponent.prototype.observeChangeValue = function (prop) {
        return this.observeChange(prop).map(function (change) { return change.currentValue; });
    };
    return ObservableComponent;
}());
export { ObservableComponent };
