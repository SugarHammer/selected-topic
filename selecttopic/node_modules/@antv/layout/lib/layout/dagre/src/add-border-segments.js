"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var addBorderSegments = function (g) {
    var _a;
    var dfs = function (v) {
        var children = g.children(v);
        var node = g.node(v);
        if (children === null || children === void 0 ? void 0 : children.length) {
            children.forEach(function (child) { return dfs(child); });
        }
        if (node.hasOwnProperty('minRank')) {
            node.borderLeft = [];
            node.borderRight = [];
            for (var rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank) {
                addBorderNode(g, "borderLeft", "_bl", v, node, rank);
                addBorderNode(g, "borderRight", "_br", v, node, rank);
            }
        }
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { return dfs(child); });
};
var addBorderNode = function (g, prop, prefix, sg, sgNode, rank) {
    var label = { rank: rank, width: 0, height: 0, borderType: prop };
    var prev = sgNode[prop][rank - 1];
    var curr = util_1.default.addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);
    if (prev) {
        g.setEdge(prev, curr, { weight: 1 });
    }
};
exports.default = addBorderSegments;
//# sourceMappingURL=add-border-segments.js.map