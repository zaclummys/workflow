import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findUserById, 
} from '~/core/data/mongodb/user';

export default async function getWorkspace ({
    workspaceId,
}) {
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
        };
    }

    const createdBy = await findUserById(workspace.getCreatedById());
    
    return {
        success: true,
        workspace: {
            id: workspace.getId(),
            name: workspace.getName(),
            description: workspace.getDescription(),
            createdAt: workspace.getCreatedAt(),
            createdBy: {
                id: createdBy.getId(),
                name: createdBy.getName(),
            },
            members: workspace.getMembers()
                .map(member => ({
                    userId: member.getUserId(),
                    addedAt: member.getAddedAt(),
                })),
        },
    };
}