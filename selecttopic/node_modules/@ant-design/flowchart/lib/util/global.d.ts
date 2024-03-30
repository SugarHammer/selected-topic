import { MutableRefObject } from 'react';
import { IApplication } from '@antv/xflow';
import { FlowchartProps, IFlowchartGraph as IGraph } from '../interface';
interface IGlobalProps {
    [key: string]: {
        config: object;
        container?: MutableRefObject<HTMLDivElement>;
    };
}
export declare const globalProps: IGlobalProps;
/** 设置全局状态 */
export declare const setProps: (props: FlowchartProps, flowchartId: string, container?: MutableRefObject<HTMLDivElement>) => void;
export declare const setInstance: (x6graph: IGraph, app: IApplication, flowchartId: string) => void;
export declare const getGraphInstance: (flowchartId: string) => IGraph;
export declare const getAppInstance: (flowchartId: string) => IApplication;
/** 获取全局状态 */
export declare const getProps: (flowchartId: string, key: string) => any;
export declare const getContainer: (flowchartId: string, type?: string) => any;
export {};
