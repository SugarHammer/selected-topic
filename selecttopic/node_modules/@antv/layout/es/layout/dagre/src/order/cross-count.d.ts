import { graphlib as IGraphLib } from '../../graphlib';
declare type Graph = IGraphLib.Graph;
declare const crossCount: (g: Graph, layering: any) => number;
export default crossCount;
