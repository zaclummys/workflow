import Header from '~/components/header';
import Container from '~/components/container';
import DateAgo from '~/components/date-ago';
import { Section, SectionHeader, SectionTitle, SectionActions } from '~/components/section';
import { PrimaryButton, OutlineButton, DestructiveOutlineButton } from '~/components/button';
import { Details, DetailRow, DetailCell, DetailCellHeader, DetailCellText } from '~/components/details';
import { WorkspaceMemberList, WorkspaceMemberItem } from '~/components/workspace-member-list';
import CreateWorkflowModalButton from '~/components/create-workflow-modal-button';

import getWorkspaceAction from '~/actions/get-workspace-action';
import getUserAction from '~/actions/get-user-action';

export const title = 'Workspace';

export default async function Workspace ({ params: { workspaceId }}) {
    const { workspace } = await getWorkspaceAction(workspaceId);

    if (!workspace) {
        return null;
    }

    const { user } = await getUserAction(workspace.createdById);

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workspace.name}</SectionTitle>

                        <SectionActions>
                            <CreateWorkflowModalButton />

                            <OutlineButton>Manage Members</OutlineButton>
                            <OutlineButton>Edit</OutlineButton>
                            <DestructiveOutlineButton>Delete</DestructiveOutlineButton>
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
                </Section>
            </Container>
        </>
    );
}
