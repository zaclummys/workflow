'use client';

import WorkflowVersionCanvas from '~/components/workflow-version-editor/workflow-version-canvas';

export default function WorkflowVersionEditor ({
    workflowVersion
}) {
    const handleCanvasElementClick = (event) => {
        console.log(event)
    };
    
    return (
        <>
            <WorkflowVersionCanvas
                onCanvasElementClick={handleCanvasElementClick}
                workflowVersion={workflowVersion} />
        </>
    )
}