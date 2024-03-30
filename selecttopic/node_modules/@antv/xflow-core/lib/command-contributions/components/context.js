"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsNodeSelected = exports.getEdgeReactComponent = exports.getNodeReactComponent = exports.useAppContext = exports.AppContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
exports.AppContext = react_1.default.createContext({
    cell: null,
    x6Graph: null,
    commands: null,
    modelService: null,
});
var useAppContext = function () { return react_1.default.useContext(exports.AppContext); };
exports.useAppContext = useAppContext;
function getNodeReactComponent(Component, commands, modelService) {
    return function (x6Node) {
        /* eslint-disable-next-line  */
        var x6Graph = this;
        var nodeData = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getData();
        var size = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getSize();
        var position = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getPosition();
        var WrappedComponent = function () {
            return (react_1.default.createElement(exports.AppContext.Provider, { value: {
                    cell: x6Node,
                    x6Graph: x6Graph,
                    commands: commands,
                    modelService: modelService,
                } }, react_1.default.createElement(Component, {
                cell: x6Node,
                data: nodeData,
                size: size,
                position: position,
            })));
        };
        return react_1.default.createElement(WrappedComponent, null);
    };
}
exports.getNodeReactComponent = getNodeReactComponent;
function getEdgeReactComponent(Component, commands, modelService) {
    return function (x6Edge) {
        /* eslint-disable-next-line  */
        var x6Graph = this;
        var edgeData = x6Edge === null || x6Edge === void 0 ? void 0 : x6Edge.getData();
        var WrappedComponent = function () {
            return (react_1.default.createElement(exports.AppContext.Provider, { value: {
                    cell: x6Edge,
                    x6Graph: x6Graph,
                    commands: commands,
                    modelService: modelService,
                } }, react_1.default.createElement(Component, {
                data: edgeData,
                cell: x6Edge,
            })));
        };
        return react_1.default.createElement(WrappedComponent, null);
    };
}
exports.getEdgeReactComponent = getEdgeReactComponent;
/** 获取节点选中状态 */
var useIsNodeSelected = function () {
    var _a = react_1.default.useState(false), isSelected = _a[0], setIsSelected = _a[1];
    var _b = (0, exports.useAppContext)(), x6Graph = _b.x6Graph, cell = _b.cell;
    react_1.default.useEffect(function () {
        var handler = function (_a) {
            var added = _a.added, removed = _a.removed;
            var isAdded = added
                .filter(function (selectedCell) { return selectedCell.isNode(); })
                .some(function (node) {
                node.id === cell.id;
            });
            if (isAdded) {
                cell.setData(tslib_1.__assign(tslib_1.__assign({}, cell.getData()), { isNodeSelected: true }));
                setIsSelected(true);
                return;
            }
            var isRemoved = removed
                .filter(function (selectedCell) { return selectedCell.isNode(); })
                .some(function (node) {
                node.id === cell.id;
            });
            if (isRemoved) {
                cell.setData(tslib_1.__assign(tslib_1.__assign({}, cell.getData()), { isNodeSelected: false }));
                setIsSelected(false);
                return;
            }
        };
        x6Graph.on('selection:changed', handler);
        return function () {
            x6Graph.off('selection:changed', handler);
        };
        /* eslint-disable-next-line  */
    }, [x6Graph]);
    return [isSelected];
};
exports.useIsNodeSelected = useIsNodeSelected;
//# sourceMappingURL=context.js.map