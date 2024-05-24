import { ArrowLeftIcon } from "lucide-react";

import getWorkflowAction from "~/actions/get-workflow-action";
import getWorkflowVersionAction from "~/actions/get-workflow-version-action";

import WorkflowVersionStatus from "~/components/workflow-version-status";
import { OutlineButton, PrimaryButton } from "~/components/button";

import Link from 'next/link';
import ButtonGroup from "~/components/button-group";
import WorkflowVersionCanvas from "~/components/workflow-version-canvas";

export default async function EditWorkflowVersion ({ params: { workflowVersionId } }) {
    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return null;
    }

    const { workflow } = await getWorkflowAction(workflowVersion.workflowId);

    if (!workflow) {
        return null;
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="flex flex-row items-center bg-surface text-on-surface px-6 py-2 h-20">
                <div className="flex flex-row flex-grow gap-6">
                    <GoBackLink
                        workflowVersionId={workflowVersionId} />

                    <div className="flex flex-row gap-5">
                        <span>
                            {workflow.name} - Version {workflowVersion.number}
                        </span>

                        <WorkflowVersionStatus
                            status={workflowVersion.status} />
                    </div>
                </div>

                <WorkflowVersionHeaderButtons
                    workflowVersion={workflowVersion} />
            </header>

            <WorkflowVersionCanvas />
        </div>
    );
}

function WorkflowVersionHeaderButtons ({ workflowVersion }) {
    switch (workflowVersion.status) {
        case 'draft':
            return (
                <ButtonGroup>
                    <PrimaryButton>Activate</PrimaryButton>
                    <OutlineButton>Delete</OutlineButton>
                </ButtonGroup>
            );

        case 'active':
            return (
                <ButtonGroup>
                    <OutlineButton>Deactivate</OutlineButton>
                </ButtonGroup>
            );

        case 'inactive':
            return (
                <ButtonGroup>
                    <PrimaryButton>Activate</PrimaryButton>
                </ButtonGroup>
            );

        default:
            return null;
    }
}

function GoBackLink ({ workflowVersionId }) {
    return (
        <Link href={`/workflow-version/${workflowVersionId}`}>
            <ArrowLeftIcon className="w-6 h-6" />
        </Link>
    );
}