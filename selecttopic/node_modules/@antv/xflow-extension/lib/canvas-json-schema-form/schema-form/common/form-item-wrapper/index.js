"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItemWrapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var util_1 = require("./util");
var FormItemWrapper = function (props) {
    var schema = props.schema, children = props.children;
    var _a = (0, react_1.useState)(), updateReasonField = _a[0], setUpdateReasonField = _a[1];
    var dependencies = schema.dependencies, value = schema.value, defaultValue = schema.defaultValue, hidden = schema.hidden, disabled = schema.disabled;
    var updater = (0, react_1.useMemo)(function () {
        return (dependencies === null || dependencies === void 0 ? void 0 : dependencies.length)
            ? (0, util_1.makeUpdaterByDependencies)(dependencies, setUpdateReasonField)
            : undefined;
    }, [dependencies]);
    if (typeof children !== 'function') {
        throw new Error('[Schema Form]: chilren of FormItemWrapper should be a render prop.');
    }
    var initValue = (0, util_1.isEmptyParamValue)(value) ? defaultValue : value;
    if (updater) {
        return (react_1.default.createElement(antd_1.Form.Item, { noStyle: true, shouldUpdate: updater }, function (form) {
            var _a = (0, util_1.makeFormItemControlledProps)(form, schema, updateReasonField), isHidden = _a.hidden, isDisabled = _a.disabled;
            return children({
                hidden: isHidden,
                disabled: isDisabled,
                initialValue: initValue,
            });
        }));
    }
    return children({
        hidden: hidden,
        disabled: disabled,
        initialValue: initValue,
    });
};
exports.FormItemWrapper = FormItemWrapper;
//# sourceMappingURL=index.js.map