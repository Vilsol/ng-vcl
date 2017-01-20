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
var core_1 = require("@angular/core");
var layer_module_1 = require("./../layer/layer.module");
var types_1 = require("./types");
var alert_component_1 = require("./alert.component");
var AlertService = (function () {
    function AlertService(layerService, alertLayerRef) {
        this.layerService = layerService;
        this.alertLayerRef = alertLayerRef;
        this.noop = function () { };
    }
    AlertService.prototype.alert = function (text, opts) {
        return this.open({ text: text }, opts);
    };
    AlertService.prototype.info = function (text, opts) {
        return this.open({ text: text, type: types_1.AlertType.Info }, opts);
    };
    AlertService.prototype.success = function (text, opts) {
        return this.open({ text: text, type: types_1.AlertType.Success }, opts);
    };
    AlertService.prototype.warning = function (text, opts) {
        return this.open({ text: text, type: types_1.AlertType.Warning }, opts);
    };
    AlertService.prototype.error = function (text, opts) {
        return this.open({ text: text, type: types_1.AlertType.Error }, opts);
    };
    AlertService.prototype.question = function (text, opts) {
        return this.open({ text: text, type: types_1.AlertType.Question, showCancelButton: true }, opts);
    };
    AlertService.prototype.open = function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        var alertOpts = Object.assign.apply(Object, [{}].concat(opts));
        return this.alertLayerRef.open({ alertOpts: alertOpts });
    };
    AlertService.prototype.close = function () {
        this.alertLayerRef.close();
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [layer_module_1.LayerService,
        alert_component_1.AlertLayer])
], AlertService);
exports.AlertService = AlertService;
