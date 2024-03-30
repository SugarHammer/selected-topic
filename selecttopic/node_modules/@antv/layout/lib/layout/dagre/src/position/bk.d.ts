import { graphlib as IGraphLib } from '../../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const findType1Conflicts: (g: IGraph, layering?: any) => {};
declare const findType2Conflicts: (g: IGraph, layering?: any) => {};
declare const addConflict: (conflicts: any, v: number, w: number) => void;
declare const hasConflict: (conflicts: any, v: number, w: number) => any;
declare const verticalAlignment: (g: IGraph, layering: any, conflicts: any, neighborFn: (v: string) => unknown) => {
    root: any;
    align: any;
};
declare const horizontalCompaction: (g: IGraph, layering: any, root: string, align: string[], reverseSep: boolean) => any;
declare const findSmallestWidthAlignment: (g: IGraph, xss: any) => undefined;
declare function alignCoordinates(xss: any, alignTo: any): void;
declare const balance: (xss: any, align: string) => any;
declare const positionX: (g: IGraph) => any;
export { positionX, findType1Conflicts, findType2Conflicts, addConflict, hasConflict, verticalAlignment, horizontalCompaction, alignCoordinates, findSmallestWidthAlignment, balance };
declare const _default: {
    positionX: (g: IGraph) => any;
    findType1Conflicts: (g: IGraph, layering?: any) => {};
    findType2Conflicts: (g: IGraph, layering?: any) => {};
    addConflict: (conflicts: any, v: number, w: number) => void;
    hasConflict: (conflicts: any, v: number, w: number) => any;
    verticalAlignment: (g: IGraph, layering: any, conflicts: any, neighborFn: (v: string) => unknown) => {
        root: any;
        align: any;
    };
    horizontalCompaction: (g: IGraph, layering: any, root: string, align: string[], reverseSep: boolean) => any;
    alignCoordinates: typeof alignCoordinates;
    findSmallestWidthAlignment: (g: IGraph, xss: any) => undefined;
    balance: (xss: any, align: string) => any;
};
export default _default;
