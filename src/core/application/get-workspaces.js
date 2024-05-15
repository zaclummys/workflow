import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkspacesByUserId } from '../data/mongodb/workspace';

export default async function getWorkspaces ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspaces = await findWorkspacesByUserId(session.getUserId());
    
    return {
        success: true,
        workspaces: workspaces.map(workspace => ({
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
        }))
    };
}