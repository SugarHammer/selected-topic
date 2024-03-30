export declare const Log: Console;
export declare const getGraphData: (flowchartId: string) => Promise<any>;
export declare const excLoadData: (app: any, data: any) => Promise<void>;
export declare const getFlowchartId: (e: any) => any;
/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
export declare const debounce: (func: Function, delay: number, immediate?: boolean) => Function;
export declare const getGraphHistory: (flowchartId: string) => import("@antv/x6/lib/graph/history").HistoryManager;
/** 更新配置时通知上传执行保存 */
export declare const onConfigChange: Function;
