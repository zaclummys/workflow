import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    insertWorkflow, 
} from '~/core/data/mongodb/workflow';

import {
    Workflow, 
} from '~/core/domain/workflow';

export default async function createWorkflow ({
    name,
    description,
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a workflow.',
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.',
        };
    }
    
    const workflow = Workflow.create({
        name,
        description,
        createdById: session.getUserId(),
        workspaceId: workspace.getId(),
    });

    await insertWorkflow(workflow);

    return {
        success: true,
        workflowId: workflow.getId(),
    };
}