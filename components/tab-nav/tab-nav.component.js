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
var Observable_1 = require("rxjs/Observable");
var wormhole_module_1 = require("./../../directives/wormhole/wormhole.module");
var core_1 = require("@angular/core");
var TabLabelDirective = (function (_super) {
    __extends(TabLabelDirective, _super);
    function TabLabelDirective(templateRef) {
        var _this = _super.call(this, templateRef) || this;
        _this.templateRef = templateRef;
        return _this;
    }
    return TabLabelDirective;
}(wormhole_module_1.TemplateWormhole));
TabLabelDirective = __decorate([
    core_1.Directive({
        selector: '[vcl-tab-label]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], TabLabelDirective);
exports.TabLabelDirective = TabLabelDirective;
var TabContentDirective = (function (_super) {
    __extends(TabContentDirective, _super);
    function TabContentDirective(templateRef) {
        var _this = _super.call(this, templateRef) || this;
        _this.templateRef = templateRef;
        return _this;
    }
    return TabContentDirective;
}(wormhole_module_1.TemplateWormhole));
TabContentDirective = __decorate([
    core_1.Directive({
        selector: '[vcl-tab-content]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], TabContentDirective);
exports.TabContentDirective = TabContentDirective;
var TabComponent = (function () {
    function TabComponent() {
        this.disabled = false;
        this.tabClass = '';
    }
    return TabComponent;
}());
__decorate([
    core_1.ContentChild(TabLabelDirective),
    __metadata("design:type", TabLabelDirective)
], TabComponent.prototype, "label", void 0);
__decorate([
    core_1.ContentChild(TabContentDirective),
    __metadata("design:type", TabContentDirective)
], TabComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabComponent.prototype, "tabClass", void 0);
TabComponent = __decorate([
    core_1.Directive({
        selector: 'vcl-tab'
    }),
    __metadata("design:paramtypes", [])
], TabComponent);
exports.TabComponent = TabComponent;
var TabNavComponent = (function () {
    function TabNavComponent() {
        this.layout = '';
        this.tabbableClass = '';
        this.tabsClass = '';
        this.tabContentClass = '';
        // Sets vclTabStyleUni on vclTabs and removes vclNoBorder on vclTabContent when true
        this.borders = false;
        this.selectedTabIndex = 0;
        this.selectedTabIndexChange$ = new core_1.EventEmitter();
    }
    Object.defineProperty(TabNavComponent.prototype, "selectedTabIndexChange", {
        get: function () {
            return this.selectedTabIndexChange$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabNavComponent.prototype, "tabsHaveContent", {
        // If any of the tabs has we do not render the shared content template
        // as it might be one the tabs content templates 
        get: function () {
            return this.tabs.some(function (tab) { return !!tab.content; });
        },
        enumerable: true,
        configurable: true
    });
    // Sets a valid selectedTabIndex
    TabNavComponent.prototype.selectTab = function (tab) {
        var tabs = this.tabs.toArray();
        var tabIdx;
        var tabComp;
        if (tab instanceof TabComponent) {
            tabIdx = tabs.indexOf(tab);
            tabComp = tab;
        }
        else if (typeof tab === 'number' && tabs[tab]) {
            tabIdx = tab;
            tabComp = tabs[tabIdx];
        }
        else {
            tabIdx = -1;
            tabComp = null;
        }
        if (tabIdx >= 0 && tab instanceof TabComponent && !tab.disabled) {
            this.selectedTabIndex = tabIdx;
            this.selectedTabIndexChange$.emit(tabIdx);
        }
    };
    return TabNavComponent;
}());
__decorate([
    core_1.ContentChildren(TabComponent),
    __metadata("design:type", core_1.QueryList)
], TabNavComponent.prototype, "tabs", void 0);
__decorate([
    core_1.ContentChild(TabContentDirective),
    __metadata("design:type", TabContentDirective)
], TabNavComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "layout", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "tabbableClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "tabsClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "tabContentClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabNavComponent.prototype, "borders", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TabNavComponent.prototype, "selectedTabIndex", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Observable_1.Observable),
    __metadata("design:paramtypes", [])
], TabNavComponent.prototype, "selectedTabIndexChange", null);
TabNavComponent = __decorate([
    core_1.Component({
        selector: 'vcl-tab-nav',
        templateUrl: 'tab-nav.component.html'
    }),
    __metadata("design:paramtypes", [])
], TabNavComponent);
exports.TabNavComponent = TabNavComponent;
