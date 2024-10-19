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

import { AddVariableSidebarButton } from './variable-sidebar/add-variable-sidebar';
import { EditVariableSidebarButton } from './variable-sidebar/edit-variable-sidebar';
import { RemoveVariableSidebarButton } from './variable-sidebar/remove-variable-sidebar';

export default function VariablesSidebar ({
    workflowVersion,
    onCloseButtonClick,
}) {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <AddVariableSidebarButton />
                </SidebarHeader>

                <SidebarContent>
                    <VariableList
                        variables={workflowVersion.variables}
                    />
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

function VariableList ({
    variables,
}) {
    return (
        <div className="flex flex-col gap-2">
            {variables.map((variable) => (
                <div
                    key={variable.id}
                    className="flex flex-row justify-between items-center"
                >
                    <span>{variable.name}</span>

                    <ButtonGroup>
                        <EditVariableSidebarButton
                            variable={variable}
                        />

                        <RemoveVariableSidebarButton
                            variable={variable}
                        />
                    </ButtonGroup>
                </div>
            ))}
        </div>
    );
}