import 'reflect-metadata';
import type { GraphConfig } from './config';
/** 依赖扩展模块，必须要加载 */
export declare const createX6GraphModule: (config: GraphConfig) => import("mana-syringe").SyringeModule;
