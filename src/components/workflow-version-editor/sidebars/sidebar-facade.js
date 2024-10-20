import AllVariablesSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/all-variables-sidebar';

import AssignSidebar from '~/components/workflow-version-editor/sidebars/element-sidebars/assign-sidebar';
import IfSidebar from '~/components/workflow-version-editor/sidebars/element-sidebars/if-sidebar';

export default function SidebarFacade ({
    elementId,
    workflowVersion,
    onCloseButtonClick,
    dispatchWorkflowVersion,
}) {
    const element = workflowVersion.elements.find(element => element.id === elementId);

    switch (element.type) {
        case 'start':
            return (
                <AllVariablesSidebar
                    workflowVersion={workflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'assign':
            return (
                <AssignSidebar
                    assignElement={element}
                    workflowVersion={workflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );

        case 'if':
            return (
                <IfSidebar
                    ifElement={element}
                    workflowVersion={workflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            );
    }
}