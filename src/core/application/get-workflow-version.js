import {
    findWorkflowVersionById,
} from "~/core/data/mongodb/workflow-version";

import {
    findUserById,
} from "~/core/data/mongodb/user";

import {
    findWorkflowById,
} from "~/core/data/mongodb/workflow";

import {
    findWorkspaceById,
} from "~/core/data/mongodb/workspace";

import { countWorkflowExecutionsByWorkflowVersionId } from "~/core/data/mongodb/workflow-execution";

export default async function getWorkflowVersion ({ workflowVersionId }) {
    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
            message: 'Workflow version not found.',
        };
    }

    const createdBy = await findUserById(workflowVersion.getCreatedById());
    const workflow = await findWorkflowById(workflowVersion.getWorkflowId());

    if (!workflow) {
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

    const numberOfExecutions = await countWorkflowExecutionsByWorkflowVersionId(workflowVersion.getId());

    return {
        success: true,
        workflowVersion: {
            id: workflowVersion.getId(),
            number: workflowVersion.getNumber(),
            status: workflowVersion.getStatus(),

            elements: workflowVersion.getElements()
                .map(fromWorkflowElement),
    
            variables: workflowVersion.getVariables()
                .map(fromWorkflowVariable),
    
            workflow: {
                id: workflow.getId(),
                name: workflow.getName(),
                workspace: {
                    id: workspace.getId(),
                    name: workspace.getName(),
                },
            },
            
            createdBy: {
                id: createdBy.getId(),
                name: createdBy.getName(),
            },
    
            createdAt: workflowVersion.getCreatedAt(),
    
            numberOfExecutions,
        },
    };
}

export function fromWorkflowVariable (variable) {
    return {
        id: variable.getId(),
        name: variable.getName(),
        type: variable.getType(),
        description: variable.getDescription(),
        defaultValue: variable.getDefaultValue(),
        markedAsInput: variable.getMarkedAsInput(),
        markedAsOutput: variable.getMarkedAsOutput(),
    };
}

export function fromWorkflowElement (element) {
    switch (element.getType()) {
        case 'start':
            return {
                id: element.getId(),
                type: element.getType(),
                name: element.getName(),
                positionX: element.getPositionX(),
                positionY: element.getPositionY(),
                nextElementId: element.getNextElementId(),
            };

        case 'assign':
            return {
                id: element.getId(),
                type: element.getType(),
                name: element.getName(),
                positionX: element.getPositionX(),
                positionY: element.getPositionY(),
                description: element.getDescription(),
                nextElementId: element.getNextElementId(),
                assignments: element.getAssignments()
                    .map(assignment => ({
                        id: assignment.getId(),
                        variableId: assignment.getVariableId(),
                        type: assignment.getType(),
                        value: assignment.getValue(),
                    }))
            };

        case 'if':
            return fromWorkflowIfElement(element);

        default:
            return null;
    }
}

export function fromWorkflowIfElement (element) {
    return {
        id: element.getId(),
        type: element.getType(),
        name: element.getName(),
        positionX: element.getPositionX(),
        positionY: element.getPositionY(),
        description: element.getDescription(),
        nextElementIdIfTrue: element.getNextElementIdIfTrue(),
        nextElementIdIfFalse: element.getNextElementIdIfFalse(),
        strategy: element.getStrategy(),
        conditions: element.getConditions()
            .map(fromWorkflowCondition),
    };
}

export function fromWorkflowCondition (condition) {
    return {
        id: condition.getId(),
        variableId: condition.getVariableId(),
        operator: condition.getOperator(),
        operand: condition.getOperand(),
    };
}
