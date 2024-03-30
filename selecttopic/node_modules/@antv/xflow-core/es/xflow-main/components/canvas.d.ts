import React from 'react';
import type { IPosition } from '../../common/position';
import { GraphConfig } from '../graph';
export interface IProps {
    config?: GraphConfig;
    style?: React.CSSProperties;
    className?: string;
    isXFlowCanvas?: boolean;
    position?: IPosition;
}
export declare const XFlowCanvas: React.FC<IProps>;
