import { findSessionByToken } from "../data/mongodb/session";
import { findWorkflowExecutionIdsByVersionId } from "../data/mongodb/workflow-execution";

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

    const workflowExecutionIds = await findWorkflowExecutionIdsByVersionId(workflowVersionId);

    return {
        success: true,
        workflowExecutionIds,
    };
}