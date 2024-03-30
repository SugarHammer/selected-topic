import { graphlib as IGraphLib } from "../../graphlib";
declare type Graph = IGraphLib.Graph;
declare const resolveConflicts: (entries: any, cg: Graph) => any[];
export default resolveConflicts;
