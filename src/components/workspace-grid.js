import {
    Card,
    CardTitle,
    CardDescription,
    CardSection,
    CardSectionTitle,
    CardLink,
} from '~/components/card';

import { WorkspaceMemberList, WorkspaceMemberItem } from '~/components/workspace-member-list';

export function WorkspaceGrid ({ children }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
        </div>
    );
}

export function WorkspaceGridItem ({ workspace }) {
    return (
        <Card>
            <CardTitle>
                {workspace.name}
            </CardTitle>

            <CardDescription>
                {workspace.description}
            </CardDescription>

            <WorkspaceMemberSection
                members={workspace.members} />

            <CardLink
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


