import { graphlib as IGraphLib } from '../../graphlib';
declare type Graph = IGraphLib.Graph;
declare const sortSubgraph: (g: Graph, v: string, cg: Graph, biasRight: any, usePrev?: any) => any;
export default sortSubgraph;
