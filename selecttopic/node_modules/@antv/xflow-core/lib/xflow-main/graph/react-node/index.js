"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowDefaultNode = exports.AlgoIcon = exports.StatusEnum = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var icons_1 = require("@ant-design/icons");
var fontStyle = { fontSize: '16px', color: '#3057e3' };
/** 状态 类型 */
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["SUCCESS"] = "success";
    StatusEnum["PROCESSING"] = "processing";
    StatusEnum["ERROR"] = "error";
    StatusEnum["DEFAULT"] = "default";
    StatusEnum["WARNING"] = "warning";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
var AlgoIcon = function (props) {
    if (props.hide) {
        return null;
    }
    switch (props.status) {
        case StatusEnum.PROCESSING:
            return react_1.default.createElement(icons_1.RedoOutlined, { spin: true, style: { color: '#c1cdf7', fontSize: '16px' } });
        case StatusEnum.ERROR:
            return react_1.default.createElement(icons_1.CloseCircleOutlined, { style: { color: '#ff4d4f', fontSize: '16px' } });
        case StatusEnum.SUCCESS:
            return react_1.default.createElement(icons_1.CheckCircleOutlined, { style: { color: '#39ca74cc', fontSize: '16px' } });
        case StatusEnum.WARNING:
            return react_1.default.createElement(icons_1.ExclamationCircleOutlined, { style: { color: '#faad14', fontSize: '16px' } });
        case StatusEnum.DEFAULT:
            return react_1.default.createElement(icons_1.InfoCircleOutlined, { style: { color: '#d9d9d9', fontSize: '16px' } });
        default:
            return null;
    }
};
exports.AlgoIcon = AlgoIcon;
var XFlowDefaultNode = function (props) {
    var icon = react_1.default.isValidElement(props.data.icon) ? (props.data.icon) : (react_1.default.createElement(icons_1.DatabaseOutlined, { style: fontStyle }));
    return (react_1.default.createElement("div", { className: "xflow-default-node ".concat(props.isNodeTreePanel ? 'panel-node' : '') },
        react_1.default.createElement("span", { className: "icon" }, icon),
        react_1.default.createElement("span", { className: "label" }, props.data.label),
        react_1.default.createElement("span", { className: "status" },
            react_1.default.createElement(exports.AlgoIcon, { status: props.data && props.data.status, hide: props.isNodeTreePanel }))));
};
exports.XFlowDefaultNode = XFlowDefaultNode;
exports.XFlowDefaultNode.displayName = 'XFlowDefaultNode';
//# sourceMappingURL=index.js.map