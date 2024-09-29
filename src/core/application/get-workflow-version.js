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

import { countWorkflowExecutionsByVersionId } from "../data/mongodb/workflow-execution";

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

    const numberOfExecutions = await countWorkflowExecutionsByVersionId(workflowVersion.getId());

    return {
        success: true,
        workflowVersion: {
            id: workflowVersion.getId(),
            number: workflowVersion.getNumber(),
            status: workflowVersion.getStatus(),
            elements: workflowVersion.getElements()
                .map(element => {
                    switch (element.getType()) {
                        case 'start':
                            return {
                                id: element.getId(),
                                type: element.getType(),
                                name: element.getName(),
                                nextElementId: element.getNextElementId(),
                            };

                        case 'assign':
                            return {
                                id: element.getId(),
                                type: element.getType(),
                                name: element.getName(),
                                description: element.getDescription(),
                                nextElementId: element.getNextElementId(),
                            };

                        case 'if':
                            return {
                                id: element.getId(),
                                type: element.getType(),
                                name: element.getName(),
                                description: element.getDescription(),
                                nextElementIdIfTrue: element.getNextElementIdIfTrue(),
                                nextElementIdIfFalse: element.getNextElementIdIfFalse(),
                                strategy: element.getStrategy(),
                                conditions: element.getConditions(),
                            }

                        default:
                            return null;
                    }
                })
                .map(element => ({
                    ...element,
                    position: generateRandomPosition(),
                })),

            variables: workflowVersion.getVariables()
                .map(variable => ({
                    id: variable.getId(),
                    name: variable.getName(),
                    type: variable.getType(),
                    description: variable.getDescription(),
                    defaultValue: variable.getDefaultValue(),
                    markedAsInput: variable.getMarkedAsInput(),
                    markedAsOutput: variable.getMarkedAsOutput(),
                })),

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

function generateRandomPosition () {
    return {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
    };
}