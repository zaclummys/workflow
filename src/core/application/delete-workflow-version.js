import { findSessionByToken } from "../data/mongodb/session";
import { countWorkflowExecutionsByVersionId } from "../data/mongodb/workflow-execution";
import { deleteWorkflowVersionById } from "../data/mongodb/workflow-version";

export default async function deleteWorkflowVersion ({
    workflowVersionId,
    sessionToken,
}) {
    if (!workflowVersionId || !sessionToken) {
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

    const amountOfWorkflowExecutions = countWorkflowExecutionsByVersionId(workflowVersionId);

    if (amountOfWorkflowExecutions > 0) {
        return {
            success: false,
        };
    }

    await deleteWorkflowVersionById(workflowVersionId);

    return {
        success: true,
    };
}