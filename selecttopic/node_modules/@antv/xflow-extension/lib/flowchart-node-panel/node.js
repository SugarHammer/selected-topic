"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorGroup = exports.XFlowNode = exports.NODE_DEFAULT_HEIGHT = exports.NODE_DEFAULT_WIDTH = exports.XFLOW_NODE_SHAPE = void 0;
var x6_react_shape_1 = require("@antv/x6-react-shape");
var x6_1 = require("@antv/x6");
var constants_1 = require("@antv/xflow-core/es/constants");
var interface_1 = require("@antv/xflow-core/es/interface");
exports.XFLOW_NODE_SHAPE = 'XFLOW_NODE_SHAPE';
exports.NODE_DEFAULT_WIDTH = 160;
exports.NODE_DEFAULT_HEIGHT = 32;
var XFlowNode;
exports.XFlowNode = XFlowNode;
var AnchorGroup = interface_1.NsGraph.AnchorGroup;
exports.AnchorGroup = AnchorGroup;
if (x6_1.Node.registry.exist(exports.XFLOW_NODE_SHAPE)) {
    exports.XFlowNode = XFlowNode = x6_1.Node.registry.get(exports.XFLOW_NODE_SHAPE);
}
else {
    exports.XFlowNode = XFlowNode = x6_react_shape_1.ReactShape.define({
        width: exports.NODE_DEFAULT_WIDTH,
        height: exports.NODE_DEFAULT_HEIGHT,
        shape: exports.XFLOW_NODE_SHAPE,
        // X6_NODE_PORTAL_NODE_VIEW
        view: constants_1.X6_NODE_PORTAL_NODE_VIEW,
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
                            stroke: '#808080',
                            zIndex: 12,
                        },
                    },
                    {
                        tagName: 'polygon',
                        selector: 'xflow-port-arrow',
                        className: 'xflow-port-arrow',
                        attrs: {
                            points: '0,0 8,0 4,4 ',
                            fill: '#808080',
                            stroke: '#808080',
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