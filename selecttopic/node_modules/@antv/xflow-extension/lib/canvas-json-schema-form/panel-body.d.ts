import React from 'react';
import type { ISchema, IControlProps, IAfterUpdatingCallback, ITriggerUpdate, IControlMapService, IDefaultControls, FieldData } from './interface';
export interface IBodyProps {
    schema: ISchema;
    loading: boolean;
    prefixClz: string;
    style: React.CSSProperties;
    onFieldsChange: (changedValues: FieldData[], allValues: FieldData[]) => void;
    defaultControlRender?: React.FC<IControlProps>;
    triggerUpdate?: ITriggerUpdate;
    afterUpdatingCb?: IAfterUpdatingCallback;
    controlMapService?: IControlMapService;
    defaultControls?: IDefaultControls;
}
export declare const PanelBody: React.FC<IBodyProps>;
