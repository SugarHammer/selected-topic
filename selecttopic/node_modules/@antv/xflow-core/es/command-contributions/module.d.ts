import 'reflect-metadata';
/** Commands */
import type { CommandConfig } from './config';
/** 依赖扩展模块，必须要加载 */
export declare const createModule: (commandConfig: CommandConfig) => import("mana-syringe").SyringeModule;
