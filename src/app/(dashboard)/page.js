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

import NewWorkspaceModalButton from '~/components/create-workspace-modal-button';

 export const title = 'Workspaces';

export default async function Workspaces () {
    const { workspaces } = await getWorkspacesAction();

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

                    <WorkspaceGrid>
                        {workspaces.map(workspace => (
                            <WorkspaceGridItem
                                key={workspace.id}
                                workspace={workspace} />
                        ))}
                    </WorkspaceGrid>
                </Section>

                <Section>
                    <SectionTitle>Recently Edited Workflow Versions</SectionTitle>
                </Section>
            </Container>
        </>  
    );
}
