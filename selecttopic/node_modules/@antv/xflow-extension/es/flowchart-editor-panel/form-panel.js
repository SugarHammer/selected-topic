import { __rest } from "tslib";
import React, { useState } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { JsonSchemaForm } from '../canvas-json-schema-form';
import { WorkspacePanel } from '../base-panel';
import { defaultFormSchemaService } from './form-schema-service';
import { defaultControlMapService } from './control-map-service';
export const CONTAINER_CLASS = 'xflow-editor-panel-collpase';
export const FlowchartFormPanel = props => {
    const [collpased, setCollpased] = useState(false);
    const { controlMapService = defaultControlMapService, formSchemaService = defaultFormSchemaService, position = { width: 240, top: 0, bottom: 0, right: 0 }, show = true } = props, rest = __rest(props, ["controlMapService", "formSchemaService", "position", "show"]);
    if (!show) {
        return null;
    }
    const { width = 200, right } = position;
    return (React.createElement(WorkspacePanel, { className: CONTAINER_CLASS, position: Object.assign(Object.assign({}, position), { right: !collpased ? right : -width }) },
        React.createElement("div", { className: `${CONTAINER_CLASS}-wrapper` },
            React.createElement(JsonSchemaForm, Object.assign({ targetType: ['node', 'edge', 'canvas', 'group'], controlMapService: controlMapService, formSchemaService: formSchemaService, position: Object.assign(Object.assign({}, position), { top: 0 }), prefixClz: "xflow-form-editor" }, rest)),
            React.createElement("div", { className: `${CONTAINER_CLASS}-icon`, style: {
                    top: 21,
                    left: !collpased ? -10 : -20,
                    borderRadius: !collpased ? '50%' : '50% 0 0  50%',
                    borderRight: !collpased ? '' : 'none',
                }, onClick: () => {
                    setCollpased(!collpased);
                } }, collpased ? React.createElement(DoubleLeftOutlined, null) : React.createElement(DoubleRightOutlined, null)))));
};
//# sourceMappingURL=form-panel.js.map