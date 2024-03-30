import toposort from 'toposort';
export var ErrorUtils;
(function (ErrorUtils) {
    let ErrorEnum;
    (function (ErrorEnum) {
        ErrorEnum["INVALID_HOOK_BEFORE"] = "INVALID_HOOK_BEFORE";
        ErrorEnum["INVALID_HOOK_AFTER"] = "INVALID_HOOK_AFTER";
        ErrorEnum["INVALID_HOOK_ARGS_LENGTH"] = "INVALID_HOOK_ARGS_LENGTH";
    })(ErrorEnum = ErrorUtils.ErrorEnum || (ErrorUtils.ErrorEnum = {}));
    class HookError extends Error {
        constructor(code, message, ...contexts) {
            if (Array.isArray(message)) {
                message = message
                    .filter(function (line) {
                    return !!line;
                })
                    .join(' ');
            }
            super(`${code}: ${message}`);
            if (Error.captureStackTrace) {
                ;
                Error.captureStackTrace(this, HookError);
            }
            this.code = code;
            this.contexts = {};
            contexts.forEach(context => {
                if (typeof context === 'object') {
                    Object.entries(context).forEach(pair => {
                        const [key, value] = pair;
                        if (key !== 'key' && value) {
                            this.contexts[key] = JSON.parse(JSON.stringify(value));
                        }
                    });
                }
            });
        }
        toString() {
            return `${this.code}: ${this.message}`;
        }
    }
    ErrorUtils.HookError = HookError;
    const createError = (code, message, ...args) => {
        return new HookError(code, message, ...args);
    };
    ErrorUtils.HookBeforeError = () => {
        return createError(ErrorEnum.INVALID_HOOK_BEFORE, [
            'hook require a before dependency but not exist in hookmap',
        ]);
    };
    ErrorUtils.HookAfterError = () => {
        return createError(ErrorEnum.INVALID_HOOK_AFTER, [
            'hook require a after dependency but not exist in hookmap',
        ]);
    };
    ErrorUtils.InvalidHookArguments = (hook) => {
        return createError(ErrorEnum.INVALID_HOOK_ARGS_LENGTH, [
            'hook handlers must have 0 to 2 arguments',
            `but got ${hook.handler.length}`,
        ]);
    };
})(ErrorUtils || (ErrorUtils = {}));
export var HookUtils;
(function (HookUtils) {
    /** 处理 runtime hooks */
    HookUtils.normalize = (hookConfig = [], hookMap) => {
        const runtimeHook = Array.isArray(hookConfig) ? hookConfig : [hookConfig];
        const innerHooks = [];
        hookMap.forEach(val => {
            innerHooks.push(val);
        });
        return [...innerHooks, ...runtimeHook].filter(item => item && !!item.handler);
    };
    /** 排序 hooks */
    HookUtils.sort = (hooks = [], hookMap) => {
        const edges = [];
        hooks.forEach(hook => {
            if (hook.before) {
                if (!hookMap.has(hook.before)) {
                    throw ErrorUtils.HookBeforeError();
                }
                const edge = [hook, hookMap.get(hook.before)];
                edges.push(edge);
            }
            if (hook.after) {
                if (!hookMap.has(hook.after)) {
                    throw ErrorUtils.HookBeforeError();
                }
                const edge = [hookMap.get(hook.after), hook];
                edges.push(edge);
            }
        });
        const sortedHooks = toposort.array(hooks, edges);
        return sortedHooks;
    };
})(HookUtils || (HookUtils = {}));
export class Deferred {
    constructor() {
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = args => {
                this.isResolved = true;
                resolve(args);
            };
            this.reject = args => {
                this.isRejected = true;
                reject(args);
            };
        });
    }
}
//# sourceMappingURL=utils.js.map