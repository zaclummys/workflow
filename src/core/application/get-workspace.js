import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findUserById, 
    findUsersByIds,
} from '~/core/data/mongodb/user';

export default async function getWorkspace ({
    workspaceId,
}) {
    const workspace = await findWorkspaceById(workspaceId);

    console.log()

    if (!workspace) {
        return {
            success: false,
        };
    }

    const createdBy = await findUserById(workspace.getCreatedById());

    const memberUserIds = workspace.getMembers()
        .map(member => member.getUserId());

    const memberUsers = await findUsersByIds(memberUserIds);
    
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
                .map(member => {
                    const user = memberUsers.find(user => user.getId() === member.getUserId());

                    return {
                        addedAt: member.getAddedAt(),
                        user: {
                            id: user.getId(),
                            name: user.getName(),
                            color: user.getColor(),
                        },
                    }
                }),
        },
    };
}