import { DisposableCollection, IModelContribution, IModelService } from '@antv/xflow-core';
import { MODELS } from '@antv/xflow-core';
import { CONTEXT_MENU_MODEL } from '../interface';
import { ContextMenuConfig } from '../config';
/**
 * IModelContribution
 */
export declare class CanvasContextMenuContribution implements IModelContribution {
    /** 注册 model */
    toDispose: DisposableCollection;
    /** 注册 model */
    menuConfig: ContextMenuConfig;
    modelService: IModelService;
    /** 获取 MenuModel */
    getMenuModelValue: (contextMenuInfo: MODELS.CONTEXTMENU_TARGET.IState) => Promise<CONTEXT_MENU_MODEL.IState>;
    /** 注册 MenuModel */
    registerModel(registry: IModelService): void;
}
