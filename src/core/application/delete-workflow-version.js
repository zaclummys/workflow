import { findSessionByToken } from "../data/mongodb/session";
import { deleteWorkflowExecutionByVersionId } from "../data/mongodb/workflow-execution";
import { deleteWorkflowVersionById } from "../data/mongodb/workflow-version";

export default async function deleteWorkflowVersion ({
    workflowVersionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    await deleteWorkflowExecutionByVersionId(workflowVersionId);
    await deleteWorkflowVersionById(workflowVersionId);
    
    return {
        success: true,
    };
}