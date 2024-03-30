"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var constants_1 = require("../../constants");
var ConnectorNode = function (props) {
    var _a = props.size, size = _a === void 0 ? { width: constants_1.NODE_WIDTH, height: constants_1.NODE_HEIGHT } : _a, _b = props.data, data = _b === void 0 ? {} : _b;
    var _c = data.stroke, stroke = _c === void 0 ? constants_1.DefaultNodeConfig.stroke : _c, _d = data.label, label = _d === void 0 ? constants_1.DefaultNodeConfig.label : _d, _e = data.fill, fill = _e === void 0 ? constants_1.DefaultNodeConfig.fill : _e, _f = data.fontFill, fontFill = _f === void 0 ? constants_1.DefaultNodeConfig.fontFill : _f, _g = data.fontSize, fontSize = _g === void 0 ? constants_1.DefaultNodeConfig.fontSize : _g;
    var width = size.width, height = size.height;
    var availableR = height - 2 * constants_1.NODE_PADDING;
    return (react_1.default.createElement("svg", { viewBox: "0 0 ".concat(width, " ").concat(height), xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        react_1.default.createElement("path", { d: "M ".concat(constants_1.NODE_PADDING, ",").concat(height / 2, " a ").concat(availableR / 2, " ").concat(availableR / 2, " 0 1 1 0 1 z"), fill: fill, stroke: stroke }),
        react_1.default.createElement("text", { x: height / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
exports.ConnectorNode = ConnectorNode;
//# sourceMappingURL=index.js.map