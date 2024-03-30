import { Contribution } from 'mana-syringe';
import { DisposableCollection, Disposable } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import type { IMenuId, IMenuOptions, IRegisterMenuFunction } from './interface';
import { IMenuService, IMenuContribution } from './interface';
export declare class MenuRegistry implements IMenuService, IFrontendApplicationContribution {
    /** disposables */
    private toDispose;
    /** menuMap */
    private menuMap;
    /** menu扩展 */
    protected readonly contributionProvider: Contribution.Provider<IMenuContribution>;
    /** app启动时，收集menu扩展点的注册项 */
    onStart(): void;
    /** app的停止逻辑 */
    onStop(): void;
    /**
     * 注册 menu 类型
     * @param config IMenu
     */
    registerMenu(config: IMenuOptions): Disposable;
    /**
     * 获取 menu
     * @param menuId menuId
     */
    getMenu: (menuId: IMenuId) => IMenuOptions<any>;
    /**
     * 注册一批可单独dispose的扩展项目
     * @param externalRegisterFn IRegisterMenuFunction
     */
    registerDisposableMenu: (externalRegisterFn: IRegisterMenuFunction) => DisposableCollection;
}
