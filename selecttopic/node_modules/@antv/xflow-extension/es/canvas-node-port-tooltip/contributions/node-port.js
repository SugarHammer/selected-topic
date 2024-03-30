import { __awaiter, __decorate, __metadata } from "tslib";
import classnames from 'classnames';
import { IHookContribution, ManaSyringe } from '@antv/xflow-core';
import { IGraphProvider } from '@antv/xflow-core';
import { ACTIVE_NODE_PORT, NsPortEvent } from '../interface';
import { DisposableCollection, IModelContribution, Disposable } from '@antv/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
let NodePortTooltipContribution = class NodePortTooltipContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        /** 获取画布实例 */
        this.getGraphInstance = () => __awaiter(this, void 0, void 0, function* () {
            const graphInstance = yield this.graphProvider.getGraphInstance();
            const graphConfig = yield this.graphProvider.getGraphOptions();
            return { graph: graphInstance, config: graphConfig };
        });
        /** 获取GraphOptions */
        this.getPortRenderConfig = () => {
            const dagOptions = {
                onPortRendered(portRenderedArgs) {
                    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
                    const graph = this;
                    const { port, node } = portRenderedArgs;
                    const { contentSelectors } = portRenderedArgs;
                    const portContainer = contentSelectors && contentSelectors['xflow-port-group'];
                    if (portContainer instanceof Element) {
                        portContainer.setAttribute('class', classnames('xflow-port-group', {
                            connected: port.connected && port.group !== 'out',
                            groupPort: (node === null || node === void 0 ? void 0 : node.isGroup) && (node === null || node === void 0 ? void 0 : node.isGroup()),
                        }));
                        portContainer.addEventListener('mouseenter', e => {
                            const eventArgs = {
                                e: e,
                                portId: port.id,
                                nodeId: node.id,
                                portData: port,
                                nodeData: node.getData(),
                                tooltip: port.tooltip,
                                placement: port.group,
                            };
                            graph.trigger(NsPortEvent.MOUSE_ENTER, eventArgs);
                        });
                        portContainer.addEventListener('mouseleave', e => {
                            const eventArgs = {
                                e: e,
                                portId: port.id,
                                nodeId: node.id,
                                portData: port,
                                nodeData: node.getData(),
                                tooltip: port.tooltip,
                                placement: port.group,
                            };
                            graph.trigger(NsPortEvent.MOUSE_LEAVE, eventArgs);
                        });
                    }
                },
            };
            return dagOptions;
        };
        this.registerHookHub = () => __awaiter(this, void 0, void 0, function* () {
            return Disposable.create(() => { });
        });
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const toDispose = new DisposableCollection();
            const disposables = [
                hooks.graphOptions.registerHook({
                    name: 'add onPortRendered options ',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        Object.assign(args, this.getPortRenderConfig());
                    }),
                }),
            ];
            toDispose.pushAll(disposables);
            return Disposable.create(() => { });
        });
    }
    registerModel(registry) {
        registry.registerModel({
            id: ACTIVE_NODE_PORT.id,
            watchChange: (self) => __awaiter(this, void 0, void 0, function* () {
                const { graph, config } = yield this.getGraphInstance();
                const calcPosition = (e) => {
                    const { x, y, width, height } = e.target.getBoundingClientRect();
                    const clientRect = config.rootContainer.getBoundingClientRect();
                    const position = {
                        x: x - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.x) || 0) + width / 2,
                        y: y - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) || 0) + height / 2,
                    };
                    return position;
                };
                const onMouseEnter = (args) => {
                    self.setValue(Object.assign(Object.assign({}, args), { position: calcPosition(args.e) }));
                };
                const onMouseLeave = () => {
                    self.setValue(null);
                };
                /** 绑定事件 */
                graph.on(NsPortEvent.MOUSE_ENTER, onMouseEnter);
                graph.on(NsPortEvent.MOUSE_LEAVE, onMouseLeave);
                graph.on('cell:mouseleave', onMouseLeave);
                return Disposable.create(() => {
                    /** 解除绑定 */
                    graph.off(NsPortEvent.MOUSE_ENTER, onMouseEnter);
                    graph.off(NsPortEvent.MOUSE_LEAVE, onMouseLeave);
                });
            }),
        });
    }
};
__decorate([
    ManaSyringe.inject(IGraphProvider),
    __metadata("design:type", Object)
], NodePortTooltipContribution.prototype, "graphProvider", void 0);
NodePortTooltipContribution = __decorate([
    ManaSyringe.singleton({ contrib: [IHookContribution, IModelContribution] })
], NodePortTooltipContribution);
export { NodePortTooltipContribution };
//# sourceMappingURL=node-port.js.map