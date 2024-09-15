import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../sidebar';

import { DestructiveButton, OutlineButton } from '../../button';

export default function DeleteVariableWorkflowSidebar ({
    variable,
    onCancelButtonClick,
    onSuccess,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Delete Variable
            </SidebarTitle>

            <SidebarContent>
                <span>
                    Are you sure you want to delete <span className="font-medium">{variable.name}</span>?
                </span>
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <DestructiveButton
                    onClick={() => onSuccess()}>
                    Confirm
                </DestructiveButton>
            </SidebarFooter>
        </Sidebar>
    );
}