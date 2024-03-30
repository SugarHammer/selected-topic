import type { Syringe } from 'mana-syringe';
import type { IGraphCommand } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import { NsAddGroup } from './group-add';
import { NsDelGroup } from './group-del';
import { NsInitGroup } from './group-init';
import { NsCollapseGroup } from './group-toggle-collapse';
import type { IHooks } from '../../hooks/interface';
import type { Simplify } from '../../common/types';
/** 注册Command Handler Class */
export declare const registerGroupCommand: (register: Syringe.Register) => void;
/** app onStart 时, 注册 Command Hooks */
export declare const hookhubList: {
    command: IGraphCommand;
    hookKey: string;
    createHook?: () => HookHub;
}[];
/** Command hook类型*/
export interface ICmdHooks extends NsDelGroup.ICmdHooks, NsAddGroup.ICmdHooks, NsInitGroup.ICmdHooks, NsCollapseGroup.ICmdHooks, IHooks {
}
/** Command 参数类型*/
export declare namespace NsGroupCmd {
    namespace AddGroup {
        type IArgs = Simplify<NsAddGroup.IArgs>;
        type IResult = Simplify<NsAddGroup.IResult>;
    }
    namespace DelGroup {
        type IArgs = Simplify<NsDelGroup.IArgs>;
        type IResult = Simplify<NsDelGroup.IResult>;
    }
    namespace InitGroup {
        type IArgs = Simplify<NsInitGroup.IArgs>;
        type IResult = Simplify<NsInitGroup.IResult>;
    }
    namespace CollapseGroup {
        type IArgs = Simplify<NsCollapseGroup.IArgs>;
        type IResult = Simplify<NsCollapseGroup.IResult>;
    }
}
