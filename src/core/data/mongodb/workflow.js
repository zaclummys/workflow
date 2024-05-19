import { database } from './client';
import { Workflow } from '~/core/domain/workflow';

export async function insertWorkflow (workflow) {
    await database
        .collection('workflows')
        .insertOne(fromWorkflow(workflow));
}

export async function findWorkflowById (id) {
    const workflowData = await database
        .collection('workflows')
        .findOne({ id });

    if (workflowData == null) {
        return null;
    }
    
    return toWorkflow(workflowData);
}

export async function findWorkflowsByWorkspaceId (workspaceId) {
    const workflowsData = await database
        .collection('workflows')
        .find({ workspaceId })
        .toArray();

    return workflowsData.map(toWorkflow);
}

export function fromWorkflow (workflow) {
    return {
        id: workflow.getId(),
        name: workflow.getName(),
        description: workflow.getDescription(),
        workspaceId: workflow.getWorkspaceId(),
        createdAt: workflow.getCreatedAt(),
        createdById: workflow.getCreatedById(),
    };
}

export function toWorkflow (workflowData) {
    return new Workflow(workflowData);
}