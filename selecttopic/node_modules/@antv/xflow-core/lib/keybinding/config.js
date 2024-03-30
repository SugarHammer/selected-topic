"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybindingConfig = exports.NsContext = void 0;
var tslib_1 = require("tslib");
var deferred_1 = require("../common/deferred");
var disposable_1 = require("../common/disposable");
var NsContext;
(function (NsContext) {
    NsContext.CONFIG_TYPE = 'CONTEXT_CONFIG';
})(NsContext = exports.NsContext || (exports.NsContext = {}));
var noop = function () { return disposable_1.Disposable.create(function () { }); };
var KeybindingConfig = /** @class */ (function () {
    function KeybindingConfig() {
        var _this = this;
        /** CONFIG_TYPE */
        this.CONFIG_TYPE = NsContext.CONFIG_TYPE;
        /** 外部注册context的方法 */
        this.keybindingFunc = noop;
        /** 是否已加载 */
        this.isMounted = new deferred_1.Deferred();
        this.setKeybindingFunc = function (fn) {
            _this.keybindingFunc = fn;
        };
        this.setMountState = function () {
            _this.isMounted.resolve(true);
        };
        this.getConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isMounted.promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                CONFIG_TYPE: this.CONFIG_TYPE,
                                registerKeybindingFunc: this.keybindingFunc,
                            }];
                }
            });
        }); };
        this.dispose = function () {
            _this.keybindingFunc = noop;
            _this.isMounted = new deferred_1.Deferred();
        };
    }
    return KeybindingConfig;
}());
exports.KeybindingConfig = KeybindingConfig;
//# sourceMappingURL=config.js.map