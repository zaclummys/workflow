import { findSessionByToken } from "../data/mongodb/session";
import { findWorkflowExecutionsByVersionId } from "../data/mongodb/workflow-execution";

export default async function getWorkflowExecutions ({
    workflowVersionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workflowExecutions = await findWorkflowExecutionsByVersionId(workflowVersionId);

    return {
        success: true,
        workflowExecutions: workflowExecutions.map(workflowExecution => ({
            id: workflowExecution.id,
            status: workflowExecution.status,
            startedAt: workflowExecution.startedAt,
            completedAt: workflowExecution.completedAt,
        })),
    };
}