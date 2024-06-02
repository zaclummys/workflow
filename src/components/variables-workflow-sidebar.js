'use client';

import { useState } from 'react';

import {
    WorkflowVersionSidebar,
    WorkflowVersionSidebarTitle,
    WorkflowVersionSidebarContent,
    WorkflowVersionSidebarFooter,
} from './workflow-version-sidebar';

import { OutlineButton } from './button';

import ButtonGroup from './button-group';

import EditVariableWorkflowSidebar from './edit-variable-workflow-sidebar';
import DeleteVariableWorkflowSidebar from './delete-variable-workflow-sidebar';

export default function VariablesWorkflowSidebar ({
    workflowVersion,
    onCloseButtonClick,
}) {
    const [editVariableId, setEditVariableId] = useState(null);
    const [deleteVariableId, setDeleteVariableId] = useState(null);

    const clearDeleteVariableId = () => {
        setDeleteVariableId(null);
    };

    const clearEditVariableId = () => {
        setEditVariableId(null);
    };

    const onEditVariableButtonClick = (event) => {
        setEditVariableId(event.target.dataset.variableId);
    };

    const onDeleteVariableButtonClick = (event) => {
        setDeleteVariableId(event.target.dataset.variableId);
    };

    return (
        <>
            <ViewVariablesWorkflowSidebar
                workflowVersion={workflowVersion}
                onEditVariableButtonClick={onEditVariableButtonClick}
                onDeleteVariableButtonClick={onDeleteVariableButtonClick}
                onCloseButtonClick={onCloseButtonClick} />

            {editVariableId && (
                <EditVariableWorkflowSidebar
                    workflowVersion={workflowVersion}
                    variableId={editVariableId}
                    onCancelButtonClick={clearEditVariableId}
                    onSuccess={clearEditVariableId} />
            )}

            {deleteVariableId && (
                <DeleteVariableWorkflowSidebar
                    workflowVersion={workflowVersion}
                    variableId={deleteVariableId}
                    onCancelButtonClick={clearDeleteVariableId}
                    onSuccess={clearDeleteVariableId} />
            )}
        </>
    );
}

function ViewVariablesWorkflowSidebar ({
    workflowVersion,
    onEditVariableButtonClick,
    onDeleteVariableButtonClick,
    onCloseButtonClick,
}) {
    return (
        <WorkflowVersionSidebar>
            <WorkflowVersionSidebarTitle>
                Variables
            </WorkflowVersionSidebarTitle>

            <WorkflowVersionSidebarContent>
                <div className="flex flex-col gap-2">
                    {workflowVersion.variables.map((variable) => (
                        <div
                            className="flex flex-row justify-between items-center"
                            key={variable.id}>
                            <div className="flex flex-row gap-2">
                                <span>{variable.name}</span>

                                <VariableType
                                    type={variable.type} />
                            </div>

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
                                <OutlineButton>
                                    View
                                </OutlineButton>
                            )}
                        </div>
                    ))}
                </div>
            </WorkflowVersionSidebarContent>

            <WorkflowVersionSidebarFooter>
                <OutlineButton
                    onClick={onCloseButtonClick}>
                    Close
                </OutlineButton>
            </WorkflowVersionSidebarFooter>
        </WorkflowVersionSidebar>
    );
}

function VariableType ({ type }) {
    switch (type) {
        case 'string':
            return (
                <span className="text-on-surface-variant">
                    String
                </span>
            );

        case 'number':
            return (
                <span className="text-on-surface-variant">
                    Number
                </span>
            );
        
        case 'boolean':
            return (
                <span className="text-on-surface-variant">
                    Boolean
                </span>
            );

        default:
            return null;
    }
}