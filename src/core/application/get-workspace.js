import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkspaceById } from '~/core/data/mongodb/workspace';

export default async function getWorkspace ({
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.'
        };
    }
    
    if (!workspace.belongsTo(session.getUserId())) {
        return {
            success: false,
            message: 'User does not belong to the workspace.'
        };
    }
    return {
        success: true,
        workspace: {
            id: workspace.getId(),
            name: workspace.getName(),
            description: workspace.getDescription(),
            createdAt: workspace.getCreatedAt(),
            createdById: workspace.getCreatedById(),
            members: workspace.getMembers()
                .map(member => ({
                    userId: member.getUserId(),
                    addedAt: member.getAddedAt(),
                }))
        },
    };
}