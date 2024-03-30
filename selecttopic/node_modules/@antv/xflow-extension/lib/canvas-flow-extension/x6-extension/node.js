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
var portAttrs = {
    circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
            visibility: 'hidden',
        },
    },
};
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
                    position: AnchorGroup.TOP,
                    attrs: portAttrs,
                },
                bottom: {
                    position: AnchorGroup.BOTTOM,
                    attrs: portAttrs,
                },
                right: {
                    position: AnchorGroup.RIGHT,
                    attrs: portAttrs,
                },
                left: {
                    position: AnchorGroup.LEFT,
                    attrs: portAttrs,
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
            },
        },
    });
}
//# sourceMappingURL=node.js.map