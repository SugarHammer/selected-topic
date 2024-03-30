/// <reference types="react" />
import type { IModelService, IModuleConfig, RxModel, IMenuOptions, DisposableCollection } from '@antv/xflow-core';
import type { MODELS } from '@antv/xflow-core';
import type { IMenuRenderProps } from './interface';
export declare namespace NsContextMenu {
    const CONFIG_TYPE = "ContextMenuConfig";
    interface IMenuModelService {
        (data: MODELS.CONTEXTMENU_TARGET.IState, model: RxModel<IMenuOptions>, modelService: IModelService, toDispose: DisposableCollection): Promise<void>;
    }
    interface ICustomRender {
        (data: MODELS.CONTEXTMENU_TARGET.IState, modelService: IModelService): Promise<React.FC<IMenuRenderProps>>;
    }
    interface IContextMenuData extends MODELS.CONTEXTMENU_TARGET.IState {
        targetData: any;
    }
    interface IConfig {
        CONFIG_TYPE: string;
        menuModelService?: IMenuModelService;
        menuCustomRender?: ICustomRender;
    }
}
export declare class ContextMenuConfig implements IModuleConfig {
    /** config type */
    readonly CONFIG_TYPE = "ContextMenuConfig";
    /** menu model service */
    private menuModelService;
    /** menu menuRender */
    private menuCustomRender;
    /** instance id */
    readonly moduleId: string;
    /** uuid */
    constructor(moduleId?: string);
    /** 设置组件的props */
    setMenuModelService: (service: NsContextMenu.IMenuModelService) => void;
    /** 设置组件的props */
    setCustomMenuRender: (service: NsContextMenu.ICustomRender) => void;
    /** 获取Props */
    getConfig: () => Promise<{
        CONFIG_TYPE: string;
        menuCustomRender: NsContextMenu.ICustomRender;
        menuModelService: NsContextMenu.IMenuModelService;
    }>;
    /** dispose */
    dispose(): void;
}
