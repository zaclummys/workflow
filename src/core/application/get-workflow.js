import {
    findWorkflowById, 
} from '~/core/data/mongodb/workflow';
import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';
import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

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

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

    if (!workspace) {
        return {
            success: false,
        };
    }

    if (!workspace.isMember(session.getUserId())) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        workflow: {
            id: workflow.getId(),
            name: workflow.getName(),
            description: workflow.getDescription(),
            createdAt: workflow.getCreatedAt(),
            createdById: workflow.getCreatedById(),
            workspaceId: workflow.getWorkspaceId(),
        },
    }
}