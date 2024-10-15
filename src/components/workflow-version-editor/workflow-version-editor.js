'use client';

import { useState, useEffect } from 'react';

import GoBack from '~/components/go-back';
import ButtonGroup from '~/components/button-group';
import WorkflowVersionStatus from "~/components/workflow-version-status";

import SaveWorkflowVersionButton from '~/components/save-workflow-version-button';
import ToggleWorkflowVersionButton from '~/components/toggle-workflow-version-button';

import WorkflowVersionCanvas from "./workflow-version-canvas";

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
            <WorkflowVersionHeader
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

function WorkflowVersionHeader ({
    localWorkflowVersion,
    localWorkflowVersionHasChanged,
    onSave,
}) {
    return (
        <header className="flex flex-row items-center bg-surface-high text-on-surface px-6 py-2 h-20">
            <div className="flex flex-row flex-grow gap-6">
                <GoBack url={`/workflow-version/${localWorkflowVersion.id}`} />

                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-2">
                        <span>
                            Version {localWorkflowVersion.number}
                        </span>

                        <span className="text-on-surface-variant">/</span>

                        <span className="text-on-surface-variant">
                            {localWorkflowVersion.workflow.name}
                        </span>
                    </div>

                    <WorkflowVersionStatus
                        status={localWorkflowVersion.status}
                    />
                </div>
            </div>

            <ButtonGroup>
                <SaveWorkflowVersionButton
                    disabled={!localWorkflowVersionHasChanged}
                    workflowVersion={localWorkflowVersion}
                    onSave={onSave}
                />

                <ToggleWorkflowVersionButton
                    disabled={localWorkflowVersionHasChanged}
                    workflowVersion={localWorkflowVersion}
                />
            </ButtonGroup>
        </header>
    );
}