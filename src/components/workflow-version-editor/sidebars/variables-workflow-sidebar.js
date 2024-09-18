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

export default function VariablesWorkflowSidebar({
    workflowVersion,
    onCloseButtonClick,
}) {
    const findVariableById = (variableId) => {
        return workflowVersion.variables.find(variable => variable.id === variableId);
    };

    const onViewVariableButtonClick = (event) => {
        const variable = findVariableById(event.target.dataset.variableId);

        if (variable) {
            setViewVariable(variable);
        }
    };

    const onEditVariableButtonClick = (event) => {
        const variable = findVariableById(event.target.dataset.variableId);

        if (variable) {
            setEditVariable(variable);
        }
    };

    const onDeleteVariableButtonClick = (event) => {
        const variable = findVariableById(event.target.dataset.variableId);

        if (variable) {
            setDeleteVariable(variable);
        }
    };

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <OutlineButton>
                        Add
                    </OutlineButton>
                </SidebarHeader>

                <SidebarContent>
                    <div className="flex flex-col gap-2">
                        {workflowVersion.variables.map((variable) => (
                            <div
                                key={variable.id}
                                className="flex flex-row justify-between items-center">
                                <span>{variable.name}</span>

                                {workflowVersion.status === 'draft' ? (
                                    <ButtonGroup>
                                        <OutlineButton
                                            data-variable-id={variable.id}
                                            onClick={onEditVariableButtonClick}>
                                            Edit
                                        </OutlineButton>

                                        <OutlineButton
                                            data-variable-id={variable.id}
                                            onClick={onDeleteVariableButtonClick}>
                                            Delete
                                        </OutlineButton>
                                    </ButtonGroup>
                                ) : (
                                    <OutlineButton
                                        data-variable-id={variable.id}
                                        onClick={onViewVariableButtonClick}>
                                        View
                                    </OutlineButton>
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

            {/*{addVariable && (*/}
            {/*    <AddVariableWorkflowSidebar*/}
            {/*        onCancelButtonClick={onCancelAddVariableButtonClick} />*/}
            {/*)}*/}
            
            {/*{viewVariable && (*/}
            {/*    <ViewVariableWorkflowSidebar*/}
            {/*        variable={viewVariable}*/}
            {/*        onBackButtonClick={clearViewVariable} />*/}
            {/*)}*/}
            
            {/*{editVariable && (*/}
            {/*    <EditVariableWorkflowSidebar*/}
            {/*        variable={editVariable}*/}
            {/*        onCancelButtonClick={clearEditVariable}*/}
            {/*        onSuccess={clearEditVariable} />*/}
            {/*)}*/}
            
            {/*{deleteVariable && (*/}
            {/*    <DeleteVariableWorkflowSidebar*/}
            {/*        variable={deleteVariable}*/}
            {/*        onCancelButtonClick={clearDeleteVariable}*/}
            {/*        onSuccess={clearDeleteVariable} />*/}
            {/*)}*/}
        </>
    );
}
