import type { Disposable, IHook, IHookHub, IRuntimeHook, ScheduleOptions } from './interface';
export { ScheduleTypeEnum } from './interface';
export type { Disposable, IHook, IHookHub, IRuntimeHook, IMainHandler, ScheduleOptions, } from './interface';
export declare class HookHub<Args = any, Result = Args | null> implements IHookHub<Args, Result> {
    /** hooks */
    private hookMap;
    /** scheduleType */
    private scheduleType;
    constructor(options?: ScheduleOptions);
    /** hasRegistered */
    hasHook: (hookName: string) => boolean;
    /** getHooks */
    getHooks: (runtimeHooks?: IRuntimeHook<Args, Result>, sort?: boolean) => IHook<Args, Result>[];
    /** registerHook */
    registerHook: (hookMeta: IHook<Args, Result>) => Disposable;
    /** registerHook */
    call: (args: Args, main?: (mainArgs: Args) => Promise<Result>, runtimeHook?: IRuntimeHook<Args, Result>) => Promise<Result | undefined>;
    /** 执行hook的scheduler */
    private schedulers;
}
