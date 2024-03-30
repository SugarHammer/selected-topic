import React from 'react';
import type { NsGraph } from '../../../interface';
/** 状态 类型 */
export declare enum StatusEnum {
    SUCCESS = "success",
    PROCESSING = "processing",
    ERROR = "error",
    DEFAULT = "default",
    WARNING = "warning"
}
export declare const AlgoIcon: React.FC<IProps>;
interface IProps {
    status: StatusEnum;
    hide: boolean;
}
export declare const XFlowDefaultNode: NsGraph.INodeRender;
export {};
