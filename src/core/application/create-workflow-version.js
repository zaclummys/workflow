import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findWorkflowById, 
    updateWorkflow,
} from '~/core/data/mongodb/workflow';

import {
    insertWorkflowVersion,
} from '~/core/data/mongodb/workflow-version';

import { WorkflowVersion } from '~/core/domain/workflow-version/workflow-version';

export default async function createWorkflowVersion ({
    workflowId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a workflow version.',
        };
    }

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.',
        };
    }
    
    const workflowVersion = WorkflowVersion.create({
        workflowId: workflow.getId(),
        createdById: session.getUserId(),
        number: workflow.takeNextVersionNumber(),
    });

    await insertWorkflowVersion(workflowVersion);
    await updateWorkflow(workflow);

    return {
        success: true,
        workflowVersionId: workflowVersion.getId(),
    };
}