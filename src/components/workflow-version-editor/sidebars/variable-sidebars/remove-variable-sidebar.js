import {
    useId,
    useState,
} from 'react';

import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../../sidebar';

import { DestructiveButton, OutlineButton } from '../../../button';



export default function RemoveVariableSidebar ({
    variable,
    onConfirmButtonClick,
    onCancelButtonClick,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Delete Variable
            </SidebarTitle>

            <SidebarContent>
                <span>
                    Are you sure you want to delete <span className="font-semibold">{variable.name}</span>?
                </span>
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <DestructiveButton
                    onClick={onConfirmButtonClick}>
                    Confirm
                </DestructiveButton>
            </SidebarFooter>
        </Sidebar>
    );
}