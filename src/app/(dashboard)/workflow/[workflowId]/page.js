import Link from 'next/link';
import Header from '~/components/header';
import Container from '~/components/container';
import {
    Placeholder, PlaceholderTitle, PlaceholderText, 
} from '~/components/placeholder';
import {
    Section, SectionHeader, SectionTitle, SectionActions, 
} from '~/components/section';
import {
    PrimaryButton, OutlineButton, DestructiveOutlineButton, 
} from '~/components/button';
import {
    Details, DetailRow, DetailCell, DetailCellHeader, DetailCellText, 
} from '~/components/details';
import DateAgo from '~/components/date-ago';
import getWorkflowAction from '~/actions/get-workflow-action';
import getWorkspaceAction from '~/actions/get-workspace-action';
import getUserAction from '~/actions/get-user-action';
import DeleteWorkflowModalButton from '~/components/delete-workflow-modal-button';

export const title = 'Workflow';

export default async function Workflow ({ params: { workflowId } }) {
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

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>{workflow.name}</SectionTitle>

                        <SectionActions>
                            <PrimaryButton>New Workflow Version</PrimaryButton>
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

                    <Placeholder>
                        <PlaceholderTitle>No workflow versions</PlaceholderTitle>

                        <PlaceholderText>
                            You haven't created any workflow version yet. Do you want to create one? 
                        </PlaceholderText>
                    </Placeholder>
                </Section>
            </Container>
        </>
    );
}
