"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var icons_1 = require("@ant-design/icons");
var xflow_core_1 = require("@antv/xflow-core");
var GroupNode = function (props) {
    var cell = props.cell, _a = props.data, label = _a.label, stroke = _a.stroke, fill = _a.fill, fontSize = _a.fontSize, fontFill = _a.fontFill, _b = _a.width, width = _b === void 0 ? 200 : _b, _c = _a.isCollapsed, isCollapsed = _c === void 0 ? false : _c;
    var app = (0, xflow_core_1.useXFlowApp)();
    var onExpand = function () {
        app.executeCommand(xflow_core_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: false,
            collapsedSize: { width: width, height: 40 },
        });
    };
    var onCollapse = function () {
        app.executeCommand(xflow_core_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: true,
            collapsedSize: { width: width, height: 40 },
            gap: 3,
        });
    };
    return (react_1.default.createElement("div", { className: "xflow-group-node", style: {
            borderColor: stroke,
            backgroundColor: fill,
            fontSize: fontSize,
            color: fontFill,
        } },
        react_1.default.createElement("div", { className: "xflow-group-header" },
            react_1.default.createElement("div", { className: "header-left" }, label),
            react_1.default.createElement("div", { className: "header-right" },
                isCollapsed && react_1.default.createElement(icons_1.PlusSquareOutlined, { onClick: onExpand }),
                !isCollapsed && react_1.default.createElement(icons_1.MinusSquareOutlined, { onClick: onCollapse })))));
};
exports.GroupNode = GroupNode;
//# sourceMappingURL=group.js.map