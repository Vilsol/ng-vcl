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
var MonthPickerComponent = MonthPickerComponent_1 = (function () {
    function MonthPickerComponent() {
        this.now = new Date();
        this.yearMeta = {};
        this.expanded = true;
        this.expandedChange = new core_1.EventEmitter();
        this.currentYear = this.now.getFullYear();
        this.currentYearChange = new core_1.EventEmitter();
        this.prevYearBtnTap = new core_1.EventEmitter();
        this.nextYearBtnTap = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.deselect = new core_1.EventEmitter();
        this.tabindex = 0;
        this.monthsPerRow = 3;
        this.useShortNames = false;
        this.useAvailableMonths = false;
        this.expandable = false;
        this.prevYearAvailable = false;
        this.nextYearAvailable = false;
        this.minYear = Number.MIN_SAFE_INTEGER;
        this.maxYear = Number.MAX_SAFE_INTEGER;
        this.closeBtnIcon = "fa:times";
        this.prevYearBtnIcon = "fa:chevron-left";
        this.nextYearBtnIcon = "fa:chevron-right";
        this.minSelectableItems = 1;
    }
    //
    MonthPickerComponent.prototype.ngOnInit = function () {
        // TODO: Localize here instead of in the template so outside components
        // when calling month-picker.getMonth(month) get calendar's localized and used label.
        this.months = this.useShortNames ? MonthPickerComponent_1.monthNamesShort : MonthPickerComponent_1.monthNames;
        if (!this.maxSelectableItems) {
            this.maxSelectableItems = this.colors && this.colors.length || 1;
        }
        this.availableColors = this.colors ? this.colors.map(function (color) { return true; }) : [];
        this.setYearMeta(this.currentYear);
    };
    MonthPickerComponent.prototype.setYearMeta = function (year) {
        if (!this.yearMeta[year]) {
            this.yearMeta[year] = this.createYearMeta(year);
        }
        this.currentMeta = this.yearMeta[year];
    };
    MonthPickerComponent.prototype.createYearMeta = function (year) {
        return this.months.map(function (monthMeta) { return ({}); });
    };
    MonthPickerComponent.prototype.selectMonth = function (year, month) {
        if (!this.isMonthAvailable(year, month)) {
            return;
        }
        var monthMeta = this.getYearMeta(year)[month];
        if (monthMeta.selected) {
            return this.deselectMonth(year, month);
        }
        if (this.maxSelectableItems === 1) {
            this.iterateMonthMetas(function (year, month, mMeta) {
                mMeta.selected = mMeta === monthMeta;
            });
        }
        else if (this.getSelectedDates().length < this.maxSelectableItems) {
            monthMeta.selected = true;
        }
        if (monthMeta.selected) {
            this.setMonthBackgroundColor(year, month);
            this.notifySelect(year + "." + month);
            if (this.maxSelectableItems === 1 && this.expandable) {
                this.expanded = false;
                this.expandedChange.emit(this.expanded);
            }
        }
    };
    MonthPickerComponent.prototype.isMonthAvailable = function (year, month) {
        return this.isDateInBounds(year, month) && (!this.useAvailableMonths ||
            this.yearMeta[year] && this.yearMeta[year][month].available);
    };
    MonthPickerComponent.prototype.isDateInBounds = function (year, month) {
        return this.isMonthInBounds(month) && this.isYearInBounds(year);
    };
    MonthPickerComponent.prototype.isMonthInBounds = function (month) {
        return month > -1 && month < this.months.length;
    };
    MonthPickerComponent.prototype.isYearInBounds = function (year) {
        return year > this.minYear && year < this.maxYear;
    };
    MonthPickerComponent.prototype.getYearMeta = function (year) {
        if (!this.yearMeta[year]) {
            this.yearMeta[year] = this.createYearMeta(year);
        }
        return this.yearMeta[year];
    };
    MonthPickerComponent.prototype.iterateMonthMetas = function (cb) {
        var _this = this;
        Object.keys(this.yearMeta).forEach(function (year) {
            _this.yearMeta[year].forEach(function (monthMeta, month) {
                cb(Number(year), month, monthMeta);
            });
        });
    };
    MonthPickerComponent.prototype.getSelectedDates = function () {
        var selectedDates = [];
        this.iterateMonthMetas(function (year, month, monthMeta) {
            if (monthMeta.selected) {
                selectedDates.push(year + "." + month);
            }
        });
        return selectedDates;
    };
    MonthPickerComponent.prototype.setMonthBackgroundColor = function (year, month) {
        var color = this.getMonthBackgroundColor();
        if (color) {
            var monthMeta = this.getYearMeta(year)[month];
            monthMeta.color = color;
        }
    };
    MonthPickerComponent.prototype.getMonthBackgroundColor = function () {
        var index = this.availableColors.findIndex(function (available) { return available; });
        if (index !== -1) {
            this.availableColors[index] = false;
            return this.colors[index];
        }
    };
    MonthPickerComponent.prototype.deselectMonth = function (year, month) {
        if (this.isMonthSelected(year, month)) {
            var monthMeta = this.getYearMeta(year)[month];
            monthMeta.selected = false;
            this.clearMonthBackgroundColor(year, month);
            this.notifyDeselect(year + "." + month);
        }
    };
    MonthPickerComponent.prototype.isMonthSelected = function (year, month) {
        return this.isDateInBounds(year, month) &&
            this.yearMeta[year] && this.yearMeta[year][month].selected;
    };
    MonthPickerComponent.prototype.clearMonthBackgroundColor = function (year, month) {
        if (this.availableColors) {
            var monthMeta = this.getYearMeta(year)[month];
            if (monthMeta.color) {
                var index = this.colors.indexOf(monthMeta.color);
                this.availableColors[index] = true;
                delete monthMeta.color;
            }
        }
    };
    MonthPickerComponent.prototype.deselectAllMonths = function () {
        var _this = this;
        this.iterateMonthMetas(function (year, month, monthMeta) {
            monthMeta.selected = false;
            _this.clearMonthBackgroundColor(year, month);
            _this.notifyDeselect(year + "." + month);
        });
    };
    MonthPickerComponent.prototype.addAvailableMonth = function (year, month) {
        if (this.isDateInBounds(year, month)) {
            this.getYearMeta(year)[month].available = true;
        }
    };
    MonthPickerComponent.prototype.removeAvailableMonth = function (year, month) {
        if (this.isDateInBounds(year, month) && this.yearMeta[year]) {
            this.yearMeta[year][month].available = false;
        }
    };
    MonthPickerComponent.prototype.removeAllAvailableMonths = function () {
        this.iterateMonthMetas(function (year, month, monthMeta) {
            monthMeta.available = false;
        });
    };
    MonthPickerComponent.prototype.onPrevYearTap = function () {
        if (this.prevYearAvailable) {
            this.currentYear--;
            this.setYearMeta(this.currentYear);
            this.currentYearChange.emit(this.currentYear);
            this.prevYearBtnTap.emit();
        }
    };
    MonthPickerComponent.prototype.onNextYearTap = function () {
        if (this.nextYearAvailable) {
            this.currentYear++;
            this.setYearMeta(this.currentYear);
            this.currentYearChange.emit(this.currentYear);
            this.nextYearBtnTap.emit();
        }
    };
    MonthPickerComponent.prototype.onCloseBtnTap = function () {
        if (this.expandable) {
            if (this.expanded) {
                this.expanded = false;
                this.expandedChange.emit(this.expanded);
            }
        }
    };
    MonthPickerComponent.prototype.notifySelect = function (date) {
        this.select.emit(date);
    };
    MonthPickerComponent.prototype.notifyDeselect = function (date) {
        this.deselect.emit(date);
    };
    MonthPickerComponent.prototype.isCurrentMonth = function (year, month) {
        return this.now.getFullYear() == year && this.now.getMonth() === month;
    };
    MonthPickerComponent.prototype.getMonth = function (year, month) {
        if (this.isDateInBounds(year, month)) {
            return Object.assign({
                date: year + "." + month,
                label: this.months[month]
            }, this.getYearMeta(year)[month]);
        }
    };
    return MonthPickerComponent;
}());
MonthPickerComponent.TAG = 'MonthPickerComponent';
MonthPickerComponent.monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
MonthPickerComponent.monthNamesShort = MonthPickerComponent_1.monthNames.
    map(function (name) { return name.substr(0, 3); });
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "expanded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonthPickerComponent.prototype, "expandedChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "currentYear", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonthPickerComponent.prototype, "currentYearChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthPickerComponent.prototype, "prevYearBtnTap", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthPickerComponent.prototype, "nextYearBtnTap", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthPickerComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthPickerComponent.prototype, "deselect", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MonthPickerComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "monthsPerRow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "useShortNames", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "useAvailableMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "expandable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "prevYearAvailable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthPickerComponent.prototype, "nextYearAvailable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "minYear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "maxYear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MonthPickerComponent.prototype, "closeBtnIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MonthPickerComponent.prototype, "prevYearBtnIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MonthPickerComponent.prototype, "nextYearBtnIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "maxSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthPickerComponent.prototype, "minSelectableItems", void 0);
MonthPickerComponent = MonthPickerComponent_1 = __decorate([
    core_1.Component({
        selector: 'vcl-month-picker',
        templateUrl: 'month-picker.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], MonthPickerComponent);
exports.MonthPickerComponent = MonthPickerComponent;
var MonthPickerComponent_1;
