/// <reference types="lodash" />
import 'reflect-metadata';
import { Contribution } from 'mana-syringe';
import { DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import type { NsModel } from '../common/rx-model';
import { RxModel } from '../common/rx-model';
import { IGraphCommandService } from '../command';
import { IModelService } from '../model-service';
import type { IToolbarItemOptions, IToolbarOptions, IToolbarGroupOptions, IRegisterToolbarItemFunction } from './interface';
import { IToolbarContribution } from './interface';
/**
 * Main, shared registry for toolbar items.
 */
export declare class ToolbarRegistry implements IFrontendApplicationContribution {
    /** disposables */
    protected readonly toDispose: DisposableCollection;
    /** 储存所有toolbar items */
    protected toolbarItems: Map<string, IToolbarItemOptions>;
    /** CommandRegistry */
    protected readonly commandService: IGraphCommandService;
    /** IModelService */
    protected readonly modelService: IModelService;
    /** ToolbarItems的扩展 */
    protected readonly contributionProvider: Contribution.Provider<IToolbarContribution>;
    /** 注册ToolbarRegistry的onChange的事件 */
    protected readonly onDidChangeEvent: RxModel<null>;
    /** 通过ToolbarRegistry.onDidChange监听ToolbarRegistry items的变化  */
    readonly onDidChange: NsModel.IWatch<void>;
    /** debounce in order to avoid to fire more than once in the same tick */
    protected fireOnDidChange: import("lodash").DebouncedFunc<() => void>;
    /** App启动时，收集Toolbar扩展点的注册项 */
    onStart(): void;
    /**
     * App 销毁时调用
     * dispose toolbarProvider
     */
    onStop(): void;
    /**
     * 注册ToolbarItem
     * item所需的command需要提前在command registry注册
     * @param config IToolbarItem
     */
    registerItem(config: IToolbarItemOptions): DisposableCollection;
    /**
     * 批量注册可单独dispose的扩展项目
     * @param externalRegisterFn IRegisterMenuFunction
     */
    registerDisposableToolbar: (externalRegisterFn: IRegisterToolbarItemFunction) => DisposableCollection;
    /**
     * 获取 ToolbarModel
     * @param toolbarConfig IToolbarOptions
     */
    getToolbarModel: (toolbarConfig: IToolbarOptions) => RxModel<{
        layout: import("./interface").IToolbarLayout;
        mainGroups: {
            items: IToolbarItemOptions[];
            name?: string;
            className?: string;
        }[];
        extraGroups: {
            items: IToolbarItemOptions[];
            name?: string;
            className?: string;
        }[];
    }>;
    /**
     * 创建 ToolbarModel
     * @param groups IToolbarGroupOptions[]
     */
    protected createToolbarGroupModel: (groups: IToolbarGroupOptions[]) => {
        items: IToolbarItemOptions[];
        name?: string;
        className?: string;
    }[];
    /**
     * 创建 ToolbarModel
     * @param option IToolbarItem
     */
    protected createToolbarModel(option: Partial<IToolbarItemOptions>): IToolbarItemOptions;
}
