"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellsToJson = exports.edge2Json = exports.node2Json = void 0;
var tslib_1 = require("tslib");
var node2Json = function (cell) {
    var children = cell.getChildren();
    var size = cell.getSize();
    var data = cell.getData() || {};
    var position = cell.getPosition();
    var groupId = cell.getParentId();
    var isCollapsed = data.isCollapsed;
    var groupCollapsedSize = data.groupCollapsedSize || (isCollapsed ? size : null);
    return tslib_1.__assign(tslib_1.__assign({}, data), { id: cell.id, width: size.width, height: size.height, x: position.x, y: position.y, group: groupId, groupChildren: children ? children.map(function (child) { return child.id; }) : null, groupCollapsedSize: groupCollapsedSize });
};
exports.node2Json = node2Json;
var edge2Json = function (cell) {
    var data = cell.getData() || {};
    return tslib_1.__assign({ id: cell.id }, data);
};
exports.edge2Json = edge2Json;
var cellsToJson = function (cells) {
    var nodes = [];
    var edges = [];
    var cell2Json = function (cell) {
        if (cell.isNode()) {
            nodes.push((0, exports.node2Json)(cell));
        }
        if (cell.isEdge()) {
            edges.push((0, exports.edge2Json)(cell));
        }
    };
    cells.map(function (cell) {
        return cell2Json(cell);
    });
    return {
        nodes: nodes,
        edges: edges,
    };
};
exports.cellsToJson = cellsToJson;
//# sourceMappingURL=graph-utils.js.map