"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelAsync = exports.createComponentModel = exports.useModel = exports.useIsMountedRef = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var rx_model_1 = require("./rx-model");
/** 判断model是否Mount */
var isRefMounted = function (ref) {
    return ref && ref.current;
};
/** 用于判断model是否Mount */
var useIsMountedRef = function () {
    /** 记录当前组件的加载状态 */
    var ref = react_1.default.useRef(true);
    react_1.default.useEffect(function () {
        return function () {
            ref.current = false;
        };
    }, []);
    return ref;
};
exports.useIsMountedRef = useIsMountedRef;
/** 判断model是否Mount */
var useModel = function (model) {
    /** 记录当前组件的加载状态 */
    var ref = (0, exports.useIsMountedRef)();
    var _a = react_1.default.useState(model.getValue()), state = _a[0], setState = _a[1];
    react_1.default.useEffect(function () {
        var disposeable = model.watch(function (val) {
            if (isRefMounted(ref)) {
                setState(val);
            }
        });
        return function () {
            disposeable.dispose();
        };
        /* eslint-disable-next-line  */
    }, [setState]);
    var value = state;
    var canRender = rx_model_1.NsModel.isValidValue(value);
    var setValue = react_1.default.useCallback(function (val) { return model.setValue(val); }, [model]);
    return [value, setValue, canRender];
};
exports.useModel = useModel;
/** 在组件内部新建一个model */
var createComponentModel = function (initialState) {
    /* eslint-disable-next-line  */
    var model = react_1.default.useMemo(function () { return new rx_model_1.RxModel(initialState); }, []);
    /** model 和 state 绑定触发view刷新 */
    /* eslint-disable-next-line  */
    var _a = (0, exports.useModel)(model), modelValue = _a[0], setModelValue = _a[1], canRender = _a[2];
    /** unMount时dispose */
    /* eslint-disable-next-line  */
    react_1.default.useEffect(function () {
        return function () {
            model.dispose();
        };
    }, [model]);
    return [modelValue, setModelValue, model, canRender];
};
exports.createComponentModel = createComponentModel;
/**
 * useModelAsync：
 * watch model的值，
 * 把model的值通过useState和组件状态关联起来
 */
var useModelAsync = function (args) {
    var getModel = args.getModel, initialState = args.initialState;
    /** 记录当前组件的加载状态 */
    var isMountedRef = (0, exports.useIsMountedRef)();
    var modelRef = react_1.default.useRef();
    /** 订阅 model */
    var _a = react_1.default.useState(initialState), state = _a[0], setState = _a[1];
    react_1.default.useEffect(function () {
        var d;
        getModel().then(function (model) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var newState;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelRef.current = model;
                        return [4 /*yield*/, model.getValidValue()];
                    case 1:
                        newState = _a.sent();
                        if (!isMountedRef.current) {
                            return [2 /*return*/];
                        }
                        setState(newState);
                        d = model.watch(function (val) {
                            if (isMountedRef.current) {
                                setState(val);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        return function () {
            if (d && d.dispose) {
                d.dispose();
            }
        };
        /* eslint-disable-next-line  */
    }, []);
    return [state, setState, modelRef.current];
};
exports.useModelAsync = useModelAsync;
//# sourceMappingURL=rx-model-hook.js.map