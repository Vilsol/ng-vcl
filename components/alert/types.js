"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertType;
(function (AlertType) {
    AlertType[AlertType["None"] = 0] = "None";
    AlertType[AlertType["Question"] = 1] = "Question";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Success"] = 3] = "Success";
    AlertType[AlertType["Warning"] = 4] = "Warning";
    AlertType[AlertType["Error"] = 5] = "Error";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
var AlertAlignment;
(function (AlertAlignment) {
    AlertAlignment[AlertAlignment["Left"] = 0] = "Left";
    AlertAlignment[AlertAlignment["Center"] = 1] = "Center";
    AlertAlignment[AlertAlignment["Right"] = 2] = "Right";
})(AlertAlignment = exports.AlertAlignment || (exports.AlertAlignment = {}));
var AlertInput;
(function (AlertInput) {
    AlertInput[AlertInput["None"] = 0] = "None";
    AlertInput[AlertInput["Text"] = 1] = "Text";
})(AlertInput = exports.AlertInput || (exports.AlertInput = {}));
exports.ALERT_DEFAULTS = {
    type: AlertType.None,
    html: false,
    showConfirmButton: true,
    showCancelButton: false,
    showCloseButton: false,
    offClickClose: true,
    escClose: true,
    cancelButtonLabel: 'Cancel',
    cancelButtonClass: 'vclDanger',
    confirmButtonLabel: 'OK',
    confirmButtonClass: 'vclEmphasized',
    loader: false,
    loaderOnConfirm: false,
    input: AlertInput.None,
    contentAlignment: AlertAlignment.Left,
    titleAlignment: AlertAlignment.Left,
    iconAlignment: AlertAlignment.Left,
    buttonAlignment: AlertAlignment.Right,
};
exports.TYPE_CLASS_MAP = (_a = {},
    _a[AlertType.None] = {
        alertClass: '',
        iconClass: ''
    },
    _a[AlertType.Question] = {
        alertClass: '',
        iconClass: 'fa fa-question-circle'
    },
    _a[AlertType.Info] = {
        alertClass: 'vclInfo',
        iconClass: 'fa fa-info-circle'
    },
    _a[AlertType.Success] = {
        alertClass: 'vclSuccess',
        iconClass: 'fa fa-check-circle'
    },
    _a[AlertType.Warning] = {
        alertClass: 'vclWarning',
        iconClass: 'fa fa-warning'
    },
    _a[AlertType.Error] = {
        alertClass: 'vclError',
        iconClass: 'fa fa-exclamation-circle'
    },
    _a);
exports.TEXT_ALIGNMENT_CLASS_MAP = (_b = {},
    _b[AlertAlignment.Left] = 'vclAlignLeft',
    _b[AlertAlignment.Center] = 'vclAlignCentered',
    _b[AlertAlignment.Right] = 'vclAlignRight',
    _b);
exports.BUTTON_ALIGNMENT_CLASS_MAP = (_c = {},
    _c[AlertAlignment.Left] = 'vclLayoutStartJustified',
    _c[AlertAlignment.Center] = 'vclLayoutCenterJustified',
    _c[AlertAlignment.Right] = 'vclLayoutEndJustified',
    _c);
var AlertError = (function (_super) {
    __extends(AlertError, _super);
    function AlertError(reason, message) {
        var _this = _super.call(this, message) || this;
        _this.reason = reason;
        return _this;
    }
    return AlertError;
}(Error));
exports.AlertError = AlertError;
var _a, _b, _c;
