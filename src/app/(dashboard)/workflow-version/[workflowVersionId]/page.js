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

import {
    Placeholder,
    PlaceholderText,
    PlaceholderTitle,
} from '~/components/placeholder';

export const title = 'Workflow Version';

export default async function WorkflowVersion ({ params: { workflowVersionId } }) {
    const { workflowVersion } = await getWorkflowVersionAction(workflowVersionId);

    if (!workflowVersion) {
        return null;
    }

    const { workflow } = await getWorkflowAction(workflowVersion.workflowId);

    if (!workflow) {
        return null;
    }

    const { workspace } = await getWorkspaceAction(workflow.workspaceId);

    if (!workspace) {
        return null;
    }

    const { user } = await getUserAction(workflowVersion.createdById);

    if (!user) {
        return null;
    }

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workflow.name} - Version {workflowVersion.number}</SectionTitle>

                        <SectionActions>
                            <EditWorkflowVersionButton
                                workflowVersionId={workflowVersion.id} />
                                
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
                                    href={`/workflow/${workflow.id}`}>
                                    {workflow.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Workspace</DetailCellHeader>
                                
                                <Link
                                    className="font-medium"
                                    href={`/workspace/${workspace.id}`}>
                                    {workspace.name}
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
                                    {user.name}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>Workflow Executions</SectionTitle>

                    <Placeholder>
                        <PlaceholderTitle>
                            No workflow executions
                        </PlaceholderTitle>

                        <PlaceholderText>
                            You haven't yet run this workflow version. Do you want to execute it now?
                        </PlaceholderText>
                    </Placeholder>
                </Section>
            </Container>
        </>
    );
}

