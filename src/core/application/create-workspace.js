import { Workspace } from '../domain/workspace';

import { insertWorkspace } from '../data/mongodb/workspace';
import getCurrentUserId from '../authentication/get-current-user-id';

export default async function createWorkspace ({
    name,
    description,
    sessionToken,
}) {
    const currentUserId = await getCurrentUserId(sessionToken);

    if (!currentUserId) {
        return {
            success: false,
        };
    }

    const workspace = Workspace.create({
        name,
        description,
        userId: currentUserId,
    });

    await insertWorkspace(workspace);
    
    return {
        success: true,
        workspaceId: workspace.getId(),
    };
}