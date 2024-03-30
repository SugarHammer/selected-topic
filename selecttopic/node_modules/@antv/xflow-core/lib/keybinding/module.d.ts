import 'reflect-metadata';
/** Application 扩展依赖 */
/** 扩展Toolbar注册 */
import type { KeybindingConfig } from './config';
import { Syringe } from 'mana-syringe';
export declare const registerKeybindingConfig: (register: Syringe.Register, config: KeybindingConfig) => void;
/** 依赖扩展模块，必须要加载 */
export declare const createModule: (keyBindingConfig: KeybindingConfig) => import("mana-syringe").SyringeModule;
