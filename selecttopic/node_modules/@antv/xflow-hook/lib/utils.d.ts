import type { IHook } from './interface';
export declare namespace ErrorUtils {
    enum ErrorEnum {
        'INVALID_HOOK_BEFORE' = "INVALID_HOOK_BEFORE",
        'INVALID_HOOK_AFTER' = "INVALID_HOOK_AFTER",
        'INVALID_HOOK_ARGS_LENGTH' = "INVALID_HOOK_ARGS_LENGTH"
    }
    class HookError extends Error {
        private code;
        contexts: Record<string, any>;
        constructor(code: string, message: string | string[], ...contexts: any[]);
        toString(): string;
    }
    const HookBeforeError: () => HookError;
    const HookAfterError: () => HookError;
    const InvalidHookArguments: (hook: IHook) => HookError;
}
export declare namespace HookUtils {
    /** 处理 runtime hooks */
    const normalize: (hookConfig: IHook | IHook[], hookMap: Map<string, IHook>) => IHook[];
    /** 排序 hooks */
    const sort: (hooks: IHook[], hookMap: Map<string, IHook>) => IHook[];
}
export declare class Deferred<T> {
    isResolved: boolean;
    isRejected: boolean;
    resolve: (value: T) => void;
    reject: (err: any) => void;
    promise: Promise<T>;
    constructor();
}
