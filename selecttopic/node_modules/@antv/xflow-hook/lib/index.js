"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookHub = exports.ScheduleTypeEnum = void 0;
var tslib_1 = require("tslib");
var interface_1 = require("./interface");
var utils_1 = require("./utils");
var interface_2 = require("./interface");
Object.defineProperty(exports, "ScheduleTypeEnum", { enumerable: true, get: function () { return interface_2.ScheduleTypeEnum; } });
var HookHub = /** @class */ (function () {
    function HookHub(options) {
        var _a;
        var _this = this;
        /** scheduleType */
        this.scheduleType = interface_1.ScheduleTypeEnum.ASYNC_SRRIES;
        /** hasRegistered */
        this.hasHook = function (hookName) {
            return _this.hookMap.has(hookName);
        };
        /** getHooks */
        this.getHooks = function (runtimeHooks, sort) {
            if (runtimeHooks === void 0) { runtimeHooks = []; }
            if (sort === void 0) { sort = true; }
            var hooks = utils_1.HookUtils.normalize(runtimeHooks, _this.hookMap);
            if (!sort) {
                return hooks;
            }
            return utils_1.HookUtils.sort(hooks, _this.hookMap);
        };
        /** registerHook */
        this.registerHook = function (hookMeta) {
            if (_this.hookMap.has(hookMeta.name)) {
                console.error("".concat(hookMeta.name, " is duplicated in hookmap"));
            }
            _this.hookMap.set(hookMeta.name, hookMeta);
            return {
                dispose: function () {
                    _this.hookMap.delete(hookMeta.name);
                },
            };
        };
        /** registerHook */
        this.call = function (args, main, runtimeHook) {
            if (main === void 0) { main = function (mainArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, mainArgs];
            }); }); }; }
            if (runtimeHook === void 0) { runtimeHook = []; }
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var hooks, scheduler;
                return tslib_1.__generator(this, function (_a) {
                    hooks = this.getHooks(runtimeHook, true);
                    scheduler = this.schedulers[this.scheduleType];
                    return [2 /*return*/, scheduler(args, main, hooks)];
                });
            });
        };
        /** 执行hook的scheduler */
        this.schedulers = (_a = {},
            /** pipeline执行 */
            _a[interface_1.ScheduleTypeEnum.ASYNC_SRRIES] = function (args, main, hooks) {
                if (hooks === void 0) { hooks = []; }
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var callback, _i, hooks_1, hook, result, err;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                callback = main;
                                _i = 0, hooks_1 = hooks;
                                _a.label = 1;
                            case 1:
                                if (!(_i < hooks_1.length)) return [3 /*break*/, 7];
                                hook = hooks_1[_i];
                                if (![0, 1].includes(hook.handler.length)) return [3 /*break*/, 3];
                                return [4 /*yield*/, hook.handler.call(this, args)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 3:
                                if (!([2].includes(hook.handler.length) && callback !== null)) return [3 /*break*/, 5];
                                return [4 /*yield*/, hook.handler.call(this, args, callback)
                                    /** 如果返回为null，则直接中断执行 */
                                ];
                            case 4:
                                result = _a.sent();
                                /** 如果返回为null，则直接中断执行 */
                                if (result === null) {
                                    callback = null;
                                    return [3 /*break*/, 7];
                                }
                                else if (typeof result === 'function') {
                                    callback = result;
                                    return [3 /*break*/, 6];
                                }
                                _a.label = 5;
                            case 5:
                                err = utils_1.ErrorUtils.InvalidHookArguments(hook);
                                throw err;
                            case 6:
                                _i++;
                                return [3 /*break*/, 1];
                            case 7:
                                if (!callback) return [3 /*break*/, 9];
                                return [4 /*yield*/, callback.call(this, args)];
                            case 8: return [2 /*return*/, _a.sent()];
                            case 9: return [2 /*return*/];
                        }
                    });
                });
            },
            _a[interface_1.ScheduleTypeEnum.ASYNC_PARALLEL] = function (args, main, hooks) {
                if (hooks === void 0) { hooks = []; }
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var promises, defer;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                promises = hooks.map(function (hook) {
                                    if ([0, 1].includes(hook.handler.length)) {
                                        return hook.handler.call(_this, args);
                                    }
                                    if ([2].includes(hook.handler.length)) {
                                        return hook.handler.call(_this, args, main);
                                    }
                                    throw utils_1.ErrorUtils.InvalidHookArguments(hook);
                                });
                                defer = new utils_1.Deferred();
                                Promise.all(promises).then(function (res) { return defer.resolve(res); });
                                if (!main) return [3 /*break*/, 2];
                                return [4 /*yield*/, main.call(this, defer)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            },
            _a);
        this.hookMap = new Map();
        if (options && options.type) {
            this.scheduleType = options.type;
        }
    }
    return HookHub;
}());
exports.HookHub = HookHub;
//# sourceMappingURL=index.js.map