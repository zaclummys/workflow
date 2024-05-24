import {
    database, 
} from './client';

import {
    Workflow, 
} from '~/core/domain/workflow';

export async function insertWorkflow (workflow) {
    await database
        .collection('workflows')
        .insertOne(fromWorkflow(workflow));
}

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

export async function findWorkflowsByWorkspaceId (workspaceId) {
    const workflowsData = await database
        .collection('workflows')
        .find({
            workspaceId, 
        })
        .toArray();

    return workflowsData.map(toWorkflow);
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