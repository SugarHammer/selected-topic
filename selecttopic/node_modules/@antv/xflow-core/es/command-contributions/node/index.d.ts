import type { Syringe } from 'mana-syringe';
import type { IGraphCommand } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { Simplify } from '../../common/types';
/** commands */
import { NsAddNode } from './node-add';
import { NsDelNode } from './node-del';
import { NsSelectNode } from './node-select';
import { NsMoveNode } from './node-move';
import { NsUpdateNode } from './node-update';
import { NsCenterNode } from './node-center';
import { NsFrontNode } from './node-front';
import { NsBackNode } from './node-back';
import { NsHighlightNode } from './node-highlight';
import { NsUpdateNodePort } from './node-update-port';
/** 注册Command Handler Class */
export declare const registerNodeCommand: (register: Syringe.Register) => void;
/** app onStart 时, 注册 Command Hooks */
export declare const hookhubList: {
    command: IGraphCommand;
    hookKey: string;
    createHook?: () => HookHub;
}[];
/** 扩展 Command Hooks 类型*/
export interface ICmdHooks extends NsAddNode.ICmdHooks, NsDelNode.ICmdHooks, NsSelectNode.ICmdHooks, NsMoveNode.ICmdHooks, NsUpdateNode.ICmdHooks, NsCenterNode.ICmdHooks, NsFrontNode.ICmdHooks, NsBackNode.ICmdHooks, NsHighlightNode.ICmdHooks, NsUpdateNodePort.ICmdHooks, IHooks {
}
/** Command 参数类型*/
export declare namespace NsNodeCmd {
    namespace AddNode {
        type IArgs = Simplify<NsAddNode.IArgs>;
        type IResult = Simplify<NsAddNode.IResult>;
    }
    namespace DelNode {
        type IArgs = Simplify<NsDelNode.IArgs>;
        type IResult = Simplify<NsDelNode.IResult>;
    }
    namespace SelectNode {
        type IArgs = Simplify<NsSelectNode.IArgs>;
        type IResult = Simplify<NsSelectNode.IResult>;
    }
    namespace MoveNode {
        type IArgs = Simplify<NsMoveNode.IArgs>;
        type IResult = Simplify<NsMoveNode.IResult>;
    }
    namespace UpdateNodePort {
        type IArgs = Simplify<NsUpdateNodePort.IArgs>;
        type IResult = Simplify<NsUpdateNodePort.IResult>;
    }
    namespace UpdateNode {
        type IArgs = Simplify<NsUpdateNode.IArgs>;
        type IResult = Simplify<NsUpdateNode.IResult>;
    }
    namespace CenterNode {
        type IArgs = Simplify<NsCenterNode.IArgs>;
        type IResult = Simplify<NsCenterNode.IResult>;
    }
    namespace FrontNode {
        type IArgs = Simplify<NsFrontNode.IArgs>;
        type IResult = Simplify<NsFrontNode.IResult>;
    }
    namespace BackNode {
        type IArgs = Simplify<NsBackNode.IArgs>;
        type IResult = Simplify<NsBackNode.IResult>;
    }
    namespace HighlightNode {
        type IArgs = Simplify<NsHighlightNode.IArgs>;
        type IResult = Simplify<NsHighlightNode.IResult>;
    }
}
