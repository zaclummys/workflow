import Grid from '~/components/grid';

import {
    Card,
    CardTitle,
    CardText,
    CardSection,
    CardSectionTitle,
    CardLink,
} from '~/components/card';

import WorkspaceMemberColorList from '~/components/workspace-member-color-list';

import getWorkspaceAction from '~/actions/get-workspace-action';

export function WorkspaceGrid({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export async function WorkspaceGridItem({ workspaceId }) {
    const { workspace } = await getWorkspaceAction(workspaceId);

    if (!workspace) {
        return null;
    }

    return (
        <Card>
            <CardTitle>
                {workspace.name}
            </CardTitle>

            <CardText>
                {workspace.description}
            </CardText>

            <CardSection>
                <CardSectionTitle>
                    Members ({workspace.members.length})
                </CardSectionTitle>

                <WorkspaceMemberColorList
                    members={workspace.members} />
            </CardSection>

            <CardLink
                title={`Go to ${workspace.name}`}
                href={`/workspace/${workspace.id}`} />
        </Card>
    );
}

