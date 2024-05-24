import Link from 'next/link';

import Header from '~/components/header';
import Container from '~/components/container';

import {
    Placeholder,
    PlaceholderTitle,
    PlaceholderText,
} from '~/components/placeholder';

import {
    Section,
    SectionHeader,
    SectionTitle,
    SectionActions,
} from '~/components/section';

import {
    OutlineButton,
} from '~/components/button';

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,
} from '~/components/details';

import DateAgo from '~/components/date-ago';

import CreateWorkflowVersionButton from '~/components/create-workflow-version-button';
import DeleteWorkflowModalButton from '~/components/delete-workflow-modal-button';

import {
    WorkflowVersionGrid,
    WorkflowVersionGridItem,
} from '~/components/workflow-version-grid';

import getWorkflowAction from '~/actions/get-workflow-action';
import getWorkflowVersionsAction from '~/actions/get-workflow-versions-action';
import getWorkspaceAction from '~/actions/get-workspace-action';
import getUserAction from '~/actions/get-user-action';

export const title = 'Workflow';

export default async function Workflow({ params: { workflowId } }) {
    const { workflow } = await getWorkflowAction(workflowId);

    if (!workflow) {
        return null;
    }

    const { workspace } = await getWorkspaceAction(workflow.workspaceId);

    if (!workspace) {
        return null;
    }

    const { user } = await getUserAction(workspace.createdById);

    if (!user) {
        return null;
    }

    const { workflowVersions } = await getWorkflowVersionsAction(workflowId);

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workflow.name}</SectionTitle>

                        <SectionActions>
                            <CreateWorkflowVersionButton
                                workflowId={workflow.id} />

                            <OutlineButton>Edit</OutlineButton>

                            <DeleteWorkflowModalButton
                                workflow={workflow} />
                        </SectionActions>
                    </SectionHeader>

                    <Details>
                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>
                                    Workspace
                                </DetailCellHeader>

                                <Link
                                    className="font-medium"
                                    href={`/workspace/${workspace.id}`}>
                                    {workspace.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Created At
                                </DetailCellHeader>

                                <DateAgo
                                    date={workflow.createdAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Created By
                                </DetailCellHeader>

                                <DetailCellText>
                                    {user.name}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>

                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>
                                    Description
                                </DetailCellHeader>

                                <DetailCellText>
                                    {workflow.description}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>Workflow Versions</SectionTitle>

                    {workflowVersions.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>No workflow versions</PlaceholderTitle>

                            <PlaceholderText>
                                You haven't created any workflow version yet. Do you want to create one?
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkflowVersionGrid>
                            {workflowVersions.map(workflowVersion => (
                                <WorkflowVersionGridItem
                                    key={workflowVersion.id}
                                    workflowVersion={workflowVersion} />
                            ))}
                        </WorkflowVersionGrid>
                    )}
                </Section>
            </Container>
        </>
    );
}
