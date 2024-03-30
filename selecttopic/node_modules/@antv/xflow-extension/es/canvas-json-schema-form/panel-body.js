import React from 'react';
import { Empty, Spin } from 'antd';
import { SchemaForm } from './schema-form';
import { makeControlMap, xflowDefaultControls } from './schema-form/control-map/index';
export const PanelBody = props => {
    const { schema = { tabs: [] }, triggerUpdate, onFieldsChange, afterUpdatingCb, defaultControlRender, loading, controlMapService, defaultControls = [], } = props;
    const controlMapCache = React.useMemo(() => {
        const controlMap = makeControlMap([...xflowDefaultControls, ...defaultControls]);
        if (controlMapService) {
            controlMapService(controlMap);
        }
        return controlMap;
    }, [controlMapService, defaultControls]);
    if (loading) {
        return (React.createElement("div", { className: `${props.prefixClz}-body`, style: Object.assign(Object.assign({}, props.style), { display: 'flex', justifyContent: 'center', alignItems: 'center' }) },
            React.createElement(Spin, { spinning: true })));
    }
    return (React.createElement("div", { className: `${props.prefixClz}-body`, style: props.style },
        schema.tabs.length > 0 && (React.createElement(SchemaForm, { schema: schema, onFieldsChange: onFieldsChange, controlMap: controlMapCache, defaultControlRender: defaultControlRender, afterUpdatingCb: afterUpdatingCb, triggerUpdate: triggerUpdate })),
        schema.tabs.length === 0 && React.createElement(Empty, { style: { paddingTop: '64px' } })));
};
//# sourceMappingURL=panel-body.js.map