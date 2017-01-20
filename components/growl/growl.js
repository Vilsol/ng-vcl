"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require("rxjs/Observable");
require("rxjs/observable/merge");
require("rxjs/observable/timer");
require("rxjs/operator/first");
var Subject_1 = require("rxjs/Subject");
var types_1 = require("./types");
var Growl = (function (_super) {
    __extends(Growl, _super);
    function Growl(opts) {
        var _this = _super.call(this) || this;
        _this.opts = opts;
        _this.closeSubject = new Subject_1.Subject();
        _this.state = 'visible';
        var timeout = _this.calculatedTimeout;
        _this.source = Observable_1.Observable.merge(_this.closeSubject, (typeof timeout === 'number' ? Observable_1.Observable.interval(timeout).skipWhile(function () {
            return _this.state === 'hovered';
        }) : null)).first();
        return _this;
    }
    Growl.prototype.close = function () {
        this.closeSubject.next();
    };
    Growl.prototype.mouseEnter = function () {
        this.state = 'hovered';
    };
    Growl.prototype.mouseLeave = function () {
        this.state = 'active';
    };
    Object.defineProperty(Growl.prototype, "text", {
        get: function () {
            return this.opts.text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "html", {
        get: function () {
            return this.opts.html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "showCloseButton", {
        get: function () {
            return this.opts.showCloseButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "backgroundColor", {
        get: function () {
            return this.opts.backgroundColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "textColor", {
        get: function () {
            return this.opts.textColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "layerClass", {
        get: function () {
            return types_1.TYPE_CLASS_MAP[this.opts.type || types_1.GrowlType.None].growlClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "iconClass", {
        get: function () {
            return types_1.TYPE_CLASS_MAP[this.opts.type || types_1.GrowlType.None].iconClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "calculatedTimeout", {
        get: function () {
            if (typeof this.opts.timeout === 'number') {
                return this.opts.timeout;
            }
            else if (typeof this.opts.timeout === 'boolean' && !this.opts.timeout) {
                return null;
            }
            else if (!this.opts.html && typeof this.opts.text === 'string') {
                // avg reading speed per min (WPM): 19
                // min 4 secs
                var wordCnt = this.opts.text.split(/\s+/).length;
                return Math.min((wordCnt / 19) * 60 * 1000, 4000);
            }
            else if (this.opts.html) {
                return 5000;
            }
            else {
                return 4000;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Growl;
}(Observable_1.Observable));
exports.Growl = Growl;
