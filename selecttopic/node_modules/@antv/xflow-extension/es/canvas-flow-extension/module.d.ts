import 'reflect-metadata';
/** Application 扩展依赖 */
import { ManaSyringe } from '@antv/xflow-core';
export * from './x6-extension/node';
/** 依赖扩展模块，必须要加载 */
declare const createFlowExtensionModule: () => ManaSyringe.SyringeModule;
export { createFlowExtensionModule };
