import React from 'react';
import { Dropdown } from '../dropdown';
export declare class ContextMenu extends React.PureComponent<ContextMenu.Props> {
    render(): JSX.Element;
}
export declare namespace ContextMenu {
    interface Props extends Dropdown.Props {
        menu: string | React.ReactNode;
    }
}
