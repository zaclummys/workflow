import { findSessionByToken } from "../data/mongodb/session";
import { findWorkflowExecutionById } from "../data/mongodb/workflow-execution";

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

    return {
        success: true,
        workflowExecution: {
            id: workflowExecution.getId(),
            status: workflowExecution.getStatus(),
            startedAt: workflowExecution.getStartedAt(),
            finishedAt: workflowExecution.getFinishedAt(),
            workflowVersionId: workflowExecution.getWorkflowVersionId(),
            executedById: workflowExecution.getExecutedById(),
            inputValues: workflowExecution.getInputValues(),
            outputValues: workflowExecution.getOutputValues(),
        }
    };
}