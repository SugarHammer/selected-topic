import { __awaiter } from "tslib";
import { Deferred } from '../common/deferred';
import { Disposable } from '../common/disposable';
export var NsContext;
(function (NsContext) {
    NsContext.CONFIG_TYPE = 'CONTEXT_CONFIG';
})(NsContext || (NsContext = {}));
const noop = () => Disposable.create(() => { });
export class KeybindingConfig {
    constructor() {
        /** CONFIG_TYPE */
        this.CONFIG_TYPE = NsContext.CONFIG_TYPE;
        /** 外部注册context的方法 */
        this.keybindingFunc = noop;
        /** 是否已加载 */
        this.isMounted = new Deferred();
        this.setKeybindingFunc = (fn) => {
            this.keybindingFunc = fn;
        };
        this.setMountState = () => {
            this.isMounted.resolve(true);
        };
        this.getConfig = () => __awaiter(this, void 0, void 0, function* () {
            yield this.isMounted.promise;
            return {
                CONFIG_TYPE: this.CONFIG_TYPE,
                registerKeybindingFunc: this.keybindingFunc,
            };
        });
        this.dispose = () => {
            this.keybindingFunc = noop;
            this.isMounted = new Deferred();
        };
    }
}
//# sourceMappingURL=config.js.map