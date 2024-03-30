"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = exports.Position = exports.Size = exports.InputNumberFiled = exports.ColorPicker = exports.InputFiled = exports.EditorPanels = void 0;
var tslib_1 = require("tslib");
var input_1 = tslib_1.__importDefault(require("./input"));
exports.InputFiled = input_1.default;
var color_1 = tslib_1.__importDefault(require("./color"));
exports.ColorPicker = color_1.default;
var input_number_1 = tslib_1.__importDefault(require("./input-number"));
exports.InputNumberFiled = input_number_1.default;
var size_1 = tslib_1.__importDefault(require("./size"));
exports.Size = size_1.default;
var position_1 = tslib_1.__importDefault(require("./position"));
exports.Position = position_1.default;
var select_1 = tslib_1.__importDefault(require("./select"));
exports.SelectField = select_1.default;
exports.EditorPanels = {
    InputFiled: input_1.default,
    ColorPicker: color_1.default,
    InputNumberFiled: input_number_1.default,
    Size: size_1.default,
    Position: position_1.default,
    SelectField: select_1.default,
};
//# sourceMappingURL=index.js.map