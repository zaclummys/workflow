'use client';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../sidebar';

import { OutlineButton } from '../../button';

import ButtonGroup from '../../button-group';

import { ViewVariableSidebarButton } from './variable-sidebar/view-variable-sidebar';
import { AddVariableSidebarButton } from './variable-sidebar/add-variable-sidebar';
import { EditVariableSidebarButton } from './variable-sidebar/edit-variable-sidebar';
import { RemoveVariableSidebarButton } from './variable-sidebar/remove-variable-sidebar';

export default function VariablesSidebar ({
    localWorkflowVersion,
    onAddVariable,
    onEditVariable,
    onRemoveVariable,
    onCloseButtonClick,
}) {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <AddVariableSidebarButton
                        onAddVariable={onAddVariable} />
                </SidebarHeader>

                <SidebarContent>
                    <div className="flex flex-col gap-2">
                        {localWorkflowVersion.variables.map((variable) => (
                            <div
                                key={variable.id}
                                className="flex flex-row justify-between items-center"
                            >
                                <span>{variable.name}</span>

                                {localWorkflowVersion.status === 'draft' ? (
                                    <ButtonGroup>
                                        <EditVariableSidebarButton
                                            variable={variable}
                                            onEditVariable={onEditVariable}
                                        />

                                        <RemoveVariableSidebarButton
                                            variable={variable}
                                            onRemoveVariable={onRemoveVariable}
                                        />
                                    </ButtonGroup>
                                ) : (
                                    <ViewVariableSidebarButton
                                        variable={variable}
                                    />
                                )}
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


