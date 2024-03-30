"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCSS3DTransforms = exports.hasCSSTransforms = exports.hasCSSTransitions = exports.hasCSSAnimations = void 0;
var getVendorPrefix_1 = require("./getVendorPrefix");
var hasCSSAnimations = function () { return !!(0, getVendorPrefix_1.getVendorPrefix)('animationName'); };
exports.hasCSSAnimations = hasCSSAnimations;
var hasCSSTransitions = function () { return !!(0, getVendorPrefix_1.getVendorPrefix)('transition'); };
exports.hasCSSTransitions = hasCSSTransitions;
var hasCSSTransforms = function () { return !!(0, getVendorPrefix_1.getVendorPrefix)('transform'); };
exports.hasCSSTransforms = hasCSSTransforms;
var hasCSS3DTransforms = function () { return !!(0, getVendorPrefix_1.getVendorPrefix)('perspective'); };
exports.hasCSS3DTransforms = hasCSS3DTransforms;
//# sourceMappingURL=browserSupport.js.map