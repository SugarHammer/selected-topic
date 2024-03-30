import React from 'react';
import { ToolbarItem } from './item';
import { ToolbarGroup } from './group';
export declare class Toolbar extends React.PureComponent<Toolbar.Props> {
    onClick: (key: string, value?: any) => void;
    render(): JSX.Element;
}
export declare namespace Toolbar {
    const Item: React.SFC<ToolbarItem.Props>;
    const Group: React.SFC<ToolbarGroup.Props>;
    interface Props {
        prefixCls?: string;
        className?: string;
        extra?: React.ReactNode;
        size?: 'small' | 'big';
        hoverEffect?: boolean;
        align?: 'left' | 'right';
        onClick?: (name: string, value?: any) => void;
    }
    const defaultProps: Props;
}
