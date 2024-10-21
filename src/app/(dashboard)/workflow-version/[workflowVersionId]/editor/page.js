import { notFound } from 'next/navigation';

import getWorkflowVersionAction from "~/actions/get-workflow-version-action";

import WorkflowVersionEditor from '~/components/workflow-version-editor/workflow-version-editor';

export default async function WorkflowVersionEditPage ({ params }) {
    const { workflowVersionId } = await params;

    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return notFound();
    }

    return (
        <WorkflowVersionEditor
            workflowVersion={workflowVersion}
        />
    );
}
