var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { useState, useCallback, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NodeView } from '@antv/x6';
import { Wrap } from '../wrap';
const action = 'react';
export function createPortal(uniqViewId) {
    const setGraphRef = { current: () => { } };
    const setGraph = (graph) => {
        setGraphRef.current(graph);
    };
    let add;
    let remove;
    function connect(id, portal) {
        add({ id, portal });
    }
    function disconnect(id) {
        remove(id);
    }
    const Portal = () => {
        const [items, setItems] = useState([]);
        const [graph, setGraphInstance] = useState();
        const pendingAddIdsRef = useRef([]);
        const pendingAddItemsRef = useRef([]);
        setGraphRef.current = setGraphInstance;
        const addItem = useCallback((payload) => {
            const { id } = payload;
            if (pendingAddIdsRef.current.includes(id)) {
                // if in pendingAddIds queue
                const itms = pendingAddItemsRef.current;
                const matchIndex = itms.findIndex((item) => item.id === id);
                if (matchIndex > -1) {
                    itms[matchIndex] = payload;
                }
                else {
                    itms.push(payload);
                }
                pendingAddItemsRef.current = itms;
            }
            else {
                // if not in pendingAddIds queue
                setItems((prevItems) => {
                    const nextItems = [...prevItems];
                    const matchIndex = nextItems.findIndex((item) => item.id === id);
                    if (matchIndex > -1) {
                        nextItems[matchIndex] = payload;
                    }
                    else {
                        nextItems.push(payload);
                    }
                    return nextItems;
                });
            }
        }, []);
        add = addItem;
        const removeItem = useCallback((id) => {
            if (pendingAddIdsRef.current.includes(id)) {
                pendingAddIdsRef.current = pendingAddIdsRef.current.filter((cId) => cId !== id);
            }
            if (pendingAddItemsRef.current.map((c) => c.id).includes(id)) {
                pendingAddItemsRef.current = pendingAddItemsRef.current.filter((c) => c.id !== id);
            }
            setItems((itms) => itms.filter((item) => item.id !== id));
        }, []);
        remove = removeItem;
        const startBatch = useCallback((args) => {
            const { name, data } = args;
            const { cells = [] } = data || {};
            if (name === 'add') {
                const cellIds = cells
                    .filter((cell) => cell.isNode())
                    .map((cell) => cell.id);
                pendingAddIdsRef.current = Array.from(new Set([...pendingAddIdsRef.current, ...cellIds]));
            }
        }, []);
        const stopBatch = useCallback(({ name }) => {
            if (name === 'add') {
                const pendingAdds = pendingAddItemsRef.current;
                if (pendingAdds.length) {
                    const currentPendingAddIds = pendingAdds.map((pendingAddItem) => pendingAddItem.id);
                    pendingAddIdsRef.current = pendingAddIdsRef.current.filter((id) => !currentPendingAddIds.includes(id));
                    pendingAddItemsRef.current = [];
                    setItems((prevItems) => {
                        const nextItems = [...prevItems];
                        pendingAdds.forEach((pendingAddItem) => {
                            const matchIndex = nextItems.findIndex((item) => item.id === pendingAddItem.id);
                            if (matchIndex > -1) {
                                nextItems[matchIndex] = pendingAddItem;
                            }
                            else {
                                nextItems.push(pendingAddItem);
                            }
                        });
                        return nextItems;
                    });
                }
            }
        }, []);
        useLayoutEffect(() => {
            if (graph) {
                graph.on('batch:start', startBatch);
                graph.on('batch:stop', stopBatch);
            }
            return () => {
                if (graph) {
                    graph.off('batch:start', startBatch);
                    graph.off('batch:stop', stopBatch);
                    setItems([]);
                    pendingAddIdsRef.current = [];
                    pendingAddItemsRef.current = [];
                }
            };
        }, [graph, startBatch, stopBatch]);
        return React.createElement(React.Fragment, null, ...items.map((item) => item.portal));
    };
    class ReactShapeView extends NodeView {
        init() {
            super.init();
            this.cell.on('removed', () => {
                disconnect(this.cell.id);
            });
        }
        getComponentContainer() {
            return this.cell.prop('useForeignObject') === false
                ? this.selectors.content
                : this.selectors.foContent;
        }
        confirmUpdate(flag) {
            const ret = super.confirmUpdate(flag);
            return this.handleAction(ret, action, () => this.renderReactComponent());
        }
        renderReactComponent() {
            this.unmountReactComponent();
            const root = this.getComponentContainer();
            const node = this.cell;
            const graph = this.graph;
            if (root) {
                const component = this.graph.hook.getReactComponent(node);
                const elem = React.createElement(Wrap, { graph, node, component });
                connect(this.cell.id, ReactDOM.createPortal(elem, root));
            }
        }
        unmountReactComponent() {
            const root = this.getComponentContainer();
            if (root) {
                ReactDOM.unmountComponentAtNode(root);
            }
            return root;
        }
        onMouseDown(e, x, y) {
            const target = e.target;
            const tagName = target.tagName.toLowerCase();
            if (tagName === 'input') {
                const type = target.getAttribute('type');
                if (type == null ||
                    [
                        'text',
                        'password',
                        'number',
                        'email',
                        'search',
                        'tel',
                        'url',
                    ].includes(type)) {
                    return;
                }
            }
            super.onMouseDown(e, x, y);
        }
        dispose() {
            disconnect(this.cell.id);
            this.unmountReactComponent();
        }
    }
    __decorate([
        NodeView.dispose()
    ], ReactShapeView.prototype, "dispose", null);
    ReactShapeView.config({
        bootstrap: [action],
        actions: {
            component: action,
        },
    });
    NodeView.registry.register(uniqViewId, ReactShapeView, true);
    return { Portal, setGraph };
}
export function usePortal(uniqViewId) {
    const initializedRef = useRef(false);
    const [PortalContainer] = useState(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;
            return createPortal(uniqViewId);
        }
        return {}; // won't be used
    });
    return [PortalContainer.Portal, PortalContainer.setGraph];
}
//# sourceMappingURL=index.js.map