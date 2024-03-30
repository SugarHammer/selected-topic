export const node2Json = (cell) => {
    const children = cell.getChildren();
    const size = cell.getSize();
    const data = cell.getData() || {};
    const position = cell.getPosition();
    const groupId = cell.getParentId();
    const { isCollapsed } = data;
    const groupCollapsedSize = data.groupCollapsedSize || (isCollapsed ? size : null);
    return Object.assign(Object.assign({}, data), { id: cell.id, width: size.width, height: size.height, x: position.x, y: position.y, group: groupId, groupChildren: children ? children.map(child => child.id) : null, groupCollapsedSize });
};
export const edge2Json = (cell) => {
    const data = cell.getData() || {};
    return Object.assign({ id: cell.id }, data);
};
export const cellsToJson = (cells) => {
    const nodes = [];
    const edges = [];
    const cell2Json = (cell) => {
        if (cell.isNode()) {
            nodes.push(node2Json(cell));
        }
        if (cell.isEdge()) {
            edges.push(edge2Json(cell));
        }
    };
    cells.map(cell => {
        return cell2Json(cell);
    });
    return {
        nodes,
        edges,
    };
};
//# sourceMappingURL=graph-utils.js.map