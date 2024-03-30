import 'reflect-metadata';
/** Application 扩展依赖 */
import { ManaSyringe } from '@antv/xflow-core';
export interface IConfig {
}
/** 依赖扩展模块，必须要加载 */
declare const createModule: () => ManaSyringe.SyringeModule;
export { createModule };
