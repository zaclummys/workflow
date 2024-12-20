'use client';

import { useState, useEffect, useReducer } from 'react';

import WorkflowVersionEditorHeader from './workflow-version-editor-header';
import WorkflowVersionEditorCanvas from './workflow-version-editor-canvas';
import WorkflowVersionEditorSidebar from './workflow-version-editor-sidebar';

import workflowVersionEditorReducer from './workflow-version-editor-reducer';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const initialWorkflowVersionEditor = {
        workflowVersion,
        workflowVersionSidebar: null,
    };

    const [workflowVersionEditor, dispatchWorflowVersionEditor] = useReducer(
        workflowVersionEditorReducer,
        initialWorkflowVersionEditor,
    );

    useEffect(() => {
        if (workflowVersion != workflowVersionEditor.workflowVersion) {
            dispatchWorflowVersionEditor({ type: 'workflow-version-reseted', workflowVersion });
        }
    }, [workflowVersion]);

    const handleElementSelect = (element) => {
        dispatchWorflowVersionEditor({ type: 'element-selected', element });
    };

    const handleElementAdd = (element) => {
        dispatchWorflowVersionEditor({ type: 'element-added', element });
    };

    const handleElementConnect = ({
        sourceElementId,
        targetElementId,
        connectionType,
    }) => {
        dispatchWorflowVersionEditor({
            type: 'element-connected',
            sourceElementId,
            targetElementId,
            connectionType,
        });
    };

    const handleElementDisconnect = ({
        elementId,
        connectionType,
    }) => {
        dispatchWorflowVersionEditor({
            type: 'element-disconnected',
            elementId,
            connectionType,
        });
    };

    const handleElementMove = ({ elementId, positionX, positionY }) => {
        dispatchWorflowVersionEditor({ type: 'element-moved', elementId, positionX, positionY });
    };

    const handleElementRemove = (elementId) => {
        dispatchWorflowVersionEditor({ type: 'element-removed', elementId });
    };

    const handleVariablesButtonClick = () => {
        dispatchWorflowVersionEditor({ type: 'show-variables-sidebar-opened' });
    }

    const handleShowVariablesCloseButtonClick = () => {
        dispatchWorflowVersionEditor({ type: 'show-variables-sidebar-closed' });
    }

    const handleAddVariableButtonClick = () => {
        dispatchWorflowVersionEditor({ type: 'add-variable-sidebar-opened' });
    }

    const handleEditVariableButtonClick = (event, variable) => {
        dispatchWorflowVersionEditor({ type: 'edit-variable-sidebar-opened', variable });
    }

    const handleEditVariableCancel = () => {
        dispatchWorflowVersionEditor({ type: 'edit-variable-canceled' });
    }

    const handleRemoveVariableButtonClick = (event, variable) => {
        dispatchWorflowVersionEditor({ type: 'remove-variable-sidebar-opened', variable });
    };

    const handleRemoveVariableCancel = () => {
        dispatchWorflowVersionEditor({ type: 'remove-variable-canceled' });
    }
    
    const handleAddVariableConfirm = (addedVariable) => {
        dispatchWorflowVersionEditor({
            type: 'add-variable-confirmed',
            addedVariable: {
                ...addedVariable,
                id: crypto.randomUUID(),
            },
        });
    }

    const handleAddVariableCancel = () => {
        dispatchWorflowVersionEditor({ type: 'add-variable-canceled' });
    }

    const handleEditVariableConfirm = (editedVariable) => {
        dispatchWorflowVersionEditor({
            type: 'edit-variable-confirmed',
            editedVariable,
        });
    }

    const handleRemoveVariableConfirm = (removedVariable) => {
        dispatchWorflowVersionEditor({
            type: 'remove-variable-confirmed',
            removedVariable,
        });
    }

    const handleEditElementConfirm = (editedElement) => {
        dispatchWorflowVersionEditor({
            type: 'edit-element-confirmed',
            editedElement,
        });
    }

    const handleEditElementCancel = () => {
        dispatchWorflowVersionEditor({ type: 'edit-element-canceled' });
    }

    const localWorkflowVersionIsSame = workflowVersion === workflowVersionEditor.workflowVersion;

    return (
        <div className="flex flex-col h-screen">
            <WorkflowVersionEditorHeader
                disableSaveButton={localWorkflowVersionIsSame}
                disableToggleButton={!localWorkflowVersionIsSame}
                workflowVersion={workflowVersionEditor.workflowVersion}
                onVariablesButtonClick={handleVariablesButtonClick}
                dispatchWorkflowVersion={dispatchWorflowVersionEditor}
            />

            <div className="w-full h-full relative">
                <WorkflowVersionEditorCanvas
                    onElementSelect={handleElementSelect}
                    onElementAdd={handleElementAdd}
                    onElementRemove={handleElementRemove}
                    onElementConnect={handleElementConnect}
                    onElementDisconnect={handleElementDisconnect}
                    onElementMove={handleElementMove}
                    workflowVersion={workflowVersionEditor.workflowVersion}
                    dispatchWorkflowVersion={dispatchWorflowVersionEditor}
                />

                {workflowVersionEditor.workflowVersionSidebar && (
                    <WorkflowVersionEditorSidebar
                        sidebar={workflowVersionEditor.workflowVersionSidebar}
                        variables={workflowVersionEditor.workflowVersion.variables}

                        onAddVariableButtonClick={handleAddVariableButtonClick}
                        onEditVariableButtonClick={handleEditVariableButtonClick}
                        onRemoveVariableButtonClick={handleRemoveVariableButtonClick}

                        onAddVariableConfirm={handleAddVariableConfirm}
                        onAddVariableCancel={handleAddVariableCancel}

                        onEditVariableConfirm={handleEditVariableConfirm}
                        onEditVariableCancel={handleEditVariableCancel}

                        onRemoveVariableConfirm={handleRemoveVariableConfirm}
                        onRemoveVariableCancel={handleRemoveVariableCancel}

                        onEditElementConfirm={handleEditElementConfirm}
                        onEditElementCancel={handleEditElementCancel}

                        onElementRemove={handleElementRemove}

                        onShowVariablesCloseButtonClick={handleShowVariablesCloseButtonClick}
                    />
                )}
            </div>
        </div>
    );
}
