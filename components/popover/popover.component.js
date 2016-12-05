"use strict";
var core_1 = require('@angular/core');
var overlayManager_service_1 = require('./overlayManager.service');
var PopoverComponent = (function () {
    function PopoverComponent(overlayManger, myElement, zone) {
        this.overlayManger = overlayManger;
        this.myElement = myElement;
        this.zone = zone;
        this.class = 'vclPopOver';
        this.zIndex = 10;
        this.coverZIndex = -1;
        this.targetAttachment = 'bottom left';
        this.attachment = 'top left';
        this.open = false;
        this.visible = false;
        this.layer = false;
        this.openChange = new core_1.EventEmitter();
        this.zIndexManaged = true;
        this.expandManaged = true;
        this.timeout = 0;
        this.state = 'open';
    }
    PopoverComponent.prototype.close = function () {
        this.state = 'void';
        this.open = false;
        this.openChange.emit(this.open);
    };
    PopoverComponent.prototype.offClick = function () {
        if (this.expandManaged && !this.layer) {
            this.close();
        }
    };
    PopoverComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        try {
            if (this.zIndexManaged) {
                if (changes.open.currentValue === true) {
                    this.zIndex = this.overlayManger.register(this);
                    this.coverZIndex = this.zIndex - 1;
                    this.state = 'open';
                    // TODO: Workaround for css "position relative" 
                    // Tether copies the dom element to the body. The component is removed before the copy is moved back
                    // so it is not destroyed 
                    setTimeout(function () { return _this.zone.run(function () { return _this.visible = true; }); }, this.timeout);
                }
                else if (changes.open.currentValue === false) {
                    this.state = 'void';
                    this.zIndex = this.overlayManger.unregister(this);
                    this.coverZIndex = -1;
                    setTimeout(function () { return _this.zone.run(function () { return _this.visible = false; }); }, this.timeout);
                }
            }
        }
        catch (ex) { }
    };
    PopoverComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-popover',
                    templateUrl: 'popover.component.html',
                    animations: [
                        core_1.trigger('popOverState', [])
                    ]
                },] },
    ];
    /** @nocollapse */
    PopoverComponent.ctorParameters = [
        { type: overlayManager_service_1.OverlayManagerService, },
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ];
    PopoverComponent.propDecorators = {
        'target': [{ type: core_1.Input },],
        'style': [{ type: core_1.Input },],
        'class': [{ type: core_1.Input },],
        'zIndex': [{ type: core_1.Input },],
        'targetAttachment': [{ type: core_1.Input },],
        'attachment': [{ type: core_1.Input },],
        'open': [{ type: core_1.Input },],
        'layer': [{ type: core_1.Input },],
        'openChange': [{ type: core_1.Output },],
        'zIndexManaged': [{ type: core_1.Input },],
        'expandManaged': [{ type: core_1.Input },],
        'timeout': [{ type: core_1.Input },],
    };
    return PopoverComponent;
}());
exports.PopoverComponent = PopoverComponent;
