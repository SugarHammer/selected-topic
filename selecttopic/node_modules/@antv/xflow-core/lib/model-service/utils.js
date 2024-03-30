"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentCtx = exports.useModel = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var rx_model_1 = require("../common/rx-model");
/** 判断model是否Mount */
var isRefMounted = function (ref) {
    return ref && ref.current;
};
/** 用于判断model是否Mount */
var useIsMoutedRef = function () {
    /** 记录当前组件的加载状态 */
    var ref = react_1.default.useRef(true);
    react_1.default.useEffect(function () {
        return function () {
            ref.current = false;
        };
    }, []);
    return ref;
};
/** 将model和react绑定 */
var useModel = function (model) {
    /** 记录当前组件的加载状态 */
    var ref = useIsMoutedRef();
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
    }, [model]);
    var value = state;
    var canRender = rx_model_1.NsModel.isValidValue(value);
    var setValue = react_1.default.useCallback(function (val) { return model.setValue(val); }, [model]);
    return [value, setValue, canRender];
};
exports.useModel = useModel;
/** 在组件内新建一个model */
var useComponentCtx = function (initialState) {
    var model = react_1.default.useMemo(function () { return new rx_model_1.RxModel(initialState); }, [initialState]);
    /** model 和 state 绑定触发view刷新 */
    var _a = (0, exports.useModel)(model), modelValue = _a[0], setModelValue = _a[1], canRender = _a[2];
    /** unMount时dispose */
    react_1.default.useEffect(function () {
        return function () {
            model.dispose();
        };
    }, [model]);
    return [modelValue, setModelValue, model, canRender];
};
exports.useComponentCtx = useComponentCtx;
//# sourceMappingURL=utils.js.map