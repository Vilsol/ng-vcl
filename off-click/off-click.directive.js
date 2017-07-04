var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Output, Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/first';
var OffClickDirective = (function () {
    function OffClickDirective(elem) {
        this.elem = elem;
        this.offClick = new EventEmitter();
    }
    OffClickDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (typeof document !== 'undefined') {
            // Add a small delay, so any click that causes this directive to render does not trigger an off-click
            var delay$ = Observable.timer(10).first();
            this.sub = Observable.fromEvent(document, 'click')
                .skipUntil(delay$)
                .subscribe(function (ev) {
                var me = _this.elem.nativeElement;
                // Check that the target is not the off-clicks target element or any sub element
                if (ev.target && me !== ev.target && !me.contains(ev.target)) {
                    _this.offClick.emit();
                }
            });
        }
    };
    OffClickDirective.prototype.ngOnDestroy = function () {
        this.sub && this.sub.unsubscribe();
    };
    return OffClickDirective;
}());
__decorate([
    Output('offClick'),
    __metadata("design:type", Object)
], OffClickDirective.prototype, "offClick", void 0);
OffClickDirective = __decorate([
    Directive({
        selector: '[offClick]',
    }),
    __metadata("design:paramtypes", [ElementRef])
], OffClickDirective);
export { OffClickDirective };