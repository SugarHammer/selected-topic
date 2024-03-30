import { __awaiter } from "tslib";
import React, { useState } from 'react';
import { Tree, Empty, Popover } from 'antd';
import { FolderFilled, FolderOpenFilled } from '@ant-design/icons';
import { Addon } from '@antv/x6';
import { getNodeReactComponent, useXFlowApp, XFlowConstants } from '@antv/xflow-core';
import { XFlowNode } from '../canvas-dag-extension/x6-extension/node';
const { DirectoryTree, TreeNode } = Tree;
const FolderIcon = ({ expanded }) => {
    return expanded ? React.createElement(FolderOpenFilled, null) : React.createElement(FolderFilled, null);
};
export const defaultNodeFactory = (args) => {
    return new XFlowNode(args);
};
export const renderNode = (props) => {
    const { nodeConfig, onMouseDown, graphConfig, modelService, commandService } = props;
    if (!graphConfig) {
        return React.createElement("div", null);
    }
    if (nodeConfig.renderComponent) {
        return (React.createElement("div", { onMouseDown: onMouseDown }, React.createElement(nodeConfig.renderComponent, {
            data: nodeConfig,
            isNodeTreePanel: true,
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
export const NodeTitle = (props) => {
    const [isVisible, setVisible] = useState(false);
    const [appContainer, setAppContainer] = useState();
    const { getGraphConfig } = useXFlowApp();
    getGraphConfig().then(graphConfig => {
        setAppContainer(graphConfig.appContainer);
    });
    const { prefixClz, graphConfig, commandService, modelService, popoverContent, onMouseDown, item, } = props;
    return (React.createElement(React.Fragment, null,
        popoverContent && (React.createElement(Popover, { placement: "right", destroyTooltipOnHide: true, content: popoverContent, visible: isVisible, onVisibleChange: val => {
                setVisible(val);
            }, getPopupContainer: () => appContainer || document.body },
            React.createElement("div", { className: `${prefixClz}-node-wrapper`, onMouseEnter: () => {
                    setVisible(true);
                } }, renderNode({
                graphConfig,
                commandService: commandService,
                onMouseDown,
                modelService,
                nodeConfig: item,
            })))),
        !popoverContent && (React.createElement("div", { className: `${prefixClz}-node-wrapper`, onMouseEnter: () => {
                setVisible(true);
            } }, renderNode({
            graphConfig,
            commandService: commandService,
            onMouseDown,
            modelService,
            nodeConfig: item,
        })))));
};
export const NodePanelBody = props => {
    const { x6NodeFactory, dndOptions, onNodeDrop, state, onFolderExpand, prefixClz } = props;
    const { graphProvider, modelService, commandService } = useXFlowApp();
    const [graphConfig, setConfig] = React.useState();
    const [dnd, setDnd] = React.useState();
    const [graph, setGraph] = React.useState();
    graphProvider.getGraphInstance().then(x6Graph => {
        setGraph(x6Graph);
    });
    React.useEffect(() => {
        graphProvider.getGraphOptions().then(x6GraphConfig => {
            setConfig(x6GraphConfig);
        });
        if (!graph) {
            return;
        }
        const dndInstance = new Addon.Dnd(Object.assign(Object.assign({ scaled: false, animation: false }, dndOptions), { target: graph, 
            /** 这里考虑到需要新增群组的需求，不使用x6的getDropNod方法
             * 在validateNode时调用command添加
             */
            validateNode: (droppingNode) => __awaiter(void 0, void 0, void 0, function* () {
                const nodeConfig = Object.assign(Object.assign({}, droppingNode.getData()), droppingNode.getPosition());
                if (onNodeDrop) {
                    yield onNodeDrop(nodeConfig, commandService, modelService);
                }
                else {
                    console.error('onNodeDrop method is required in NodeTree Panel');
                }
                return false;
            }) }));
        setDnd(dndInstance);
    }, [commandService, dndOptions, graph, graphProvider, modelService, onNodeDrop]);
    const onMouseDown = React.useCallback((nodeConfig) => (e) => {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        const renderKey = graphConfig.nodeTypeParser(nodeConfig);
        const reactComponent = nodeConfig.renderComponent
            ? nodeConfig.renderComponent
            : graphConfig.nodeRender.get(renderKey);
        const wrappedComponent = getNodeReactComponent(reactComponent, commandService, modelService);
        const nodeData = {
            data: nodeConfig,
            width: nodeConfig.width || 180,
            height: nodeConfig.height || 40,
            view: graphConfig.graphId,
            component: wrappedComponent,
        };
        const x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : defaultNodeFactory(nodeData);
        dnd.start(x6Node, e.nativeEvent);
    }, [commandService, dnd, graph, graphConfig, modelService, x6NodeFactory]);
    const renderTree = React.useCallback((treeList = []) => {
        return treeList.map(item => {
            const { isDirectory, children, popoverContent } = item;
            if (isDirectory) {
                return (React.createElement(TreeNode, { icon: FolderIcon, key: item.id, title: item.label, className: `${prefixClz}-tree-folder` }, renderTree(children)));
            }
            return (React.createElement(TreeNode, { isLeaf: true, key: item.id, className: `${prefixClz}-tree-leaf`, icon: React.createElement("span", null), title: React.createElement(NodeTitle, { item: item, onMouseDown: onMouseDown(item), popoverContent: popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }) }));
        });
    }, [commandService, graphConfig, modelService, onMouseDown, prefixClz]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-body`, style: props.style },
            !state.keyword && (React.createElement(DirectoryTree, { showIcon: true, selectable: false, autoExpandParent: false, onExpand: onFolderExpand, expandedKeys: state.expandedKeys, className: `${prefixClz}-tree` }, renderTree(state.treeData))),
            state.searchList.length > 0 && (React.createElement("ul", { className: `${prefixClz}-body-list` }, state.searchList.map(treeNode => (React.createElement("li", { className: `${prefixClz}-body-list-item` },
                React.createElement(NodeTitle, { item: treeNode, onMouseDown: onMouseDown(treeNode), popoverContent: treeNode.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig })))))),
            state.keyword && state.searchList.length === 0 && React.createElement(Empty, { style: { marginTop: '48px' } }))));
};
//# sourceMappingURL=panel-body.js.map