import type { Graph } from '@antv/x6';
import type { IModelService } from '@antv/xflow-core';
import type { ICmdHooks } from '@antv/xflow-core';
import { IHookContribution } from '@antv/xflow-core';
import { IGraphProvider } from '@antv/xflow-core';
import { DisposableCollection, IModelContribution, Disposable } from '@antv/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class NodePortTooltipContribution implements IHookContribution<ICmdHooks>, IModelContribution {
    toDispose: DisposableCollection;
    protected readonly graphProvider: IGraphProvider;
    /** 获取画布实例 */
    getGraphInstance: () => Promise<{
        graph: Graph;
        config: import("@antv/xflow-core").IGraphConfig;
    }>;
    /** 获取GraphOptions */
    getPortRenderConfig: () => Graph.Options;
    registerHookHub: () => Promise<Disposable>;
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
    registerModel(registry: IModelService): void;
}
