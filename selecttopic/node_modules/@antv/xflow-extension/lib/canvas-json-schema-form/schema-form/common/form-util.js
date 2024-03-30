"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSchemaToValueList = void 0;
var util_1 = require("./form-item-wrapper/util");
// 根据 schema 生成表单的值
function transformSchemaToValueList(schema) {
    var result = {};
    var _a = schema.tabs, tabs = _a === void 0 ? [] : _a;
    tabs.forEach(function (tab) {
        var _a = tab.groups, groups = _a === void 0 ? [] : _a;
        groups.forEach(function (group) {
            var _a = group.controls, controls = _a === void 0 ? [] : _a;
            controls.forEach(function (control) {
                var name = control.name, value = control.value, defaultValue = control.defaultValue;
                if (['string', 'number'].includes(typeof name)) {
                    result[name.toString()] = (0, util_1.isEmptyParamValue)(value) ? defaultValue : value;
                }
            });
        });
    });
    return result;
}
exports.transformSchemaToValueList = transformSchemaToValueList;
//# sourceMappingURL=form-util.js.map