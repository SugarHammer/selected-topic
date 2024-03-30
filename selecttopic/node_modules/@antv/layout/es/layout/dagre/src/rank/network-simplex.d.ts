import { graphlib as IGraphLib } from '../../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const networkSimplex: {
    (g: IGraph): void;
    initLowLimValues: (tree: IGraph, root?: string | undefined) => void;
    initCutValues: (t: IGraph, g: IGraph) => void;
    calcCutValue: (t: IGraph, g: IGraph, child: string) => number;
    leaveEdge: (tree: IGraph) => import("../../graphlib").Edge | undefined;
    enterEdge: (t: IGraph, g: IGraph, edge: any) => undefined;
    exchangeEdges: (t: IGraph, g: IGraph, e: any, f: any) => void;
};
export default networkSimplex;
