import { graphlib as IGraphLib } from '../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const addDummyNode: (g: IGraph, type: any, attrs: any, name: string) => string;
declare const simplify: (g: IGraph) => any;
declare const asNonCompoundGraph: (g: IGraph) => IGraph;
declare const zipObject: (keys: string[], values: any) => any;
declare const successorWeights: (g: IGraph) => any;
declare const predecessorWeights: (g: IGraph) => any;
declare const intersectRect: (rect: any, point: any) => {
    x: any;
    y: any;
};
declare const buildLayerMatrix: (g: IGraph) => any;
declare const normalizeRanks: (g: IGraph) => void;
declare const removeEmptyRanks: (g: IGraph) => void;
declare const addBorderNode: (g: IGraph, prefix: string, rank?: number | undefined, order?: number | undefined) => string;
declare const maxRank: (g: IGraph) => number;
declare const partition: (collection: any, fn: any) => {
    lhs: any;
    rhs: any;
};
declare const time: (name: string, fn: () => unknown) => unknown;
declare const notime: (name: string, fn: () => unknown) => unknown;
declare const minBy: (array: any, func: (param: any) => number) => undefined;
export { addDummyNode, simplify, asNonCompoundGraph, successorWeights, predecessorWeights, intersectRect, buildLayerMatrix, normalizeRanks, removeEmptyRanks, addBorderNode, maxRank, partition, time, notime, zipObject, minBy };
declare const _default: {
    addDummyNode: (g: IGraph, type: any, attrs: any, name: string) => string;
    simplify: (g: IGraph) => any;
    asNonCompoundGraph: (g: IGraph) => IGraph;
    successorWeights: (g: IGraph) => any;
    predecessorWeights: (g: IGraph) => any;
    intersectRect: (rect: any, point: any) => {
        x: any;
        y: any;
    };
    buildLayerMatrix: (g: IGraph) => any;
    normalizeRanks: (g: IGraph) => void;
    removeEmptyRanks: (g: IGraph) => void;
    addBorderNode: (g: IGraph, prefix: string, rank?: number | undefined, order?: number | undefined) => string;
    maxRank: (g: IGraph) => number;
    partition: (collection: any, fn: any) => {
        lhs: any;
        rhs: any;
    };
    time: (name: string, fn: () => unknown) => unknown;
    notime: (name: string, fn: () => unknown) => unknown;
    zipObject: (keys: string[], values: any) => any;
    minBy: (array: any, func: (param: any) => number) => undefined;
};
export default _default;
