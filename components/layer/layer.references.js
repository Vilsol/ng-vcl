"use strict";
var Subject_1 = require("rxjs/Subject");
var LayerRef = (function () {
    function LayerRef() {
        this.visibilityChange = new Subject_1.Subject();
        this.visible$ = this.visibilityChange.asObservable();
        this.base = 'default';
        this.modal = false;
        this.offClickClose = true;
        this.transparent = false;
        this.fill = false;
        this.stickToBottom = false;
        this.gutterPadding = false;
        this.customClass = null;
    }
    Object.defineProperty(LayerRef.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    ;
    LayerRef.prototype.setVisibility = function (value) {
        if (this.visible !== value) {
            this._visible = value;
            this.visibilityChange.next(value);
        }
    };
    LayerRef.prototype.open = function (data) {
        if (!this.wormhole) {
            this.wormhole = this.createWormhole(data);
        }
        else {
            this.setData(data);
        }
        this.setVisibility(true);
        this.results = new Subject_1.Subject();
        return this.results.asObservable();
    };
    LayerRef.prototype.close = function (data) {
        this.setVisibility(false);
        if (this.results) {
            if (data !== undefined) {
                this.results.next(data);
            }
            this.results.complete();
        }
    };
    LayerRef.prototype.closeWithError = function (data) {
        this.setVisibility(false);
        if (this.results) {
            this.results.error(data);
        }
    };
    LayerRef.prototype.send = function (data) {
        if (data !== undefined && this.results) {
            this.results.next(data);
        }
    };
    LayerRef.prototype.offClick = function () {
        if (!this.modal && this.offClickClose) {
            this.close();
        }
    };
    return LayerRef;
}());
exports.LayerRef = LayerRef;
