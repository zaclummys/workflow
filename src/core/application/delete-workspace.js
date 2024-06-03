import {
    findWorkspaceById,
    deleteWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findWorkflowIdsByWorkspaceId, 
} from '~/core/data/mongodb/workflow';

export default async function deleteWorkspace ({ workspaceId }) {
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.',
        };
    }

    const workflows = await findWorkflowIdsByWorkspaceId(workspaceId);

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