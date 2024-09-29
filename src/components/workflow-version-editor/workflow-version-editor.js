'use client';

import { useState, useEffect } from 'react';

import GoBack from '~/components/go-back';
import ButtonGroup from '~/components/button-group';
import WorkflowVersionStatus from "~/components/workflow-version-status";

import SaveWorkflowVersionButton from '~/components/save-workflow-version-button';
import ToggleWorkflowVersionButton from '~/components/toggle-workflow-version-button';

import WorkflowVersionCanvas from "./workflow-version-canvas";

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const [localWorkflowVersion, setLocalWorkflowVersion] = useState(workflowVersion);

    const handleAddVariable = (addedVariable) => {
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.concat({
                ...addedVariable,
                id: crypto.randomUUID(),
            }),
        }));
    }

    const handleEditVariable = (editedVariable) => {
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.map(variable => (
                variable.id === editedVariable.id ? editedVariable : variable
            )),
        }));
    }

    const handleRemoveVariable = (removedVariable) => {
        setLocalWorkflowVersion(localWorkflowVersion => ({
            ...localWorkflowVersion,
            variables: localWorkflowVersion.variables.filter(variable => (
                variable.id !== removedVariable.id
            )),
        }));
    }

    // Refresh local workflow version if workflow version received from props is updated
    useEffect(() => {
        setLocalWorkflowVersion(workflowVersion);
    }, [workflowVersion]);

    const hasLocalWorkflowVersionChanged = localWorkflowVersion !== workflowVersion;

    return (
        <div className="flex flex-col h-screen">
            <header className="flex flex-row items-center bg-surface-high text-on-surface px-6 py-2 h-20">
                <div className="flex flex-row flex-grow gap-6">
                    <GoBack url={`/workflow-version/${workflowVersion.id}`} />

                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row gap-2">
                            <span>
                                Version {workflowVersion.number}
                            </span>

                            <span className="text-on-surface-variant">/</span>

                            <span className="text-on-surface-variant">
                                {workflowVersion.workflow.name}
                            </span>
                        </div>

                        <WorkflowVersionStatus
                            status={workflowVersion.status} />
                    </div>
                </div>

                <ButtonGroup>
                    <SaveWorkflowVersionButton
                        localWorkflowVersion={localWorkflowVersion}
                        hasLocalWorkflowVersionChanged={hasLocalWorkflowVersionChanged}
                    />

                    <ToggleWorkflowVersionButton
                        disabled={hasLocalWorkflowVersionChanged}
                        workflowVersion={workflowVersion}
                    />
                </ButtonGroup>
            </header>

            <WorkflowVersionCanvas
                localWorkflowVersion={localWorkflowVersion}
                onAddVariable={handleAddVariable}
                onEditVariable={handleEditVariable}
                onRemoveVariable={handleRemoveVariable}
            />
        </div>
    );
}

