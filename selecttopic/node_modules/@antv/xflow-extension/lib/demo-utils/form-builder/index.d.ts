import type { ComponentClass, FunctionComponent } from 'react';
import type { FormInstance, ButtonProps } from 'antd';
import type { Rule } from 'rc-field-form/es/interface';
import React from 'react';
export interface IFormSchema {
    name: string;
    label: string;
    rules?: Rule[];
    render: string | FunctionComponent<any> | ComponentClass<any, any>;
    renderProps?: any;
    itemProps?: any;
}
interface IProps<T> {
    className?: string;
    onFinish: (values: T) => Promise<void>;
    initialValues: T;
    layout?: 'horizontal' | 'inline' | 'vertical';
    form: FormInstance;
    formItems: IFormSchema[];
    buttonProps?: ButtonProps;
    submitButton?: React.ReactNode;
}
export declare function FormBuilder<T>(props: IProps<T>): JSX.Element;
export {};
