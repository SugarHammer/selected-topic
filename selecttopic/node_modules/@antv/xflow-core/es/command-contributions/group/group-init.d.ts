import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsInitGroup.IArgs, NsInitGroup.IResult, NsInitGroup.ICmdHooks>;
export declare namespace NsInitGroup {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 画布渲染数据(nodes、edges) */
        graphData: NsGraph.IGraphData;
        collapsedSize?: {
            width: number;
            height: number;
        };
    }
    /** hook handler 返回类型 */
    interface IResult {
    }
    /** hookName */
    const hookKey: "initGroup";
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        initGroup: HookHub<IArgs, IResult>;
    }
}
export declare class InitGroupCommand implements ICommand {
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
export {};
