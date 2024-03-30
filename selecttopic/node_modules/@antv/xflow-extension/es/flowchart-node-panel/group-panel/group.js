import React from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { useXFlowApp, XFlowGroupCommands } from '@antv/xflow-core';
export const GroupNode = props => {
    const { cell, data: { label, stroke, fill, fontSize, fontFill, width = 200, isCollapsed = false }, } = props;
    const app = useXFlowApp();
    const onExpand = () => {
        app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: false,
            collapsedSize: { width, height: 40 },
        });
    };
    const onCollapse = () => {
        app.executeCommand(XFlowGroupCommands.COLLAPSE_GROUP.id, {
            nodeId: cell.id,
            isCollapsed: true,
            collapsedSize: { width, height: 40 },
            gap: 3,
        });
    };
    return (React.createElement("div", { className: "xflow-group-node", style: {
            borderColor: stroke,
            backgroundColor: fill,
            fontSize,
            color: fontFill,
        } },
        React.createElement("div", { className: "xflow-group-header" },
            React.createElement("div", { className: "header-left" }, label),
            React.createElement("div", { className: "header-right" },
                isCollapsed && React.createElement(PlusSquareOutlined, { onClick: onExpand }),
                !isCollapsed && React.createElement(MinusSquareOutlined, { onClick: onCollapse })))));
};
//# sourceMappingURL=group.js.map