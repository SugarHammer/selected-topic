import React from 'react';
import type { IControlSchema } from '../../../interface';
interface CalculatedData {
    hidden: boolean;
    disabled: boolean;
    initialValue: string | number | boolean;
}
export interface Props {
    schema: IControlSchema;
    children: (data: CalculatedData) => React.ReactElement;
}
export declare const FormItemWrapper: React.FC<Props>;
export {};
