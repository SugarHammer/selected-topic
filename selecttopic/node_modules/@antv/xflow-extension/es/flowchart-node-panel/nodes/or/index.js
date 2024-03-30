import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const OrNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const path1 = [
        ['M', height / 2, NODE_PADDING],
        ['L', height / 2, height - 2 * NODE_PADDING], // bottom-center
    ];
    const path2 = [
        ['M', NODE_PADDING, height / 2],
        ['L', height - 2 * NODE_PADDING, height / 2], // right-center
    ];
    const availableR = height - 2 * NODE_PADDING;
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: `M ${NODE_PADDING},${height / 2} a ${availableR / 2} ${availableR / 2} 0 1 1 0 1 z`, fill: fill, stroke: stroke }),
        React.createElement("path", { d: createPath(path1), stroke: stroke }),
        React.createElement("path", { d: createPath(path2), stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map