"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommandConfig = exports.createCommandConfig = exports.CommandConfig = exports.getDefaultContributions = exports.CONFIG_TYPE = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../hooks/interface");
var utils_1 = require("../common/utils");
exports.CONFIG_TYPE = 'CommandConfig';
var getDefaultContributions = function () {
    return [];
};
exports.getDefaultContributions = getDefaultContributions;
var CommandConfig = /** @class */ (function () {
    function CommandConfig() {
        var _this = this;
        this.setCommandContributions = function (fn) {
            _this.getContributions = fn;
        };
        this.getCommandContributions = function () {
            return _this.getContributions();
        };
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.registerHookFn) {
                    return [2 /*return*/, this.registerHookFn(hooks)];
                }
                return [2 /*return*/, utils_1.disposableNoop];
            });
        }); };
        this.registerHookHub = function (registry) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.registerHookHubFn) {
                    return [2 /*return*/, this.registerHookHubFn(registry)];
                }
                return [2 /*return*/, utils_1.disposableNoop];
            });
        }); };
        /** 设置CONFIG类型 */
        this.CONFIG_TYPE = exports.CONFIG_TYPE;
        /** set command hook fn */
        this.setRegisterHookFn = function (fn) {
            _this.registerHookFn = fn;
        };
        /** 注册 command hook hub */
        this.setRegisterHookHubFn = function (fn) {
            _this.registerHookHubFn = fn;
        };
        /** 获取config的所有配置*/
        this.getConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        registerHookFn: this.registerHookFn,
                        getContributions: this.getContributions,
                        CONFIG_TYPE: this.CONFIG_TYPE,
                    }];
            });
        }); };
        this.getContributions = exports.getDefaultContributions;
    }
    return CommandConfig;
}());
exports.CommandConfig = CommandConfig;
/** 提供一个工厂方法 */
var createCommandConfig = function () {
    return new CommandConfig();
};
exports.createCommandConfig = createCommandConfig;
var registerCommandConfig = function (register, commandConfig) {
    register({
        token: CommandConfig,
        contrib: [interface_1.IHookContribution],
        lifecycle: mana_syringe_1.Syringe.Lifecycle.singleton,
        useDynamic: function () {
            return commandConfig;
        },
    });
};
exports.registerCommandConfig = registerCommandConfig;
//# sourceMappingURL=config.js.map