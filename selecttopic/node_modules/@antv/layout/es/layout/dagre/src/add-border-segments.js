import util from './util';
const addBorderSegments = (g) => {
    var _a;
    const dfs = (v) => {
        const children = g.children(v);
        const node = g.node(v);
        if (children === null || children === void 0 ? void 0 : children.length) {
            children.forEach((child) => dfs(child));
        }
        if (node.hasOwnProperty('minRank')) {
            node.borderLeft = [];
            node.borderRight = [];
            for (let rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank) {
                addBorderNode(g, "borderLeft", "_bl", v, node, rank);
                addBorderNode(g, "borderRight", "_br", v, node, rank);
            }
        }
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((child) => dfs(child));
};
const addBorderNode = (g, prop, prefix, sg, sgNode, rank) => {
    const label = { rank, width: 0, height: 0, borderType: prop };
    const prev = sgNode[prop][rank - 1];
    const curr = util.addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);
    if (prev) {
        g.setEdge(prev, curr, { weight: 1 });
    }
};
export default addBorderSegments;
//# sourceMappingURL=add-border-segments.js.map