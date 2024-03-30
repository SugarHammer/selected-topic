import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const MultiDocumentNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const multipleWidth = 6;
    const padding = NODE_PADDING;
    const multiPadding = multipleWidth / 2;
    let { width, height } = size;
    width += multipleWidth;
    height += multipleWidth;
    const bezierX = width / 8;
    const bezierY = height / 8;
    const path = [
        ['M', padding + multiPadding, padding],
        ['L', width - 2 * padding, padding],
        ['L', width - 2 * padding, height - 2 * padding - bezierY],
        [
            'C',
            width - 2 * padding - bezierX,
            height - 2 * padding - 2 * bezierY,
            width / 2 + bezierX,
            height - 2 * padding - 2 * bezierY,
        ],
        ['', width / 2, height - 2 * padding - bezierY],
        [
            'S',
            width / 4,
            height - 2 * padding,
            padding + multiPadding,
            height - 2 * padding - 2 * bezierY,
        ],
        ['L', padding + multiPadding, padding], // top-left
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("path", { d: createPath(path, -multipleWidth / 2, multipleWidth / 2), fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map