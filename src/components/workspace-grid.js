import Grid from '~/components/grid';
import {
    Card,
    CardTitle,
    CardText,
    CardSection,
    CardSectionTitle,
    CardLink, 
} from '~/components/card';
import {
    WorkspaceMemberList,
    WorkspaceMemberItem, 
} from '~/components/workspace-member-list';

export function WorkspaceGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export function WorkspaceGridItem ({ workspace }) {
    return (
        <Card>
            <CardTitle>
                {workspace.name}
            </CardTitle>

            <CardText>
                {workspace.description}
            </CardText>

            <WorkspaceMemberSection
                members={workspace.members} />

            <CardLink
                title={`Go to ${workspace.name}`}
                href={`/workspace/${workspace.id}`} />
        </Card>
    );
}

function WorkspaceMemberSection ({ members }) {
    return (
        <CardSection>
            <CardSectionTitle>
                Members ({members.length})
            </CardSectionTitle>

            <WorkspaceMemberList>
                {members.map(member => (
                    <WorkspaceMemberItem
                        key={member.userId}
                        member={member} />
                ))}
            </WorkspaceMemberList>
        </CardSection>
    );
}


