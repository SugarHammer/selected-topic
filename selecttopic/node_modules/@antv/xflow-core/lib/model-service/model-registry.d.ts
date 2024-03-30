import { DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { RxModel, NsModel } from '../common/rx-model';
import { Deferred } from '../common/deferred';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IModelService, IModelContribution } from './interface';
import { Contribution } from 'mana-syringe';
import type { IModelOptions } from './interface';
import type { Token } from '../common/types';
export declare class ModelRegistry implements IFrontendApplicationContribution, IModelService {
    /** disposables */
    private toDispose;
    /** Deferred Model Map */
    private deferredModelMap;
    /** Model 扩展点 */
    protected readonly contributionProvider: Contribution.Provider<IModelContribution>;
    /** app启动时，收集Model扩展点的注册项 */
    onStart(): void;
    /** app停止的逻辑 */
    onStop(): void;
    /**
     * 注册model
     * @param options IModelOptions<T>
     */
    registerModel: <T>(options: IModelOptions<T>) => DisposableCollection;
    /**
     * 查找 model
     * @param token: Token<T>
     */
    findDeferredModel: <T = any>(token: Token<T>) => Deferred<NsModel.IModel<any>>;
    /**
     *  消费Model: await model resolve
     * @param token: Token<T>
     */
    awaitModel: <T = any>(token: Token<T>) => Promise<RxModel<T>>;
    /** model service 配置 */
    private modelOptionProvider;
    /**
     * 注册 定义在IModelOptionProvider中的Model
     */
    registerRuntimeModel: () => Promise<void>;
    /**
     * 确保调用时有可用的Model
     * @param id ModelId
     */
    private ensureModel;
    /** 获取Graph */
    protected readonly graphProvider: IGraphProvider;
}
