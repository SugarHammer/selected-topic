"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowToolbar = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var xflow_core_1 = require("@antv/xflow-core");
// component
var x6_react_components_1 = require("@antv/x6-react-components");
var toolbar_group_1 = require("./toolbar-group");
var service_1 = require("../service");
var classnames_2 = tslib_1.__importDefault(require("classnames"));
/** render toolbar */
var ToolbarRender = function (props) {
    var idx = props.idx, groups = props.groups, layout = props.layout, toolbarOptions = props.toolbarOptions;
    var _a = toolbarOptions.hoverEffect, hoverEffect = _a === void 0 ? true : _a;
    return (react_1.default.createElement(x6_react_components_1.Toolbar, { hoverEffect: hoverEffect }, groups.map(function (g, gIdx) {
        var key = idx + gIdx;
        return react_1.default.createElement(toolbar_group_1.ToolbarGroup, { key: key, group: g, layout: layout });
    })));
};
var InnerRender = function (props) {
    var _a;
    var _b = (0, service_1.useToolbarModel)(props), isModelReady = _b.isModelReady, state = _b.state;
    var positionStyle = (0, xflow_core_1.usePositionStyle)(props.position);
    var _c = state.mainGroups, mainGroups = _c === void 0 ? [] : _c, _d = state.extraGroups, extraGroups = _d === void 0 ? [] : _d, layout = state.layout, customRender = state.customRender;
    var containerClz = (0, classnames_2.default)(props.className, layout, 'xflow-toolbar');
    var clz = (0, classnames_1.default)((_a = {},
        _a[layout] = true,
        _a['xflow-toolbar-root'] = true,
        _a));
    // loading
    if (!isModelReady) {
        return (react_1.default.createElement("div", { className: containerClz, style: tslib_1.__assign(tslib_1.__assign({}, positionStyle), props.style) },
            react_1.default.createElement(antd_1.Spin, { spinning: true, size: "small" })));
    }
    // render custom component
    if (customRender) {
        return (react_1.default.createElement("div", { className: containerClz, style: tslib_1.__assign(tslib_1.__assign({}, positionStyle), props.style) }, react_1.default.createElement(customRender, { config: state })));
    }
    // render toolbars
    return (react_1.default.createElement("div", { className: containerClz, style: tslib_1.__assign(tslib_1.__assign({}, positionStyle), props.style) },
        react_1.default.createElement("div", { className: clz },
            mainGroups.length > 0 && (react_1.default.createElement(ToolbarRender, { idx: "mainGroups", groups: mainGroups, layout: layout, toolbarOptions: state })),
            extraGroups.length > 0 && (react_1.default.createElement(ToolbarRender, { idx: "extraGroups", groups: extraGroups, layout: layout, toolbarOptions: state })))));
};
/** connect 数据 */
exports.XFlowToolbar = react_1.default.memo(InnerRender);
//# sourceMappingURL=index.js.map