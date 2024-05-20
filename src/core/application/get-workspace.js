import canAccessWorkspace from '~/core/authorization/can-access-workspace';
import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

export default async function getWorkspace ({
    workspaceId,
    sessionToken,
}) {
    const canCurrentUserAccessWorkspace = await canAccessWorkspace({
        workspaceId,
        sessionToken,
    });

    if (!canCurrentUserAccessWorkspace) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);
    
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
                })),
        },
    };
}