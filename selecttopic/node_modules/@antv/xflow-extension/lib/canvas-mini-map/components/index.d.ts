import React from 'react';
import type { IPosition } from '@antv/xflow-core';
import { SimpleNodeView } from '../x6-node-view';
import type { IMinimapOptions } from '../interface';
/** 配置类型 */
export declare const CONFIG_TYPE = "CanvasMiniMap";
/** 获取默认配置 */
export declare const getDefaultMinimapOptions: () => {
    grid: boolean;
    enabled: boolean;
    width: number;
    height: number;
    padding: number;
    graphOptions: {
        async: boolean;
        getCellView(cell: any): typeof SimpleNodeView;
        createCellView(cell: any): any;
    };
};
/** minimap 配置项目*/
export interface IProps {
    minimapOptions?: IMinimapOptions;
    nodeFillColor?: string;
    borderColor?: string;
    handlerColor?: string;
    miniMapClz?: string;
    position?: IPosition;
}
export declare const CanvasMiniMap: React.FC<IProps>;
