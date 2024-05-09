import { findSessionByToken } from '../data/mongodb/session';
import { findWorkspacesByUserId } from '../data/mongodb/workspace';

export default async function getWorkspaces ({ sessionToken }) {
    if (!sessionToken) {
        throw new Error('Session Token cannot be empty');
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        throw new Error('Session not found');
    }

    const workspaces = await findWorkspacesByUserId(session.getUserId());
    
    return workspaces.map(workspace => ({
        id: workspace.getId(),
        name: workspace.getName(),
        description: workspace.getDescription(),
        createdAt: workspace.getCreatedAt(),
        updatedAt: workspace.getUpdatedAt(),
    }));
}