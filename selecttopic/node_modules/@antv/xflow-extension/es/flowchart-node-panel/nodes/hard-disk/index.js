import React from 'react';
import { createPath } from '../../utils';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING, DefaultNodeConfig } from '../../constants';
export const HardDiskNode = props => {
    const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {} } = props;
    const { stroke = DefaultNodeConfig.stroke, label = DefaultNodeConfig.label, fill = DefaultNodeConfig.fill, fontFill = DefaultNodeConfig.fontFill, fontSize = DefaultNodeConfig.fontSize, } = data;
    const { width, height } = size;
    const bezierX = Math.min(width / 10, height / 4);
    const bezierY = Math.min(height / 4, width / 4);
    const path = [
        ['M', NODE_PADDING + bezierX, NODE_PADDING],
        ['L', width - 2 * NODE_PADDING - bezierX, NODE_PADDING],
        [
            'C',
            width - 2 * NODE_PADDING,
            NODE_PADDING + bezierY,
            width - 2 * NODE_PADDING,
            height - 2 * NODE_PADDING - bezierY,
        ],
        ['', width - 2 * NODE_PADDING - bezierX, height - 2 * NODE_PADDING],
        ['L', NODE_PADDING + bezierX, height - 2 * NODE_PADDING],
        ['C', NODE_PADDING, height - 2 * NODE_PADDING - bezierY, NODE_PADDING, NODE_PADDING + bezierY],
        ['', NODE_PADDING + bezierX, NODE_PADDING], // top-left
    ];
    // 遵循绘制顺序，多个 path 绘制弧
    const pathBezierRight = [
        ['M', width - 2 * NODE_PADDING - bezierX, NODE_PADDING],
        [
            'C',
            width - 2 * NODE_PADDING - 2 * bezierX,
            NODE_PADDING + bezierY,
            width - 2 * NODE_PADDING - 2 * bezierX,
            height - 2 * NODE_PADDING - bezierY,
        ],
        ['', width - 2 * NODE_PADDING - bezierX, height - 2 * NODE_PADDING], // bottom-right
    ];
    return (React.createElement("svg", { viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
        React.createElement("path", { d: createPath(path), fill: fill, stroke: stroke }),
        React.createElement("path", { d: createPath(pathBezierRight), fill: fill, stroke: stroke }),
        React.createElement("text", { x: width / 2, y: height / 2, fill: fontFill, textAnchor: "middle", alignmentBaseline: "middle", fontSize: fontSize }, label),
        "Sorry, your browser does not support inline SVG."));
};
//# sourceMappingURL=index.js.map