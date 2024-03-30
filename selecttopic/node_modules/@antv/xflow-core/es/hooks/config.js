import { __awaiter } from "tslib";
export const noop = () => {
    return {
        dispose: () => { },
    };
};
export var NsXFlowHook;
(function (NsXFlowHook) {
    NsXFlowHook.CONFIG_TYPE = 'XFlowHook';
})(NsXFlowHook || (NsXFlowHook = {}));
export class HookConfig {
    constructor() {
        /** CONFIG_TYPE */
        this.CONFIG_TYPE = NsXFlowHook.CONFIG_TYPE;
        this.time = Date.now();
        /** 提供一个runtime注册hook的方式 */
        this.setRegisterHook = (fn) => {
            this.hookRegisterFunc = fn;
        };
        /** 这里在canvas上提供一个runtime注册hookhub的方式 */
        this.setRegisterHookhub = (fn) => {
            this.hookhubRegisterFn = fn;
        };
        this.getConfig = () => __awaiter(this, void 0, void 0, function* () {
            const options = {
                CONFIG_TYPE: this.CONFIG_TYPE,
                hookRegisterFn: this.hookRegisterFunc || noop,
                hookhubRegisterFn: this.hookhubRegisterFn || noop,
            };
            return options;
        });
        this.dispose = () => { };
    }
}
//# sourceMappingURL=config.js.map