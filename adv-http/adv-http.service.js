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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
require("rxjs/add/operator/publishReplay");
require("rxjs/add/operator/publish");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/retryWhen");
require("rxjs/add/operator/let");
require("rxjs/add/observable/throw");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
/**
 *  Data caching
 */
var SyncableObservable = (function (_super) {
    __extends(SyncableObservable, _super);
    function SyncableObservable(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        return _this;
    }
    SyncableObservable.prototype._subscribe = function (subscriber) {
        return this.getDataSubject().subscribe(subscriber);
    };
    SyncableObservable.prototype.getDataSubject = function () {
        var subject = this._dataSubject;
        if (!subject) {
            this._dataSubject = new ReplaySubject_1.ReplaySubject(1);
        }
        return this._dataSubject;
    };
    SyncableObservable.prototype.sync = function () {
        var _this = this;
        var dataSubject = this.getDataSubject();
        if (this.sub) {
            this.sub.unsubscribe();
        }
        var sync$ = new Observable_1.Observable(function (observer) {
            var httpSub = _this.source.subscribe(function (data) {
                dataSubject.next(data);
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
            });
            return function () {
                httpSub.unsubscribe();
            };
        }).publish();
        this.sub = sync$.connect();
        return sync$;
    };
    return SyncableObservable;
}(Observable_1.Observable));
exports.SyncableObservable = SyncableObservable;
// tslint:disable-next-line:only-arrow-functions
Observable_1.Observable.prototype.syncable = function () {
    return new SyncableObservable(this);
};
/**
 *  Error handling
 */
var ErrorHandlingStrategy;
(function (ErrorHandlingStrategy) {
    ErrorHandlingStrategy[ErrorHandlingStrategy["default"] = 0] = "default";
    ErrorHandlingStrategy[ErrorHandlingStrategy["retry"] = 1] = "retry";
    ErrorHandlingStrategy[ErrorHandlingStrategy["notify"] = 2] = "notify";
})(ErrorHandlingStrategy = exports.ErrorHandlingStrategy || (exports.ErrorHandlingStrategy = {}));
exports.ADV_HTTP_CONFIG = new core_1.OpaqueToken('adv.http.config');
var ErrorHandlerService = (function () {
    function ErrorHandlerService() {
    }
    ErrorHandlerService.prototype.notify = function (err) {
        console.log(err);
    };
    ErrorHandlerService.prototype.retry = function (err, retry, abort) {
        this.notify(err);
        abort();
    };
    ErrorHandlerService.prototype.attach = function (source, errorHandlingStrategy) {
        var _this = this;
        // errorStrategy = errorStrategy || this.config.defaultErrorHandlingStrategy || ErrorHandlingStrategy.default;
        errorHandlingStrategy = errorHandlingStrategy || ErrorHandlingStrategy.default;
        if (errorHandlingStrategy && (errorHandlingStrategy === ErrorHandlingStrategy.notify || typeof errorHandlingStrategy === 'string')) {
            // Catch an error...
            source = source.catch(function (err) {
                // ... and just pass it to the error handler
                // The error is rethrown so it can be catched
                if (errorHandlingStrategy === ErrorHandlingStrategy.notify) {
                    _this.notify(err);
                }
                else {
                    if (!_this[errorHandlingStrategy]) {
                        throw 'Error handling strategy not found: ' + errorHandlingStrategy;
                    }
                    _this[errorHandlingStrategy]();
                }
                return Observable_1.Observable.throw(err);
            });
        }
        else if (errorHandlingStrategy && errorHandlingStrategy === ErrorHandlingStrategy.retry) {
            source = source.retryWhen(function (errors) {
                return errors.switchMap(function (err) {
                    return new Observable_1.Observable(function (observer) {
                        _this.retry(err, function () {
                            observer.next();
                        }, function () {
                            observer.error(err);
                        });
                    });
                });
            });
        }
        return source;
    };
    return ErrorHandlerService;
}());
ErrorHandlerService = __decorate([
    core_1.Injectable()
], ErrorHandlerService);
exports.ErrorHandlerService = ErrorHandlerService;
var AdvHttp = (function (_super) {
    __extends(AdvHttp, _super);
    function AdvHttp(config, errorHandler, _backend, _defaultOptions) {
        var _this = _super.call(this, _backend, _defaultOptions) || this;
        _this.config = config;
        _this.errorHandler = errorHandler;
        return _this;
    }
    AdvHttp.prototype.request = function (url, options, errorStrategy) {
        var _this = this;
        return _super.prototype.request.call(this, url, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.get = function (url, options, errorStrategy) {
        var _this = this;
        return _super.prototype.get.call(this, url, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.post = function (url, body, options, errorStrategy) {
        var _this = this;
        return _super.prototype.post.call(this, url, body, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.put = function (url, body, options, errorStrategy) {
        var _this = this;
        return _super.prototype.put.call(this, url, body, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.delete = function (url, options, errorStrategy) {
        var _this = this;
        return _super.prototype.delete.call(this, url, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.patch = function (url, body, options, errorStrategy) {
        var _this = this;
        return _super.prototype.patch.call(this, url, body, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.head = function (url, options, errorStrategy) {
        var _this = this;
        return _super.prototype.head.call(this, url, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    AdvHttp.prototype.options = function (url, options, errorStrategy) {
        var _this = this;
        return _super.prototype.options.call(this, url, options).let(function (o) { return _this.errorHandler.attach(o, errorStrategy || _this.config.defaultErrorHandlingStrategy); });
    };
    return AdvHttp;
}(http_1.Http));
AdvHttp = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(exports.ADV_HTTP_CONFIG)),
    __metadata("design:paramtypes", [Object, ErrorHandlerService,
        http_1.ConnectionBackend,
        http_1.RequestOptions])
], AdvHttp);
exports.AdvHttp = AdvHttp;
