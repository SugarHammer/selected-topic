import { __decorate, __metadata } from "tslib";
import 'reflect-metadata';
import { singleton, inject, contrib, Contribution } from 'mana-syringe';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import isBoolean from 'lodash/isBoolean';
import { Disposable, DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { RxModel } from '../common/rx-model';
import { IGraphCommandService } from '../command';
import { IModelService } from '../model-service';
import { IToolbarService, IToolbarContribution } from './interface';
/**
 * Main, shared registry for toolbar items.
 */
let ToolbarRegistry = class ToolbarRegistry {
    constructor() {
        /** disposables */
        this.toDispose = new DisposableCollection();
        /** 储存所有toolbar items */
        this.toolbarItems = new Map();
        /** 注册ToolbarRegistry的onChange的事件 */
        this.onDidChangeEvent = new RxModel(null);
        /** 通过ToolbarRegistry.onDidChange监听ToolbarRegistry items的变化  */
        this.onDidChange = this.onDidChangeEvent.watch;
        /** debounce in order to avoid to fire more than once in the same tick */
        this.fireOnDidChange = debounce(() => this.onDidChangeEvent.setValue(undefined), 16);
        /**
         * 批量注册可单独dispose的扩展项目
         * @param externalRegisterFn IRegisterMenuFunction
         */
        this.registerDisposableToolbar = (externalRegisterFn) => {
            const toDispose = new DisposableCollection();
            const disposableRegistry = {
                registerToolbarItem: config => {
                    const disposable = this.registerItem(config);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            this.toDispose.push(toDispose);
            return toDispose;
        };
        /**
         * 获取 ToolbarModel
         * @param toolbarConfig IToolbarOptions
         */
        this.getToolbarModel = (toolbarConfig) => {
            const { layout, mainGroups = [], extraGroups = [] } = toolbarConfig;
            return new RxModel({
                layout,
                mainGroups: this.createToolbarGroupModel(mainGroups),
                extraGroups: this.createToolbarGroupModel(extraGroups),
            });
        };
        /**
         * 创建 ToolbarModel
         * @param groups IToolbarGroupOptions[]
         */
        this.createToolbarGroupModel = (groups) => {
            const groupModels = groups.map(group => {
                const { items = [] } = group;
                return Object.assign(Object.assign({}, group), { items: items.map(item => this.createToolbarModel({ id: item.id })).filter(i => !!i) });
            });
            return groupModels;
        };
    }
    /** App启动时，收集Toolbar扩展点的注册项 */
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribution of contributions) {
            contribution.registerToolbarItems(this);
        }
    }
    /**
     * App 销毁时调用
     * dispose toolbarProvider
     */
    onStop() {
        this.toDispose.dispose();
    }
    /**
     * 注册ToolbarItem
     * item所需的command需要提前在command registry注册
     * @param config IToolbarItem
     */
    registerItem(config) {
        if (this.toolbarItems.has(config.id)) {
            console.warn(`ToolbarRegistry ${config.id} is duplicated, in`, config);
        }
        /** 注册 */
        this.toolbarItems.set(config.id, config);
        /** 通知更新 */
        this.fireOnDidChange();
        const toDispose = new DisposableCollection(Disposable.create(() => this.fireOnDidChange()), Disposable.create(() => this.toolbarItems.delete(config.id)));
        return toDispose;
    }
    /**
     * 创建 ToolbarModel
     * @param option IToolbarItem
     */
    createToolbarModel(option) {
        const item = cloneDeep(this.toolbarItems.get(option.id));
        const isEnabled = isBoolean(item.isEnabled) ? item.isEnabled : true;
        const isVisible = isBoolean(item.isVisible) ? item.isVisible : true;
        const toolbarItem = Object.assign(Object.assign({}, item), { isEnabled: isEnabled, isVisible: isVisible, iconName: item.iconName, text: item.text });
        return toolbarItem;
    }
};
__decorate([
    inject(IGraphCommandService),
    __metadata("design:type", Object)
], ToolbarRegistry.prototype, "commandService", void 0);
__decorate([
    inject(IModelService),
    __metadata("design:type", Object)
], ToolbarRegistry.prototype, "modelService", void 0);
__decorate([
    contrib(IToolbarContribution),
    __metadata("design:type", Object)
], ToolbarRegistry.prototype, "contributionProvider", void 0);
ToolbarRegistry = __decorate([
    singleton({ contrib: [IFrontendApplicationContribution, IToolbarService] })
], ToolbarRegistry);
export { ToolbarRegistry };
//# sourceMappingURL=toolbar-registry.js.map