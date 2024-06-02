import Link from 'next/link';

import Header from '~/components/header';
import Container from '~/components/container';

import {
    Section,
    SectionHeader,
    SectionTitle,
    SectionActions,
} from '~/components/section';

import EditWorkflowVersionButton from '~/components/edit-workflow-version-button';

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,

} from '~/components/details';

import DateAgo from '~/components/date-ago';
import WorkflowVersionStatus from '~/components/workflow-version-status';
import DeleteWorkflowVersionModalButton from '~/components/delete-workflow-version-modal-button';

import getWorkflowVersionAction from '~/actions/get-workflow-version-action';
import getWorkflowAction from '~/actions/get-workflow-action';
import getWorkspaceAction from '~/actions/get-workspace-action';
import getUserAction from '~/actions/get-user-action';
import getWorkflowExecutionsAction from '~/actions/get-workflow-executions-action';

import {
    Placeholder,
    PlaceholderText,
    PlaceholderTitle,
} from '~/components/placeholder';
import ExecuteWorkflowVersionModalButton from '~/components/execute-workflow-version-modal-button';
import { WorkflowExecutionGrid, WorkflowExecutionGridItem } from '~/components/workflow-execution-grid';

export const title = 'Workflow Version';

export default async function WorkflowVersion ({ params: { workflowVersionId } }) {
    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return null;
    }

    const { workflowExecutions } = await getWorkflowExecutionsAction(workflowVersionId);

    if (!workflowExecutions) {
        return null;
    }

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workflowVersion.workflow.name} - Version {workflowVersion.number}</SectionTitle>

                        <SectionActions>
                            <EditWorkflowVersionButton
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

                    {workflowExecutions.length === 0 ? (
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
                            {workflowExecutions.map((workflowExecution) => (
                                <WorkflowExecutionGridItem
                                    key={workflowExecution.id}
                                    workflowExecution={workflowExecution} />
                            ))}
                        </WorkflowExecutionGrid>
                    )}                    
                </Section>
            </Container>
        </>
    );
}

