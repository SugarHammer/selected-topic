import { __awaiter, __decorate } from "tslib";
import { ManaSyringe, DisposableCollection, Disposable } from '@antv/xflow-core';
import { IHookContribution } from '@antv/xflow-core';
import { XFlowNode } from '../x6-extension/node';
import { Shape } from '@antv/x6';
export const flowOptions = {
    grid: true,
    mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
    },
    connecting: {
        router: 'manhattan',
        connector: {
            name: 'rounded',
            args: {
                radius: 8,
            },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
            radius: 20,
        },
        createEdge() {
            return new Shape.Edge({
                attrs: {
                    line: {
                        stroke: '#A2B1C3',
                        strokeWidth: 2,
                        targetMarker: {
                            name: 'block',
                            width: 12,
                            height: 8,
                        },
                    },
                },
                zIndex: 0,
            });
        },
        validateConnection({ targetMagnet }) {
            return !!targetMagnet;
        },
    },
    highlighting: {
        magnetAdsorbed: {
            name: 'stroke',
            args: {
                attrs: {
                    fill: '#5F95FF',
                    stroke: '#5F95FF',
                },
            },
        },
    },
    resizing: true,
    rotating: true,
    selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
        modifiers: 'shift',
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
};
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
let FlowHooksContribution = class FlowHooksContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        this.registerHookHub = () => __awaiter(this, void 0, void 0, function* () {
            return Disposable.create(() => { });
        });
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const toDispose = new DisposableCollection();
            const disposables = [
                hooks.addNode.registerHook({
                    name: 'flow-add-node',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        const cellFactory = (nodeConfig) => __awaiter(this, void 0, void 0, function* () {
                            const node = new XFlowNode(Object.assign({}, nodeConfig));
                            return node;
                        });
                        args.cellFactory = cellFactory;
                    }),
                }),
                hooks.addEdge.registerHook({
                    name: 'flow-add-edge',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        const cellFactory = (edgeConfig) => __awaiter(this, void 0, void 0, function* () {
                            delete edgeConfig.id;
                            const cell = new Shape.Edge({
                                source: {
                                    cell: edgeConfig.source,
                                    port: edgeConfig.sourcePortId,
                                },
                                target: {
                                    cell: edgeConfig.target,
                                    port: edgeConfig.targetPortId,
                                },
                                attrs: {
                                    line: {
                                        stroke: '#A2B1C3',
                                        strokeWidth: 2,
                                        targetMarker: {
                                            name: 'block',
                                            width: 12,
                                            height: 8,
                                        },
                                    },
                                },
                                zIndex: -1,
                                data: Object.assign({}, edgeConfig),
                            });
                            return cell;
                        });
                        args.cellFactory = cellFactory;
                    }),
                }),
                hooks.graphOptions.registerHook({
                    name: 'assign options ',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        Object.assign(args, flowOptions);
                    }),
                }),
            ];
            toDispose.pushAll(disposables);
            return Disposable.create(() => { });
        });
    }
};
FlowHooksContribution = __decorate([
    ManaSyringe.singleton({ contrib: IHookContribution })
], FlowHooksContribution);
export { FlowHooksContribution };
//# sourceMappingURL=flow.js.map