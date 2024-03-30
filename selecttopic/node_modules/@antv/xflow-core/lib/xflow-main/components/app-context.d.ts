import React from 'react';
import type { FrontendApplication } from '../application';
/** AppContext */
export declare const XFlowAppContext: React.Context<IAppContainer>;
/** AppContext:获取 app */
export declare const useXFlowApp: () => FrontendApplication;
/** AppContext: 获取 appContainer */
export declare const useXFlowAppContainer: () => IAppContainer;
interface IAppContainer {
    getApp: () => FrontendApplication | null;
    setApp: (app: FrontendApplication) => void;
    onAppChange: (callback: (app: FrontendApplication) => void) => void;
    isUserDefined: () => boolean;
    dispose: () => void;
}
/** XFlow内部使用 */
export declare const XFlowAppInternalProvider: React.FC<{
    app: FrontendApplication;
}>;
/** XFlow外部使用 */
export declare const XFlowAppProvider: React.FC;
export {};
