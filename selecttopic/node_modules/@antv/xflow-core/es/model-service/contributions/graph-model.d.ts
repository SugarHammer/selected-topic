import type { IModelService } from '../interface';
import { IModelContribution } from '../interface';
import { IGraphProvider } from '../../xflow-main/graph/graph-provider';
export declare class GraphModelContribution implements IModelContribution {
    protected readonly graphProvider: IGraphProvider;
    /** 获取画布实例 */
    getGraphInstance: () => Promise<{
        graph: import("@antv/x6").Graph;
        config: import("../..").IGraphConfig;
    }>;
    registerModel(registry: IModelService): void;
}
