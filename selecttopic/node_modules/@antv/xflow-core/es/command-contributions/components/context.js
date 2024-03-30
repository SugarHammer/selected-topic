import React from 'react';
export const AppContext = React.createContext({
    cell: null,
    x6Graph: null,
    commands: null,
    modelService: null,
});
export const useAppContext = () => React.useContext(AppContext);
export function getNodeReactComponent(Component, commands, modelService) {
    return function (x6Node) {
        /* eslint-disable-next-line  */
        const x6Graph = this;
        const nodeData = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getData();
        const size = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getSize();
        const position = x6Node === null || x6Node === void 0 ? void 0 : x6Node.getPosition();
        const WrappedComponent = () => {
            return (React.createElement(AppContext.Provider, { value: {
                    cell: x6Node,
                    x6Graph,
                    commands,
                    modelService,
                } }, React.createElement(Component, {
                cell: x6Node,
                data: nodeData,
                size,
                position,
            })));
        };
        return React.createElement(WrappedComponent, null);
    };
}
export function getEdgeReactComponent(Component, commands, modelService) {
    return function (x6Edge) {
        /* eslint-disable-next-line  */
        const x6Graph = this;
        const edgeData = x6Edge === null || x6Edge === void 0 ? void 0 : x6Edge.getData();
        const WrappedComponent = () => {
            return (React.createElement(AppContext.Provider, { value: {
                    cell: x6Edge,
                    x6Graph,
                    commands,
                    modelService,
                } }, React.createElement(Component, {
                data: edgeData,
                cell: x6Edge,
            })));
        };
        return React.createElement(WrappedComponent, null);
    };
}
/** 获取节点选中状态 */
export const useIsNodeSelected = () => {
    const [isSelected, setIsSelected] = React.useState(false);
    const { x6Graph, cell } = useAppContext();
    React.useEffect(() => {
        const handler = ({ added, removed }) => {
            const isAdded = added
                .filter(selectedCell => selectedCell.isNode())
                .some(node => {
                node.id === cell.id;
            });
            if (isAdded) {
                cell.setData(Object.assign(Object.assign({}, cell.getData()), { isNodeSelected: true }));
                setIsSelected(true);
                return;
            }
            const isRemoved = removed
                .filter(selectedCell => selectedCell.isNode())
                .some(node => {
                node.id === cell.id;
            });
            if (isRemoved) {
                cell.setData(Object.assign(Object.assign({}, cell.getData()), { isNodeSelected: false }));
                setIsSelected(false);
                return;
            }
        };
        x6Graph.on('selection:changed', handler);
        return () => {
            x6Graph.off('selection:changed', handler);
        };
        /* eslint-disable-next-line  */
    }, [x6Graph]);
    return [isSelected];
};
//# sourceMappingURL=context.js.map