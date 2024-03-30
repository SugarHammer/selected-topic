import React from 'react';
import { useXFlowApp, usePositionStyle } from '@antv/xflow-core';
import classNames from 'classnames';
import { PropsProxy } from './config';
import { PanelContext } from './context';
const WorkspacePanel = props => {
    const { className, position, style, children } = props;
    const app = useXFlowApp();
    const positionStyle = usePositionStyle(position);
    const propsProxy = React.useMemo(() => {
        return new PropsProxy();
    }, []);
    React.useEffect(() => {
        return () => {
            propsProxy.dispose();
        };
    }, [propsProxy]);
    if (!app || !app.modelService) {
        return null;
    }
    propsProxy.getValue = () => props;
    const clz = classNames({
        [className]: !!className,
        'xflow-workspace-panel': true,
    });
    const { commandService, modelService } = app;
    return (React.createElement(PanelContext.Provider, { value: { propsProxy, commandService, modelService } },
        React.createElement("div", { className: clz, style: Object.assign(Object.assign({}, positionStyle), style) }, children)));
};
export { usePanelContext } from './context';
export { WorkspacePanel };
//# sourceMappingURL=index.js.map