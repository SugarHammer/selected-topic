import React from 'react';
import { useXflowPrefixCls } from '@antv/xflow-core';
import { WorkspacePanel } from '../base-panel';
import { NodePanelBody } from './panel-body';
import { NodePanelHeader } from './panel-header';
import { NodePanelFooter } from './panel-footer';
import { usePanelLyaoutStyle } from './utils';
import { useTreePanelData, NsNodeTreePanelModel } from './service';
import * as NsNodeTreePanel from './interface';
const NodeTreePanelMain = props => {
    const { headerStyle, bodyStyle, footerStyle } = usePanelLyaoutStyle(props);
    const { state, onFolderExpand, onKeywordChange } = useTreePanelData(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(NodePanelHeader, Object.assign({}, props, { state: state, style: headerStyle, onKeywordChange: onKeywordChange })),
        React.createElement(NodePanelBody, Object.assign({}, props, { state: state, style: bodyStyle, onFolderExpand: onFolderExpand })),
        React.createElement(NodePanelFooter, Object.assign({}, props, { state: state, style: footerStyle }))));
};
const NodeTreePanel = props => {
    const prefixClz = useXflowPrefixCls('node-dnd-panel');
    return (React.createElement(WorkspacePanel, Object.assign({}, props, { className: prefixClz }),
        React.createElement(NodeTreePanelMain, Object.assign({}, props, { prefixClz: prefixClz }))));
};
export { NodeTreePanel, NsNodeTreePanelModel, NsNodeTreePanel };
//# sourceMappingURL=index.js.map