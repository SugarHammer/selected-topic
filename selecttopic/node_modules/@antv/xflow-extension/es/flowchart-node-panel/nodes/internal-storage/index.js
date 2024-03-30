import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const InternalStorageNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const availableWidth = width - 2 * NODE_PADDING;
    const availableHieght = height - 2 * NODE_PADDING;
    const rx = 6;
    const path = [
        ['M', NODE_PADDING, NODE_PADDING],
        ['L', availableWidth - rx, NODE_PADDING],
        ['C', availableWidth, NODE_PADDING, availableWidth, rx],
        ['', availableWidth, height / 2],
        ['L', availableWidth, availableHieght - rx],
        ['C', availableWidth, availableHieght, availableWidth - rx, availableHieght],
        ['', availableWidth - rx, availableHieght],
        ['L', rx, availableHieght],
        ['C', NODE_PADDING, availableHieght, NODE_PADDING, availableHieght - rx],
        ['', NODE_PADDING, availableHieght - rx],
        ['Z'],
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, 
        // viewBox={`0 0 40 30`}
        xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("path", { d: `M ${NODE_PADDING},${rx} L ${availableWidth - 1} ${rx} `, fill: fill, stroke: stroke }),
        React.createElement("path", { d: `M ${rx},${NODE_PADDING} L ${rx} ${availableHieght} `, fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map