import Link from 'next/link';

import Container from '~/components/container';

import {
    Section,
    SectionHeader,
    SectionTitle,
    SectionActions,
} from '~/components/section';

import OpenWorkflowVersionEditorButton from '~/components/open-workflow-version-editor-button';

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,

} from '~/components/details';

import DateAgo from '~/components/date-ago';
import WorkflowVersionStatus from '~/components/workflow-version-status';
import DeleteWorkflowVersionModalButton from '~/components/modal-buttons/delete-workflow-version-modal-button';

import getWorkflowVersionAction from '~/actions/get-workflow-version-action';
import getWorkflowExecutionsAction from '~/actions/get-workflow-executions-action';

import {
    Placeholder,
    PlaceholderText,
    PlaceholderTitle,
} from '~/components/placeholder';

import ExecuteWorkflowVersionModalButton from '~/components/modal-buttons/execute-workflow-version-modal-button';

import {
    WorkflowExecutionGrid,
    WorkflowExecutionGridItem,
} from '~/components/workflow-execution-grid';

import GoBack from '~/components/go-back';
import { notFound } from 'next/navigation';

export const title = 'Workflow Version';

export default async function WorkflowVersion ({ params }) {
    const { workflowVersionId } = await params;

    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return notFound();
    }

    const { workflowExecutionIds } = await getWorkflowExecutionsAction(workflowVersionId);

    if (!workflowExecutionIds) {
        return notFound;
    }

    return (
        <>
            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            <GoBack url={`/workflow/${workflowVersion.workflow.id}`} />

                            Version {workflowVersion.number} - {workflowVersion.workflow.name}
                        </SectionTitle>

                        <SectionActions>
                            <OpenWorkflowVersionEditorButton
                                workflowVersionId={workflowVersion.id} />

                            <ExecuteWorkflowVersionModalButton
                                workflowVersion={workflowVersion} />
                                
                            <DeleteWorkflowVersionModalButton
                                workflowVersion={workflowVersion} />
                        </SectionActions>
                    </SectionHeader>

                    <Details>
                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>Status</DetailCellHeader>
                                
                                <WorkflowVersionStatus
                                    status={workflowVersion.status} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Workflow</DetailCellHeader>
                                
                                <Link
                                    className="font-medium"
                                    href={`/workflow/${workflowVersion.workflow.id}`}>
                                    {workflowVersion.workflow.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Workspace</DetailCellHeader>
                                
                                <Link
                                    className="font-medium"
                                    href={`/workspace/${workflowVersion.workflow.workspace.id}`}>
                                    {workflowVersion.workflow.workspace.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created at</DetailCellHeader>
                                
                                <DateAgo
                                    date={workflowVersion.createdAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created by</DetailCellHeader>
                                
                                <DetailCellText>
                                    {workflowVersion.createdBy.name}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>Workflow Executions</SectionTitle>

                    {workflowExecutionIds.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>
                                No workflow executions
                            </PlaceholderTitle>

                            <PlaceholderText>
                                You haven't yet run this workflow version. Do you want to execute it now?
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkflowExecutionGrid>
                            {workflowExecutionIds.map(workflowExecutionId => (
                                <WorkflowExecutionGridItem
                                    key={workflowExecutionId}
                                    workflowExecutionId={workflowExecutionId} />
                            ))}
                        </WorkflowExecutionGrid>
                    )}                    
                </Section>
            </Container>
        </>
    );
}

