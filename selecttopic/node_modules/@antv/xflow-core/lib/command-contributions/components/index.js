"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCmdConfig = exports.CommandsRegistry = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var extension_context_1 = require("../../xflow-main/components/extension-context");
var module_1 = require("../module");
var config_1 = require("../config");
var CommandsRegistry = function (props) {
    /** 生成配置中心 */
    var extensionRegistry = (0, extension_context_1.useExtensionRegistry)();
    /** 获取ContextMenu的配置 */
    var config = react_1.default.useMemo(function () { return (props.config ? props.config : new config_1.CommandConfig()); }, 
    /* eslint-disable-next-line  */
    []);
    react_1.default.useEffect(function () {
        extensionRegistry.addCoreModule({
            config: config,
            createModule: module_1.createModule,
        });
        /* eslint-disable-next-line  */
    }, []);
    return null;
};
exports.CommandsRegistry = CommandsRegistry;
var createCmdConfig = function (addOptions) {
    return function (value) {
        /** bridge config and value */
        var valueContainer = react_1.default.useMemo(function () { return ({ getValue: function () { return ({}); } }); }, []);
        valueContainer.getValue = function () { return value; };
        var hookConfig = react_1.default.useMemo(function () {
            var config = new config_1.CommandConfig();
            addOptions(config, valueContainer);
            return config;
        }, [valueContainer]);
        return hookConfig;
    };
};
exports.createCmdConfig = createCmdConfig;
//# sourceMappingURL=index.js.map