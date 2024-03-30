"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorGroup = exports.XFlowNode = void 0;
/* eslint-disable @typescript-eslint/lines-between-class-members */
var x6_react_shape_1 = require("@antv/x6-react-shape");
var x6_1 = require("@antv/x6");
var constants_1 = require("../constants");
var xflow_core_1 = require("@antv/xflow-core");
var XFlowNode;
exports.XFlowNode = XFlowNode;
var AnchorGroup = xflow_core_1.NsGraph.AnchorGroup;
exports.AnchorGroup = AnchorGroup;
if (x6_1.Node.registry.exist(constants_1.XFLOW_NODE_SHAPE)) {
    exports.XFlowNode = XFlowNode = x6_1.Node.registry.get(constants_1.XFLOW_NODE_SHAPE);
}
else {
    exports.XFlowNode = XFlowNode = x6_react_shape_1.ReactShape.define({
        width: constants_1.NODE_DEFAULT_WIDTH,
        height: constants_1.NODE_DEFAULT_HEIGHT,
        shape: constants_1.XFLOW_NODE_SHAPE,
        // X6_NODE_PORTAL_NODE_VIEW
        view: xflow_core_1.XFlowConstants.X6_NODE_PORTAL_NODE_VIEW,
        ports: {
            groups: {
                top: {
                    zIndex: 2,
                    position: {
                        name: AnchorGroup.TOP,
                    },
                },
                bottom: {
                    zIndex: 2,
                    position: {
                        name: AnchorGroup.BOTTOM,
                    },
                },
                right: {
                    zIndex: 2,
                    position: {
                        name: AnchorGroup.RIGHT,
                    },
                },
                left: {
                    zIndex: 2,
                    position: {
                        name: AnchorGroup.LEFT,
                    },
                },
            },
        },
        attrs: {
            body: {
                magnet: false,
                fill: 'none',
                stroke: 'none',
                refWidth: '100%',
                refHeight: '100%',
                zIndex: 1,
            },
        },
        portMarkup: [
            {
                tagName: 'g',
                selector: 'xflow-port-group',
                className: 'xflow-port-group',
                attrs: {
                    width: 8,
                    height: 8,
                    x: -4,
                    y: -4,
                    zIndex: 10,
                    // magnet决定是否可交互
                    magnet: 'true',
                },
                children: [
                    {
                        tagName: 'circle',
                        selector: 'xflow-port',
                        className: 'xflow-port',
                        attrs: {
                            r: 4,
                            fill: '#fff',
                            stroke: '#d9d9d9',
                            zIndex: 12,
                        },
                    },
                    {
                        tagName: 'polygon',
                        selector: 'xflow-port-arrow',
                        className: 'xflow-port-arrow',
                        attrs: {
                            points: '0,0 8,0 4,4 ',
                            fill: '#d9d9d9',
                            stroke: '#d9d9d9',
                            zIndex: 13,
                            transform: 'translate(-4,0)',
                        },
                    },
                ],
            },
        ],
    });
}
//# sourceMappingURL=node.js.map