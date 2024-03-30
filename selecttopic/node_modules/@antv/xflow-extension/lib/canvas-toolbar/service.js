"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToolbarModel = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var react_1 = tslib_1.__importDefault(require("react"));
var useToolbarModel = function (props) {
    var config = props.config;
    var modelId = config.moduleId;
    var app = (0, xflow_core_1.useXFlowApp)();
    var _a = (0, xflow_core_1.createComponentModel)({
        name: modelId,
        layout: props.layout,
        mainGroups: [],
        extraGroups: [],
        customRender: null,
    }), state = _a[0], setState = _a[1], toolbarModel = _a[2], isModelReady = _a[3];
    /** 注册全局的model */
    react_1.default.useEffect(function () {
        var toDispose = new xflow_core_1.DisposableCollection();
        var deferredModel = app.modelService.findDeferredModel(modelId);
        if (!deferredModel) {
            var _a = config.getConfig(), toolbarCustomRender_1 = _a.toolbarCustomRender, toolbarModelService_1 = _a.toolbarModelService;
            var d = app.modelService.registerModel({
                id: modelId,
                modelFactory: function () { return toolbarModel; },
                watchChange: function (self) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var updateCustomRender;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!toolbarModelService_1) return [3 /*break*/, 2];
                                return [4 /*yield*/, toolbarModelService_1(self, app.modelService, toDispose)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!toolbarCustomRender_1) return [3 /*break*/, 4];
                                updateCustomRender = function (customRender) {
                                    self.setValue(function (m) { return (m.customRender = customRender); });
                                };
                                return [4 /*yield*/, toolbarCustomRender_1(app.modelService, updateCustomRender)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/, toDispose];
                        }
                    });
                }); },
            });
            toDispose.push(d);
        }
        return function () {
            toDispose.dispose();
        };
        /* eslint-disable-next-line  */
    }, []);
    return { isModelReady: isModelReady, state: state, setState: setState, toolbarModel: toolbarModel };
};
exports.useToolbarModel = useToolbarModel;
//# sourceMappingURL=service.js.map