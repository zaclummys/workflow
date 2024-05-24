import {
    Workspace, 
} from '~/core/domain/workspace';
import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';
import {
    insertWorkspace, 
} from '~/core/data/mongodb/workspace';

export default async function createWorkspace ({
    name,
    description,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a workspace.',
        };
    }

    const workspace = Workspace.create({
        name,
        description,
        userId: session.getUserId(),
    });

    await insertWorkspace(workspace);
    
    return {
        success: true,
        workspaceId: workspace.getId(),
    };
}