import { graphlib as IGraphLib } from "../../graphlib";
declare type Graph = IGraphLib.Graph;
/**
 * 按照数据中的结果设置fixorder
 */
declare const initDataOrder: (g: Graph, nodeOrder: string[]) => void;
export default initDataOrder;
