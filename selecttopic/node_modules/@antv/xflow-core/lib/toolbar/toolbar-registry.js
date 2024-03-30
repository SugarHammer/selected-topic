"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarRegistry = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var mana_syringe_1 = require("mana-syringe");
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var isBoolean_1 = tslib_1.__importDefault(require("lodash/isBoolean"));
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var rx_model_1 = require("../common/rx-model");
var command_1 = require("../command");
var model_service_1 = require("../model-service");
var interface_2 = require("./interface");
/**
 * Main, shared registry for toolbar items.
 */
var ToolbarRegistry = /** @class */ (function () {
    function ToolbarRegistry() {
        var _this = this;
        /** disposables */
        this.toDispose = new disposable_1.DisposableCollection();
        /** 储存所有toolbar items */
        this.toolbarItems = new Map();
        /** 注册ToolbarRegistry的onChange的事件 */
        this.onDidChangeEvent = new rx_model_1.RxModel(null);
        /** 通过ToolbarRegistry.onDidChange监听ToolbarRegistry items的变化  */
        this.onDidChange = this.onDidChangeEvent.watch;
        /** debounce in order to avoid to fire more than once in the same tick */
        this.fireOnDidChange = (0, debounce_1.default)(function () { return _this.onDidChangeEvent.setValue(undefined); }, 16);
        /**
         * 批量注册可单独dispose的扩展项目
         * @param externalRegisterFn IRegisterMenuFunction
         */
        this.registerDisposableToolbar = function (externalRegisterFn) {
            var toDispose = new disposable_1.DisposableCollection();
            var disposableRegistry = {
                registerToolbarItem: function (config) {
                    var disposable = _this.registerItem(config);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            _this.toDispose.push(toDispose);
            return toDispose;
        };
        /**
         * 获取 ToolbarModel
         * @param toolbarConfig IToolbarOptions
         */
        this.getToolbarModel = function (toolbarConfig) {
            var layout = toolbarConfig.layout, _a = toolbarConfig.mainGroups, mainGroups = _a === void 0 ? [] : _a, _b = toolbarConfig.extraGroups, extraGroups = _b === void 0 ? [] : _b;
            return new rx_model_1.RxModel({
                layout: layout,
                mainGroups: _this.createToolbarGroupModel(mainGroups),
                extraGroups: _this.createToolbarGroupModel(extraGroups),
            });
        };
        /**
         * 创建 ToolbarModel
         * @param groups IToolbarGroupOptions[]
         */
        this.createToolbarGroupModel = function (groups) {
            var groupModels = groups.map(function (group) {
                var _a = group.items, items = _a === void 0 ? [] : _a;
                return tslib_1.__assign(tslib_1.__assign({}, group), { items: items.map(function (item) { return _this.createToolbarModel({ id: item.id }); }).filter(function (i) { return !!i; }) });
            });
            return groupModels;
        };
    }
    /** App启动时，收集Toolbar扩展点的注册项 */
    ToolbarRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        for (var _i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
            var contribution = contributions_1[_i];
            contribution.registerToolbarItems(this);
        }
    };
    /**
     * App 销毁时调用
     * dispose toolbarProvider
     */
    ToolbarRegistry.prototype.onStop = function () {
        this.toDispose.dispose();
    };
    /**
     * 注册ToolbarItem
     * item所需的command需要提前在command registry注册
     * @param config IToolbarItem
     */
    ToolbarRegistry.prototype.registerItem = function (config) {
        var _this = this;
        if (this.toolbarItems.has(config.id)) {
            console.warn("ToolbarRegistry ".concat(config.id, " is duplicated, in"), config);
        }
        /** 注册 */
        this.toolbarItems.set(config.id, config);
        /** 通知更新 */
        this.fireOnDidChange();
        var toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.fireOnDidChange(); }), disposable_1.Disposable.create(function () { return _this.toolbarItems.delete(config.id); }));
        return toDispose;
    };
    /**
     * 创建 ToolbarModel
     * @param option IToolbarItem
     */
    ToolbarRegistry.prototype.createToolbarModel = function (option) {
        var item = (0, cloneDeep_1.default)(this.toolbarItems.get(option.id));
        var isEnabled = (0, isBoolean_1.default)(item.isEnabled) ? item.isEnabled : true;
        var isVisible = (0, isBoolean_1.default)(item.isVisible) ? item.isVisible : true;
        var toolbarItem = tslib_1.__assign(tslib_1.__assign({}, item), { isEnabled: isEnabled, isVisible: isVisible, iconName: item.iconName, text: item.text });
        return toolbarItem;
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(command_1.IGraphCommandService),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarRegistry.prototype, "commandService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(model_service_1.IModelService),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarRegistry.prototype, "modelService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IToolbarContribution),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarRegistry.prototype, "contributionProvider", void 0);
    ToolbarRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IFrontendApplicationContribution, interface_2.IToolbarService] })
    ], ToolbarRegistry);
    return ToolbarRegistry;
}());
exports.ToolbarRegistry = ToolbarRegistry;
//# sourceMappingURL=toolbar-registry.js.map