import type { HookHub } from '@antv/xflow-hook';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
import type { NsModel } from '../../common/rx-model';
import type { IModelService } from '../../model-service';
declare type ICommand = ICommandHandler<NsUpdateModelCommand.IArgs, NsUpdateModelCommand.IResult, NsUpdateModelCommand.ICmdHooks>;
export declare namespace NsUpdateModelCommand {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "updateModel";
    /** hook 参数类型 */
    interface IArgs<T = any> extends IArgsBase {
        getModel: (modelService: IModelService) => Promise<NsModel.IModel<T>>;
        updateModel: ISetValue<T>;
    }
    /** hook handler 返回类型 */
    interface IResult<T = any> {
        model: NsModel.IModel<T>;
        /** X6的Cell */
        value: T;
    }
    /** add node api service 类型 */
    interface ISetValue<T> {
        (value: T): Promise<void>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        updateModel: HookHub<IArgs, IResult>;
    }
}
export declare class UpdateModelCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export declare const execCmd: () => void;
export {};
