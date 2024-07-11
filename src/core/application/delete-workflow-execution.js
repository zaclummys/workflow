import { findSessionByToken } from "../data/mongodb/session";
import { deleteWorkflowExecutionById } from "../data/mongodb/workflow-execution";

export default async function deleteWorkflowExecution ({
    workflowExecutionId,
    sessionToken,
}) {
    if (!workflowExecutionId || !sessionToken) {
        return {
            success: false,
        };
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    await deleteWorkflowExecutionById(workflowExecutionId);

    return {
        success: true,
    };
}