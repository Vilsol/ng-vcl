"use strict";
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
var Observable_1 = require("rxjs/Observable");
var merge_1 = require("rxjs/observable/merge");
var core_1 = require("@angular/core");
var store_1 = require("./store");
var EFFECTS_METADATA_KEY = 'ng-vcl/effects';
exports.STORE_EFFECTS = new core_1.OpaqueToken('store.effects');
function Effect() {
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(EFFECTS_METADATA_KEY, target)) {
            Reflect.defineMetadata(EFFECTS_METADATA_KEY, [], target);
        }
        var effectProperties = Reflect.getOwnMetadata(EFFECTS_METADATA_KEY, target);
        Reflect.defineMetadata(EFFECTS_METADATA_KEY, effectProperties.concat([propertyName]), target);
    };
}
exports.Effect = Effect;
function getEffectsMetadata(instance) {
    var target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(EFFECTS_METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(EFFECTS_METADATA_KEY, target);
}
exports.getEffectsMetadata = getEffectsMetadata;
var Effects = (function () {
    function Effects(store, effects) {
        this.store = store;
        this.effectSubs = [];
        this.addEffects(effects);
    }
    Effects.prototype.addEffects = function (effectInstances) {
        var _this = this;
        var eiArr = Array.isArray(effectInstances) ? effectInstances : [effectInstances];
        eiArr.forEach(function (instance) {
            if (instance) {
                var properties = getEffectsMetadata(instance);
                var effects$ = merge_1.merge.apply(void 0, (properties.map(function (property) { return instance[property]; })));
                var sub = effects$.catch(function (err) {
                    // Catch effect error and dispatch StoreErrorAction
                    return Observable_1.Observable.of(new store_1.StoreErrorAction(err));
                }).subscribe(_this.store);
                _this.effectSubs.push(sub);
            }
        });
    };
    Effects.prototype.ngOnDestroy = function () {
        this.effectSubs.slice().filter(function (sub) { return sub && !sub.closed; }).forEach(function (sub) { return sub.unsubscribe(); });
    };
    return Effects;
}());
Effects = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Optional()),
    __param(1, core_1.Inject(exports.STORE_EFFECTS)),
    __metadata("design:paramtypes", [store_1.Store, Array])
], Effects);
exports.Effects = Effects;
