import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkspaceById,
    deleteWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findWorkflowsByWorkspaceId, 
} from '~/core/data/mongodb/workflow';

export default async function deleteWorkspace ({ workspaceId }) {
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.',
        };
    }

    const workflows = await findWorkflowsByWorkspaceId(workspaceId);

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