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
var GrowlComponent = (function () {
    function GrowlComponent(cdRef) {
        this.cdRef = cdRef;
        this.growls = [];
    }
    GrowlComponent.prototype.markForCheck = function () {
        this.cdRef.markForCheck();
    };
    return GrowlComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GrowlComponent.prototype, "growls", void 0);
GrowlComponent = __decorate([
    core_1.Component({
        templateUrl: 'growl.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [
            "\n     .vclLayerGrowlTopRight { left: auto; bottom: auto; top: 1em; right: 1em; }\n     .vclLayerGrowlTop { left: 0; bottom: auto; top: 1em; right: 0; }\n     .vclLayerGrowlTopLeft { left: 1em; bottom: auto; top: 1em; right: auto; }\n     .vclLayerGrowlBottomRight { left: auto; bottom: 1em; top: auto; right: 1em; }\n     .vclLayerGrowlBottom { left: 0; bottom: 1em; top: auto; right: 0; }\n     .vclLayerGrowlBottomLeft { left: 1em; bottom: 1em; top: auto; right: auto; }\n    "
        ],
        animations: [
            core_1.trigger('growlState', [
                core_1.state('visible', core_1.style({ opacity: 0.91 })),
                core_1.state('hovered', core_1.style({ opacity: 1.0 })),
                core_1.state('void', core_1.style({ opacity: 0 })),
                // TODO: leave animation not working
                // layer needs some changes so it destroys the wormhole comp instead of removing it
                // transition('void => *', [
                //   animate('200ms ease-in')
                // ]),
                // transition('* => void', [
                //   animate('200ms ease-out', style({ opacity: 0 }))
                // ]),
                core_1.transition('visible <=> hovered', core_1.animate('300ms'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], GrowlComponent);
exports.GrowlComponent = GrowlComponent;
