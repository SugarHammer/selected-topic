"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useAsync(fn) {
    var _a = (0, react_1.useState)({
        loading: true,
    }), state = _a[0], set = _a[1];
    var callback = (0, react_1.useCallback)(function () {
        fn().then(function (value) {
            set({
                loading: false,
                data: value,
            });
        }, function (error) {
            set({
                loading: false,
            });
            console.error(error);
        });
    }, [fn]);
    (0, react_1.useEffect)(function () {
        callback();
    }, [callback]);
    return state;
}
exports.default = useAsync;
//# sourceMappingURL=useAsync.js.map