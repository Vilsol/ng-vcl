var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, } from '@angular/core';
var MonthPickerComponent = /** @class */ (function () {
    //
    function MonthPickerComponent(ref) {
        this.ref = ref;
        this.tag = MonthPickerComponent_1.Tag;
        this.now = new Date();
        this.yearMeta = {};
        this.debug = false;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
        this.currentYear = this.now.getFullYear();
        this.currentYearChange = new EventEmitter();
        this.prevYearBtnTap = new EventEmitter();
        this.nextYearBtnTap = new EventEmitter();
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        // Customization
        this.tabindex = 0;
        this.monthsPerRow = 3;
        this.locales = 'en-US';
        this.dateOptions = { month: 'short' };
        this.expandable = false;
        this.prevYearAvailable = false;
        this.nextYearAvailable = false;
        this.useAvailableMonths = false;
        this.closeBtnIcon = 'fa:times';
        this.prevYearBtnIcon = 'fa:chevron-left';
        this.nextYearBtnIcon = 'fa:chevron-right';
        this.minSelectableMonths = 0;
        this.minYear = Number.MIN_SAFE_INTEGER;
        this.maxYear = Number.MAX_SAFE_INTEGER;
    }
    MonthPickerComponent_1 = MonthPickerComponent;
    MonthPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Create month labels.
        var date = new Date(this.now.getFullYear(), 0);
        this.months = Array(MonthPickerComponent_1.MonthCount).fill(0).map(function (_) {
            var month = date.toLocaleString(_this.locales, _this.dateOptions);
            date.setMonth(date.getMonth() + 1);
            return month;
        });
        if (!this.maxSelectableMonths) {
            this.maxSelectableMonths = this.colors && this.colors.length || 1;
        }
        this.availableColors = this.colors ? this.colors.map(function (color) { return true; }) : [];
        this.setYearMeta(this.currentYear);
    };
    MonthPickerComponent.prototype.ngOnChanges = function (changes) {
        var tag = this.tag + ".ngOnChanges()";
        if (this.debug)
            console.log(tag, 'changes:', changes);
        if (changes.currentYear && !changes.currentYear.isFirstChange())
            this.setYearMeta(changes.currentYear.currentValue);
    };
    MonthPickerComponent.prototype.setYearMeta = function (year) {
        if (!this.yearMeta[year]) {
            this.yearMeta[year] = this.createYearMeta(year);
        }
        this.currentMeta = this.yearMeta[year];
    };
    MonthPickerComponent.prototype.createYearMeta = function (year) {
        return this.months.map(function (_) { return ({}); });
    };
    MonthPickerComponent.prototype.selectMonth = function (year, month) {
        if (!this.isMonthAvailable(year, month) || this.isMonthPreselected(year, month)) {
            return;
        }
        var monthMeta = this.getYearMeta(year)[month];
        if (monthMeta.selected) {
            if (this.getSelectedDates().length <= this.minSelectableMonths) {
                return;
            }
            return this.deselectMonth(year, month);
        }
        if (this.maxSelectableMonths === 1) {
            this.iterateMonthMetas(function (year, month, mMeta) {
                mMeta.selected = mMeta === monthMeta;
            });
        }
        if (this.getSelectedDates().length < this.maxSelectableMonths) {
            monthMeta.selected = true;
        }
        if (monthMeta.selected) {
            this.setMonthBackgroundColor(year, month);
            this.notifySelect(year + "." + month);
            if (this.maxSelectableMonths === 1 && this.expandable) {
                this.expanded = false;
                this.expandedChange.emit(this.expanded);
            }
        }
    };
    MonthPickerComponent.prototype.preselectMonth = function (year, month, color) {
        var tag = this.tag + ".preselectMonth()";
        if (this.debug)
            console.log(tag, year + "." + month);
        var monthMeta = this.getYearMeta(year)[month];
        if (monthMeta.selected) {
            this.deselectMonth(year, month);
        }
        monthMeta.preselected = true;
        monthMeta.color = color;
        if (this.debug)
            console.log(tag, 'monthMeta:', monthMeta);
        this.ref.markForCheck();
    };
    MonthPickerComponent.prototype.dePreselectMonth = function (year, month) {
        var tag = this.tag + ".dePreselectMonth()";
        if (this.debug)
            console.log(tag, year + "." + month);
        if (!this.isMonthPreselected(year, month))
            return;
        var monthMeta = this.getYearMeta(year)[month];
        monthMeta.preselected = false;
        delete monthMeta.color;
        if (this.debug)
            console.log(tag, 'monthMeta:', monthMeta);
        this.ref.markForCheck();
    };
    MonthPickerComponent.prototype.isMonthAvailable = function (year, month) {
        return this.isDateInBounds(year, month) && (!this.useAvailableMonths ||
            this.yearMeta[year] && this.yearMeta[year][month].available);
    };
    MonthPickerComponent.prototype.isDateInBounds = function (year, month) {
        return this.isMonthInBounds(month) && this.isYearInBounds(year);
    };
    MonthPickerComponent.prototype.isMonthInBounds = function (month) {
        return month > -1 && month < MonthPickerComponent_1.MonthCount;
    };
    MonthPickerComponent.prototype.isYearInBounds = function (year) {
        return year > this.minYear && year < this.maxYear;
    };
    MonthPickerComponent.prototype.isMonthPreselected = function (year, month) {
        var tag = this.tag + ".isMonthPreselected()";
        if (this.debug)
            console.log(tag, year + "." + month);
        var isMonthPreselected = !!(this.isDateInBounds(year, month) &&
            this.yearMeta[year] && this.yearMeta[year][month].preselected);
        if (this.debug)
            console.log(tag, 'isMonthPreselected:', isMonthPreselected);
        return isMonthPreselected;
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
        this.iterateMonthMetas(this.deselectMonth);
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
        var _this = this;
        this.iterateMonthMetas(function (year, month) {
            _this.dePreselectMonth(year, month);
            _this.deselectMonth(year, month);
            _this.removeAvailableMonth(year, month);
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
    MonthPickerComponent.Tag = 'MonthPickerComponent';
    MonthPickerComponent.MonthCount = 12;
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "debug", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "expanded", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MonthPickerComponent.prototype, "expandedChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "currentYear", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MonthPickerComponent.prototype, "currentYearChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "prevYearBtnTap", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "nextYearBtnTap", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "deselect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "monthsPerRow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MonthPickerComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "locales", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MonthPickerComponent.prototype, "dateOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "expandable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "prevYearAvailable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "nextYearAvailable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MonthPickerComponent.prototype, "useAvailableMonths", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MonthPickerComponent.prototype, "closeBtnIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MonthPickerComponent.prototype, "prevYearBtnIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MonthPickerComponent.prototype, "nextYearBtnIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "maxSelectableMonths", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "minSelectableMonths", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "minYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MonthPickerComponent.prototype, "maxYear", void 0);
    MonthPickerComponent = MonthPickerComponent_1 = __decorate([
        Component({
            selector: 'vcl-month-picker',
            template: "<div class=\"vclDatePicker\" [class.vclLayoutHidden]=\"!expanded\"> <div class=\"vclDataGrid vclDGVAlignMiddle vclDGAlignCentered vclCalendar vclCalInput\" [attr.role]=\"'grid'\" [attr.tabindex]=\"tabindex\" [attr.aria-multiselectable]=\"maxSelectableMonths > 1\" [attr.aria-expanded]=\"expanded\"> <div class=\"vclLayoutFlex vclDGRow vclLayoutAuto\"> <div class=\"vclToolbar vclLayoutFlex vclLayoutHorizontal vclLayoutJustified vclLayoutCenter\" role=\"menubar\" aria-level=\"1\"> <button vcl-button class=\"vclButton vclTransparent vclSquare\" type=\"button\" [class.vclDisabled]=\"!prevYearAvailable\" [appIcon]=\"prevYearBtnIcon\" (click)=\"onPrevYearTap()\"> </button> <span class=\"vclCalHeaderLabel\">{{ currentYear }}</span> <button vcl-button type=\"button\" class=\"vclButton vclTransparent vclSquare\" [class.vclDisabled]=\"!nextYearAvailable\" [appIcon]=\"nextYearBtnIcon\" (click)=\"onNextYearTap()\"> </button> <button vcl-button *ngIf=\"expandable\" type=\"button\" class=\"vclButton vclTransparent vclSquare\" [appIcon]=\"closeBtnIcon\" (click)=\"onCloseBtnTap()\"> </button> </div> </div> <div class=\"vclSeparator\"></div> <ng-template ngFor let-iM [ngForOf]=\"months\" let-i=\"index\"> <div *ngIf=\"i % monthsPerRow === 0\" class=\"vclLayoutFlex vclDGRow vclLayoutAuto\" role=\"row\"> <div *ngFor=\"let jM of months.slice(i, (i + monthsPerRow > months.length ? months.length : i + monthsPerRow)); let j = index;\" (click)=\"selectMonth(currentYear, i+j)\" class=\"vclDGCell vclCalItem\" [class.vclAvailable]=\"!useAvailableMonths || currentMeta[i+j].available\" [class.vclUnavailable]=\"useAvailableMonths && !currentMeta[i+j].available\" [class.vclToday]=\"isCurrentMonth(i+j)\" [class.vclOtherMonth]=\"!isCurrentMonth(i+j)\" [class.vclDisabled]=\"useAvailableMonths && !currentMeta[i+j].available\" [class.vclSelected]=\"currentMeta[i+j].selected || currentMeta[i+j].preselected\" [style.background-color]=\"currentMeta[i+j].color\" [style.order]=\"i+j\" [attr.aria-selected]=\"currentMeta[i+j].selected || currentMeta[i+j].preselected\" role=\"gridcell\" tabindex=\"0\"> <div class=\"vclLayoutHorizontal vclLayoutCenterJustified vclMonthPickerListItemLabel\"> {{months[i + j]}} </div> </div> </div> </ng-template> </div> </div> ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MonthPickerComponent);
    return MonthPickerComponent;
    var MonthPickerComponent_1;
}());
export { MonthPickerComponent };
