import 'reflect-metadata';
/** Application 扩展依赖 */
import type { IExtensionModule } from '@antv/xflow-core';
export * from './x6-extension/edge';
export * from './x6-extension/node';
import { IProps } from './interface';
/** 依赖扩展模块，必须要加载 */
declare const createDagExtensionModule: IExtensionModule<IProps>['createModule'];
export { createDagExtensionModule };
