"use strict";
/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */
Object.defineProperty(exports, "__esModule", { value: true });
var unlink = function (entry) {
    entry._prev._next = entry._next;
    entry._next._prev = entry._prev;
    delete entry._next;
    delete entry._prev;
};
var filterOutLinks = function (k, v) {
    if (k !== "_next" && k !== "_prev") {
        return v;
    }
};
var List = /** @class */ (function () {
    function List() {
        var sentinel = {};
        sentinel._next = sentinel._prev = sentinel;
        this.isentinel = sentinel;
    }
    List.prototype.dequeue = function () {
        var sentinel = this.isentinel;
        var entry = sentinel._prev;
        if (entry !== sentinel) {
            unlink(entry);
            return entry;
        }
    };
    List.prototype.enqueue = function () {
        var sentinel = this.isentinel;
        var entry = sentinel._prev;
        if (entry !== sentinel) {
            unlink(entry);
            return entry;
        }
    };
    List.prototype.toString = function () {
        var strs = [];
        var sentinel = this.isentinel;
        var curr = sentinel._prev;
        while (curr !== sentinel) {
            strs.push(JSON.stringify(curr, filterOutLinks));
            curr = curr._prev;
        }
        return "[" + strs.join(", ") + "]";
    };
    return List;
}());
exports.default = List;
//# sourceMappingURL=list.js.map