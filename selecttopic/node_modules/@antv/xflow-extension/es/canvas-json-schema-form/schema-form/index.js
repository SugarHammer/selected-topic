import { __rest } from "tslib";
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Empty, Form, Tabs } from 'antd';
import { xflowDefaultControls, makeControlMap, getControlFromMap } from './control-map/index';
export { FormItemWrapper } from './common/form-item-wrapper';
const { TabPane } = Tabs;
export const SchemaForm = props => {
    var _a;
    const { schema, form: formInstance, className, triggerUpdate, defaultControlRender, afterUpdatingCb, controlMap: controlMapfromParent } = props, otherProps = __rest(props, ["schema", "form", "className", "triggerUpdate", "defaultControlRender", "afterUpdatingCb", "controlMap"]);
    const { tabs } = schema;
    const [form] = Form.useForm(formInstance);
    const controlMap = React.useMemo(() => (props.controlMap ? props.controlMap : makeControlMap(xflowDefaultControls)), [props.controlMap]);
    const innerTriggerUpdate = useCallback((values) => {
        if (typeof triggerUpdate === 'function') {
            triggerUpdate(form, values);
        }
    }, [form, triggerUpdate]);
    /** 初次挂载时设置一次值以激活首次联动 */
    useEffect(() => {
        form.setFieldsValue({});
    }, [form]);
    /** 切换标签时激活联动 */
    const onClickTab = useCallback(() => {
        requestAnimationFrame(() => {
            form.setFieldsValue({});
        });
    }, [form]);
    return (React.createElement(Form, Object.assign({ size: "small", form: form, layout: "vertical", className: classNames('xflow-json-form', className) }, otherProps),
        React.createElement(Tabs, { type: "card", defaultActiveKey: (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.name, className: classNames({
                ['tabs']: true,
                ['xTab']: true,
                ['singleTab']: (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 1,
                ['coupleTab']: (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 2,
                ['ternateTab']: (tabs === null || tabs === void 0 ? void 0 : tabs.length) === 3,
            }), onTabClick: onClickTab }, tabs.map((tab) => {
            const { name: tabName, groups } = tab;
            return (React.createElement(TabPane, { key: tabName, tab: tabName },
                groups.length === 0 && React.createElement(Empty, { style: { padding: '24px 0' } }),
                groups.length > 0 &&
                    groups.map(group => {
                        const { controls: groupControls = [] } = group;
                        if (groupControls.length === 0) {
                            return React.createElement(Empty, { style: { padding: '24px 0' } });
                        }
                        return groupControls.map(control => {
                            const { shape, name: controlName } = control;
                            const ControlComponent = getControlFromMap(shape, controlMap, defaultControlRender);
                            if (!ControlComponent) {
                                console.error('未找到对应的控件:', shape);
                                return null;
                            }
                            return (React.createElement(ControlComponent, { key: controlName, form: form, controlSchema: control, triggerUpdate: innerTriggerUpdate, afterUpdatingCb: afterUpdatingCb }));
                        });
                    })));
        }))));
};
//# sourceMappingURL=index.js.map