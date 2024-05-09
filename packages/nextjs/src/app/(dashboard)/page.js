export const title = 'Workspaces';

import Header from '~/components/header';
import Container from '~/components/container';
import { Section, SectionTitle } from '~/components/section';
import { WorkspaceGrid, WorkspaceGridItem } from '~/components/workspace-grid';

import getCurrentUserWorkspaces from '~/actions/current-user/get-workspaces';

export default async function Workspaces () {
    const workspaces = await getCurrentUserWorkspaces();

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionTitle>Workspaces</SectionTitle>

                    <WorkspaceGrid>
                        {/* {workspaces.map(workspace => (
                            <WorkspaceGridItem
                                key={workspace.id}
                                workspace={workspace} />
                        ))} */}
                    </WorkspaceGrid>
                </Section>

                <Section>
                    <SectionTitle>Workflow Versions Recently Edited</SectionTitle>
                </Section>
            </Container>
        </>  
    );
}
