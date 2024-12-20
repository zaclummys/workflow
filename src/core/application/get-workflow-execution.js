import { findSessionByToken } from "~/core/data/mongodb/session";
import { findUserById } from "~/core/data/mongodb/user";
import { findWorkflowExecutionById } from "~/core/data/mongodb/workflow-execution";
import { findWorkflowVersionById } from "~/core/data/mongodb/workflow-version";
import { findWorkflowById } from "~/core/data/mongodb/workflow";
import { findWorkspaceById } from "~/core/data/mongodb/workspace";

export default async function getWorkflowExecution ({
    workflowExecutionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workflowExecution = await findWorkflowExecutionById(workflowExecutionId);

    if (!workflowExecution) {
        return {
            success: false,
        };
    }

    const executedBy = await findUserById(workflowExecution.getExecutedById());

    if (!executedBy) {
        return {
            success: false,
        }
    }

    const workflowVersion = await findWorkflowVersionById(workflowExecution.getWorkflowVersionId());

    if (!workflowVersion) {
        return {
            success: false,
        }
    }

    const workflow = await findWorkflowById(workflowVersion.getWorkflowId());

    if (!workflow) {
        return {
            success: false,
        }
    }

    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

    if (!workspace) {
        return {
            success: false,
        }
    }

    if (!workspace.isMember(session.getUserId())) {
        return {
            success: false,
            message: 'User is not a member of the workspace.',
        };
    }

    return {
        success: true,
        workflowExecution: {
            id: workflowExecution.getId(),

            inputs: workflowExecution
                .getInputs()
                .map(input => {
                    const inputVariable = workflowVersion.variables.find(variable =>  variable.id === input.id);

                    return {
                        id: input.id,
                        value: input.value,
                        name: inputVariable.name,
                        type: inputVariable.type,
                    };
                }),

            outputs: workflowExecution
                .getOutputs()
                .map(output => {
                    const outputVariable = workflowVersion.variables.find(variable => variable.id === output.id);

                    return {
                        id: output.id,
                        value: output.value,
                        name: outputVariable.name,
                        type: outputVariable.type,
                    };
                }),

            executedAt: workflowExecution.getExecutedAt(),

            workflowVersion: {
                id: workflowVersion.getId(),
                number: workflowVersion.getNumber(),
                workflow: {
                    id: workflow.getId(),
                    name: workflow.getName(),
                },
            },
            
            executedBy: {
                id: executedBy.getId(),
                name: executedBy.getName(),
            },
        },
    };
}