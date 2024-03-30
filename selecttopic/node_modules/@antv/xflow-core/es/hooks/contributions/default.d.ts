import { DisposableCollection, Disposable } from '../../common/disposable';
import { HookConfig } from '../config';
import type { IHookService } from '../index';
import type { IHooks } from '../interface';
import { IHookContribution } from '../interface';
export declare namespace NsGraphEventPlugin {
    const pluginId = "GraphEventPlugin";
}
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class RuntimeContribution implements IHookContribution<IHooks> {
    toDispose: DisposableCollection;
    /** 通过optionProvider获取配置 */
    hookConfig: HookConfig;
    registerHook: (hooks: any) => Promise<Disposable>;
    registerHookHub: (registry: IHookService<IHooks>) => Promise<Disposable>;
}
