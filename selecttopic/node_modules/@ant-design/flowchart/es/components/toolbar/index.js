var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { CanvasToolbar as XFlowToolbarPanel } from '@antv/xflow';
import { useToolbarConfig } from './util';
export var ToolbarPanel = function (props) {
    var _a = props.layout, layout = _a === void 0 ? 'horizontal' : _a, _b = props.position, position = _b === void 0 ? { top: 0, left: 240, right: 240, bottom: 0 } : _b, _c = props.show, show = _c === void 0 ? true : _c, className = props.className, style = props.style;
    var toolbarConfig = useToolbarConfig(props);
    if (!show) {
        return null;
    }
    return (React.createElement(XFlowToolbarPanel, { className: className, layout: layout, config: toolbarConfig, style: __assign({ borderBottom: '1px solid #d9d9d9' }, style), position: position }));
};
export default ToolbarPanel;
