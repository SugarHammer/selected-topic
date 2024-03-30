"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFormItemExtra = exports.Tooltip = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var Tooltip = function (props) {
    var text = props.text, otherProps = tslib_1.__rest(props, ["text"]);
    if (!text) {
        return null;
    }
    return (react_1.default.createElement(antd_1.Tooltip, tslib_1.__assign({ placement: "left", title: text }, otherProps),
        react_1.default.createElement("div", { className: "text-truncate" }, text)));
};
exports.Tooltip = Tooltip;
// 渲染 FormItem 的 extra 项
function renderFormItemExtra(text) {
    if (!text) {
        return undefined;
    }
    return react_1.default.createElement(exports.Tooltip, { text: text });
}
exports.renderFormItemExtra = renderFormItemExtra;
//# sourceMappingURL=index.js.map