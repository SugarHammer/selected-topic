import { __awaiter } from "tslib";
import { ScheduleTypeEnum } from './interface';
import { ErrorUtils, HookUtils, Deferred } from './utils';
export { ScheduleTypeEnum } from './interface';
export class HookHub {
    constructor(options) {
        /** scheduleType */
        this.scheduleType = ScheduleTypeEnum.ASYNC_SRRIES;
        /** hasRegistered */
        this.hasHook = (hookName) => {
            return this.hookMap.has(hookName);
        };
        /** getHooks */
        this.getHooks = (runtimeHooks = [], sort = true) => {
            const hooks = HookUtils.normalize(runtimeHooks, this.hookMap);
            if (!sort) {
                return hooks;
            }
            return HookUtils.sort(hooks, this.hookMap);
        };
        /** registerHook */
        this.registerHook = (hookMeta) => {
            if (this.hookMap.has(hookMeta.name)) {
                console.error(`${hookMeta.name} is duplicated in hookmap`);
            }
            this.hookMap.set(hookMeta.name, hookMeta);
            return {
                dispose: () => {
                    this.hookMap.delete(hookMeta.name);
                },
            };
        };
        /** registerHook */
        this.call = (args, main = (mainArgs) => __awaiter(this, void 0, void 0, function* () { return mainArgs; }), runtimeHook = []) => __awaiter(this, void 0, void 0, function* () {
            // TODO: 这里加cache
            const hooks = this.getHooks(runtimeHook, true);
            const scheduler = this.schedulers[this.scheduleType];
            return scheduler(args, main, hooks);
        });
        /** 执行hook的scheduler */
        this.schedulers = {
            /** pipeline执行 */
            [ScheduleTypeEnum.ASYNC_SRRIES]: (args, main, hooks = []) => __awaiter(this, void 0, void 0, function* () {
                let callback = main;
                /** 用 hook 加工 args  */
                for (const hook of hooks) {
                    if ([0, 1].includes(hook.handler.length)) {
                        yield hook.handler.call(this, args);
                        continue;
                    }
                    if ([2].includes(hook.handler.length) && callback !== null) {
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        const result = yield hook.handler.call(this, args, callback);
                        /** 如果返回为null，则直接中断执行 */
                        if (result === null) {
                            callback = null;
                            break;
                        }
                        else if (typeof result === 'function') {
                            callback = result;
                            continue;
                        }
                    }
                    const err = ErrorUtils.InvalidHookArguments(hook);
                    throw err;
                }
                /** 检查是否被替换为null */
                if (callback) {
                    return yield callback.call(this, args);
                }
            }),
            [ScheduleTypeEnum.ASYNC_PARALLEL]: (args, main, hooks = []) => __awaiter(this, void 0, void 0, function* () {
                /** 同时触发 hook */
                const promises = hooks.map(hook => {
                    if ([0, 1].includes(hook.handler.length)) {
                        return hook.handler.call(this, args);
                    }
                    if ([2].includes(hook.handler.length)) {
                        return hook.handler.call(this, args, main);
                    }
                    throw ErrorUtils.InvalidHookArguments(hook);
                });
                const defer = new Deferred();
                Promise.all(promises).then(res => defer.resolve(res));
                /** 检查是否被替换 */
                if (main) {
                    return yield main.call(this, defer);
                }
            }),
        };
        this.hookMap = new Map();
        if (options && options.type) {
            this.scheduleType = options.type;
        }
    }
}
//# sourceMappingURL=index.js.map