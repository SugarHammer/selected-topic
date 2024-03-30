"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowEdge = exports.EDGE_PATH_TYPE = void 0;
var x6_1 = require("@antv/x6");
var constants_1 = require("../constants");
Object.defineProperty(exports, "EDGE_PATH_TYPE", { enumerable: true, get: function () { return constants_1.EDGE_PATH_TYPE; } });
if (!x6_1.Registry.Connector.registry.exist(constants_1.EDGE_PATH_TYPE.VERTICAL_NODE)) {
    x6_1.Graph.registerConnector(constants_1.EDGE_PATH_TYPE.VERTICAL_NODE, function (s, e) {
        var offset = 16;
        var deltaY = Math.abs(e.y - s.y);
        var control = Math.floor((deltaY / 3) * 2);
        var v1 = { x: s.x, y: s.y + offset + control };
        var v2 = { x: e.x, y: e.y - offset - control };
        return x6_1.Path.normalize("M ".concat(s.x, " ").concat(s.y, "\n         L ").concat(s.x, " ").concat(s.y + offset, "\n         C ").concat(v1.x, " ").concat(v1.y, " ").concat(v2.x, " ").concat(v2.y, " ").concat(e.x, " ").concat(e.y - offset, "\n         L ").concat(e.x, " ").concat(e.y, "\n        "));
    }, true);
}
if (!x6_1.Registry.Connector.registry.exist(constants_1.EDGE_PATH_TYPE.VERTICAL_GROUP)) {
    x6_1.Graph.registerConnector(constants_1.EDGE_PATH_TYPE.VERTICAL_GROUP, function (s, t) {
        var offset = 4;
        var control = Math.abs(t.y - s.y);
        var v1 = { x: s.x, y: s.y + offset + control };
        var v2 = { x: t.x, y: t.y - offset - control };
        return x6_1.Path.normalize("M ".concat(s.x, " ").concat(s.y, "\n       L ").concat(s.x, " ").concat(s.y + offset, "\n       C ").concat(v1.x, " ").concat(v1.y, " ").concat(v2.x, " ").concat(v2.y, " ").concat(t.x, " ").concat(t.y - offset, "\n       L ").concat(t.x, " ").concat(t.y, "\n      "));
    }, true);
}
// TODO: fix this vertical function
if (!x6_1.Registry.Connector.registry.exist(constants_1.EDGE_PATH_TYPE.HORIRONTAL_NODE)) {
    x6_1.Graph.registerConnector(constants_1.EDGE_PATH_TYPE.HORIRONTAL_NODE, function (s, e) {
        var offset = 4;
        // const control = 80;
        var deltaY = Math.abs(e.y - s.y);
        var control = Math.floor((deltaY / 3) * 2);
        var v1 = { x: s.x, y: s.y + offset + control };
        var v2 = { x: e.x, y: e.y - offset - control };
        return x6_1.Path.normalize("M ".concat(s.x, " ").concat(s.y, "\n         L ").concat(s.x, " ").concat(s.y + offset, "\n         C ").concat(v1.x, " ").concat(v1.y, " ").concat(v2.x, " ").concat(v2.y, " ").concat(e.x, " ").concat(e.y - offset, "\n         L ").concat(e.x, " ").concat(e.y, "\n        "));
    }, true);
}
var XFlowEdge = x6_1.Shape.Edge.registry.get(constants_1.XFLOW_SHAPE.EDGE);
exports.XFlowEdge = XFlowEdge;
if (!x6_1.Shape.Edge.registry.exist(constants_1.XFLOW_SHAPE.EDGE)) {
    exports.XFlowEdge = XFlowEdge = x6_1.Shape.Edge.registry.register(constants_1.XFLOW_SHAPE.EDGE, x6_1.Shape.Edge.define({
        zIndex: 1,
        highlight: false,
        shape: constants_1.XFLOW_SHAPE.EDGE,
        // https://x6.antv.vision/zh/docs/api/registry/node-anchor
        // source: {
        //   anchor: {
        //     name: 'bottom',
        //   },
        // },
        // target: {
        //   anchor: {
        //     name: 'center',
        //   },
        // },
    }), true);
}
//# sourceMappingURL=edge.js.map