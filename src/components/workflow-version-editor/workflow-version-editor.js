'use client';

import { useState } from 'react';

import WorkflowVersionCanvas from './workflow-version-canvas';
import WorkflowVersionEditorHeader from './workflow-version-editor-header';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const [localWorkflowVersionHasChanged, setLocalWorkflowVersionHasChanged] = useState(false);
    const [localWorkflowVersion, setLocalWorkflowVersion] = useState(workflowVersion);

    const handleAddVariable = (addedVariable) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.concat({
                ...addedVariable,
                id: crypto.randomUUID(),
            }),
        }));
    }

    const handleEditVariable = (editedVariable) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.map(variable => (
                variable.id === editedVariable.id ? editedVariable : variable
            )),
        }));
    }

    const handleRemoveVariable = (removedVariable) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.filter(variable => (
                variable.id !== removedVariable.id
            )),
        }));
    }

    const handleAddElement = (element) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            elements: localWorkflowVersion.elements.concat(element),
        }));
    }

    const handleEditElement = (elementId, elementChanges) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            elements: localWorkflowVersion.elements.map(element => {
                if (element.id === elementId) {
                    return {
                        ...element,
                        ...elementChanges,
                    };
                } else {
                    return element;
                }
            })
        }));
    }

    const handleRemoveElement = (elementId, elementChanges) => {
        setLocalWorkflowVersionHasChanged(true);
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            elements: localWorkflowVersion.elements.filter(element => element.id !== elementId),
        }));
    }

    const handleSave = (success) => {
        if (success) {
            setLocalWorkflowVersionHasChanged(false);
        } else {
            setLocalWorkflowVersionHasChanged(true);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <WorkflowVersionEditorHeader
                localWorkflowVersion={localWorkflowVersion}
                localWorkflowVersionHasChanged={localWorkflowVersionHasChanged}
                onSave={handleSave}
            />

            <WorkflowVersionCanvas
                localWorkflowVersion={localWorkflowVersion}
                onAddVariable={handleAddVariable}
                onEditVariable={handleEditVariable}
                onRemoveVariable={handleRemoveVariable}
                onAddElement={handleAddElement}
                onEditElement={handleEditElement}
                onRemoveElement={handleRemoveElement}
            />
        </div>
    );
}
