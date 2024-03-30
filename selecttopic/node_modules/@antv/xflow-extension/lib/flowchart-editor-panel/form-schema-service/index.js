"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFormSchemaService = void 0;
var tslib_1 = require("tslib");
var defaultFormSchemaService = function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var targetType, isGroup, groupSchema, nodeSchema, edgeSchema;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        targetType = args.targetType;
        isGroup = (_a = args.targetData) === null || _a === void 0 ? void 0 : _a.isGroup;
        groupSchema = {
            tabs: [
                {
                    name: '设置',
                    groups: [
                        {
                            name: 'groupName',
                            controls: [
                                {
                                    label: '分组名',
                                    name: 'group-service',
                                    shape: 'group-service',
                                    placeholder: '分组名称',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        nodeSchema = {
            tabs: [
                {
                    name: '设置',
                    groups: [
                        {
                            name: 'groupName',
                            controls: [
                                {
                                    label: '节点名',
                                    name: 'node-service',
                                    shape: 'node-service',
                                    placeholder: '节点名称',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        edgeSchema = {
            tabs: [
                {
                    name: '设置',
                    groups: [
                        {
                            name: 'groupName',
                            controls: [
                                {
                                    label: '边',
                                    name: 'edge-service',
                                    shape: 'edge-service',
                                    placeholder: '边名称',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        if (isGroup) {
            return [2 /*return*/, groupSchema];
        }
        if (targetType === 'node') {
            return [2 /*return*/, nodeSchema];
        }
        if (targetType === 'edge') {
            return [2 /*return*/, edgeSchema];
        }
        return [2 /*return*/, {
                tabs: [
                    {
                        name: '设置',
                        groups: [
                            {
                                name: 'groupName',
                                controls: [
                                    {
                                        label: '',
                                        name: 'canvas-service',
                                        shape: 'canvas-service',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }];
    });
}); };
exports.defaultFormSchemaService = defaultFormSchemaService;
//# sourceMappingURL=index.js.map