import type React from 'react';
export interface IPosition {
    width?: number;
    height?: number;
    lineHeight?: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export declare const usePositionStyle: (conf?: IPosition) => React.CSSProperties;
