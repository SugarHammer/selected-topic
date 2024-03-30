import { graphlib as IGraphLib } from '../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const greedyFAS: (g: IGraph, weightFn: () => unknown) => (import("../graphlib").Edge | undefined)[];
export default greedyFAS;
