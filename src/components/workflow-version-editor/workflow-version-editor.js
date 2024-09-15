'use client';

import {useCallback, useState} from 'react';

import WorkflowVersionCanvas from '~/components/workflow-version-editor/workflow-version-canvas';
import VariablesWorkflowSidebar from '~/components/workflow-version-editor/sidebars/variables-workflow-sidebar';

export default function WorkflowVersionEditor ({
    workflowVersion
}) {
    const handleCanvasElementClick = () => {};
    
    return (
        <>
            <WorkflowVersionCanvas
                onCanvasElementClick={handleCanvasElementClick}
                workflowVersion={workflowVersion} />

            {true && (
                <VariablesWorkflowSidebar
                    workflowVersion={workflowVersion} />
            )}
        </>
    )
}