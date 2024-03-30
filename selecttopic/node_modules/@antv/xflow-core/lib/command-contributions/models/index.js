"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookhubList = exports.registerModelServiceCommand = void 0;
/** commands */
var update_model_1 = require("./update-model");
/** 注册Command Handler Class */
var registerModelServiceCommand = function (register) {
    register(update_model_1.UpdateModelCommand);
};
exports.registerModelServiceCommand = registerModelServiceCommand;
/** app onStart 时, 注册 Command Hooks */
exports.hookhubList = [update_model_1.NsUpdateModelCommand];
//# sourceMappingURL=index.js.map