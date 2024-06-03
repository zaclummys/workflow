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

export default async function getWorkflow ({ workflowId }) {
    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
        };
    }
    
    const numberOfVersions = await countWorkflowVersionsByWorkflowId(workflow.getId());

    const createdBy = await findUserById(workflow.getCreatedById());
    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

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