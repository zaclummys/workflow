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

export default function AllVariablesSidebar ({
    workflowVersion,
    onAddVariableButtonClick,
    onEditVariableButtonClick,
    onRemoveVariableButtonClick,
    onCloseButtonClick,
}) {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <OutlineButton
                        onClick={onAddVariableButtonClick}>
                            Add
                    </OutlineButton>
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
                                    <OutlineButton
                                        onClick={event => onEditVariableButtonClick(event, variable.id)}>
                                        Edit
                                    </OutlineButton>

                                    <OutlineButton
                                        onClick={event => onRemoveVariableButtonClick(event, variable.id)}>
                                        Remove
                                    </OutlineButton>
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