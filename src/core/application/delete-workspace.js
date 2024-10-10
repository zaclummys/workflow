import { findSessionByToken } from '~/core/data/mongodb/session';

import {
    findWorkspaceById,
    deleteWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findWorkflowIdsByWorkspaceId,
    deleteWorkflowsByIds,
} from '~/core/data/mongodb/workflow';

import {
    findWorkflowVersionIdsByWorkflowIds,
    deleteWorkflowVersionsByIds,
} from '~/core/data/mongodb/workflow-version';

import {
    findWorkflowExecutionIdsByWorkflowVersionIds,
    deleteWorkflowExecutionsByIds,
} from '~/core/data/mongodb/workflow-execution';

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

    const workflowIds = await findWorkflowIdsByWorkspaceId(workspaceId);
    const workflowVersionIds = await findWorkflowVersionIdsByWorkflowIds(workflowIds);
    const workflowExecutionIds = await findWorkflowExecutionIdsByWorkflowVersionIds(workflowVersionIds);

    await deleteWorkflowExecutionsByIds(workflowExecutionIds);
    await deleteWorkflowVersionsByIds(workflowVersionIds);
    await deleteWorkflowsByIds(workflowIds);
    await deleteWorkspaceById(workspaceId);

    return {
        success: true,
    };
}