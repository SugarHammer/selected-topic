import { __awaiter } from "tslib";
export var NsPortEvent;
(function (NsPortEvent) {
    NsPortEvent.MOUSE_ENTER = 'node-port:mouseenter';
    NsPortEvent.MOUSE_LEAVE = 'node-port:mouseleave';
})(NsPortEvent || (NsPortEvent = {}));
export var ACTIVE_NODE_PORT;
(function (ACTIVE_NODE_PORT) {
    ACTIVE_NODE_PORT.id = 'ACTIVE_NODE_PORT';
    ACTIVE_NODE_PORT.useModel = (modelService) => __awaiter(this, void 0, void 0, function* () {
        const model = yield modelService.awaitModel(ACTIVE_NODE_PORT.id);
        const data = yield model.getValidValue();
        return { data, model };
    });
})(ACTIVE_NODE_PORT || (ACTIVE_NODE_PORT = {}));
//# sourceMappingURL=interface.js.map