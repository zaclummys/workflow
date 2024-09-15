import {
    Workflow, 
} from '~/core/domain/workflow';

import database from './database';

export async function insertWorkflow (workflow) {
    await database
        .collection('workflows')
        .insertOne(fromWorkflow(workflow));
}

/**
 * Find a workflow by ID.
 * 
 * @param {string} id
 * @returns {Promise<Workflow | null>}
 */
export async function findWorkflowById (id) {
    const workflowData = await database
        .collection('workflows')
        .findOne({
            id, 
        });

    if (workflowData == null) {
        return null;
    }
    
    return toWorkflow(workflowData);
}

export async function findWorkflowIdsByWorkspaceId (workspaceId) {
    const workflowIdsData = await database
        .collection('workflows')
        .find({
            workspaceId, 
        }, {
            sort: {
                createdAt: -1, 
            },
        })
        .toArray();

    return workflowIdsData.map(workflowIdData => workflowIdData.id);
}

export async function updateWorkflow (workflow) {
    await database
        .collection('workflows')
        .updateOne({
            id: workflow.getId(), 
        }, {
            $set: fromWorkflow(workflow), 
        });
}

export async function deleteWorkflowById (id) {
    await database
        .collection('workflows')
        .deleteOne({
            id, 
        });
}

export async function countWorkflowsByWorkspaceId (workspaceId) {
    return database
        .collection('workflows')
        .countDocuments({ workspaceId });
}

export function fromWorkflow (workflow) {
    return {
        id: workflow.getId(),
        name: workflow.getName(),
        description: workflow.getDescription(),
        nextVersionNumber: workflow.getNextVersionNumber(),
        workspaceId: workflow.getWorkspaceId(),
        createdAt: workflow.getCreatedAt(),
        createdById: workflow.getCreatedById(),
    };
}

export function toWorkflow (workflowData) {
    return new Workflow(workflowData);
}