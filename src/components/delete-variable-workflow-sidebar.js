import {
    WorkflowVersionSidebar,
    WorkflowVersionSidebarTitle,
    WorkflowVersionSidebarContent,
    WorkflowVersionSidebarFooter,
} from './workflow-version-sidebar';

import { DestructiveButton, OutlineButton } from './button';

export default function DeleteVariableWorkflowSidebar ({
    variableId,
    workflowVersion,

    onCancelButtonClick,
    onSuccess,
}) {
    const variable = workflowVersion.variables.find(variable => variable.id === variableId);

    if (!variable) {
        return null;
    }

    return (
        <WorkflowVersionSidebar>
            <WorkflowVersionSidebarTitle>
                Delete Variable
            </WorkflowVersionSidebarTitle>

            <WorkflowVersionSidebarContent>
                <span>
                    Are you sure you want to delete <span className="font-medium">{variable.name}</span>?
                </span>
            </WorkflowVersionSidebarContent>

            <WorkflowVersionSidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <DestructiveButton
                    onClick={() => onSuccess()}>
                    Confirm
                </DestructiveButton>
            </WorkflowVersionSidebarFooter>
        </WorkflowVersionSidebar>
    );
}