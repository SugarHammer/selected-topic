import type { Syringe } from 'mana-syringe';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IGraphCommand } from '../../command/interface';
/** commands */
import { NsUpdateModelCommand } from './update-model';
/** 注册Command Handler Class */
export declare const registerModelServiceCommand: (register: Syringe.Register) => void;
/** app onStart 时, 注册 Command Hooks */
export declare const hookhubList: {
    command: IGraphCommand;
    hookKey: string;
    createHook?: () => HookHub;
}[];
/** 扩展 Command Hooks 类型*/
export interface ICmdHooks extends NsUpdateModelCommand.ICmdHooks, IHooks {
}
/** Command 参数类型*/
export declare namespace NsModelServiceCmd {
    namespace UpdateModelCommand {
        type IArgs<T> = NsUpdateModelCommand.IArgs<T>;
        type IResult<T> = NsUpdateModelCommand.IResult<T>;
    }
}
