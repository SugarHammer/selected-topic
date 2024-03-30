"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelServiceConfig = exports.ModelServiceRegistry = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var module_1 = require("../module");
var config_1 = require("../config");
var extension_context_1 = require("../../xflow-main/components/extension-context");
var ModelServiceRegistry = function (props) {
    var config = props.config;
    /** 获取配置中心 */
    var extensionRegistry = (0, extension_context_1.useExtensionRegistry)();
    /** 获取ModelService的配置 */
    var modelServiceConfig = react_1.default.useMemo(function () { return (config ? config : new config_1.ModelServiceConfig()); }, 
    /* eslint-disable-next-line  */
    []);
    react_1.default.useEffect(function () {
        var disposable = extensionRegistry.addCoreModule({
            config: modelServiceConfig,
            createModule: module_1.createModule,
        });
        modelServiceConfig.setMountState();
        return function () {
            disposable.dispose();
            modelServiceConfig.dispose();
        };
        // 不要移除：保证 只生执行一次
        // eslint-disable-next-line
    }, []);
    return null;
};
exports.ModelServiceRegistry = ModelServiceRegistry;
exports.ModelServiceRegistry.defaultProps = { XFlowModuleType: 'ModelServiceConfig' };
var createModelServiceConfig = function (addOptions) {
    return function (value) {
        /** bridge config and value */
        var valueContainer = react_1.default.useMemo(function () { return ({ getValue: function () { return ({}); } }); }, []);
        valueContainer.getValue = function () { return value; };
        var hookConfig = react_1.default.useMemo(function () {
            var config = new config_1.ModelServiceConfig();
            addOptions(config, valueContainer);
            return config;
        }, [valueContainer]);
        return hookConfig;
    };
};
exports.createModelServiceConfig = createModelServiceConfig;
//# sourceMappingURL=index.js.map