"use strict";
var GrowlType;
(function (GrowlType) {
    GrowlType[GrowlType["None"] = 0] = "None";
    GrowlType[GrowlType["Info"] = 1] = "Info";
    GrowlType[GrowlType["Success"] = 2] = "Success";
    GrowlType[GrowlType["Warning"] = 3] = "Warning";
    GrowlType[GrowlType["Error"] = 4] = "Error";
})(GrowlType = exports.GrowlType || (exports.GrowlType = {}));
var GrowlPosition;
(function (GrowlPosition) {
    GrowlPosition[GrowlPosition["TopRight"] = 0] = "TopRight";
    GrowlPosition[GrowlPosition["Top"] = 1] = "Top";
    GrowlPosition[GrowlPosition["TopLeft"] = 2] = "TopLeft";
    GrowlPosition[GrowlPosition["BottomRight"] = 3] = "BottomRight";
    GrowlPosition[GrowlPosition["Bottom"] = 4] = "Bottom";
    GrowlPosition[GrowlPosition["BottomLeft"] = 5] = "BottomLeft";
})(GrowlPosition = exports.GrowlPosition || (exports.GrowlPosition = {}));
exports.GROWL_DEFAULTS = {
    html: false,
    type: GrowlType.None,
    position: GrowlPosition.TopRight,
    showCloseButton: true
};
exports.POSITION_CLASS_MAP = (_a = {},
    _a[GrowlPosition.TopRight] = 'vclLayerGrowlTopRight',
    _a[GrowlPosition.Top] = 'vclLayerGrowlTop',
    _a[GrowlPosition.TopLeft] = 'vclLayerGrowlTopLeft',
    _a[GrowlPosition.BottomRight] = 'vclLayerGrowlBottomRight',
    _a[GrowlPosition.Bottom] = 'vclLayerGrowlBottom',
    _a[GrowlPosition.BottomLeft] = 'vclLayerGrowlBottomLeft',
    _a);
exports.TYPE_CLASS_MAP = (_b = {},
    _b[GrowlType.None] = {
        growlClass: '',
        iconClass: ''
    },
    _b[GrowlType.Info] = {
        growlClass: 'vclInfo',
        iconClass: 'fa fa-info-circle'
    },
    _b[GrowlType.Success] = {
        growlClass: 'vclSuccess',
        iconClass: 'fa fa-check-circle'
    },
    _b[GrowlType.Warning] = {
        growlClass: 'vclWarning',
        iconClass: 'fa fa-warning'
    },
    _b[GrowlType.Error] = {
        growlClass: 'vclError',
        iconClass: 'fa fa-exclamation-circle'
    },
    _b);
var _a, _b;
