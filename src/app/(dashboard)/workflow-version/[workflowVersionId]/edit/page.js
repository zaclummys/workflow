import Link from 'next/link';

import { ArrowLeftIcon } from "lucide-react";

import getWorkflowVersionAction from "~/actions/get-workflow-version-action";

import WorkflowVersionStatus from "~/components/workflow-version-status";
import WorkflowVersionEditor from "~/components/workflow-version-editor/workflow-version-editor";

import {
    ActivateWorkflowVersionButton,
    DeactivateWorkflowVersionButton,
} from "~/components/toggle-workflow-version-button";

export default async function EditWorkflowVersion ({ params: { workflowVersionId } }) {
    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return null;
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="flex flex-row items-center bg-surface text-on-surface px-6 py-2 h-20">
                <div className="flex flex-row flex-grow gap-6">
                    <GoBackLink
                        workflowVersionId={workflowVersionId} />

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

                {workflowVersion.status === 'active' ? (
                    <DeactivateWorkflowVersionButton
                        workflowVersionId={workflowVersion.id} />
                ) : (
                    <ActivateWorkflowVersionButton
                        workflowVersionId={workflowVersion.id} />
                )}
            </header>

            <WorkflowVersionEditor
                workflowVersion={workflowVersion} />
        </div>
    );
}

function GoBackLink ({ workflowVersionId }) {
    return (
        <Link
            title="Go back"
            href={`/workflow-version/${workflowVersionId}`}>
            <ArrowLeftIcon className="w-6 h-6" />
        </Link>
    );
}