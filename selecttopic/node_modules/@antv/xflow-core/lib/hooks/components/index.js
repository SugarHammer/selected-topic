"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHookConfig = exports.HookRegistry = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var module_1 = require("../module");
var extension_context_1 = require("../../xflow-main/components/extension-context");
var config_1 = require("../config");
var HookRegistry = function (props) {
    /** 获取配置中心 */
    var extensionRegistry = (0, extension_context_1.useExtensionRegistry)();
    /** 获取ContextService的配置 */
    var hookConfig = react_1.default.useMemo(function () { return (props.config ? props.config : new module_1.XFlowHookConfig()); }, 
    // 不要移除：保证config只生成一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    react_1.default.useEffect(function () {
        var disposable = extensionRegistry.addCoreModule({
            config: hookConfig,
            createModule: module_1.createModule,
        });
        return function () {
            disposable.dispose();
            hookConfig.dispose();
        };
    }, [extensionRegistry, hookConfig]);
    return null;
};
exports.HookRegistry = HookRegistry;
var createHookConfig = function (addOptions) {
    return function (value) {
        /** bridge config and value */
        var valueContainer = react_1.default.useMemo(function () { return ({ getValue: function () { return ({}); } }); }, []);
        valueContainer.getValue = function () { return value; };
        var hookConfig = react_1.default.useMemo(function () {
            var config = new config_1.HookConfig();
            addOptions(config, valueContainer);
            return config;
        }, [valueContainer]);
        return hookConfig;
    };
};
exports.createHookConfig = createHookConfig;
//# sourceMappingURL=index.js.map