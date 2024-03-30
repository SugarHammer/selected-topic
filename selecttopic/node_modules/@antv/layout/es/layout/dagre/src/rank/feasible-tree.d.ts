import { graphlib as IGraphLib } from '../../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const feasibleTree: (g: IGraph) => IGraph;
declare const feasibleTreeWithLayer: (g: IGraph) => any;
export { feasibleTree, feasibleTreeWithLayer };
declare const _default: {
    feasibleTree: (g: IGraph) => IGraph;
    feasibleTreeWithLayer: (g: IGraph) => any;
};
export default _default;
