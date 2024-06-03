import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findWorkflowById, 
    updateWorkflow,
} from '~/core/data/mongodb/workflow';

import {
    insertWorkflowVersion,
    findWorkflowVersionById,
} from '~/core/data/mongodb/workflow-version';

export default async function forkWorkflowVersion ({
    workflowVersionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a workflow.',
        };
    }

    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
            message: 'Workflow version was not found.',
        };
    }

    const workflow = await findWorkflowById(workflowVersion.getWorkflowId());

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.',
        };
    }

    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.',
        };
    }

    if (!workspace.isMember(session.getUserId())) {
        return {
            success: false,
            message: 'You do not have permission to access this workspace.',
        };
    }

    const forkedWorkflowVersion = workflowVersion.fork({
        createdById: session.getUserId(),
        number: workflow.getNextVersionNumber(),
    });

    workflow.incrementNextVersionNumber();

    await insertWorkflowVersion(forkedWorkflowVersion);
    await updateWorkflow(workflow);

    return {
        success: true,
        workflowVersionId: forkedWorkflowVersion.getId(),
    };
}