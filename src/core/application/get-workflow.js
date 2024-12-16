import {
    findSessionByToken,
} from '~/core/data/mongodb/session';

import {
    findWorkflowById, 
} from '~/core/data/mongodb/workflow';

import {
    findUserById, 
} from '~/core/data/mongodb/user';

import {
    findWorkspaceById, 
} from '~/core/data/mongodb/workspace';

import {
    countWorkflowVersionsByWorkflowId,
} from '~/core/data/mongodb/workflow-version';

export default async function getWorkflow ({
    sessionToken,
    workflowId,
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

    const createdBy = await findUserById(workflow.getCreatedById());
    
    if (!createdBy) {
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
            message: 'User is not a member of the workspace.',
        };
    }

    const numberOfVersions = await countWorkflowVersionsByWorkflowId(workflow.getId());

    return {
        success: true,
        workflow: {
            id: workflow.getId(),
            name: workflow.getName(),
            description: workflow.getDescription(),
            createdAt: workflow.getCreatedAt(),

            createdBy: {
                id: createdBy.getId(),
                name: createdBy.getName(),
            },

            workspace: {
                id: workspace.getId(),
                name: workspace.getName(),
            },

            numberOfVersions,
        },
    }
}