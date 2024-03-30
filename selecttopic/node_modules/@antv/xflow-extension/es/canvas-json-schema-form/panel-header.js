import React from 'react';
import { useXFlowApp } from '@antv/xflow-core';
import { usePanelContext } from '../base-panel/context';
export const PanelHeader = props => {
    const { prefixClz, hasSchema, state } = props;
    const { propsProxy } = usePanelContext();
    const panelProps = propsProxy.getValue();
    const app = useXFlowApp();
    /** form会使用tab做为header，需要让出位置*/
    if (hasSchema) {
        return null;
    }
    /** 是否有 custom header */
    const isValidHeaderFC = panelProps.header && typeof panelProps.header === 'function';
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-header`, style: props.style },
            isValidHeaderFC &&
                React.createElement(panelProps.header, Object.assign(Object.assign({}, props), { headerStyle: props.style, bodyStyle: {}, footerStyle: {}, targetData: state.targetData, targetType: state.targetType, modelService: app.modelService, commandService: app.commandService })),
            !panelProps.header && (React.createElement("div", { className: `${prefixClz}-header-title` }, panelProps.headerText || 'Panel')))));
};
//# sourceMappingURL=panel-header.js.map