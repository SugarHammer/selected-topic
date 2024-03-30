import { __awaiter, __decorate, __metadata } from "tslib";
import { singleton, inject } from 'mana-syringe';
import { IGraphOptionProvider } from '../../xflow-main/graph/config';
import { XFlowGraphCommands } from '../../command-contributions/constant';
import { DisposableCollection, Disposable } from '../../common/disposable';
import { IHookContribution } from '../interface';
import { throttle } from '../../common/utils';
export var NsGraphEventPlugin;
(function (NsGraphEventPlugin) {
    NsGraphEventPlugin.pluginId = 'base-graph-events';
})(NsGraphEventPlugin || (NsGraphEventPlugin = {}));
/**
 * 内置的hook contribution
 * 处理graph config 的 evnets props
 */
let GraphEventContribution = class GraphEventContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        this.registerHookHub = () => __awaiter(this, void 0, void 0, function* () {
            return Disposable.create(() => { });
        });
        /** 扩展Hook */
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const toDispose = new DisposableCollection();
            const disposables = [
                /** 在graph启动前, 注册外部事件到x6Events的hooks上*/
                hooks.x6Events.registerHook({
                    name: NsGraphEventPlugin.pluginId,
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        const { events } = yield this.graphOptions.getOptions();
                        events.forEach(event => {
                            args.push(event);
                        });
                    }),
                }),
                /** 在graph init后, 外部事件 */
                hooks.afterGraphInit.registerHook({
                    name: NsGraphEventPlugin.pluginId,
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        const { commandService, modelService, graph } = args;
                        /** 注册事件 */
                        const todo = yield hooks.x6Events.call([], (mergedEvents) => __awaiter(this, void 0, void 0, function* () {
                            return mergedEvents.map(e => {
                                const handler = handlerArgs => {
                                    e.callback(handlerArgs, commandService, modelService, graph);
                                };
                                graph.on(e.eventName, handler);
                                return {
                                    dispose: () => {
                                        graph.off(e.eventName, handler);
                                    },
                                };
                            });
                        }));
                        toDispose.pushAll(todo);
                    }),
                }),
                /** 监听window的resize事件，实现自动resize */
                hooks.afterGraphInit.registerHook({
                    name: 'add auto resize event',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        const { commandService, options, graph } = args;
                        const resizeHandler = throttle(() => {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_RESIZE.id, {});
                        });
                        window.addEventListener('resize', resizeHandler);
                        const { rootContainer } = options;
                        const resizeObserver = new ResizeObserver(() => graph.resize(rootContainer.clientWidth));
                        rootContainer && resizeObserver.observe(rootContainer);
                        toDispose.push(Disposable.create(() => {
                            window.removeEventListener('resize', resizeHandler);
                        }));
                    }),
                }),
                /** 在graph停止时 取消外部事件 */
                hooks.beforeGraphDestroy.registerHook({
                    name: NsGraphEventPlugin.pluginId,
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        toDispose.dispose();
                    }),
                }),
            ];
            toDispose.pushAll(disposables);
            return toDispose;
        });
    }
};
__decorate([
    inject(IGraphOptionProvider),
    __metadata("design:type", Object)
], GraphEventContribution.prototype, "graphOptions", void 0);
GraphEventContribution = __decorate([
    singleton({ contrib: IHookContribution })
], GraphEventContribution);
export { GraphEventContribution };
//# sourceMappingURL=graph.js.map