import React from 'react';
import { ExtensionRegistry } from './extension-registry';
/** 通过context收集extension的配置 */
export declare const ExtensionRegistryContext: React.Context<ExtensionRegistry>;
export declare const useExtensionRegistry: () => ExtensionRegistry;
export { ExtensionRegistry };
