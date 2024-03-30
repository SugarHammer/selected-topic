import { __decorate, __metadata } from "tslib";
import { singleton, contrib, Contribution } from 'mana-syringe';
import { DisposableCollection, Disposable } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { IMenuService, IMenuContribution } from './interface';
let MenuRegistry = class MenuRegistry {
    constructor() {
        /** disposables */
        this.toDispose = new DisposableCollection();
        /** menuMap */
        this.menuMap = new Map();
        /**
         * 获取 menu
         * @param menuId menuId
         */
        this.getMenu = (menuId) => {
            return this.menuMap.get(menuId);
        };
        /**
         * 注册一批可单独dispose的扩展项目
         * @param externalRegisterFn IRegisterMenuFunction
         */
        this.registerDisposableMenu = (externalRegisterFn) => {
            const toDispose = new DisposableCollection();
            const disposableRegistry = {
                registerMenu: (config) => {
                    const disposable = this.registerMenu(config);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            this.toDispose.push(toDispose);
            return toDispose;
        };
    }
    /** app启动时，收集menu扩展点的注册项 */
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribution of contributions) {
            contribution.registerMenu(this);
        }
    }
    /** app的停止逻辑 */
    onStop() {
        this.toDispose.dispose();
    }
    /**
     * 注册 menu 类型
     * @param config IMenu
     */
    registerMenu(config) {
        this.menuMap.set(config.id, config);
        return Disposable.create(() => this.menuMap.delete(config.id));
    }
};
__decorate([
    contrib(IMenuContribution),
    __metadata("design:type", Object)
], MenuRegistry.prototype, "contributionProvider", void 0);
MenuRegistry = __decorate([
    singleton({ contrib: [IFrontendApplicationContribution, IMenuService] })
], MenuRegistry);
export { MenuRegistry };
//# sourceMappingURL=menu-registry.js.map