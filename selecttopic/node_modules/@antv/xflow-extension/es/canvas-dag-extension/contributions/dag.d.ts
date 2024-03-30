import { DisposableCollection, Disposable } from '@antv/xflow-core';
import type { IModelService, IHookService, ICmdHooks, IGraphCommandService } from '@antv/xflow-core';
import { IGraphCommandFactory, IHookContribution, IModelContribution, IGraphCommandContribution } from '@antv/xflow-core';
import type { Edge, Graph } from '@antv/x6';
import type { IProps } from '../interface';
import { IComponentConfig } from '../interface';
export declare namespace NsAddEdgeEvent {
    const EVENT_NAME = "ADD_EDGE_CMD_EVENT";
    interface IArgs {
        targetPortId: string;
        sourcePortId: string;
        source: string;
        target: string;
        edge: Edge;
    }
}
export declare namespace DAG_DEFAULT_CONIFG {
    const router: {
        name: string;
    };
    const connector: {
        name: string;
        args: {
            radius: number;
        };
    };
}
export declare const ANT_PREFIX = "ant";
export declare const getDagOptions: (props: IProps) => Graph.Options;
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
export declare class DagHooksContribution implements IHookContribution<ICmdHooks>, IGraphCommandContribution, IModelContribution {
    /** IGraphCommandFactory */
    commandFactory: IGraphCommandFactory;
    /** propConfig */
    propConfig: IComponentConfig;
    /** 注册Command */
    registerGraphCommands: (commands: IGraphCommandService) => void;
    /** 注册Hub */
    toDispose: DisposableCollection;
    /** 注册Hook */
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
    /** 注册Hub */
    registerHookHub: (registry: IHookService) => Promise<Disposable>;
    /** 扩展Model */
    registerModel(registry: IModelService): void;
}
