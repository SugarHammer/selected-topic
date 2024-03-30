import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsGraphZoom.IArgs, NsGraphZoom.IResult, NsGraphZoom.ICmdHooks>;
export declare namespace NsGraphZoom {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** zoom options */
    const MAX_SCALE = 1.5;
    const MIN_SCALE = 0.05;
    /** default zoom options */
    const defaultZoomOptions: NsGraphZoom.IArgs['zoomOptions'];
    /** hookName */
    const hookKey = "graphZoom";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 缩放因子 */
        factor: number | 'fit' | 'real';
        /** 缩放配置项 */
        zoomOptions?: NsGraph.ZoomOptions;
        /** 自适应Padding参数(边距) */
        zoomFitPadding?: number;
    }
    /** hook handler 返回类型 */
    interface IResult {
        factor: number | 'fit' | 'real';
        zoomOptions: NsGraph.ZoomOptions;
        zoomFitPadding: number;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphZoom: HookHub<IArgs, IResult>;
    }
}
export declare class GraphZoomCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphZoom.IArgs, NsGraphZoom.IResult, NsGraphZoom.ICmdHooks>;
    init(): void;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    /** isUndoable */
    isUndoable(): boolean;
}
export {};
