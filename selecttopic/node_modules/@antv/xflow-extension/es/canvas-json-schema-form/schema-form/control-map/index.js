import { StringInput } from './string-input';
import { Checkbox } from './checkbox';
import { TextArea } from './text-area';
import { Select } from './select';
import { Datetime } from './datetime';
import { Float } from './float';
import { ControlShape } from '../../interface';
export const xflowDefaultControls = [
    [ControlShape.INPUT, StringInput],
    [ControlShape.CHECKBOX, Checkbox],
    [ControlShape.TEXTAREA, TextArea],
    [ControlShape.DATETIME, Datetime],
    [ControlShape.SELECT, Select],
    [ControlShape.FLOAT, Float],
];
export const makeControlMap = (controls) => {
    const controlMap = new Map();
    controls.forEach(item => {
        const [key, control] = item;
        const uuid = key.toLowerCase();
        if (controlMap.has(uuid)) {
            console.error(`${key} is duplicated in controlMap:`, controlMap);
        }
        controlMap.set(uuid, control);
    });
    return controlMap;
};
export const getControlFromMap = (key, controlMap, defaultControl = StringInput) => {
    if (controlMap.has(key)) {
        return controlMap.get(key);
    }
    const uuid = key.toLowerCase();
    if (controlMap.has(uuid)) {
        return controlMap.get(uuid);
    }
    console.warn(`${key} is not exist in controlmap, fallback to defaultControl`);
    return defaultControl;
};
//# sourceMappingURL=index.js.map