import AllVariablesSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/all-variables-sidebar';
import AddVariableSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/add-variable-sidebar';
import EditVariableSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/edit-variable-sidebar';
import RemoveVariableSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/remove-variable-sidebar';

import IfElementSidebar from '~/components/workflow-version-editor/sidebars/element-sidebars/if-element-sidebar';
import AssignElementSidebar from '~/components/workflow-version-editor/sidebars/element-sidebars/assign-element-sidebar';

export default function WorkflowVersionEditorSidebar ({
    sidebar,
    
    workflowVersion,
    dispatchWorkflowVersion,

    onAddVariableButtonClick,
    onEditVariableButtonClick,
    onRemoveVariableButtonClick,

    onCancelAddVariableButtonClick,
    onCancelEditVariableButtonClick,
    onCancelRemoveVariableButtonClick,

    onCloseButtonClick,

    onVariableAdded,
    onVariableEdited,
    onVariableRemoved,
}) {
    if (sidebar == null) return null;

    switch (sidebar.type) {
        case 'all-variables':
            return (
                <AllVariablesSidebar
                    onAddVariableButtonClick={onAddVariableButtonClick}
                    onEditVariableButtonClick={onEditVariableButtonClick}
                    onRemoveVariableButtonClick={onRemoveVariableButtonClick}
                    onCloseButtonClick={onCloseButtonClick}
                    
                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'add-variable':
            return (
                <AddVariableSidebar
                    onVariableAdded={onVariableAdded}
                    onCancelButtonClick={onCancelAddVariableButtonClick}

                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'edit-variable':
            return (
                <EditVariableSidebar
                    variableId={sidebar.variableId}
                    
                    onVariableEdited={onVariableEdited}
                    onCancelButtonClick={onCancelEditVariableButtonClick}

                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'remove-variable':
            return (
                <RemoveVariableSidebar
                    variableId={sidebar.variableId}
                    onVariableRemoved={onVariableRemoved}
                    onCancelButtonClick={onCancelRemoveVariableButtonClick}

                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'if-element':
            return (
                <IfElementSidebar
                    ifElementId={sidebar.elementId}
                    onCloseButtonClick={onCloseButtonClick}

                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'assign-element':
            return (
                <AssignElementSidebar
                    assignElementId={sidebar.elementId}
                    onCloseButtonClick={onCloseButtonClick}

                    workflowVersion={workflowVersion}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );
    }
}