import { database } from '~/core/data/mongodb/client';
import {
    WorkflowStartElement,
    WorkflowVariable,
    WorkflowAssignElement,
    WorkflowIfElement,
    WorkflowVersion,
} from '~/core/domain/workflow-version';

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

export async function findWorkflowVersionIdsByWorkflowId (workflowId) {
    const workflowVersionIdsData = await database
        .collection('workflow-versions')
        .find({ workflowId }, { sort: { number: -1 } })
        .toArray();

    return workflowVersionIdsData.map(workflowVersionIdData => workflowVersionIdData.id);
}

export async function countWorkflowVersionsByWorkflowId (workflowId) {
    return database
        .collection('workflow-versions')
        .countDocuments({ workflowId });
}

export async function updateWorkflowVersion (workflowVersion) {
    await database
        .collection('workflow-versions')
        .updateOne(
            { id: workflowVersion.getId() },
            { $set: fromWorkflowVersion(workflowVersion) },
        );
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
        elements: workflowVersion.getElements()
            .map(fromWorkflowElement),
        variables: workflowVersion.getVariables(),
        workflowId: workflowVersion.getWorkflowId(),
        createdAt: workflowVersion.getCreatedAt(),
        createdById: workflowVersion.getCreatedById(),
    };
}

export function fromWorkflowElement (workflowElement) {
    switch (workflowElement.getType()) {
        case 'start':
            return {
                id: workflowElement.getId(),
                type: workflowElement.getType(),
                nextElementId: workflowElement.getNextElementId(),
            };

        case 'assign':
            return {
                id: workflowElement.getId(),
                type: workflowElement.getType(),
                name: workflowElement.getName(),
                description: workflowElement.getDescription(),
                nextElementId: workflowElement.getNextElementId(),
            };

        case 'if':
            return {
                id: workflowElement.getId(),
                type: workflowElement.getType(),
                name: workflowElement.getName(),
            };

        default:
            throw new Error(`Unknown element type: ${workflowElement.getType()}`);
    }
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
        elements: elements.map(toWorkflowElement),
        workflowId,
        createdAt,
        createdById,
        variables: variables.map(toWorkflowVariable),
    });
}

export function toWorkflowVariable (workflowVariableData) {
    return new WorkflowVariable(workflowVariableData);
}

export function toWorkflowElement (workflowElementData) {
    switch (workflowElementData.type) {
        case 'start':
            return new WorkflowStartElement(workflowElementData);

        case 'assign':
            return new WorkflowAssignElement(workflowElementData);

        case 'if':
            return new WorkflowVariable(workflowElementData);

        default:
            throw new Error(`Unknown element type: ${workflowElementData.type}`);
    }
}