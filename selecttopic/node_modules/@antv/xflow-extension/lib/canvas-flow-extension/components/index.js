"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowGraphExtension = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var module_1 = require("../module");
var FlowGraphExtension = function () {
    /** 获取扩展Registry */
    var extensionRegistry = (0, xflow_core_1.useExtensionRegistry)();
    var config = react_1.default.useMemo(function () { return ({
        CONFIG_TYPE: 'DAG_EXTENSION',
        getConfig: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); },
    }); }, []);
    react_1.default.useEffect(function () {
        /** 注册 extension 到 Registry */
        var disposable = extensionRegistry.addExtension({
            config: config,
            createModule: module_1.createFlowExtensionModule,
        });
        /** 添加 classname */
        extensionRegistry.addContainerClassNames('flow-extension-container');
        return function () {
            disposable.dispose();
        };
    }, [config, extensionRegistry]);
    return null;
};
exports.FlowGraphExtension = FlowGraphExtension;
//# sourceMappingURL=index.js.map