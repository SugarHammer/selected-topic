"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowDefaultGroupNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var icons_1 = require("@ant-design/icons");
var app_context_1 = require("../../components/app-context");
var constant_1 = require("../../../command-contributions/constant");
var XFlowDefaultGroupNode = function (props) {
    var cell = props.cell;
    var app = (0, app_context_1.useXFlowApp)();
    var isCollapsed = props.data.isCollapsed || false;
    var onExpand = function (e) {
        e.preventDefault();
        app.executeCommand(constant_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: false,
        });
    };
    var onCollapse = function (e) {
        e.preventDefault();
        app.executeCommand(constant_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: true,
            gap: 3,
        });
    };
    return (react_1.default.createElement("div", { className: "xflow-default-group-node" },
        react_1.default.createElement("div", { className: "xflow-group-header" },
            react_1.default.createElement("div", { className: "header-left" }, props.data.label),
            react_1.default.createElement("div", { className: "header-right" },
                isCollapsed && react_1.default.createElement(icons_1.PlusSquareOutlined, { onClick: onExpand }),
                !isCollapsed && react_1.default.createElement(icons_1.MinusSquareOutlined, { onClick: onCollapse })))));
};
exports.XFlowDefaultGroupNode = XFlowDefaultGroupNode;
exports.XFlowDefaultGroupNode.displayName = 'XFlowDefaultGroupNode';
//# sourceMappingURL=index.js.map