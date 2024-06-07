import { findSessionByToken } from '~/core/data/mongodb/session';
import { findUserById } from '~/core/data/mongodb/user';

import {
    findWorkspaceById,
    updateWorkspace,
} from '~/core/data/mongodb/workspace';

export default async function removeMemberFromWorkspace ({
    userId,
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace || !workspace.isMember(session.getUserId())) {
        return {
            success: false,
        }
    }

    const user = await findUserById(userId);

    if (!user) {
        return {
            success: false,
            message: 'User not found.',
        }
    }

    if (!workspace.isMember(user.getId())) {
        return {
            success: false,
            message: 'User is not a member of the workspace.',
        }
    }

    if (workspace.isOwner(user.getId())) {
        return {
            success: false,
            message: 'Cannot remove the workspace owner.',
        }
    }

    workspace.removeMember(user.getId());

    await updateWorkspace(workspace);

    return {
        success: true,
    }
}