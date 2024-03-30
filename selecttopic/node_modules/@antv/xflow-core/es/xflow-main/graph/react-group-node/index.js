import React from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { useXFlowApp } from '../../components/app-context';
import { XFlowGroupCommands } from '../../../command-contributions/constant';
export const XFlowDefaultGroupNode = props => {
    const { cell } = props;
    const app = useXFlowApp();
    const isCollapsed = props.data.isCollapsed || false;
    const onExpand = (e) => {
        e.preventDefault();
        app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: false,
        });
    };
    const onCollapse = (e) => {
        e.preventDefault();
        app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: true,
            gap: 3,
        });
    };
    return (React.createElement("div", { className: "xflow-default-group-node" },
        React.createElement("div", { className: "xflow-group-header" },
            React.createElement("div", { className: "header-left" }, props.data.label),
            React.createElement("div", { className: "header-right" },
                isCollapsed && React.createElement(PlusSquareOutlined, { onClick: onExpand }),
                !isCollapsed && React.createElement(MinusSquareOutlined, { onClick: onCollapse })))));
};
XFlowDefaultGroupNode.displayName = 'XFlowDefaultGroupNode';
//# sourceMappingURL=index.js.map