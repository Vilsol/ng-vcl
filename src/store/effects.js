"use strict";
var core_1 = require('@angular/core');
var merge_1 = require('rxjs/observable/merge');
var store_1 = require('./store');
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
                var sub = effects$.subscribe(_this.store);
                _this.effectSubs.push(sub);
            }
        });
    };
    Effects.prototype.ngOnDestroy = function () {
        this.effectSubs.slice().filter(function (sub) { return sub && !sub.closed; }).forEach(function (sub) { return sub.unsubscribe(); });
    };
    Effects.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Effects.ctorParameters = [
        { type: store_1.Store, },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.STORE_EFFECTS,] },] },
    ];
    return Effects;
}());
exports.Effects = Effects;
