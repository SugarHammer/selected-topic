import { graphlib as IGraphLib } from "../../graphlib";
declare type Graph = IGraphLib.Graph;
declare const barycenter: (g: Graph, movable: string[]) => ({
    v: string;
    barycenter?: undefined;
    weight?: undefined;
} | {
    v: string;
    barycenter: number;
    weight: number;
})[];
export default barycenter;
