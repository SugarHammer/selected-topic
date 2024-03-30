import { IGraphOptionProvider } from '../../xflow-main/graph/config';
import { DisposableCollection, Disposable } from '../../common/disposable';
import { IHookContribution } from '../interface';
import type { IHooks } from '../interface';
export declare namespace NsGraphEventPlugin {
    const pluginId = "base-graph-events";
}
/**
 * 内置的hook contribution
 * 处理graph config 的 evnets props
 */
export declare class GraphEventContribution implements IHookContribution<IHooks> {
    /** 通过optionProvider获取配置 */
    graphOptions: IGraphOptionProvider;
    toDispose: DisposableCollection;
    registerHookHub: () => Promise<Disposable>;
    /** 扩展Hook */
    registerHook: (hooks: IHooks) => Promise<DisposableCollection>;
}
