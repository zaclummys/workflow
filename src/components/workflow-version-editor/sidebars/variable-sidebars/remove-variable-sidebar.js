import {
    useId,
    useState,
} from 'react';

import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { DestructiveButton, OutlineButton } from '~/components/button';

export default function RemoveVariableSidebar ({
    variableId,

    onVariableRemoved,
    onCancelButtonClick,

    workflowVersion,
    dispatchWorkflowVersion,
}) {
    const variable = workflowVersion.variables.find(variable => variable.id === variableId);

    const handleConfirmButtonClick = () => {
        dispatchWorkflowVersion({
            type: 'variable-removed',
            variableId: variableId,
        });

        onVariableRemoved();
    }

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
                    onClick={handleConfirmButtonClick}>
                    Confirm
                </DestructiveButton>
            </SidebarFooter>
        </Sidebar>
    );
}