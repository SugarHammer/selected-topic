import type { Syringe } from 'mana-syringe';
import type { IGraphCommand } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
/** commands */
import { NsAddEdge } from './edge-add';
import { NsDelEdge } from './edge-del';
import { NsUpdateEdge } from './edge-update';
import { NsHighlightEdge } from './edge-highlight';
import { NsFrontEdge } from './edge-front';
import { NsBackEdge } from './edge-back';
import type { Simplify } from '../../common/types';
/** 注册Command Handler Class */
export declare const registerEdgeCommand: (register: Syringe.Register) => void;
/** app onStart 时, 注册 Command Hooks */
export declare const hookhubList: {
    hookKey: string;
    command: IGraphCommand;
    createHook?: () => HookHub;
}[];
/** 扩展 Command Hooks 类型*/
export interface ICmdHooks extends NsAddEdge.ICmdHooks, NsDelEdge.ICmdHooks, NsUpdateEdge.ICmdHooks, NsHighlightEdge.ICmdHooks, NsFrontEdge.ICmdHooks, NsBackEdge.ICmdHooks, IHooks {
}
/** Command 参数类型*/
export declare namespace NsEdgeCmd {
    namespace AddEdge {
        type IArgs = Simplify<NsAddEdge.IArgs>;
        type IResult = Simplify<NsAddEdge.IResult>;
    }
    namespace DelEdge {
        type IArgs = Simplify<NsDelEdge.IArgs>;
        type IResult = Simplify<NsDelEdge.IResult>;
    }
    namespace UpdateEdge {
        type IArgs = Simplify<NsUpdateEdge.IArgs>;
        type IResult = Simplify<NsUpdateEdge.IResult>;
    }
    namespace HighlightEdge {
        type IArgs = Simplify<NsHighlightEdge.IArgs>;
        type IResult = Simplify<NsHighlightEdge.IResult>;
    }
    namespace FrontEdge {
        type IArgs = Simplify<NsFrontEdge.IArgs>;
        type IResult = Simplify<NsFrontEdge.IResult>;
    }
    namespace BackEdge {
        type IArgs = Simplify<NsBackEdge.IArgs>;
        type IResult = Simplify<NsBackEdge.IResult>;
    }
}
