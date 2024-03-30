"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFormItemControlledProps = exports.isEmptyParamValue = exports.makeUpdaterByDependencies = void 0;
var tslib_1 = require("tslib");
var get_1 = tslib_1.__importDefault(require("lodash/get"));
// 根据依赖字段生成 FormItem 的 updater
function makeUpdaterByDependencies(dependencies, setReasonField) {
    return function (prevValues, currentValues) {
        var hasFunctionDep = dependencies.some(function (dep) { return typeof (dep === null || dep === void 0 ? void 0 : dep.condition) === 'function'; });
        if (hasFunctionDep) {
            if (typeof setReasonField === 'function') {
                setReasonField(undefined); // 在更新规则是一个函数时，不依赖特定字段进行更新(即只要有字段的值更新了就更新，因为不知道函数内部依赖什么字段)
            }
            return true;
        }
        return dependencies.some(function (dep) {
            var name = dep.name;
            if (!name) {
                // eslint-disable-next-line no-console
                console.error("[Schema form]: A dependent name must be provided in the updater when the dependency condition is not a function.");
                return false;
            }
            var changed = (0, get_1.default)(prevValues, name) !== (0, get_1.default)(currentValues, name);
            if (changed) {
                if (typeof setReasonField === 'function') {
                    setReasonField(name);
                }
                return true;
            }
            return false;
        });
    };
}
exports.makeUpdaterByDependencies = makeUpdaterByDependencies;
function isEmptyParamValue(val) {
    return val === '' || val === undefined;
}
exports.isEmptyParamValue = isEmptyParamValue;
// 根据依赖字段的值生成当前的 FormItem 的值
function makeFormItemControlledProps(form, schema, reasonField) {
    var getFieldValue = form.getFieldValue, getFieldsValue = form.getFieldsValue;
    var dependencies = schema.dependencies, hidden = schema.hidden, disabled = schema.disabled;
    var isHidden = hidden;
    var isDisabled = disabled;
    // 当依赖满足并且依赖被操作过时，最终状态会变成依赖指定的状态
    dependencies === null || dependencies === void 0 ? void 0 : dependencies.forEach(function (dependency) {
        var depName = dependency.name, condition = dependency.condition, targetHiden = dependency.hidden, targetDisabled = dependency.disabled;
        // 在 condition 不是函数时，只检验造成更新的字段的变化
        if (typeof condition !== 'function' && reasonField && depName !== reasonField) {
            return;
        }
        var match = false;
        if (typeof condition === 'function') {
            var values = getFieldsValue();
            match = !!condition(values);
        }
        else {
            if (!depName) {
                // eslint-disable-next-line no-console
                console.error("[Schema form]: A dependent name must be provided in the props genarator when the dependency condition is not a function.");
                return;
            }
            match = getFieldValue(depName) === condition;
        }
        if (match) {
            if (targetHiden !== undefined) {
                isHidden = targetHiden;
            }
            if (targetDisabled !== undefined) {
                isDisabled = targetDisabled;
            }
        }
    });
    return {
        hidden: isHidden,
        disabled: isDisabled,
    };
}
exports.makeFormItemControlledProps = makeFormItemControlledProps;
//# sourceMappingURL=util.js.map