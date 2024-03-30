import React from 'react';
import { usePanelContext } from '../base-panel/context';
export const NodePanelFooter = props => {
    const { prefixClz } = props;
    const { propsProxy } = usePanelContext();
    const panelProps = propsProxy.getValue();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-footer`, style: props.style }, panelProps.footer && React.isValidElement(panelProps.footer) && panelProps.footer)));
};
//# sourceMappingURL=panel-footer.js.map