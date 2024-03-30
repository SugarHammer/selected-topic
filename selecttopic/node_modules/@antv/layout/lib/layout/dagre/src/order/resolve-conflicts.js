"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Given a list of entries of the form {v, barycenter, weight} and a
 * constraint graph this function will resolve any conflicts between the
 * constraint graph and the barycenters for the entries. If the barycenters for
 * an entry would violate a constraint in the constraint graph then we coalesce
 * the nodes in the conflict into a new node that respects the contraint and
 * aggregates barycenter and weight information.
 *
 * This implementation is based on the description in Forster, "A Fast and
 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
 * differs in some specific details.
 *
 * Pre-conditions:
 *
 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
 *       no barycenter, then {v}.
 *
 * Returns:
 *
 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
 *    `vs` may either be a singleton or it may be an aggregation of nodes
 *    ordered such that they do not violate constraints from the constraint
 *    graph. The property `i` is the lowest original index of any of the
 *    elements in `vs`.
 */
var resolveConflicts = function (entries, cg) {
    var _a, _b, _c;
    var mappedEntries = {};
    entries === null || entries === void 0 ? void 0 : entries.forEach(function (entry, i) {
        var tmp = mappedEntries[entry.v] = {
            i: i,
            indegree: 0,
            "in": [],
            out: [],
            vs: [entry.v],
        };
        if (entry.barycenter !== undefined) {
            tmp.barycenter = entry.barycenter;
            tmp.weight = entry.weight;
        }
    });
    (_a = cg.edges()) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
        var entryV = mappedEntries[e.v];
        var entryW = mappedEntries[e.w];
        if (entryV !== undefined && entryW !== undefined) {
            entryW.indegree++;
            entryV.out.push(mappedEntries[e.w]);
        }
    });
    // @ts-ignore
    var sourceSet = (_c = (_b = Object.values(mappedEntries)).filter) === null || _c === void 0 ? void 0 : _c.call(_b, function (entry) { return !entry.indegree; });
    return doResolveConflicts(sourceSet);
};
var doResolveConflicts = function (sourceSet) {
    var _a, _b;
    var entries = [];
    var handleIn = function (vEntry) {
        return function (uEntry) {
            if (uEntry.merged)
                return;
            if (uEntry.barycenter === undefined ||
                vEntry.barycenter === undefined ||
                uEntry.barycenter >= vEntry.barycenter) {
                mergeEntries(vEntry, uEntry);
            }
        };
    };
    var handleOut = function (vEntry) {
        return function (wEntry) {
            wEntry["in"].push(vEntry);
            if (--wEntry.indegree === 0) {
                sourceSet.push(wEntry);
            }
        };
    };
    var _loop_1 = function () {
        var entry = sourceSet.pop();
        entries.push(entry);
        (_a = entry["in"].reverse()) === null || _a === void 0 ? void 0 : _a.forEach(function (e) { return handleIn(entry)(e); });
        (_b = entry.out) === null || _b === void 0 ? void 0 : _b.forEach(function (e) { return handleOut(entry)(e); });
    };
    while (sourceSet === null || sourceSet === void 0 ? void 0 : sourceSet.length) {
        _loop_1();
    }
    var filtered = entries.filter(function (entry) { return !entry.merged; });
    var keys = ["vs", "i", "barycenter", "weight"];
    return filtered.map(function (entry) {
        var picked = {};
        keys === null || keys === void 0 ? void 0 : keys.forEach(function (key) {
            if (entry[key] === undefined)
                return;
            picked[key] = entry[key];
        });
        return picked;
    });
};
var mergeEntries = function (target, source) {
    var _a;
    var sum = 0;
    var weight = 0;
    if (target.weight) {
        sum += target.barycenter * target.weight;
        weight += target.weight;
    }
    if (source.weight) {
        sum += source.barycenter * source.weight;
        weight += source.weight;
    }
    target.vs = (_a = source.vs) === null || _a === void 0 ? void 0 : _a.concat(target.vs);
    target.barycenter = sum / weight;
    target.weight = weight;
    target.i = Math.min(source.i, target.i);
    source.merged = true;
};
exports.default = resolveConflicts;
//# sourceMappingURL=resolve-conflicts.js.map