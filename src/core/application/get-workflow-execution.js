import { findSessionByToken } from "~/core/data/mongodb/session";
import { findUserById } from "~/core/data/mongodb/user";
import { findWorkflowExecutionById } from "~/core/data/mongodb/workflow-execution";
import { findWorkflowVersionById } from "~/core/data/mongodb/workflow-version";
import { findWorkflowById } from "~/core/data/mongodb/workflow";

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

    return {
        success: true,
        workflowExecution: {
            id: workflowExecution.getId(),
            status: workflowExecution.getStatus(),
            startedAt: workflowExecution.getStartedAt(),
            finishedAt: workflowExecution.getFinishedAt(),

            inputValues: workflowExecution.getInputValues(),
            outputValues: workflowExecution.getOutputValues(),

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