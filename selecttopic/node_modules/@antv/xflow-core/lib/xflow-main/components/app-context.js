"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowAppProvider = exports.XFlowAppInternalProvider = exports.useXFlowAppContainer = exports.useXFlowApp = exports.XFlowAppContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
/** AppContext */
exports.XFlowAppContext = react_1.default.createContext(null);
exports.XFlowAppContext.displayName = 'XFlowAppContext';
/** AppContext:获取 app */
var useXFlowApp = function () {
    var container = react_1.default.useContext(exports.XFlowAppContext);
    return container && container.getApp ? container.getApp() : null;
};
exports.useXFlowApp = useXFlowApp;
/** AppContext: 获取 appContainer */
var useXFlowAppContainer = function () {
    return react_1.default.useContext(exports.XFlowAppContext);
};
exports.useXFlowAppContainer = useXFlowAppContainer;
var AppContainer = /** @class */ (function () {
    function AppContainer(isUserDefined) {
        if (isUserDefined === void 0) { isUserDefined = false; }
        var _this = this;
        this.cache = null;
        this.setApp = function (app) {
            _this.cache = app;
            if (_this.onAppChangeCallback) {
                _this.onAppChangeCallback(app);
            }
        };
        this.isUserDefined = function () { return _this.isUserDefinedFlag; };
        this.getApp = function () {
            return _this.cache;
        };
        this.onAppChange = function (cb) {
            _this.onAppChangeCallback = cb;
        };
        this.dispose = function () {
            _this.cache = null;
        };
        this.isUserDefinedFlag = isUserDefined;
    }
    return AppContainer;
}());
/** XFlow内部使用 */
var XFlowAppInternalProvider = function (props) {
    var userDefinedAppContainer = (0, exports.useXFlowAppContainer)();
    var _a = react_1.default.useState(null), setTick = _a[1];
    var appContainer = react_1.default.useMemo(function () {
        return userDefinedAppContainer && userDefinedAppContainer.isUserDefined()
            ? userDefinedAppContainer
            : new AppContainer(false);
        // 不要移除：保证config只生成一次
        // eslint-disable-next-line
    }, []);
    // set appChange callback
    if (!appContainer.isUserDefined()) {
        appContainer.onAppChange(function () { return setTick(0); });
    }
    react_1.default.useEffect(function () {
        if (props.app) {
            appContainer.setApp(props.app);
        }
        // 不要移除：只关心 props.app
        // eslint-disable-next-line
    }, [props.app]);
    if (appContainer.isUserDefined()) {
        return react_1.default.createElement(react_1.default.Fragment, null, props.children);
    }
    return (react_1.default.createElement(exports.XFlowAppContext.Provider, { value: tslib_1.__assign({}, appContainer) }, props.children));
};
exports.XFlowAppInternalProvider = XFlowAppInternalProvider;
exports.XFlowAppInternalProvider.displayName = 'XFlowAppInternalProvider';
/** XFlow外部使用 */
var XFlowAppProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.default.useState(null), setTick = _b[1];
    var appContainer = react_1.default.useMemo(function () {
        return new AppContainer(true);
    }, []);
    // add callback
    appContainer.onAppChange(function () { return setTick(0); });
    return react_1.default.createElement(exports.XFlowAppContext.Provider, { value: tslib_1.__assign({}, appContainer) }, children);
};
exports.XFlowAppProvider = XFlowAppProvider;
exports.XFlowAppProvider.displayName = 'XFlowAppProvider';
//# sourceMappingURL=app-context.js.map