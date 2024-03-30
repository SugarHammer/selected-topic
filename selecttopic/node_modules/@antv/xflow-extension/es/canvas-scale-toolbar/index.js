import React from 'react';
import { CanvasToolbar } from '../canvas-toolbar';
import { useConfig, CANVAS_SCALE_TOOLBAR_CONFIG } from './config';
const CanvasScaleToolbar = props => {
    const config = useConfig(props);
    return (React.createElement(CanvasToolbar, Object.assign({ layout: "vertical" }, props, { config: config, position: props.position || { top: 12, right: 12 } })));
};
export { CanvasScaleToolbar, CANVAS_SCALE_TOOLBAR_CONFIG };
//# sourceMappingURL=index.js.map