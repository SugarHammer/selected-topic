"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRegistry = void 0;
var tslib_1 = require("tslib");
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var rx_model_1 = require("../common/rx-model");
var deferred_1 = require("../common/deferred");
var graph_provider_1 = require("../xflow-main/graph/graph-provider");
var interface_2 = require("./interface");
var mana_syringe_1 = require("mana-syringe");
var ModelRegistry = /** @class */ (function () {
    function ModelRegistry() {
        var _this = this;
        /** disposables */
        this.toDispose = new disposable_1.DisposableCollection();
        /** Deferred Model Map */
        this.deferredModelMap = new Map();
        /**
         * 注册model
         * @param options IModelOptions<T>
         */
        this.registerModel = function (options) {
            var id = options.id, getInitialValue = options.getInitialValue, modelFactory = options.modelFactory;
            var toDispose = new disposable_1.DisposableCollection();
            var defer = _this.ensureModel(id);
            if (defer.isResolved) {
                console.error(options, 'model has been registerd');
                return;
            }
            var initialValue = getInitialValue ? getInitialValue() : rx_model_1.NsModel.EMPTY_VALUE;
            var model = modelFactory
                ? modelFactory()
                : new rx_model_1.RxModel(initialValue);
            if (rx_model_1.NsModel.isValidValue(initialValue)) {
                defer.resolve(model);
            }
            if (options.watchChange) {
                /** 绑定watch事件 */
                options.watchChange(model, _this).then(function (d) {
                    /** createModel 后 resolve */
                    if (!defer.isResolved) {
                        defer.resolve(model);
                    }
                    _this.toDispose.pushAll([d, toDispose]);
                    toDispose.push(d);
                });
            }
            return toDispose;
        };
        /**
         * 查找 model
         * @param token: Token<T>
         */
        this.findDeferredModel = function (token) {
            return _this.deferredModelMap.get(token);
        };
        /**
         *  消费Model: await model resolve
         * @param token: Token<T>
         */
        this.awaitModel = function (token) {
            var defer = _this.ensureModel(token);
            return defer.promise;
        };
        /**
         * 注册 定义在IModelOptionProvider中的Model
         */
        this.registerRuntimeModel = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var modelRegisterFunc, graphInstance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelOptionProvider.getOption()];
                    case 1:
                        modelRegisterFunc = (_a.sent()).modelRegisterFunc;
                        return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 2:
                        graphInstance = _a.sent();
                        if (modelRegisterFunc) {
                            modelRegisterFunc(this, graphInstance);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * 确保调用时有可用的Model
         * @param id ModelId
         */
        this.ensureModel = function (token) {
            var existDeferred = _this.deferredModelMap.get(token);
            if (existDeferred) {
                return existDeferred;
            }
            /** 注册ModelDeferred */
            var newDeferred = new deferred_1.Deferred();
            _this.deferredModelMap.set(token, newDeferred);
            _this.toDispose.push(disposable_1.Disposable.create(function () { return _this.deferredModelMap.delete(token); }));
            return newDeferred;
        };
    }
    /** app启动时，收集Model扩展点的注册项 */
    ModelRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        for (var _i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
            var contribution = contributions_1[_i];
            contribution.registerModel(this);
        }
        this.registerRuntimeModel();
    };
    /** app停止的逻辑 */
    ModelRegistry.prototype.onStop = function () {
        this.toDispose.dispose();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IModelContribution),
        tslib_1.__metadata("design:type", Object)
    ], ModelRegistry.prototype, "contributionProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_2.IModelOptionProvider),
        tslib_1.__metadata("design:type", Object)
    ], ModelRegistry.prototype, "modelOptionProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(graph_provider_1.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], ModelRegistry.prototype, "graphProvider", void 0);
    ModelRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IFrontendApplicationContribution, interface_2.IModelService] })
    ], ModelRegistry);
    return ModelRegistry;
}());
exports.ModelRegistry = ModelRegistry;
//# sourceMappingURL=model-registry.js.map