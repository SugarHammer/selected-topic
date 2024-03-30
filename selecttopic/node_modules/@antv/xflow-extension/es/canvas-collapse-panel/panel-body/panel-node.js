import React from 'react';
import { XFlowConstants } from '@antv/xflow-core';
import { Popover } from 'antd';
export const renderNode = (props) => {
    const { nodeConfig, onMouseDown, graphConfig, modelService, commandService } = props;
    if (!graphConfig) {
        return React.createElement("div", null);
    }
    if (nodeConfig.renderComponent) {
        return (React.createElement("div", { onMouseDown: onMouseDown }, React.createElement(nodeConfig.renderComponent, {
            data: nodeConfig,
            isNodePanel: true,
        })));
    }
    const renderKey = graphConfig.nodeTypeParser(nodeConfig) || XFlowConstants.XFLOW_DEFAULT_NODE;
    const reactComponent = graphConfig.nodeRender.get(renderKey);
    return (React.createElement("div", { onMouseDown: onMouseDown }, React.createElement(reactComponent, {
        commandService,
        modelService,
        data: nodeConfig,
        isNodeTreePanel: true,
    })));
};
export const PanelNode = props => {
    const [isVisible, setVisible] = React.useState(false);
    const { prefixClz, graphConfig, commandService, modelService, popoverContent, onMouseDown, item, } = props;
    return (React.createElement(React.Fragment, null, popoverContent ? (React.createElement(Popover, { placement: "right", destroyTooltipOnHide: true, content: popoverContent, visible: isVisible, onVisibleChange: val => {
            setVisible(val);
        } },
        React.createElement("div", { className: `${prefixClz}-node-wrapper`, onMouseEnter: () => {
                setVisible(true);
            } }, renderNode({
            graphConfig,
            commandService: commandService,
            onMouseDown,
            modelService,
            nodeConfig: item,
        })))) : (React.createElement("div", { className: `${prefixClz}-node-wrapper` }, renderNode({
        graphConfig,
        commandService: commandService,
        onMouseDown,
        modelService,
        nodeConfig: item,
    })))));
};
//# sourceMappingURL=panel-node.js.map