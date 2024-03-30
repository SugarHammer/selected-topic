import React from 'react';
import { DatabaseOutlined, RedoOutlined, CloseCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, } from '@ant-design/icons';
const fontStyle = { fontSize: '16px', color: '#3057e3' };
/** 状态 类型 */
export var StatusEnum;
(function (StatusEnum) {
    StatusEnum["SUCCESS"] = "success";
    StatusEnum["PROCESSING"] = "processing";
    StatusEnum["ERROR"] = "error";
    StatusEnum["DEFAULT"] = "default";
    StatusEnum["WARNING"] = "warning";
})(StatusEnum || (StatusEnum = {}));
export const AlgoIcon = props => {
    if (props.hide) {
        return null;
    }
    switch (props.status) {
        case StatusEnum.PROCESSING:
            return React.createElement(RedoOutlined, { spin: true, style: { color: '#c1cdf7', fontSize: '16px' } });
        case StatusEnum.ERROR:
            return React.createElement(CloseCircleOutlined, { style: { color: '#ff4d4f', fontSize: '16px' } });
        case StatusEnum.SUCCESS:
            return React.createElement(CheckCircleOutlined, { style: { color: '#39ca74cc', fontSize: '16px' } });
        case StatusEnum.WARNING:
            return React.createElement(ExclamationCircleOutlined, { style: { color: '#faad14', fontSize: '16px' } });
        case StatusEnum.DEFAULT:
            return React.createElement(InfoCircleOutlined, { style: { color: '#d9d9d9', fontSize: '16px' } });
        default:
            return null;
    }
};
export const XFlowDefaultNode = props => {
    const icon = React.isValidElement(props.data.icon) ? (props.data.icon) : (React.createElement(DatabaseOutlined, { style: fontStyle }));
    return (React.createElement("div", { className: `xflow-default-node ${props.isNodeTreePanel ? 'panel-node' : ''}` },
        React.createElement("span", { className: "icon" }, icon),
        React.createElement("span", { className: "label" }, props.data.label),
        React.createElement("span", { className: "status" },
            React.createElement(AlgoIcon, { status: props.data && props.data.status, hide: props.isNodeTreePanel }))));
};
XFlowDefaultNode.displayName = 'XFlowDefaultNode';
//# sourceMappingURL=index.js.map