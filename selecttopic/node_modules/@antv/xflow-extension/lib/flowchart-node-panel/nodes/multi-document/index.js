"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiDocumentNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var utils_1 = require("../../utils");
var constants_1 = require("../../constants");
var MultiDocumentNode = function (props) {
    var _a = props.size, size = _a === void 0 ? { width: constants_1.NODE_WIDTH, height: constants_1.NODE_HEIGHT } : _a, _b = props.data, data = _b === void 0 ? {} : _b;
    var _c = data.stroke, stroke = _c === void 0 ? constants_1.DefaultNodeConfig.stroke : _c, _d = data.label, label = _d === void 0 ? constants_1.DefaultNodeConfig.label : _d, _e = data.fill, fill = _e === void 0 ? constants_1.DefaultNodeConfig.fill : _e, _f = data.fontFill, fontFill = _f === void 0 ? constants_1.DefaultNodeConfig.fontFill : _f, _g = data.fontSize, fontSize = _g === void 0 ? constants_1.DefaultNodeConfig.fontSize : _g;
    var multipleWidth = 6;
    var padding = constants_1.NODE_PADDING;
    var multiPadding = multipleWidth / 2;
    var width = size.width, height = size.height;
    width += multipleWidth;
    height += multipleWidth;
    var bezierX = width / 8;
    var bezierY = height / 8;
    var path = [
        ['M', padding + multiPadding, padding],
        ['L', width - 2 * padding, padding],
        ['L', width - 2 * padding, height - 2 * padding - bezierY],
        [
            'C',
            width - 2 * padding - bezierX,
            height - 2 * padding - 2 * bezierY,
            width / 2 + bezierX,
            height - 2 * padding - 2 * bezierY,
        ],
        ['', width / 2, height - 2 * padding - bezierY],
        [
            'S',
            width / 4,
            height - 2 * padding,
            padding + multiPadding,
            height - 2 * padding - 2 * bezierY,
        ],
        ['L', padding + multiPadding, padding], // top-left
    ];
    return (react_1.default.createElement("svg", { viewBox: "0 0 ".concat(width, " ").concat(height), xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        react_1.default.createElement("path", { d: (0, utils_1.createPath)(path), fill: fill, stroke: stroke }),
        react_1.default.createElement("path", { d: (0, utils_1.createPath)(path, -multipleWidth / 2, multipleWidth / 2), fill: fill, stroke: stroke }),
        react_1.default.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
exports.MultiDocumentNode = MultiDocumentNode;
//# sourceMappingURL=index.js.map