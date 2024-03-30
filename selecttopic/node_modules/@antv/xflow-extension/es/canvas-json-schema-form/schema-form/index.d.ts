import type { FormInstance, FormProps } from 'antd/es/form';
import type { IControlMap } from './control-map/index';
import type { IControlProps, IAfterUpdatingCallback, ISchema } from '../interface';
export type { Props as IFromItemWrapperProps } from './common/form-item-wrapper';
import React from 'react';
export { FormItemWrapper } from './common/form-item-wrapper';
interface Props extends FormProps {
    schema: ISchema;
    className?: string;
    form?: FormInstance;
    controlMap: IControlMap;
    defaultControlRender?: React.ComponentType<IControlProps>;
    triggerUpdate?: (form: FormInstance, values: Record<string, any>) => Promise<void>;
    afterUpdatingCb?: IAfterUpdatingCallback;
}
export declare const SchemaForm: React.FC<Props>;
