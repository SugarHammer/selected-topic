import React from 'react';
export const PanelContext = React.createContext({
    propsProxy: null,
    commandService: null,
    modelService: null,
});
export const usePanelContext = () => React.useContext(PanelContext);
//# sourceMappingURL=context.js.map