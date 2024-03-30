import { __awaiter, __decorate, __metadata } from "tslib";
import { inject, singleton, contrib, Contribution } from 'mana-syringe';
import { DisposableCollection, Disposable } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IKeyBindingOptionProvider, IKeyBindingService, IKeyBindingContribution } from './interface';
import { IGraphCommandService } from '../command/interface';
import { IModelService } from '../model-service/interface';
let KeyBindingRegistry = class KeyBindingRegistry {
    constructor() {
        /** disposables */
        this.toDispose = new DisposableCollection();
        /** disposables */
        this.keyBindingMap = new Map();
        /** disposables */
        this.enabledKeyBindingMap = new Map();
        /** 注册用户定义在config中的keybinding */
        this.registerExternalKeybindings = () => __awaiter(this, void 0, void 0, function* () {
            const { registerKeybindingFunc } = yield this.optionProvider.getOption();
            return registerKeybindingFunc(this);
        });
        /** 注册可Dispose的Keybinding */
        this.registerKeybinding = (keybindings = []) => {
            const toDispose = new DisposableCollection();
            keybindings.forEach(keybinding => {
                /** 注册 Keybinding config */
                this.keyBindingMap.set(keybinding.id, keybinding);
                /** enable Keybinding */
                this.enableKeyBindings(keybinding.id).then(d => {
                    toDispose.push(Disposable.create(() => {
                        d.dispose();
                        this.keyBindingMap.delete(keybinding.id);
                    }));
                });
            });
            this.toDispose.push(toDispose);
            return toDispose;
        };
        /**
         * 启用keybinding, 用于触发command
         * @param id contextId
         */
        this.enableKeyBindings = (keybindingId) => __awaiter(this, void 0, void 0, function* () {
            /** 清理同样的键盘事件 */
            this.disableKeyBindings([keybindingId]);
            const keybinding = this.keyBindingMap.get(keybindingId);
            const graph = yield this.getX6Graph();
            /**
             * x6文档：https://x6.antv.vision/zh/docs/api/graph/keyboard
             * x6源码：packages/x6/src/graph/keyboard.ts
             */
            const handler = this.runCommand(keybinding);
            graph.bindKey(keybinding.keybinding, handler);
            /** 注册disposable */
            const toDispose = Disposable.create(() => {
                graph.unbindKey(keybinding.keybinding);
                this.enabledKeyBindingMap.delete(keybinding.id);
            });
            /** 注册disposable */
            this.enabledKeyBindingMap.set(keybinding.id, toDispose);
            return toDispose;
        });
        /**
         * 禁用keybinding
         */
        this.disableKeyBindings = (ids) => {
            ids.forEach(id => {
                const disposable = this.enabledKeyBindingMap.get(id);
                if (disposable) {
                    disposable.dispose();
                }
            });
        };
        /**
         * 执行command
         */
        this.runCommand = (keybinding) => (e) => __awaiter(this, void 0, void 0, function* () {
            yield keybinding.callback(keybinding, this.modelService, this.commandService, e);
        });
        /**
         * 获取画布实例
         */
        this.getX6Graph = () => __awaiter(this, void 0, void 0, function* () {
            const graphInstance = yield this.graphProvider.getGraphInstance();
            return graphInstance;
        });
    }
    /**
     *  app启动时, 注册keybinding的扩展
     */
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribution of contributions) {
            contribution.registerKeybinding(this);
        }
        this.registerExternalKeybindings();
    }
    /**
     * app停止的逻辑
     */
    onStop() {
        this.toDispose.dispose();
    }
};
__decorate([
    inject(IKeyBindingOptionProvider),
    __metadata("design:type", Object)
], KeyBindingRegistry.prototype, "optionProvider", void 0);
__decorate([
    inject(IGraphCommandService),
    __metadata("design:type", Object)
], KeyBindingRegistry.prototype, "commandService", void 0);
__decorate([
    inject(IModelService),
    __metadata("design:type", Object)
], KeyBindingRegistry.prototype, "modelService", void 0);
__decorate([
    contrib(IKeyBindingContribution),
    __metadata("design:type", Object)
], KeyBindingRegistry.prototype, "contributionProvider", void 0);
__decorate([
    inject(IGraphProvider),
    __metadata("design:type", Object)
], KeyBindingRegistry.prototype, "graphProvider", void 0);
KeyBindingRegistry = __decorate([
    singleton({ contrib: [IFrontendApplicationContribution, IKeyBindingService] })
], KeyBindingRegistry);
export { KeyBindingRegistry };
//# sourceMappingURL=keybinding-registry.js.map