"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_NODE_PORT = exports.NsPortEvent = void 0;
var tslib_1 = require("tslib");
var NsPortEvent;
(function (NsPortEvent) {
    NsPortEvent.MOUSE_ENTER = 'node-port:mouseenter';
    NsPortEvent.MOUSE_LEAVE = 'node-port:mouseleave';
})(NsPortEvent = exports.NsPortEvent || (exports.NsPortEvent = {}));
var ACTIVE_NODE_PORT;
(function (ACTIVE_NODE_PORT) {
    var _this = this;
    ACTIVE_NODE_PORT.id = 'ACTIVE_NODE_PORT';
    ACTIVE_NODE_PORT.useModel = function (modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var model, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, modelService.awaitModel(ACTIVE_NODE_PORT.id)];
                case 1:
                    model = _a.sent();
                    return [4 /*yield*/, model.getValidValue()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, { data: data, model: model }];
            }
        });
    }); };
})(ACTIVE_NODE_PORT = exports.ACTIVE_NODE_PORT || (exports.ACTIVE_NODE_PORT = {}));
//# sourceMappingURL=interface.js.map