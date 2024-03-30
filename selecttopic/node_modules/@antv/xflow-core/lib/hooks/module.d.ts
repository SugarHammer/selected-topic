import 'reflect-metadata';
/** Application 扩展依赖 */
import { HookConfig } from './config';
import { HookRegistry } from './hook-registry';
import { IHookContribution } from './interface';
/** 依赖扩展模块，必须要加载 */
declare const createModule: (config: HookConfig) => import("mana-syringe").SyringeModule;
export { HookRegistry, createModule, IHookContribution, HookConfig as XFlowHookConfig };
