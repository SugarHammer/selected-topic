"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version_1 = require("./version");
describe('version', function () {
    it('should match the `version` field of package.json', function () {
        // eslint-disable-next-line
        var expected = require('../../package.json').version;
        expect(version_1.version).toBe(expected);
    });
});
//# sourceMappingURL=version.test.js.map