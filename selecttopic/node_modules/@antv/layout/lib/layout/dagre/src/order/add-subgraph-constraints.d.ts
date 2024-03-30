import { graphlib as IGraphLib } from "../../graphlib";
declare type Graph = IGraphLib.Graph;
declare const addSubgraphConstraints: (g: Graph, cg: Graph, vs: string[]) => void;
export default addSubgraphConstraints;
