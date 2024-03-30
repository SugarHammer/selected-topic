import type { ICmdHooks } from '@antv/xflow-core';
import { DisposableCollection, Disposable } from '@antv/xflow-core';
import { IHookContribution } from '@antv/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class FlowHooksContribution implements IHookContribution<ICmdHooks> {
    toDispose: DisposableCollection;
    registerHookHub: () => Promise<Disposable>;
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
}
