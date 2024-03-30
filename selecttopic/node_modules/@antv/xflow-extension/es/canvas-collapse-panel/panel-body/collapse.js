import React from 'react';
import { isReactComponent } from '@antv/xflow-core';
import { CaretRightOutlined } from '@ant-design/icons';
import { PanelNode } from './panel-node';
import { Empty } from 'antd';
export const CollapseList = props => {
    const { onActiveKeyChange, collapseData, prefixClz, onMouseDown, modelService, commandService, graphConfig, } = props;
    const renderHeader = (item) => {
        const { header, extra, icon, isCollapsed } = item;
        const onClick = (e) => {
            e.preventDefault();
            onActiveKeyChange(item.id);
        };
        return (React.createElement("div", { className: `xflow-collapse-header`, onClick: onClick },
            React.createElement("div", { className: `xflow-collapse-header-icon` }, isReactComponent(icon) ? (React.createElement(icon, { isCollapsed })) : (React.createElement(CaretRightOutlined, { rotate: isCollapsed ? 0 : 90, style: { fontSize: '12px' } }))),
            React.createElement("div", { className: `xflow-collapse-header-label` }, isReactComponent(header) ? React.createElement(header, item) : header),
            React.createElement("div", { className: `xflow-collapse-header-extra` }, isReactComponent(extra) ? React.createElement(extra, item) : extra)));
    };
    const renderChildren = (children) => {
        return (React.createElement("div", { className: `xflow-collapse-content` }, children.map(item => {
            return (React.createElement("div", { className: `xflow-collapse-content-item ${item.isDisabled ? 'disabled' : ''}`, key: item.id },
                React.createElement(PanelNode, { item: item, onMouseDown: onMouseDown(item), popoverContent: item.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig })));
        })));
    };
    return (React.createElement("ul", { className: "xflow-collapse-list" },
        collapseData.length === 0 && React.createElement(Empty, { style: { marginTop: '24px' } }),
        collapseData.map(collapseItem => {
            const { children = [], isCollapsed, render } = collapseItem;
            const clz = isCollapsed ? 'close' : 'open';
            return (React.createElement("li", { className: `xflow-collapse-list-item ${clz}`, key: collapseItem.id },
                renderHeader(collapseItem),
                isReactComponent(render)
                    ? React.createElement(render, collapseItem)
                    : renderChildren(children)));
        })));
};
//# sourceMappingURL=collapse.js.map