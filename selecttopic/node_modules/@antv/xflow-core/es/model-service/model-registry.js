import { __awaiter, __decorate, __metadata } from "tslib";
import { DisposableCollection, Disposable } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { RxModel, NsModel } from '../common/rx-model';
import { Deferred } from '../common/deferred';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IModelOptionProvider, IModelService, IModelContribution } from './interface';
import { contrib, Contribution, singleton, inject } from 'mana-syringe';
let ModelRegistry = class ModelRegistry {
    constructor() {
        /** disposables */
        this.toDispose = new DisposableCollection();
        /** Deferred Model Map */
        this.deferredModelMap = new Map();
        /**
         * 注册model
         * @param options IModelOptions<T>
         */
        this.registerModel = (options) => {
            const { id, getInitialValue, modelFactory } = options;
            const toDispose = new DisposableCollection();
            const defer = this.ensureModel(id);
            if (defer.isResolved) {
                console.error(options, 'model has been registerd');
                return;
            }
            const initialValue = getInitialValue ? getInitialValue() : NsModel.EMPTY_VALUE;
            const model = modelFactory
                ? modelFactory()
                : new RxModel(initialValue);
            if (NsModel.isValidValue(initialValue)) {
                defer.resolve(model);
            }
            if (options.watchChange) {
                /** 绑定watch事件 */
                options.watchChange(model, this).then(d => {
                    /** createModel 后 resolve */
                    if (!defer.isResolved) {
                        defer.resolve(model);
                    }
                    this.toDispose.pushAll([d, toDispose]);
                    toDispose.push(d);
                });
            }
            return toDispose;
        };
        /**
         * 查找 model
         * @param token: Token<T>
         */
        this.findDeferredModel = (token) => {
            return this.deferredModelMap.get(token);
        };
        /**
         *  消费Model: await model resolve
         * @param token: Token<T>
         */
        this.awaitModel = (token) => {
            const defer = this.ensureModel(token);
            return defer.promise;
        };
        /**
         * 注册 定义在IModelOptionProvider中的Model
         */
        this.registerRuntimeModel = () => __awaiter(this, void 0, void 0, function* () {
            const { modelRegisterFunc } = yield this.modelOptionProvider.getOption();
            const graphInstance = yield this.graphProvider.getGraphInstance();
            if (modelRegisterFunc) {
                modelRegisterFunc(this, graphInstance);
            }
        });
        /**
         * 确保调用时有可用的Model
         * @param id ModelId
         */
        this.ensureModel = (token) => {
            const existDeferred = this.deferredModelMap.get(token);
            if (existDeferred) {
                return existDeferred;
            }
            /** 注册ModelDeferred */
            const newDeferred = new Deferred();
            this.deferredModelMap.set(token, newDeferred);
            this.toDispose.push(Disposable.create(() => this.deferredModelMap.delete(token)));
            return newDeferred;
        };
    }
    /** app启动时，收集Model扩展点的注册项 */
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribution of contributions) {
            contribution.registerModel(this);
        }
        this.registerRuntimeModel();
    }
    /** app停止的逻辑 */
    onStop() {
        this.toDispose.dispose();
    }
};
__decorate([
    contrib(IModelContribution),
    __metadata("design:type", Object)
], ModelRegistry.prototype, "contributionProvider", void 0);
__decorate([
    inject(IModelOptionProvider),
    __metadata("design:type", Object)
], ModelRegistry.prototype, "modelOptionProvider", void 0);
__decorate([
    inject(IGraphProvider),
    __metadata("design:type", Object)
], ModelRegistry.prototype, "graphProvider", void 0);
ModelRegistry = __decorate([
    singleton({ contrib: [IFrontendApplicationContribution, IModelService] })
], ModelRegistry);
export { ModelRegistry };
//# sourceMappingURL=model-registry.js.map