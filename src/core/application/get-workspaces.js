import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkspaceIdsByUserId, 
} from '~/core/data/mongodb/workspace';

export default async function getWorkspaces ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspaceIds = await findWorkspaceIdsByUserId(session.getUserId());
    
    return {
        success: true,
        workspaceIds,
    };
}