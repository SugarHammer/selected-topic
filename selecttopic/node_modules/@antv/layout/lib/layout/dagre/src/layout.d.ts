import { graphlib as IGraphLib } from '../graphlib';
declare type IGraph = IGraphLib.Graph;
declare const layout: (g: IGraph, opts: any) => void;
export default layout;
