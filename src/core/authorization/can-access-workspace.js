import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkspaceById } from '~/core/data/mongodb/workspace';

export default async function canAccessWorkspace ({
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return false;
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace || !workspace.isMember(session.getUserId())) {
        return false;
    }
    
    return true;
}