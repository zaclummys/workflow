import { findWorkspacesByUserId } from '../data/mongodb/workspace';
import getCurrentUserId from '../authentication/get-current-user-id';

export default async function getWorkspaces ({ sessionToken }) {
    const currentUserId = getCurrentUserId(sessionToken);

    if (!currentUserId) {
        return {
            success: false,
        };
    }

    const workspaces = await findWorkspacesByUserId(currentUserId);
    
    return workspaces.map(workspace => ({
        id: workspace.getId(),
        name: workspace.getName(),
        description: workspace.getDescription(),
        createdAt: workspace.getCreatedAt(),
        members: workspace.getMembers()
            .map(member => ({
                userId: member.getUserId(),
                addedAt: member.getAddedAt(),
            }))
    }));
}