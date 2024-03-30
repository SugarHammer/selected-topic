"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePanelCollapseBtn = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var icons_1 = require("@ant-design/icons");
/** collapseBtn */
var NodePanelCollapseBtn = function (props) {
    var prefixClz = props.prefixClz, onCollapseBtnClick = props.onCollapseBtnClick, isCollapsed = props.isCollapsed, collapseButtonStyle = props.collapseButtonStyle, style = props.style;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-header"), style: tslib_1.__assign(tslib_1.__assign({}, style), collapseButtonStyle), onClick: onCollapseBtnClick },
            react_1.default.createElement(icons_1.CaretLeftOutlined, { rotate: isCollapsed ? 180 : 0 }))));
};
exports.NodePanelCollapseBtn = NodePanelCollapseBtn;
//# sourceMappingURL=panel-collapse-btn.js.map