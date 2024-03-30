"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaForm = exports.FormItemWrapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var antd_1 = require("antd");
var index_1 = require("./control-map/index");
var form_item_wrapper_1 = require("./common/form-item-wrapper");
Object.defineProperty(exports, "FormItemWrapper", { enumerable: true, get: function () { return form_item_wrapper_1.FormItemWrapper; } });
var TabPane = antd_1.Tabs.TabPane;
var SchemaForm = function (props) {
    var _a;
    var _b;
    var schema = props.schema, formInstance = props.form, className = props.className, triggerUpdate = props.triggerUpdate, defaultControlRender = props.defaultControlRender, afterUpdatingCb = props.afterUpdatingCb, controlMapfromParent = props.controlMap, otherProps = tslib_1.__rest(props, ["schema", "form", "className", "triggerUpdate", "defaultControlRender", "afterUpdatingCb", "controlMap"]);
    var tabs = schema.tabs;
    var form = antd_1.Form.useForm(formInstance)[0];
    var controlMap = react_1.default.useMemo(function () { return (props.controlMap ? props.controlMap : (0, index_1.makeControlMap)(index_1.xflowDefaultControls)); }, [props.controlMap]);
    var innerTriggerUpdate = (0, react_1.useCallback)(function (values) {
        if (typeof triggerUpdate === 'function') {
            triggerUpdate(form, values);
        }
    }, [form, triggerUpdate]);
    /** 初次挂载时设置一次值以激活首次联动 */
    (0, react_1.useEffect)(function () {
        form.setFieldsValue({});
    }, [form]);
    /** 切换标签时激活联动 */
    var onClickTab = (0, react_1.useCallback)(function () {
        requestAnimationFrame(function () {
            form.setFieldsValue({});
        });
    }, [form]);
    return (react_1.default.createElement(antd_1.Form, tslib_1.__assign({ size: "small", form: form, layout: "vertical", className: (0, classnames_1.default)('xflow-json-form', className) }, otherProps),
        react_1.default.createElement(antd_1.Tabs, { type: "card", defaultActiveKey: (_b = tabs[0]) === null || _b === void 0 ? void 0 : _b.name, className: (0, classnames_1.default)((_a = {},
                _a['tabs'] = true,
                _a['xTab'] = true,
                _a['singleTab'] = (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 1,
                _a['coupleTab'] = (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 2,
                _a['ternateTab'] = (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 3,
                _a)), onTabClick: onClickTab }, tabs.map(function (tab) {
            var tabName = tab.name, groups = tab.groups;
            return (react_1.default.createElement(TabPane, { key: tabName, tab: tabName },
                groups.length === 0 && react_1.default.createElement(antd_1.Empty, { style: { padding: '24px 0' } }),
                groups.length > 0 &&
                    groups.map(function (group) {
                        var _a = group.controls, groupControls = _a === void 0 ? [] : _a;
                        if (groupControls.length === 0) {
                            return react_1.default.createElement(antd_1.Empty, { style: { padding: '24px 0' } });
                        }
                        return groupControls.map(function (control) {
                            var shape = control.shape, controlName = control.name;
                            var ControlComponent = (0, index_1.getControlFromMap)(shape, controlMap, defaultControlRender);
                            if (!ControlComponent) {
                                console.error('未找到对应的控件:', shape);
                                return null;
                            }
                            return (react_1.default.createElement(ControlComponent, { key: controlName, form: form, controlSchema: control, triggerUpdate: innerTriggerUpdate, afterUpdatingCb: afterUpdatingCb }));
                        });
                    })));
        }))));
};
exports.SchemaForm = SchemaForm;
//# sourceMappingURL=index.js.map