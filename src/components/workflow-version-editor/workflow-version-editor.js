'use client';

import { useReducer } from 'react';

import WorkflowVersionCanvas from './workflow-version-canvas';
import WorkflowVersionEditorHeader from './workflow-version-editor-header';

import workflowVersionReducer from '~/components/workflow-version-editor/workflow-version-reducer';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    const [localWorkflowVersion, dispatchLocalWorkflowVersion] = useReducer(
        workflowVersionReducer,
        workflowVersion,
    );

    return (
        <div className="flex flex-col h-screen">
            <WorkflowVersionEditorHeader
                disableSaveButton={false}
                disableToggleButton={true}
                workflowVersion={localWorkflowVersion}
            />

            <WorkflowVersionCanvas
                workflowVersion={localWorkflowVersion}
                dispatchWorkflowVersion={dispatchLocalWorkflowVersion}
            />
        </div>
    );
}
