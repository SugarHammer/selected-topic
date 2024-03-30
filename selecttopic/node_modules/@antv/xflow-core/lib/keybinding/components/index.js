"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeybindingConfig = exports.KeyBindings = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var module_1 = require("../module");
var extension_context_1 = require("../../xflow-main/components/extension-context");
var config_1 = require("../config");
var KeyBindings = function (props) {
    var config = props.config;
    /** 获取配置中心 */
    var extensionRegistry = (0, extension_context_1.useExtensionRegistry)();
    /** 获取ContextService的配置 */
    var keybindingConfig = react_1.default.useMemo(function () { return (config ? config : new config_1.KeybindingConfig()); }, [config]);
    react_1.default.useEffect(function () {
        var disposable = extensionRegistry.addCoreModule({
            config: keybindingConfig,
            createModule: module_1.createModule,
        });
        /** resolve */
        keybindingConfig.setMountState();
        return function () {
            disposable.dispose();
            keybindingConfig.dispose();
        };
    }, [extensionRegistry, keybindingConfig]);
    return null;
};
exports.KeyBindings = KeyBindings;
var createKeybindingConfig = function (addOptions) {
    return function (value) {
        /** bridge config and value */
        var valueContainer = react_1.default.useMemo(function () { return ({ getValue: function () { return ({}); } }); }, []);
        valueContainer.getValue = function () { return value; };
        var hookConfig = react_1.default.useMemo(function () {
            var config = new config_1.KeybindingConfig();
            addOptions(config, valueContainer);
            return config;
        }, [valueContainer]);
        return hookConfig;
    };
};
exports.createKeybindingConfig = createKeybindingConfig;
//# sourceMappingURL=index.js.map