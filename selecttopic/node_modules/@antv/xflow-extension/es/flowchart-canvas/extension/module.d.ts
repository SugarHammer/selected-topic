import 'reflect-metadata';
import { FlowchartExtension } from './components';
/** 依赖扩展模块，必须要加载 */
declare const createFlowchartExtensionModule: () => import("mana-syringe").SyringeModule;
export { createFlowchartExtensionModule, FlowchartExtension };
