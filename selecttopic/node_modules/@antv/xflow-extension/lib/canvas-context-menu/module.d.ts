import 'reflect-metadata';
/** Application 扩展依赖 */
import { ManaSyringe } from '@antv/xflow-core';
import { ContextMenuConfig } from './config';
/** 依赖扩展模块，必须要加载 */
declare const createModule: (config: ContextMenuConfig) => ManaSyringe.SyringeModule;
export { createModule };
