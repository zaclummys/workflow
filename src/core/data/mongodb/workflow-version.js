import database from './database';

import {
    WorkflowVersion,
} from '~/core/domain/workflow-version';

import WorkflowStartElement from '~/core/domain/workflow-version/elements/start/workflow-start-element';

import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowCondition from '~/core/domain/workflow-version/elements/if/workflow-condition';

import WorkflowAssignElement from '~/core/domain/workflow-version/elements/assign/workflow-assign-element';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

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
        variables: workflowVersion.getVariables()
            .map(fromWorkflowVariable),
        workflowId: workflowVersion.getWorkflowId(),
        createdAt: workflowVersion.getCreatedAt(),
        createdById: workflowVersion.getCreatedById(),
    };
}

export function fromWorkflowVariable (workflowVariable) {
    return {
        id: workflowVariable.getId(),
        name: workflowVariable.getName(),
        description: workflowVariable.getDescription(),
        defaultValue: fromValue(workflowVariable.getDefaultValue()),
        type: workflowVariable.getType(),
        markedAsInput: workflowVariable.getMarkedAsInput(),
        markedAsOutput: workflowVariable.getMarkedAsOutput(),
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
            return fromWorkflowIfElement(workflowElement);

        default:
            throw new Error(`Unknown element type: ${workflowElement.getType()}`);
    }
}

export function fromWorkflowIfElement (workflowIfElement) {
    return {
        id: workflowIfElement.getId(),

        type: workflowIfElement.getType(),
        name: workflowIfElement.getName(),
        description: workflowIfElement.getDescription(),
        conditions: workflowIfElement.getConditions()
            .map(fromWorkflowCondition),

        strategy: workflowIfElement.getStrategy(),

        nextElementIdIfTrue: workflowIfElement.getNextElementIdIfTrue(),
        nextElementIdIfFalse: workflowIfElement.getNextElementIdIfFalse(),

        positionX: workflowIfElement.getPositionX(),
        positionY: workflowIfElement.getPositionY(),
    };
}

export function fromWorkflowCondition (workflowCondition) {
    return {
        id: workflowCondition.getId(),
        variableId: workflowCondition.getVariableId(),
        variableType: workflowCondition.getVariableType(),
        operator: workflowCondition.getOperator(),
        operand: fromWorkflowOperand(workflowCondition.getOperand()),
    };
}

export function fromWorkflowOperand (workflowOperand) {
    switch (workflowOperand.getType()) {
        case 'variable':
            return {
                type: workflowOperand.getType(),
                variableId: workflowOperand.getVariableId(),
            };

        case 'value':
            return {
                type: workflowOperand.getType(),
                value: fromValue(workflowOperand.getValue()),
            };

        default:
            throw new Error(`Unknown operand type: ${workflowOperand.getType()}`);
    }
}

export function fromWorkflowAssignment (workflowAssignment) {
    return {
        id: workflowAssignment.getId(),
        variableId: workflowAssignment.getVariableId(),
        operator: workflowAssignment.getOperator(),
        operand: fromAssignmentOperand(workflowAssignment.getOperand()),
    };
}

export function fromValue (value) {
    if (value == null) {
        return null;
    }
    
    switch (value.getType()) {
        case 'number':
            return {
                type: value.getType(),
                number: value.getNumber(),
            };

        case 'string':
            return {
                type: value.getType(),
                string: value.getString(),
            };

        case 'boolean':
            return {
                type: value.getType(),
                boolean: value.getBoolean(),
            };

        default:
            throw new Error(`Unknown value type: ${value.getType()}`);
    }
}

export function fromAssignmentOperand (operand) {
    switch (operand.getType()) {
        case 'variable':
            return {
                type: operand.getType(),
                variableId: operand.getVariableId(),
            };

        case 'value':
            return {
                type: operand.getType(),
                value: fromValue(operand.getValue()),
            };

        default:
            throw new Error(`Unknown operand type: ${operand.getType()}`);
    }
}

export function fromWorkflowIfStrategy (workflowIfStrategy) {
    return workflowIfStrategy.getType();
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
            return new WorkflowIfElement(workflowElementData);

        default:
            throw new Error(`Unknown element type: ${workflowElementData.type}`);
    }
}
