import React from 'react';
import { MenubarItem } from './item';
export declare class Menubar extends React.PureComponent<Menubar.Props, Menubar.State> {
    private removeDocClickEvent;
    constructor(props: Menubar.Props);
    componentWillUnmount(): void;
    onDocumentClick: () => void;
    unbindDocEvent(): void;
    activeMenubar: () => void;
    render(): JSX.Element;
}
export declare namespace Menubar {
    const Item: React.SFC<MenubarItem.Props>;
    interface Props {
        prefixCls?: string;
        className?: string;
        extra?: React.ReactNode;
    }
    interface State {
        active?: boolean;
    }
    const defaultProps: Props;
}
