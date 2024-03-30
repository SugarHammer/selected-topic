"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePositionStyle = void 0;
var react_1 = require("react");
var usePositionStyle = function (conf) {
    if (conf === void 0) { conf = {}; }
    return (0, react_1.useMemo)(function () {
        var config = Object.entries(conf);
        var style = config.length > 0 ? { position: 'absolute' } : {};
        config.forEach(function (_a) {
            var key = _a[0], _b = _a[1], val = _b === void 0 ? 0 : _b;
            style[key] = "".concat(val, "px");
        });
        return style;
    }, [conf]);
};
exports.usePositionStyle = usePositionStyle;
//# sourceMappingURL=position.js.map