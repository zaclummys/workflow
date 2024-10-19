import {
    WorkflowStartElement,
    WorkflowVariable,
    WorkflowAssignElement,
    WorkflowIfElement,
    WorkflowVersion,
    WorkflowAssignment,
    WorkflowCondition,
} from '~/core/domain/workflow-version';

import database from './database';

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
        .find({ workflowId }, { sort: { number: -1 }, projection: { id: 1 } })
        .toArray();

    return workflowVersionIdsData.map(workflowVersionIdData => workflowVersionIdData.id);
}

export async function findWorkflowVersionIdsByWorkflowIds (workflowIds) {
    const workflowVersionIdsData = await database
        .collection('workflow-versions')
        .find({ workflowId: { $in: workflowIds } }, { projection: { id: 1 } })
        .toArray();

    return workflowVersionIdsData.map(workflowVersionIdData => workflowVersionIdData.id);
}

export async function deleteWorkflowVersionById (id) {
    await database
        .collection('workflow-versions')
        .deleteOne({ id });
}

export async function deleteWorkflowVersionsByIds (ids) {
    await database
        .collection('workflow-versions')
        .deleteMany({ id: { $in: ids } });
}

export async function deleteWorkflowVersionsByWorkflowId (workflowId) {
    await database
        .collection('workflow-versions')
        .deleteMany({ workflowId });
}

export async function deleteWorkflowVersionsByWorkflowIds (workflowIds) {
    await database
        .collection('workflow-versions')
        .deleteMany({ workflowId: { $in: { workflowIds } } });
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

                positionX: workflowElement.getPositionX(),
                positionY: workflowElement.getPositionY(),
            };

        case 'assign':
            return {
                id: workflowElement.getId(),

                type: workflowElement.getType(),
                name: workflowElement.getName(),
                description: workflowElement.getDescription(),
                assignments: workflowElement.getAssignments()
                    .map(fromWorkflowAssignment),

                nextElementId: workflowElement.getNextElementId(),

                positionX: workflowElement.getPositionX(),
                positionY: workflowElement.getPositionY(),
            };

        case 'if':
            return {
                id: workflowElement.getId(),

                type: workflowElement.getType(),
                name: workflowElement.getName(),
                description: workflowElement.getDescription(),
                strategy: workflowElement.getStrategy(),
                conditions: workflowElement.getConditions()
                    .map(fromWorkflowCondition),

                nextElementIdIfTrue: workflowElement.getNextElementIdIfTrue(),
                nextElementIdIfFalse: workflowElement.getNextElementIdIfFalse(),

                positionX: workflowElement.getPositionX(),
                positionY: workflowElement.getPositionY(),
            };

        default:
            throw new Error(`Unknown element type: ${workflowElement.getType()}`);
    }
}

function fromWorkflowCondition (workflowCondition) {
    return {
        id: workflowCondition.getId(),
        variableId: workflowCondition.getVariableId(),
        operator: workflowCondition.getOperator(),
        value: workflowCondition.getValue(),
    };
}

function fromWorkflowAssignment (workflowAssignment) {
    return {
        id: workflowAssignment.getId(),
        variableId: workflowAssignment.getVariableId(),
        operator: workflowAssignment.getOperator(),
        value: workflowAssignment.getValue(),
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
            return new WorkflowAssignElement({
                ...workflowElementData,
                assignments: workflowElementData.assignments.map(toWorkflowAssignment),
            });

        case 'if':
            return new WorkflowIfElement({
                ...workflowElementData,
                conditions: workflowElementData.conditions.map(toWorkflowCondition)
            });

        default:
            throw new Error(`Unknown element type: ${workflowElementData.type}`);
    }
}

export function toWorkflowAssignment (workflowAssignmentData) {
    return new WorkflowAssignment(workflowAssignmentData);
}

export function toWorkflowCondition (workflowConditionData) {
    return new WorkflowCondition(workflowConditionData);
}