'use client';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { OutlineButton } from '~/components/button';

import ButtonGroup from '~/components/button-group';

import AddVariableSidebarButton from '~/components/workflow-version-editor/sidebar-buttons/add-variable-sidebar-button';
import EditVariableSidebarButton from '~/components/workflow-version-editor/sidebar-buttons/edit-variable-sidebar-button';
import RemoveVariableSidebarButton from '~/components/workflow-version-editor/sidebar-buttons/remove-variable-sidebar-button';

export default function AllVariablesSidebar ({
    workflowVersion,
    onCloseButtonClick,
    dispatchWorkflowVersion,
}) {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <AddVariableSidebarButton
                        dispatchWorkflowVersion={dispatchWorkflowVersion}
                    />
                </SidebarHeader>

                <SidebarContent>
                    <div className="flex flex-col gap-2">
                        {workflowVersion.variables.map((variable) => (
                            <div
                                key={variable.id}
                                className="flex flex-row justify-between items-center"
                            >
                                <span>{variable.name}</span>

                                <ButtonGroup>
                                    <EditVariableSidebarButton
                                        variable={variable}
                                        dispatchWorkflowVersion={dispatchWorkflowVersion}
                                    />

                                    <RemoveVariableSidebarButton
                                        variable={variable}
                                        dispatchWorkflowVersion={dispatchWorkflowVersion}
                                    />
                                </ButtonGroup>
                            </div>
                        ))}
                    </div>
                </SidebarContent>

                <SidebarFooter>
                    <OutlineButton
                        onClick={onCloseButtonClick}>
                        Close
                    </OutlineButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}