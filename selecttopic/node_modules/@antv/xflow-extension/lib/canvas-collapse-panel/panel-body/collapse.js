"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseList = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var icons_1 = require("@ant-design/icons");
var panel_node_1 = require("./panel-node");
var antd_1 = require("antd");
var CollapseList = function (props) {
    var onActiveKeyChange = props.onActiveKeyChange, collapseData = props.collapseData, prefixClz = props.prefixClz, onMouseDown = props.onMouseDown, modelService = props.modelService, commandService = props.commandService, graphConfig = props.graphConfig;
    var renderHeader = function (item) {
        var header = item.header, extra = item.extra, icon = item.icon, isCollapsed = item.isCollapsed;
        var onClick = function (e) {
            e.preventDefault();
            onActiveKeyChange(item.id);
        };
        return (react_1.default.createElement("div", { className: "xflow-collapse-header", onClick: onClick },
            react_1.default.createElement("div", { className: "xflow-collapse-header-icon" }, (0, xflow_core_1.isReactComponent)(icon) ? (react_1.default.createElement(icon, { isCollapsed: isCollapsed })) : (react_1.default.createElement(icons_1.CaretRightOutlined, { rotate: isCollapsed ? 0 : 90, style: { fontSize: '12px' } }))),
            react_1.default.createElement("div", { className: "xflow-collapse-header-label" }, (0, xflow_core_1.isReactComponent)(header) ? react_1.default.createElement(header, item) : header),
            react_1.default.createElement("div", { className: "xflow-collapse-header-extra" }, (0, xflow_core_1.isReactComponent)(extra) ? react_1.default.createElement(extra, item) : extra)));
    };
    var renderChildren = function (children) {
        return (react_1.default.createElement("div", { className: "xflow-collapse-content" }, children.map(function (item) {
            return (react_1.default.createElement("div", { className: "xflow-collapse-content-item ".concat(item.isDisabled ? 'disabled' : ''), key: item.id },
                react_1.default.createElement(panel_node_1.PanelNode, { item: item, onMouseDown: onMouseDown(item), popoverContent: item.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig })));
        })));
    };
    return (react_1.default.createElement("ul", { className: "xflow-collapse-list" },
        collapseData.length === 0 && react_1.default.createElement(antd_1.Empty, { style: { marginTop: '24px' } }),
        collapseData.map(function (collapseItem) {
            var _a = collapseItem.children, children = _a === void 0 ? [] : _a, isCollapsed = collapseItem.isCollapsed, render = collapseItem.render;
            var clz = isCollapsed ? 'close' : 'open';
            return (react_1.default.createElement("li", { className: "xflow-collapse-list-item ".concat(clz), key: collapseItem.id },
                renderHeader(collapseItem),
                (0, xflow_core_1.isReactComponent)(render)
                    ? react_1.default.createElement(render, collapseItem)
                    : renderChildren(children)));
        })));
};
exports.CollapseList = CollapseList;
//# sourceMappingURL=collapse.js.map