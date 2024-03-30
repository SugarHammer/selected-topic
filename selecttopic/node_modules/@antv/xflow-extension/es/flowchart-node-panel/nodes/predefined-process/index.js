import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const PredefinedProcessNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const struckOffset = width / 8;
    const path = [
        ['M', NODE_PADDING, NODE_PADDING],
        ['L', width - 2 * NODE_PADDING, NODE_PADDING],
        ['L', width - 2 * NODE_PADDING, height - 2 * NODE_PADDING],
        ['L', NODE_PADDING, height - 2 * NODE_PADDING],
        ['Z'],
    ];
    const path1 = [
        ['M', struckOffset, NODE_PADDING],
        ['L', struckOffset, height - 2 * NODE_PADDING],
    ];
    const path2 = [
        ['M', width - struckOffset, NODE_PADDING],
        ['L', width - struckOffset, height - 2 * NODE_PADDING], // right-center
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("path", { d: createPath(path1), stroke: stroke }),
        React.createElement("path", { d: createPath(path2), stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map