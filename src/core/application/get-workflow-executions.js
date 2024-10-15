import { findSessionByToken } from "~/core/data/mongodb/session";
import { findWorkflowExecutionIdsByWorkflowVersionId } from "~/core/data/mongodb/workflow-execution";

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

    const workflowExecutionIds = await findWorkflowExecutionIdsByWorkflowVersionId(workflowVersionId);

    return {
        success: true,
        workflowExecutionIds,
    };
}