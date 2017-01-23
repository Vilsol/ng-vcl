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
var utils_1 = require("../../utils");
var MetalistComponent = (function () {
    function MetalistComponent() {
        this.minSelectableItems = 1;
        this.maxSelectableItems = 1;
        this.select = new core_1.EventEmitter(); // returns all items
    }
    MetalistComponent.prototype.next = function () {
        // console.log('next');
        var oldIndex = this.getMarkedItemIndex();
        if (oldIndex !== -1) {
            var newIndex = oldIndex + 1;
            if (this.items.length > newIndex) {
                this.setMarkedIndex(newIndex);
            }
        }
        else {
            this.setMarkedIndex(0);
        }
    };
    MetalistComponent.prototype.prev = function () {
        // console.log('prev');
        var oldIndex = this.getMarkedItemIndex();
        if (oldIndex !== -1) {
            var newIndex = oldIndex - 1;
            if (newIndex >= 0) {
                this.setMarkedIndex(newIndex);
            }
        }
    };
    MetalistComponent.prototype.ngOnInit = function () {
        if (!this.meta) {
            // create meta if not present
            this.meta = [];
        }
    };
    MetalistComponent.prototype.metaFromItem = function (item) {
        var i = this.items.indexOf(item);
        return this.meta[i];
    };
    MetalistComponent.prototype.selectItem = function (item) {
        // console.log('selectItem');
        if (!utils_1.includes(this.items, item))
            return false;
        var itemIndex = this.items.indexOf(item);
        // maxSelectableItems === 1 -> deselect old item
        if (this.maxSelectableItems === 1) {
            // TODO is metaItems even used?
            var metaItems = this.meta.filter(function (obj) {
                return obj && obj.selected === true;
            });
            for (var i = 0; i < metaItems.length; i++) {
                metaItems[i].selected = false;
            }
        }
        var metaItem = this.metaFromItem(item);
        if (this.getSelectedItems().length < this.maxSelectableItems &&
            metaItem)
            metaItem.selected = true;
        this.select.emit(this.getSelectedItems());
        return true;
    };
    MetalistComponent.prototype.deSelectItem = function (item) {
        // console.log('deSelectItem');
        var itemIndex = this.items.indexOf(item);
        if (itemIndex === -1) {
            return;
        }
        if (this.meta[itemIndex]) {
            this.meta[itemIndex].selected = false;
        }
        this.select.emit(this.getSelectedItems());
    };
    MetalistComponent.prototype.getSelectedItems = function () {
        var _this = this;
        // console.log('getSelectedItems');
        var result = this.meta
            .filter(function (obj) { return obj.selected; })
            .map(function (metaItem) { return _this.items[_this.meta.indexOf(metaItem)]; });
        return result;
    };
    MetalistComponent.prototype.setSelectedItems = function () {
    };
    MetalistComponent.prototype.ngAfterContentInit = function () { };
    MetalistComponent.prototype.getMarkedItemIndex = function () {
        // console.log('getMarkedItemIndex');
        var meta = this.getMarkedItemMeta();
        if (meta) {
            return this.meta.indexOf(meta);
        }
        return -1;
    };
    MetalistComponent.prototype.getMarkedItemMeta = function () {
        // console.log('getMarkedItemMeta');
        return this.meta.filter(function (obj) { return obj.marked; })[0];
    };
    MetalistComponent.prototype.setMarkedIndex = function (index) {
        // console.log('setMarkedIndex');
        // unset old item
        var oldItem = this.getMarkedItemMeta();
        if (oldItem) {
            oldItem.marked = false;
        }
        var meta = this.meta[index];
        if (meta) {
            meta.marked = true;
        }
    };
    MetalistComponent.prototype.setMarkedItem = function (item) {
        // console.log('setMarkedItem');
        var markedIndex = this.items.indexOf(item);
        if (markedIndex !== -1) {
            this.setMarkedIndex(markedIndex);
        }
    };
    MetalistComponent.prototype.getMeta = function (item) {
        // console.log('getMeta');
        // console.dir(this.items);
        var key = this.items.indexOf(item);
        if (!this.meta[key]) {
            this.meta[key] = {};
        }
        // console.dir(JSON.stringify(this.meta[key]));
        return this.meta[key];
    };
    return MetalistComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MetalistComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MetalistComponent.prototype, "meta", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MetalistComponent.prototype, "minSelectableItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MetalistComponent.prototype, "maxSelectableItems", void 0);
__decorate([
    core_1.Output('select'),
    __metadata("design:type", Object)
], MetalistComponent.prototype, "select", void 0);
__decorate([
    core_1.ContentChild(core_1.TemplateRef),
    __metadata("design:type", Object)
], MetalistComponent.prototype, "template1", void 0);
MetalistComponent = __decorate([
    core_1.Component({
        selector: 'vcl-metalist',
        templateUrl: 'metalist.component.html',
    }),
    __metadata("design:paramtypes", [])
], MetalistComponent);
exports.MetalistComponent = MetalistComponent;
