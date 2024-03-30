"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeJsonSchemaFormCommand = exports.FormItemWrapper = exports.JsonSchemaForm = exports.NsJsonSchemaFormModel = exports.NsJsonSchemaForm = void 0;
var tslib_1 = require("tslib");
var main_1 = require("./main");
Object.defineProperty(exports, "JsonSchemaForm", { enumerable: true, get: function () { return main_1.JsonSchemaForm; } });
var schema_form_1 = require("./schema-form");
Object.defineProperty(exports, "FormItemWrapper", { enumerable: true, get: function () { return schema_form_1.FormItemWrapper; } });
var service_1 = require("./service");
Object.defineProperty(exports, "NsJsonSchemaFormModel", { enumerable: true, get: function () { return service_1.NsJsonSchemaFormModel; } });
Object.defineProperty(exports, "executeJsonSchemaFormCommand", { enumerable: true, get: function () { return service_1.executeJsonSchemaFormCommand; } });
var NsJsonSchemaForm = tslib_1.__importStar(require("./interface"));
exports.NsJsonSchemaForm = NsJsonSchemaForm;
//# sourceMappingURL=index.js.map