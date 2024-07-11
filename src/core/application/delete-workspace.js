import { findSessionByToken } from '~/core/data/mongodb/session';

import {
    findWorkspaceById,
    deleteWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import { countWorkflowsByWorkspaceId } from '~/core/data/mongodb/workflow';

export default async function deleteWorkspace ({
    workspaceId,
    sessionToken,
}) {
    if (!workspaceId || !sessionToken) {
        return {
            success: false,
        };
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.',
        };
    }

    if (!workspace.isOwner(session.getUserId())) {
        return {
            success: false,
            message: 'You do not have permission to delete this workspace.',
        };
    }

    const workflows = await countWorkflowsByWorkspaceId(workspaceId);

    if (workflows.length > 0) {
        return {
            success: false,
            message: 'Cannot delete workspace with workflows.',
        };
    }

    await deleteWorkspaceById(workspaceId);

    return {
        success: true,
    };
}