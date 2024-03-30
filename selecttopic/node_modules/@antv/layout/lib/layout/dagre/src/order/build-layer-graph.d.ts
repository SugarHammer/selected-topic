import { graphlib as IGraphLib } from '../../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const buildLayerGraph: (g: IGraph, rank: number, relationship: string) => any;
export default buildLayerGraph;
