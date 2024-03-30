import { ManaSyringe } from '@antv/xflow-core';
import 'reflect-metadata';
/** 依赖扩展模块，必须要加载 */
declare const createModule: () => ManaSyringe.SyringeModule;
export { createModule };
