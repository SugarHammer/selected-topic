"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minBy = exports.zipObject = exports.notime = exports.time = exports.partition = exports.maxRank = exports.addBorderNode = exports.removeEmptyRanks = exports.normalizeRanks = exports.buildLayerMatrix = exports.intersectRect = exports.predecessorWeights = exports.successorWeights = exports.asNonCompoundGraph = exports.simplify = exports.addDummyNode = void 0;
var util_1 = require("../../../util");
var graphlib_1 = __importDefault(require("./graphlib"));
var Graph = graphlib_1.default.Graph;
/*
 * Adds a dummy node to the graph and return v.
 */
var addDummyNode = function (g, type, attrs, name) {
    var v;
    do {
        v = "" + name + Math.random();
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
};
exports.addDummyNode = addDummyNode;
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
var simplify = function (g) {
    var simplified = new Graph().setGraph(g.graph());
    g.nodes().forEach(function (v) { simplified.setNode(v, g.node(v)); });
    g.edges().forEach(function (e) {
        var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
};
exports.simplify = simplify;
var asNonCompoundGraph = function (g) {
    var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    g.nodes().forEach(function (v) {
        var _a;
        if (!((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length)) {
            simplified.setNode(v, g.node(v));
        }
    });
    g.edges().forEach(function (e) { return simplified.setEdge(e, g.edge(e)); });
    return simplified;
};
exports.asNonCompoundGraph = asNonCompoundGraph;
var zipObject = function (keys, values) {
    var result = {};
    keys === null || keys === void 0 ? void 0 : keys.forEach(function (key, i) {
        result[key] = values[i];
    });
    return result;
};
exports.zipObject = zipObject;
var successorWeights = function (g) {
    var weightMap = g.nodes().map(function (v) {
        var _a;
        var sucs = {};
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
        });
        return sucs;
    });
    return zipObject(g.nodes(), weightMap);
};
exports.successorWeights = successorWeights;
var predecessorWeights = function (g) {
    var weightMap = g.nodes().map(function (v) {
        var _a;
        var preds = {};
        (_a = g.inEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
    });
    return zipObject(g.nodes(), weightMap);
};
exports.predecessorWeights = predecessorWeights;
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
var intersectRect = function (rect, point) {
    var x = rect.x;
    var y = rect.y;
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    var dx = point.x - x;
    var dy = point.y - y;
    var w = rect.width / 2;
    var h = rect.height / 2;
    if (!dx && !dy) {
        // throw new Error("Not possible to find intersection inside of the rectangle");
        // completely overlapped
        return { x: 0, y: 0 };
    }
    var sx;
    var sy;
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
exports.intersectRect = intersectRect;
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * const will produce a matrix with the ids of each node.
 */
var buildLayerMatrix = function (g) {
    var layering = [];
    var layeringNodes = [];
    var rankMax = maxRank(g) + 1;
    for (var i = 0; i < rankMax; i++) {
        layering.push([]);
        layeringNodes.push([]);
    }
    // const layering = _.map(_.range(maxRank(g) + 1), function() { return []; });
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        var rank = node.rank;
        if (rank !== undefined && layering[rank]) {
            layeringNodes[rank].push(v);
        }
    });
    layeringNodes === null || layeringNodes === void 0 ? void 0 : layeringNodes.forEach(function (layer, rank) {
        layer === null || layer === void 0 ? void 0 : layer.sort(function (va, vb) { var _a, _b; return ((_a = g.node(va)) === null || _a === void 0 ? void 0 : _a.order) - ((_b = g.node(vb)) === null || _b === void 0 ? void 0 : _b.order); });
        layer.forEach(function (v) {
            layering[rank].push(v);
        });
    });
    return layering;
};
exports.buildLayerMatrix = buildLayerMatrix;
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
var normalizeRanks = function (g) {
    var nodeRanks = g.nodes().filter(function (v) { return g.node(v).rank !== undefined; }).map(function (v) { return g.node(v).rank; });
    var min = Math.min.apply(Math, nodeRanks);
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (node.hasOwnProperty("rank")) {
            if (!node.rank)
                node.rank = 0;
            node.rank -= min;
        }
    });
};
exports.normalizeRanks = normalizeRanks;
var removeEmptyRanks = function (g) {
    // Ranks may not start at 0, so we need to offset them
    var nodeRanks = g.nodes().filter(function (v) { return g.node(v).rank !== undefined; }).map(function (v) { return g.node(v).rank; });
    var offset = Math.min.apply(Math, nodeRanks);
    var layers = [];
    g.nodes().forEach(function (v) {
        var _a;
        var rank = (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) || 0) - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });
    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor || 0;
    for (var i = 0; i < layers.length; i++) {
        var vs = layers[i];
        if (vs === undefined && i % nodeRankFactor !== 0) {
            --delta;
        }
        else if (delta) {
            vs === null || vs === void 0 ? void 0 : vs.forEach(function (v) {
                if (!g.node(v).rank)
                    g.node(v).rank = 0;
                g.node(v).rank += delta;
            });
        }
    }
};
exports.removeEmptyRanks = removeEmptyRanks;
var addBorderNode = function (g, prefix, rank, order) {
    var node = {
        width: 0,
        height: 0
    };
    if ((0, util_1.isNumber)(rank) && (0, util_1.isNumber)(order)) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
};
exports.addBorderNode = addBorderNode;
var maxRank = function (g) {
    var nodeRanks = g.nodes().map(function (v) {
        var rank = g.node(v).rank;
        if (rank !== undefined) {
            return rank;
        }
        return -Infinity;
    });
    return Math.max.apply(Math, nodeRanks);
};
exports.maxRank = maxRank;
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * const returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
var partition = function (collection, fn) {
    var result = { lhs: [], rhs: [] };
    collection === null || collection === void 0 ? void 0 : collection.forEach(function (value) {
        if (fn(value)) {
            result.lhs.push(value);
        }
        else {
            result.rhs.push(value);
        }
    });
    return result;
};
exports.partition = partition;
/*
 * Returns a new const that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
var time = function (name, fn) {
    var start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log(name + " time: " + (Date.now() - start) + "ms");
    }
};
exports.time = time;
var notime = function (name, fn) {
    return fn();
};
exports.notime = notime;
var minBy = function (array, func) {
    var min = Infinity;
    var minObject;
    array === null || array === void 0 ? void 0 : array.forEach(function (item) {
        var value = func(item);
        if (min > value) {
            min = value;
            minObject = item;
        }
    });
    return minObject;
};
exports.minBy = minBy;
exports.default = {
    addDummyNode: addDummyNode,
    simplify: simplify,
    asNonCompoundGraph: asNonCompoundGraph,
    successorWeights: successorWeights,
    predecessorWeights: predecessorWeights,
    intersectRect: intersectRect,
    buildLayerMatrix: buildLayerMatrix,
    normalizeRanks: normalizeRanks,
    removeEmptyRanks: removeEmptyRanks,
    addBorderNode: addBorderNode,
    maxRank: maxRank,
    partition: partition,
    time: time,
    notime: notime,
    zipObject: zipObject,
    minBy: minBy
};
//# sourceMappingURL=util.js.map