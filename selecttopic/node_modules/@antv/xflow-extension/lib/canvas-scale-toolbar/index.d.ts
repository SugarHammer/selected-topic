import type { IPosition } from '@antv/xflow-core';
import React from 'react';
import { CANVAS_SCALE_TOOLBAR_CONFIG } from './config';
interface IProps {
    position: IPosition;
    className?: string;
    layout?: 'vertical' | 'horizontal';
    style?: React.CSSProperties;
}
declare const CanvasScaleToolbar: React.FC<IProps>;
export { CanvasScaleToolbar, IProps as ICanvasScaleToolbarProps, CANVAS_SCALE_TOOLBAR_CONFIG };
