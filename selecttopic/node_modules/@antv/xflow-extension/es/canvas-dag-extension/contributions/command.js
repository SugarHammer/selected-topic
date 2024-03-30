import { __awaiter, __decorate, __metadata } from "tslib";
import { ManaSyringe, ICommandHandler, ICommandContextProvider, delay } from '@antv/xflow-core';
import { XFlowDagCommands, GRAPH_STATUS_INFO, EDGE_PROCESSING_CLASSNAME } from '../constants';
export var NsGraphStatusCommand;
(function (NsGraphStatusCommand) {
    /** Command: 获取执行状态 */
    NsGraphStatusCommand.MODEL = GRAPH_STATUS_INFO;
    /** Command: 用于注册 named factory */
    NsGraphStatusCommand.command = XFlowDagCommands.QUERY_GRAPH_STATUS;
    /** hookName */
    NsGraphStatusCommand.hookKey = 'queryGraphStatus';
    /** 状态 类型 */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum["SUCCESS"] = "success";
        StatusEnum["PROCESSING"] = "processing";
        StatusEnum["ERROR"] = "error";
        StatusEnum["DEFAULT"] = "default";
        StatusEnum["WARNING"] = "warning";
    })(StatusEnum = NsGraphStatusCommand.StatusEnum || (NsGraphStatusCommand.StatusEnum = {}));
    /** 按status 分类  */
    NsGraphStatusCommand.initStatusMap = () => ({
        [NsGraphStatusCommand.StatusEnum.DEFAULT]: [],
        [NsGraphStatusCommand.StatusEnum.PROCESSING]: [],
        [NsGraphStatusCommand.StatusEnum.ERROR]: [],
        [NsGraphStatusCommand.StatusEnum.WARNING]: [],
        [NsGraphStatusCommand.StatusEnum.SUCCESS]: [],
    });
    /** 接口返回 类型 */
    NsGraphStatusCommand.groupByStatus = (data) => {
        const seed = NsGraphStatusCommand.initStatusMap();
        return Object.entries(data).reduce((acc, [nodeId, value]) => {
            acc[value.status].push(nodeId);
            return acc;
        }, seed);
    };
    /** diff status */
    NsGraphStatusCommand.statusDiff = (cur, next) => {
        const items = new Set([...cur, ...next]);
        const diff = { current: [], add: [], remove: [] };
        items.forEach(item => {
            if (next.includes(item) && !cur.includes(item)) {
                diff.add.push(item);
            }
            if (!next.includes(item) && cur.includes(item)) {
                diff.remove.push(item);
            }
        });
        return diff;
    };
    NsGraphStatusCommand.shouldStop = (info) => __awaiter(this, void 0, void 0, function* () {
        return [StatusEnum.ERROR, StatusEnum.SUCCESS].includes(info.graphStatus);
    });
})(NsGraphStatusCommand || (NsGraphStatusCommand = {}));
/** 创建节点命令 */
let QueryGraphStatusCommand = class QueryGraphStatusCommand {
    constructor() {
        /** 状态缓存 */
        this.statusInfo = NsGraphStatusCommand.initStatusMap();
        /** 获取Model */
        this.getStatusModel = () => __awaiter(this, void 0, void 0, function* () {
            const ctx = this.contextProvider();
            const modelService = ctx.getModelService();
            const statusModel = yield GRAPH_STATUS_INFO.getModel(modelService);
            return statusModel;
        });
        /** 更新Model数据 */
        this.updateModelValue = (callback) => __awaiter(this, void 0, void 0, function* () {
            const statusModel = yield this.getStatusModel();
            statusModel.setValue(callback);
        });
        /** 停止Looping的flag */
        this.stopCurrentStatusLooping = () => __awaiter(this, void 0, void 0, function* () {
            const statusModel = yield this.getStatusModel();
            const { subscription } = yield statusModel.getValidValue();
            subscription.dispose();
        });
        /** 设置停止looping的方法 */
        this.addStopDispose = () => __awaiter(this, void 0, void 0, function* () {
            const statusModel = yield this.getStatusModel();
            const { subscription } = yield statusModel.getValidValue();
            subscription.push({
                dispose: () => {
                    /** 重制processing的边的状态 */
                    this.updateEdges(this.statusInfo, NsGraphStatusCommand.initStatusMap());
                    this.isLooping = false;
                },
            });
        });
        /** 更新Graph的数据 */
        this.updateGraph = (curStatusInfo, nextStatusMap, statusMap) => {
            /** 更新节点 */
            this.updateNodes(curStatusInfo, nextStatusMap, statusMap);
            /** 更新边 */
            this.updateEdges(curStatusInfo, nextStatusMap);
        };
        /** 更新节点数据 */
        this.updateNodeData = (id, data) => {
            const cell = this.x6Graph.getCellById(id);
            if (!cell) {
                return;
            }
            cell.setData(Object.assign(Object.assign(Object.assign(Object.assign({}, cell.getData()), cell.getSize()), cell.getPosition()), data));
        };
        /** 更新连线数据 */
        this.updateNodes = (curStatusInfo, nextStatusMap, statusMap) => {
            Object.keys(curStatusInfo).forEach(status => {
                const nodes = NsGraphStatusCommand.statusDiff(curStatusInfo[status], nextStatusMap[status]);
                nodes.add.forEach((id) => {
                    this.updateNodeData(id, statusMap[id]);
                });
                nodes.remove.forEach((id) => {
                    this.updateNodeData(id, statusMap[id]);
                });
            });
        };
        /** 更新节点数据 */
        this.updateEdges = (curStatusInfo, nextStatusMap) => {
            const runningNodes = NsGraphStatusCommand.statusDiff(curStatusInfo.processing, nextStatusMap.processing);
            const edges = this.x6Graph.getEdges();
            edges.forEach(edge => {
                var _a;
                const view = (_a = this.x6Graph) === null || _a === void 0 ? void 0 : _a.findViewByCell(edge.id);
                const target = edge.getTargetCellId();
                if (!target) {
                    return;
                }
                const targetNodeId = target.toString();
                if (!view) {
                    return;
                }
                if (runningNodes.add.includes(targetNodeId)) {
                    /** 新增className */
                    return view.addClass(EDGE_PROCESSING_CLASSNAME);
                }
                else if (runningNodes.remove.includes(targetNodeId)) {
                    /** 移除className */
                    return view.removeClass(EDGE_PROCESSING_CLASSNAME);
                }
            });
        };
        /** 执行Cmd */
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            const ctx = this.contextProvider();
            const { args, hooks: runtimeHook } = ctx.getArgs();
            const hooks = ctx.getHooks();
            // 引用
            this.x6Graph = yield ctx.getX6Graph();
            const result = yield hooks.queryGraphStatus.call(args, (handlerArgs) => __awaiter(this, void 0, void 0, function* () {
                const { graphStatusService, shouldStop = NsGraphStatusCommand.shouldStop, doOnce, } = handlerArgs;
                // 取消已有的循环
                yield this.stopCurrentStatusLooping();
                // 循环函数
                const loopFunction = (service, loopInterval = 10000) => __awaiter(this, void 0, void 0, function* () {
                    // 查询服务端状态
                    const data = yield service(handlerArgs);
                    // 更新全局状态
                    this.updateModelValue(state => {
                        Object.entries(data.statusMap).forEach(([key, value]) => {
                            state.statusMap.set(key, value);
                        });
                        state.graphStatus = data.graphStatus;
                    });
                    // 更新图上状态
                    const statusGroupMap = NsGraphStatusCommand.groupByStatus(data.statusMap);
                    this.updateGraph(this.statusInfo, statusGroupMap, data.statusMap);
                    // 缓存当前状态作为对比数据
                    this.statusInfo = statusGroupMap;
                    // 延迟
                    yield delay(loopInterval);
                    // 判断是否循环
                    if (!this.isLooping) {
                        return;
                    }
                    // 判断是否循环
                    if (shouldStop) {
                        const isStop = yield shouldStop(data, handlerArgs);
                        if (isStop) {
                            return;
                        }
                    }
                    // 执行下次调用
                    yield loopFunction(service, loopInterval);
                });
                // 从参数更新循环的FLAG
                this.isLooping = handlerArgs.loop === undefined ? true : handlerArgs.loop;
                // 添加可以停止loop的回调
                yield this.addStopDispose();
                // 执行
                if (doOnce) {
                    yield doOnce(handlerArgs);
                }
                loopFunction(graphStatusService, handlerArgs.loopInterval);
                return {};
            }), runtimeHook);
            ctx.setResult(result);
            return this;
        });
        /** undo cmd */
        this.undo = () => __awaiter(this, void 0, void 0, function* () {
            const ctx = this.contextProvider();
            if (this.isUndoable()) {
                ctx.undo();
            }
            return this;
        });
        /** redo cmd */
        this.redo = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.isUndoable()) {
                yield this.execute();
            }
            return this;
        });
    }
    isUndoable() {
        const ctx = this.contextProvider();
        return ctx.isUndoable();
    }
};
__decorate([
    ManaSyringe.inject(ICommandContextProvider),
    __metadata("design:type", Object)
], QueryGraphStatusCommand.prototype, "contextProvider", void 0);
QueryGraphStatusCommand = __decorate([
    ManaSyringe.injectable({
        token: { token: ICommandHandler, named: NsGraphStatusCommand.command.id },
    })
], QueryGraphStatusCommand);
export { QueryGraphStatusCommand };
export const execCmd = () => { };
//# sourceMappingURL=command.js.map