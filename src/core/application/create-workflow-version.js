import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    findWorkflowById, 
} from '~/core/data/mongodb/workflow';

import {
    insertWorkflowVersion,
    findLatestWorkflowVersionByWorkflowId,
} from '~/core/data/mongodb/workflow-version';

export default async function createWorkflowVersion ({
    workflowId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a workflow.',
        };
    }

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.',
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

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

    const latestWorkflowVersion = await findLatestWorkflowVersionByWorkflowId(workflowId);

    let workflowVersion;

    if (latestWorkflowVersion) {
        workflowVersion = latestWorkflowVersion.fork({
            forkedById: session.getUserId(),
        });
    } else {
        workflowVersion = WorkflowVersion.create({
            workflowId,
            createdById: session.getUserId(),
        });
    }

    await insertWorkflowVersion(workflowVersion);

    return {
        success: true,
        workflowVersionId: workflowVersion.getId(),
    };
}