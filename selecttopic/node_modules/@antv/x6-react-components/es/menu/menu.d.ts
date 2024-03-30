import React from 'react';
import { MenuItem } from './item';
export declare class Menu extends React.PureComponent<Menu.Props> {
    private onClick;
    private registerHotkey;
    private unregisterHotkey;
    render(): JSX.Element;
}
export declare namespace Menu {
    const Item: React.SFC<MenuItem.Props>;
    const Divider: React.SFC<{}>;
    const SubMenu: React.SFC<MenuItem.Props>;
    interface Props {
        prefixCls?: string;
        className?: string;
        hasIcon?: boolean;
        stopPropagation?: boolean;
        onClick?: (name: string) => void;
        registerHotkey?: (hotkey: string, handler: () => void) => void;
        unregisterHotkey?: (hotkey: string, handler: () => void) => void;
    }
    const defaultProps: Props;
}
