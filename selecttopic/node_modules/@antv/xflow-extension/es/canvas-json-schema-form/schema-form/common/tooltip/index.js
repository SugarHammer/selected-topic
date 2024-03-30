import { __rest } from "tslib";
import React from 'react';
import { Tooltip as ATooltip } from 'antd';
export const Tooltip = props => {
    const { text } = props, otherProps = __rest(props, ["text"]);
    if (!text) {
        return null;
    }
    return (React.createElement(ATooltip, Object.assign({ placement: "left", title: text }, otherProps),
        React.createElement("div", { className: "text-truncate" }, text)));
};
// 渲染 FormItem 的 extra 项
export function renderFormItemExtra(text) {
    if (!text) {
        return undefined;
    }
    return React.createElement(Tooltip, { text: text });
}
//# sourceMappingURL=index.js.map