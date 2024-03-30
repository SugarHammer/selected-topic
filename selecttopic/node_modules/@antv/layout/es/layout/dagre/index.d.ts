declare const _default: {
    graphlib: any;
    layout: (g: import("./graphlib").graphlib.Graph<{}>, opts: any) => void;
    util: {
        time: (name: string, fn: () => unknown) => unknown;
        notime: (name: string, fn: () => unknown) => unknown;
    };
};
export default _default;
