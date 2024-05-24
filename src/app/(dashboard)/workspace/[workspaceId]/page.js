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

import {
    WorkspaceMemberList,
    WorkspaceMemberItem, 
} from '~/components/workspace-member-list';

import {
    WorkflowGrid,
    WorkflowGridItem, 
} from '~/components/workflow-grid';

import CreateWorkflowModalButton from '~/components/create-workflow-modal-button';
import DeleteWorkspaceModalButton from '~/components/delete-workspace-modal-button';
import ManageMembersModalButton from '~/components/manage-members-modal-button';
import EditWorkspaceModalButton from '~/components/edit-workspace-modal-button';

import getWorkspaceAction from '~/actions/get-workspace-action';
import getUserAction from '~/actions/get-user-action';
import getWorkflowsAction from '~/actions/get-workflows-action';

export const title = 'Workspace';

export default async function Workspace ({ params: { workspaceId } }) {
    const { workspace } = await getWorkspaceAction(workspaceId);

    if (!workspace) {
        return null;
    }

    const { user } = await getUserAction(workspace.createdById);

    if (!user) {
        return null;
    }

    const { workflows } = await getWorkflowsAction(workspaceId);

    if (!workflows) {
        return null;
    }

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workspace.name}</SectionTitle>

                        <SectionActions>
                            <CreateWorkflowModalButton
                                workspaceId={workspace.id} />

                            <ManageMembersModalButton />

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
                                
                                <WorkspaceMemberList>
                                    {workspace.members.map(member => (
                                        <WorkspaceMemberItem
                                            key={member.userId}
                                            member={member} />
                                    ))}
                                </WorkspaceMemberList>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created At</DetailCellHeader>

                                <DateAgo
                                    date={workspace.createdAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>Created By</DetailCellHeader>
                                <DetailCellText>{user.name}</DetailCellText>
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

                    {workflows.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>No workflow</PlaceholderTitle>
                            <PlaceholderText>
                                You haven't created any workflow yet. Do you want to create one? 
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkflowGrid>
                            {workflows.map(workflow => (
                                <WorkflowGridItem
                                    key={workflow.id}
                                    workflow={workflow} />
                            ))}
                        </WorkflowGrid>
                    )}
                </Section>
            </Container>
        </>
    );
}