import type { FormInstance } from 'antd/es/form';
import type { IDependency, IControlSchema, UpdateReasonField } from '../../../interface';
export declare function makeUpdaterByDependencies(dependencies: IDependency[], setReasonField?: (name: UpdateReasonField) => void): (prev: any, curr: any) => boolean;
export declare function isEmptyParamValue(val: string | number | boolean | undefined): boolean;
export declare function makeFormItemControlledProps(form: FormInstance<any>, schema: IControlSchema, reasonField?: UpdateReasonField): {
    hidden: boolean;
    disabled: boolean;
};
