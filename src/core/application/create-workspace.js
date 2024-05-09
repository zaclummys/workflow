import Workspace from '../domain/workspace';
import { insertWorkspace } from '../data/mongodb';

export default async function createWorkspace ({
    name,
    description,
    sessionToken,
}) {
    if (!sessionToken) {
        return {
            success: false,
        };
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        }
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