"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useXflowPrefixCls = exports.useConfigContext = exports.XFlowConfigProviderContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var constants_1 = require("../../constants");
/** xflow classname prefix context */
var ConfigProvider = /** @class */ (function () {
    function ConfigProvider() {
        var _this = this;
        this.xflowPrefixCls = constants_1.XFLOW_PREFIX_CLS;
        this.getXflowPrefixCls = function (pkgName) {
            return "".concat(_this.xflowPrefixCls, "-").concat(pkgName);
        };
        this.setXflowPrefixCls = function (prefixCls) {
            return (_this.xflowPrefixCls = prefixCls);
        };
    }
    return ConfigProvider;
}());
exports.XFlowConfigProviderContext = react_1.default.createContext({
    configProvider: null,
});
var useConfigContext = function () {
    return react_1.default.useContext(exports.XFlowConfigProviderContext);
};
exports.useConfigContext = useConfigContext;
var useXflowPrefixCls = function (pkgName) {
    var ctx = (0, exports.useConfigContext)();
    return react_1.default.useMemo(function () {
        if (ctx.configProvider) {
            return ctx.configProvider.getXflowPrefixCls(pkgName);
        }
        return "".concat(constants_1.XFLOW_PREFIX_CLS, "-").concat(pkgName);
        /* eslint-disable-next-line  */
    }, [pkgName]);
};
exports.useXflowPrefixCls = useXflowPrefixCls;
//# sourceMappingURL=global-config-context.js.map