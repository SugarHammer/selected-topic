import { useMemo } from 'react';
export const usePositionStyle = (conf = {}) => {
    return useMemo(() => {
        const config = Object.entries(conf);
        const style = config.length > 0 ? { position: 'absolute' } : {};
        config.forEach(([key, val = 0]) => {
            style[key] = `${val}px`;
        });
        return style;
    }, [conf]);
};
//# sourceMappingURL=position.js.map