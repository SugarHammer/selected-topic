"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */
var run = function (g) {
    g.graph().dummyChains = [];
    g.edges().forEach(function (edge) { return normalizeEdge(g, edge); });
};
var normalizeEdge = function (g, e) {
    var _a, _b;
    var v = e.v;
    var vRank = g.node(v).rank;
    var w = e.w;
    var wRank = g.node(w).rank;
    var name = e.name;
    var edgeLabel = g.edge(e);
    var labelRank = edgeLabel.labelRank;
    if (wRank === vRank + 1)
        return;
    g.removeEdge(e);
    var dummy;
    var attrs;
    var i;
    for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
        edgeLabel.points = [];
        attrs = {
            edgeLabel: edgeLabel,
            width: 0,
            height: 0,
            edgeObj: e,
            rank: vRank
        };
        dummy = util_1.default.addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            attrs.dummy = "edge-label";
            attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
        if (i === 0) {
            if (!g.graph().dummyChains)
                g.graph().dummyChains = [];
            (_b = (_a = g.graph()) === null || _a === void 0 ? void 0 : _a.dummyChains) === null || _b === void 0 ? void 0 : _b.push(dummy);
        }
        v = dummy;
    }
    g.setEdge(v, w, { weight: edgeLabel.weight }, name);
};
var undo = function (g) {
    var _a;
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
        var _a;
        var node = g.node(v);
        var origLabel = node.edgeLabel;
        var w;
        node.edgeObj && g.setEdge(node.edgeObj, origLabel);
        var currentV = v;
        while (node.dummy) {
            w = (_a = g.successors(currentV)) === null || _a === void 0 ? void 0 : _a[0];
            g.removeNode(currentV);
            origLabel.points.push({ x: node.x, y: node.y });
            if (node.dummy === "edge-label") {
                origLabel.x = node.x;
                origLabel.y = node.y;
                origLabel.width = node.width;
                origLabel.height = node.height;
            }
            currentV = w;
            node = g.node(currentV);
        }
    });
};
exports.default = { run: run, undo: undo };
//# sourceMappingURL=normalize.js.map