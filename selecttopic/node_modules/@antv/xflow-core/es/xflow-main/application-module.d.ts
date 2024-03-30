import 'reflect-metadata';
/** Application */
import { FrontendApplication } from './application';
/** Extension 注册中心 */
import { ExtensionRegistry } from './components/extension-registry';
export { ExtensionRegistry };
export declare type ICreateApp = (registry: ExtensionRegistry) => FrontendApplication;
export declare const initApp: ICreateApp;
