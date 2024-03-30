import { isEmptyParamValue } from './form-item-wrapper/util';
// 根据 schema 生成表单的值
export function transformSchemaToValueList(schema) {
    const result = {};
    const { tabs = [] } = schema;
    tabs.forEach(tab => {
        const { groups = [] } = tab;
        groups.forEach(group => {
            const { controls = [] } = group;
            controls.forEach(control => {
                const { name, value, defaultValue } = control;
                if (['string', 'number'].includes(typeof name)) {
                    result[name.toString()] = isEmptyParamValue(value) ? defaultValue : value;
                }
            });
        });
    });
    return result;
}
//# sourceMappingURL=form-util.js.map