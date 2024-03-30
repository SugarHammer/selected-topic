import util from './util';
import graphlib from './graphlib';
const Graph = graphlib.Graph;
/* istanbul ignore next */
const debugOrdering = (g) => {
    const layerMatrix = util.buildLayerMatrix(g);
    const h = new Graph({ compound: true, multigraph: true }).setGraph({});
    g.nodes().forEach((v) => {
        h.setNode(v, { label: v });
        h.setParent(v, `layer${g.node(v).rank}`);
    });
    g.edges().forEach((e) => {
        h.setEdge(e.v, e.w, {}, e.name);
    });
    layerMatrix === null || layerMatrix === void 0 ? void 0 : layerMatrix.forEach((layer, i) => {
        const layerV = `layer${i}`;
        h.setNode(layerV, { rank: "same" });
        layer === null || layer === void 0 ? void 0 : layer.reduce((u, v) => {
            h.setEdge(u, v, { style: "invis" });
            return v;
        });
    });
    return h;
};
export default debugOrdering;
//# sourceMappingURL=debug.js.map