import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-classes-per-file */
import { inject, singleton, contrib, Contribution } from 'mana-syringe';
import { Node as X6Node, Edge as X6Edge } from '@antv/x6';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IGraphCommandService } from '../command/interface';
import { IModelService } from '../model-service';
import { IFrontendApplicationContribution } from './interface';
import { cellsToJson } from '../common/graph-utils';
export { IFrontendApplicationContribution } from './interface';
const TIMER_WARNING_THRESHOLD = 100;
let FrontendApplication = class FrontendApplication {
    constructor() {
        /** 获取画布实例 */
        this.getGraphInstance = () => {
            return this.graphProvider.getGraphInstance();
        };
        /** 获取画布配置项 */
        this.getGraphConfig = () => {
            return this.graphProvider.getGraphOptions();
        };
        /** 获取画布配置项 */
        this.getGraphData = () => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            const cells = graph.getCells();
            return cellsToJson(cells);
        });
        /** 获取画布所有节点 */
        this.getAllNodes = () => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            return graph.getNodes();
        });
        /** 获取画布节点 */
        this.getNodeById = (nodeId) => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            return graph.getCellById(nodeId);
        });
        /** 获取画布所有连线 */
        this.getAllEdges = () => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            return graph.getEdges();
        });
        /** 获取画布连线 */
        this.getEdgeById = (edgeId) => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            return graph.getCellById(edgeId);
        });
        /** 更新节点样式 */
        this.updateNodeAttrs = (node, attrs) => __awaiter(this, void 0, void 0, function* () {
            if (node instanceof X6Node) {
                node.setAttrs(attrs);
            }
            else {
                const x6Node = yield this.getNodeById(node);
                x6Node.setAttrs(attrs);
            }
        });
        /** 更新连线样式 */
        this.updateEdgeAttrs = (edge, attrs) => __awaiter(this, void 0, void 0, function* () {
            if (edge instanceof X6Edge) {
                edge.setAttrs(attrs);
            }
            else {
                const x6Edge = yield this.getEdgeById(edge);
                x6Edge.setAttrs(attrs);
            }
        });
        /** 平移画布 */
        this.translateGraph = (tx, ty) => __awaiter(this, void 0, void 0, function* () {
            const graph = yield this.graphProvider.getGraphInstance();
            const currentTranslate = graph.translate();
            graph.translate(currentTranslate.tx + tx, currentTranslate.ty + ty);
        });
    }
    /** 启动app */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startContributions();
            this.registerEventListeners();
        });
    }
    /** 暴露命令的执行接口 */
    executeCommand(commandId, cmdArgs, hook = []) {
        return this.commandService.executeCommand(commandId, cmdArgs, hook);
    }
    /** 暴露命令的批量执行接口 */
    executeCommandPipeline(cmdOptions) {
        return this.commandService.executeCommandPipeline(cmdOptions);
    }
    /**
     * Register global event listeners.
     */
    registerEventListeners() {
        /** 触发app的卸载逻辑 */
        window.addEventListener('unload', () => {
            this.stopContributions();
        });
    }
    /**
     * Initialize and start the frontend application contributions.
     */
    startContributions() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.contributions.getContributions());
            for (const contribution of this.contributions.getContributions()) {
                if (contribution.onStart) {
                    try {
                        yield this.measure(`${contribution.constructor.name}.onStart`, () => contribution.onStart(this));
                    }
                    catch (error) {
                        console.error('Could not start contribution', error);
                    }
                }
            }
        });
    }
    /**
     * Stop the frontend application contributions. This is called when the window is unloaded.
     */
    stopContributions() {
        console.info('>>> Stopping frontend contributions...');
        for (const contribution of this.contributions.getContributions()) {
            if (contribution.onStop) {
                try {
                    contribution.onStop(this);
                }
                catch (error) {
                    console.error('Could not stop contribution', error);
                }
            }
        }
        console.info('<<< All frontend contributions have been stopped.');
    }
    measure(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            const startMark = `${name}-start`;
            const endMark = `${name}-end`;
            performance.mark(startMark);
            const result = yield fn();
            performance.mark(endMark);
            performance.measure(name, startMark, endMark);
            for (const item of performance.getEntriesByName(name)) {
                const contribution = `Frontend ${item.name}`;
                if (item.duration > TIMER_WARNING_THRESHOLD) {
                    console.warn(`${contribution} is slow, took: ${item.duration.toFixed(1)} ms`);
                }
                else {
                    console.debug(`${contribution} took: ${item.duration.toFixed(1)} ms`);
                }
            }
            performance.clearMeasures(name);
            return result;
        });
    }
};
__decorate([
    contrib(IFrontendApplicationContribution),
    __metadata("design:type", Object)
], FrontendApplication.prototype, "contributions", void 0);
__decorate([
    inject(IGraphProvider),
    __metadata("design:type", Object)
], FrontendApplication.prototype, "graphProvider", void 0);
__decorate([
    inject(IGraphCommandService),
    __metadata("design:type", Object)
], FrontendApplication.prototype, "commandService", void 0);
__decorate([
    inject(IModelService),
    __metadata("design:type", Object)
], FrontendApplication.prototype, "modelService", void 0);
FrontendApplication = __decorate([
    singleton()
], FrontendApplication);
export { FrontendApplication };
//# sourceMappingURL=application.js.map