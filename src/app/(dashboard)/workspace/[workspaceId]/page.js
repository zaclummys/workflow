import Header from '~/components/header';
import Container from '~/components/container';
import DateAgo from '~/components/date-ago';

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
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,
} from '~/components/details';

import WorkspaceMemberColorList from '~/components/workspace-member-color-list';

import {
    WorkflowGrid,
    WorkflowGridItem,
} from '~/components/workflow-grid';

import CreateWorkflowModalButton from '~/components/modal-buttons/create-workflow-modal-button';
import DeleteWorkspaceModalButton from '~/components/modal-buttons/delete-workspace-modal-button';
import ManageMembersModalButton from '~/components/modal-buttons/manage-members-modal-button';
import EditWorkspaceModalButton from '~/components/modal-buttons/edit-workspace-modal-button';



import getWorkspaceAction from '~/actions/get-workspace-action';
import getWorkflowsAction from '~/actions/get-workflows-action';
import GoBack from '~/components/go-back';

export const title = 'Workspace';

export default async function Workspace({ params }) {
    const { workspaceId } = await params;

    const { workspace } = await getWorkspaceAction(workspaceId);

    if (!workspace) {
        return null;
    }

    const { workflowIds } = await getWorkflowsAction(workspaceId);

    if (!workflowIds) {
        return null;
    }

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            <GoBack url="/" />
                            
                            {workspace.name}
                        </SectionTitle>

                        <SectionActions>
                            <CreateWorkflowModalButton
                                workspaceId={workspace.id} />

                            <ManageMembersModalButton
                                workspace={workspace} />

                            <EditWorkspaceModalButton
                                workspace={workspace} />

                            <DeleteWorkspaceModalButton
                                workspace={workspace} />
                        </SectionActions>
                    </SectionHeader>

                    <Details>
                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>Members</DetailCellHeader>

                                <WorkspaceMemberColorList
                                    members={workspace.members} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created At</DetailCellHeader>

                                <DateAgo
                                    date={workspace.createdAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created By</DetailCellHeader>
                                <DetailCellText>{workspace.createdBy.name}</DetailCellText>
                            </DetailCell>
                        </DetailRow>

                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>Description</DetailCellHeader>
                                <DetailCellText>{workspace.description}</DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>Workflows</SectionTitle>

                    {workflowIds.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>No workflow</PlaceholderTitle>
                            <PlaceholderText>
                                You haven't created any workflow yet. Do you want to create one?
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkflowGrid>
                            {workflowIds.map(workflowId => (
                                <WorkflowGridItem
                                    key={workflowId}
                                    workflowId={workflowId} />
                            ))}
                        </WorkflowGrid>
                    )}
                </Section>
            </Container>
        </>
    );
}