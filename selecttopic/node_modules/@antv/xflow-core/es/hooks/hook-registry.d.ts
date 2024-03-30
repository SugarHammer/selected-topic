import type { Disposable } from '../common/disposable';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from './interface';
import { Contribution } from 'mana-syringe';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { IHookService, IHookContribution } from './interface';
export declare class HookRegistry<T extends IHooks> implements IFrontendApplicationContribution, IHookService<T> {
    /** disposables */
    private toDispose;
    /** hooks */
    hooks: T;
    constructor();
    /** hooks */
    hookProvider: () => T;
    /** 注册hook插件 */
    registerHook: (fn: (hooks: T) => Disposable) => Disposable;
    /** 注册hook  */
    registerHookHub: (hookName: string, hook: HookHub) => {
        dispose: () => void;
    };
    /** hook扩展 */
    protected readonly contributionProvider: Contribution.Provider<IHookContribution<T>>;
    /** app启动时，收集hook扩展点的注册项 */
    onStart: () => Promise<void>;
    /** app的停止逻辑 */
    onStop(): void;
}
