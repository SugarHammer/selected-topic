import 'reflect-metadata';
/** Application 扩展依赖 */
/** Toolbar扩展点依赖 */
import { ToolbarRegistry } from './toolbar-registry';
import { IToolbarContribution } from './interface';
export { IToolbarContribution, ToolbarRegistry };
/** 依赖扩展模块，必须要加载 */
export declare const createModule: () => import("mana-syringe").SyringeModule;
