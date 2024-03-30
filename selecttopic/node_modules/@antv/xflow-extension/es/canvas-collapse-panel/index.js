import React, { useState, useCallback } from 'react';
import { useXflowPrefixCls } from '@antv/xflow-core';
import { WorkspacePanel } from '../base-panel';
import { CollapsePanelBody } from './panel-body';
import { NodePanelHeader } from './panel-header';
import { NodePanelFooter } from './panel-footer';
import { NodePanelCollapseBtn } from './panel-collapse-btn';
import { usePanelLyaoutStyle } from './utils';
import { useCollapsePanelData } from './service';
import { NsCollapsePanelModel } from './interface';
import * as NsNodeCollapsePanel from './interface';
const CollapsePanelMain = props => {
    const { headerStyle, bodyStyle, footerStyle } = usePanelLyaoutStyle(props);
    const { state, onActiveKeyChange, onKeywordChange } = useCollapsePanelData(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(NodePanelHeader, Object.assign({}, props, { state: state, style: headerStyle, onKeywordChange: onKeywordChange })),
        React.createElement(CollapsePanelBody, Object.assign({}, props, { state: state, style: bodyStyle, onActiveKeyChange: onActiveKeyChange })),
        React.createElement(NodePanelFooter, Object.assign({}, props, { state: state, style: footerStyle }))));
};
const NodeCollapsePanel = props => {
    const { position, collapsible, onCollapseChange } = props;
    const { width = 200, left } = position;
    const prefixClz = useXflowPrefixCls('collapse-panel');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleBtnClick = useCallback(() => {
        setIsCollapsed(!isCollapsed);
        onCollapseChange(!isCollapsed);
    }, [isCollapsed, onCollapseChange]);
    return (React.createElement(WorkspacePanel, Object.assign({}, props, { className: prefixClz, position: Object.assign(Object.assign({}, position), { left: !isCollapsed ? left : -width }), style: { transition: 'left 0.5s' } }),
        React.createElement(CollapsePanelMain, Object.assign({}, props, { prefixClz: prefixClz })),
        collapsible && (React.createElement(NodePanelCollapseBtn, Object.assign({}, props, { prefixClz: prefixClz, isCollapsed: isCollapsed, onCollapseBtnClick: handleBtnClick, style: {
                position: 'absolute',
                zIndex: 1,
                width: 13,
                right: -13,
                bottom: 20,
                padding: '12px 0px',
                textAlign: 'center',
                borderWidth: '1px 1px 1px 0',
                borderStyle: 'solid solid solid',
                borderColor: 'rgb(232, 232, 232) rgb(232, 232, 232) rgb(232, 232, 232)',
                cursor: 'pointer',
            } })))));
};
export { NodeCollapsePanel, NsCollapsePanelModel, NsNodeCollapsePanel, };
//# sourceMappingURL=index.js.map