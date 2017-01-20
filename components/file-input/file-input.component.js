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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var accept = require("attr-accept");
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return FileInputComponent; }),
    multi: true
};
var FileInputComponent = (function () {
    function FileInputComponent(elRef) {
        var _this = this;
        this.elRef = elRef;
        this.layout = 'horizontal';
        this.placeholder = 'Choose a file or drag it here';
        this.accept = '*';
        this.disabled = false;
        this.multiple = false;
        this.files$ = new BehaviorSubject_1.BehaviorSubject([]);
        this.value$ = this.files$
            .filter(function (fs) { return fs.length > 0; })
            .map(function (fs) {
            var name = fs[0]['name'];
            if (_this.multiple)
                name += ' (' + fs.length + ')';
            return name;
        });
        this.subs = [];
        this.isDragging = false;
        this.isFocused = false;
        var hostEl = elRef.nativeElement;
        // file drop
        hostEl.addEventListener("dragover", function (e) {
            if (!_this.disabled) {
                e.stopPropagation();
                e.preventDefault();
                _this.isDragging = true;
            }
        }, false);
        hostEl.addEventListener("dragleave", function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.isDragging = false;
        }, false);
        hostEl.addEventListener("drop", function (e) {
            _this.onDrop(e);
        }, false);
    }
    FileInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(Observable_1.Observable.fromEvent(this.input.nativeElement, 'change')
            .subscribe(function (event) {
            _this.value = event['target'].value;
            _this.files$.next(event['target'].files);
            !!_this.onChangeCallback && _this.onChangeCallback(event['target'].files);
            // check file-type
            var typeOK = true;
            var wrongFiles = Array.prototype.filter.call(event['target'].files, function (file) { return !accept(file, _this.accept); });
            if (wrongFiles.length > 0 && _this.accept != '*')
                _this.state = 'error'; // TODO remove *-check after issue https://github.com/okonet/attr-accept/issues/8
            else
                _this.state = 'busy';
        }));
        this.subs.push(Observable_1.Observable.fromEvent(this.input.nativeElement, 'focus')
            .subscribe(function (event) { return _this.isFocused = true; }));
        this.subs.push(Observable_1.Observable.fromEvent(this.input.nativeElement, 'focus')
            .subscribe(function (event) { return _this.isFocused = false; }));
    };
    FileInputComponent.prototype.onClick = function (value) {
        if (this.disabled)
            return;
        // opens file-choser
        this.input.nativeElement.click();
    };
    FileInputComponent.prototype.onDrop = function (e) {
        if (this.disabled)
            return;
        this.isDragging = false;
        // cancel event and hover styling
        e.stopPropagation();
        e.preventDefault();
        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        this.input.nativeElement.files = files;
    };
    FileInputComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (sub) { return sub.unsubscribe(); });
    };
    FileInputComponent.prototype.writeValue = function (files) {
        this.input.nativeElement.files = files;
    };
    FileInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    FileInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return FileInputComponent;
}());
__decorate([
    core_1.Input('state'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "state", void 0);
__decorate([
    core_1.Input('layout'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "layout", void 0);
__decorate([
    core_1.Input('placeholder'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input('accept'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "accept", void 0);
__decorate([
    core_1.Input('name'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "name", void 0);
__decorate([
    core_1.Input('disabled'),
    __metadata("design:type", Boolean)
], FileInputComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input('multiple'),
    __metadata("design:type", Boolean)
], FileInputComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", String)
], FileInputComponent.prototype, "value", void 0);
__decorate([
    core_1.Output('files'),
    __metadata("design:type", BehaviorSubject_1.BehaviorSubject)
], FileInputComponent.prototype, "files$", void 0);
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", Object)
], FileInputComponent.prototype, "input", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileInputComponent.prototype, "onClick", null);
FileInputComponent = __decorate([
    core_1.Component({
        selector: 'vcl-file-input',
        templateUrl: 'file-input.component.html',
        host: {
            '[class.vclFileInput]': 'true',
            '[class.vclDisabled]': 'disabled',
            '[class.vclDragndrop]': 'isDragging',
            '[class.vclFocused]': 'isFocused',
            '[class.vclError]': '(state=="error")',
            '[class.vclWarning]': '(state=="warning")',
            '[class.vclSuccess]': '(state=="success")',
            role: 'button',
            tabindex: '0'
        },
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileInputComponent);
exports.FileInputComponent = FileInputComponent;
