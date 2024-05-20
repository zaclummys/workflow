import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkflowById, deleteWorkflowById } from '~/core/data/mongodb/workflow';
import { findWorkspaceById } from '~/core/data/mongodb/workspace';

export default async function deleteWorkflow ({
    workflowId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'Session not found.'
        };
    }

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.',
        };
    }

    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

    if (!workspace.isOwner(session.getUserId())) {
        return {
            success: false,
            message: 'Cannot delete workflow you do not own.',
        };
    }

    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}