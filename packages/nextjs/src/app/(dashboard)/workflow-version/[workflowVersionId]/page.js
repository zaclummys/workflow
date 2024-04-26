import WorkflowVersionTemplate from "~/templates/workflow-version-template";

export const title = 'Workflow Version';

export default function WorkflowVersion () {
    return (
        <WorkflowVersionTemplate
            workflowVersion={workflowVersion} />
    );
}
