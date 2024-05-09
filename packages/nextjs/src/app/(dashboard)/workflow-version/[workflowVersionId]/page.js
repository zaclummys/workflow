import WorkflowVersionTemplate from "~/templates/workflow-version-template";

export const title = 'Workflow Version';

export default function WorkflowVersion () {
    return null;
}

import Link from "next/link";

import OutlineButton from "~/components/button/outline-button";
import PrimaryButton from "~/components/button/primary-button";
import Details from "~/components/details/details";
import Detail from "~/components/details/detail";
import DetailHeader from "~/components/details/detail-header";
import DetailRow from "~/components/details/detail-row";

import Header from "~/components/header";
import WorkflowVersionStatus from "~/components/workflow-version-status";
import WorkflowExecutionList from "~/components/workflow-execution-list";

import PageActions from "~/components/page/page-actions";
import Container from "~/components/page/page-container";

function WorkflowVersionTemplate({
    workflowVersion,
}) {
    return (
        <div>
            <Header />

            <Container>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <span className="page-title grow">
                            Workflow Version {workflowVersion.number}
                        </span>

                        <PageActions>
                            <PrimaryButton>Open</PrimaryButton>

                            {workflowVersion.status === 'active' ? (
                                <>
                                    <OutlineButton>Execute</OutlineButton>
                                    <OutlineButton>Deactivate</OutlineButton>
                                </>
                            ) : (
                                <>
                                    <OutlineButton>Activate</OutlineButton>
                                    <OutlineButton>Delete</OutlineButton>
                                </>
                            )}
                        </PageActions>
                    </div>

                    <WorkflowVersionDetails
                        workflowVersion={workflowVersion} />
                </div>

                <div className="flex flex-col gap-[var(--page-section-gap)]">
                    <span className="page-section-title">
                        Workflows executions
                    </span>

                    <WorkflowExecutionList
                        workflowExecutions={workflowVersion.workflowExecutions} />
                </div>
            </Container>
        </div>
    );
}

function WorkflowVersionDetails ({
    workflowVersion,
}) {
    return (
        <Details>
            <DetailRow>
                <Detail>
                    <DetailHeader>
                        Status
                    </DetailHeader>

                    <WorkflowVersionStatus
                        status={workflowVersion.status} />
                </Detail>

                <Detail>
                    <DetailHeader>
                        Workflow
                    </DetailHeader>

                    <WorkflowLink
                        workflow={workflowVersion.workflow} />
                </Detail>

                <Detail>
                    <DetailHeader>
                        Workspace
                    </DetailHeader>

                    <WorkspaceLink
                        workspace={workflowVersion.workflow.workspace} />
                </Detail>
            </DetailRow>
        </Details>
    );
}

function WorkflowLink ({ workflow }) {
    return (
        <Link href={`/workflow/${workflow.id}`} className="font-medium">
            {workflow.name}
        </Link>
    );
}

function WorkspaceLink ({ workspace }) {
    return (        
        <Link href={`/workspace/${workspace.id}`} className="font-medium">
            {workspace.name}
        </Link>
    );
}
