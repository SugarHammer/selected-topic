import 'reflect-metadata';
import { Syringe } from 'mana-syringe';
/** Application 扩展  */
import type { ModelServiceConfig } from './config';
/** 模块 */
export declare const modelServiceModule: import("mana-syringe").SyringeModule;
export declare const registerModelServiceConfig: (register: Syringe.Register, config: ModelServiceConfig) => void;
/** 组件的 config 模块，必须要加载 */
export declare const createModule: (config: ModelServiceConfig) => import("mana-syringe").SyringeModule;
