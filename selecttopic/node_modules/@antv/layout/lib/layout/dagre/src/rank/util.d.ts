import { graphlib } from "../../graphlib";
declare type Graph = graphlib.Graph;
declare const longestPath: (g: Graph) => void;
declare const longestPathWithLayer: (g: Graph) => void;
declare const slack: (g: Graph, e: any) => number;
export { longestPath, longestPathWithLayer, slack, };
declare const _default: {
    longestPath: (g: Graph) => void;
    longestPathWithLayer: (g: Graph) => void;
    slack: (g: Graph, e: any) => number;
};
export default _default;
