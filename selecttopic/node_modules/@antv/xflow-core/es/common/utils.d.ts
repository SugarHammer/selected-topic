import type React from 'react';
export declare const noop: () => any;
export declare const disposableNoop: {
    dispose: () => any;
};
export declare function debounce(cb: (...args: any[]) => void, time: number): () => void;
export declare function throttle(cb: (...args: any[]) => void): () => void;
export declare const insertCss: (cssString: string) => HTMLStyleElement;
export declare function isClassComponent(component: unknown): component is React.ComponentClass;
export declare function isFunctionComponent(component: unknown): component is React.FunctionComponent;
export declare function isReactComponent(component: unknown): component is React.ComponentType;
