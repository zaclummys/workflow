import { database } from '~/core/data/client';
import { WorkflowVersion } from '~/core/domain/workflow-version';

export async function insertWorkflowVersion (workflowVersion) {
    await database
        .collection('workflow-versions')
        .insertOne(fromWorkflowVersion(workflowVersion));
}

export async function findWorkflowVersionById (id) {
    const workflowVersionData = await database
        .collection('workflow-versions')
        .findOne({ id });

    if (!workflowVersionData) {
        return null;
    }

    return toWorkflowVersion(workflowVersionData);
}

export async function findLatestWorkflowVersionByWorkflowId (workflowId) {
    const workflowVersionData = await database
        .collection('workflow-versions')
        .findOne({ workflowId }, { sort: { number: -1 } });

    if (!workflowVersionData) {
        return null;
    }

    return toWorkflowVersion(workflowVersionData);
}

export function fromWorkflowVersion (workflowVersion) {
    return {
        id: workflowVersion.getId(),
        number: workflowVersion.getNumber(),
        workflowId: workflowVersion.getWorkflowId(),
        createdAt: workflowVersion.getCreatedAt(),
        createdById: workflowVersion.getCreatedById(),
    };
}

export function toWorkflowVersion (workflowVersionData) {
    return new WorkflowVersion(workflowVersionData);
}
