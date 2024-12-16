import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { DestructiveButton, OutlineButton } from '~/components/button';

export default function RemoveVariableSidebar ({
    variable,
    onConfirm,
    onCancel,
}) {
    const handleConfirmButtonClick = () => {
        onConfirm(variable);
    }

    const handleCancelButtonClick = () => {
        onCancel();
    }

    return (
        <Sidebar>
            <SidebarTitle>
                Remove Variable
            </SidebarTitle>

            <SidebarContent>
                <span>
                    Are you sure you want to remove <span className="font-semibold">{variable.name}</span>?
                </span>
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={handleCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <DestructiveButton
                    onClick={handleConfirmButtonClick}>
                    Confirm
                </DestructiveButton>
            </SidebarFooter>
        </Sidebar>
    );
}