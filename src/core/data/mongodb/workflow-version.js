import { database } from '~/core/data/mongodb/client';
import { WorkflowVariable, WorkflowVersion } from '~/core/domain/workflow-version';

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

export async function findWorkflowVersionByWorkflowId (workflowId) {
    const workflowVersionData = await database
        .collection('workflow-versions')
        .find({ workflowId }, { sort: { number: -1 } })
        .toArray();

    return workflowVersionData.map(toWorkflowVersion);
}

export async function deleteWorkflowVersionById (id) {
    await database
        .collection('workflow-versions')
        .deleteOne({ id });
}

export function fromWorkflowVersion (workflowVersion) {
    return {
        id: workflowVersion.getId(),
        number: workflowVersion.getNumber(),
        status: workflowVersion.getStatus(),
        elements: workflowVersion.getElements(),
        variables: workflowVersion.getVariables(),
        workflowId: workflowVersion.getWorkflowId(),
        createdAt: workflowVersion.getCreatedAt(),
        createdById: workflowVersion.getCreatedById(),
    };
}

export function toWorkflowVersion ({
    id,
    number,
    status,
    elements,
    variables,
    workflowId,
    createdAt,
    createdById,
}) {
    return new WorkflowVersion({
        id,
        number,
        status,
        elements,
        workflowId,
        createdAt,
        createdById,
        variables: variables.map(toWorkflowVariable),
    });
}

export function toWorkflowVariable (workflowVariableData) {
    return new WorkflowVariable(workflowVariableData);
}