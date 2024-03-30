"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var graphlib_1 = __importDefault(require("./graphlib"));
var Graph = graphlib_1.default.Graph;
/* istanbul ignore next */
var debugOrdering = function (g) {
    var layerMatrix = util_1.default.buildLayerMatrix(g);
    var h = new Graph({ compound: true, multigraph: true }).setGraph({});
    g.nodes().forEach(function (v) {
        h.setNode(v, { label: v });
        h.setParent(v, "layer" + g.node(v).rank);
    });
    g.edges().forEach(function (e) {
        h.setEdge(e.v, e.w, {}, e.name);
    });
    layerMatrix === null || layerMatrix === void 0 ? void 0 : layerMatrix.forEach(function (layer, i) {
        var layerV = "layer" + i;
        h.setNode(layerV, { rank: "same" });
        layer === null || layer === void 0 ? void 0 : layer.reduce(function (u, v) {
            h.setEdge(u, v, { style: "invis" });
            return v;
        });
    });
    return h;
};
exports.default = debugOrdering;
//# sourceMappingURL=debug.js.map