'use client';

import { useState } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../sidebar';

import { OutlineButton } from '../../button';

import ButtonGroup from '../../button-group';

import AddVariableWorkflowSidebar from './add-variable-workflow-sidebar';
import ViewVariableWorkflowSidebar from './view-variable-workflow-sidebar';
import EditVariableWorkflowSidebar from './edit-variable-workflow-sidebar';
import DeleteVariableWorkflowSidebar from './delete-variable-workflow-sidebar';

export default function VariablesWorkflowSidebar({
    workflowVersion,
    onCloseButtonClick,
}) {
    const [addVariable, setAddVariable] = useState(false);
    const [viewVariable, setViewVariable] = useState(null);
    const [editVariable, setEditVariable] = useState(null);
    const [deleteVariable, setDeleteVariable] = useState(null);

    const findVariableById = (variableId) => {
        return workflowVersion.variables.find(variable => variable.id === variableId);
    };

    const clearViewVariable = () => {
        setViewVariable(null);
    };

    const clearEditVariable = () => {
        setEditVariable(null);
    };

    const clearDeleteVariable = () => {
        setDeleteVariable(null);
    };

    const onAddVariableButtonClick = () => {
        setAddVariable(true);
    };

    const onCancelAddVariableButtonClick = () => {
        setAddVariable(false);
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

            {addVariable && (
                <AddVariableWorkflowSidebar
                    onCancelButtonClick={onCancelAddVariableButtonClick} />
            )}

            {viewVariable && (
                <ViewVariableWorkflowSidebar
                    variable={viewVariable}
                    onBackButtonClick={clearViewVariable} />
            )}

            {editVariable && (
                <EditVariableWorkflowSidebar
                    variable={editVariable}
                    onCancelButtonClick={clearEditVariable}
                    onSuccess={clearEditVariable} />
            )}

            {deleteVariable && (
                <DeleteVariableWorkflowSidebar
                    variable={deleteVariable}
                    onCancelButtonClick={clearDeleteVariable}
                    onSuccess={clearDeleteVariable} />
            )}
        </>
    );
}
