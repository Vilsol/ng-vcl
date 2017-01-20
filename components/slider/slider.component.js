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
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SliderComponent; }),
    multi: true
};
var SliderComponent = (function () {
    function SliderComponent() {
        this.tabindex = 0;
        this.value = 0;
        this.stepsOnly = false;
        this.round = 0;
        this.percentLeftKnob = 0;
        this.firstPan = true;
    }
    SliderComponent.prototype.ngAfterContentInit = function () {
        /**
         * handle defaults
         * info: this is done here so @Input-values of undefined|null will be handled
         */
        this.value = this.value || 0;
        this.min = this.min || 0;
        this.max = this.max || 100;
        this.step = this.step || 10;
        this.calculatePercentLeftKnob();
        this.getScalePoints();
    };
    SliderComponent.prototype.calculatePercentLeftKnob = function () {
        var rangeLength = this.max - this.min;
        var valueLeft = this.value - this.min;
        var delta = rangeLength / valueLeft;
        this.percentLeftKnob = 100 / delta;
        return this.percentLeftKnob;
    };
    SliderComponent.prototype.percentToValue = function (per) {
        var rangeLength = this.max - this.min;
        var newVal = (rangeLength / 100) * per;
        newVal = Math.round(newVal);
        return newVal;
    };
    SliderComponent.prototype.getScalePoints = function () {
        var rangeLength = this.max - this.min;
        var amount = Math.ceil(rangeLength / this.step) + 1;
        var scalePoints = [];
        while (scalePoints.length < amount) {
            scalePoints.push({
                label: this.scalePointLabel(scalePoints.length),
                percent: (100 / (amount - 1)) * scalePoints.length
            });
        }
        this.scalePoints = scalePoints;
    };
    SliderComponent.prototype.closestScalePoint = function (percentValue) {
        var closest = this.scalePoints[0];
        var dist = 100;
        this.scalePoints.forEach(function (sP) {
            var pDist = Math.abs(sP.percent - percentValue);
            if (pDist < dist) {
                closest = sP;
                dist = pDist;
            }
        });
        return closest.percent;
    };
    SliderComponent.prototype.scalePointLabel = function (i) {
        if (!this.scaleNames)
            return (i * this.step + this.min).toString();
        if (this.scaleNames[i])
            return this.scaleNames[i];
        return '';
    };
    SliderComponent.prototype.deltaPxToPercent = function (deltaPx) {
        var fullPx = this.scale.nativeElement.offsetWidth;
        var deltaPer = 100 / (fullPx / deltaPx);
        deltaPer = Math.round(deltaPer * 100) / 100; // round 2 decs
        return deltaPer;
    };
    /**
     * clicking the rail should also reposition the bar
     */
    SliderComponent.prototype.onTap = function (event) {
        if (event.target.className == 'vclSliderKnob')
            return;
        var railX = event.changedPointers[0].offsetX;
        if (railX <= 0)
            return;
        this.percentLeftKnob = this.deltaPxToPercent(railX);
        if (this.stepsOnly)
            this.percentLeftKnob = this.closestScalePoint(this.percentLeftKnob);
        this.value = this.percentToValue(this.percentLeftKnob);
        !!this.onChangeCallback && this.onChangeCallback(this.value);
    };
    SliderComponent.prototype.moveToPoint = function (direction) {
        if (direction === void 0) { direction = 'right'; }
        var currentPointValue = this.closestScalePoint(this.calculatePercentLeftKnob());
        var currentPoint = this.scalePoints
            .find(function (p) { return p.percent == currentPointValue; });
        var i = this.scalePoints.indexOf(currentPoint);
        var nextPoint;
        if (direction == 'right') {
            var nextI = i + 1;
            if (!this.scalePoints[nextI])
                nextI = this.scalePoints.length - 1;
            nextPoint = this.scalePoints[nextI];
        }
        else {
            var nextI = i - 1;
            if (nextI < 0)
                nextI = 0;
            nextPoint = this.scalePoints[nextI];
        }
        this.value = this.percentToValue(nextPoint.percent);
        !!this.onChangeCallback && this.onChangeCallback(this.value);
    };
    SliderComponent.prototype.moveValue = function (direction) {
        if (direction === void 0) { direction = 'right'; }
        var newValue;
        if (direction == 'right')
            newValue = this.value + 1;
        else
            newValue = this.value - 1;
        if (newValue < this.min)
            newValue = this.min;
        if (newValue > this.max)
            newValue = this.max;
        this.value = newValue;
        this.calculatePercentLeftKnob();
        !!this.onChangeCallback && this.onChangeCallback(this.value);
    };
    SliderComponent.prototype.keydown = function (ev) {
        switch (ev.code) {
            case 'ArrowLeft':
                if (this.stepsOnly)
                    this.moveToPoint('left');
                else
                    this.moveValue('left');
                ev.preventDefault();
                break;
            case 'ArrowRight':
                if (this.stepsOnly)
                    this.moveToPoint('right');
                else
                    this.moveValue('right');
                ev.preventDefault();
                break;
            case 'Space':
                this.moveToPoint('right');
                ev.preventDefault();
                break;
        }
    };
    SliderComponent.prototype.onPan = function (ev) {
        if (this.firstPan) {
            this.firstPan = false;
            this.lastPercentLeftKnob = this.percentLeftKnob;
        }
        var deltaPx = ev.deltaX;
        this.percentLeftKnob = this.lastPercentLeftKnob + this.deltaPxToPercent(deltaPx);
        if (this.percentLeftKnob < 0)
            this.percentLeftKnob = 0;
        if (this.percentLeftKnob > 100)
            this.percentLeftKnob = 100;
        if (this.stepsOnly)
            this.percentLeftKnob = this.closestScalePoint(this.percentLeftKnob);
        if (ev.isFinal) {
            this.firstPan = true;
            this.value = this.percentToValue(this.percentLeftKnob);
            !!this.onChangeCallback && this.onChangeCallback(this.value);
        }
    };
    SliderComponent.prototype.writeValue = function (value) {
        if (value !== this.value) {
            this.value = value;
        }
    };
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return SliderComponent;
}());
__decorate([
    core_1.HostBinding(),
    __metadata("design:type", Object)
], SliderComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "value", void 0);
__decorate([
    core_1.Input('min'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "min", void 0);
__decorate([
    core_1.Input('max'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "max", void 0);
__decorate([
    core_1.Input('step'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "step", void 0);
__decorate([
    core_1.Input('stepsOnly'),
    __metadata("design:type", Boolean)
], SliderComponent.prototype, "stepsOnly", void 0);
__decorate([
    core_1.Input('round'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "round", void 0);
__decorate([
    core_1.Input('scaleNames'),
    __metadata("design:type", Array)
], SliderComponent.prototype, "scaleNames", void 0);
__decorate([
    core_1.ViewChild('scale'),
    __metadata("design:type", Object)
], SliderComponent.prototype, "scale", void 0);
__decorate([
    core_1.HostListener('tap', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SliderComponent.prototype, "onTap", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SliderComponent.prototype, "keydown", null);
SliderComponent = __decorate([
    core_1.Component({
        selector: 'vcl-slider',
        templateUrl: 'slider.component.html',
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        host: {
            '[class.vclSlider]': 'true'
        },
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], SliderComponent);
exports.SliderComponent = SliderComponent;
