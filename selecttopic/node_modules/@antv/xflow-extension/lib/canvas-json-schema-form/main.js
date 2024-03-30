"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaForm = exports.JsonSchemaFormMain = exports.executeJsonSchemaFormCommand = exports.FormItemWrapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var panel_footer_1 = require("./panel-footer");
var panel_header_1 = require("./panel-header");
var panel_body_1 = require("./panel-body");
var utils_1 = require("./utils");
var service_1 = require("./service");
var schema_form_1 = require("./schema-form");
Object.defineProperty(exports, "FormItemWrapper", { enumerable: true, get: function () { return schema_form_1.FormItemWrapper; } });
var service_2 = require("./service");
Object.defineProperty(exports, "executeJsonSchemaFormCommand", { enumerable: true, get: function () { return service_2.executeJsonSchemaFormCommand; } });
var base_panel_1 = require("../base-panel");
/** useFormPanelData获取数据 */
var JsonSchemaFormMain = function (props) {
    var prefixClz = props.prefixClz;
    var getCustomRenderComponent = props.getCustomRenderComponent, afterUpdatingCb = props.afterUpdatingCb, _a = props.formValueUpdateService, formValueUpdateService = _a === void 0 ? function () { } : _a;
    var _b = (0, service_1.useJsonSchemaFormModel)(props), state = _b.state, commandService = _b.commandService, modelService = _b.modelService;
    // 联动更新form items的值
    var triggerUpdate = react_1.default.useCallback(function (form, values) {
        if (values === void 0) { values = {}; }
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var changedFields, allFields, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form.setFieldsValue(values);
                        changedFields = Object.entries(values).map(function (_a) {
                            var key = _a[0], val = _a[1];
                            return { name: key, value: val };
                        });
                        allFields = Object.entries(state.targetData).map(function (_a) {
                            var key = _a[0], val = _a[1];
                            return { name: key, value: val };
                        });
                        return [4 /*yield*/, formValueUpdateService({
                                allFields: allFields,
                                values: changedFields,
                                modelService: modelService,
                                commandService: commandService,
                                targetData: state.targetData,
                                targetType: state.targetType,
                            })];
                    case 1:
                        result = _a.sent();
                        if (afterUpdatingCb) {
                            afterUpdatingCb(result);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }, [
        afterUpdatingCb,
        commandService,
        formValueUpdateService,
        modelService,
        state.targetData,
        state.targetType,
    ]);
    // 在fields change时的回调
    var onFieldsChange = react_1.default.useCallback(function (changedFields, allFields) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, formValueUpdateService({
                        values: changedFields,
                        allFields: allFields,
                        modelService: modelService,
                        commandService: commandService,
                        targetData: state.targetData,
                        targetType: state.targetType,
                    })];
                case 1:
                    result = _a.sent();
                    if (afterUpdatingCb) {
                        afterUpdatingCb(result);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [
        afterUpdatingCb,
        commandService,
        formValueUpdateService,
        modelService,
        state.targetData,
        state.targetType,
    ]);
    /** schema为空的情况  */
    var noSchema = react_1.default.useMemo(function () {
        try {
            return state.schema.tabs.length === 0 || !state.schema;
        }
        catch (error) {
            return true;
        }
    }, [state.schema]);
    var _c = (0, utils_1.usePanelLyaoutStyle)(props, noSchema), headerStyle = _c.headerStyle, bodyStyle = _c.bodyStyle, footerStyle = _c.footerStyle;
    /** 支持自定义渲染 */
    if (getCustomRenderComponent) {
        var Component = getCustomRenderComponent(state.targetType, state.targetData, modelService, commandService);
        if (Component) {
            return react_1.default.createElement(Component, tslib_1.__assign(tslib_1.__assign({}, props), { headerStyle: headerStyle, bodyStyle: bodyStyle, footerStyle: footerStyle, targetData: state.targetData, targetType: state.targetType, modelService: modelService, commandService: commandService }));
        }
    }
    return (react_1.default.createElement("div", { className: prefixClz },
        react_1.default.createElement(panel_header_1.PanelHeader, tslib_1.__assign({ hasSchema: !noSchema }, props, { state: state, style: headerStyle, prefixClz: props.prefixClz })),
        react_1.default.createElement(panel_body_1.PanelBody, tslib_1.__assign({}, props, { key: state.targetData && state.targetData.id, style: bodyStyle, prefixClz: props.prefixClz, loading: state.loading, schema: state.schema, triggerUpdate: triggerUpdate, onFieldsChange: onFieldsChange })),
        react_1.default.createElement(panel_footer_1.PanelFooter, tslib_1.__assign({}, props, { state: state, style: footerStyle }))));
};
exports.JsonSchemaFormMain = JsonSchemaFormMain;
var JsonSchemaForm = function (props) {
    var prefixClz = (0, xflow_core_1.useXflowPrefixCls)('json-schema-form');
    return (react_1.default.createElement(base_panel_1.WorkspacePanel, tslib_1.__assign({}, props, { className: prefixClz }),
        react_1.default.createElement(exports.JsonSchemaFormMain, tslib_1.__assign({}, props, { prefixClz: prefixClz }))));
};
exports.JsonSchemaForm = JsonSchemaForm;
//# sourceMappingURL=main.js.map