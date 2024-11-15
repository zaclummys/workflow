'use client';

import { useState, useEffect, useReducer } from 'react';

import WorkflowVersionEditorHeader from './workflow-version-editor-header';
import WorkflowVersionEditorCanvas from './workflow-version-editor-canvas';
import WorkflowVersionEditorSidebar from './workflow-version-editor-sidebar';

import workflowVersionReducer from './workflow-version-reducer';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const [localWorkflowVersion, dispatchLocalWorkflowVersion] = useReducer(
        workflowVersionReducer,
        workflowVersion,
    );

    useEffect(() => {
        dispatchLocalWorkflowVersion({ type: 'reset', workflowVersion });
    }, [workflowVersion]);

    const [sidebar, setSidebar] = useState(null);

    const handleCloseButtonClick = () => {
        setSidebar(null);
    };

    const handleVariablesButtonClick = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleAddVariableButtonClick = () => {
        setSidebar({ type: 'add-variable' });
    };

    const handleRemoveVariableButtonClick = (event, variableId) => {
        setSidebar({ type: 'remove-variable', variableId });
    };

    const handleEditVariableButtonClick = (event, variableId) => {
        setSidebar({ type: 'edit-variable', variableId });
    };
    
    const handleCancelAddVariableButtonClick = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleCancelEditVariableButtonClick = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleCancelRemoveVariableButtonClick = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleVariableAdded = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleVariableEdited = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleVariableRemoved = () => {
        setSidebar({ type: 'all-variables' });
    };

    const handleCanvasNodeDoubleClick = (event, node) => {
        switch (node.type) {
            case 'if': {
                setSidebar({ type: 'if-element', elementId: node.id });
            }
            break;

            case 'assign': {
                setSidebar({ type: 'assign-element', elementId: node.id });
            }
            break;
        }
    };

    const handleIfElementEdited = () => {
        setSidebar(null);
    };

    const handleAssignElementEdited = () => {
        setSidebar(null);
    };

    const localWorkflowVersionIsSame = localWorkflowVersion === workflowVersion;

    return (
        <div className="flex flex-col h-screen">
            <WorkflowVersionEditorHeader
                disableSaveButton={localWorkflowVersionIsSame}
                disableToggleButton={!localWorkflowVersionIsSame}
                workflowVersion={localWorkflowVersion}
                onVariablesButtonClick={handleVariablesButtonClick}
                dispatchWorkflowVersion={dispatchLocalWorkflowVersion}
            />

            <div className="w-full h-full relative">
                <WorkflowVersionEditorCanvas
                    onNodeDoubleClick={handleCanvasNodeDoubleClick}

                    workflowVersion={localWorkflowVersion}
                    dispatchWorkflowVersion={dispatchLocalWorkflowVersion}
                />

                <WorkflowVersionEditorSidebar
                    sidebar={sidebar}

                    onVariableAdded={handleVariableAdded}
                    onVariableEdited={handleVariableEdited}
                    onVariableRemoved={handleVariableRemoved}

                    onAddVariableButtonClick={handleAddVariableButtonClick}
                    onEditVariableButtonClick={handleEditVariableButtonClick}
                    onRemoveVariableButtonClick={handleRemoveVariableButtonClick}

                    onCancelAddVariableButtonClick={handleCancelAddVariableButtonClick}
                    onCancelEditVariableButtonClick={handleCancelEditVariableButtonClick}
                    onCancelRemoveVariableButtonClick={handleCancelRemoveVariableButtonClick}

                    onIfElementEdited={handleIfElementEdited}
                    onAssignElementEdited={handleAssignElementEdited}

                    onCloseButtonClick={handleCloseButtonClick}

                    workflowVersion={localWorkflowVersion}
                    dispatchWorkflowVersion={dispatchLocalWorkflowVersion}
                />
            </div>
        </div>
    );
}
