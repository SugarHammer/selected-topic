import React, { useEffect } from 'react';
import { XFlowCanvas, useXFlowApp } from '@antv/xflow-core';
import { useGraphConfig } from './config-graph';
import { setInstance } from './utils';
export { FlowchartExtension } from './extension/module';
export * from './interface';
export const FlowchartCanvas = props => {
    const { position = { top: 40, left: 240, right: 240, bottom: 0 } } = props;
    const graphConfig = useGraphConfig(props);
    const app = useXFlowApp();
    useEffect(() => {
        if (app) {
            setInstance(app);
        }
    }, [app]);
    return (React.createElement(XFlowCanvas, Object.assign({}, props, { config: graphConfig, position: position }), props.children));
};
FlowchartCanvas.defaultProps = {
    isXFlowCanvas: true,
};
//# sourceMappingURL=index.js.map