export declare function getJudgeFunction(fn: any): any;
export declare function translatePosition(style: CSSStyleDeclaration, x: number, y: number, initialRender?: boolean): void;
export declare function debounce(func: (...args: any[]) => any, wait: number, context: any, setTimeoutFunc?: ((handler: TimerHandler, timeout?: number | undefined, ...arguments: any[]) => number) & typeof setTimeout, clearTimeoutFunc?: ((handle?: number | undefined) => void) & typeof clearTimeout): {
    (...args: any[]): void;
    reset(): void;
};
