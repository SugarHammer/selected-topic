"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balance = exports.findSmallestWidthAlignment = exports.alignCoordinates = exports.horizontalCompaction = exports.verticalAlignment = exports.hasConflict = exports.addConflict = exports.findType2Conflicts = exports.findType1Conflicts = exports.positionX = void 0;
var graphlib_1 = __importDefault(require("../graphlib"));
var util_1 = __importDefault(require("../util"));
var Graph = graphlib_1.default.Graph;
/*
 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
 * and Simple Horizontal Coordinate Assignment."
 */
/*
 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
 * property. A type-1 conflict is one where a non-inner segment crosses an
 * inner segment. An inner segment is an edge with both incident nodes marked
 * with the "dummy" property.
 *
 * This algorithm scans layer by layer, starting with the second, for type-1
 * conflicts between the current layer and the previous layer. For each layer
 * it scans the nodes from left to right until it reaches one that is incident
 * on an inner segment. It then scans predecessors to determine if they have
 * edges that cross that inner segment. At the end a final scan is done for all
 * nodes on the current rank to see if they cross the last visited inner
 * segment.
 *
 * This algorithm (safely) assumes that a dummy node will only be incident on a
 * single node in the layers being scanned.
 */
var findType1Conflicts = function (g, layering) {
    var conflicts = {};
    var visitLayer = function (prevLayer, layer) {
        // last visited node in the previous layer that is incident on an inner
        // segment.
        var k0 = 0;
        // Tracks the last node in this layer scanned for crossings with a type-1
        // segment.
        var scanPos = 0;
        var prevLayerLength = prevLayer.length;
        var lastNode = layer === null || layer === void 0 ? void 0 : layer[(layer === null || layer === void 0 ? void 0 : layer.length) - 1];
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v, i) {
            var _a;
            var w = findOtherInnerSegmentNode(g, v);
            var k1 = w ? g.node(w).order : prevLayerLength;
            if (w || v === lastNode) {
                (_a = layer.slice(scanPos, i + 1)) === null || _a === void 0 ? void 0 : _a.forEach(function (scanNode) {
                    var _a;
                    (_a = g.predecessors(scanNode)) === null || _a === void 0 ? void 0 : _a.forEach(function (u) {
                        var uLabel = g.node(u);
                        var uPos = uLabel.order;
                        if ((uPos < k0 || k1 < uPos) &&
                            !(uLabel.dummy && g.node(scanNode).dummy)) {
                            addConflict(conflicts, u, scanNode);
                        }
                    });
                });
                scanPos = i + 1;
                k0 = k1;
            }
        });
        return layer;
    };
    if (layering === null || layering === void 0 ? void 0 : layering.length) {
        layering.reduce(visitLayer);
    }
    return conflicts;
};
exports.findType1Conflicts = findType1Conflicts;
var findType2Conflicts = function (g, layering) {
    var conflicts = {};
    var scan = function (south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
        var v;
        var range = [];
        for (var i = southPos; i < southEnd; i++) {
            range.push(i);
        }
        range.forEach(function (i) {
            var _a;
            v = south[i];
            if (g.node(v).dummy) {
                (_a = g.predecessors(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (u) {
                    var uNode = g.node(u);
                    if (uNode.dummy &&
                        (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
                        addConflict(conflicts, u, v);
                    }
                });
            }
        });
    };
    var visitLayer = function (north, south) {
        var prevNorthPos = -1;
        var nextNorthPos;
        var southPos = 0;
        south === null || south === void 0 ? void 0 : south.forEach(function (v, southLookahead) {
            if (g.node(v).dummy === "border") {
                var predecessors = g.predecessors(v) || [];
                if (predecessors.length) {
                    nextNorthPos = g.node(predecessors[0]).order;
                    scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
                    southPos = southLookahead;
                    prevNorthPos = nextNorthPos;
                }
            }
            scan(south, southPos, south.length, nextNorthPos, north.length);
        });
        return south;
    };
    if (layering === null || layering === void 0 ? void 0 : layering.length) {
        layering.reduce(visitLayer);
    }
    return conflicts;
};
exports.findType2Conflicts = findType2Conflicts;
var findOtherInnerSegmentNode = function (g, v) {
    var _a;
    if (g.node(v).dummy) {
        return (_a = g.predecessors(v)) === null || _a === void 0 ? void 0 : _a.find(function (u) { return g.node(u).dummy; });
    }
};
var addConflict = function (conflicts, v, w) {
    var vv = v;
    var ww = w;
    if (vv > ww) {
        var tmp = vv;
        vv = ww;
        ww = tmp;
    }
    var conflictsV = conflicts[vv];
    if (!conflictsV) {
        conflicts[vv] = conflictsV = {};
    }
    conflictsV[ww] = true;
};
exports.addConflict = addConflict;
var hasConflict = function (conflicts, v, w) {
    var vv = v;
    var ww = w;
    if (vv > ww) {
        var tmp = v;
        vv = ww;
        ww = tmp;
    }
    return conflicts[vv] && conflicts[vv].hasOwnProperty(ww);
};
exports.hasConflict = hasConflict;
/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */
var verticalAlignment = function (g, layering, conflicts, neighborFn) {
    var root = {};
    var align = {};
    var pos = {};
    // We cache the position here based on the layering because the graph and
    // layering may be out of sync. The layering matrix is manipulated to
    // generate different extreme alignments.
    layering === null || layering === void 0 ? void 0 : layering.forEach(function (layer) {
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v, order) {
            root[v] = v;
            align[v] = v;
            pos[v] = order;
        });
    });
    layering === null || layering === void 0 ? void 0 : layering.forEach(function (layer) {
        var prevIdx = -1;
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v) {
            var ws = neighborFn(v);
            if (ws.length) {
                ws = ws.sort(function (a, b) { return pos[a] - pos[b]; });
                var mp = (ws.length - 1) / 2;
                for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
                    var w = ws[i];
                    if (align[v] === v &&
                        prevIdx < pos[w] &&
                        !hasConflict(conflicts, v, w)) {
                        align[w] = v;
                        align[v] = root[v] = root[w];
                        prevIdx = pos[w];
                    }
                }
            }
        });
    });
    return { root: root, align: align };
};
exports.verticalAlignment = verticalAlignment;
var horizontalCompaction = function (g, layering, root, align, reverseSep) {
    var _a;
    // This portion of the algorithm differs from BK due to a number of problems.
    // Instead of their algorithm we construct a new block graph and do two
    // sweeps. The first sweep places blocks with the smallest possible
    // coordinates. The second sweep removes unused space by moving blocks to the
    // greatest coordinates without violating separation.
    var xs = {};
    var blockG = buildBlockGraph(g, layering, root, reverseSep);
    var borderType = reverseSep ? "borderLeft" : "borderRight";
    var iterate = function (setXsFunc, nextNodesFunc) {
        var stack = blockG.nodes();
        var elem = stack.pop();
        var visited = {};
        while (elem) {
            if (visited[elem]) {
                setXsFunc(elem);
            }
            else {
                visited[elem] = true;
                stack.push(elem);
                stack = stack.concat(nextNodesFunc(elem));
            }
            elem = stack.pop();
        }
    };
    // First pass, assign smallest coordinates
    var pass1 = function (elem) {
        xs[elem] = (blockG.inEdges(elem) || []).reduce(function (acc, e) {
            return Math.max(acc, (xs[e.v] || 0) + blockG.edge(e));
        }, 0);
    };
    // Second pass, assign greatest coordinates
    var pass2 = function (elem) {
        var min = (blockG.outEdges(elem) || []).reduce(function (acc, e) {
            return Math.min(acc, (xs[e.w] || 0) - blockG.edge(e));
        }, Number.POSITIVE_INFINITY);
        var node = g.node(elem);
        if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
            xs[elem] = Math.max(xs[elem], min);
        }
    };
    iterate(pass1, blockG.predecessors.bind(blockG));
    iterate(pass2, blockG.successors.bind(blockG));
    // Assign x coordinates to all nodes
    // @ts-ignore
    (_a = Object.values(align)) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
        xs[v] = xs[root[v]];
    });
    return xs;
};
exports.horizontalCompaction = horizontalCompaction;
var buildBlockGraph = function (g, layering, root, reverseSep) {
    var blockGraph = new Graph();
    var graphLabel = g.graph();
    var sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
    layering === null || layering === void 0 ? void 0 : layering.forEach(function (layer) {
        var u;
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v) {
            var vRoot = root[v];
            blockGraph.setNode(vRoot);
            if (u) {
                var uRoot = root[u];
                var prevMax = blockGraph.edge(uRoot, vRoot);
                blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }
            u = v;
        });
    });
    return blockGraph;
};
/*
 * Returns the alignment that has the smallest width of the given alignments.
 */
