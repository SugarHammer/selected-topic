"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parentDummyChains = function (g) {
    var _a;
    var postorderNums = postorder(g);
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
        var _a, _b;
        var node = g.node(v);
        var edgeObj = node.edgeObj;
        if (!edgeObj)
            return;
        var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        var path = pathData.path;
        var lca = pathData.lca;
        var pathIdx = 0;
        var pathV = path[pathIdx];
        var ascending = true;
        while (v !== edgeObj.w) {
            node = g.node(v);
            if (ascending) {
                while ((pathV = path[pathIdx]) !== lca &&
                    g.node(pathV).maxRank < node.rank) {
                    pathIdx++;
                }
                if (pathV === lca) {
                    ascending = false;
                }
            }
            if (!ascending) {
                while (pathIdx < path.length - 1 &&
                    ((_a = g.node(pathV = path[pathIdx + 1])) === null || _a === void 0 ? void 0 : _a.minRank) <= node.rank) {
                    pathIdx++;
                }
                pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            // tslint:disable-next-line
            v = (_b = g.successors(v)) === null || _b === void 0 ? void 0 : _b[0];
        }
    });
};
// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
var findPath = function (g, postorderNums, v, w) {
    var vPath = [];
    var wPath = [];
    var low = Math.min(postorderNums[v].low, postorderNums[w].low);
    var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
    var parent;
    var lca;
    // Traverse up from v to find the LCA
    parent = v;
    do {
        parent = g.parent(parent);
        vPath.push(parent);
    } while (parent &&
        (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
    lca = parent;
    // Traverse from w to LCA
    parent = w;
    while ((parent = g.parent(parent)) !== lca) {
        wPath.push(parent);
    }
    return { lca: lca, path: vPath.concat(wPath.reverse()) };
};
var postorder = function (g) {
    var _a;
    var result = {};
    var lim = 0;
    var dfs = function (v) {
        var _a;
        var low = lim;
        (_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
        result[v] = { low: low, lim: lim++ };
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
    return result;
};
exports.default = parentDummyChains;
//# sourceMappingURL=parent-dummy-chains.js.map