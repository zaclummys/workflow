import getWorkspacesAction from '~/actions/get-workspaces-action';

import Header from '~/components/header';
import Container from '~/components/container';

import {
    Section,
    SectionHeader,
    SectionTitle,
    SectionActions,
} from '~/components/section';

import {
    WorkspaceGrid,
    WorkspaceGridItem,
} from '~/components/workspace-grid';

import {
    Placeholder,
    PlaceholderTitle,
    PlaceholderText,
} from '~/components/placeholder';

import NewWorkspaceModalButton from '~/components/modal-buttons/create-workspace-modal-button';

export const title = 'Workspaces';

export default async function Workspaces() {
    const { workspaceIds } = await getWorkspacesAction();

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Workspaces</SectionTitle>
                        <SectionActions>
                            <NewWorkspaceModalButton />
                        </SectionActions>
                    </SectionHeader>

                    {workspaceIds.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>
                                No workspaces
                            </PlaceholderTitle>

                            <PlaceholderText>
                                You have not created and are not a member of any workspaces yet.
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkspaceGrid>
                            {workspaceIds.map(workspaceId => (
                                <WorkspaceGridItem
                                    key={workspaceId}
                                    workspaceId={workspaceId} />
                            ))}
                        </WorkspaceGrid>
                    )}
                </Section>
            </Container>
        </>
    );
}
