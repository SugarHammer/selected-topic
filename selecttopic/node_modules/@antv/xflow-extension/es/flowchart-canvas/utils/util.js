import { __awaiter } from "tslib";
import { debounce } from 'lodash';
// 解决配置共享问题
export const globalProps = {
    config: {},
};
export const setProps = props => {
    globalProps.config = Object.assign({}, globalProps.config, props);
};
export const getProps = (key) => {
    var _a;
    return (_a = globalProps.config) === null || _a === void 0 ? void 0 : _a[key];
};
const graphInstance = new Map();
const appInstance = new Map();
export const setInstance = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const x6graph = yield app.getGraphInstance();
    graphInstance.set('x6graph', x6graph);
    appInstance.set('app', app);
});
export const getGraphInstance = () => {
    return graphInstance.get('x6graph');
};
export const getAppInstance = () => {
    return appInstance.get('app');
};
export const getGraphData = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = getAppInstance();
    return app.getGraphData();
});
/** 更新配置时通知上传执行保存 */
export const onConfigChange = debounce(config => {
    const configChange = getProps('onConfigChange');
    if (!configChange || typeof configChange !== 'function') {
        return;
    }
    return configChange(Object.assign({ data: getGraphData() }, config));
}, 300, {
    trailing: true,
});
//# sourceMappingURL=util.js.map