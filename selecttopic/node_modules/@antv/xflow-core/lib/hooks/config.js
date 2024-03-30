"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookConfig = exports.NsXFlowHook = exports.noop = void 0;
var tslib_1 = require("tslib");
var noop = function () {
    return {
        dispose: function () { },
    };
};
exports.noop = noop;
var NsXFlowHook;
(function (NsXFlowHook) {
    NsXFlowHook.CONFIG_TYPE = 'XFlowHook';
})(NsXFlowHook = exports.NsXFlowHook || (exports.NsXFlowHook = {}));
var HookConfig = /** @class */ (function () {
    function HookConfig() {
        var _this = this;
        /** CONFIG_TYPE */
        this.CONFIG_TYPE = NsXFlowHook.CONFIG_TYPE;
        this.time = Date.now();
        /** 提供一个runtime注册hook的方式 */
        this.setRegisterHook = function (fn) {
            _this.hookRegisterFunc = fn;
        };
        /** 这里在canvas上提供一个runtime注册hookhub的方式 */
        this.setRegisterHookhub = function (fn) {
            _this.hookhubRegisterFn = fn;
        };
        this.getConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                options = {
                    CONFIG_TYPE: this.CONFIG_TYPE,
                    hookRegisterFn: this.hookRegisterFunc || exports.noop,
                    hookhubRegisterFn: this.hookhubRegisterFn || exports.noop,
                };
                return [2 /*return*/, options];
            });
        }); };
        this.dispose = function () { };
    }
    return HookConfig;
}());
exports.HookConfig = HookConfig;
//# sourceMappingURL=config.js.map