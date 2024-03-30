/// <reference types="react" />
import type { IMenuTarget, IMenuOptions, IModelService, IGraphCommandService } from '@antv/xflow-core';
export interface IRenderProps {
    idx: number;
    onHide: () => void;
    target: IMenuTarget;
    menuOptions: IMenuOptions;
    modelService: IModelService;
    commandService: IGraphCommandService;
}
export declare const renderMenuOptions: (props: IRenderProps) => JSX.Element;
