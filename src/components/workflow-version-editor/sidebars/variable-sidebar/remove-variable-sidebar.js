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

export function RemoveVariableSidebarButton ({
    variable,
    onRemoveVariable,
}) {
    const [open, setOpen] = useState(false);

    const handleButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleConfirmButtonClick = (event) => {
        setOpen(false);

        onRemoveVariable(variable);
    }

    return (
        <>
            <OutlineButton
                onClick={handleButtonClick}>
                Remove
            </OutlineButton>

            {open && (
                <RemoveVariableSidebar
                    variable={variable}
                    onConfirmButtonClick={handleConfirmButtonClick}
                    onCancelButtonClick={handleCancelButtonClick}
                />
            )}
        </>
    );
}

export function RemoveVariableSidebar ({
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