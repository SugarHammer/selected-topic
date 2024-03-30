import React from 'react';
import { useXFlowApp } from '@antv/xflow-core';
import { usePanelContext } from '../base-panel/context';
export const PanelFooter = props => {
    const { state } = props;
    const { propsProxy } = usePanelContext();
    const panelProps = propsProxy.getValue();
    const app = useXFlowApp();
    /** 是否有 custom footer */
    const isValidFooterFC = panelProps.footer && typeof panelProps.footer === 'function';
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${props.prefixClz}-footer`, style: props.style },
            isValidFooterFC &&
                React.createElement(panelProps.footer, Object.assign(Object.assign({}, props), { headerStyle: {}, bodyStyle: {}, footerStyle: props.style, targetData: state.targetData, targetType: state.targetType, modelService: app.modelService, commandService: app.commandService })),
            !panelProps.footer && (React.createElement("div", { className: `${props.prefixClz}-footer-title` }, panelProps.footerText)))));
};
//# sourceMappingURL=panel-footer.js.map