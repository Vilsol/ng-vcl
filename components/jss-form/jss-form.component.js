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
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var Validator = require('jsonschema').Validator; // TODO use import { Validator } from 'jsonschema'; when typings available
var VALIDATOR;
var JssFormObjectComponent = (function () {
    function JssFormObjectComponent() {
        var _this = this;
        this.parentPath = '';
        this.fieldErrors = {};
        this.subs = [];
        this.ngOnDestroy = function () { return _this.subs.map(function (sub) { return sub.unsubscribe(); }); };
    }
    JssFormObjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.schema.properties) {
            Object.keys(this.schema.properties)
                .map(function (key) {
                var sub = _this.error
                    .do(function () { return delete _this.fieldErrors[key]; })
                    .filter(function (errAr) { return errAr != null; })
                    .map(function (errAr) { return errAr.filter(function (er) { return er.property == 'instance.' + _this.parentPath + key; }); })
                    .map(function (errAr) {
                    if (errAr.length == 0)
                        return null;
                    else
                        return errAr.pop().message;
                })
                    .subscribe(function (errMsg) { return _this.fieldErrors[key] = errMsg; });
                _this.subs.push(sub);
            });
        }
    };
    /**
     * if no formType is given, this will guess the right one
     */
    JssFormObjectComponent.prototype.formType = function (schemaObj) {
        if (schemaObj.formType)
            return schemaObj.formType;
        if (schemaObj.type == 'string') {
            if (schemaObj.enum)
                return 'select';
            else
                return 'text';
        }
        if (schemaObj.type == 'number')
            return 'number';
        if (schemaObj.type == 'boolean')
            return 'switch';
    };
    JssFormObjectComponent.prototype.keys = function (obj) {
        return Object.keys(obj);
    };
    JssFormObjectComponent.prototype.keyErrors = function (parentPath, key) {
        if (!this.error)
            return null;
        return this.error
            .map(function (errAr) { return errAr
            .filter(function (er) { return er.property.startsWith('instance.' + parentPath + key); }); })
            .map(function (errAr) {
            if (errAr.length == 0)
                return null;
            else
                return errAr.pop().message;
        });
    };
    JssFormObjectComponent.prototype.keyErrors$ = function (parentPath, key) {
        return rxjs_1.Observable.from(this.keyErrors(parentPath, key));
    };
    JssFormObjectComponent.prototype.name = function (parentPath, key) {
        var name = parentPath + '.' + key;
        while (name.charAt(0) === '.')
            name = name.substr(1);
        return name;
    };
    JssFormObjectComponent.prototype.placeholder = function (schemaObj) {
        if (typeof schemaObj.placeholder !== "undefined")
            return schemaObj.placeholder;
        return '';
    };
    JssFormObjectComponent.prototype.radioOptions = function (schemaObj) {
        var opts = schemaObj.enum.map(function (str) {
            return {
                label: str,
                value: str
            };
        });
        return opts;
    };
    JssFormObjectComponent.prototype.selectItems = function (schemaObj) {
        if (!schemaObj.items) {
            // use .enum
            return schemaObj.enum.map(function (str) {
                return {
                    label: str,
                    value: str
                };
            });
        }
        else {
            // use .items
            return schemaObj.items.map(function (item) {
                var ret = {
                    value: item.value
                };
                ret['label'] = item.label ? item.label : item.value;
                return ret;
            });
        }
    };
    return JssFormObjectComponent;
}());
__decorate([
    core_1.Input('schema'),
    __metadata("design:type", Object)
], JssFormObjectComponent.prototype, "schema", void 0);
__decorate([
    core_1.Input('parentPath'),
    __metadata("design:type", String)
], JssFormObjectComponent.prototype, "parentPath", void 0);
__decorate([
    core_1.Input('formGroup'),
    __metadata("design:type", forms_1.FormGroup)
], JssFormObjectComponent.prototype, "formGroup", void 0);
__decorate([
    core_1.Input('error'),
    __metadata("design:type", Object)
], JssFormObjectComponent.prototype, "error", void 0);
JssFormObjectComponent = __decorate([
    core_1.Component({
        selector: 'vcl-jss-form-object',
        templateUrl: 'jss-form-object.component.html',
    }),
    __metadata("design:paramtypes", [])
], JssFormObjectComponent);
exports.JssFormObjectComponent = JssFormObjectComponent;
var JssFormComponent = (function () {
    function JssFormComponent(fb) {
        this.fb = fb;
        this.value = {};
        this.error = new core_1.EventEmitter();
    }
    JssFormComponent.prototype.ngOnInit = function () {
        this.form = this.formGroupFromSchema(this.schema);
        this.value && this.form.patchValue(this.value);
    };
    JssFormComponent.prototype.keys = function (obj) {
        return Object.keys(obj);
    };
    /**
     * create the formGroup for the given schema
     */
    JssFormComponent.prototype.formGroupFromSchema = function (schemaObj) {
        var _this = this;
        var ret = {};
        // non-objects
        Object.keys(schemaObj.properties)
            .filter(function (k) { return schemaObj.properties[k].type != 'object'; })
            .map(function (k) { return ret[k] = ['']; });
        // objects
        Object.keys(schemaObj.properties)
            .filter(function (k) { return schemaObj.properties[k].type == 'object'; })
            .map(function (k) { return ret[k] = _this.formGroupFromSchema(schemaObj.properties[k]); });
        return this.fb.group(ret, {
            validator: function (c) {
                var errors = _this.jsonSchemaValidate(c.value, schemaObj);
                return errors;
            }
        });
    };
    /**
     * validate if value matches schema
     * @return {?any[]} error-array or null if no errors
     */
    JssFormComponent.prototype.jsonSchemaValidate = function (obj, schema) {
        if (schema === void 0) { schema = this.schema; }
        if (!VALIDATOR)
            VALIDATOR = new Validator();
        var valid = VALIDATOR.validate(obj, schema);
        //  console.log('errrrrrors:');
        //  console.dir(valid.errors);
        if (valid.errors.length == 0) {
            this.error.emit(null);
            return null;
        }
        this.error.emit(valid.errors);
        return valid.errors;
    };
    JssFormComponent.prototype.ngAfterViewInit = function () {
    };
    return JssFormComponent;
}());
__decorate([
    core_1.Input('schema'),
    __metadata("design:type", Object)
], JssFormComponent.prototype, "schema", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object)
], JssFormComponent.prototype, "value", void 0);
__decorate([
    core_1.Output('error'),
    __metadata("design:type", Object)
], JssFormComponent.prototype, "error", void 0);
JssFormComponent = __decorate([
    core_1.Component({
        selector: 'vcl-jss-form',
        templateUrl: 'jss-form.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], JssFormComponent);
exports.JssFormComponent = JssFormComponent;
