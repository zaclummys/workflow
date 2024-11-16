'use client';

import { useState, useEffect, useReducer } from 'react';

import WorkflowVersionEditorHeader from './workflow-version-editor-header';
import WorkflowVersionEditorCanvas from './workflow-version-editor-canvas';
import WorkflowVersionEditorSidebar from './workflow-version-editor-sidebar';

import workflowVersionEditorReducer from './workflow-version-editor-reducer';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const initialWorkflowVersionEditor = {
        sidebar: null,
        workflowVersion,
    };

    const [workflowVersionEditor, dispatchWorflowVersionEditor] = useReducer(
        workflowVersionEditorReducer,
        initialWorkflowVersionEditor,
    );

    const localWorkflowVersion = workflowVersionEditor.workflowVersion;

    // useEffect(() => {
    //     dispatchLocalWorkflowVersion({ type: 'reset', workflowVersion });
    // }, [workflowVersion]);

    const handleCanvasNodeDoubleClick = (event, node) => {
        const element = localWorkflowVersion.elements.find(element => element.id === node.id);

        if (element != null) {
            dispatchWorflowVersionEditor({ type: 'edit-element', element });
        }
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

    const localWorkflowVersionIsSame = localWorkflowVersion === workflowVersion;

    return (
        <div className="flex flex-col h-screen">
            <WorkflowVersionEditorHeader
                disableSaveButton={localWorkflowVersionIsSame}
                disableToggleButton={!localWorkflowVersionIsSame}
                workflowVersion={localWorkflowVersion}
                onVariablesButtonClick={handleVariablesButtonClick}
                dispatchWorkflowVersion={dispatchWorflowVersionEditor}
            />

            <div className="w-full h-full relative">
                {/* <WorkflowVersionEditorCanvas
                    onNodeDoubleClick={handleCanvasNodeDoubleClick}

                    workflowVersion={localWorkflowVersion}
                    dispatchWorkflowVersion={dispatchWorflowVersionEditor}
                /> */}

                {workflowVersionEditor.workflowVersionSidebar && (
                    <WorkflowVersionEditorSidebar
                        sidebar={workflowVersionEditor.workflowVersionSidebar}
                        variables={workflowVersionEditor.workflowVersion.variables}

                        onAddVariableButtonClick={handleAddVariableButtonClick}
                        onEditVariableButtonClick={handleEditVariableButtonClick}
                        onRemoveVariableButtonClick={handleRemoveVariableButtonClick}

                        onAddVariableConfirm={handleAddVariableConfirm}

                        onEditVariableConfirm={handleEditVariableConfirm}
                        onEditVariableCancel={handleEditVariableCancel}

                        onRemoveVariableConfirm={handleRemoveVariableConfirm}
                        onRemoveVariableCancel={handleRemoveVariableCancel}

                        onShowVariablesCloseButtonClick={handleShowVariablesCloseButtonClick}
                    />
                )}
            </div>
        </div>
    );
}
