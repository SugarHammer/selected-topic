import type { IGraphCommandService, IModelService } from '@antv/xflow-core';
import type { IProps, ISchema, TargetType, TargetData } from './interface';
import type { Cell } from '@antv/x6';
export declare namespace NsJsonSchemaFormModel {
    const id = "XFLOW_JSON_SCHEMA_FORM";
    interface IState {
        loading: boolean;
        schema: ISchema;
        targetType: TargetType;
        targetData: TargetData;
        targetCell: Cell | null;
    }
    const useModel: (model: IModelService) => Promise<import("@antv/xflow-core").NsModel.IModel<IState>>;
}
/** 方便其他组件执行Command改变Panel内部状态 */
export declare const executeJsonSchemaFormCommand: (cmds: IGraphCommandService, updateModel: (state: NsJsonSchemaFormModel.IState) => Promise<void>) => void;
export declare const useJsonSchemaFormModel: (props: IProps) => {
    commandService: IGraphCommandService;
    modelService: IModelService;
    state: NsJsonSchemaFormModel.IState;
    setState: import("@antv/xflow-core").NsModel.ISetValue<NsJsonSchemaFormModel.IState>;
    model: import("@antv/xflow-core").RxModel<NsJsonSchemaFormModel.IState>;
    isModelReady: boolean;
};
