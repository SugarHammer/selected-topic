"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = exports.HookUtils = exports.ErrorUtils = void 0;
var tslib_1 = require("tslib");
var toposort_1 = tslib_1.__importDefault(require("toposort"));
var ErrorUtils;
(function (ErrorUtils) {
    var ErrorEnum;
    (function (ErrorEnum) {
        ErrorEnum["INVALID_HOOK_BEFORE"] = "INVALID_HOOK_BEFORE";
        ErrorEnum["INVALID_HOOK_AFTER"] = "INVALID_HOOK_AFTER";
        ErrorEnum["INVALID_HOOK_ARGS_LENGTH"] = "INVALID_HOOK_ARGS_LENGTH";
    })(ErrorEnum = ErrorUtils.ErrorEnum || (ErrorUtils.ErrorEnum = {}));
    var HookError = /** @class */ (function (_super) {
        tslib_1.__extends(HookError, _super);
        function HookError(code, message) {
            var contexts = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                contexts[_i - 2] = arguments[_i];
            }
            var _this = this;
            if (Array.isArray(message)) {
                message = message
                    .filter(function (line) {
                    return !!line;
                })
                    .join(' ');
            }
            _this = _super.call(this, "".concat(code, ": ").concat(message)) || this;
            if (Error.captureStackTrace) {
                ;
                Error.captureStackTrace(_this, HookError);
            }
            _this.code = code;
            _this.contexts = {};
            contexts.forEach(function (context) {
                if (typeof context === 'object') {
                    Object.entries(context).forEach(function (pair) {
                        var key = pair[0], value = pair[1];
                        if (key !== 'key' && value) {
                            _this.contexts[key] = JSON.parse(JSON.stringify(value));
                        }
                    });
                }
            });
            return _this;
        }
        HookError.prototype.toString = function () {
            return "".concat(this.code, ": ").concat(this.message);
        };
        return HookError;
    }(Error));
    ErrorUtils.HookError = HookError;
    var createError = function (code, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new (HookError.bind.apply(HookError, tslib_1.__spreadArray([void 0, code, message], args, false)))();
    };
    ErrorUtils.HookBeforeError = function () {
        return createError(ErrorEnum.INVALID_HOOK_BEFORE, [
            'hook require a before dependency but not exist in hookmap',
        ]);
    };
    ErrorUtils.HookAfterError = function () {
        return createError(ErrorEnum.INVALID_HOOK_AFTER, [
            'hook require a after dependency but not exist in hookmap',
        ]);
    };
    ErrorUtils.InvalidHookArguments = function (hook) {
        return createError(ErrorEnum.INVALID_HOOK_ARGS_LENGTH, [
            'hook handlers must have 0 to 2 arguments',
            "but got ".concat(hook.handler.length),
        ]);
    };
})(ErrorUtils = exports.ErrorUtils || (exports.ErrorUtils = {}));
var HookUtils;
(function (HookUtils) {
    /** 处理 runtime hooks */
    HookUtils.normalize = function (hookConfig, hookMap) {
        if (hookConfig === void 0) { hookConfig = []; }
        var runtimeHook = Array.isArray(hookConfig) ? hookConfig : [hookConfig];
        var innerHooks = [];
        hookMap.forEach(function (val) {
            innerHooks.push(val);
        });
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], innerHooks, true), runtimeHook, true).filter(function (item) { return item && !!item.handler; });
    };
    /** 排序 hooks */
    HookUtils.sort = function (hooks, hookMap) {
        if (hooks === void 0) { hooks = []; }
        var edges = [];
        hooks.forEach(function (hook) {
            if (hook.before) {
                if (!hookMap.has(hook.before)) {
                    throw ErrorUtils.HookBeforeError();
                }
                var edge = [hook, hookMap.get(hook.before)];
                edges.push(edge);
            }
            if (hook.after) {
                if (!hookMap.has(hook.after)) {
                    throw ErrorUtils.HookBeforeError();
                }
                var edge = [hookMap.get(hook.after), hook];
                edges.push(edge);
            }
        });
        var sortedHooks = toposort_1.default.array(hooks, edges);
        return sortedHooks;
    };
})(HookUtils = exports.HookUtils || (exports.HookUtils = {}));
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = function (args) {
                _this.isResolved = true;
                resolve(args);
            };
            _this.reject = function (args) {
                _this.isRejected = true;
                reject(args);
            };
        });
    }
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=utils.js.map