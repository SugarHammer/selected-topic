"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANVAS_SCALE_TOOLBAR_CONFIG = exports.CanvasScaleToolbar = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var canvas_toolbar_1 = require("../canvas-toolbar");
var config_1 = require("./config");
Object.defineProperty(exports, "CANVAS_SCALE_TOOLBAR_CONFIG", { enumerable: true, get: function () { return config_1.CANVAS_SCALE_TOOLBAR_CONFIG; } });
var CanvasScaleToolbar = function (props) {
    var config = (0, config_1.useConfig)(props);
    return (react_1.default.createElement(canvas_toolbar_1.CanvasToolbar, tslib_1.__assign({ layout: "vertical" }, props, { config: config, position: props.position || { top: 12, right: 12 } })));
};
exports.CanvasScaleToolbar = CanvasScaleToolbar;
//# sourceMappingURL=index.js.map