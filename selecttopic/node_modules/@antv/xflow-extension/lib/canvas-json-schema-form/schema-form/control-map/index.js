"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControlFromMap = exports.makeControlMap = exports.xflowDefaultControls = void 0;
var string_input_1 = require("./string-input");
var checkbox_1 = require("./checkbox");
var text_area_1 = require("./text-area");
var select_1 = require("./select");
var datetime_1 = require("./datetime");
var float_1 = require("./float");
var interface_1 = require("../../interface");
exports.xflowDefaultControls = [
    [interface_1.ControlShape.INPUT, string_input_1.StringInput],
    [interface_1.ControlShape.CHECKBOX, checkbox_1.Checkbox],
    [interface_1.ControlShape.TEXTAREA, text_area_1.TextArea],
    [interface_1.ControlShape.DATETIME, datetime_1.Datetime],
    [interface_1.ControlShape.SELECT, select_1.Select],
    [interface_1.ControlShape.FLOAT, float_1.Float],
];
var makeControlMap = function (controls) {
    var controlMap = new Map();
    controls.forEach(function (item) {
        var key = item[0], control = item[1];
        var uuid = key.toLowerCase();
        if (controlMap.has(uuid)) {
            console.error("".concat(key, " is duplicated in controlMap:"), controlMap);
        }
        controlMap.set(uuid, control);
    });
    return controlMap;
};
exports.makeControlMap = makeControlMap;
var getControlFromMap = function (key, controlMap, defaultControl) {
    if (defaultControl === void 0) { defaultControl = string_input_1.StringInput; }
    if (controlMap.has(key)) {
        return controlMap.get(key);
    }
    var uuid = key.toLowerCase();
    if (controlMap.has(uuid)) {
        return controlMap.get(uuid);
    }
    console.warn("".concat(key, " is not exist in controlmap, fallback to defaultControl"));
    return defaultControl;
};
exports.getControlFromMap = getControlFromMap;
//# sourceMappingURL=index.js.map