var findSmallestWidthAlignment = function (g, xss) {
    // @ts-ignore
    return util_1.default.minBy(Object.values(xss), function (xs) {
        var _a;
        var max = Number.NEGATIVE_INFINITY;
        var min = Number.POSITIVE_INFINITY;
        (_a = Object.keys(xs)) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
            var x = xs[v];
            var halfWidth = width(g, v) / 2;
            max = Math.max(x + halfWidth, max);
            min = Math.min(x - halfWidth, min);
        });
        return max - min;
    });
};
exports.findSmallestWidthAlignment = findSmallestWidthAlignment;
/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */
function alignCoordinates(xss, alignTo) {
    // @ts-ignore
    var alignToVals = Object.values(alignTo);
    var alignToMin = Math.min.apply(Math, alignToVals);
    var alignToMax = Math.max.apply(Math, alignToVals);
    ["u", "d"].forEach(function (vert) {
        ["l", "r"].forEach(function (horiz) {
            var alignment = vert + horiz;
            var xs = xss[alignment];
            var delta;
            if (xs === alignTo)
                return;
            var xsVals = Object.values(xs);
            delta = horiz === "l" ? alignToMin - Math.min.apply(Math, xsVals) : alignToMax - Math.max.apply(Math, xsVals);
            if (delta) {
                xss[alignment] = {};
                Object.keys(xs).forEach(function (key) {
                    xss[alignment][key] = xs[key] + delta;
                });
            }
        });
    });
}
exports.alignCoordinates = alignCoordinates;
var balance = function (xss, align) {
    var result = {};
    Object.keys(xss.ul).forEach(function (key) {
        if (align) {
            result[key] = xss[align.toLowerCase()][key];
        }
        else {
            // @ts-ignore
            var values = Object.values(xss).map(function (x) { return x[key]; });
            var xs = values.sort(function (a, b) { return (a - b); });
            result[key] = (xs[1] + xs[2]) / 2;
        }
    });
    return result;
    // return _.mapValues(xss.ul, function(ignore, v) {
    //   if (align) {
    //     return xss[align.toLowerCase()][v];
    //   } else {
    //     const xs = _.sortBy(_.map(xss, v));
    //     return (xs[1] + xs[2]) / 2;
    //   }
    // });
};
exports.balance = balance;
var positionX = function (g) {
    var layering = util_1.default.buildLayerMatrix(g);
    var conflicts = Object.assign(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
    var xss = {};
    var adjustedLayering;
    ["u", "d"].forEach(function (vert) {
        // @ts-ignore
        adjustedLayering = vert === "u" ? layering : Object.values(layering).reverse();
        ["l", "r"].forEach(function (horiz) {
            if (horiz === "r") {
                // @ts-ignore
                adjustedLayering = adjustedLayering.map(function (inner) { return Object.values(inner).reverse(); });
            }
            var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
            var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
            if (horiz === "r") {
                // @ts-ignore
                xs = Object.values(xs).map(function (x) { return -x; });
            }
            xss[vert + horiz] = xs;
        });
    });
    var smallestWidth = findSmallestWidthAlignment(g, xss);
    alignCoordinates(xss, smallestWidth);
    return balance(xss, g.graph().align);
};
exports.positionX = positionX;
var sep = function (nodeSep, edgeSep, reverseSep) {
    return function (g, v, w) {
        var vLabel = g.node(v);
        var wLabel = g.node(w);
        var sum = 0;
        var delta;
        sum += vLabel.width / 2;
        if (vLabel.hasOwnProperty("labelpos")) {
            switch ((vLabel.labelpos || '').toLowerCase()) {
                case "l":
                    delta = -vLabel.width / 2;
                    break;
                case "r":
                    delta = vLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += wLabel.width / 2;
        if (wLabel.hasOwnProperty("labelpos")) {
            switch ((wLabel.labelpos || '').toLowerCase()) {
                case "l":
                    delta = wLabel.width / 2;
                    break;
                case "r":
                    delta = -wLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        return sum;
    };
};
var width = function (g, v) { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.width) || 0; };
exports.default = {
    positionX: positionX,
    findType1Conflicts: findType1Conflicts,
    findType2Conflicts: findType2Conflicts,
    addConflict: addConflict,
    hasConflict: hasConflict,
    verticalAlignment: verticalAlignment,
    horizontalCompaction: horizontalCompaction,
    alignCoordinates: alignCoordinates,
    findSmallestWidthAlignment: findSmallestWidthAlignment,
    balance: balance
};
//# sourceMappingURL=bk.js.map