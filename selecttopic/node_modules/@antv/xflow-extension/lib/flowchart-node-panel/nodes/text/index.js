"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var constants_1 = require("../../constants");
var TextNode = function (props) {
    var _a = props.size, size = _a === void 0 ? { width: constants_1.NODE_WIDTH, height: constants_1.NODE_HEIGHT } : _a, _b = props.data, data = _b === void 0 ? {} : _b;
    var _c = data.label, label = _c === void 0 ? constants_1.DefaultNodeConfig.label : _c, _d = data.fontFill, fontFill = _d === void 0 ? constants_1.DefaultNodeConfig.fontFill : _d, _e = data.fontSize, fontSize = _e === void 0 ? constants_1.DefaultNodeConfig.fontSize : _e;
    var width = size.width, height = size.height;
    // 用于放大文本，避免看不清
    var scale = 2;
    return (react_1.default.createElement("svg", { viewBox: "0 0 ".concat(width / scale, " ").concat(height / scale), xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        react_1.default.createElement("text", { x: width / (2 * scale), y: height / (2 * scale), fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
exports.TextNode = TextNode;
//# sourceMappingURL=index.js.map