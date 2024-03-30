import { __awaiter, __decorate, __metadata } from "tslib";
import { injectable, inject, postConstruct } from 'mana-syringe';
import { DisposableCollection } from '../common/disposable';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IModelService, MODELS } from '../model-service';
import { IGraphCommandService } from '../command/interface';
import { IHookService } from '../hooks';
let CmdContext = class CmdContext {
    constructor() {
        /** undos 存在这里 */
        this.toDispose = new DisposableCollection();
        /** command handler的runtimeHook */
        this.runtimeHooks = [];
        /** 获取 x6 实例 */
        this.getX6Graph = () => __awaiter(this, void 0, void 0, function* () {
            if (this.graph)
                return this.graph;
            const graphInstance = yield this.graphProvider.getGraphInstance();
            this.graph = graphInstance;
            return graphInstance;
        });
        /** 获取 graph */
        this.getGraphConfig = () => __awaiter(this, void 0, void 0, function* () {
            return this.graphProvider.getGraphOptions();
        });
        /** 获取 graphMeta */
        this.getGraphMeta = () => __awaiter(this, void 0, void 0, function* () {
            const service = this.getModelService();
            const meta = this.graphMeta || (yield MODELS.GRAPH_META.useValue(service));
            return meta;
        });
        /** 设置参数 */
        this.setArgs = (args, runtimeHooks = []) => {
            this.args = args;
            this.runtimeHooks = runtimeHooks;
            return { args, hooks: runtimeHooks };
        };
        /** 获取参数 */
        this.getArgs = () => {
            /** 注入graph meta */
            const args = Object.assign(Object.assign({}, this.args), { modelService: this.getModelService(), commandService: this.getCommands(), getGraphMeta: this.getGraphMeta, getX6Graph: this.getX6Graph, getGraphConfig: this.getGraphConfig });
            return { args: args, hooks: this.runtimeHooks };
        };
        /** 设置执行结果 */
        this.setResult = (result) => {
            this.result = result;
            return this.result;
        };
        /** 获取执行结果 */
        this.getResult = () => {
            return this.result;
        };
        /** hooks */
        this.getHooks = () => {
            return this.hookService.hookProvider();
        };
        /** 获取Command Service */
        this.getCommands = () => {
            return this.commandService;
        };
        /** 获取Context Service */
        this.getModelService = () => {
            return this.modelService;
        };
        /** 添加undo */
        this.addUndo = (disposable) => {
            if (!Array.isArray(disposable)) {
                return this.addUndo([disposable]);
            }
            this.toDispose.pushAll(disposable);
        };
        /** 执行undo */
        this.undo = () => __awaiter(this, void 0, void 0, function* () {
            yield this.toDispose.dispose();
        });
        /** 是否可以执行undo */
        this.isUndoable = () => {
            return !this.toDispose.disposed;
        };
        /** 获取 toDispose */
        this.getDisposables = () => this.toDispose;
        /** 设置的共享变量 可以在command间共享 */
        this.setGlobal = (key, value) => {
            this.commandService.setGlobal(key, value);
        };
        /** 获取共享变量 */
        this.getGlobal = (key) => {
            return this.commandService.getGlobal(key);
        };
    }
    init() {
        this.getGraphMeta().then(meta => {
            this.graphMeta = meta;
        });
    }
};
__decorate([
    inject(IGraphProvider),
    __metadata("design:type", Object)
], CmdContext.prototype, "graphProvider", void 0);
__decorate([
    inject(IHookService),
    __metadata("design:type", Object)
], CmdContext.prototype, "hookService", void 0);
__decorate([
    inject(IGraphCommandService),
    __metadata("design:type", Object)
], CmdContext.prototype, "commandService", void 0);
__decorate([
    inject(IModelService),
    __metadata("design:type", Object)
], CmdContext.prototype, "modelService", void 0);
__decorate([
    postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmdContext.prototype, "init", null);
CmdContext = __decorate([
    injectable()
], CmdContext);
export { CmdContext };
//# sourceMappingURL=cmd-context.js.map