import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkspaceById } from '~/core/data/mongodb/workspace';
import { findWorkflowById } from '~/core/data/mongodb/workflow';

export default async function getWorkflow ({
    workflowId,
    sessionToken,
}) {
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
            message: 'Workspace not found.'
        };
    }
    
    if (!workspace.belongsTo(session.getUserId())) {
        return {
            success: false,
            message: 'User does not belong to the workspace.'
        };
    }

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.'
        };
    }

    return {
        success: true,
        workflow: {
            id: workflow.getId(),
            name: workflow.getName(),
            description: workflow.getDescription(),
            workspaceId: workflow.getWorkspaceId(),
        },
    }
}