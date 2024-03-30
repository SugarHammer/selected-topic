"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarRegistry = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var module_1 = require("../module");
var extension_context_1 = require("../../xflow-main/components/extension-context");
var ToolbarRegistry = function (props) {
    var _a = props;
    /** 获取配置中心 */
    var extensionRegistry = (0, extension_context_1.useExtensionRegistry)();
    react_1.default.useEffect(function () {
        var disposable = extensionRegistry.addCoreModule({
            config: { CONFIG_TYPE: 'ToolbarRegistry', getConfig: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); } },
            createModule: module_1.createModule,
        });
        return function () {
            disposable.dispose();
        };
    }, [extensionRegistry]);
    return null;
};
exports.ToolbarRegistry = ToolbarRegistry;
exports.ToolbarRegistry.defaultProps = { XFlowModuleType: 'ToolbarRegistry' };
//# sourceMappingURL=index.js.map