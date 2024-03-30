import React from 'react';
/** AppContext */
export const XFlowAppContext = React.createContext(null);
XFlowAppContext.displayName = 'XFlowAppContext';
/** AppContext:获取 app */
export const useXFlowApp = () => {
    const container = React.useContext(XFlowAppContext);
    return container && container.getApp ? container.getApp() : null;
};
/** AppContext: 获取 appContainer */
export const useXFlowAppContainer = () => {
    return React.useContext(XFlowAppContext);
};
class AppContainer {
    constructor(isUserDefined = false) {
        this.cache = null;
        this.setApp = (app) => {
            this.cache = app;
            if (this.onAppChangeCallback) {
                this.onAppChangeCallback(app);
            }
        };
        this.isUserDefined = () => this.isUserDefinedFlag;
        this.getApp = () => {
            return this.cache;
        };
        this.onAppChange = cb => {
            this.onAppChangeCallback = cb;
        };
        this.dispose = () => {
            this.cache = null;
        };
        this.isUserDefinedFlag = isUserDefined;
    }
}
/** XFlow内部使用 */
export const XFlowAppInternalProvider = props => {
    const userDefinedAppContainer = useXFlowAppContainer();
    const [, setTick] = React.useState(null);
    const appContainer = React.useMemo(() => {
        return userDefinedAppContainer && userDefinedAppContainer.isUserDefined()
            ? userDefinedAppContainer
            : new AppContainer(false);
        // 不要移除：保证config只生成一次
        // eslint-disable-next-line
    }, []);
    // set appChange callback
    if (!appContainer.isUserDefined()) {
        appContainer.onAppChange(() => setTick(0));
    }
    React.useEffect(() => {
        if (props.app) {
            appContainer.setApp(props.app);
        }
        // 不要移除：只关心 props.app
        // eslint-disable-next-line
    }, [props.app]);
    if (appContainer.isUserDefined()) {
        return React.createElement(React.Fragment, null, props.children);
    }
    return (React.createElement(XFlowAppContext.Provider, { value: Object.assign({}, appContainer) }, props.children));
};
XFlowAppInternalProvider.displayName = 'XFlowAppInternalProvider';
/** XFlow外部使用 */
export const XFlowAppProvider = ({ children }) => {
    const [, setTick] = React.useState(null);
    const appContainer = React.useMemo(() => {
        return new AppContainer(true);
    }, []);
    // add callback
    appContainer.onAppChange(() => setTick(0));
    return React.createElement(XFlowAppContext.Provider, { value: Object.assign({}, appContainer) }, children);
};
XFlowAppProvider.displayName = 'XFlowAppProvider';
//# sourceMappingURL=app-context.js.map