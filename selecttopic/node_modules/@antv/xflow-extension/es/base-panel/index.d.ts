import type { PanelBaseConfig } from './config';
import type { IPosition } from '@antv/xflow-core';
import React from 'react';
interface IWorkspacePanelProps<T extends PanelBaseConfig = any> {
    config?: T;
    className?: string;
    position: IPosition;
    style?: React.CSSProperties;
}
declare const WorkspacePanel: React.FC<IWorkspacePanelProps>;
export { usePanelContext } from './context';
export { WorkspacePanel, IWorkspacePanelProps };
