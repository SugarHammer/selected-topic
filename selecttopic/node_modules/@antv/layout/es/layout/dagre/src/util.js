import { isNumber } from '../../../util';
import graphlib from './graphlib';
const Graph = graphlib.Graph;
/*
 * Adds a dummy node to the graph and return v.
 */
const addDummyNode = (g, type, attrs, name) => {
    let v;
    do {
        v = `${name}${Math.random()}`;
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
};
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
const simplify = (g) => {
    const simplified = new Graph().setGraph(g.graph());
    g.nodes().forEach((v) => { simplified.setNode(v, g.node(v)); });
    g.edges().forEach((e) => {
        const simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
        const label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
};
const asNonCompoundGraph = (g) => {
    const simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    g.nodes().forEach((v) => {
        var _a;
        if (!((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length)) {
            simplified.setNode(v, g.node(v));
        }
    });
    g.edges().forEach((e) => simplified.setEdge(e, g.edge(e)));
    return simplified;
};
const zipObject = (keys, values) => {
    const result = {};
    keys === null || keys === void 0 ? void 0 : keys.forEach((key, i) => {
        result[key] = values[i];
    });
    return result;
};
const successorWeights = (g) => {
    const weightMap = g.nodes().map((v) => {
        var _a;
        const sucs = {};
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
        });
        return sucs;
    });
    return zipObject(g.nodes(), weightMap);
};
const predecessorWeights = (g) => {
    const weightMap = g.nodes().map((v) => {
        var _a;
        const preds = {};
        (_a = g.inEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
    });
    return zipObject(g.nodes(), weightMap);
};
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
const intersectRect = (rect, point) => {
    const x = rect.x;
    const y = rect.y;
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    const dx = point.x - x;
    const dy = point.y - y;
    let w = rect.width / 2;
    let h = rect.height / 2;
    if (!dx && !dy) {
        // throw new Error("Not possible to find intersection inside of the rectangle");
        // completely overlapped
        return { x: 0, y: 0 };
    }
    let sx;
    let sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        // Intersection is top or bottom of rect.
        if (dy < 0) {
            h = -h;
        }
        sx = h * dx / dy;
        sy = h;
    }
    else {
        // Intersection is left or right of rect.
        if (dx < 0) {
            w = -w;
        }
        sx = w;
        sy = w * dy / dx;
    }
    return { x: x + sx, y: y + sy };
};
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * const will produce a matrix with the ids of each node.
 */
const buildLayerMatrix = (g) => {
    const layering = [];
    const layeringNodes = [];
    const rankMax = maxRank(g) + 1;
    for (let i = 0; i < rankMax; i++) {
        layering.push([]);
        layeringNodes.push([]);
    }
    // const layering = _.map(_.range(maxRank(g) + 1), function() { return []; });
    g.nodes().forEach((v) => {
        const node = g.node(v);
        const rank = node.rank;
        if (rank !== undefined && layering[rank]) {
            layeringNodes[rank].push(v);
        }
    });
    layeringNodes === null || layeringNodes === void 0 ? void 0 : layeringNodes.forEach((layer, rank) => {
        layer === null || layer === void 0 ? void 0 : layer.sort((va, vb) => { var _a, _b; return ((_a = g.node(va)) === null || _a === void 0 ? void 0 : _a.order) - ((_b = g.node(vb)) === null || _b === void 0 ? void 0 : _b.order); });
        layer.forEach((v) => {
            layering[rank].push(v);
        });
    });
    return layering;
};
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
const normalizeRanks = (g) => {
    const nodeRanks = g.nodes().filter(v => g.node(v).rank !== undefined).map((v) => g.node(v).rank);
    const min = Math.min(...nodeRanks);
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node.hasOwnProperty("rank")) {
            if (!node.rank)
                node.rank = 0;
            node.rank -= min;
        }
    });
};
const removeEmptyRanks = (g) => {
    // Ranks may not start at 0, so we need to offset them
    const nodeRanks = g.nodes().filter(v => g.node(v).rank !== undefined).map((v) => g.node(v).rank);
    const offset = Math.min(...nodeRanks);
    const layers = [];
    g.nodes().forEach((v) => {
        var _a;
        const rank = (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) || 0) - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });
    let delta = 0;
    const nodeRankFactor = g.graph().nodeRankFactor || 0;
    for (let i = 0; i < layers.length; i++) {
        const vs = layers[i];
        if (vs === undefined && i % nodeRankFactor !== 0) {
            --delta;
        }
        else if (delta) {
            vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
                if (!g.node(v).rank)
                    g.node(v).rank = 0;
                g.node(v).rank += delta;
            });
        }
    }
};
const addBorderNode = (g, prefix, rank, order) => {
    const node = {
        width: 0,
        height: 0
    };
    if (isNumber(rank) && isNumber(order)) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
};
const maxRank = (g) => {
    const nodeRanks = g.nodes().map((v) => {
        const rank = g.node(v).rank;
        if (rank !== undefined) {
            return rank;
        }
        return -Infinity;
    });
    return Math.max(...nodeRanks);
};
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * const returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
const partition = (collection, fn) => {
    const result = { lhs: [], rhs: [] };
    collection === null || collection === void 0 ? void 0 : collection.forEach((value) => {
        if (fn(value)) {
            result.lhs.push(value);
        }
        else {
            result.rhs.push(value);
        }
    });
    return result;
};
/*
 * Returns a new const that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
const time = (name, fn) => {
    const start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log(`${name} time: ${(Date.now() - start)}ms`);
    }
};
const notime = (name, fn) => {
    return fn();
};
const minBy = (array, func) => {
    let min = Infinity;
    let minObject;
    array === null || array === void 0 ? void 0 : array.forEach((item) => {
        const value = func(item);
        if (min > value) {
            min = value;
            minObject = item;
        }
    });
    return minObject;
};
export { addDummyNode, simplify, asNonCompoundGraph, successorWeights, predecessorWeights, intersectRect, buildLayerMatrix, normalizeRanks, removeEmptyRanks, addBorderNode, maxRank, partition, time, notime, zipObject, minBy };
export default {
    addDummyNode,
    simplify,
    asNonCompoundGraph,
    successorWeights,
    predecessorWeights,
    intersectRect,
    buildLayerMatrix,
    normalizeRanks,
    removeEmptyRanks,
    addBorderNode,
    maxRank,
    partition,
    time,
    notime,
    zipObject,
    minBy
};
//# sourceMappingURL=util.js.map